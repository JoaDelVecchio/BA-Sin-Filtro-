"use client";

import Image from "next/image";
import Link from "next/link";
import Biasbar from "@/components/Biasbar";
import PublisherBadges from "@/components/PublisherBadges";
import ShareBar from "@/components/article/ShareBar";
import RelatedReadingList from "@/components/article/RelatedReading";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { estimateReadingTimeMinutes } from "@/lib/utils";
import {
  ArticleAxiomBlock,
  ArticleAxiomType,
  ArticleDetails,
  GridArticle,
} from "@/lib/types";

const AXIOM_LABELS: Record<ArticleAxiomType, string> = {
  "whats-new": "Qué hay de nuevo",
  "why-it-matters": "Por qué importa",
  "big-picture": "El panorama",
  "by-the-numbers": "Por los números",
  "how-it-works": "Cómo funciona",
  "between-the-lines": "Entre líneas",
  "yes-but": "Sí, pero",
  "what-to-watch": "Qué mirar",
  "whats-next": "Qué sigue",
  "bottom-line": "En síntesis",
  "go-deeper": "Para profundizar",
  "driving-the-news": "Qué pasó",
  "state-of-play": "Estado de situación",
  "zoom-in": "Zoom in",
  "zoom-out": "Zoom out",
  "what-theyre-saying": "Qué dicen",
  "threat-level": "Nivel de riesgo",
  "reality-check": "Reality check",
  "the-other-side": "La otra campana",
  "the-intrigue": "La intriga",
};

type ArticlePageProps = {
  article: ArticleDetails;
  related: GridArticle[];
};

const ArticlePage = ({ article, related }: ArticlePageProps) => {
  const readingTime = estimateReadingTimeMinutes(article, { min: 2, max: 12 });
  const formattedDate = new Date(article.createdAt).toLocaleString("es-AR", {
    dateStyle: "long",
    timeStyle: "short",
  });

  return (
    <article className="section-shell mt-6 pb-16">
      <div className="mx-auto flex w-full max-w-3xl flex-col space-y-10">
        <div className="flex flex-col gap-5">
          <div className="text-[0.6rem] uppercase tracking-[0.4em] text-muted-foreground/80">
            <span>{formattedDate}</span>
          </div>
          <h1 className="text-[2.4rem] font-semibold leading-tight text-foreground text-balance sm:text-[2.8rem] md:text-[3rem]">
            {article.headline}
          </h1>
          {article.subtitle && (
            <p className="text-xl leading-relaxed text-muted-foreground/90 text-balance">
              {article.subtitle}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground/80">
            <PublisherBadges publishers={article.publishers} showLabel />
            <span>•</span>
            <span>{readingTime} min de lectura</span>
            <ShareBar url={`https://basinfiltro.com/${article.id}`} />
          </div>
        </div>

        <div className="space-y-4">
          <div className="overflow-hidden rounded-2xl">
            <Image
              src={article.image || "/top5-placeholder.jpg"}
              alt={article.headline}
              width={1200}
              height={630}
              className="h-[420px] w-full object-cover"
              priority
            />
          </div>
          {article.caption && (
            <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground/70">
              {article.caption}
            </p>
          )}
        </div>

        {article.lede && (
          <p className="text-lg leading-relaxed text-foreground/95 text-balance sm:text-xl sm:leading-[1.85]">
            {article.lede}
          </p>
        )}

        {article.axiomBlocks.length > 0 && (
          <div className="flex flex-col gap-6">
            {article.axiomBlocks.map((block, index) => (
              <AxiomEntry key={`${block.type}-${index}`} block={block} />
            ))}
          </div>
        )}

        <Biasbar bias={article.bias} />

        {article.sources && article.sources.length > 0 && (
          <div className="w-full">
            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-primary/60 px-5 py-3 text-sm font-medium text-primary transition hover:bg-primary/5">
                Ver fuente original
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="min-w-[250px]">
                {article.sources.map((source) => (
                  <DropdownMenuItem key={source.id} asChild>
                    <Link href={source.url} className="w-full text-sm">
                      {source.source}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        {related.length > 0 && <RelatedReadingList items={related} />}
      </div>
    </article>
  );
};

const getAxiomLabel = (block: ArticleAxiomBlock) =>
  block.title ?? AXIOM_LABELS[block.type] ?? block.type;

const AxiomEntry = ({ block }: { block: ArticleAxiomBlock }) => {
  const label = getAxiomLabel(block);

  return (
    <section className="space-y-3">
      <p className="text-base leading-relaxed text-foreground sm:text-lg">
        <span className="font-semibold text-foreground">{label}</span>
        <span className="text-muted-foreground">: {block.text}</span>
      </p>
      {block.bullets && block.bullets.length > 0 && (
        <ul className="space-y-2 text-base leading-relaxed text-muted-foreground">
          {block.bullets.map((bullet) => (
            <li key={bullet} className="flex gap-3 text-balance">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary/80" />
              <p>{bullet}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default ArticlePage;
