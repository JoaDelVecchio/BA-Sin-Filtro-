import Header from "@/components/Header";
import PopularNewsTabs from "@/components/PopularNewsTabs";
import Top5Grid from "@/components/top5/Top5Grid";
import ArticlesTimeline from "@/components/articles-timeline";
import { MOCK_CLUSTERS, MOCK_POPULAR_NEWS } from "@/lib/mocks";
import { mapClusterToGridArticle } from "@/lib/utils";
import { GridArticle } from "@/lib/types";

export default async function Home() {
  const mappedArticles = MOCK_CLUSTERS.map(mapClusterToGridArticle);
  const top5 = mappedArticles.slice(0, 5);
  const timelineArticles = mappedArticles.slice(5);
  const articlesById = new Map(
    mappedArticles.map((article) => [article.id, article])
  );
  const popularTimeline = MOCK_POPULAR_NEWS.map((news) =>
    articlesById.get(news.id)
  ).filter(Boolean) as GridArticle[];

  return (
    <div className="min-h-screen ">
      <PopularNewsTabs popularNews={MOCK_POPULAR_NEWS} />
      <Top5Grid top5={top5} />
      <ArticlesTimeline
        articles={timelineArticles}
        popularArticles={popularTimeline.length ? popularTimeline : undefined}
      />
    </div>
  );
}
