import { NextResponse } from "next/server";

import { fetchLatestArticles } from "@/lib/rss/get-latest-articles";

export const revalidate = 0;

export async function GET(request: Request) {
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
