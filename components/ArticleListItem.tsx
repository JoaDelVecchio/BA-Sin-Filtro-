import Image from "next/image";
import Link from "next/link";
import Biasbar from "@/components/Biasbar";
import { GridArticle } from "@/lib/types";

const FALLBACK_IMAGE = "/top5-placeholder.jpg";

type ArticleListItemProps = {
  position: number;
  article: GridArticle;
};

const ArticleListItem = ({ position, article }: ArticleListItemProps) => {
  const image = article.image ?? FALLBACK_IMAGE;

  return (
    <Link
      href={`/noticia/${article.id}`}
      className="group flex items-center gap-3 rounded-2xl px-2 py-2 transition-colors hover:bg-muted/30 dark:hover:bg-white/5"
    >
      <div className="relative h-24 w-40 shrink-0 overflow-hidden rounded-2xl bg-muted/60 shadow-sm transition-shadow duration-300 group-hover:shadow-md dark:bg-white/10 dark:shadow-[0_18px_30px_rgba(2,4,12,0.65)] lg:h-26 lg:w-42">
        <Image
          src={image}
          alt={article.headline}
          fill
          sizes="(min-width: 1024px) 18vw, 50vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          priority={position <= 3}
        />
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex items-start gap-3">
          <span className="pt-1 text-lg font-semibold text-muted-foreground">
            {position}.
          </span>
          <p className="flex-1 text-base font-semibold leading-snug text-foreground">
            {article.headline}
          </p>
        </div>
        <div className="pl-8">
          <Biasbar bias={article.bias} size="compact" />
        </div>
      </div>
    </Link>
  );
};

export default ArticleListItem;
