import { X, ExternalLink, Share2 } from "lucide-react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { GridArticle, ArticleAxiomBlock } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SmartViewProps {
  article: GridArticle;
  onClose: () => void;
}

export default function SmartView({ article, onClose }: SmartViewProps) {
  const timeAgo = formatDistanceToNow(new Date(article.createdAt), {
    addSuffix: true,
    locale: es,
  });

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white dark:bg-gray-950 sm:p-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 bg-white px-4 py-3 dark:border-gray-800 dark:bg-gray-950">
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-6 w-6" />
        </Button>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon">
            <Share2 className="h-5 w-5" />
          </Button>
          {article.primarySourceUrl && (
            <a
              href={article.primarySourceUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="ghost" size="icon">
                <ExternalLink className="h-5 w-5" />
              </Button>
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1 min-h-0">
        <div className="mx-auto max-w-2xl px-4 py-6 pb-20">
          <h1 className="mb-4 text-3xl font-bold leading-tight text-gray-900 dark:text-gray-50">
            {article.headline}
          </h1>

          <div className="mb-6 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              {article.publishers?.[0] || "BA Sin Filtro"}
            </span>
            <span>•</span>
            <span>{timeAgo}</span>
          </div>

          {article.image && (
            <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
              <Image
                src={article.image}
                alt={article.headline}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="space-y-8">
            {/* Lede */}
            {article.lede && (
              <div className="text-lg leading-relaxed text-gray-800 dark:text-gray-200">
                {article.lede}
              </div>
            )}

            {/* Axioms */}
            {article.axiomBlocks?.map((block, index) => (
              <AxiomBlock key={index} block={block} />
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

function AxiomBlock({ block }: { block: ArticleAxiomBlock }) {
  return (
    <div className="space-y-2">
      <h3 className="font-bold uppercase tracking-wide text-gray-900 dark:text-gray-100">
        {block.title || formatAxiomType(block.type)}
      </h3>
      <div className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
        {block.text}
      </div>
      {block.bullets && block.bullets.length > 0 && (
        <ul className="mt-2 list-disc space-y-1 pl-5 text-gray-700 dark:text-gray-300">
          {block.bullets.map((bullet, i) => (
            <li key={i}>{bullet}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

function formatAxiomType(type: string) {
  return type.replace(/-/g, " ");
}
