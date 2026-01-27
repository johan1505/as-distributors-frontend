"use client";

import { useTranslations } from "next-intl";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuote } from "./QuoteProvider";
import type { ProductBase } from "@/lib/products";
import { cn } from "@/lib/utils";

interface AddToQuoteButtonProps {
  product: ProductBase;
  variant?: "default" | "outline" | "secondary";
  size?: "default" | "sm" | "lg";
  className?: string;
}

export function AddToQuoteButton({
  product,
  variant = "default",
  size = "default",
  className,
}: AddToQuoteButtonProps) {
  const t = useTranslations("product");
  const { addItem, items } = useQuote();

  const quantity =
    items.find((item) => item.product.slug === product.slug)?.quantity ?? 0;

  const handleClick = () => {
    addItem(product);
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      className={cn(className, "cursor-pointer")}
    >
      <ShoppingCart data-icon="inline-start" className="size-4" />
      {quantity > 0 ? `${t("addMoreToQuote")} (${quantity})` : t("addToQuote")}
    </Button>
  );
}
