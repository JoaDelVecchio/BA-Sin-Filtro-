import { NextResponse } from "next/server";

import { getStoryClusters, STORY_CLUSTER_CACHE_TAG } from "@/lib/story-clusters";
import { revalidateTag } from "next/cache";

export async function GET() {
  try {
    // Force revalidation before fetching so we don't serve stale cache.
    revalidateTag(STORY_CLUSTER_CACHE_TAG, "max");
    console.log("[refresh-clusters] Cache tag revalidated");
    
    const clusters = await getStoryClusters();
    console.log(`[refresh-clusters] Got ${clusters.length} clusters`);
    
    return NextResponse.json({
      ok: true,
      clusters: clusters.length,
      message: "Clusters refreshed and cached",
      data: clusters.map(c => ({ id: c.id, headline: c.headline, topic: c.topic }))
    });
  } catch (error) {
    console.error("[refresh-clusters] failed", error);
    return NextResponse.json(
      { ok: false, error: "Failed to refresh clusters" },
      { status: 500 },
    );
  }
}
