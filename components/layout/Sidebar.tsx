"use client";

import { useTranslations } from "next-intl";
import { Home, Package, ChevronDown, Globe, Phone, ShoppingBag, Check } from "lucide-react";
import { CATEGORY_ICONS } from "@/lib/category-icons";
import {
  Sidebar as SidebarPrimitive,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Link, usePathname } from "@/i18n/navigation";
import { isActivePath } from "@/lib/path-utils";
import type { CategoryKey } from "@/lib/products";
import type { Locale } from "@/i18n/config";
import { ROUTES } from "@/lib/routes";

interface AppSidebarProps {
  locale: Locale;
  locales: readonly Locale[];
  categories: CategoryKey[];
}

export function AppSidebar({ locale, locales, categories }: AppSidebarProps) {
  const t = useTranslations("nav");
  const tNav = useTranslations("nav");
  const tCatalog = useTranslations("catalog");
  const tCategories = useTranslations("categories");
  const tHome = useTranslations("home");

  const pathname = usePathname();
  const { isMobile, setOpenMobile } = useSidebar();

  return (
    <SidebarPrimitive collapsible="offExamples">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<Link href={ROUTES.home} />}>
              <span className="font-semibold truncate text-ocean">{tHome("hero.title")}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Home */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => {
                    if (isMobile) {
                      setOpenMobile(false);
                    }
                  }}
                  render={<Link href={ROUTES.home} />}
                  isActive={isActivePath(pathname, "/")}
                >
                  <Home className="size-4" />
                  <span>{t("home")}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Products with Categories */}
              <Collapsible
                defaultOpen
                className="group/collapsible"
                render={<li />}
              >
                <CollapsibleTrigger className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 font-medium text-sm hover:bg-muted">
                  <Package className="size-4" />
                  <span>{t("products")}</span>
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {/* All Products */}
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        onClick={() => {
                          if (isMobile) {
                            setOpenMobile(false);
                          }
                        }}
                        render={<Link href={ROUTES.products} />}
                        isActive={isActivePath(pathname, ROUTES.products)}
                      >
                        <ShoppingBag className="size-4 text-ocean" />
                        {tCatalog("allProducts")}
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    {/* Category Links */}
                    {categories.map((categoryKey) => {
                      const Icon = CATEGORY_ICONS[categoryKey];
                      return (
                        <SidebarMenuSubItem key={categoryKey}>
                          <SidebarMenuSubButton
                            onClick={() => {
                              if (isMobile) {
                                setOpenMobile(false);
                              }
                            }}
                            render={
                              <Link href={`${ROUTES.products}/${categoryKey}`} />
                            }
                            isActive={isActivePath(
                              pathname,
                              `${ROUTES.products}/${categoryKey}`
                            )}
                          >
                            <Icon className="size-4 text-ocean flex-shrink-0" />
                            <span className="line-clamp-1">
                              {tCategories(categoryKey)}
                            </span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      );
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </Collapsible>

              {/* Contact */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => {
                    if (isMobile) {
                      setOpenMobile(false);
                    }
                  }}
                  render={<Link href={ROUTES.contact} />}
                  isActive={isActivePath(pathname, ROUTES.contact)}
                >
                  <Phone className="size-4" />
                  <span>{t("contact")}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-ocean/20 pt-4">
        {locales.length > 1 && (
          <div className="px-2 pb-2">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted transition-colors">
                <Globe className="size-4 text-ocean" />
                <span>{tNav("language")}</span>
                <ChevronDown className="ml-auto size-4 text-muted-foreground" />
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" align="start" sideOffset={8}>
                {locales.map((loc) => {
                  const languageNames: Record<string, string> = {
                    en: "English",
                    es: "Español",
                    sm: "Samoa",
                    ko: "한국어",
                    zh: "中文",
                  };
                  const isActive = locale === loc;
                  return (
                    <DropdownMenuItem
                      key={loc}
                      render={
                        <Link
                          href={pathname}
                          locale={loc}
                          onClick={() => {
                            if (isMobile) {
                              setOpenMobile(false);
                            }
                          }}
                        />
                      }
                      className={isActive ? "bg-ocean/10 text-ocean" : ""}
                    >
                      {languageNames[loc] || loc.toUpperCase()}
                      {isActive && <Check className="ml-auto size-4" />}
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </SidebarFooter>
    </SidebarPrimitive>
  );
}

export { SidebarProvider, SidebarInset, SidebarTrigger };
