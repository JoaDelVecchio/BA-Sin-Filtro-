"use client";

import { Link as LinkIcon, Share2 } from "lucide-react";

type ShareBarProps = {
  url: string;
};

const ShareBar = ({ url }: ShareBarProps) => {
  const handleShare = async () => {
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

  return (
    <div>
      <button
        className="hidden h-10 w-10 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition hover:border-primary/40 hover:text-primary sm:flex"
        onClick={copyLink}
        aria-label="Copiar enlace"
      >
        <LinkIcon className="h-4 w-4" />
      </button>
      <button
        className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/60 text-primary transition hover:bg-primary/5 sm:hidden"
        onClick={handleShare}
        aria-label="Compartir"
      >
        <Share2 className="h-4 w-4" />
      </button>
    </div>
  );
};

export default ShareBar;
