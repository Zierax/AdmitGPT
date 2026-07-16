import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How AdmitGPT Works — The Exact Admissions Math, Explained",
  description:
    "Full transparency: every formula, weight, and limitation behind AdmitGPT's college admissions probability engine. See the additive-logistic model, spike scoring, calibration, and data provenance — no black boxes.",
  keywords: [
    "how college admissions calculator works",
    "admissions probability formula",
    "transparent admissions model",
    "college chance calculator methodology",
    "admissions algorithm explained",
    "open source admissions math",
  ],
  alternates: { canonical: "/transparency" },
  openGraph: {
    title: "How AdmitGPT Works — The Exact Admissions Math",
    description:
      "Every formula, weight, and limitation behind our open-source admissions engine. No black boxes.",
    url: "/transparency",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "How AdmitGPT Works — The Exact Admissions Math",
    description:
      "Every formula, weight, and limitation behind our open-source admissions engine.",
  },
};

export default function TransparencyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
