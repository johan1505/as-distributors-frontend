"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuote, MAX_PACKS_PER_QUOTE_ITEM } from "./QuoteProvider";
import {
  getProductDisplaySpecs,
  getProductImage,
  getProductSubtypeConfig,
} from "@/lib/products";
import type { ProductSlug } from "@/lib/products";
import ExportedImage from "next-image-export-optimizer";
import { ROUTES } from "@/lib/routes";
import { Badge } from "../ui/badge";
import { AddToQuoteButton } from "@/components/quote/AddToQuoteButton";
import type { InvalidQuoteTarget } from "./QuoteRequestForm";

const MAX_VISIBLE_ITEMS = 3;

type QuoteItemsListProps = {
  showQuantityErrors?: boolean;
  focusTarget?: InvalidQuoteTarget | null;
  onFocusHandled?: () => void;
};

type FlattenedQuoteListItem = {
  key: string;
  product: ReturnType<typeof useQuote>["items"][number]["product"];
  quantity: number;
  overallSize: string;
  unitPerPack: string | number;
  showUnitPerPack: boolean;
  subtypeValue?: string;
  subtitle?: string;
  showSubtitle?: boolean;
};

export function QuoteItemsList({
  showQuantityErrors = false,
  focusTarget = null,
  onFocusHandled,
}: QuoteItemsListProps) {
  const tQuote = useTranslations("quote");
  const tQuotePage = useTranslations("quote.submitPage");
  const tProducts = useTranslations("products");
  const tProduct = useTranslations("product");

  const {
    items,
    clearCart,
    getQuantity,
    setSelectedSubtypeValue,
    updateQuantity,
    totalItems,
  } = useQuote();

  // Helper to get product name from translations
  const getProductName = (slug: ProductSlug) => {
    return tProducts(`${slug}.name`);
  };
  const [showAllItems, setShowAllItems] = useState(false);
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const flattenedItems = items.reduce<FlattenedQuoteListItem[]>((acc, item) => {
    const subtypeConfig = getProductSubtypeConfig(item.product);

    if (subtypeConfig) {
      subtypeConfig.options.forEach((option) => {
        const quantity = getQuantity(item.product, option.value);
        if (quantity <= 0) {
          return;
        }

        const displaySpecs = getProductDisplaySpecs(item.product, option.value);

        acc.push({
          key: `${item.product.slug}:${option.value}`,
          product: item.product,
          quantity,
          subtypeValue: option.value,
          subtitle: option.label,
          showSubtitle: subtypeConfig.criterionKey !== "size",
          overallSize: displaySpecs.overallSize,
          unitPerPack: displaySpecs.unitPerPack,
          showUnitPerPack: displaySpecs.showUnitPerPack,
        });
      });
      return acc;
    }

    acc.push({
      key: item.product.slug,
      product: item.product,
      quantity: item.quantity ?? 0,
      overallSize: item.product.overallSize,
      unitPerPack: item.product.unitPerPack,
      showUnitPerPack: getProductDisplaySpecs(item.product).showUnitPerPack,
    });
    return acc;
  }, []);

  const hasMoreItems = flattenedItems.length > MAX_VISIBLE_ITEMS;
  const visibleItems = showAllItems
    ? flattenedItems
    : flattenedItems.slice(0, MAX_VISIBLE_ITEMS);

  const hasHiddenQuantityError =
    showQuantityErrors &&
    !showAllItems &&
    flattenedItems
      .slice(MAX_VISIBLE_ITEMS)
      .some((item) => item.quantity > MAX_PACKS_PER_QUOTE_ITEM);

  useEffect(() => {
    if (hasHiddenQuantityError) {
      setShowAllItems(true);
    }
  }, [hasHiddenQuantityError]);

  useEffect(() => {
    if (!focusTarget) return;

    const isFocusHidden =
      !showAllItems &&
      flattenedItems
        .slice(0, MAX_VISIBLE_ITEMS)
        .every(
          (item) =>
            item.key !==
            `${focusTarget.slug}${focusTarget.subtypeValue ? `:${focusTarget.subtypeValue}` : ""}`
        );

    if (isFocusHidden) {
      setShowAllItems(true);
      return;
    }

    if (focusTarget.subtypeValue) {
      setSelectedSubtypeValue(focusTarget.slug, focusTarget.subtypeValue);
    }

    const focusKey = `${focusTarget.slug}${
      focusTarget.subtypeValue ? `:${focusTarget.subtypeValue}` : ""
    }`;
    const node = inputRefs.current[focusKey];
    if (node) {
      node.focus();
      node.scrollIntoView({ block: "center", behavior: "smooth" });
      onFocusHandled?.();
    }
  }, [focusTarget, flattenedItems, onFocusHandled, setSelectedSubtypeValue, showAllItems]);

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
        {visibleItems.map((item) => {
          return (
          <li
            key={item.key}
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
              {item.subtitle && item.showSubtitle ? (
                <span className="text-sm text-muted-foreground">{item.subtitle}</span>
              ) : null}
              <Badge variant="secondary" className="bg-ocean-muted/50 border-ocean/10">
                <span className="text-foreground/70">{tProduct("overallSize")}</span>:{" "}
                <span>{item.overallSize}</span>
              </Badge>
              {item.showUnitPerPack ? (
                <Badge variant="secondary" className="bg-primary/10 border-primary/10">
                  <span className="text-foreground/70">{tProduct("unitPerPack")}</span>:{" "}
                  <span>{item.unitPerPack}</span>
                </Badge>
              ) : null}
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <AddToQuoteButton
                    product={item.product}
                    lockedSubtypeValue={item.subtypeValue}
                    variant="secondary"
                    size="sm"
                    hasError={showQuantityErrors && item.quantity > MAX_PACKS_PER_QUOTE_ITEM}
                    inputRef={(node) => {
                      inputRefs.current[item.key] = node;
                    }}
                  />
                  <Button
                    variant="destructive"
                    size="icon-sm"
                    onClick={() => {
                      if (item.subtypeValue) {
                        updateQuantity(item.product, 0, item.subtypeValue);
                        return;
                      }
                      updateQuantity(item.product, 0);
                    }}
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
          );
        })}
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
                count: flattenedItems.length - MAX_VISIBLE_ITEMS,
              })}
            </>
          )}
        </Button>
      )}
    </div>
  );
}
