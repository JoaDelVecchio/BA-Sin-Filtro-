import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

type SectionLabelProps = {
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
  subtle?: boolean;
};

const baseClass =
  "text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground/70";
const subtleClass = "text-muted-foreground/60 tracking-[0.35em]";

const SectionLabel = ({
  children,
  className,
  asChild,
  subtle,
}: SectionLabelProps) => {
  const Component = asChild ? Slot : "p";

  return (
    <Component
      className={cn(baseClass, subtle && subtleClass, className)}
    >
      {children}
    </Component>
  );
};

export default SectionLabel;
