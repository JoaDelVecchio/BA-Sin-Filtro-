"use client";

import { PopularNewsTab } from "@/lib/types";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";

type PopularNewsTabsProps = {
  popularNews: PopularNewsTab;
};

const PopularNewsTabs = ({ popularNews }: PopularNewsTabsProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const viewport = containerRef.current?.querySelector(
      "[data-slot=scroll-area-viewport]"
    ) as HTMLDivElement | null;

    if (!viewport) return;

    let animationFrame: number;
    let isPaused = false;
    const SCROLL_SPEED = 0.4;

    const step = () => {
      if (!viewport) return;
      if (viewport.scrollWidth <= viewport.clientWidth) return;

      if (!isPaused) {
        viewport.scrollLeft += SCROLL_SPEED;
        if (
          viewport.scrollLeft >=
          viewport.scrollWidth - viewport.clientWidth
        ) {
          viewport.scrollLeft = 0;
        }
      }
      animationFrame = requestAnimationFrame(step);
    };

    const handlePointerEnter = () => {
      isPaused = true;
    };
    const handlePointerLeave = () => {
      isPaused = false;
    };

    viewport.addEventListener("pointerenter", handlePointerEnter);
    viewport.addEventListener("pointerleave", handlePointerLeave);

    animationFrame = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrame);
      viewport.removeEventListener("pointerenter", handlePointerEnter);
      viewport.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [popularNews]);

  return (
    <section className="w-full border-y border-border/70 bg-card shadow-[inset_0_-1px_0_rgba(0,0,0,0.04)] dark:border-white/8 dark:bg-card dark:shadow-[inset_0_-1px_0_rgba(0,0,0,0.4)]">
      <div className="section-shell py-3" ref={containerRef}>
        <ScrollArea
          scrollbars={[]}
          className="w-full whitespace-nowrap"
          type="scroll"
        >
          <nav
            aria-label="Tópicos de alta frecuencia"
            className="flex items-center gap-6 text-sm text-muted-foreground"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground/80">
              Más Buscados
            </span>
            <ul className="flex items-center gap-4">
              {popularNews.map(({ id, title }, index) => (
                <li key={id} className="flex items-center gap-4">
                  <Link
                    href={`/tema/${encodeURIComponent(id)}`}
                    className="text-sm font-semibold text-foreground/85 transition-colors hover:text-foreground"
                  >
                    {title}
                  </Link>
                  {index < popularNews.length - 1 && (
                    <Separator
                      orientation="vertical"
                      className="hidden h-4 w-px shrink-0 bg-border sm:block"
                    />
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </ScrollArea>
      </div>
    </section>
  );
};

export default PopularNewsTabs;
