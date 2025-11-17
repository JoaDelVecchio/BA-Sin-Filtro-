"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <section className="section-shell flex w-full h-full min-h-[60vh] flex-col items-center justify-center text-center">
      <div className="glass-panel max-w-md space-y-4 p-8 text-base">
        <p className="text-muted-foreground text-sm uppercase tracking-[0.4em]">
          Something went wrong
        </p>
        <h1 className="text-display text-3xl">
          We hit a snag loading this view.
        </h1>
        <p className="text-subtle">
          {error.message ??
            "Please try again or contact support if this keeps happening."}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button className="btn-primary" onClick={() => reset()}>
            Try again
          </Button>
          <Button variant="ghost" onClick={() => window.location.assign("/")}>
            Go home
          </Button>
        </div>
      </div>
    </section>
  );
}
