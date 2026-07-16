import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { SITE_ORIGIN, GITHUB_URL } from "@/lib/siteConfig";
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
    template: "%s | AdmitGPT | Admissions Calculator",
  },
  description:
    "AdmitGPT is the ultimate free, open-source AI college admissions probability calculator. Predict Ivy League, MIT, and Stanford acceptance chances based on SAT, ACT, GPA, and extracurriculars. No hidden fees, no black boxes.",
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
      sameAs: [GITHUB_URL, "https://instagram.com/z14d.d"],
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
