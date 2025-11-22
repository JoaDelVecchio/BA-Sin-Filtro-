"use server";

import { cache } from "react";

import { generateStoryClustersFromArticles } from "@/lib/ai/generate-story-clusters";
import { MOCK_CLUSTERS } from "@/lib/mocks";
import { clusterArticles } from "@/lib/rss/article-clustering";
import { fetchLatestArticles } from "@/lib/rss/get-latest-articles";
import { StoryCluster } from "@/lib/types";

const FALLBACK = MOCK_CLUSTERS;

const fetchLiveClusters = cache(async (): Promise<StoryCluster[]> => {
  try {
    const articles = await fetchLatestArticles({
      perFeedLimit: 4,
      maxArticles: 24,
      sinceMinutes: 12 * 60,
    });

    if (!articles.length) {
      return FALLBACK;
    }

    const dedupedArticles = clusterArticles(articles).map(
      (cluster) => cluster.articles[0],
    );

    if (!dedupedArticles.length) {
      return FALLBACK;
    }

    try {
      const clusters = await generateStoryClustersFromArticles(
        dedupedArticles.slice(0, 24),
      );
      return clusters.length ? clusters : FALLBACK;
    } catch (error) {
      console.error("[clusters] AI generation failed", error);
      return FALLBACK;
    }
  } catch (error) {
    console.error("[clusters] RSS fetch failed", error);
    return FALLBACK;
  }
});

export const getStoryClusters = fetchLiveClusters;
