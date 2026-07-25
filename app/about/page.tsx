import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SITE_ORIGIN, GITHUB_URL, INSTAGRAM_URL, CONTACT_EMAIL } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "About AdmitGPT — The Team, Methodology & Editorial Standards",
  description:
    "AdmitGPT is a free, open-source college admissions probability engine built by a student, for students. Meet the author, see the transparent methodology, and read our editorial and financial-aid disclaimer.",
  keywords: [
    "about AdmitGPT",
    "who made AdmitGPT",
    "AdmitGPT methodology",
    "college admissions calculator disclaimer",
    "Ziad Salah admissions",
    "open source college counselor",
    "college admissions probability engine",
    "additive-logistic admissions model",
  ],
  openGraph: {
    title: "About AdmitGPT — Team, Methodology & Editorial Standards",
    description:
      "A transparent, open-source college admissions engine. Meet the author, the methodology, and our editorial standards.",
    url: "/about",
    type: "profile",
    images: [{ url: "/og/about.png", width: 1200, height: 630, alt: "About AdmitGPT — Team, Methodology & Editorial Standards" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About AdmitGPT — Team, Methodology & Editorial Standards",
    description:
      "A transparent, open-source college admissions engine. Meet the author, the methodology, and our editorial standards.",
    images: ["/og/about.png"],
  },
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="app-bg" style={{ minHeight: "100vh" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "AboutPage",
              name: "About AdmitGPT",
              url: `${SITE_ORIGIN}/about`,
              mainEntity: { "@id": `${SITE_ORIGIN}/#organization` },
              about: { "@id": `${SITE_ORIGIN}/#author` },
              inLanguage: "en-US",
            },
            {
              "@context": "https://schema.org",
              "@type": "Person",
              "@id": `${SITE_ORIGIN}/#author`,
              name: "Ziad Salah",
              alternateName: "Zierax",
              url: GITHUB_URL,
              image: `${SITE_ORIGIN}/assets/Ziad_Salah_Photo.jpg`,
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
                "Additive-logistic models",
                "Educational data science",
              ],
              sameAs: [
                "https://github.com/Zierax/AdmitGPT",
                "https://instagram.com/z14d.d",
                "https://www.linkedin.com/in/z14d",
                "https://www.wikidata.org/wiki/Q140676440",
              ],
              alumniOf: {
                "@type": "EducationalOrganization",
                name: "AdmitGPT",
              },
              worksFor: {
                "@type": "Organization",
                name: "AdmitGPT",
                url: SITE_ORIGIN,
              },
            },
          ]),
        }}
      />
      <main className="tp-wrap">
        <span className="tp-eyebrow">About</span>
        <h1 className="tp-h1">A free, open admissions engine — built in the open.</h1>
        <p className="tp-lead">
          AdmitGPT is an open-source college admissions probability calculator. It predicts your
          chances at 6,000+ US colleges from your SAT, ACT, GPA, and extracurriculars using a
          transparent additive-logistic model. No black boxes, no paywalls, and your data never
          leaves your browser.
        </p>

        <section className="tp-section">
          <h2 className="tp-h2">Who built it</h2>
          <div style={{ display: "flex", gap: 18, alignItems: "flex-start", marginTop: 12, flexWrap: "wrap" }}>
            <Image
              src="/assets/Ziad_Salah_Photo.jpg"
              alt="Ziad Salah, creator of AdmitGPT"
              width={72}
              height={72}
              style={{ borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
            />
            <div>
              <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.8, margin: 0 }}>
                AdmitGPT was created by <strong>Ziad Salah</strong> (also known as Zierax), a student
                builder who was frustrated by expensive college consultants and opaque &ldquo;chance
                me&rdquo; tools that gave numbers with no explanation. He built AdmitGPT to give
                students the same kind of honest, data-driven read on their odds that a good
                counselor would — for free, and with every formula published.
              </p>
              <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.8, margin: "12px 0 0" }}>
                The engine is calibrated against 1,122+ self-reported admission profiles
                (2024–2026) and uses an additive-logistic model — the same class of model used in
                published admissions research (Giani &amp; Walling 2020; Lee, Kizilcec &amp; Joachims
                2023). Its reliability is documented openly: ordinal AUC ~0.74, with honest
                calibration limits at the most selective schools.
              </p>
              <p style={{ fontSize: 14, marginTop: 14 }}>
                <a href={GITHUB_URL} target="_blank" rel="me noopener noreferrer" style={{ color: "var(--color-primary)" }}>
                  GitHub ↗
                </a>
                {"  ·  "}
                <a href={INSTAGRAM_URL} target="_blank" rel="me noopener noreferrer" style={{ color: "var(--color-primary)" }}>
                  Instagram ↗
                </a>
                {"  ·  "}
                <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "var(--color-primary)" }}>
                  {CONTACT_EMAIL}
                </a>
              </p>
            </div>
          </div>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">Our methodology</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.8 }}>
            AdmitGPT combines your academic strength (SAT/ACT/GPA z-scores against each
            school&rsquo;s own distribution), a six-dimension extracurricular spike score, intended
            major fit, international context, and early-decision timing into a single probability per
            college. Every coefficient and weight is published on the{" "}
            <Link href="/transparency" style={{ color: "var(--color-primary)" }}>
              Transparency page
            </Link>
            . The model runs 100% in your browser.
          </p>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.8, marginTop: 12 }}>
            We are explicit about what the model does <em>not</em> know: holistic reader judgment,
            essays, letters of recommendation, and demonstrated interest are not fully captured. At
            schools below 10% admission rate, the model systematically under-predicts the true rate.
            We report this openly rather than hiding it.
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">Editorial &amp; financial-aid disclaimer</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.8 }}>
            AdmitGPT is an <strong>informational tool, not official advice</strong>. We are not
            affiliated with, endorsed by, or connected to any college or university, the Common App,
            the College Board, ACT, or any government agency. Acceptance rates, score ranges, and
            financial-aid policies change year to year and vary by applicant; always confirm current
            figures with each school&rsquo;s admissions office and the official sources we link to
            (Common Data Set, Federal Student Aid, and statute text).
          </p>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.8, marginTop: 12 }}>
            Probability estimates are directional, not guarantees. No calculator — including ours —
            can predict an individual outcome. Use AdmitGPT to plan and explore, then verify the
            specifics with primary sources and, where it matters, a qualified counselor.
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">Explore</h2>
          <ul style={{ fontSize: 15, lineHeight: 2, paddingLeft: 20 }} className="ag-muted">
            <li>
              <Link href="/guide" style={{ color: "var(--color-primary)" }}>
                College admissions guides
              </Link>
            </li>
            <li>
              <Link href="/transparency" style={{ color: "var(--color-primary)" }}>
                How the engine works (full math)
              </Link>
            </li>
            <li>
              <Link href="/faq" style={{ color: "var(--color-primary)" }}>
                Frequently asked questions
              </Link>
            </li>
            <li>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-primary)" }}>
                Source code &amp; license (MIT)
              </a>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}
