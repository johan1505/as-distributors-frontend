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
import { CONTANCT } from "@/lib/constants";

const SESSION_KEY = "pacific-foods-sales-widget-shown";

export function SalesWidget() {
  const t = useTranslations("sales");
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if widget was already shown this session
    const wasShown = sessionStorage.getItem(SESSION_KEY);
    if (!wasShown) {
      // Show widget after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
        setIsOpen(true);
        sessionStorage.setItem(SESSION_KEY, "true");
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsVisible(true);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-40">
      {isOpen ? (
        <Card className="w-80 shadow-2xl animate-in slide-in-from-bottom-4 fade-in duration-300">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MessageCircle className="size-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="font-display text-base">{t("title")}</CardTitle>
                  <CardDescription className="text-xs">
                    {t("description")}
                  </CardDescription>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon-xs"
                onClick={() => setIsOpen(false)}
              >
                <X className="size-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <a
              href={`tel:${CONTANCT.TELEPHONE}`}
              className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
            >
              <div className="size-9 rounded-full bg-primary/10 flex items-center justify-center">
                <Phone className="size-4 text-primary" />
              </div>
              <div>
                <div className="text-sm font-medium">{t("phone")}</div>
                <div className="text-xs text-muted-foreground">
                  {CONTANCT.TELEPHONE}
                </div>
              </div>
            </a>
            <a
              href={`mailto:${CONTANCT.EMAIL}`}
              className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
            >
              <div className="size-9 rounded-full bg-primary/10 flex items-center justify-center">
                <Mail className="size-4 text-primary" />
              </div>
              <div>
                <div className="text-sm font-medium">{t("email")}</div>
                <div className="text-xs text-muted-foreground">
                  {CONTANCT.EMAIL}
                </div>
              </div>
            </a>
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
