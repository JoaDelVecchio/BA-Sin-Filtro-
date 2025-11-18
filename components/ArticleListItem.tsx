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
      className="block border-t border-border/60 first:border-t-0"
    >
      <div className="flex items-center gap-5 py-4">
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
    </Link>
  );
};

export default ArticleListItem;
