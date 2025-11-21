import Image from "next/image";
import Link from "next/link";
import { GridArticle } from "@/lib/types";
import { cn } from "@/lib/utils";

type RelatedReadingListProps = {
  items: GridArticle[];
  label?: string;
  title?: string;
  className?: string;
};

const FALLBACK_IMAGE = "/top5-placeholder.jpg";

const RelatedReadingList = ({
  items,
  label = "Explorar",
  title = "Qué leer después",
  className,
}: RelatedReadingListProps) => {
  if (!items.length) {
    return null;
  }

  return (
    <section className={cn("space-y-8 pt-12", className)}>
      <div className="text-center">
        <div className="text-xs uppercase tracking-[0.35em] text-muted-foreground/60">
          {label}
        </div>
        <h2 className="mt-1 text-2xl font-semibold text-foreground">{title}</h2>
      </div>
      <div className="space-y-10">
        {items.map((item) => {
          const readingTime = Math.max(
            1,
            Math.round((item.summary?.split(" ").length ?? 80) / 200)
          );
          const publishedLabel = new Date(item.createdAt).toLocaleDateString(
            "es-AR",
            {
              month: "short",
              day: "numeric",
              year: "numeric",
            }
          );
          return (
            <Link
              key={item.id}
              href={`/${item.id}`}
              className="flex items-center gap-8 border-t border-border/70 pt-8 transition hover:border-primary/40"
            >
              <div className="relative h-[140px] w-[240px] overflow-hidden rounded-xl shadow-sm">
                <Image
                  src={item.image || FALLBACK_IMAGE}
                  alt={item.headline}
                  fill
                  className="object-cover"
                  sizes="240px"
                />
              </div>
              <div className="flex flex-1 flex-col gap-3 text-left">
                <div className="flex items-center gap-3 text-[0.5rem] text-muted-foreground">
                  <span className="rounded-full border border-border/60 px-3 py-1 font-semibold uppercase tracking-[0.25em]">
                    {item.topic}
                  </span>
                  <span className="uppercase tracking-[0.35em]">
                    {publishedLabel}
                  </span>
                  {item.publishers?.[0] && (
                    <>
                      <span>•</span>
                      <span className="text-xs uppercase tracking-[0.3em]">
                        {item.publishers[0]}
                      </span>
                    </>
                  )}
                </div>
                <p className="text-[1.7rem] font-semibold leading-snug text-foreground">
                  {item.headline}
                </p>
                {item.summary && (
                  <p className="text-base text-muted-foreground">{item.summary}</p>
                )}
                <span className="text-sm font-semibold text-primary">
                  Profundizar ({readingTime} min) →
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default RelatedReadingList;
