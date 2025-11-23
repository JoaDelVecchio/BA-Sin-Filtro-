import Top5Grid from "@/components/top5/Top5Grid";
import ArticlesTimeline from "@/components/articles-timeline";
import { mapClusterToGridArticle } from "@/lib/utils";
import { GridArticle, TopicQuickFact } from "@/lib/types";
import { getPopularTopicContent } from "@/lib/popular-topic-content";
import { getStoryClusters } from "@/lib/story-clusters";
import RelatedReadingList from "@/components/article/RelatedReading";
import TopicHero from "@/components/topic/TopicHero";
import TopicAudienceNeeds from "@/components/topic/TopicAudienceNeeds";
import TopicQuickFacts from "@/components/topic/TopicQuickFacts";
import TopicWatchPlay from "@/components/topic/TopicWatchPlay";
import TopicSpotlight from "@/components/topic/TopicSpotlight";
import TopicQuestions from "@/components/topic/TopicQuestions";

export const revalidate = 86400;

const FALLBACK_VISUAL_IMAGE = "/top5-placeholder.jpg";

type PopularTopicPageProps = {
  params: { topic: string };
};

const PopularTopicPage = async ({ params }: PopularTopicPageProps) => {
  const { topic } = await params;
  const decoded = decodeURIComponent(topic);
  const content =
    getPopularTopicContent(decoded) ??
    getPopularTopicContent(decoded.toLowerCase());

  if (!content) {
    return (
      <section className="section-shell py-20 text-center text-muted-foreground">
        No encontramos este tema dentro de los más buscados.
      </section>
    );
  }

  const clusters = await getStoryClusters();
  const articles = clusters.map(mapClusterToGridArticle);
  const filtered = articles.filter(
    (article) =>
      article.topic.toLowerCase() === content.targetTopic.toLowerCase()
  );
  const hasArticles = filtered.length > 0;
  const topThemeArticles = hasArticles ? filtered.slice(0, 5) : [];
  const timelineArticles =
    hasArticles && filtered.length > 5 ? filtered.slice(5) : topThemeArticles;
  const readingList = hasArticles ? filtered.slice(0, 3) : [];
  const spotlightArticle: GridArticle | undefined = hasArticles
    ? filtered[0]
    : undefined;

  const quickFacts: TopicQuickFact[] = [
    {
      label: "Notas monitoreadas",
      value: hasArticles ? `${filtered.length}` : "0",
      helper: "Últimas 48 hs",
      trend: "stable",
      tone: "neutral",
    },
    ...content.quickFacts,
  ];

  return (
    <>
      <section className="section-shell pt-10 pb-8">
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
          <TopicHero
            content={content}
            spotlightArticle={spotlightArticle}
            fallbackImage={FALLBACK_VISUAL_IMAGE}
          />
          <TopicAudienceNeeds needs={content.audienceNeeds ?? []} />
          <TopicQuickFacts facts={quickFacts} actionCard={content.actionCard} />
          <TopicWatchPlay
            watchlist={content.watchlist ?? []}
            playbooks={content.playbooks ?? []}
          />
        </div>
      </section>
      <Top5Grid top5={topThemeArticles} label={`Top 5 de ${content.title}`} />
      <ArticlesTimeline articles={timelineArticles} variant="tag" />
      {spotlightArticle && (
        <section className="section-shell pt-0">
          <div className="mx-auto max-w-4xl">
            <TopicSpotlight
              article={spotlightArticle}
              fallbackImage={FALLBACK_VISUAL_IMAGE}
            />
          </div>
        </section>
      )}
      {readingList.length ? (
        <RelatedReadingList
          items={readingList}
          className="section-shell pt-0"
        />
      ) : null}
      <section className="section-shell pt-0">
        <div className="mx-auto max-w-4xl">
          <TopicQuestions qas={content.qas ?? []} />
        </div>
      </section>
    </>
  );
};

export default PopularTopicPage;
