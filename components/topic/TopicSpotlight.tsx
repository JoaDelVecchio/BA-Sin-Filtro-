import Image from "next/image";
import Link from "next/link";
import SectionLabel from "@/components/ui/section-label";
import { MetaPill } from "@/components/ui/meta-pill";
import { GridArticle } from "@/lib/types";

type TopicSpotlightProps = {
  article: GridArticle;
  fallbackImage: string;
};

const TopicSpotlight = ({ article, fallbackImage }: TopicSpotlightProps) => {
  const image = article.image || fallbackImage;
  const published = new Date(article.createdAt).toLocaleDateString("es-AR", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return (
    <section className="grid gap-6 rounded-2xl border border-border/70 bg-card/80 p-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <div className="space-y-4">
        <SectionLabel>En foco</SectionLabel>
        <h3 className="text-3xl font-semibold leading-tight text-foreground">
          {article.headline}
        </h3>
        <p className="text-base text-muted-foreground">
          {article.lede ??
            article.whyItMatters ??
            "Seleccionamos esta cobertura para entender el pulso detrás del tema."}
        </p>
        {article.tags && article.tags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <MetaPill key={tag}>{tag}</MetaPill>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground/80">
            {article.publishers?.map((publisher) => (
              <MetaPill key={publisher} size="sm" className="text-xs tracking-[0.2em]">
                {publisher}
              </MetaPill>
            ))}
          </div>
        )}
        <Link
          href={`/${article.id}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
        >
          Abrir cobertura
        </Link>
      </div>
      <div className="relative min-h-[280px] overflow-hidden rounded-2xl border border-border/70 bg-muted/40">
        <Image
          src={image}
          alt={article.headline}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 40vw, 90vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/30 bg-white/80 p-4 text-sm text-foreground shadow-lg backdrop-blur dark:border-white/10 dark:bg-background/70">
          <SectionLabel className="text-muted-foreground/80">
            Dato rápido
          </SectionLabel>
          <p className="mt-2 text-base text-foreground">
            {article.whyItMatters ??
              article.caption ??
              `Actualizado ${published} para entender el contexto.`}
          </p>
        </div>
      </div>
    </section>
  );
};

export default TopicSpotlight;
