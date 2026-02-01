"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Minus, Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuote } from "./QuoteProvider";
import type { ProductSlug } from "@/lib/products";
import Image from "next/image";
import { ROUTES } from "@/lib/routes";
import { Badge } from "../ui/badge";

const MAX_VISIBLE_ITEMS = 3;

export function QuoteItemsList() {
  const tQuote = useTranslations("quote");
  const tQuotePage = useTranslations("quote.submitPage");
  const tProducts = useTranslations("products");
  const tProduct = useTranslations("product");


  const { items, removeItem, updateQuantity } = useQuote();

  // Helper to get product name from translations
  const getProductName = (slug: ProductSlug) => {
    return tProducts(`${slug}.name`);
  };
  const [showAllItems, setShowAllItems] = useState(false);

  const hasMoreItems = items.length > MAX_VISIBLE_ITEMS;
  const visibleItems = showAllItems ? items : items.slice(0, MAX_VISIBLE_ITEMS);

  return (
    <div className="flex-1">
      <h2 className="text-xl font-semibold mb-4">
        {tQuotePage("itemsInQuote")}
      </h2>
      <ul className="space-y-4">
        {visibleItems.map((item) => (
          <li
            key={item.product.slug}
            className="flex items-center gap-4 p-4 rounded-xl bg-muted/50"
          >
            <Image
              width={800}
              height={600}
              src={item.product.imageUrl}
              alt={getProductName(item.product.slug)}
              className="size-20 md:size-24 object-cover rounded-lg shrink-0"
              loading="lazy"
            />
            <div className="flex flex-col gap-4">
              <Link
                href={`${ROUTES.products}/${item.product.categoryKey}/${item.product.slug}`}
                className="text-ocean transition-colors line-clamp-1"
              >
                {getProductName(item.product.slug)}
              </Link>
              <Badge variant="secondary" className="bg-ocean-muted/50 border-ocean/10">
                <span className="text-muted-foreground">{tProduct("overallSize")}</span>:{" "}
                <span>{item.product.overallSize}</span>
              </Badge>
              <div className="flex items-center gap-2 flex-wrap">
                <Button
                  variant="outline"
                  size="icon-xs"
                  onClick={() =>
                    updateQuantity(item.product.slug, item.quantity - 1)
                  }
                  aria-label="Decrease quantity"
                >
                  <Minus className="size-3" />
                </Button>
                <span className="text-center text-sm font-medium">
                  {item.quantity > 1
                    ? `${item.quantity} ${tQuote("packs")}`
                    : `${item.quantity} ${tQuote("pack")}`}
                </span>
                <Button
                  variant="outline"
                  size="icon-xs"
                  onClick={() =>
                    updateQuantity(item.product.slug, item.quantity + 1)
                  }
                  aria-label="Increase quantity"
                >
                  <Plus className="size-3" />
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  className="ml-auto"
                  onClick={() => removeItem(item.product.slug)}
                  aria-label="Remove item"
                >
                  <Trash2 className="size-4 mr-1" />
                  {tQuote("remove")}
                </Button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {hasMoreItems && (
        <Button
          variant="ghost"
          className="w-full mt-4"
          onClick={() => setShowAllItems(!showAllItems)}
        >
          {showAllItems ? (
            <>
              <ChevronUp className="size-4 mr-2" />
              {tQuotePage("showLess")}
            </>
          ) : (
            <>
              <ChevronDown className="size-4 mr-2" />
              {tQuotePage("showAllItems", {
                count: items.length - MAX_VISIBLE_ITEMS,
              })}
            </>
          )}
        </Button>
      )}
    </div>
  );
}
