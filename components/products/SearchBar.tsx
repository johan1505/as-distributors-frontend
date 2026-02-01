"use client";

import { useCallback, useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/routes";

export function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tCatalog = useTranslations("catalog");

  // Local state for input value (doesn't trigger navigation)
  const [inputValue, setInputValue] = useState(
    searchParams.get("search") || ""
  );

  // Sync input value when URL changes externally
  useEffect(() => {
    const searchParam = searchParams.get("search") || "";
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setInputValue(searchParam);
  }, [searchParams]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      const params = new URLSearchParams();

      if (inputValue === "") {
        return;
      }
      if (inputValue.trim()) {
        params.set("search", inputValue.trim());
      }

      const queryString = params.toString();
      const targetPath = ROUTES.products;
      const url = queryString ? `${targetPath}?${queryString}` : targetPath;

      // If we're already on /products, replace to avoid history spam
      // Otherwise, push to navigate there
      if (
        pathname === ROUTES.products ||
        pathname.startsWith(`${ROUTES.products}/`)
      ) {
        router.replace(url, { scroll: false });
      } else {
        router.push(url, { scroll: false });
      }
    },
    [router, pathname, inputValue]
  );

  return (
    <form onSubmit={handleSubmit} className="relative md:w-full">
      <Input
        type="search"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={tCatalog("search.placeholder")}
        className="pr-10"
      />
      <Button
        type="submit"
        variant="default"
        size="icon"
        aria-label={tCatalog("search.placeholder")}
        className="absolute right-0 top-0 h-full rounded-l-none rounded-r-4xl px-3 border-0"
      >
        <Search className="size-4" />
      </Button>
    </form>
  );
}
