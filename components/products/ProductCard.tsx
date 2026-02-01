"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AddToQuoteButton } from "@/components/quote/AddToQuoteButton";
import type { ProductBase } from "@/lib/products";
import { Badge } from "../ui/badge";
import Image from "next/image";
import { ROUTES } from "@/lib/routes";

interface ProductCardProps {
  product: ProductBase;
  hideQuoteCart?: boolean;
}

export function ProductCard({ product, hideQuoteCart }: ProductCardProps) {
  const t = useTranslations("product");
  const tProducts = useTranslations("products");

  const name = tProducts(`${product.slug}.name`);
  const description = tProducts(`${product.slug}.description`);

  return (
    <Card className="group overflow-hidden hover:shadow-lg hover:border-ocean/30 transition-all duration-300">
      <Link
        href={`${ROUTES.products}/${product.categoryKey}/${product.slug}`}
        className="block"
      >
        <div className="aspect-4/3 overflow-hidden bg-ocean-muted/30">
          <Image
            width={100}
            height={500}
            src={product.imageUrl}
            alt={name}
            className="w-full h-full transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      </Link>
      <CardHeader>
        <CardTitle className="font-display">
          <Link
            href={`${ROUTES.products}/${product.categoryKey}/${product.slug}`}
            className="group-hover:text-ocean transition-colors line-clamp-1"
          >
            {name}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="bg-ocean-muted/50 border-ocean/10">
            <span className="text-muted-foreground">{t("overallSize")}</span>:{" "}
            <span>{product.overallSize}</span>
          </Badge>
          <Badge variant="secondary" className="bg-primary/5 border-primary/10">
            <span className="text-muted-foreground">{t("unitPerPack")}</span>:{" "}
            <span>{product.unitPerPack}</span>
          </Badge>
        </div>
        <p className="line-clamp-3 mt-4 text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter>
        {hideQuoteCart ? null : (
          <AddToQuoteButton
            product={product}
            variant="secondary"
            size="sm"
            className="w-full hover:bg-ocean hover:text-white hover:border-ocean"
          />
        )}
      </CardFooter>
    </Card>
  );
}
