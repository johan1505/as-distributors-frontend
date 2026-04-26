"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { isPossiblePhoneNumber } from "react-phone-number-input";
import { useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldGroup, FieldError } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import { useQuote, MAX_PACKS_PER_QUOTE_ITEM } from "./QuoteProvider";
import { ROUTES } from "@/lib/routes";
import { Loader2 } from "lucide-react";
import {
  getProductSubtypeConfig,
  ProductSlug,
} from "@/lib/products";
import { PhoneInput } from "@/components/ui/phone-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SALES_REP_OPTIONS = [
  "Judith",
  "Sanjay",
  "Ajay",
  "New customer",
] as const;

type SalesRepOption = (typeof SALES_REP_OPTIONS)[number];

export type QuoteItem = {
  productName: string;
  itemNumber: string;
  quantity: number;
  variantLabel?: string;
  variantValue?: string;
};

export type InvalidQuoteTarget = {
  slug: ProductSlug;
  subtypeValue?: string;
};

export interface QuoteRequestPayload {
  contactInfo: {
    name: string;
    companyName: string;
    email: string;
    phone: string;
    zipCode: string;
    salesRep: SalesRepOption;
  };
  quoteItems: QuoteItem[];
  metadata: {
    totalItems: number;
    totalUniqueProducts: number;
    submittedAt: string;
  };
  agreedToContact: boolean;
}

type QuoteApiResponse = {
  success: boolean;
  error?: string;
  message?: string;
  details?: string[];
};

type SubmissionStage = "prepare" | "submit";

type FormValues = {
  name: string;
  companyName: string;
  email: string;
  phone: string;
  zip: string;
  salesRep: SalesRepOption | "";
};

type FieldName = keyof FormValues | "agreedToContact";

type FieldErrors = Partial<Record<FieldName, string>>;

const QUOTE_API_BASE_URL = process.env.NEXT_PUBLIC_QUOTE_API_URL?.trim();
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ZIP_CODE_REGEX = /^[0-9]{5}(?:-?[0-9]{4})?$/;

const QUOTE_API_URL = (() => {
  if (!QUOTE_API_BASE_URL) {
    return null;
  }

  try {
    return new URL("/quote", QUOTE_API_BASE_URL).toString();
  } catch (error) {
    console.error("Invalid quote API URL:", error);
    return null;
  }
})();

const getCaughtErrorMessage = (error: unknown): string => {
  const normalize = (value: string): string => {
    const normalized = value.replace(/\s+/g, " ").trim();
    return normalized.length > 0 ? normalized.slice(0, 180) : "Unknown error";
  };

  if (error instanceof Error) {
    return normalize(error.message || error.name || "Unknown error");
  }

  if (typeof error === "string") {
    return normalize(error);
  }

  if (
    typeof error === "number" ||
    typeof error === "boolean" ||
    typeof error === "bigint" ||
    typeof error === "symbol"
  ) {
    return normalize(String(error));
  }

  if (error === null || error === undefined) {
    return "Unknown error";
  }

  if (typeof error === "object") {
    const objectWithMessage = error as { message?: unknown; name?: unknown };
    if (typeof objectWithMessage.message === "string") {
      return normalize(objectWithMessage.message);
    }

    if (typeof objectWithMessage.name === "string") {
      return normalize(objectWithMessage.name);
    }

    try {
      return normalize(JSON.stringify(error));
    } catch {
      return "Unserializable thrown value";
    }
  }

  return "Unknown error";
};

type QuoteRequestFormProps = {
  productSlugToNameMapInEnglish: Record<ProductSlug, string>;
  onQuantityValidationFailed?: (invalidTargets: InvalidQuoteTarget[]) => void;
}

