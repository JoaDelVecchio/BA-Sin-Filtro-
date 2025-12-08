import crypto from "node:crypto";

import OpenAI from "openai";

import {
  Article,
  ArticleAxiomBlock,
  FeedArticle,
  StoryCluster,
} from "@/lib/types";

import { buildStoryClusterPrompt } from "./build-prompt";
import { STORY_CLUSTER_RESPONSE_SCHEMA } from "./schema";

type AiCluster = {
  id: string;
  topic: StoryCluster["topic"];
  region?: "CABA" | "PBA";
  headline: string;
  subtitle: string;
  lede: string;
  tags?: string[];
  sourceArticleIds: string[];
  axiomBlocks: Array<{
    type: ArticleAxiomBlock["type"];
    title: string;
    body: string;
    bullets?: string[];
  }>;
};

type AiResponse = {
  clusters: AiCluster[];
};

const DEFAULT_BIAS = { left: 33, center: 34, right: 33 } as const;

export async function generateStoryClustersFromArticles(
  articles: FeedArticle[],
  options?: { signal?: AbortSignal },
): Promise<StoryCluster[]> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not set");
  }

  const { messages, promptArticles } = buildStoryClusterPrompt(articles);
  const articleMap = new Map(
    promptArticles.map(({ payload, original }) => [payload.id, original]),
  );

  const client = new OpenAI({ apiKey });
  const response = await callOpenAIWithRetry(client, messages, 1, options?.signal);

  const parsedEntry =
    (response as unknown as { output_parsed?: AiResponse | null })
      ?.output_parsed ??
    ((response as any)?.output
      ?.flatMap((item: any) => item?.content ?? [])
      ?.find((content: any) => "parsed" in content)?.parsed as
      | AiResponse
      | undefined) ??
    null;

  const aiClusters = parsedEntry?.clusters ?? [];
  const now = new Date().toISOString();

  return aiClusters
    .map((cluster) => transformCluster(cluster, articleMap, now))
    .filter((cluster): cluster is StoryCluster => Boolean(cluster));
}

type ParsedResponse = Awaited<
  ReturnType<OpenAI["responses"]["parse"]>
>;

async function callOpenAIWithRetry(
  client: OpenAI,
  messages: Awaited<ReturnType<typeof buildStoryClusterPrompt>>["messages"],
  retries = 1,
  signal?: AbortSignal,
): Promise<ParsedResponse> {
  let attempt = 0;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    try {
      return await client.responses.parse({
        model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
        input: messages,
        temperature: 0.4,
        max_output_tokens: 24000,
        signal,
        text: {
          format: {
            type: "json_schema",
            name: STORY_CLUSTER_RESPONSE_SCHEMA.name,
            schema: STORY_CLUSTER_RESPONSE_SCHEMA.schema,
            strict: true,
          },
        },
      });
    } catch (error) {
      const status = (error as { status?: number }).status;
      const headers = (error as { headers?: Headers }).headers;
      const resetHeader =
        headers?.get?.("x-ratelimit-reset-tokens") ??
        headers?.get?.("retry-after");
      const resetMs = resetHeader
        ? Number.parseFloat(resetHeader) * 1000
        : undefined;

      if (status === 429 && attempt < retries) {
        const waitMs = Number.isFinite(resetMs) ? resetMs : 1500;
        await new Promise((resolve) => setTimeout(resolve, waitMs));
        attempt += 1;
        continue;
      }

      throw error;
    }
  }
}

function transformCluster(
  cluster: AiCluster,
  articleMap: Map<string, FeedArticle>,
  createdAt: string,
): StoryCluster | null {
  const sourceArticles = cluster.sourceArticleIds
    .map((id) => articleMap.get(id))
    .filter((article): article is FeedArticle => Boolean(article));

  if (!sourceArticles.length) {
    return null;
  }

  const articleRecords = sourceArticles.map((article, index) =>
    toArticleRecord(article, index, createdAt),
  );

  const image = sourceArticles.find((article) => article.image)?.image ?? null;
  const inferredRegion = cluster.region ?? sourceArticles[0]?.region;

  return {
    id: cluster.id,
    createdAt,
    headline: cluster.headline,
    subtitle: cluster.subtitle,
    lede: cluster.lede,
    axiomBlocks: cluster.axiomBlocks.map(mapAxiom),
    image,
    topic: cluster.topic,
    region: inferredRegion,
    bias: DEFAULT_BIAS,
    sources: articleRecords,
    tags: cluster.tags,
  };
}

function mapAxiom(block: AiCluster["axiomBlocks"][number]): ArticleAxiomBlock {
  return {
    type: block.type,
    title: block.title,
    text: block.body,
    bullets: block.bullets?.length ? block.bullets : undefined,
  };
}

function toArticleRecord(
  article: FeedArticle,
  index: number,
  fallbackPublishedAt: string,
): Article {
  return {
    id: articleHash(article, index),
    source: article.source,
    title: article.title ?? "Sin título",
    description: article.description,
    url: article.url ?? "",
    image: article.image,
    publishedAt: article.publishedAt ?? fallbackPublishedAt,
    text: article.contentText ?? article.contentHTML ?? "",
  };
}

function articleHash(article: FeedArticle, index: number) {
  const basis = article.url ?? `${article.source}-${article.title ?? index}`;
  return crypto.createHash("sha1").update(`${index}-${basis}`).digest("hex");
}
