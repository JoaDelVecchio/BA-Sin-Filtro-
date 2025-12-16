import { unstable_cache } from "next/cache";

import { generateStoryClustersFromArticles } from "@/lib/ai/generate-story-clusters";
import { MOCK_CLUSTERS } from "@/lib/mocks";
import { fetchLatestArticles } from "@/lib/rss/get-latest-articles";
import { StoryCluster } from "@/lib/types";

const TWENTY_FOUR_HOURS = 60 * 60 * 24;
export const STORY_CLUSTER_CACHE_TAG = "story-clusters";

const fetchLiveClusters = async (): Promise<StoryCluster[]> => {
  if (!process.env.OPENAI_API_KEY) {
    console.warn("[story-clusters] OPENAI_API_KEY missing, using mock clusters");
    return MOCK_CLUSTERS;
  }

  try {
    const articles = await fetchLatestArticles({
      perFeedLimit: 60,
      maxArticles: 60,
      sinceMinutes: 12 * 60,
    });

    if (!articles.length) {
      console.warn("[story-clusters] No fresh articles found, using fallback");
      return MOCK_CLUSTERS;
    }

    const clusters = await generateStoryClustersFromArticles(articles);
    if (!clusters.length) {
      console.warn("[story-clusters] AI returned no clusters, using fallback");
      return MOCK_CLUSTERS;
    }

    return clusters;
  } catch (error) {
    console.error("[story-clusters] Failed to generate clusters", error);
    return MOCK_CLUSTERS;
  }
};

const getCachedClusters = unstable_cache(fetchLiveClusters, [STORY_CLUSTER_CACHE_TAG], {
  revalidate: TWENTY_FOUR_HOURS,
  tags: [STORY_CLUSTER_CACHE_TAG],
});

export async function getStoryClusters(): Promise<StoryCluster[]> {
  return getCachedClusters();
}
