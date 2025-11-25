"use server";

import { unstable_cache } from "next/cache";

import { generateStoryClustersFromArticles } from "@/lib/ai/generate-story-clusters";
import { MOCK_CLUSTERS } from "@/lib/mocks";
import { clusterArticles } from "@/lib/rss/article-clustering";
import { fetchLatestArticles } from "@/lib/rss/get-latest-articles";
import { StoryCluster } from "@/lib/types";

const FALLBACK = MOCK_CLUSTERS;
const MIN_CLUSTER_TARGET = 30;
const BATCH_SIZE = 15;
const MEMORY_TTL_MS = 24 * 60 * 60 * 1000;
const SKIP_LIVE_FETCH =
  process.env.SKIP_LIVE_FETCH === "1" ||
  process.env.NEXT_PHASE === "phase-production-build";

type MemoryCache = {
  clusters: StoryCluster[];
  expiresAt: number;
};

const globalAny = globalThis as unknown as {
  __storyClustersCache?: MemoryCache;
};

function mergeWithFallback(clusters: StoryCluster[]): {
  clusters: StoryCluster[];
  usedFallback: boolean;
} {
  // Only fall back when there are zero clusters; otherwise keep whatever the AI returned.
  if (clusters.length === 0) {
    return { clusters: FALLBACK, usedFallback: true };
  }
  return { clusters, usedFallback: false };
}

type ClusterFetchResult = { clusters: StoryCluster[]; usedFallback: boolean };

async function fetchLiveClusters(): Promise<ClusterFetchResult> {
  try {
    const articles = await fetchLatestArticles({
      perFeedLimit: 80,
      maxArticles: 120,
      sinceMinutes: 72 * 60,
    });

    if (!articles.length) {
      return { clusters: FALLBACK, usedFallback: true };
    }

    const dedupedArticles = clusterArticles(articles)
      .flatMap((cluster) => cluster.articles.slice(0, 2))
      .slice(0, 120);

    if (!dedupedArticles.length) {
      return { clusters: FALLBACK, usedFallback: true };
    }

    try {
      const batches: StoryCluster[] = [];

      for (let i = 0; i < dedupedArticles.length; i += BATCH_SIZE) {
        const slice = dedupedArticles.slice(i, i + BATCH_SIZE);
        const partial = await generateStoryClustersFromArticles(slice);
        batches.push(...partial);
        if (batches.length >= MIN_CLUSTER_TARGET) {
          break;
        }
      }

      const uniqueById = Array.from(
        new Map(batches.map((cluster) => [cluster.id, cluster])).values(),
      );

      const hasClusters = uniqueById.length > 0;
      const merged = mergeWithFallback(uniqueById.slice(0, MIN_CLUSTER_TARGET));
      return {
        clusters: hasClusters ? merged.clusters : FALLBACK,
        usedFallback: !hasClusters || merged.usedFallback,
      };
    } catch (error) {
      console.error("[clusters] AI generation failed", error);
      return { clusters: FALLBACK, usedFallback: true };
    }
  } catch (error) {
    console.error("[clusters] RSS fetch failed", error);
    return { clusters: FALLBACK, usedFallback: true };
  }
}

const cachedLiveClusters = unstable_cache(
  async () => {
    const result = await fetchLiveClusters();
    if (result.usedFallback) {
      console.warn("[clusters] using fallback clusters (cached)");
    }
    return result.clusters;
  },
  ["story-clusters-v3"],
  { revalidate: 86400, tags: ["story-clusters"] },
);

export async function getStoryClusters(): Promise<StoryCluster[]> {
  if (SKIP_LIVE_FETCH) {
    return FALLBACK;
  }

  const now = Date.now();
  const memoryCache = globalAny.__storyClustersCache;
  if (memoryCache && memoryCache.expiresAt > now) {
    return memoryCache.clusters;
  }

  const clusters = await cachedLiveClusters();
  globalAny.__storyClustersCache = {
    clusters,
    expiresAt: now + MEMORY_TTL_MS,
  };
  return clusters;
}
