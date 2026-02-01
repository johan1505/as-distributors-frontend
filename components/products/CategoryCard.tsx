"use client";

import { Link } from "@/i18n/navigation";
import type { CategoryKey } from "@/lib/products";
import { CATEGORY_ICONS } from "@/lib/category-icons";
import { ROUTES } from "@/lib/routes";

interface CategoryCardProps {
  categoryKey: CategoryKey;
  label: string;
  index: number;
}

export function CategoryCard({ categoryKey, label, index }: CategoryCardProps) {
  const Icon = CATEGORY_ICONS[categoryKey];
  // Even indices = green, odd indices = blue
  const isBlue = index % 2 === 1;

  return (
    <Link
      href={`${ROUTES.products}/${categoryKey}`}
      className={`group block relative overflow-hidden rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
        isBlue
          ? "bg-ocean/5 hover:bg-ocean/8"
          : "bg-primary/5 hover:bg-primary/8"
      }`}
    >
      {/* Large background icon */}
      <Icon
        className={`absolute -right-6 -bottom-6 size-32 opacity-[0.06] group-hover:scale-110 transition-transform duration-500 ${
          isBlue ? "text-ocean" : "text-primary"
        }`}
        strokeWidth={1}
      />

      {/* Content */}
      <div className="relative p-6 min-h-[160px] flex flex-col justify-between">
        {/* Icon badge */}
        <div
          className={`size-14 rounded-xl flex items-center justify-center transition-all duration-300 ${
            isBlue
              ? "bg-ocean/10 group-hover:bg-ocean/15"
              : "bg-primary/10 group-hover:bg-primary/15"
          }`}
        >
          <Icon
            className={`size-7 ${isBlue ? "text-ocean/80" : "text-primary/80"}`}
            strokeWidth={1.5}
          />
        </div>

        {/* Label */}
        <h2 className="font-display text-xl font-semibold text-gray-900 leading-tight mt-4">
          {label}
        </h2>
      </div>
    </Link>
  );
}
