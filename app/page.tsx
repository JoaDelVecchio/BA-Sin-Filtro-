import Header from "@/components/Header";
import PopularNewsTabs from "@/components/PopularNewsTabs";
import Top5Grid from "@/components/Top5Grid";
import ArticlesTimeline from "@/components/ArticlesTimeline";
import { MOCK_CLUSTERS, MOCK_POPULAR_NEWS } from "@/lib/mocks";
import { GridArticle } from "@/lib/types";

const TOP5_IMAGES = [
  "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1503424886300-4b02f5f2000d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
];

const mapClusterToGridArticle = (
  cluster: (typeof MOCK_CLUSTERS)[number],
  index: number
): GridArticle => ({
  id: cluster.id,
  headline: cluster.headline,
  image: TOP5_IMAGES[index % TOP5_IMAGES.length],
  bias: cluster.bias,
  topic: cluster.topic,
  publishers: cluster.sources?.map((source) => source.source).slice(0, 3),
  createdAt: cluster.createdAt,
  summary: cluster.summary,
  caption: cluster.subtitle,
  whyItMatters: cluster.bullets?.[0],
  primarySourceUrl: cluster.sources?.[0]?.url,
});

export default async function Home() {
  const mappedArticles = MOCK_CLUSTERS.map(mapClusterToGridArticle);
  const top5 = mappedArticles.slice(0, 5);
  const timelineArticles = mappedArticles.slice(5);
  const articlesById = new Map(mappedArticles.map((article) => [article.id, article]));
  const popularTimeline = MOCK_POPULAR_NEWS.map((news) =>
    articlesById.get(news.id)
  ).filter(Boolean) as GridArticle[];

  return (
    <div className="min-h-screen ">
      <Header />
      <PopularNewsTabs popularNews={MOCK_POPULAR_NEWS} />
      <Top5Grid top5={top5} />
      <ArticlesTimeline
        articles={timelineArticles}
        popularArticles={popularTimeline.length ? popularTimeline : undefined}
      />
    </div>
  );
}
