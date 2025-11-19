"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";
import Biasbar from "@/components/Biasbar";
import PublisherBadges from "@/components/PublisherBadges";
import { GridArticle } from "@/lib/types";

const FALLBACK_IMAGE = "/top5-placeholder.jpg";

type ArticlesTimelineProps = {
  articles: GridArticle[];
  popularArticles?: GridArticle[];
};

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
    <section className="section-shell mt-4 pb-12 pt-6">
      <div className="flex w-full max-w-[52rem] flex-col space-y-8 rounded-3xl border border-border/60 bg-card p-8 shadow-[0_18px_60px_rgba(0,0,0,0.06)] dark:border-white/8 dark:bg-card dark:shadow-[0_32px_90px_rgba(0,0,0,0.85)]">
        <div className="flex justify-center">
          <div className="inline-flex rounded-full border border-border/60 bg-card px-1 py-1 dark:border-white/10 dark:bg-card/90">
            <ToggleButton
              active={view === "latest"}
              onClick={() => setView("latest")}
            >
              Últimas
            </ToggleButton>
            <ToggleButton
              active={view === "popular"}
              onClick={() => setView("popular")}
            >
              Populares
            </ToggleButton>
          </div>
        </div>
        {displayedArticles.map((article) => (
          <TimelineCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
};

const TimelineCard = ({ article }: { article: GridArticle }) => {
  const image = article.image ?? FALLBACK_IMAGE;
  const timeAgo = formatTimeAgo(article.createdAt);

  return (
    <article className="flex flex-col gap-6 rounded-[32px] border border-border/60 bg-card p-7 shadow-sm transition-shadow hover:shadow-lg dark:border-white/8 dark:bg-card dark:shadow-[0_25px_80px_rgba(0,0,0,0.65)] dark:hover:shadow-[0_32px_110px_rgba(0,0,0,0.75)]">
      <div className="flex flex-col gap-1 text-xs uppercase tracking-[0.35em] text-muted-foreground/80">
        <span>{timeAgo}</span>
      </div>
      <Link href={`/${article.id}`} className="block">
        <h3 className="text-[2.5rem] font-semibold leading-tight text-foreground transition-colors hover:text-foreground/90">
          {article.headline}
        </h3>
      </Link>
      <div className="space-y-2">
        <div className="overflow-hidden rounded-2xl border border-border/60 dark:border-white/10">
          <Image
            src={image}
            alt={article.headline}
            width={520}
            height={360}
            className="h-[360px] w-full object-cover"
          />
        </div>
        {article.caption && (
          <p className="text-xs text-muted-foreground/80">{article.caption}</p>
        )}
      </div>

      {article.summary && (
        <p className="text-base leading-relaxed text-muted-foreground">
          {article.summary}
        </p>
      )}
      {article.whyItMatters && (
        <div className="rounded-2xl border border-border/70 bg-card/80 p-4 dark:border-white/10 dark:bg-card/80">
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
        {article.id && (
          <Link
            href={`/${article.id}`}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-primary/60 px-5 py-2 text-sm font-medium text-primary transition hover:bg-primary/5"
          >
            <span>Leer en profundidad</span>
            <span>~4 min</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </article>
  );
};

const ToggleButton = ({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
      active
        ? "bg-primary text-primary-foreground shadow-sm"
        : "text-muted-foreground/70"
    }`}
  >
    {children}
  </button>
);

export default ArticlesTimeline;
