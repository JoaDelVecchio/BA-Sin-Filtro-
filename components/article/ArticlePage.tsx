"use client";

import Image from "next/image";
import Link from "next/link";
import Biasbar from "@/components/Biasbar";
import PublisherBadges from "@/components/PublisherBadges";
import ShareBar from "@/components/article/ShareBar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArticleDetails, GridArticle } from "@/lib/types";

type ArticlePageProps = {
  article: ArticleDetails;
  related: GridArticle[];
};

const ArticlePage = ({ article, related }: ArticlePageProps) => {
  const readingTime = Math.max(
    4,
    Math.round((article.body?.split(" ").length ?? 400) / 200)
  );
  const formattedDate = new Date(article.createdAt).toLocaleString("es-AR", {
    dateStyle: "long",
    timeStyle: "short",
  });

  const paragraphs =
    article.body
      ?.split("\n")
      .map((paragraph) => paragraph.trim())
      .filter(Boolean) ?? [];

  return (
    <article className="section-shell mt-6 pb-16">
      <div className="mx-auto flex w-full max-w-4xl flex-col space-y-8">
        <div className="flex flex-col gap-6">
          <div className="text-xs uppercase tracking-[0.35em] text-muted-foreground/70">
            <span>{formattedDate}</span>
          </div>
          <h1 className="text-[2.85rem] font-semibold leading-tight text-foreground text-balance">
            {article.headline}
          </h1>
          {article.subtitle && (
            <p className="text-lg text-muted-foreground text-balance">
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
          <div className="overflow-hidden rounded-3xl">
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

        {article.summary && (
          <ArticleSection title="Lo esencial" text={article.summary} />
        )}

        {article.whyItMatters && (
          <ArticleSection title="Por qué importa" text={article.whyItMatters} />
        )}

        {article.bullets && article.bullets.length > 0 && (
          <ArticleSection title="Puntos clave">
            <ul className="space-y-3 text-base text-muted-foreground">
              {article.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3 text-balance">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                  <p>{bullet}</p>
                </li>
              ))}
            </ul>
          </ArticleSection>
        )}

        {paragraphs.length > 0 && (
          <ArticleSection title="En detalle">
            <div className="space-y-6 text-lg leading-relaxed text-foreground">
              {paragraphs.map((paragraph, index) => {
                const segments = paragraph.split(/(?<=\.)\s+/);
                const lead = segments[0];
                const rest = segments.slice(1).join(" ");
                return (
                  <p key={`${paragraph}-${index}`} className="text-balance">
                    <span className="font-semibold text-foreground">
                      {lead}
                    </span>
                    {rest && (
                      <span className="text-muted-foreground"> {rest}</span>
                    )}
                  </p>
                );
              })}
            </div>
          </ArticleSection>
        )}

        <Biasbar bias={article.bias} />

        {article.sources && article.sources.length > 0 && (
          <div className="w-full">
            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-primary/60 px-5 py-3 text-sm font-medium text-primary transition hover:bg-primary/5">
                Ver fuentes originales
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

        {related.length > 0 && (
          <section className="space-y-8 pt-12">
            <div className="text-center">
              <div className="text-xs uppercase tracking-[0.35em] text-muted-foreground/60">
                Explorar
              </div>
              <h2 className="mt-1 text-2xl font-semibold text-foreground">
                Qué leer después
              </h2>
            </div>
            <div className="space-y-10">
              {related.map((item) => {
                const relatedReadingTime = Math.max(
                  1,
                  Math.round((item.summary?.split(" ").length ?? 80) / 200)
                );
                return (
                  <Link
                    key={item.id}
                    href={`/${item.id}`}
                    className="flex items-center gap-8 border-t border-border/70 pt-8 transition hover:border-primary/40"
                  >
                    <div className="relative h-[140px] w-[240px] overflow-hidden rounded-2xl shadow-sm">
                      <Image
                        src={item.image || "/top5-placeholder.jpg"}
                        alt={item.headline}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-3 text-left">
                      <div className="flex items-center gap-3 text-[0.5rem] text-muted-foreground">
                        <span className="rounded-full border border-border/60 px-3 py-1 font-semibold uppercase tracking-[0.25em]">
                          {item.topic}
                        </span>
                        <span className="uppercase tracking-[0.35em]">
                          {new Date(item.createdAt).toLocaleDateString(
                            "es-AR",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </span>
                      </div>
                      <p className="text-[1.7rem] font-semibold leading-snug text-foreground">
                        {item.headline}
                      </p>
                      <span className="text-lg font-semibold text-primary">
                        Profundizar ({relatedReadingTime} min) →
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </article>
  );
};

type ArticleSectionProps = {
  title: string;
  text?: string;
  children?: React.ReactNode;
  flush?: boolean;
};

const ArticleSection = ({
  title,
  text,
  children,
  flush,
}: ArticleSectionProps) => (
  <section
    className={
      flush
        ? "space-y-3"
        : "space-y-3 rounded-[28px] border border-border/60 bg-card/80 p-6"
    }
  >
    <p className="text-sm font-semibold uppercase tracking-[0.35em] text-muted-foreground/80">
      {title}
    </p>
    {text && (
      <p className="text-base leading-relaxed text-foreground">{text}</p>
    )}
    {children}
  </section>
);

export default ArticlePage;
