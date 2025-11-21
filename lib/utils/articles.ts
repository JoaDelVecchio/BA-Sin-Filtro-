import { GridArticle, StoryCluster } from "@/lib/types";

const ARTICLE_IMAGES = [
  "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1503424886300-4b02f5f2000d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
];

export const mapClusterToGridArticle = (
  cluster: StoryCluster,
  index: number
): GridArticle => ({
  id: cluster.id,
  headline: cluster.headline,
  image: (() => {
    const fallback =
      ARTICLE_IMAGES[index % ARTICLE_IMAGES.length] ||
      "/top5-placeholder.jpg";
    if (!cluster.image) return fallback;
    if (cluster.image.includes("example.com")) {
      return fallback;
    }
    return cluster.image;
  })(),
  bias: cluster.bias,
  topic: cluster.topic,
  region: cluster.region,
  publishers: cluster.sources?.map((source) => source.source).slice(0, 3),
  createdAt: cluster.createdAt,
  summary: cluster.summary,
  caption: cluster.subtitle,
  whyItMatters: cluster.bullets?.[0],
  primarySourceUrl: cluster.sources?.[0]?.url,
  subtitle: cluster.subtitle ?? "",
  body: cluster.body ?? "",
  bullets: cluster.bullets ?? [],
  tags: cluster.tags ?? [],
  sources: cluster.sources,
});
