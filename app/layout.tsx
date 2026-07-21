import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { SITE_ORIGIN, GITHUB_URL, BRAND_PROFILES } from "@/lib/siteConfig";
import "./globals.css";

const siteUrl = SITE_ORIGIN;

export const viewport: Viewport = {
  themeColor: "#08090c",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AdmitGPT | Free Open-Source College Admissions Chance Calculator & AI Predictor",
    template: "%s | AdmitGPT",
  },
  description:
    "AdmitGPT is a free, open-source college admissions chance calculator. See your real Ivy League, MIT, and Stanford acceptance odds from SAT, ACT, GPA, and extracurriculars — with every formula published and your data never leaving your browser.",
  applicationName: "AdmitGPT",
  keywords: [
    "college admissions",
    "probability calculator",
    "college chances",
    "admissions predictor",
    "free college counseling",
    "SAT GPA calculator",
    "open source admissions",
    "Ivy League calculator",
    "Harvard acceptance rate",
    "Stanford admission chances",
    "MIT probability calculator",
    "US university admissions",
    "international student financial aid",
    "Common App strategy",
    "extracurriculars rating",
    "college application AI",
    "need-blind universities calculator",
    "early decision chance",
    "early action predictor",
    "student profile evaluation",
    "free college admissions consultant",
    "machine learning admissions predictor",
    "college acceptance odds",
    "university ranking 2026",
    "admissions algorithm calculator",
    "high school GPA converter",
    "ACT score percentiles",
    "test-optional chances",
    "Ivy day predictions",
    "Zierax AdmitGPT"
  ],
  authors: [{ name: "Zierax", url: "https://github.com/Zierax/AdmitGPT" }], // NEXT_PUBLIC_GITHUB_URL override available via siteConfig
  creator: "Zierax",
  publisher: "AdmitGPT",
  generator: "Next.js",
  category: "Education",
  classification: "Educational Software",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/assets/AdmitGPT.png",
    shortcut: "/assets/AdmitGPT.png",
    apple: "/assets/AdmitGPT.png",
  },
  appleWebApp: {
    capable: true,
    title: "AdmitGPT",
    statusBarStyle: "black-translucent",
  },
  openGraph: {
    title: "AdmitGPT — AI-Powered College Admissions Predictor",
    description:
      "Stop paying consultants. Use our open-source, mathematically driven AI calculator to find your exact admission chances for top-tier US universities.",
    url: siteUrl,
    siteName: "AdmitGPT",
    images: [
      {
        url: "/assets/AdmitGPT.png",
        width: 1200,
        height: 630,
        alt: "AdmitGPT AI College Admissions Calculator Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AdmitGPT | Calculate Your Ivy League Chances For Free",
    description:
      "The free, transparent, open-source alternative to expensive college counselors. Get your admissions probability now.",
    creator: "@Zierax",
    images: ["/assets/AdmitGPT.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
    : {}),
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "AdmitGPT",
      description:
        "Free, open-source AI college admissions probability calculator.",
      publisher: { "@id": `${siteUrl}/#organization` },
      potentialAction: [
        {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${siteUrl}/?school={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      ],
      inLanguage: "en-US",
    },
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "AdmitGPT",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/assets/AdmitGPT.png`,
        width: 512,
        height: 512,
      },
      founder: { "@id": `${siteUrl}/#author` },
      sameAs: BRAND_PROFILES,
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}/#author`,
      name: "Ziad Salah",
      alternateName: "Zierax",
      url: GITHUB_URL,
      image: `${siteUrl}/assets/Ziad_Salah_Photo.jpg`,
      jobTitle: "Creator & Maintainer, AdmitGPT",
      description:
        "Creator of AdmitGPT, an open-source, transparent college admissions probability engine. Writes data-driven admissions guides grounded in published research and real applicant data.",
      knowsAbout: [
        "College admissions",
        "Ivy League admissions",
        "Admissions statistics",
        "Standardized testing (SAT/ACT)",
        "Financial aid",
        "Machine learning for admissions modeling",
      ],
      sameAs: BRAND_PROFILES,
    },
    {
      "@type": "Dataset",
      "@id": `${siteUrl}/#dataset`,
      name: "AdmitGPT Admissions Probability Dataset",
      description:
        "Calibration dataset of 1,122+ self-reported student admission profiles (2024–2026) used to train and validate the AdmitGPT additive-logistic admissions engine (v1.0, ordinal AUC ~0.74).",
      url: `${siteUrl}/transparency`,
      sameAs: [GITHUB_URL],
      identifier: {
        "@type": "PropertyValue",
        name: "Engine version",
        value: "1.0",
      },
      creator: { "@id": `${siteUrl}/#organization` },
      license: "https://opensource.org/licenses/MIT",
      isAccessibleForFree: true,
      temporalCoverage: "2024/2026",
      variableMeasured: [
        { "@type": "PropertyValue", name: "SAT score", unitText: "score" },
        { "@type": "PropertyValue", name: "ACT score", unitText: "score" },
        { "@type": "PropertyValue", name: "Unweighted GPA", unitText: "grade" },
        { "@type": "PropertyValue", name: "Extracurricular spike score", unitText: "logit" },
        { "@type": "PropertyValue", name: "Admission outcome", unitText: "boolean" },
      ],
      distribution: [
        {
          "@type": "DataDownload",
          encodingFormat: "application/json",
          contentUrl: `${siteUrl}/data/studentsdata.json`,
        },
        {
          "@type": "DataDownload",
          encodingFormat: "application/json",
          contentUrl: `${siteUrl}/data/collegesdata.json`,
        },
      ],
    },
    {
      "@type": "SoftwareSourceCode",
      "@id": `${siteUrl}/#engine`,
      name: "AdmitGPT Engine",
      description:
        "Open-source additive-logistic college admissions probability engine. Ordinal AUC ~0.74. Runs 100% client-side.",
      codeRepository: GITHUB_URL,
      programmingLanguage: "TypeScript",
      license: "https://opensource.org/licenses/MIT",
      version: "1.0",
      author: { "@id": `${siteUrl}/#organization` },
      isAccessibleForFree: true,
      runtimePlatform: "Web Browser (client-side)",
    },
    {
      "@type": "WebApplication",
      "@id": `${siteUrl}/#webapp`,
      name: "AdmitGPT — College Admissions Chance Calculator",
      url: siteUrl,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any (Web Browser)",
      browserRequirements: "Requires JavaScript. Runs entirely client-side.",
      description:
        "Predict Ivy League, MIT, and Stanford acceptance chances from SAT, ACT, GPA, and extracurriculars using a transparent, open-source additive-logistic model. 100% free.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        "College admission probability calculator",
        "SAT / ACT / GPA-based prediction",
        "Extracurricular spike scoring",
        "Ivy League and top-university chance estimates",
        "Fully transparent open-source math",
      ],
      isAccessibleForFree: true,
      author: { "@id": `${siteUrl}/#organization` },
      isBasedOn: [
        { "@id": `${siteUrl}/#dataset` },
        { "@id": `${siteUrl}/#engine` },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "Is AdmitGPT really free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. AdmitGPT is 100% free and open-source. There are no hidden fees, no paywalls, and no account required. The entire admissions model runs in your browser.",
          },
        },
        {
          "@type": "Question",
          name: "How does AdmitGPT calculate my admission chances?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "AdmitGPT uses a transparent additive-logistic model that combines your academic strength (SAT/ACT/GPA z-scores), extracurricular spike, intended major fit, and international context into a single probability for each college. Every formula and weight is published openly.",
          },
        },
        {
          "@type": "Question",
          name: "Can AdmitGPT predict Ivy League acceptance chances?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. AdmitGPT estimates admission probability for top-tier US universities including the Ivy League, MIT, and Stanford. It reports results as an honest, exploratory ordinal signal rather than a guaranteed probability, and openly documents its calibration limits.",
          },
        },
        {
          "@type": "Question",
          name: "Does AdmitGPT store or sell my data?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. AdmitGPT performs all calculations client-side in your browser. Your profile is never uploaded, stored, or sold.",
          },
        },
        {
          "@type": "Question",
          name: "What GPA do I need for Harvard or Ivy League schools?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The median admitted GPA at Harvard and most Ivy League schools is approximately 3.95 unweighted. A GPA below 3.7 places you below the 25th percentile. Weighted GPAs above 4.0 are common among admitted students taking 8+ AP or IB courses. AdmitGPT normalizes your GPA against each school's own distribution for an accurate comparison.",
          },
        },
        {
          "@type": "Question",
          name: "What is a good SAT score for Ivy League admission?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The middle 50% SAT range across Ivy League schools is approximately 1460–1570. Harvard's range is 1490–1580. Scoring above 1550 places you at or above the 75th percentile at most Ivies. All Ivy League schools require test scores as of the 2025–26 cycle.",
          },
        },
        {
          "@type": "Question",
          name: "Does Early Decision really increase your chances?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Early Decision acceptance rates are typically 2–4x higher than Regular Decision at selective schools. For example, Dartmouth admits approximately 19% of ED applicants vs 4.5% for RD. However, ED is binding — you must enroll if admitted, so run net price estimates first. Non-binding Early Action offers a smaller boost (1.2–1.8x) with full flexibility.",
          },
        },
        {
          "@type": "Question",
          name: "Should I apply test-optional if my SAT score is low?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "If your SAT is below a school's 25th percentile and the school offers test-optional admission, applying without scores is generally better. At test-required schools (all Ivies, MIT, Georgetown, etc.), you must submit regardless. At test-optional schools, a strong score (above the school's median) still helps admission and merit scholarships.",
          },
        },
        {
          "@type": "Question",
          name: "Can international students get financial aid at US colleges?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Only a handful of US schools are need-blind for international students: Harvard, Yale, Princeton, MIT, Dartmouth, Brown, Amherst, Bowdoin, and a few others. At these schools, financial need does not affect admission. At all other US universities, international students are evaluated on a need-aware basis — requesting aid can reduce your chances.",
          },
        },
        {
          "@type": "Question",
          name: "How many colleges should I apply to?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A balanced college list typically includes 8–12 schools: 2–4 safety schools (admission rate over 50% for your profile), 3–5 target schools (20–50% chance), and 2–3 reach schools (under 20% chance). Applying to more than 15 schools rarely improves outcomes and adds significant essay workload.",
          },
        },
        {
          "@type": "Question",
          name: "How accurate are college admission chances calculators?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No calculator can predict individual outcomes with certainty. AdmitGPT provides directional estimates based on historical data and is transparent about its limits. At schools below 10% admission rate, the model under-predicts systematically (predicted ~1.3% vs observed ~24.6% in the hardest decile). The ordinal ranking is reliable (AUC ~0.74).",
          },
        },
        {
          "@type": "Question",
          name: "What extracurriculars impress admissions officers most?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Admissions officers value depth over breadth. A single national-level achievement matters more than ten school-club memberships. AdmitGPT scores extracurriculars across six dimensions: tier (local to international), level, rarity, institutional strength, cognitive load, and validation. The spike contribution is capped at ±2.0 logit so no single activity can overpower academics.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        {children}
        <Script
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "bee11de2e7e14907b9a568e5b8cfe2a0"}'
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
