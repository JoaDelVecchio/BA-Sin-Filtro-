import pLimit from "p-limit";

import { FeedArticle } from "@/lib/types";

import { fetchArticleContent } from "./fetch-article-content";
import { fetchFeedArticles } from "./fetch-feed";
import { FEED_SOURCES } from "./sources";

export type FetchLatestArticlesOptions = {
  perFeedLimit?: number;
  maxArticles?: number;
  sinceMinutes?: number;
};

export async function fetchLatestArticles(
  options: FetchLatestArticlesOptions = {},
): Promise<FeedArticle[]> {
  const perFeedLimit = options.perFeedLimit ?? 12;
  const maxArticles = options.maxArticles ?? 60;
  const sinceMinutes =
    typeof options.sinceMinutes === "number" ? options.sinceMinutes : 24 * 60;
  const minTimestamp =
    sinceMinutes > 0 ? Date.now() - sinceMinutes * 60 * 1000 : undefined;

  const feedResults = await Promise.all(
    FEED_SOURCES.map(async (source) => {
      const articles = await fetchFeedArticles(source);
      return articles
        .filter((article) =>
          minTimestamp && article.publishedAt
            ? new Date(article.publishedAt).getTime() >= minTimestamp
            : true,
        )
        .slice(0, perFeedLimit);
    }),
  );

  const merged = feedResults.flat();
  const sorted = merged.sort(
    (a, b) => getTimestamp(b.publishedAt) - getTimestamp(a.publishedAt),
  );

  const deduped: FeedArticle[] = [];
  const seen = new Set<string>();

  for (const article of sorted) {
    const key = article.url ?? `${article.feedId}-${article.title}`;
    if (!key || seen.has(key)) continue;
    seen.add(key);
    deduped.push(article);

    if (deduped.length >= maxArticles) {
      break;
    }
  }

  return enrichWithFullContent(deduped);
}

function getTimestamp(date?: string) {
  if (!date) return 0;
  const value = new Date(date).getTime();
  return Number.isNaN(value) ? 0 : value;
}

const ENRICH_CONCURRENCY = 4;

async function enrichWithFullContent(articles: FeedArticle[]) {
  const limit = pLimit(ENRICH_CONCURRENCY);

  return Promise.all(
    articles.map((article) =>
      limit(async () => {
        const derivedText =
          article.contentText ?? textFromHtml(article.contentHTML);

        if (article.contentHTML && derivedText) {
          return {
            ...article,
            contentText: derivedText,
          };
        }

        if (!article.url) {
          return {
            ...article,
            contentText: derivedText,
          };
        }

        const fetched = await fetchArticleContent(article.url);
        if (!fetched) {
          return {
            ...article,
            contentText: derivedText,
          };
        }

        return {
          ...article,
          contentHTML: fetched.contentHTML ?? article.contentHTML,
          contentText: fetched.contentText ?? derivedText,
          image: article.image ?? fetched.image ?? null,
        };
      }),
    ),
  );
}

function textFromHtml(html?: string) {
  if (!html) return undefined;

  const withoutScripts = html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, " ");
  const plain = withoutScripts
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ");
  const normalized = plain.replace(/\s+/g, " ").trim();
  return normalized.length ? normalized : undefined;
}
