import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ROUTES } from "@/lib/routes";
import { CONTACT, SALES_EMAIL } from "@/lib/constants";

export function Footer() {
  const t = useTranslations("footer");
  const tSite = useTranslations("site");
  const tNav = useTranslations("nav");
  const tContact = useTranslations("contact");
  const tSales = useTranslations("sales");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-linear-to-b from-muted/50 to-background">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row md:justify-evenly gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="font-semibold text-xl text-ocean">{tSite("name")}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {t("description")}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h2 className="font-semibold mb-4">{t("quickLinks")}</h2>
            <nav aria-label="Footer navigation" className="flex flex-col gap-2">
              <Link
                href={ROUTES.home}
                className="text-sm text-muted-foreground hover:text-ocean transition-colors underline"
              >
                {tNav("home")}
              </Link>
              <Link
                href={ROUTES.products}
                className="text-sm text-muted-foreground hover:text-ocean transition-colors underline"
              >
                {tNav("products")}
              </Link>
              <Link
                href={ROUTES.contact}
                className="text-sm text-muted-foreground hover:text-ocean transition-colors underline"
              >
                {tNav("contact")}
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <address className="not-italic">
            <h2 className="font-semibold mb-4">{t("contact")}</h2>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                  {tContact("phone.label")}
                </p>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase tracking-[0.12em]">
                      {tSales("phoneMainLabel")}
                    </span>
                    <a
                      href={`tel:${CONTACT.TELEPHONE}`}
                      className="text-xs hover:text-ocean transition-colors underline"
                      aria-label={tContact("phone.ariaLabel", {
                        phone: CONTACT.TELEPHONE,
                      })}
                    >
                      {CONTACT.TELEPHONE}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase tracking-[0.12em]">
                      {tSales("phoneAltLabel")}
                    </span>
                    <a
                      href={`tel:${CONTACT.ALTERNATE_TELEPHONE}`}
                      className="text-xs hover:text-ocean transition-colors underline"
                      aria-label={tContact("phone.ariaLabel", {
                        phone: CONTACT.ALTERNATE_TELEPHONE,
                      })}
                    >
                      {CONTACT.ALTERNATE_TELEPHONE}
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                  {tContact("email.label")}
                </p>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase tracking-[0.12em]">
                      {tSales("emailGeneralLabel")}
                    </span>
                    <a
                      href={`mailto:${SALES_EMAIL.PRIMARY}`}
                      className="text-xs hover:text-ocean transition-colors underline"
                      aria-label={tContact("email.ariaLabel", {
                        email: SALES_EMAIL.PRIMARY,
                      })}
                    >
                      {SALES_EMAIL.PRIMARY}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase tracking-[0.12em]">
                      {tSales("emailJudyLabel")}
                    </span>
                    <a
                      href={`mailto:${SALES_EMAIL.ALTERNATE}`}
                      className="text-xs hover:text-ocean transition-colors underline"
                      aria-label={tContact("email.ariaLabel", {
                        email: SALES_EMAIL.ALTERNATE,
                      })}
                    >
                      {SALES_EMAIL.ALTERNATE}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </address>
        </div>

        <div className="mt-8 pt-8 border-t border-ocean/10 text-center text-sm text-muted-foreground">
          {t("copyright", { year: currentYear })}
        </div>
      </div>
    </footer>
  );
}
