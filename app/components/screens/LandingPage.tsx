"use client";

import Image from "next/image";
import Header from "@/app/components/Header";
import { CONTACT_EMAIL, GITHUB_URL } from "@/lib/siteConfig";
import { Sparkles, ArrowRight, Mail, Shield, Github, Eye } from "lucide-react";

export function LandingPage({
  onStart,
  isLoading,
  loadingMessage,
  onShowWhy,
}: {
  onStart: () => void;
  isLoading: boolean;
  loadingMessage: string;
  onShowWhy: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="ag-container">
          <section className="relative overflow-hidden ag-card animate-fade-in-up" style={{ padding: "clamp(32px, 6vw, 72px)" }}>
            <div
              className="pointer-events-none absolute inset-0 opacity-60"
              style={{
                background:
                  "radial-gradient(800px 400px at 50% -10%, var(--color-primary-glow), transparent 60%)",
              }}
            />

            <div className="relative z-10 mx-auto max-w-3xl text-center">
              <div className="ag-eyebrow mb-8 justify-center">
                <Sparkles size={14} /> Intelligence for Education
              </div>

              <div className="mx-auto mb-10 w-28 h-28 relative">
                <div className="absolute inset-0 rounded-[34px] bg-gradient-to-tr from-[var(--color-primary)] to-transparent opacity-20 transition-opacity duration-500 hover:opacity-40" />
                <div className="relative h-full w-full overflow-hidden rounded-[28px] border border-white/10 bg-black shadow-2xl">
                  <Image src="/assets/AdmitGPT.png" alt="AdmitGPT Logo" fill className="object-cover" priority />
                </div>
              </div>

              <h1 className="ag-display uppercase mb-8">
                Admit<span className="ag-glow">GPT</span>
              </h1>

              <p className="ag-lead mx-auto mb-12">
                The world&apos;s first transparent, additive-logistic admissions engine.
                Built by a student who believes mathematical truth should be free &mdash;
                not sold by consultants for thousands.
              </p>

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <button
                  onClick={onStart}
                  disabled={isLoading}
                  className="btn btn-primary group/btn w-full sm:w-auto"
                  style={{ padding: "18px 40px", fontSize: "17px" }}
                >
                  {isLoading ? (
                    <>
                      <div className="loading-spinner !w-5 !h-5 !border-2 !border-black" />
                      <span>{loadingMessage}</span>
                    </>
                  ) : (
                    <>
                      <span>Start Free Analysis</span>
                      <ArrowRight size={20} className="ml-1 transition-transform group-hover/btn:translate-x-1" />
                    </>
                  )}
                </button>

                <button onClick={onShowWhy} className="btn btn-secondary w-full sm:w-auto">
                  Our Philosophy
                </button>
              </div>

              <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 border-t border-[var(--color-border)] pt-10 sm:grid-cols-3">
                {[
                  ["1,122+", "Historical profiles"],
                  ["100%", "Client-side logic"],
                  ["Zero", "Data tracking"],
                ].map(([stat, label]) => (
                  <div key={label} className="flex flex-col items-center">
                    <span className="text-3xl font-black text-white">{stat}</span>
                    <span className="mt-1 text-[11px] uppercase tracking-widest font-bold text-[var(--color-muted)]">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="ag-grid mt-8 md:grid-cols-3">
            {[
              [Shield, "Radically transparent", "Every weight, formula, and limitation lives in open source. No black box, no hidden multipliers."],
              [Eye, "Honest about odds", "We show the audit range and the math behind it &mdash; including the parts that work against you."],
              [Github, "Yours to verify", "The full engine, calibration scripts, and dataset ship together. Run it, audit it, trust it."],
            ].map(([Icon, title, body]) => (
              <div key={title as string} className="ag-card-flat">
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-primary-glow)] text-[var(--color-primary)]">
                  <Icon size={20} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{title as string}</h3>
                <p className="text-sm text-[var(--color-muted)] leading-relaxed">{body as string}</p>
              </div>
            ))}
          </section>
        </div>
      </main>

      <footer className="border-t border-[var(--color-border)] bg-[#050609] px-6 py-8">
        <div className="ag-container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-xs text-[var(--color-muted)]">&copy; 2026 AdmitGPT. Built for the Transparency Movement.</p>
          <div className="flex items-center gap-6 text-xs">
            <a href="/transparency" className="text-[var(--color-muted)] transition-colors hover:text-[var(--color-foreground)]">
              Transparency Report
            </a>
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-[var(--color-muted)] transition-colors hover:text-[var(--color-foreground)] flex items-center gap-1">
              <Mail size={12} /> Contact
            </a>
            <a href={GITHUB_URL} className="text-[var(--color-muted)] transition-colors hover:text-[var(--color-foreground)]">
              Source Code
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
