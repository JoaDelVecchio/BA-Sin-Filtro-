import PopularNewsTabs from "@/components/PopularNewsTabs";
import Top5Grid from "@/components/top5/Top5Grid";
import ArticlesTimeline from "@/components/articles-timeline";
import { MOCK_POPULAR_NEWS } from "@/lib/mocks";
import { getStoryClusters } from "@/lib/story-clusters";
import { mapClusterToGridArticle } from "@/lib/utils";
import { GridArticle } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function Home() {
  const clusters = await getStoryClusters();
  const mappedArticles = clusters.map(mapClusterToGridArticle);
  const top5 = mappedArticles.slice(0, 5);
  const timelineArticles = mappedArticles.slice(5);

  const usedArticles = new Set<string>();
  const popularTimeline = MOCK_POPULAR_NEWS.map(({ targetTopic }) => {
    const match = mappedArticles.find(
      (article) =>
        article.topic === targetTopic && !usedArticles.has(article.id)
    );

    if (match) {
      usedArticles.add(match.id);
      return match;
    }

    return null;
  }).filter((article): article is GridArticle => Boolean(article));

  return (
    <div className="min-h-screen ">
      <div className="hidden md:block">
        <PopularNewsTabs popularNews={[...MOCK_POPULAR_NEWS]} />
      </div>
      <Top5Grid top5={top5} label="Top 5 del día" />
      <ArticlesTimeline
        articles={timelineArticles}
        popularArticles={popularTimeline.length ? popularTimeline : undefined}
      />
    </div>
  );
}
