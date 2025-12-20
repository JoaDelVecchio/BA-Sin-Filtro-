import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { GridArticle } from "@/lib/types";
import { cn } from "@/lib/utils";

interface NewsCardProps {
  article: GridArticle;
  featured?: boolean;
  onClick?: () => void;
}

export default function NewsCard({ article, featured, onClick }: NewsCardProps) {
  const timeAgo = formatDistanceToNow(new Date(article.createdAt), {
    addSuffix: true,
    locale: es,
  });

  return (
    <div
      onClick={onClick}
      className={cn(
        "group cursor-pointer border-b border-gray-100 bg-white p-4 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-900",
        featured ? "flex flex-col gap-3" : "flex gap-4"
      )}
    >
      {/* Text Content */}
      <div className="flex flex-1 flex-col justify-between gap-2">
        <div className="space-y-1">
          <h3
            className={cn(
              "font-bold leading-tight text-gray-900 dark:text-gray-100",
              featured ? "text-xl" : "text-base"
            )}
          >
            {article.headline}
          </h3>
          {featured && article.subtitle && (
            <p className="line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
              {article.subtitle}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span className="font-medium text-blue-600 dark:text-blue-400">
            {article.publishers?.[0] || "BA Sin Filtro"}
          </span>
          <span>•</span>
          <span>{timeAgo}</span>
        </div>
      </div>

      {/* Image */}
      {article.image && (
        <div
          className={cn(
            "relative overflow-hidden rounded-md bg-gray-100 dark:bg-gray-800",
            featured
              ? "aspect-video w-full"
              : "aspect-square h-24 w-24 flex-shrink-0"
          )}
        >
          <Image
            src={article.image}
            alt={article.headline}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes={featured ? "(max-width: 768px) 100vw, 800px" : "96px"}
          />
        </div>
      )}
    </div>
  );
}
