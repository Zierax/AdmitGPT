import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify Certificate",
  description:
    "Verify the authenticity of an AdmitGPT outlier certificate signature.",
  robots: { index: false, follow: false },
};

export default function VerifyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
