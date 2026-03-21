"use client";

import { ProductCard } from "./ProductCard";
import type { ProductBase } from "@/lib/products";
import { cn } from "@/lib/utils";

interface ProductGridProps {
  products: ProductBase[];
  className?: string;
}

export function ProductGrid({ products, className }: ProductGridProps) {
  return (
    <div
      className={cn(
        "grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4",
        className
      )}
    >
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </div>
  );
}
