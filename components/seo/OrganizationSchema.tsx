import { ROUTES } from "@/lib/routes";
import { BASE_URL } from "@/lib/site-config";
import type { Organization, WebSite, WithContext } from "schema-dts";
import { JSON_LD_CONSTANTS, CONTACT } from "@/lib/constants";
interface OrganizationSchemaProps {
  name: string;
  description: string;
}

export function OrganizationSchema({
  name,
  description,
}: OrganizationSchemaProps) {
  const jsonLd: WithContext<Organization> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": JSON_LD_CONSTANTS.ORGANIZATION,
    name,
    description,
    url: BASE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${BASE_URL}/favicon.ico`,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: CONTACT.TELEPHONE,
        contactType: "sales",
        email: CONTACT.EMAIL,
        availableLanguage: "English",
      },
      {
        "@type": "ContactPoint",
        telephone: CONTACT.ALTERNATE_TELEPHONE,
        contactType: "sales",
        availableLanguage: "English",
      }
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "US",
    },

  };

  // WebSite schema for search engine site links
  const webSiteJsonLd: WithContext<WebSite> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": JSON_LD_CONSTANTS.WEBSITE,
    name,
    url: BASE_URL,
    publisher: {
      "@id": JSON_LD_CONSTANTS.ORGANIZATION,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/en${ROUTES.products}?search={search_term_string}`,
        actionPlatform: [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform",
        ],
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data is safe
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data is safe
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
      />
    </>
  );
}
