import Image from "next/image";
import Link from "next/link";
import Biasbar from "@/components/Biasbar";
import PublisherBadges from "@/components/PublisherBadges";
import { GridArticle } from "@/lib/types";

const FALLBACK_IMAGE = "/top5-placeholder.jpg";

type HeroArticleProps = {
  article: GridArticle;
  position?: number;
};

const HeroArticle = ({ article, position = 1 }: HeroArticleProps) => {
  const image = article.image ?? FALLBACK_IMAGE;

  return (
    <article className="group flex flex-col overflow-hidden rounded-[32px] border border-border/70 bg-card shadow-[0_24px_60px_rgba(15,15,15,0.08)] transition-shadow duration-300 hover:shadow-[0_32px_80px_rgba(15,15,15,0.12)]">
      <div className="space-y-5 p-8 lg:p-10">
        <div className="space-y-2">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.35em] text-muted-foreground/80">
            Top 5 del día
          </p>
          <div className="h-px w-14 bg-border" />
        </div>
        <Link href={`/noticia/${article.id}`} className="block">
          <h2 className="text-[2.35rem] font-semibold leading-tight text-foreground text-balance transition-colors hover:text-foreground/90">
            {position}. {article.headline}
          </h2>
        </Link>
        <PublisherBadges publishers={article.publishers} />
        <Biasbar bias={article.bias} />
      </div>
      <div className="relative h-[360px] w-full overflow-hidden transition-transform duration-500 group-hover:scale-[1.01]">
        <Image
          src={image}
          alt={article.headline}
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover"
          priority
        />
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
      </div>
    </article>
  );
};

export default HeroArticle;
