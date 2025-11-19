"use client";

import { Link as LinkIcon, Send, Share2 } from "lucide-react";

type ShareBarProps = {
  url: string;
};

const ShareBar = ({ url }: ShareBarProps) => {
  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ url });
      } catch (error) {
        console.error("Share cancelled", error);
      }
    } else {
      await navigator.clipboard.writeText(url);
    }
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
  };

  const openWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`, "_blank");
  };

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-border/70 bg-card/90 px-4 py-3 text-sm shadow-sm">
      <span className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground/70">
        Compartir
      </span>
      <button
        className="flex items-center gap-2 rounded-full border border-border/70 px-4 py-2 font-medium text-muted-foreground transition hover:text-foreground"
        onClick={share}
      >
        <Share2 className="h-4 w-4" />
        Publicar
      </button>
      <button
        className="flex items-center gap-2 rounded-full border border-border/70 px-4 py-2 font-medium text-muted-foreground transition hover:text-foreground"
        onClick={copyLink}
      >
        <LinkIcon className="h-4 w-4" />
        Copiar enlace
      </button>
      <button
        className="flex items-center gap-2 rounded-full border border-primary/60 px-4 py-2 font-semibold text-primary transition hover:bg-primary/5"
        onClick={openWhatsApp}
      >
        <Send className="h-4 w-4" />
        Enviar por WhatsApp
      </button>
    </div>
  );
};

export default ShareBar;
