import { GridArticle } from "@/lib/types";
import NewsCard from "./NewsCard";

interface NewsFeedProps {
  articles: GridArticle[];
  onArticleClick: (article: GridArticle) => void;
}

export default function NewsFeed({ articles, onArticleClick }: NewsFeedProps) {
  if (!articles.length) {
    return (
      <div className="flex h-64 items-center justify-center text-gray-500">
        No hay noticias disponibles en esta sección.
      </div>
    );
  }

  const uniqueArticles = Array.from(
    new Map((articles ?? []).map((item) => [item.id, item])).values()
  );

  return (
    <div className="mx-auto max-w-2xl bg-white shadow-sm dark:bg-gray-950 md:rounded-lg md:border md:border-gray-200 md:dark:border-gray-800">
      {uniqueArticles.map((article, index) => (
        <NewsCard
          key={article.id}
          article={article}
          featured={index === 0}
          onClick={() => onArticleClick(article)}
        />
      ))}
    </div>
  );
}
