import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      {/* Image skeleton */}
      <div className="aspect-4/3 overflow-hidden">
        <Skeleton className="h-full w-full" />
      </div>

      {/* Header skeleton */}
      <CardHeader>
        <Skeleton className="h-5 w-3/4" />
      </CardHeader>

      {/* Content skeleton */}
      <CardContent>
        {/* Badge skeleton */}
        <Skeleton className="h-6 w-32" />

        {/* Description lines skeleton */}
        <div className="mt-4 space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
        </div>
      </CardContent>

      {/* Footer skeleton */}
      <CardFooter>
        <Skeleton className="h-9 w-full" />
      </CardFooter>
    </Card>
  );
}
