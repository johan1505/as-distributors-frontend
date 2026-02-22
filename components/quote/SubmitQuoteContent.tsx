"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ShoppingCart, ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { useQuote } from "./QuoteProvider";
import { QuoteItemsList } from "./QuoteItemsList";
import { QuoteRequestForm } from "./QuoteRequestForm";
import { Link } from "@/i18n/navigation";
import { Separator } from "@/components/ui/separator";
import { ROUTES } from "@/lib/routes";
import { ProductSlug } from "@/lib/products";

type SubmitQuoteContentProps = {
  productSlugToNameMapInEnglish: Record<ProductSlug, string>;
}

export function SubmitQuoteContent({ productSlugToNameMapInEnglish }: SubmitQuoteContentProps) {
  const tQuote = useTranslations("quote");
  const tQuotePage = useTranslations("quote.submitPage");
  const { items, totalItems, clearCart } = useQuote();
  const [isItemsOpen, setIsItemsOpen] = useState(false);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <ShoppingCart className="size-16 text-muted-foreground mb-4" />
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">
          {tQuote("empty")}
        </h1>
        <p className="text-muted-foreground mb-6">
          {tQuote("emptyDescription")}
        </p>
        <Link href={ROUTES.products} className={buttonVariants()}>
          {tQuote("browseCatalog")}
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">
          {tQuotePage("title")}
        </h1>
        <p className="text-muted-foreground mb-4">
          {tQuotePage("requiredFields")}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
        <div className="flex-1">
          {/* Mobile collapsible trigger */}
          <div className="lg:hidden flex items-center gap-2 border-b border-ocean/10">
            <button
              className="flex items-center justify-between flex-1 py-3 min-w-0"
              onClick={() => setIsItemsOpen(!isItemsOpen)}
            >
              <span className="text-xl font-semibold truncate">
                {tQuotePage("itemsInQuote")} ({totalItems}{" "}
                {totalItems === 1 ? tQuotePage("item") : tQuotePage("items")})
              </span>
              {isItemsOpen ? (
                <ChevronUp className="size-5 text-muted-foreground shrink-0 ml-2" />
              ) : (
                <ChevronDown className="size-5 text-muted-foreground shrink-0 ml-2" />
              )}
            </button>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearCart}
              className="text-destructive hover:text-destructive hover:bg-destructive/10 shrink-0 py-3"
            >
              <Trash2 className="size-4 mr-1.5" />
              {tQuote("clearAll")}
            </Button>
          </div>

          {/* Items list: always visible on lg+, toggle on mobile */}
          <div className={isItemsOpen ? "" : "hidden lg:block"}>
            <QuoteItemsList />
          </div>
        </div>
        <Separator orientation="vertical" className="hidden lg:block" />
        <QuoteRequestForm productSlugToNameMapInEnglish={productSlugToNameMapInEnglish} />
      </div>
    </div>
  );
}
