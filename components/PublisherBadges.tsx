type PublisherBadgesProps = {
  publishers?: string[];
  showLabel?: boolean;
};

const PublisherBadges = ({ publishers, showLabel = true }: PublisherBadgesProps) => {
  if (!publishers?.length) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-2 text-[0.58rem] uppercase tracking-[0.3em] text-muted-foreground/70">
      {showLabel && <span className="text-muted-foreground/60">Fuentes</span>}
      {publishers.slice(0, 3).map((publisher) => (
        <span
          key={publisher}
          className="rounded-full border border-border/60 px-2 py-0.5 text-muted-foreground/90"
        >
          {publisher}
        </span>
      ))}
    </div>
  );
};

export default PublisherBadges;
