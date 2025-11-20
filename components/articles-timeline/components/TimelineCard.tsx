import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Biasbar from "@/components/Biasbar";
import PublisherBadges from "@/components/PublisherBadges";
import { GridArticle } from "@/lib/types";

const FALLBACK_IMAGE = "/top5-placeholder.jpg";

const formatTimeAgo = (dateString: string) => {
  const now = new Date();
  const past = new Date(dateString);
  const diffMs = now.getTime() - past.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));

  if (isNaN(diffMinutes)) return "";

  if (diffMinutes < 60) return `Hace ${diffMinutes} min`;
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24)
    return `Hace ${diffHours} ${diffHours === 1 ? "hora" : "horas"}`;
  const diffDays = Math.floor(diffHours / 24);
  return `Hace ${diffDays} ${diffDays === 1 ? "día" : "días"}`;
};

const TimelineCard = ({ article }: { article: GridArticle }) => {
  const image = article.image ?? FALLBACK_IMAGE;
  const timeAgo = formatTimeAgo(article.createdAt);

  return (
    <article className="relative flex flex-col gap-5 py-8 first:pt-0 last:pb-0 before:pointer-events-none before:absolute before:left-0 before:right-0 before:top-0 before:h-px before:bg-border/70 before:content-[''] after:pointer-events-none after:absolute after:left-0 after:right-0 after:top-2 after:h-px after:bg-border/40 after:content-[''] first:before:hidden first:after:hidden md:gap-6 md:py-12">
      <div className="flex flex-col gap-1 text-[0.65rem] uppercase tracking-[0.35em] text-muted-foreground/80 md:text-xs">
        <span>{timeAgo}</span>
      </div>
      <Link href={`/${article.id}`} className="block">
        <h3 className="text-[1.75rem] font-semibold leading-tight text-foreground transition-colors hover:text-foreground/90 sm:text-[2rem] md:text-[2.5rem]">
          {article.headline}
        </h3>
      </Link>
      <div className="space-y-2">
        <div className="overflow-hidden rounded-2xl">
          <Image
            src={image}
            alt={article.headline}
            width={520}
            height={400}
            className="h-56 w-full object-cover sm:h-72 md:h-[360px]"
          />
        </div>
        {article.caption && (
          <p className="text-[0.65rem] text-muted-foreground/80 sm:text-xs">
            {article.caption}
          </p>
        )}
      </div>

      {article.summary && (
        <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
          {article.summary}
        </p>
      )}
      {article.whyItMatters && (
        <div className="rounded-lg bg-muted/20 p-3 sm:rounded-xl sm:p-4">
          <p className="text-sm font-semibold text-foreground">
            ¿Por qué importa?
          </p>
          <p className="text-sm text-muted-foreground">
            {article.whyItMatters}
          </p>
        </div>
      )}

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <PublisherBadges publishers={article.publishers} />
          <Biasbar bias={article.bias} />
        </div>
        <Link
          href={`/${article.id}`}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-primary/60 px-4 py-2.5 text-sm font-medium text-primary transition hover:bg-primary/5 sm:px-5 sm:py-3 sm:text-base"
        >
          <span>Leer en profundidad</span>
          <span>~4 min</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
};

export default TimelineCard;
