import TimelineToggle from "./TimelineToggle";
import TimelineCard from "./TimelineCard";
import { GridArticle } from "@/lib/types";

interface TimelineSectionProps {
  view: "latest" | "popular";
  setView: (view: "latest" | "popular") => void;
  articles: GridArticle[];
  variant?: "default" | "tag";
}

const TimelineSection = ({
  view,
  setView,
  articles,
  variant = "default",
}: TimelineSectionProps) => (
  <section className="section-shell mt-4 pb-12 pt-6">
    <div
      className={`${
        variant === "tag" ? "mx-auto" : ""
      } w-full max-w-[52rem]`}
    >
      <div className="space-y-8 p-0 md:rounded-2xl md:border md:border-border/60 md:bg-card/90 md:p-8 md:shadow-sm dark:md:border-white/10 dark:md:bg-card">
        {variant === "default" ? (
          <div className="flex justify-center">
            <div className="inline-flex gap-1 rounded-full bg-muted/20 p-1">
              <TimelineToggle active={view === "latest"} onClick={() => setView("latest")}>
                Últimas
              </TimelineToggle>
              <TimelineToggle active={view === "popular"} onClick={() => setView("popular")}>
                Populares
              </TimelineToggle>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <span className="rounded-full bg-muted/20 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground/80">
              Últimas
            </span>
          </div>
        )}
        <div>
          {articles.map((article) => (
            <TimelineCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default TimelineSection;
