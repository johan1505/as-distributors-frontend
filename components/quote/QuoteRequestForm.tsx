"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldGroup, FieldError } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import { useQuote } from "./QuoteProvider";
import { ROUTES } from "@/lib/routes";
import { Loader2 } from "lucide-react";
import { ProductSlug } from "@/lib/products";

export type QuoteItem = { productName: string; quantity: number };

export interface QuoteRequestPayload {
  contactInfo: {
    name: string;
    email: string;
    phone: string;
  };
  quoteItems: QuoteItem[];
  metadata: {
    totalItems: number;
    totalUniqueProducts: number;
    submittedAt: string;
  };
  agreedToContact: boolean;
}

const QUOTE_API_URL = process.env.NEXT_PUBLIC_QUOTE_API_URL;

type QuoteRequestFormProps = {
  productSlugToNameMapInEnglish: Record<ProductSlug, string>;
}

export function QuoteRequestForm({ productSlugToNameMapInEnglish }: QuoteRequestFormProps) {
  const tQuotePage = useTranslations("quote.submitPage");
  const router = useRouter();
  const { items, totalItems, clearCart } = useQuote();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [agreedToContact, setAgreedToContact] = useState(false);

  const formatQuoteData = (formData: FormData): QuoteRequestPayload => {
    const contactInfo = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
    };

    const quoteItems: QuoteItem[] = items.map((item) => ({
      productName: `${productSlugToNameMapInEnglish[item.product.slug]} (${item.product.overallSize})`,
      quantity: item.quantity,
    }));

    const date = new Date();
    const submittedAt = date.toLocaleString("en-US", {
      timeZone: "America/Los_Angeles",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

    const metadata = {
      totalItems,
      totalUniqueProducts: items.length,
      submittedAt,
    };

    return {
      contactInfo,
      quoteItems,
      metadata,
      agreedToContact,
    };
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      const payload = formatQuoteData(formData);

      if (!QUOTE_API_URL) {
        throw new Error("Quote API URL is not configured");
      }

      const response = await fetch(QUOTE_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to submit quote request");
      }

      // Success: clear cart and redirect to products page
      clearCart();
      router.push(ROUTES.products);
    } catch (err) {
      console.error("Error submitting quote:", err);
      setError(tQuotePage("errorMessage"));
    } finally {
      setIsSubmitting(false);
    }
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
              disabled={isSubmitting}
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
              disabled={isSubmitting}
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
              disabled={isSubmitting}
            />
          </Field>

          <Field orientation="horizontal">
            <Checkbox
              id="agreedToContact"
              name="agreedToContact"
              required
              checked={agreedToContact}
              onCheckedChange={(checked) =>
                setAgreedToContact(checked === true)
              }
              disabled={isSubmitting}
            />
            <FieldLabel htmlFor="agreedToContact">
              {tQuotePage("agreeToContact")}
            </FieldLabel>
          </Field>

          {error ? <FieldError> {tQuotePage("errorMessage")}</FieldError> : null}
          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isSubmitting || !agreedToContact}
          >
            {isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            {tQuotePage("sendRequest")}
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
}
