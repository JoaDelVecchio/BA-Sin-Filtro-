import SectionLabel from "@/components/ui/section-label";
import { TopicNeed } from "@/lib/types";

type TopicAudienceNeedsProps = {
  needs: TopicNeed[];
};

const TopicAudienceNeeds = ({ needs }: TopicAudienceNeedsProps) => {
  if (!needs?.length) return null;

  return (
    <section className="rounded-2xl border border-border/70 bg-card/80 p-6">
      <SectionLabel>Lo que la gente prioriza</SectionLabel>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {needs.map((need) => (
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
  );
};

export default TopicAudienceNeeds;
