import TimelineToggle from "./TimelineToggle";
import TimelineCard from "./TimelineCard";
import { GridArticle } from "@/lib/types";

type TimelineSectionProps = {
  view: "latest" | "popular";
  setView: (view: "latest" | "popular") => void;
  articles: GridArticle[];
};

const TimelineSection = ({ view, setView, articles }: TimelineSectionProps) => (
  <section className="section-shell mt-4 pb-12 pt-6">
    <div className="flex w-full max-w-[52rem] flex-col space-y-8 rounded-3xl border border-border/60 bg-card p-8 shadow-[0_18px_60px_rgba(0,0,0,0.06)] dark:border-white/8 dark:bg-card dark:shadow-[0_32px_90px_rgba(0,0,0,0.85)]">
      <div className="flex justify-center">
        <div className="inline-flex rounded-full border border-border/60 bg-card px-1 py-1 dark:border-white/10 dark:bg-card/90">
          <TimelineToggle active={view === "latest"} onClick={() => setView("latest")}>
            Últimas
          </TimelineToggle>
          <TimelineToggle active={view === "popular"} onClick={() => setView("popular")}>
            Populares
          </TimelineToggle>
        </div>
      </div>
      {articles.map((article) => (
        <TimelineCard key={article.id} article={article} />
      ))}
    </div>
  </section>
);

export default TimelineSection;
