import { NextResponse } from "next/server";

import { getStoryClusters } from "@/lib/story-clusters";
import { revalidateTag } from "next/cache";

export async function GET() {
  try {
    // Force revalidation before fetching so we don't serve stale cache.
    revalidateTag("story-clusters");
    const clusters = await getStoryClusters();
    return NextResponse.json({
      ok: true,
      clusters: clusters.length,
      message: "Clusters refreshed and cached",
    });
  } catch (error) {
    console.error("[refresh-clusters] failed", error);
    return NextResponse.json(
      { ok: false, error: "Failed to refresh clusters" },
      { status: 500 },
    );
  }
}
