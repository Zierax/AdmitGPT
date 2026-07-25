import type { Metadata } from "next";
import Header from "@/app/components/Header";

export const metadata: Metadata = {
  title: {
    default: "College Admissions Guides | AdmitGPT",
    template: "%s | AdmitGPT Guides",
  },
  description:
    "Data-driven guides on college admissions chances, test-optional strategies, and extracurricular evaluation by the AdmitGPT team. Honest, transparent, free.",
  openGraph: {
    title: "College Admissions Guides",
    description: "Data-driven college admissions guides from AdmitGPT.",
    url: "/guide",
    type: "website",
    images: [{ url: "/og/guide.png", width: 1200, height: 630, alt: "College Admissions Guides — Data-Driven Help" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "College Admissions Guides",
    description: "Data-driven college admissions guides from AdmitGPT.",
    images: ["/og/guide.png"],
  },
  alternates: { canonical: "/guide" },
};

export default function GuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
