"use client";

import { CategoryCard } from "./CategoryCard";
import type { CategoryKey } from "@/lib/products";

interface CategoryGridProps {
  categories: { key: CategoryKey; label: string; imageUrl?: string }[];
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {categories.map((category) => (
        <CategoryCard
          key={category.key}
          categoryKey={category.key}
          label={category.label}
          imageUrl={category.imageUrl}
        />
      ))}
    </div>
  );
}
