"use client";

import Image from "next/image";
import Link from "next/link";
import Biasbar from "@/components/Biasbar";
import PublisherBadges from "@/components/PublisherBadges";
import ShareBar from "@/components/article/ShareBar";
import { ArticleDetails } from "@/lib/types";

type ArticlePageProps = {
  article: ArticleDetails;
};

const ArticlePage = ({ article }: ArticlePageProps) => {
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
    <article className="section-shell max-w-4xl mx-auto mt-6 pb-16">
      <div className="space-y-8">
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
          </div>
          <ShareBar url={`https://basinfiltro.com/noticia/${article.id}`} />
        </div>

        <div className="mt-8 space-y-4">
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
                    <span className="font-semibold text-foreground">{lead}</span>
                    {rest && (
                      <span className="text-muted-foreground"> {rest}</span>
                    )}
                  </p>
                );
              })}
            </div>
          </ArticleSection>
        )}

        <ArticleSection title="Sesgo y etiquetas" flush>
          <div className="flex flex-col gap-4">
            <Biasbar bias={article.bias} />
            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.35em] text-muted-foreground/70">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border/60 px-3 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </ArticleSection>

        {article.primarySourceUrl && (
          <Link
            href={article.primarySourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-primary/60 px-5 py-3 text-sm font-medium text-primary transition hover:bg-primary/5"
          >
            Leer fuente original
          </Link>
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

const ArticleSection = ({ title, text, children, flush }: ArticleSectionProps) => (
  <section className={flush ? "space-y-3" : "space-y-3 rounded-[28px] border border-border/60 bg-card/80 p-6"}>
    <p className="text-sm font-semibold uppercase tracking-[0.35em] text-muted-foreground/80">
      {title}
    </p>
    {text && <p className="text-base leading-relaxed text-foreground">{text}</p>}
    {children}
  </section>
);

export default ArticlePage;
