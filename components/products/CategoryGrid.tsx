"use client";

import { CategoryCard } from "./CategoryCard";
import type { CategoryKey } from "@/lib/products";

interface CategoryGridProps {
  categories: { key: CategoryKey; label: string }[];
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <div className="grid gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {categories.map((category, index) => (
        <CategoryCard
          key={category.key}
          categoryKey={category.key}
          label={category.label}
          index={index}
        />
      ))}
    </div>
  );
}
