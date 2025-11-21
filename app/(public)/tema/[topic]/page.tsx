import { MOCK_CLUSTERS } from "@/lib/mocks";
import { mapClusterToGridArticle } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { ArrowDownRight, ArrowRight, ArrowUpRight, Minus } from "lucide-react";
import {
  TopicQuickFact,
  PopularTopicPageContent,
  TopicTrend,
} from "@/lib/types";
import { getPopularTopicContent } from "@/lib/popular-topic-content";
import { MAIN_TOPICS } from "@/lib/constants";
import RelatedReadingList from "@/components/article/RelatedReading";
import SectionLabel from "@/components/ui/section-label";
import { MetaPill } from "@/components/ui/meta-pill";

type TopicPageProps = {
  params: { topic: string };
};

const trendIconMap: Record<TopicTrend, typeof ArrowUpRight> = {
  up: ArrowUpRight,
  down: ArrowDownRight,
  stable: Minus,
};

const toneStyles = {
  positive: "text-success",
  negative: "text-destructive",
  neutral: "text-muted-foreground",
};

const normalizeTopic = (
  slug: string
): {
  content?: PopularTopicPageContent;
  topicLabel: string;
} => {
  const decoded = decodeURIComponent(slug);
  const content =
    getPopularTopicContent(decoded) ?? getPopularTopicContent(decoded.toLowerCase());

  if (content) {
    return { content, topicLabel: content.title };
  }

  const match = MAIN_TOPICS.find(
    (topic) =>
      topic.code.toLowerCase() === decoded.toLowerCase() ||
      topic.label.toLowerCase() === decoded.toLowerCase()
  );

  const topicLabel = match?.label ?? decoded;
  return { topicLabel };
};

const FALLBACK_VISUAL_IMAGE = "/top5-placeholder.jpg";

