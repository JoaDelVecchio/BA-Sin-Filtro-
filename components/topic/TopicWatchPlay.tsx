import SectionLabel from "@/components/ui/section-label";
import { MetaPill } from "@/components/ui/meta-pill";
import { TopicWatchItem, TopicPlaybook } from "@/lib/types";

type TopicWatchPlayProps = {
  watchlist: TopicWatchItem[];
  playbooks: TopicPlaybook[];
};

const TopicWatchPlay = ({ watchlist, playbooks }: TopicWatchPlayProps) => (
  <section className="grid gap-6 rounded-2xl border border-border/70 bg-card/80 p-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
    <div>
      <SectionLabel>Lo que vigilamos</SectionLabel>
      <div className="mt-4 grid gap-4">
        {watchlist.map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-border/60 bg-background/60 p-4"
          >
            <MetaPill size="sm" className="text-xs tracking-[0.25em]">
              {item.label}
            </MetaPill>
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
        {playbooks.map((playbook) => (
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
);

export default TopicWatchPlay;
