"use client";

import { useState } from "react";
import { Copy, Mail } from "lucide-react";
import { useTranslations } from "next-intl";

interface MailingAddressCardProps {
  address: string;
}

export function MailingAddressCard({ address }: MailingAddressCardProps) {
  const t = useTranslations("contact.mailingAddress");
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // No-op: if clipboard fails, we keep the UI stable.
    }
  };

  return (
    <div className="group flex items-start gap-4 py-4 border-b border-border/50">
      <div className="size-10 rounded-full bg-muted flex items-center justify-center">
        <Mail className="size-4 text-muted-foreground" />
      </div>
      <div className="flex-1">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">
          {t("label")}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <address className="not-italic font-medium">{address}</address>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
            aria-label={t("copyAria", { address })}
          >
            <Copy className="size-3" />
            <span>{copied ? t("copySuccess") : t("copyLabel")}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
