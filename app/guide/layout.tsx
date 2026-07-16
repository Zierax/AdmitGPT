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