const TopicPage = async ({ params }: TopicPageProps) => {
  const { topic } = await params;
  const { content, topicLabel } = normalizeTopic(topic);
  const targetTopic =
    content?.targetTopic ??
    (MAIN_TOPICS.find((item) => item.label === topicLabel)?.label as
      | PopularTopicPageContent["targetTopic"]
      | undefined);

  const articles = MOCK_CLUSTERS.map(mapClusterToGridArticle);
  const filtered = targetTopic
    ? articles.filter(
        (article) => article.topic.toLowerCase() === targetTopic.toLowerCase()
      )
    : [];

  const hasArticles = filtered.length > 0;

  if (!content && !hasArticles) {
    return (
      <section className="section-shell py-20">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 text-center text-muted-foreground">
          <SectionLabel className="text-muted-foreground">Tema</SectionLabel>
          <h1 className="text-4xl font-semibold text-foreground">
            {topicLabel}
          </h1>
          <p className="text-base">
            Todavía no tenemos suficientes datos para construir esta página. Volvé pronto.
          </p>
        </div>
      </section>
    );
  }

  const spotlightArticle = hasArticles ? filtered[0] : null;
  const readingList = hasArticles ? filtered.slice(0, 3) : [];

  const quickFacts: TopicQuickFact[] = content
    ? [
        {
          label: "Notas monitoreadas",
          value: hasArticles ? `${filtered.length}` : "0",
          helper: "Últimas 48 hs",
          trend: "stable",
          tone: "neutral",
        },
        ...content.quickFacts,
      ]
    : [];

  const quickFactCard = (fact: TopicQuickFact) => {
    const toneClass = fact.tone ? toneStyles[fact.tone] : "text-muted-foreground";
    const Icon = fact.trend ? trendIconMap[fact.trend] : null;
    const trendLabel =
      fact.trend === "up"
        ? "En alza"
        : fact.trend === "down"
          ? "Cede"
          : fact.trend === "stable"
            ? "Estable"
            : null;

    return (
      <div
        key={`${fact.label}-${fact.value}`}
        className="rounded-2xl border border-border/70 bg-card/90 p-4 shadow-[0_20px_60px_rgba(10,10,10,0.05)] backdrop-blur-sm dark:border-white/10 dark:bg-card/80"
      >
        <SectionLabel className="text-muted-foreground/80">
          {fact.label}
        </SectionLabel>
        <div className="mt-3 flex items-baseline gap-2">
          <p className="text-3xl font-semibold text-foreground">{fact.value}</p>
          {Icon && trendLabel && (
            <span className={`inline-flex items-center gap-1 text-sm ${toneClass}`}>
              <Icon className="size-4" />
              {trendLabel}
            </span>
          )}
        </div>
        {fact.helper && (
          <p className="mt-2 text-sm text-muted-foreground">{fact.helper}</p>
        )}
      </div>
    );
  };

  return (
    <section className="section-shell pt-10 pb-16">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-10">
        {content ? (
          <header className="space-y-6">
            <Badge
              variant="secondary"
              className="bg-secondary/70 text-secondary-foreground uppercase tracking-[0.3em]"
            >
              {content.heroKicker}
            </Badge>
            <div className="space-y-3">
              <h1 className="text-4xl font-semibold leading-tight text-foreground md:text-5xl">
                {content.title}
              </h1>
              <p className="text-lg text-muted-foreground">{content.heroDescription}</p>
              <p className="text-sm font-medium text-muted-foreground/80">
                {content.heroUpdatedAt}
              </p>
            </div>
            {spotlightArticle && (
              <div className="overflow-hidden rounded-2xl">
                <Image
                  src={spotlightArticle.image || FALLBACK_VISUAL_IMAGE}
                  alt={spotlightArticle.headline}
                  width={1200}
                  height={630}
                  className="h-[360px] w-full object-cover"
                  priority
                />
              </div>
            )}
            <div className="rounded-2xl border border-border/70 bg-card/80 p-6">
              <SectionLabel className="text-muted-foreground/80">
                Lo que importa
              </SectionLabel>
              <p className="mt-2 text-lg font-medium text-foreground">{content.heroInsight}</p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {content.narrative.map((item) => (
                <article
                  key={item.title}
                  className="rounded-2xl border border-border/70 bg-card/80 p-5"
                >
                  <SectionLabel className="text-sm tracking-[0.25em] text-muted-foreground/70">
                    {item.title}
                  </SectionLabel>
                  <p className="mt-2 text-base text-foreground/90">{item.description}</p>
                </article>
              ))}
            </div>
          </header>
        ) : (
          <header className="space-y-4">
            <SectionLabel>Tema</SectionLabel>
            <h1 className="text-4xl font-semibold text-foreground">{topicLabel}</h1>
            <p className="text-base text-muted-foreground">
              Seguimos las novedades más relevantes para este tópico. Pronto sumaremos más
              contexto editorial.
            </p>
          </header>
        )}

        {content?.audienceNeeds?.length ? (
          <section className="rounded-2xl border border-border/70 bg-card/80 p-6">
            <SectionLabel>Lo que la gente prioriza</SectionLabel>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {content.audienceNeeds.map((need) => (
                <article
                  key={need.title}
                  className="rounded-2xl border border-border/70 bg-background/60 p-4"
                >
                  <h3 className="text-lg font-semibold text-foreground">{need.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{need.detail}</p>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {content && (
          <section className="space-y-6 rounded-2xl border border-border/70 bg-card/80 p-6">
            <div className="grid gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
              <div className="grid gap-4 sm:grid-cols-2">
                {quickFacts.map(quickFactCard)}
              </div>
              <div className="rounded-2xl border border-border/60 bg-background/60 p-4">
                <SectionLabel>{content.actionCard.title}</SectionLabel>
                <p className="mt-3 text-base text-foreground">{content.actionCard.description}</p>
                {content.actionCard.actionLabel && content.actionCard.actionHref && (
                  <Link
                    href={content.actionCard.actionHref}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary"
                  >
                    {content.actionCard.actionLabel}
                    <ArrowRight className="size-4" />
                  </Link>
                )}
              </div>
            </div>
          </section>
        )}

        {content && (
          <section className="grid gap-6 rounded-2xl border border-border/70 bg-card/80 p-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <div>
              <SectionLabel>Lo que vigilamos</SectionLabel>
              <div className="mt-4 grid gap-4">
                {content.watchlist.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-border/60 bg-background/60 p-4"
                  >
                    <SectionLabel className="text-sm tracking-[0.25em] text-foreground">
                      {item.label}
                    </SectionLabel>
                    <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                    <SectionLabel className="mt-3 text-muted-foreground/70">
                      Impacto: {item.impact}
                    </SectionLabel>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <SectionLabel>Playbooks accionables</SectionLabel>
              <div className="mt-4 space-y-4">
                {content.playbooks.map((playbook) => (
                  <article
                    key={playbook.title}
                    className="rounded-xl border border-border/60 bg-background/60 p-4"
                  >
                    <SectionLabel className="text-[0.65rem] tracking-[0.4em] text-muted-foreground/70">
                      {playbook.audience}
                    </SectionLabel>
                    <h3 className="mt-2 text-lg font-semibold text-foreground">
                      {playbook.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">{playbook.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {spotlightArticle && (
          <section className="grid gap-6 rounded-2xl border border-border/70 bg-card/80 p-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <div className="space-y-4">
              <SectionLabel>En foco</SectionLabel>
              <h3 className="text-3xl font-semibold leading-tight text-foreground">
                {spotlightArticle.headline}
              </h3>
              <p className="text-base text-muted-foreground">
                {spotlightArticle.summary ??
                  content?.heroInsight ??
                  "Seleccionamos esta cobertura para entender el pulso detrás del tema."}
              </p>
              {spotlightArticle.tags && spotlightArticle.tags.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {spotlightArticle.tags.map((tag) => (
                    <MetaPill key={tag}>{tag}</MetaPill>
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-2 text-sm text-muted-foreground/80">
                  {spotlightArticle.publishers?.map((publisher) => (
                    <MetaPill key={publisher} size="sm" className="text-xs tracking-[0.2em]">
                      {publisher}
                    </MetaPill>
                  ))}
                </div>
              )}
              <Link
                href={`/${spotlightArticle.id}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
              >
                Abrir cobertura
                <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="relative min-h-[280px] overflow-hidden rounded-2xl border border-border/70 bg-muted/40">
              <Image
                src={spotlightArticle.image || FALLBACK_VISUAL_IMAGE}
                alt={spotlightArticle.headline}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 40vw, 90vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/30 bg-white/80 p-4 text-sm text-foreground shadow-lg backdrop-blur dark:border-white/10 dark:bg-background/70">
                <SectionLabel className="text-muted-foreground/80">
                  Dato rápido
                </SectionLabel>
                <p className="mt-2 text-base text-foreground">
                  {spotlightArticle.whyItMatters ??
                    spotlightArticle.caption ??
                    "Este gráfico resume por qué esta historia marca la agenda."}
                </p>
              </div>
            </div>
          </section>
        )}

        {readingList.length ? (
          <RelatedReadingList items={readingList} className="pt-0" />
        ) : (
          <section className="rounded-2xl border border-dashed border-border/70 bg-card/80 p-6 text-center text-muted-foreground">
            Aún no tenemos artículos recientes. Estamos monitoreando fuentes para este tema.
          </section>
        )}

        {content && (
          <section className="rounded-2xl border border-border/70 bg-card/80 p-6">
            <SectionLabel>Preguntas clave</SectionLabel>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {content.qas.map((qa) => (
                <div
                  key={qa.question}
                  className="rounded-2xl border border-border/70 bg-background/60 p-5"
                >
                  <h3 className="text-base font-semibold text-foreground">{qa.question}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{qa.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </section>
  );
};

export default TopicPage;
