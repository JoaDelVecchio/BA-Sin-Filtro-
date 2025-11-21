import Image from "next/image";
import Link from "next/link";
import Biasbar from "@/components/Biasbar";
import PublisherBadges from "@/components/PublisherBadges";
import { GridArticle } from "@/lib/types";

const FALLBACK_IMAGE = "/top5-placeholder.jpg";

type HeroArticleProps = {
  article: GridArticle;
  position?: number;
  label?: string;
};

const HeroArticle = ({
  article,
  position = 1,
  label = "Top 5 del día",
}: HeroArticleProps) => {
  const image = article.image ?? FALLBACK_IMAGE;

  return (
    <article className="group flex flex-col overflow-hidden md:rounded-[24px] md:border md:border-border/70 md:bg-card md:shadow-[0_24px_60px_rgba(15,15,15,0.08)] md:transition-shadow md:duration-300 md:hover:shadow-[0_32px_80px_rgba(15,15,15,0.12)] dark:md:border-white/8 dark:md:bg-card dark:md:shadow-[0_28px_80px_rgba(0,0,0,0.78)] dark:md:hover:shadow-[0_36px_105px_rgba(0,0,0,0.85)]">
      <div className="relative order-1 h-[260px] w-full overflow-hidden transition-transform duration-500 group-hover:scale-[1.01] sm:h-[320px] lg:order-2 lg:h-[360px]">
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
      <div className="order-2 space-y-4 py-6 md:px-8 lg:order-1 lg:space-y-5 lg:p-10">
        <div className="space-y-2">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.35em] text-muted-foreground/80">
            {label}
          </p>
          <div className="h-px w-14 bg-border" />
        </div>
        <Link href={`/${article.id}`} className="block">
          <h2 className="text-[2.35rem] font-semibold leading-tight text-foreground text-balance transition-colors hover:text-foreground/90">
            {position}. {article.headline}
          </h2>
        </Link>
        <PublisherBadges publishers={article.publishers} />
        <Biasbar bias={article.bias} />
      </div>
    </article>
  );
};

export default HeroArticle;
