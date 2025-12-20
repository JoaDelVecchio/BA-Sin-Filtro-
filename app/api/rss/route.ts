import { NextResponse } from "next/server";

import { fetchLatestArticles } from "@/lib/rss/get-latest-articles";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const perFeedLimit = parsePositiveInt(url.searchParams.get("perFeed"));
    const maxArticles = parsePositiveInt(url.searchParams.get("max"));
    const sinceMinutes = parseNonNegativeInt(url.searchParams.get("since"));

    const articles = await fetchLatestArticles({
      perFeedLimit: perFeedLimit ?? undefined,
      maxArticles: maxArticles ?? undefined,
      sinceMinutes: sinceMinutes ?? undefined,
    });

    return NextResponse.json({
      total: articles.length,
      articles,
    });
  } catch (error) {
    console.error("[api/rss] Failed to generate RSS feed", error);
    return NextResponse.json(
      { error: "Failed to generate RSS feed", details: String(error) },
      { status: 500 }
    );
  }
}

function parsePositiveInt(value: string | null) {
  if (!value) return null;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}

function parseNonNegativeInt(value: string | null) {
  if (!value) return null;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
}
