"use server";

import { MOCK_CLUSTERS } from "@/lib/mocks";
import { StoryCluster } from "@/lib/types";

/**
 * Dev-only shortcut: serve the mock clusters directly, skipping RSS fetching
 * and AI generation so the UI loads instantly without backend dependencies.
 */
export async function getStoryClusters(): Promise<StoryCluster[]> {
  return MOCK_CLUSTERS;
}
