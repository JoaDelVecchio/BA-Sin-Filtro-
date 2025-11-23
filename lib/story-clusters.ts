"use server";

import { unstable_cache } from "next/cache";

import { generateStoryClustersFromArticles } from "@/lib/ai/generate-story-clusters";
import { MOCK_CLUSTERS } from "@/lib/mocks";
import { clusterArticles } from "@/lib/rss/article-clustering";
import { fetchLatestArticles } from "@/lib/rss/get-latest-articles";
import { StoryCluster } from "@/lib/types";

const FALLBACK = MOCK_CLUSTERS;
const MIN_CLUSTER_TARGET = 20;
const BATCH_SIZE = 25;

function mergeWithFallback(clusters: StoryCluster[]): {
  clusters: StoryCluster[];
  usedFallback: boolean;
} {
  if (clusters.length >= MIN_CLUSTER_TARGET) {
    return { clusters, usedFallback: false };
  }

  const seen = new Set(clusters.map((item) => item.id));
  const padded = [...clusters];

  for (const candidate of FALLBACK) {
    if (padded.length >= MIN_CLUSTER_TARGET) break;
    if (seen.has(candidate.id)) continue;
    padded.push(candidate);
    seen.add(candidate.id);
  }

  return { clusters: padded, usedFallback: true };
}

type ClusterFetchResult = { clusters: StoryCluster[]; usedFallback: boolean };

async function fetchLiveClusters(): Promise<ClusterFetchResult> {
  try {
    const articles = await fetchLatestArticles({
      perFeedLimit: 60,
      maxArticles: 60,
      sinceMinutes: 72 * 60,
    });

    if (!articles.length) {
      return { clusters: FALLBACK, usedFallback: true };
    }

    const dedupedArticles = clusterArticles(articles)
      .flatMap((cluster) => cluster.articles.slice(0, 2))
      .slice(0, 60);

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
  ["story-clusters-v2"],
  { revalidate: 86400, tags: ["story-clusters"] },
);

export async function getStoryClusters(): Promise<StoryCluster[]> {
  return cachedLiveClusters();
}
