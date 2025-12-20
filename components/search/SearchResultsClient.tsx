"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import RelatedReadingList from "@/components/article/RelatedReading";
import { GridArticle } from "@/lib/types";

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");

const getTime = (article: GridArticle) => {
  const sourceTimes =
    article.sources
      ?.map((src) => Date.parse(src.publishedAt ?? ""))
      .filter((t) => Number.isFinite(t) && t > 0) ?? [];

  const time =
    Math.max(...sourceTimes, 0) ||
    Date.parse(article.createdAt ?? "") ||
    Date.parse((article as any).publishedAt ?? "") ||
    0;

  return Number.isFinite(time) ? time : 0;
};

const matchesQuery = (article: GridArticle, rawQuery: string) => {
  const normalizedQuery = normalize(rawQuery);

  const haystack = [
    article.headline,
    article.subtitle,
    article.lede,
    article.caption,
    article.whyItMatters,
    article.topic,
    ...(article.tags ?? []),
    ...(article.publishers ?? []),
    ...(article.sources?.map((src) => src.title) ?? []),
    ...(article.sources?.map((src) => src.description) ?? []),
    ...(article.sources?.map((src) => src.text) ?? []),
  ]
    .filter(Boolean)
    .map((entry) => normalize(entry as string));

  return haystack.some((entry) => entry.includes(normalizedQuery));
};

type SearchResultsClientProps = {
  articles: GridArticle[];
};

const SearchResultsClient = ({ articles }: SearchResultsClientProps) => {
  const searchParams = useSearchParams();
  const query = useMemo(
    () => (searchParams.get("q") ?? "").trim(),
    [searchParams]
  );

  const results = useMemo(() => {
    if (!query) return [];

    const scored = articles
      .map((article) => {
        let score = 0;
        const normalizedQuery = normalize(query);

        if (normalize(article.headline).includes(normalizedQuery)) score += 10;
        if (normalize(article.topic).includes(normalizedQuery)) score += 5;
        if (normalize(article.subtitle ?? "").includes(normalizedQuery)) score += 3;
        if (normalize(article.lede ?? "").includes(normalizedQuery)) score += 2;
        
        // Check content/tags for minor matches
        const contentMatch = [
          ...(article.tags ?? []),
          article.caption,
          article.whyItMatters,
        ]
          .filter(Boolean)
          .some((text) => normalize(text as string).includes(normalizedQuery));

        if (contentMatch) score += 1;

        return { article, score };
      })
      .filter((item) => item.score > 0);

    return scored
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return getTime(b.article) - getTime(a.article);
      })
      .map((item) => item.article);
  }, [articles, query]);

  const resultLabel = query
    ? results.length === 1
      ? "1 resultado"
      : `${results.length} resultados`
    : null;

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
      <div className="space-y-2 text-center">
        <div className="text-xs uppercase tracking-[0.35em] text-muted-foreground/70">
          Búsqueda
        </div>
        <h1 className="text-[2rem] font-semibold text-foreground sm:text-[2.4rem]">
          {query ? `Resultados para "${query}"` : "Buscá en nuestras notas"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {query
            ? resultLabel
            : "Escribí en la barra de búsqueda y presioná Enter para ver las notas relacionadas."}
        </p>
      </div>

      {query ? (
        results.length ? (
          <RelatedReadingList
            items={results}
            label="Resultados"
            showHeader={false}
            className="pt-0"
          />
        ) : (
          <div className="rounded-2xl border border-border/70 bg-card/60 p-8 text-center text-muted-foreground">
            No encontramos notas que coincidan con tu búsqueda.
          </div>
        )
      ) : null}
    </div>
  );
};

export default SearchResultsClient;
