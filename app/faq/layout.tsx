import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "College Admissions FAQ — Free Guide | AdmitGPT",
  description:
    "Answers to the most common college admissions questions: how chances calculators work, what GPA and SAT scores you need, test-optional policies, early decision strategy, and more — from the creators of the open-source AdmitGPT engine.",
  keywords: [
    "college admissions FAQ",
    "college application questions and answers",
    "how does college admissions work",
    "what GPA do I need for Harvard",
    "does early decision increase chances",
    "test-optional explained",
    "college chances calculator FAQ",
    "Common App questions",
    "financial aid FAQ college",
  ],
  openGraph: {
    title: "College Admissions FAQ — Free Guide | AdmitGPT",
    description: "Everything you need to know about college admissions chances, GPA and SAT requirements, early decision strategy, and the AdmitGPT open-source engine.",
    url: "/faq",
    type: "website",
  },
  alternates: { canonical: "/faq" },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
