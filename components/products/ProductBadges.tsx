import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ProductBadgesProps {
  overallSize: string;
  unitPerPack: string | number;
  showUnitPerPack?: boolean;
  overallSizeLabel: string;
  unitPerPackLabel: string;
  variant?: "compact" | "large";
  className?: string;
}

export function ProductBadges({
  overallSize,
  unitPerPack,
  showUnitPerPack = true,
  overallSizeLabel,
  unitPerPackLabel,
  variant = "compact",
  className,
}: ProductBadgesProps) {
  const isLarge = variant === "large";

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      <Badge
        variant="secondary"
        className={cn(
          "bg-ocean-muted/50 border-ocean/10",
          isLarge && "text-sm p-5"
        )}
      >
        <span className="text-foreground/80">{overallSizeLabel}</span>:{" "}
        <span className={isLarge ? "font-medium" : undefined}>{overallSize}</span>
      </Badge>
      {showUnitPerPack ? (
        <Badge
          variant="secondary"
          className={cn(
            "bg-primary/15 border-primary/10",
            isLarge && "text-sm p-5"
          )}
        >
          <span className="text-foreground/80">{unitPerPackLabel}</span>:{" "}
          <span className={isLarge ? "font-medium" : undefined}>{unitPerPack}</span>
        </Badge>
      ) : null}
    </div>
  );
}
