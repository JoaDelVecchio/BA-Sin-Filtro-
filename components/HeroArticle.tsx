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
    <article className="group flex flex-col overflow-hidden rounded-3xl bg-gradient-to-b from-card to-background shadow-xl transition-shadow duration-300 hover:shadow-2xl">
      <div className="space-y-6 p-8">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
            Top 5 del día
          </p>
          <div className="h-px w-12 bg-border" />
        </div>
        <Link href={`/noticia/${article.id}`} className="block">
          <h2 className="text-[2.5rem] font-semibold leading-tight text-foreground transition-colors hover:text-foreground/90">
            {position}. {article.headline}
          </h2>
        </Link>
        <PublisherBadges publishers={article.publishers} />
        <Biasbar bias={article.bias} />
      </div>
      <div className="relative h-[420px] w-full overflow-hidden transition-transform duration-500 group-hover:scale-[1.02]">
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
