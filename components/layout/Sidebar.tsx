"use client";

import { useTranslations } from "next-intl";
import { Home, Package, ChevronDown, Globe, Phone, ShoppingBag } from "lucide-react";
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
              <span className="font-display font-semibold truncate text-ocean">{tHome("hero.title")}</span>
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
                            <Icon className="size-4 text-ocean" />
                            {tCategories(categoryKey)}
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

      <SidebarFooter className="border-t">
        {locales.length > 1 && (
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Language">
                <Globe className="size-4" />
                <div className="flex items-center gap-2">
                  {locales.map((loc) => (
                    <Link
                      key={loc}
                      href={pathname}
                      locale={loc}
                      className={`px-2 py-1 text-xs font-medium rounded-md transition-colors ${locale === loc
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        }`}
                    >
                      {loc.toUpperCase()}
                    </Link>
                  ))}
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        )}
      </SidebarFooter>
    </SidebarPrimitive>
  );
}

export { SidebarProvider, SidebarInset, SidebarTrigger };
