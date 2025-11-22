import crypto from "node:crypto";

import { FeedArticle } from "@/lib/types";

const WORD_REGEX = /[^a-z0-9\s]/gi;
const MULTISPACE_REGEX = /\s+/g;
const URL_DELIMITER_REGEX = /[-_\s]+/g;
const CLUSTER_THRESHOLD = 0.4;

export type ArticleCluster = {
  id: string;
  mainTitle: string;
  createdAt: string;
  articles: FeedArticle[];
};

export function normalizeTitle(title?: string | null): string {
  if (!title) return "";
  return title
    .toLowerCase()
    .replace(WORD_REGEX, " ")
    .replace(MULTISPACE_REGEX, " ")
    .trim();
}

export function jaccardSimilarity(a: string, b: string): number {
  const aTokens = tokenSet(a);
  const bTokens = tokenSet(b);
  const unionSize = new Set([...aTokens, ...bTokens]).size;
  if (unionSize === 0) return 0;
  let intersection = 0;
  for (const token of aTokens) {
    if (bTokens.has(token)) {
      intersection += 1;
    }
  }
  return intersection / unionSize;
}

export function urlSimilarity(aUrl?: string | null, bUrl?: string | null) {
  if (!aUrl || !bUrl) return 0;
  const aTokens = urlTokens(aUrl);
  const bTokens = urlTokens(bUrl);
  if (!aTokens.size || !bTokens.size) return 0;
  const unionSize = new Set([...aTokens, ...bTokens]).size;
  if (unionSize === 0) return 0;
  let intersection = 0;
  for (const token of aTokens) {
    if (bTokens.has(token)) intersection += 1;
  }
  return intersection / unionSize;
}

export function hoursDiff(a?: string | null, b?: string | null): number {
  if (!a || !b) return Number.POSITIVE_INFINITY;
  const aTime = Date.parse(a);
  const bTime = Date.parse(b);
  if (Number.isNaN(aTime) || Number.isNaN(bTime)) {
    return Number.POSITIVE_INFINITY;
  }
  const diffMs = Math.abs(aTime - bTime);
  return diffMs / (1000 * 60 * 60);
}

export function articleSimilarity(a: FeedArticle, b: FeedArticle): number {
  const titleSim = jaccardSimilarity(
    normalizeTitle(a.title),
    normalizeTitle(b.title),
  );
  const urlSim = urlSimilarity(a.url, b.url);
  const timeBoost = hoursDiff(a.publishedAt, b.publishedAt) < 6 ? 0.1 : 0;
  const score = 0.6 * titleSim + 0.3 * urlSim + timeBoost;
  return Math.min(1, Math.max(0, score));
}

export function areSameStory(a: FeedArticle, b: FeedArticle) {
  return articleSimilarity(a, b) >= CLUSTER_THRESHOLD;
}

export function clusterArticles(articles: FeedArticle[]): ArticleCluster[] {
  if (!articles.length) return [];
  const sorted = [...articles].sort(
    (a, b) => getTime(b.publishedAt) - getTime(a.publishedAt),
  );
  const visited = new Set<string>();
  const clusters: ArticleCluster[] = [];

  for (const root of sorted) {
    const rootId = articleKey(root);
    if (visited.has(rootId)) continue;
    visited.add(rootId);

    const clusterArticles: FeedArticle[] = [root];

    for (const candidate of sorted) {
      const candidateId = articleKey(candidate);
      if (visited.has(candidateId)) continue;
      if (areSameStory(root, candidate)) {
        visited.add(candidateId);
        clusterArticles.push(candidate);
      }
    }

    const mainArticle = pickMainArticle(clusterArticles);
    const clusterId = hashClusterId(mainArticle.title ?? clusterArticles[0].title ?? "");
    clusters.push({
      id: clusterId,
      mainTitle: mainArticle.title ?? "",
      createdAt: new Date(Math.max(...clusterArticles.map((article) => getTime(article.publishedAt)))).toISOString(),
      articles: clusterArticles,
    });
  }

  return clusters;
}

function tokenSet(value: string) {
  if (!value) return new Set<string>();
  return new Set(value.split(" ").filter(Boolean));
}

function urlTokens(value: string) {
  try {
    const url = new URL(value);
    const pathname = url.pathname.endsWith("/")
      ? url.pathname.slice(0, -1)
      : url.pathname;
    const segment = pathname.split("/").pop() ?? "";
    return new Set(
      segment
        .toLowerCase()
        .replace(WORD_REGEX, " ")
        .replace(URL_DELIMITER_REGEX, " ")
        .split(" ")
        .filter(Boolean),
    );
  } catch {
    return new Set<string>();
  }
}

function getTime(value?: string | null) {
  const timestamp = value ? Date.parse(value) : NaN;
  return Number.isNaN(timestamp) ? 0 : timestamp;
}

function hashClusterId(title: string) {
  const normalized = normalizeTitle(title);
  const base = normalized.length ? normalized : crypto.randomUUID();
  return `cluster_${crypto
    .createHash("md5")
    .update(base)
    .digest("hex")}`;
}

function pickMainArticle(articles: FeedArticle[]): FeedArticle {
  return articles.reduce((latest, current) =>
    getTime(current.publishedAt) > getTime(latest.publishedAt) ? current : latest,
  );
}

function articleKey(article: FeedArticle) {
  return (
    article.url ??
    `${article.source}-${article.title ?? ""}-${article.publishedAt ?? ""}`
  );
}

/**
 * Example:
 * const subteA = { title: "El SUBTE aumentará desde diciembre", url: "https://.../subte-aumento", publishedAt: "2025-11-17T07:30:00Z" };
 * const subteB = { title: "Nuevo aumento del SUBTE: de cuánto será", url: "https://.../nuevo-aumento-subte", publishedAt: "2025-11-17T07:40:00Z" };
 * const inflación = { title: "La inflación de octubre fue 8,1%", url: "https://.../inflacion-octubre", publishedAt: "2025-11-17T07:35:00Z" };
 * clusterArticles([subteA, subteB, inflación]) => devuelve dos clusters: uno con las dos notas del subte y otro con la nota de inflación.
 */