export function QuoteRequestForm({
  productSlugToNameMapInEnglish,
  onQuantityValidationFailed,
}: QuoteRequestFormProps) {
  const tQuotePage = useTranslations("quote.submitPage");
  const router = useRouter();
  const { items, totalItems, clearCart } = useQuote();

  const [formValues, setFormValues] = useState<FormValues>({
    name: "",
    companyName: "",
    email: "",
    phone: "",
    zip: "",
    salesRep: "",
  });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionErrors, setSubmissionErrors] = useState<string[]>([]);
  const [agreedToContact, setAgreedToContact] = useState(false);

  const getSafeClientErrorMessages = (
    stage: SubmissionStage,
  ): string[] => {
    if (stage === "prepare") {
      return [
        "We couldn't prepare your quote request on this device. Please refresh and try again.",
        "If it keeps happening, try a different browser or device.",
      ];
    }

    if (typeof navigator !== "undefined" && !navigator.onLine) {
      return [
        "Your device appears to be offline. Please check your connection and try again.",
      ];
    }

    return [
      tQuotePage("errorMessage"),
      "If it keeps happening, try a different browser or device.",
    ];
  };

  const validateField = (
    field: FieldName,
    value: string | boolean,
  ): string | undefined => {
    switch (field) {
      case "name":
        return String(value).trim() === ""
          ? tQuotePage("validation.nameRequired")
          : undefined;
      case "companyName": {
        const companyName = String(value).trim();
        if (companyName === "") {
          return tQuotePage("validation.companyNameRequired");
        }

        return companyName.length <= 200
          ? undefined
          : tQuotePage("validation.companyNameTooLong");
      }
      case "email": {
        const email = String(value).trim();
        if (email === "") {
          return tQuotePage("validation.emailRequired");
        }

        return EMAIL_REGEX.test(email)
          ? undefined
          : tQuotePage("validation.emailInvalid");
      }
      case "phone": {
        const phone = String(value).trim();
        if (phone === "") {
          return tQuotePage("validation.phoneRequired");
        }

        return isPossiblePhoneNumber(phone)
          ? undefined
          : tQuotePage("validation.phoneInvalid");
      }
      case "zip": {
        const zip = String(value).trim();
        if (zip === "" || !ZIP_CODE_REGEX.test(zip)) {
          return tQuotePage("validation.zipInvalid");
        }

        return undefined;
      }
      case "salesRep":
        return SALES_REP_OPTIONS.includes(value as SalesRepOption)
          ? undefined
          : tQuotePage("validation.salesRepRequired");
      case "agreedToContact":
        return value === true
          ? undefined
          : tQuotePage("validation.agreedToContactRequired");
      default:
        return undefined;
    }
  };

  const validateForm = (): FieldErrors => {
    return {
      name: validateField("name", formValues.name),
      companyName: validateField("companyName", formValues.companyName),
      email: validateField("email", formValues.email),
      phone: validateField("phone", formValues.phone),
      zip: validateField("zip", formValues.zip),
      salesRep: validateField("salesRep", formValues.salesRep),
      agreedToContact: validateField("agreedToContact", agreedToContact),
    };
  };

  const handleFieldChange = (field: keyof FormValues, value: string) => {
    setFormValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));

    setFieldErrors((currentErrors) => {
      if (!currentErrors[field]) {
        return currentErrors;
      }

      const nextError = validateField(field, value);
      if (nextError) {
        return currentErrors;
      }

      return {
        ...currentErrors,
        [field]: undefined,
      };
    });
  };

  const formatQuoteData = (): QuoteRequestPayload => {
    const contactInfo = {
      name: formValues.name.trim(),
      companyName: formValues.companyName.trim(),
      email: formValues.email.trim(),
      phone: formValues.phone.trim(),
      zipCode: formValues.zip.trim(),
      salesRep: formValues.salesRep as SalesRepOption,
    };

    const quoteItems: QuoteItem[] = items.flatMap((item) => {
      const productName = productSlugToNameMapInEnglish[item.product.slug];
      const subtypeConfig = getProductSubtypeConfig(item.product);

      if (subtypeConfig && item.subtypeQuantities) {
        return subtypeConfig.options.flatMap((option) => {
          const quantity = item.subtypeQuantities?.[option.value] ?? 0;
          if (quantity <= 0) {
            return [];
          }

          return [
            {
              productName,
              itemNumber: item.product.itemNumber,
              quantity,
              variantLabel: subtypeConfig.criterionKey,
              variantValue: option.label,
            },
          ];
        });
      }

      if (!item.quantity) {
        return [];
      }

      return [
        {
          productName,
          itemNumber: item.product.itemNumber,
          quantity: item.quantity,
        },
      ];
    });

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
      totalUniqueProducts: quoteItems.length,
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
    setSubmissionErrors([]);

    const validationErrors = validateForm();
    setFieldErrors(validationErrors);

    if (Object.values(validationErrors).some(Boolean)) {
      return;
    }

    setIsSubmitting(true);
    let submissionStage: SubmissionStage = "prepare";

    try {
      const invalidTargets = items.flatMap((item) => {
        const subtypeConfig = getProductSubtypeConfig(item.product);

        if (subtypeConfig && item.subtypeQuantities) {
          return Object.entries(item.subtypeQuantities)
            .filter(([, quantity]) => quantity > MAX_PACKS_PER_QUOTE_ITEM)
            .map(([subtypeValue]) => ({
              slug: item.product.slug,
              subtypeValue,
            }));
        }

        return item.quantity && item.quantity > MAX_PACKS_PER_QUOTE_ITEM
          ? [{ slug: item.product.slug }]
          : [];
      });

      if (invalidTargets.length > 0) {
        onQuantityValidationFailed?.(invalidTargets);
        setIsSubmitting(false);
        return;
      }

      const payload = formatQuoteData();

      if (!QUOTE_API_URL) {
        throw new Error("Quote API URL is not configured");
      }

      submissionStage = "submit";
      const response = await fetch(QUOTE_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const contentType = response.headers.get("content-type") ?? "";
      const data: QuoteApiResponse | string =
        contentType.includes("application/json")
          ? await response.json()
          : await response.text();

      if (
        !response.ok ||
        typeof data === "string" ||
        !data.success
      ) {
        const backendDetails =
          typeof data === "object" && Array.isArray(data.details)
            ? data.details.filter(
              (detail): detail is string =>
                typeof detail === "string" && detail.trim().length > 0,
            )
            : [];

        if (backendDetails.length > 0) {
          console.error("Quote request rejected by API:", {
            status: response.status,
            details: backendDetails,
          });
          setSubmissionErrors(backendDetails);
        } else {
          console.error("Quote request failed without structured details:", {
            status: response.status,
            statusText: response.statusText,
            body: data,
          });
          setSubmissionErrors([tQuotePage("errorMessage")]);
        }

        return;
      }

      // Success: clear cart and redirect to products page with success indicator
      clearCart();
      router.push(`${ROUTES.products}?quoteSuccess=true`);
    } catch (err) {
      console.error("Error submitting quote:", {
        stage: submissionStage,
        error: err,
      });
      const safeMessages = getSafeClientErrorMessages(submissionStage);
      const caughtErrorMessage = getCaughtErrorMessage(err);

      setSubmissionErrors([
        ...safeMessages,
        tQuotePage("errorDetails", { error: caughtErrorMessage }),
      ]);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="lg:w-96 shrink-0">
      <form onSubmit={handleSubmit} noValidate>
        <h2 className="text-xl font-semibold mb-4">
          {tQuotePage("contactInfo")}
        </h2>
        <FieldGroup>
          <Field data-invalid={Boolean(fieldErrors.name)}>
            <FieldLabel htmlFor="name">
              {tQuotePage("name")}
              <span className="text-destructive">*</span>
            </FieldLabel>
            <Input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder={tQuotePage("namePlaceholder")}
              disabled={isSubmitting}
              value={formValues.name}
              onChange={(e) => handleFieldChange("name", e.target.value)}
              aria-invalid={Boolean(fieldErrors.name)}
            />
            <FieldError errors={fieldErrors.name ? [{ message: fieldErrors.name }] : undefined} />
          </Field>

          <Field data-invalid={Boolean(fieldErrors.companyName)}>
            <FieldLabel htmlFor="companyName">
              {tQuotePage("companyName")}
              <span className="text-destructive">*</span>
            </FieldLabel>
            <Input
              id="companyName"
              name="companyName"
              type="text"
              autoComplete="organization"
              maxLength={200}
              placeholder={tQuotePage("companyNamePlaceholder")}
              disabled={isSubmitting}
              value={formValues.companyName}
              onChange={(e) => handleFieldChange("companyName", e.target.value)}
              aria-invalid={Boolean(fieldErrors.companyName)}
            />
            <FieldError
              errors={fieldErrors.companyName ? [{ message: fieldErrors.companyName }] : undefined}
            />
          </Field>

          <Field data-invalid={Boolean(fieldErrors.email)}>
            <FieldLabel htmlFor="email">
              {tQuotePage("email")}
              <span className="text-destructive">*</span>
            </FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder={tQuotePage("emailPlaceholder")}
              disabled={isSubmitting}
              value={formValues.email}
              onChange={(e) => handleFieldChange("email", e.target.value)}
              aria-invalid={Boolean(fieldErrors.email)}
            />
            <FieldError errors={fieldErrors.email ? [{ message: fieldErrors.email }] : undefined} />
          </Field>

          <Field data-invalid={Boolean(fieldErrors.phone)}>
            <FieldLabel htmlFor="phone">
              {tQuotePage("phone")}
              <span className="text-destructive">*</span>
            </FieldLabel>
            <PhoneInput
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder={tQuotePage("phonePlaceholder")}
              disabled={isSubmitting}
              defaultCountry="US"
              value={formValues.phone}
              onChange={(value) => handleFieldChange("phone", value ?? "")}
              aria-invalid={Boolean(fieldErrors.phone)}
            />
            <FieldError errors={fieldErrors.phone ? [{ message: fieldErrors.phone }] : undefined} />
          </Field>
          <Field data-invalid={Boolean(fieldErrors.zip)}>
            <FieldLabel htmlFor="zip">
              {tQuotePage("zip")}
              <span className="text-destructive">*</span>
            </FieldLabel>
            <Input
              id="zip"
              name="zip"
              type="text"
              autoComplete="postal-code"
              inputMode="numeric"
              maxLength={10}
              placeholder={tQuotePage("zipPlaceholder")}
              disabled={isSubmitting}
              value={formValues.zip}
              onChange={(e) => handleFieldChange("zip", e.target.value)}
              aria-invalid={Boolean(fieldErrors.zip)}
            />
            <FieldError errors={fieldErrors.zip ? [{ message: fieldErrors.zip }] : undefined} />
          </Field>

          <Field data-invalid={Boolean(fieldErrors.salesRep)}>
            <FieldLabel htmlFor="salesRep">
              {tQuotePage("salesRep")}
              <span className="text-destructive">*</span>
            </FieldLabel>
            <Select
              value={formValues.salesRep}
              onValueChange={(value) =>
                handleFieldChange("salesRep", value as SalesRepOption)
              }
              disabled={isSubmitting}
            >
            <SelectTrigger
                id="salesRep"
                className="w-full rounded-xl bg-background"
                aria-invalid={Boolean(fieldErrors.salesRep)}
              >
                <SelectValue>
                  {formValues.salesRep
                    ? tQuotePage(`salesRepOptions.${formValues.salesRep}`)
                    : tQuotePage("salesRepPlaceholder")}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {SALES_REP_OPTIONS.map((option) => (
                  <SelectItem key={option} value={option}>
                    {tQuotePage(`salesRepOptions.${option}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FieldError errors={fieldErrors.salesRep ? [{ message: fieldErrors.salesRep }] : undefined} />
          </Field>

          <Field
            orientation="horizontal"
            data-invalid={Boolean(fieldErrors.agreedToContact)}
          >
            <Checkbox
              id="agreedToContact"
              name="agreedToContact"
              checked={agreedToContact}
              onCheckedChange={(checked) => {
                const nextValue = checked === true;
                setAgreedToContact(nextValue);
                setFieldErrors((currentErrors) => {
                  if (!currentErrors.agreedToContact) {
                    return currentErrors;
                  }

                  const nextError = validateField("agreedToContact", nextValue);
                  if (nextError) {
                    return currentErrors;
                  }

                  return {
                    ...currentErrors,
                    agreedToContact: undefined,
                  };
                });
              }}
              disabled={isSubmitting}
              aria-invalid={Boolean(fieldErrors.agreedToContact)}
            />
            <FieldLabel htmlFor="agreedToContact">
              {tQuotePage("agreeToContact")}
            </FieldLabel>
          </Field>
          <FieldError
            errors={
              fieldErrors.agreedToContact
                ? [{ message: fieldErrors.agreedToContact }]
                : undefined
            }
          />

          {submissionErrors.length > 0 ? (
            <FieldError
              errors={submissionErrors.map((message) => ({ message }))}
            />
          ) : null}
          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isSubmitting}
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
