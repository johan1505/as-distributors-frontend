"use client";

import { useTranslations } from "next-intl";
import { ShoppingCart } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { useQuote } from "./QuoteProvider";
import { QuoteItemsList } from "./QuoteItemsList";
import { QuoteRequestForm } from "./QuoteRequestForm";
import { Link } from "@/i18n/navigation";
import { Separator } from "@/components/ui/separator";
import { ROUTES } from "@/lib/routes";

export function SubmitQuoteContent() {
  const tQuote = useTranslations("quote");
  const tQuotePage = useTranslations("quote.submitPage");
  const { items } = useQuote();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <ShoppingCart className="size-16 text-muted-foreground mb-4" />
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
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
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          {tQuotePage("title")}
        </h1>
        <p className="text-muted-foreground mb-4">
          {tQuotePage("requiredFields")}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <QuoteItemsList />
        <Separator orientation="vertical" />
        <QuoteRequestForm />
      </div>
    </div>
  );
}
