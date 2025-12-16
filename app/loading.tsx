import { cn } from "@/lib/utils";

const Skeleton = ({ className }: { className?: string }) => (
  <div
    className={cn(
      "animate-pulse rounded-xl bg-gradient-to-r from-muted/70 via-muted/50 to-muted/70",
      className
    )}
  />
);

const Loading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background/40 via-background to-background">
      <section className="section-shell py-10">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(260px,1fr)]">
          <article className="flex flex-col overflow-hidden rounded-[24px] border border-border/70 bg-card/80 shadow-[0_24px_60px_rgba(15,15,15,0.08)] backdrop-blur-sm dark:border-white/10 dark:bg-card/70">
            <div className="relative h-[240px] w-full overflow-hidden sm:h-[300px] md:h-[360px]">
              <Skeleton className="absolute inset-0 h-full w-full rounded-none" />
            </div>
            <div className="space-y-4 p-6 sm:p-8 md:p-10">
              <Skeleton className="h-3 w-24 rounded-full" />
              <Skeleton className="h-2 w-12 rounded-full" />
              <Skeleton className="h-10 w-5/6 rounded-2xl sm:h-12" />
              <Skeleton className="h-3 w-3/4 rounded-full" />
              <div className="flex gap-3">
                <Skeleton className="h-8 w-24 rounded-full" />
                <Skeleton className="h-8 w-28 rounded-full" />
                <Skeleton className="h-8 w-16 rounded-full" />
              </div>
              <Skeleton className="h-3 w-1/2 rounded-full" />
            </div>
          </article>

          <aside className="flex flex-col gap-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card/80 p-3 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-card/70"
              >
                <Skeleton className="h-20 w-32 rounded-xl sm:h-24 sm:w-36 lg:h-26 lg:w-40" />
                <div className="flex flex-1 flex-col gap-3">
                  <Skeleton className="h-3 w-10 rounded-full" />
                  <Skeleton className="h-4 w-full rounded-full" />
                  <Skeleton className="h-3 w-2/3 rounded-full" />
                  <Skeleton className="h-2.5 w-1/2 rounded-full" />
                </div>
              </div>
            ))}
          </aside>
        </div>
      </section>

      <section className="section-shell pb-12 pt-2">
        <div className="mx-auto w-full max-w-[52rem]">
          <div className="space-y-10 rounded-2xl border border-border/60 bg-card/80 p-6 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-card/70 md:p-8">
            <div className="flex justify-center">
              <div className="inline-flex gap-2 rounded-full bg-muted/30 p-1">
                <Skeleton className="h-9 w-24 rounded-full" />
                <Skeleton className="h-9 w-24 rounded-full" />
              </div>
            </div>

            <div className="space-y-10">
              {Array.from({ length: 3 }).map((_, index) => (
                <article
                  key={index}
                  className="relative flex flex-col gap-5 border-t border-border/60 pt-6 first:border-t-0 first:pt-0"
                >
                  <Skeleton className="h-3 w-24 rounded-full" />
                  <Skeleton className="h-8 w-5/6 rounded-2xl sm:h-9" />
                  <Skeleton className="h-56 w-full rounded-[24px] sm:h-64" />
                  <Skeleton className="h-4 w-full rounded-full" />
                  <Skeleton className="h-4 w-5/6 rounded-full" />
                  <div className="flex flex-wrap gap-3">
                    <Skeleton className="h-8 w-36 rounded-full" />
                    <Skeleton className="h-8 w-28 rounded-full" />
                    <Skeleton className="h-8 w-24 rounded-full" />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Loading;
