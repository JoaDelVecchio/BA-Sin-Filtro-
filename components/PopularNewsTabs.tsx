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
    <div className="w-full border-y border-border/60 bg-background/40">
      <div className=" p-3" ref={containerRef}>
        <ScrollArea
          scrollbars={[]}
          className="w-full whitespace-nowrap"
          type="scroll"
        >
          <nav aria-label="Popular news topics" className="flex flex-col gap-3">
            <div className="flex items-center gap-5 text-sm text-muted-foreground">
              {popularNews.map(({ id, title }, index) => (
                <div key={id} className="flex items-center gap-5">
                  <Link
                    href={`/noticia/${id}`}
                    className="rounded-full border border-border/70 px-5 py-2 font-medium transition-colors hover:border-foreground hover:text-foreground"
                  >
                    {title}
                  </Link>
                  {index < popularNews.length - 1 && (
                    <Separator
                      orientation="vertical"
                      className="hidden h-6 w-px shrink-0 bg-border sm:block"
                    />
                  )}
                </div>
              ))}
            </div>
          </nav>
        </ScrollArea>
      </div>
    </div>
  );
};

export default PopularNewsTabs;
