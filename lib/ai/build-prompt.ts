import crypto from "node:crypto";

import { FeedArticle } from "@/lib/types";

const MAX_ARTICLES = 24;
const MAX_CONTENT_CHARS = 1800;

type MessageContent = { type: "text"; text: string };
export type PromptMessage = {
  role: "system" | "user";
  content: MessageContent[];
};

export type PromptArticlePayload = {
  id: string;
  source: string;
  title?: string;
  summary?: string;
  content?: string;
  url: string;
  topic: string;
  region?: string;
  publishedAt?: string;
};

export type PromptArticle = {
  payload: PromptArticlePayload;
  original: FeedArticle;
};

export type StoryClusterPrompt = {
  messages: PromptMessage[];
  promptArticles: PromptArticle[];
};

const SYSTEM_PROMPT = `You are the duty editor at BA Sin Filtro.
Write in Argentine Spanish using Smart Brevity: sharp, neutral voice, max context.
Every fact must be grounded on the supplied articles (do not invent details).
Return only JSON that follows the provided schema. Do not wrap it in markdown.`;

const AXIOM_RULES = `Axiom rules:
- Always include the types "whats-new" and "why-it-matters" once.
- Include exactly one of "driving-the-news" or "big-picture".
- Use "by-the-numbers" when strong figures exist.
- Use "what-theyre-saying" when there is a quote or statement.
- Use "between-the-lines" for hidden context.
- Use "what-to-watch" or "whats-next" for future milestones.
- Only use "the-other-side", "reality-check", "bottom-line" or "go-deeper" when meaningful new info exists.
- Never repeat an axiom type within the same cluster.
- Each axiom body is 1-3 sentences; optional 0-5 bullets.`;

export function buildStoryClusterPrompt(
  articles: FeedArticle[],
): StoryClusterPrompt {
  const trimmed = articles.slice(0, MAX_ARTICLES);
  const promptArticles = trimmed.map((article, index) => {
    const payload: PromptArticlePayload = {
      id: createArticleId(article, index),
      source: article.source,
      title: safeText(article.title, 240),
      summary: safeText(article.description ?? article.contentText, 320),
      content: safeText(article.contentText, MAX_CONTENT_CHARS),
      url: article.url ?? "",
      topic: article.topic,
      region: article.region,
      publishedAt: article.publishedAt,
    };

    return { payload, original: article };
  });

  const datasetJson = JSON.stringify(
    promptArticles.map(({ payload }) => payload),
    null,
    2,
  );

  const userPrompt = `Hoy es ${new Date().toISOString()}.
Analiza las notas JSON (con id, titulo, resumen, contenido y metadata) para crear entre 3 y 5 story clusters para lectores del AMBA.
Cada cluster debe centrarse en un angulo claro y citar 1-3 ids de notas relevantes en "sourceArticleIds".
Requisitos:
- Headline breve (<=10 palabras) y subtitulo de contexto.
- Lede en 1-2 oraciones sintetizando el hecho.
- 3 a 7 axioms siguiendo las reglas.
- Tags opcionales con entidades (sin #) de hasta 4 items.
- topic debe ser uno de los valores permitidos y la region solo CABA o PBA cuando el foco sea claro.
- Todo debe estar en español.

${AXIOM_RULES}

Dataset:
${datasetJson}`;

  const messages: PromptMessage[] = [
    { role: "system", content: [{ type: "text", text: SYSTEM_PROMPT }] },
    { role: "user", content: [{ type: "text", text: userPrompt }] },
  ];

  return { messages, promptArticles };
}

function safeText(value?: string | null, maxLength = 800) {
  if (!value) return undefined;
  const normalized = value.replace(/\s+/g, " ").trim();
  if (!normalized.length) return undefined;
  if (normalized.length <= maxLength) return normalized;
  return `${normalized.slice(0, maxLength)}...`;
}

function createArticleId(article: FeedArticle, index: number) {
  const basis = article.url ?? `${article.source}-${article.title ?? index}`;
  return crypto.createHash("md5").update(`${index}-${basis}`).digest("hex");
}
