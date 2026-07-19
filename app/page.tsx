import ClientApp from "./ClientApp";
import { HomeSEO } from "@/app/components/HomeSEO";
import { SITE_ORIGIN } from "@/lib/siteConfig";

const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE_ORIGIN}/#webpage`,
      url: SITE_ORIGIN,
      name: "AdmitGPT — Free Open-Source College Admissions Chance Calculator",
      isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
      about: { "@id": `${SITE_ORIGIN}/#webapp` },
      primaryImageOfPage: { "@id": `${SITE_ORIGIN}/#webapp` },
      inLanguage: "en-US",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_ORIGIN },
      ],
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />
      <ClientApp />
      <HomeSEO />
    </>
  );
}
