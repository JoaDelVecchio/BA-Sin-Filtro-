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
          Algo salió mal
        </p>
        <h1 className="text-display text-3xl">
          Tuvimos un problema al cargar esta vista.
        </h1>
        <p className="text-subtle">
          {error.message ??
            "Intenta nuevamente o contáctanos si el problema persiste."}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button className="btn-primary" onClick={() => reset()}>
            Intentar de nuevo
          </Button>
          <Button variant="ghost" onClick={() => window.location.assign("/")}>
            Ir al inicio
          </Button>
        </div>
      </div>
    </section>
  );
}
