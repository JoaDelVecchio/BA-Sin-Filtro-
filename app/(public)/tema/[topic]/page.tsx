import Top5Grid from "@/components/top5/Top5Grid";
import ArticlesTimeline from "@/components/articles-timeline";
import { MOCK_CLUSTERS } from "@/lib/mocks";
import { mapClusterToGridArticle } from "@/lib/utils";

type TopicPageProps = {
  params: { topic: string };
};

const TopicPage = async ({ params }: TopicPageProps) => {
  const { topic } = await params;
  const topicKey = decodeURIComponent(topic);
  const articles = MOCK_CLUSTERS.map(mapClusterToGridArticle);
  console.log("articles", articles[0].topic);
  console.log("topic,", topicKey);
  const filtered = articles.filter(
    (article) => article.topic.toLowerCase() === topicKey.toLowerCase()
  );

  if (!filtered.length) {
    return (
      <div className="section-shell py-20 text-center text-muted-foreground">
        No encontramos artículos para este tema.
      </div>
    );
  }

  const top5 = filtered.slice(0, 5);
  const timelineArticles =
    filtered.length > 5 ? filtered.slice(5) : filtered.slice(0, 5);

  return (
    <div>
      <div className="section-shell text-center mb-[-20]">
        <p className="text-md uppercase tracking-[0.35em] text-muted-foreground/70">
          Tema
        </p>
        <h1 className="text-6xl font-semibold text-foreground">{topicKey}</h1>
      </div>
      <Top5Grid top5={top5} label={`Top 5 de ${topicKey}`} />
      <ArticlesTimeline articles={timelineArticles} variant="tag" />
    </div>
  );
};

export default TopicPage;
