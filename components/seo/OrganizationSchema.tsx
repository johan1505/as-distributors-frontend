import { ROUTES } from "@/lib/routes";
import { BASE_URL } from "@/lib/site-config";
import { Organization, WebSite, WithContext } from "schema-dts";
import { JSON_LD_CONSTANTS, CONTANCT } from "@/lib/constants";
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
      // TODO: Add correct logo URL
      url: `${BASE_URL}/logo.png`,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: CONTANCT.TELEPHONE,
      contactType: "sales",
      email: CONTANCT.EMAIL,
      availableLanguage: "English",
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "US",
    },
    sameAs: [
      // TODO: Add social media URLs here when available
      // "https://www.facebook.com/pacificislanderfoods",
      // "https://www.instagram.com/pacificislanderfoods",
    ],
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
      />
    </>
  );
}
