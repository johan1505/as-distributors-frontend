import { Skeleton } from "@/components/ui/skeleton";

export function SearchBarSkeleton() {
  return (
    <div className="relative md:w-full">
      <Skeleton className="h-10 w-full" />
    </div>
  );
}

