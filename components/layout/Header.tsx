"use client";

import { Suspense, useState } from "react";
import { ShoppingCart, Search } from "lucide-react";
import { buttonVariants, Button } from "@/components/ui/button";
import { useQuote } from "@/components/quote/QuoteProvider";
import { SidebarTrigger } from "@/components/layout/Sidebar";
import { SearchBar } from "@/components/products/SearchBar";
import { SearchBarSkeleton } from "@/components/products/SearchBarSkeleton";
import { BreadcrumbWrapper } from "./BreadcrumbWrapper";
import { usePathname, Link } from "@/i18n/navigation";
import { normalizePathname } from "@/lib/path-utils";
import { useTranslations } from "next-intl";
import { ROUTES } from "@/lib/routes";
import { useIsMobile } from "@/hooks/use-mobile";

export function Header() {
  const { totalItems } = useQuote();
  const pathname = usePathname();
  const normalizedPath = normalizePathname(pathname);
  const isHome = normalizedPath === ROUTES.home;
  const isSubmitQuote = normalizedPath === ROUTES.submitQuote;
  const t = useTranslations("quote");
  const isMobile = useIsMobile();
  const [searchOpen, setSearchOpen] = useState(false);

  if (isMobile) {
    return (
      <header className="sticky top-0 z-30 w-full border-b border-ocean/10 bg-background/95 backdrop-blur-sm">
        {/* Row 1: Sidebar trigger, back/label, search icon, cart */}
        <div className="flex items-center gap-2 p-4">
          <SidebarTrigger />
          <div className="min-w-0 flex-1">
            <BreadcrumbWrapper mobile />
          </div>
          <div className="ml-auto flex items-center gap-2 shrink-0">
            {!isHome && (
              <Button
                variant="ghost"
                size="icon"
                aria-label="Toggle search"
                onClick={() => setSearchOpen((prev) => !prev)}
              >
                <Search className="size-4" />
              </Button>
            )}
            {!isSubmitQuote && (
              <Link
                href={ROUTES.submitQuote}
                className={buttonVariants({
                  variant: "default",
                  className: "shrink-0",
                })}
              >
                <ShoppingCart className="size-4" />
                {totalItems > 0 && (
                  <span className="ml-1 size-6 rounded-full bg-white text-primary font-semibold flex items-center justify-center">
                    {totalItems > 99 ? "99+" : totalItems}
                  </span>
                )}
              </Link>
            )}
          </div>
        </div>

        {/* Row 2: Expandable search bar */}
        {!isHome && searchOpen && (
          <div className="px-4 pb-4">
            <Suspense fallback={<SearchBarSkeleton />}>
              <SearchBar fullWidth />
            </Suspense>
          </div>
        )}
      </header>
    );
  }

  return (
    <header className="@container sticky top-0 z-30 w-full border-b border-ocean/10 bg-background/95 backdrop-blur-sm">
      <div className="flex flex-col @5xl:flex-row h-full justify-between p-4 gap-4">
        {/* Left Side: Sidebar Trigger & Breadcrumbs */}
        <div className="flex items-center gap-4 min-w-0">
          <SidebarTrigger />
          <BreadcrumbWrapper />
        </div>

        {/* Right Side: Search & Request Quote Button */}
        {!isHome ? (
          <div className={`flex flex-row items-center gap-2 @5xl:gap-4 ${isSubmitQuote ? "w-full @5xl:w-auto" : ""}`}>
            <Suspense fallback={<SearchBarSkeleton />}>
              <SearchBar fullWidth={isSubmitQuote} />
            </Suspense>

            {!isSubmitQuote && (
              <Link
                href={ROUTES.submitQuote}
                className={buttonVariants({
                  variant: "default",
                  className: "shrink-0",
                })}
              >
                <ShoppingCart className="size-4" />
                <span className="hidden sm:inline">{t("requestQuote")}</span>
                {totalItems > 0 && (
                  <span className="ml-1 size-6 rounded-full bg-white text-primary font-semibold flex items-center justify-center">
                    {totalItems > 99 ? "99+" : totalItems}
                  </span>
                )}
              </Link>
            )}
          </div>
        ) : null}
      </div>
    </header>
  );
}
