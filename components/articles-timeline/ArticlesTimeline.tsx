"use client";

import { useMemo, useState } from "react";
import { GridArticle } from "@/lib/types";
import TimelineSection from "./components/TimelineSection";

type ArticlesTimelineProps = {
  articles: GridArticle[];
  popularArticles?: GridArticle[];
};

const ArticlesTimeline = ({
  articles,
  popularArticles,
}: ArticlesTimelineProps) => {
  if (!articles?.length) {
    return null;
  }

  const [view, setView] = useState<"latest" | "popular">("latest");
  const fallbackPopular = useMemo(
    () =>
      [...articles].sort(
        (a, b) => (b.publishers?.length ?? 0) - (a.publishers?.length ?? 0)
      ),
    [articles]
  );
  const availablePopular = popularArticles?.length
    ? popularArticles
    : fallbackPopular;
  const displayedArticles = view === "latest" ? articles : availablePopular;

  return (
    <TimelineSection
      view={view}
      setView={setView}
      articles={displayedArticles}
    />
  );
};

export default ArticlesTimeline;
