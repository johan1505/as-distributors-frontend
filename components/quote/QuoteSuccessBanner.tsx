"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { CheckCircle, X } from "lucide-react";

export function QuoteSuccessBanner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("quote");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (searchParams.get("quoteSuccess") === "true") {
      setIsVisible(true);
    }
  }, [searchParams]);

  const handleDismiss = () => {
    setIsVisible(false);
    // Remove the query param from URL
    const params = new URLSearchParams(searchParams.toString());
    params.delete("quoteSuccess");
    const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.replace(newUrl, { scroll: false });
  };

  if (!isVisible) return null;

  return (
    <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <CheckCircle className="size-5 text-primary shrink-0" />
        <p className="text-sm font-medium text-primary">{t("successMessage")}</p>
      </div>
      <button
        type="button"
        onClick={handleDismiss}
        className="text-primary/70 hover:text-primary transition-colors shrink-0"
        aria-label="Dismiss"
      >
        <X className="size-5" />
      </button>
    </div>
  );
}
