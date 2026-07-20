"use client";

import Image from "next/image";
import Header from "@/app/components/Header";
import { CONTACT_EMAIL, GITHUB_URL } from "@/lib/siteConfig";
import { Sparkles, ArrowRight, Mail, Shield, Eye, Lock, GraduationCap, Quote } from "lucide-react";

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
  const pillars = [
    {
      Icon: Eye,
      title: "See your real odds",
      body: "Type in your grades and activities and get a straight answer on your chances — for every school you care about. No guessing, no sugar-coating.",
    },
    {
      Icon: Shield,
      title: "Honest, not a black box",
      body: "We show you the math, the range, and what's working against you. You deserve the truth, not a number designed to make you feel good.",
    },
    {
      Icon: Lock,
      title: "Private by design",
      body: "Your info never leaves your device. No account, no tracking, no selling your data. Everything runs on your laptop or phone.",
    },
  ];

  const steps = [
    ["Answer a few questions", "Grades, scores, what you do outside class. About a minute."],
    ["See your real chances", "Per school, with the range and what's helping or hurting."],
    ["Know your next move", "What actually moves the needle before you submit."],
  ];

  // Real acceptance rates (honest, sourced from the app guides).
  const odds = [
    { school: "Harvard", rate: "3.6%", hot: true },
    { school: "Stanford", rate: "3.9%", hot: true },
    { school: "MIT", rate: "4.0%", hot: true },
    { school: "Caltech", rate: "3.1%", hot: true },
    { school: "Yale", rate: "4.6%" },
    { school: "Princeton", rate: "5.8%" },
    { school: "Columbia", rate: "4.1%" },
    { school: "Brown", rate: "5.2%" },
    { school: "Penn", rate: "5.9%" },
    { school: "Dartmouth", rate: "6.2%" },
    { school: "Duke", rate: "5.8%" },
    { school: "UChicago", rate: "5.4%" },
    { school: "Johns Hopkins", rate: "6.5%" },
    { school: "Northwestern", rate: "7.2%" },
    { school: "Cornell", rate: "7.3%" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="ag-container">
          {/* ===== HERO — zine, mascot-led ===== */}
          <section className="grid items-center gap-12 py-16 lg:grid-cols-12 lg:gap-16 lg:py-24">
            <div className="lg:col-span-7">
              <div className="ag-eyebrow mb-7">
                <Sparkles size={14} /> Free for every student
              </div>

              <h1 className="ag-display mb-6">
                See your real college{" "}
                <span className="ag-mark">odds</span>.
              </h1>

              <p className="ag-lead mb-9" style={{ color: "var(--color-foreground-dim)", maxWidth: "52ch" }}>
                AdmitGPT shows your actual acceptance chances from your GPA,
                test scores, and extracurriculars — for every school on your list.
                Honest math, private by design, and free. Built by a student who was
                tired of the guessing game.
              </p>

              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <button
                  onClick={onStart}
                  disabled={isLoading}
                  className="btn-zine group/btn w-full sm:w-auto"
                >
                  {isLoading ? (
                    <>
                      <div className="loading-spinner !w-5 !h-5 !border-2 !border-black" />
                      <span>{loadingMessage}</span>
                    </>
                  ) : (
                    <>
                      <span>See my chances</span>
                      <ArrowRight size={20} className="ml-1 transition-transform group-hover/btn:translate-x-1" />
                    </>
                  )}
                </button>

                <button onClick={onShowWhy} className="btn-zine secondary w-full sm:w-auto">
                  Why trust us
                </button>
              </div>

              <dl className="mt-14 grid max-w-xl grid-cols-3 gap-6 border-t-2 border-[var(--color-border-strong)] pt-8">
                <div>
                  <dt className="ag-figure">1,122+</dt>
                  <dd className="ag-figure-label">Real profiles the engine is calibrated on.</dd>
                </div>
                <div>
                  <dt className="ag-figure accent">100%</dt>
                  <dd className="ag-figure-label">Runs on your device. Nothing uploaded.</dd>
                </div>
                <div>
                  <dt className="ag-figure">$0</dt>
                  <dd className="ag-figure-label">Always free. No consultant, no upsell.</dd>
                </div>
              </dl>
            </div>

            {/* Right: mascot merged into the page — same off-black field, gray brackets, lime shard echo */}
            <div className="lg:col-span-5">
              <div className="ag-mascot-merge mx-auto max-w-sm">
                <Image
                  src="/assets/AdmitGPT.png"
                  alt="AdmitGPT"
                  width={877}
                  height={872}
                  className="ag-mascot-img"
                  priority
                  sizes="(max-width: 1024px) 90vw, 34vw"
                />
                <span className="ag-mascot-shard ag-mascot-shard--1" />
                <span className="ag-mascot-shard ag-mascot-shard--2" />
                <span className="ag-mascot-shard ag-mascot-shard--3" />
              </div>
              <div className="ag-bubble mt-8 mx-auto max-w-sm">
                <b>Hey, I&apos;m Admit.</b> Tell me your grades and activities — I&apos;ll show you
                the real odds, no sugar-coating. Takes about a minute.
              </div>
            </div>
          </section>

          <div className="ag-squiggle my-6" aria-hidden />
        </div>

        {/* ===== REAL ODDS — static, honest, the most useful thing on the page ===== */}
        <div className="ag-container">
          <div className="ag-section-head">
            <span className="idx">01</span>
            <div className="body">
              <div className="kicker">The reality, not the brochure</div>
              <div className="title">What it actually takes</div>
            </div>
          </div>

          <div className="ag-odds">
            {odds.map((o) => (
              <div key={o.school} className={`ag-odds-cell ${o.hot ? "hot" : ""}`}>
                <span className="ag-odds-school">{o.school}</span>
                <span className="ag-odds-rate">{o.rate}</span>
                <span className="ag-odds-note">accepted last cycle</span>
              </div>
            ))}
          </div>
          <p className="ag-odds-note" style={{ marginTop: 14, color: "var(--color-muted)" }}>
            Rates are public admission statistics. Your personal odds depend on your profile — that&apos;s what AdmitGPT calculates.
          </p>
        </div>

        <div className="ag-container">
          {/* ===== PILLARS — zine sticker cards ===== */}
          <section className="py-16">
            <div className="ag-section-head">
              <span className="idx">02</span>
              <div className="body">
                <div className="kicker">Why students pick AdmitGPT</div>
                <div className="title">Three promises we keep</div>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {pillars.map((p, i) => (
                <article key={p.title} className="ag-sticker-card" style={{ transform: `rotate(${i === 1 ? 0.8 : -0.8}deg)` }}>
                  <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-primary-faint)] text-[var(--color-primary)] border border-[var(--color-primary-line)]">
                    <p.Icon size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--color-foreground)] mb-2 tracking-tight">{p.title}</h3>
                  <p className="text-[var(--text-small)] leading-relaxed text-[var(--color-foreground-dim)]">
                    {p.body}
                  </p>
                </article>
              ))}
            </div>
          </section>

          {/* ===== HOW IT WORKS ===== */}
          <section className="py-8">
            <div className="ag-section-head">
              <span className="idx">03</span>
              <div className="body">
                <div className="kicker">How it works</div>
                <div className="title">From guesswork to clarity</div>
              </div>
            </div>
            <div className="ag-steps">
              {steps.map(([t, d], i) => (
                <div key={t} className="ag-step" style={{ border: "2px solid var(--color-border-strong)", borderRadius: "16px 20px 14px 18px / 18px 14px 20px 16px" }}>
                  <span className="ag-step-num">{i + 1}</span>
                  <span className="ag-step-txt"><b>{t}.</b> {d}</span>
                </div>
              ))}
            </div>
          </section>

          {/* ===== FOUNDER VOICE — human, not corporate ===== */}
          <section className="py-16">
            <div className="ag-sticker-card" style={{ padding: "clamp(28px, 5vw, 56px)" }}>
              <Quote size={28} className="text-[var(--color-primary)] mb-6" />
              <div className="ag-quote">
                <p>
                  I am like you — a student. I built this because I faced the same black box
                  you&apos;re facing now. The math behind admissions shouldn&apos;t be a secret
                  sold for thousands. So I made it free, and I made it honest.
                </p>
                <cite>Ziad Salah — Creator of AdmitGPT</cite>
              </div>
            </div>
          </section>

          {/* ===== CTA BAND ===== */}
          <section className="ag-sticker-card my-12 overflow-hidden p-10 text-center lg:p-16">
            <div className="mx-auto max-w-2xl">
              <h2 className="ag-h1 mb-4">
                Stop wondering. <span className="ag-mark">Start knowing</span>.
              </h2>
              <p className="ag-lead mx-auto mb-8" style={{ color: "var(--color-foreground-dim)" }}>
                It takes about a minute. Answer a few questions about your grades and
                activities, and see where you actually stand — for every school on your list.
              </p>
              <button onClick={onStart} disabled={isLoading} className="btn-zine w-full sm:w-auto">
                {isLoading ? (
                  <>
                    <div className="loading-spinner !w-5 !h-5 !border-2 !border-black" />
                    <span>{loadingMessage}</span>
                  </>
                ) : (
                  <>
                    <span>Get my free analysis</span>
                    <ArrowRight size={20} />
                  </>
                )}
              </button>
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface-2)] px-6 py-8">
        <div className="ag-container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-xs text-[var(--color-muted)]">&copy; 2026 AdmitGPT. Built for students, by students.</p>
          <div className="flex items-center gap-6 text-xs">
            <a href="/transparency" className="text-[var(--color-muted)] transition-colors hover:text-[var(--color-foreground)]">
              How it works
            </a>
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-[var(--color-muted)] transition-colors hover:text-[var(--color-foreground)] flex items-center gap-1">
              <Mail size={12} /> Contact
            </a>
            <a href={GITHUB_URL} className="text-[var(--color-muted)] transition-colors hover:text-[var(--color-foreground)]">
              Open source
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
