"use client";

import { useMemo, useState } from "react";
import { GridArticle } from "@/lib/types";
import TimelineSection from "./components/TimelineSection";

type ArticlesTimelineProps = {
  articles: GridArticle[];
  popularArticles?: GridArticle[];
  variant?: "default" | "tag";
};

const ArticlesTimeline = ({
  articles,
  popularArticles,
  variant = "default",
}: ArticlesTimelineProps) => {
  const getTime = (article: GridArticle) => {
    const sourceTimes =
      article.sources
        ?.map((src) => Date.parse(src.publishedAt ?? ""))
        .filter((t) => Number.isFinite(t) && t > 0) ?? [];

    const time =
      Math.max(...sourceTimes, 0) ||
      Date.parse(article.createdAt ?? "") ||
      Date.parse((article as any).publishedAt ?? "") ||
      0;
    return Number.isFinite(time) ? time : 0;
  };

  const safeArticles = [...(articles ?? [])].sort(
    (a, b) => getTime(b) - getTime(a)
  );
  const latestIds = new Set(safeArticles.slice(0, 10).map((item) => item.id));
  const [view, setView] = useState<"latest" | "popular">("latest");
  const fallbackPopular = useMemo(() => {
    const popularityScore = (article: GridArticle) =>
      (article.publishers?.length ?? 0) * 10 + (article.tags?.length ?? 0);

    return [...safeArticles].sort((a, b) => {
      const scoreDiff = popularityScore(b) - popularityScore(a);
      if (scoreDiff !== 0) return scoreDiff;
      return getTime(b) - getTime(a);
    });
  }, [safeArticles]);
  const availablePopular = (popularArticles?.length
    ? popularArticles
    : fallbackPopular
  ).filter((article) => !latestIds.has(article.id));
  const displayedArticles =
    view === "latest" ? safeArticles : availablePopular;

  if (!safeArticles.length) {
    return null;
  }

  return (
    <TimelineSection
      view={view}
      setView={setView}
      articles={displayedArticles}
      variant={variant}
    />
  );
};

export default ArticlesTimeline;
