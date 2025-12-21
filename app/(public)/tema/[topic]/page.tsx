import { MAIN_TOPICS } from "@/lib/constants";

export const revalidate = 86400;

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
  const { topicLabel } = normalizeTopic(topic);

  return (
    <section className="section-shell py-20 text-center">
      <div className="mx-auto flex max-w-2xl flex-col gap-4 rounded-2xl border border-border/60 bg-card/70 px-6 py-12 shadow-sm">
        <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground/70">
          Tema
        </p>
        <h1 className="text-2xl font-semibold text-foreground">
          {topicLabel}
        </h1>
        <p className="text-muted-foreground">
          Estamos trabajando en esta sección. Pronto vas a poder explorar este
          tema con análisis detallados. Mientras tanto, seguí navegando las
          últimas notas en la página principal.
        </p>
      </div>
    </section>
  );
};

export default TopicPage;
