"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field";
import { useQuote } from "./QuoteProvider";
import { ProductBase } from "@/lib/products";

type QuoteItem = Pick<ProductBase, "slug"> & { quantity: number };

interface FormattedQuoteData {
  contactInfo: {
    name: string;
    email: string;
    phone: string;
  };
  quoteItems: Array<QuoteItem>;
  metadata: {
    totalItems: number;
    totalUniqueProducts: number;
    submittedAt: string;
  };
}

export function QuoteRequestForm() {
  const tQuotePage = useTranslations("quote.submitPage");
  const { items, totalItems } = useQuote();

  const formatQuoteData = (formData: FormData): FormattedQuoteData => {
    const contactInfo = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
    };

    const quoteItems: QuoteItem[] = items.map((item) => ({
      slug: item.product.slug,
      quantity: item.quantity,
    }));

    const metadata = {
      totalItems,
      totalUniqueProducts: items.length,
      submittedAt: new Date().toLocaleString(),
    };

    return {
      contactInfo,
      quoteItems,
      metadata,
    };
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Form will be validated by HTML5 validation
    // This handler is a stub for future server action or API call
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const formattedData = formatQuoteData(formData);

    // TODO: Implement actual submission logic (e.g., server action)
    // The formatted data is now ready for API submission
    console.log("Formatted quote request data:", formattedData);
  };

  return (
    <div className="lg:w-96 shrink-0">
      <form onSubmit={handleSubmit}>
        <h2 className="text-xl font-semibold mb-4">
          {tQuotePage("contactInfo")}
        </h2>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="name">
              {tQuotePage("name")}
              <span className="text-destructive">*</span>
            </FieldLabel>
            <Input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder={tQuotePage("namePlaceholder")}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="email">
              {tQuotePage("email")}
              <span className="text-destructive">*</span>
            </FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder={tQuotePage("emailPlaceholder")}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="phone">
              {tQuotePage("phone")}
              <span className="text-destructive">*</span>
            </FieldLabel>
            <Input
              id="phone"
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              placeholder={tQuotePage("phonePlaceholder")}
            />
          </Field>

          <Button type="submit" className="w-full" size="lg">
            {tQuotePage("sendRequest")}
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
}
