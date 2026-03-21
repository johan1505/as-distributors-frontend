import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ProductStatusPillProps {
  label: string;
  className?: string;
}

export function ProductStatusPill({ label, className }: ProductStatusPillProps) {
  return (
    <Badge
      variant="secondary"
      className={cn(
        "bg-red-100 text-red-900 border-red-200 font-semibold text-sm h-7 px-3",
        className
      )}
    >
      {label}
    </Badge>
  );
}
