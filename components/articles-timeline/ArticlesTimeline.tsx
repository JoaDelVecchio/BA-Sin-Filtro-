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
  const safeArticles = articles ?? [];
  const [view, setView] = useState<"latest" | "popular">("latest");
  const fallbackPopular = useMemo(() => {
    const list = articles ?? [];
    return [...list].sort(
      (a, b) => (b.publishers?.length ?? 0) - (a.publishers?.length ?? 0)
    );
  }, [articles]);
  const availablePopular = popularArticles?.length
    ? popularArticles
    : fallbackPopular;
  const displayedArticles = view === "latest" ? safeArticles : availablePopular;

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
