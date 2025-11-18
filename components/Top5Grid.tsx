import Image from "next/image";
import { GridArticle } from "@/lib/types";

type Top5GridProps = {
  top5: GridArticle[];
};

const FALLBACK_IMAGE = "/placeholder.jpg";

const Top5Grid = ({ top5 }: Top5GridProps) => {
  if (!top5?.length) {
    return null;
  }

  const [hero, ...rest] = top5;
  const heroImage = hero.image ?? FALLBACK_IMAGE;

  return (
    <section className="section-shell py-6">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(320px,1fr)]">
        <article className="flex flex-col gap-6 rounded-3xl border border-border/50 bg-card/80 shadow-md">
          <div className="space-y-6 p-8">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">
                Top 5 del día
              </p>
              <div className="h-px w-12 bg-border" />
            </div>
            <h2 className="text-[2.6rem] font-semibold leading-tight text-foreground">
              1. {hero.headline}
            </h2>

            <p className="text-sm text-muted-foreground">
              {hero.topic} • Sesgo L/C/R {hero.bias.left}/{hero.bias.center}/
              {hero.bias.right}
            </p>
          </div>
          <div className="relative h-[420px] w-full overflow-hidden rounded-b-3xl">
            <Image
              src={heroImage}
              alt={hero.headline}
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover"
              priority
            />
          </div>
        </article>

        <aside className="flex flex-col gap-4">
          <ol className="flex flex-col gap-4">
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
    <div className="flex items-center gap-4 rounded-2xl border border-border/40 bg-card/40 p-3 shadow-sm transition hover:border-border/70">
      <div className="relative h-24 w-40 shrink-0 overflow-hidden rounded-xl bg-muted/40">
        <Image
          src={image}
          alt={article.headline}
          width={260}
          height={180}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <span className="text-base font-semibold text-muted-foreground">
          {position}.
        </span>
        <p className="text-base font-medium text-foreground">
          {article.headline}
        </p>
      </div>
    </div>
  );
};

export default Top5Grid;
