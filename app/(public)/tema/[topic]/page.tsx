import Top5Grid from "@/components/top5/Top5Grid";
import ArticlesTimeline from "@/components/articles-timeline";
import RelatedReadingList from "@/components/article/RelatedReading";
import SectionLabel from "@/components/ui/section-label";
import { mapClusterToGridArticle } from "@/lib/utils";
import { MAIN_TOPICS } from "@/lib/constants";
import { getStoryClusters } from "@/lib/story-clusters";

const REGION_TOPICS = [
  { slug: "keyword_caba", label: "CABA", region: "CABA" as const },
  {
    slug: "keyword_buenos_aires_pba",
    label: "Buenos Aires (PBA)",
    region: "PBA" as const,
  },
];

type TopicPageProps = {
  params: { topic: string };
};

const normalizeTopic = (slug: string) => {
  const decoded = decodeURIComponent(slug);
  const regionMatch = REGION_TOPICS.find(
    (entry) =>
      entry.slug === decoded ||
      entry.label.toLowerCase() === decoded.toLowerCase()
  );

  if (regionMatch) {
    return { topicLabel: regionMatch.label, region: regionMatch.region };
  }

  const match = MAIN_TOPICS.find(
    (topic) =>
      topic.code.toLowerCase() === decoded.toLowerCase() ||
      topic.label.toLowerCase() === decoded.toLowerCase()
  );

  const topicLabel = match?.label ?? decoded;
  return { topicLabel };
};

const TopicPage = async ({ params }: TopicPageProps) => {
  const { topic } = await params;
  const { topicLabel, region } = normalizeTopic(topic);

  const clusters = await getStoryClusters();
  const articles = clusters.map(mapClusterToGridArticle);
  const filtered = region
    ? articles.filter(
        (article) => article.region?.toLowerCase() === region.toLowerCase()
      )
    : articles.filter(
        (article) =>
          article.topic.toLowerCase() === topicLabel.toLowerCase()
      );

  if (!filtered.length) {
    return (
      <section className="section-shell py-20 text-center text-muted-foreground">
        <SectionLabel>Tema</SectionLabel>
        <h1 className="mt-4 text-4xl font-semibold text-foreground">
          {topicLabel}
        </h1>
        <p className="mt-2 text-base">
          No encontramos artículos recientes para este tema.
        </p>
      </section>
    );
  }

  const topThemeArticles = filtered.slice(0, 5);
  const timelineArticles =
    filtered.length > 5 ? filtered.slice(5) : topThemeArticles;
  const readingList = filtered.slice(0, 3);

  return (
    <>
      <section className="section-shell pt-10 pb-8">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-2 text-center">
          <SectionLabel>Tema</SectionLabel>
          <h1 className="text-4xl font-semibold text-foreground">
            {topicLabel}
          </h1>
        </div>
      </section>
      <Top5Grid top5={topThemeArticles} label={`Top 5 de ${topicLabel}`} />
      <ArticlesTimeline articles={timelineArticles} variant="tag" />
      {readingList.length ? (
        <RelatedReadingList
          items={readingList}
          className="section-shell pt-0"
        />
      ) : null}
    </>
  );
};

export default TopicPage;
