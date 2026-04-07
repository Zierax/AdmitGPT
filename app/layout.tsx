import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

const siteUrl = "https://admitgpt.pages.dev";

export const viewport: Viewport = {
  themeColor: "#ffffff",
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
  authors: [{ name: "Zierax", url: "https://github.com/Zierax/AdmitGPT" }],
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
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "YOUR_GOOGLE_SEARCH_CONSOLE_ID",
    yandex: "YOUR_YANDEX_ID",
    yahoo: "YOUR_YAHOO_ID",
  },
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
