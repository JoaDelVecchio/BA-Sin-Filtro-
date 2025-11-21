import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const pillVariants = cva(
  "inline-flex items-center justify-center rounded-full px-3 py-1 text-[0.55rem] font-semibold uppercase tracking-[0.3em] whitespace-nowrap",
  {
    variants: {
      variant: {
        outline: "border border-border/60 text-muted-foreground",
        solid: "bg-secondary text-secondary-foreground",
        ghost: "bg-transparent text-muted-foreground",
      },
      size: {
        sm: "px-2.5 py-0.5 text-[0.5rem]",
        md: "",
      },
    },
    defaultVariants: {
      variant: "outline",
      size: "md",
    },
  }
);

type MetaPillProps = React.ComponentProps<"span"> &
  VariantProps<typeof pillVariants> & {
    asChild?: boolean;
  };

const MetaPill = ({
  className,
  variant,
  size,
  asChild,
  ...props
}: MetaPillProps) => {
  const Component = asChild ? Slot : "span";
  return (
    <Component
      className={cn(pillVariants({ variant, size }), className)}
      {...props}
    />
  );
};

export { MetaPill };
