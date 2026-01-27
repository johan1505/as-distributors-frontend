"use client";

import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/card";
import type { CategoryKey } from "@/lib/products";
import Image from "next/image";
import { ROUTES } from "@/lib/routes";

interface CategoryCardProps {
  categoryKey: CategoryKey;
  label: string;
  imageUrl?: string;
}

export function CategoryCard({
  categoryKey,
  label,
  imageUrl,
}: CategoryCardProps) {
  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer">
      <Link href={`${ROUTES.products}/${categoryKey}`} className="block">
        <div className="aspect-4/3 relative overflow-hidden">
          <Image
            width={500}
            height={500}
            src={imageUrl ?? ""}
            alt={""}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white text-center px-4">
              {label}
            </h2>
          </div>
        </div>
      </Link>
    </Card>
  );
}
