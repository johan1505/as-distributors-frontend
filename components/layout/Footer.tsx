import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ROUTES } from "@/lib/routes";
import { CONTACT } from "@/lib/constants";

export function Footer() {
  const t = useTranslations("footer");
  const tSite = useTranslations("site");
  const tNav = useTranslations("nav");
  const tContact = useTranslations("contact");
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
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <a
                href={`tel:${CONTACT.TELEPHONE}`}
                className="hover:text-ocean transition-colors underline"
                aria-label={tContact("phone.ariaLabel", {
                  phone: CONTACT.TELEPHONE,
                })}
              >
                {CONTACT.TELEPHONE}
              </a>
              <a
                href={`tel:${CONTACT.ALTERNATE_TELEPHONE}`}
                className="hover:text-ocean transition-colors underline"
                aria-label={tContact("phone.ariaLabel", {
                  phone: CONTACT.TELEPHONE,
                })}
              >
                {CONTACT.ALTERNATE_TELEPHONE}
              </a>
              <a
                href={`mailto:${CONTACT.EMAIL}`}
                className="hover:text-ocean transition-colors underline"
                aria-label={tContact("email.ariaLabel", {
                  email: CONTACT.EMAIL,
                })}
              >
                {CONTACT.EMAIL}
              </a>
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
