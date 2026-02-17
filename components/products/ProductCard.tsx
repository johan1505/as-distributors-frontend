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
import { getProductImageSource } from "@/lib/products";
import { ProductBadges } from "./ProductBadges";
import Image from "next/image";
import { ROUTES } from "@/lib/routes";
import { useQuote } from "../quote/QuoteProvider";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: ProductBase;
  hideQuoteCart?: boolean;
}

export function ProductCard({ product, hideQuoteCart }: ProductCardProps) {
  const t = useTranslations("product");
  const tProducts = useTranslations("products");

  const name = tProducts(`${product.slug}.name`);
  const description = tProducts(`${product.slug}.description`);

  const { items } = useQuote();

  const quantity =
    items.find((item) => item.product.slug === product.slug)?.quantity ?? 0;

  return (
    <Card className="group overflow-hidden hover:shadow-lg hover:border-ocean/30 transition-all duration-300">
      <Link
        href={`${ROUTES.products}/${product.categoryKey}/${product.slug}`}
        className="block"
      >
        <div className="aspect-4/3 overflow-hidden bg-ocean-muted/30">
          <Image
            width={800}
            height={600}
            src={getProductImageSource(product.slug)}
            alt={tProducts(`${product.slug}.imageAlt`)}
            className="w-full h-full transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      </Link>
      <CardHeader>
        <CardTitle>
          <Link
            href={`${ROUTES.products}/${product.categoryKey}/${product.slug}`}
            className="group-hover:text-ocean transition-colors line-clamp-1"
          >
            {name}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ProductBadges
          overallSize={product.overallSize}
          unitPerPack={product.unitPerPack}
          overallSizeLabel={t("overallSize")}
          unitPerPackLabel={t("unitPerPack")}
          variant="compact"
        />
        <p className="line-clamp-3 mt-4 text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter>
        {hideQuoteCart ? null : (
          <AddToQuoteButton
            product={product}
            variant="secondary"
            size="sm"
            className={cn("w-full hover:bg-primary hover:text-white", quantity > 0 ? 'bg-primary/15' : '')}
          />
        )}
      </CardFooter>
    </Card>
  );
}
