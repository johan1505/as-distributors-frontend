"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuote, MAX_PACKS_PER_QUOTE_ITEM } from "./QuoteProvider";
import { getProductImage } from "@/lib/products";
import type { ProductSlug } from "@/lib/products";
import ExportedImage from "next-image-export-optimizer";
import { ROUTES } from "@/lib/routes";
import { Badge } from "../ui/badge";
import { AddToQuoteButton } from "@/components/quote/AddToQuoteButton";

const MAX_VISIBLE_ITEMS = 3;

type QuoteItemsListProps = {
  showQuantityErrors?: boolean;
  focusSlug?: ProductSlug | null;
  onFocusHandled?: () => void;
};

export function QuoteItemsList({
  showQuantityErrors = false,
  focusSlug = null,
  onFocusHandled,
}: QuoteItemsListProps) {
  const tQuote = useTranslations("quote");
  const tQuotePage = useTranslations("quote.submitPage");
  const tProducts = useTranslations("products");
  const tProduct = useTranslations("product");


  const { items, removeItem, clearCart, totalItems } = useQuote();

  // Helper to get product name from translations
  const getProductName = (slug: ProductSlug) => {
    return tProducts(`${slug}.name`);
  };
  const [showAllItems, setShowAllItems] = useState(false);
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const hasMoreItems = items.length > MAX_VISIBLE_ITEMS;
  const visibleItems = showAllItems ? items : items.slice(0, MAX_VISIBLE_ITEMS);
  const hasHiddenQuantityError =
    showQuantityErrors &&
    !showAllItems &&
    items.slice(MAX_VISIBLE_ITEMS).some((item) => item.quantity > MAX_PACKS_PER_QUOTE_ITEM);

  useEffect(() => {
    if (hasHiddenQuantityError) {
      setShowAllItems(true);
    }
  }, [hasHiddenQuantityError]);

  useEffect(() => {
    if (!focusSlug) return;

    const isFocusHidden =
      !showAllItems &&
      items.slice(0, MAX_VISIBLE_ITEMS).every((item) => item.product.slug !== focusSlug);

    if (isFocusHidden) {
      setShowAllItems(true);
      return;
    }

    const node = inputRefs.current[focusSlug];
    if (node) {
      node.focus();
      node.scrollIntoView({ block: "center", behavior: "smooth" });
      onFocusHandled?.();
    }
  }, [focusSlug, items, onFocusHandled, showAllItems]);

  return (
    <div className="flex-1">
      <div className="hidden lg:flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">
          {tQuotePage("itemsInQuote")} ({totalItems}{" "}
          {totalItems === 1 ? tQuotePage("item") : tQuotePage("items")})
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearCart}
          className="text-destructive hover:text-destructive hover:bg-destructive/10 shrink-0"
        >
          <Trash2 className="size-4 mr-1.5" />
          {tQuote("clearAll")}
        </Button>
      </div>
      <ul className="space-y-4">
        {visibleItems.map((item) => (
          <li
            key={item.product.slug}
            className="flex items-center gap-4 p-4 rounded-xl bg-muted/50"
          >
            <ExportedImage
              width={800}
              height={600}
              src={getProductImage(item.product.slug)}
              alt={tProducts(`${item.product.slug}.imageAlt`)}
              sizes="96px"
              className="size-20 md:size-24 object-contain bg-white rounded-lg shrink-0"
              placeholder="empty"
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
                <span className="text-foreground/70">{tProduct("overallSize")}</span>:{" "}
                <span>{item.product.overallSize}</span>
              </Badge>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <AddToQuoteButton
                    product={item.product}
                    variant="secondary"
                    size="sm"
                    hasError={showQuantityErrors && item.quantity > MAX_PACKS_PER_QUOTE_ITEM}
                    inputRef={(node) => {
                      inputRefs.current[item.product.slug] = node;
                    }}
                  />
                  <Button
                    variant="destructive"
                    size="icon-sm"
                    onClick={() => removeItem(item.product.slug)}
                    aria-label="Remove item"
                    className="rounded-full"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
                {showQuantityErrors && item.quantity > MAX_PACKS_PER_QUOTE_ITEM ? (
                  <span className="text-xs text-destructive">
                    {tQuotePage("maxPacksPerItem", { max: MAX_PACKS_PER_QUOTE_ITEM })}
                  </span>
                ) : null}
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
