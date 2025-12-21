import {
  ArticleAxiomBlock,
  GridArticle,
  StoryCluster,
} from "@/lib/types";

const ARTICLE_IMAGES = [
  "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1600&q=80",
  "/top5-placeholder.jpg",
  "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
];

const countWords = (text?: string | null) =>
  text ? text.trim().split(/\s+/).filter(Boolean).length : 0;

const countBlockWords = (blocks?: ArticleAxiomBlock[]) =>
  blocks?.reduce((sum, block) => {
    const blockText = countWords(block.text);
    const bulletWords =
      block.bullets?.reduce((bulletSum, bullet) => bulletSum + countWords(bullet), 0) ?? 0;
    return sum + blockText + bulletWords;
  }, 0) ?? 0;

export const calculateArticleWordCount = (content: {
  lede?: string;
  axiomBlocks?: ArticleAxiomBlock[];
}) => countWords(content.lede) + countBlockWords(content.axiomBlocks);

const countSourceWords = (sources?: GridArticle["sources"]) =>
  sources?.reduce((sum, source) => sum + countWords(source.text), 0) ?? 0;

export const estimateReadingTimeMinutes = (
  article: Pick<
    GridArticle,
    "lede" | "subtitle" | "axiomBlocks" | "sources" | "id" | "headline"
  >,
  options: { min?: number; max?: number; wpm?: number } = {}
) => {
  const minMinutes = options.min ?? 1;
  const maxMinutes = options.max ?? 12;
  const wordsPerMinute = options.wpm ?? 210;

  const summaryWords =
    calculateArticleWordCount(article) + countWords(article.subtitle);
  const sourceWords = countSourceWords(article.sources);
  const weightedSourceWords = sourceWords
    ? Math.min(600, Math.round(sourceWords * 0.15))
    : 0;
  const totalWords =
    summaryWords + weightedSourceWords || summaryWords || sourceWords;

  if (!totalWords) return minMinutes;

  const estimatedMinutes = Math.max(
    minMinutes,
    Math.round(totalWords / wordsPerMinute) || minMinutes
  );

  return Math.min(maxMinutes, estimatedMinutes);
};

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
  createdAt:
    cluster.sources?.[0]?.publishedAt ??
    cluster.createdAt,
  lede: cluster.lede,
  caption: cluster.subtitle,
  whyItMatters: cluster.axiomBlocks?.find(
    (block) => block.type === "why-it-matters"
  )?.text,
  primarySourceUrl: cluster.sources?.[0]?.url,
  subtitle: cluster.subtitle ?? "",
  axiomBlocks: cluster.axiomBlocks ?? [],
  tags: cluster.tags ?? [],
  sources: cluster.sources,
});
