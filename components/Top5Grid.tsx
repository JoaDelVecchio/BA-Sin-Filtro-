import Image from "next/image";
import Biasbar from "@/components/Biasbar";
import { GridArticle } from "@/lib/types";

type Top5GridProps = {
  top5: GridArticle[];
};

const FALLBACK_IMAGE = "/top5-placeholder.jpg";

const Top5Grid = ({ top5 }: Top5GridProps) => {
  if (!top5?.length) {
    return null;
  }

  const [hero, ...rest] = top5;
  const heroImage = hero.image ?? FALLBACK_IMAGE;

  return (
    <section className="section-shell py-4">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(320px,1fr)]">
        <article className="flex flex-col overflow-hidden rounded-3xl bg-gradient-to-b from-card to-background shadow-xl">
          <div className="space-y-6 p-8">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">
                Top 5 del día
              </p>
              <div className="h-px w-12 bg-border" />
            </div>
            <h2 className="text-[2.6rem] font-semibold leading-[1.2] text-foreground">
              1. {hero.headline}
            </h2>
            <p className="text-sm text-muted-foreground">{hero.topic}</p>
            <Biasbar bias={hero.bias} />
          </div>
          <div className="relative h-[420px] w-full overflow-hidden">
            <Image
              src={heroImage}
              alt={hero.headline}
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover"
              priority
            />
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
          </div>
        </article>

        <aside className="flex flex-col">
          <ol className="flex flex-col">
            {rest.map((article, index) => (
              <li key={article.id}>
                <ArticleListItem position={index + 2} article={article} />
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </section>
  );
};

type ArticleListItemProps = {
  position: number;
  article: GridArticle;
};

const ArticleListItem = ({ position, article }: ArticleListItemProps) => {
  const image = article.image ?? FALLBACK_IMAGE;

  return (
    <div className="flex items-center gap-5 border-t border-border/60 py-4 first:border-t-0">
      <div className="relative h-30 w-48 shrink-0 overflow-hidden rounded-xl bg-muted/40">
        <Image
          src={image}
          alt={article.headline}
          width={230}
          height={170}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <span className="text-base font-semibold text-muted-foreground">
          {position}.
        </span>
        <p className="text-base font-medium leading-snug text-foreground">
          {article.headline}
        </p>
        <Biasbar bias={article.bias} size="compact" />
      </div>
    </div>
  );
};

export default Top5Grid;
