import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import Link from "next/link";
import SectionLabel from "@/components/ui/section-label";
import { TopicQuickFact, TopicTrend, PopularTopicPageContent } from "@/lib/types";

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

type TopicQuickFactsProps = {
  facts: TopicQuickFact[];
  actionCard: PopularTopicPageContent["actionCard"];
};

const TopicQuickFacts = ({ facts, actionCard }: TopicQuickFactsProps) => {
  if (!facts.length) return null;

  return (
    <section className="space-y-6 rounded-2xl border border-border/70 bg-card/80 p-6">
      <div className="grid gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div className="grid gap-4 sm:grid-cols-2">
          {facts.map((fact) => {
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
                className="rounded-2xl border border-border/70 bg-card/90 p-4 shadow-[0_20px_60px_rgba(10,10,10,0.05)] backdrop-blur-sm"
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
          })}
        </div>
        <div className="rounded-2xl border border-border/60 bg-background/60 p-4">
          <SectionLabel>{actionCard.title}</SectionLabel>
          <p className="mt-3 text-base text-foreground">{actionCard.description}</p>
          {actionCard.actionLabel && actionCard.actionHref && (
            <Link
              href={actionCard.actionHref}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary"
            >
              {actionCard.actionLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default TopicQuickFacts;
