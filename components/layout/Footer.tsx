import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ROUTES } from "@/lib/routes";
import { CONTANCT } from "@/lib/constants";

export function Footer() {
  const t = useTranslations("footer");
  const tSite = useTranslations("site");
  const tNav = useTranslations("nav");
  const tContact = useTranslations("contact");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🌺</span>
              <span className="font-semibold text-lg">{tSite("name")}</span>
            </div>
            <p className="text-sm text-muted-foreground">{t("tagline")}</p>
          </div>

          {/* Navigation */}
          <div>
            <h2 className="font-semibold mb-4">Quick Links</h2>
            <nav aria-label="Footer navigation" className="flex flex-col gap-2">
              <Link
                href={ROUTES.home}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {tNav("home")}
              </Link>
              <Link
                href={ROUTES.products}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {tNav("products")}
              </Link>
              <Link
                href={ROUTES.contact}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {tNav("contact")}
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <address className="not-italic">
            <h2 className="font-semibold mb-4">Contact</h2>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <a
                href={`tel:${CONTANCT.TELEPHONE}`}
                className="hover:text-foreground transition-colors"
                aria-label={tContact("phone.ariaLabel", {
                  phone: CONTANCT.TELEPHONE,
                })}
              >
                {CONTANCT.TELEPHONE}
              </a>
              <a
                href={`mailto:${CONTANCT.EMAIL}`}
                className="hover:text-foreground transition-colors"
                aria-label={tContact("email.ariaLabel", {
                  email: CONTANCT.EMAIL,
                })}
              >
                {CONTANCT.EMAIL}
              </a>
            </div>
          </address>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          {t("copyright", { year: currentYear })}
        </div>
      </div>
    </footer>
  );
}
