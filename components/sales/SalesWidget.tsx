"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { X, Phone, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { CONTACT, SALES_EMAIL } from "@/lib/constants";

const SESSION_AUTO_OPEN_KEY = "pacific-foods-sales-widget-shown";
const LOCAL_DISMISS_KEY = "asdistributors-sales-widget-dismissed";

function readLocalDismissed(): boolean {
  try {
    return localStorage.getItem(LOCAL_DISMISS_KEY) === "1";
  } catch {
    return false;
  }
}

function persistDismissed(): void {
  try {
    localStorage.setItem(LOCAL_DISMISS_KEY, "1");
  } catch {
    // private mode / storage disabled — session behavior still applies
  }
}

export function SalesWidget() {
  const t = useTranslations("sales");
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (readLocalDismissed()) {
      // User closed the popover before — show FAB only, never auto-open again
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsVisible(true);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsOpen(false);
      return;
    }

    const wasAutoOpenedThisSession =
      sessionStorage.getItem(SESSION_AUTO_OPEN_KEY);
    if (!wasAutoOpenedThisSession) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        setIsOpen(true);
        try {
          sessionStorage.setItem(SESSION_AUTO_OPEN_KEY, "true");
        } catch {
          // ignore
        }
      }, 3000);
      return () => clearTimeout(timer);
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsVisible(true);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-40">
      {isOpen ? (
        <Card className="w-80 shadow-2xl animate-in slide-in-from-bottom-4 fade-in duration-300">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div>
                  <CardTitle className="text-base">{t("title")}</CardTitle>
                  <CardDescription className="text-xs">
                    {t("description")}
                  </CardDescription>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon-xs"
                onClick={() => {
                  setIsOpen(false);
                  persistDismissed();
                }}
              >
                <X className="size-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                {t("callSectionTitle")}
              </p>
              <div className="space-y-1.5">
                <a
                  href={`tel:${CONTACT.TELEPHONE}`}
                  className="group flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted transition-colors"
                  aria-label={t("phoneMainAriaLabel", {
                    phone: CONTACT.TELEPHONE,
                  })}
                >
                  <div className="size-9 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                    <Phone className="size-4 text-primary" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-normal uppercase tracking-[0.12em] text-muted-foreground">
                      {t("phoneMainLabel")}
                    </span>
                    <span className="text-xs font-normal leading-tight text-foreground group-hover:text-primary transition-colors">
                      {CONTACT.TELEPHONE}
                    </span>
                  </div>
                </a>

                <a
                  href={`tel:${CONTACT.ALTERNATE_TELEPHONE}`}
                  className="group flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted transition-colors"
                  aria-label={t("phoneAltAriaLabel", {
                    phone: CONTACT.ALTERNATE_TELEPHONE,
                  })}
                >
                  <div className="size-9 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                    <Phone className="size-4 text-primary" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-normal uppercase tracking-[0.12em] text-muted-foreground">
                      {t("phoneAltLabel")}
                    </span>
                    <span className="text-xs font-normal leading-tight text-muted-foreground group-hover:text-foreground transition-colors">
                      {CONTACT.ALTERNATE_TELEPHONE}
                    </span>
                  </div>
                </a>
              </div>
            </div>

            <div className="h-px bg-border/60" />

            <div className="space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                {t("emailSectionTitle")}
              </p>
              <div className="space-y-1.5">
                <a
                  href={`mailto:${SALES_EMAIL.PRIMARY}`}
                  className="group flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted transition-colors"
                  aria-label={t("emailGeneralAriaLabel", {
                    email: SALES_EMAIL.PRIMARY,
                  })}
                >
                  <div className="size-9 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                    <Mail className="size-4 text-primary" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-normal uppercase tracking-[0.12em] text-muted-foreground">
                      {t("emailGeneralLabel")}
                    </span>
                    <span className="text-xs font-normal leading-tight text-foreground group-hover:text-primary transition-colors">
                      {SALES_EMAIL.PRIMARY}
                    </span>
                  </div>
                </a>

                <a
                  href={`mailto:${SALES_EMAIL.ALTERNATE}`}
                  className="group flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted transition-colors"
                  aria-label={t("emailJudyAriaLabel", {
                    email: SALES_EMAIL.ALTERNATE,
                  })}
                >
                  <div className="size-9 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                    <Mail className="size-4 text-primary" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-normal uppercase tracking-[0.12em] text-muted-foreground">
                      {t("emailJudyLabel")}
                    </span>
                    <span className="text-xs font-normal leading-tight text-muted-foreground group-hover:text-foreground transition-colors">
                      {SALES_EMAIL.ALTERNATE}
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Button
          size="lg"
          className="rounded-full shadow-lg size-14 p-0"
          onClick={() => setIsOpen(true)}
          aria-label={t("openSalesWidget")}
        >
          <MessageCircle className="size-6" />
        </Button>
      )}
    </div>
  );
}
