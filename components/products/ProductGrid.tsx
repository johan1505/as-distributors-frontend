"use client";

import { ProductCard } from "./ProductCard";
import type { ProductBase } from "@/lib/products";

interface ProductGridProps {
  products: ProductBase[];
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}{" "}
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}{" "}
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </div>
  );
}
