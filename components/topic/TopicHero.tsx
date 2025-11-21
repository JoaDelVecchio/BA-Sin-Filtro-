import { Badge } from "@/components/ui/badge";
import SectionLabel from "@/components/ui/section-label";
import Image from "next/image";
import { PopularTopicPageContent, GridArticle } from "@/lib/types";

type TopicHeroProps = {
  content: PopularTopicPageContent;
  spotlightArticle?: GridArticle | null;
  fallbackImage: string;
};

const TopicHero = ({
  content,
  spotlightArticle,
  fallbackImage,
}: TopicHeroProps) => (
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
          src={spotlightArticle.image || fallbackImage}
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
      <p className="mt-2 text-lg font-medium text-foreground">
        {content.heroInsight}
      </p>
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
);

export default TopicHero;
