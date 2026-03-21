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
import { getProductImage } from "@/lib/products";
import { ProductBadges } from "./ProductBadges";
import { ProductStatusPill } from "./ProductStatusPill";
import ExportedImage from "next-image-export-optimizer";
import { ROUTES } from "@/lib/routes";

interface ProductCardProps {
  product: ProductBase;
  hideQuoteCart?: boolean;
}

export function ProductCard({ product, hideQuoteCart }: ProductCardProps) {
  const t = useTranslations("product");
  const tProducts = useTranslations("products");

  const name = tProducts(`${product.slug}.name`);
  const subtitleKey = `${product.slug}.subtitle`;
  const subtitle =
    typeof tProducts.has === "function" && tProducts.has(subtitleKey)
      ? tProducts(subtitleKey)
      : "";

  return (
    <Card className="group overflow-hidden hover:shadow-lg hover:border-ocean/30 transition-all duration-300">
      <Link
        href={`${ROUTES.products}/${product.categoryKey}/${product.slug}`}
        className="block"
      >
        <div className="aspect-4/3 overflow-hidden bg-white p-4">
          <ExportedImage
            width={800}
            height={600}
            src={getProductImage(product.slug)}
            alt={tProducts(`${product.slug}.imageAlt`)}
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 300px"
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
            placeholder="empty"
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
        {subtitle ? (
          <span className="text-sm text-muted-foreground">{subtitle}</span>
        ) : null}
      </CardHeader>
      <CardContent>
        <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold mb-2">
          {t("itemNumber")}: {product.itemNumber}
        </span>
        {product.comingSoon ? (
          <div className="mb-2">
            <ProductStatusPill label={t("comingSoon")} />
          </div>
        ) : null}
        <ProductBadges
          overallSize={product.overallSize}
          unitPerPack={product.unitPerPack}
          overallSizeLabel={t("overallSize")}
          unitPerPackLabel={t("unitPerPack")}
          variant="compact"
        />
      </CardContent>
      <CardFooter>
        {hideQuoteCart ? null : (
          <AddToQuoteButton
            product={product}
            variant="secondary"
            size="sm"
            className="w-full"
          />
        )}
      </CardFooter>
    </Card>
  );
}
