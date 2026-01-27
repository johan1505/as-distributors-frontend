"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "@/i18n/navigation";

import { CategoryKey } from "@/lib/products";
import { useTranslations } from "next-intl";
import { Label } from "../ui/label";
import { ROUTES } from "@/lib/routes";

interface CategoryFilterProps {
  selectedCategory: CategoryKey | "all";
  categories: { key: CategoryKey; label: string }[];
  allLabel: string;
  filterLabel: string;
}

export function CategoryFilter({
  selectedCategory,
  categories,
  allLabel,
  filterLabel,
}: CategoryFilterProps) {
  const t = useTranslations("categories");
  const router = useRouter();
  return (
    <div className="flex flex-col gap-4">
      <Label>{t("categoryFilter")}</Label>
      <Select value={selectedCategory}>
        <SelectTrigger className="w-full" aria-label={filterLabel}>
          <SelectValue>
            {selectedCategory === "all"
              ? allLabel
              : categories.find((c) => c.key === selectedCategory)?.label}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem
            value="all"
            onClick={() => {
              router.push(ROUTES.products);
            }}
          >
            {allLabel}
          </SelectItem>
          {categories.map((category) => (
            <SelectItem
              value={category.key}
              key={category.key}
              onClick={() => {
                router.push(`${ROUTES.products}/${category.key}`);
              }}
            >
              {category.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
