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
    <section className="section-shell pt-0">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
        <article className="glass-panel relative flex flex-col gap-6 rounded-3xl border border-border/60 bg-card/70 p-8 shadow-lg">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">
              Top 5 del día
            </p>
            <h2 className="text-3xl font-semibold text-foreground lg:text-4xl">
              {hero.headline}
            </h2>
            <p className="text-sm text-muted-foreground">
              {hero.topic} • Sesgo L/C/R {hero.bias.left}/{hero.bias.center}/
              {hero.bias.right}
            </p>
          </div>
          <div className="relative w-full overflow-hidden rounded-2xl border border-border/80 bg-muted/40 shadow-md">
            <Image
              src={heroImage}
              alt={hero.headline}
              width={1024}
              height={576}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        </article>
        <div>helo</div>

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
    <div className="flex items-center gap-4 rounded-2xl border border-border/60 bg-card/60 p-3 shadow-sm transition hover:border-border">
      <div className="relative h-16 w-24 overflow-hidden rounded-xl bg-muted/40">
        <Image
          src={image}
          alt={article.headline}
          width={160}
          height={100}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          {position.toString().padStart(2, "0")}
        </span>
        <p className="line-clamp-2 text-sm font-medium text-foreground">
          {article.headline}
        </p>
      </div>
    </div>
  );
};

export default Top5Grid;
