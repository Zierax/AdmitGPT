import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AdmitGPT",
  description:
    "Free, open-source college admissions probability calculator. No black boxes. No premium tiers. Built by a student, for students. Your data never leaves your browser.",
  keywords: [
    "college admissions",
    "probability calculator",
    "college chances",
    "admissions predictor",
    "free college counseling",
    "SAT GPA calculator",
    "open source admissions",
  ],
  icons: {
    icon: [
      {
        url: "/assets/AdmitGPT.png",
        href: "/assets/AdmitGPT.png",
      },
    ],
  },
  openGraph: {
    title: "AdmitGPT — Your Honest Admissions Picture",
    description:
      "Stop paying consultants for information that mathematics can provide for free. Enter your profile. Get the honest picture.",
    type: "website",
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
      <body className="antialiased">{children}</body>
    </html>
  );
}
