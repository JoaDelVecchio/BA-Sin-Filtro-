import { BiasBreakdown } from "@/lib/types";
import { cn } from "@/lib/utils";

type BiasbarProps = {
  bias: BiasBreakdown;
  size?: "default" | "compact";
};

const biasSegments = [
  { key: "left", label: "Izquierda", className: "bg-rose-400" },
  { key: "center", label: "Neutral", className: "bg-purple-400" },
  { key: "right", label: "Derecha", className: "bg-indigo-400" },
] as const;

const Biasbar = ({ bias, size = "default" }: BiasbarProps) => {
  const heights = size === "compact" ? "h-1.5" : "h-2";
  const textSize = size === "compact" ? "text-[0.65rem]" : "text-xs";
  const dominant = biasSegments
    .map((segment) => ({
      ...segment,
      value: bias[segment.key],
    }))
    .sort((a, b) => b.value - a.value)[0];

  return (
    <div className="flex items-center gap-3">
      <div
        className={cn(
          "flex flex-1 overflow-hidden rounded-full bg-muted/40",
          heights
        )}
      >
        {biasSegments.map((segment) => {
          const value = bias[segment.key];
          return (
            <div
              key={segment.key}
              className={cn("transition-all", segment.className)}
              style={{ width: `${value}%` }}
            />
          );
        })}
      </div>
      <div className="text-[0.7rem] text-muted-foreground whitespace-nowrap">
        {dominant.value}%{" "}
        {dominant.key === "center"
          ? "Cobertura neutral"
          : `Cobertura de ${dominant.label.toLowerCase()}`}
        • {Math.max(Math.round(dominant.value / 5), 1)} fuentes
      </div>
    </div>
  );
};

export default Biasbar;
