"use client";

import Image from "next/image";
import Header from "@/app/components/Header";
import { CONTACT_EMAIL, GITHUB_URL } from "@/lib/siteConfig";
import { ArrowRight, Mail, Shield, Eye, Lock, GraduationCap, Quote, Sparkles } from "lucide-react";

/* Inline SVG doodles — hand-drawn style */
function DoodleArrow({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="60" height="24" viewBox="0 0 60 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 14C8 12 20 8 30 10C40 12 48 14 56 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="4 3" />
      <path d="M50 6L58 12L50 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DoodleCircle({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="40" cy="40" rx="35" ry="32" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="6 4" transform="rotate(-3 40 40)" />
    </svg>
  );
}

function DoodleUnderline({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="120" height="12" viewBox="0 0 120 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 8C15 4 30 10 45 6C60 2 75 9 90 5C105 1 115 7 118 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function DoodleStar({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L14 9L21 9L15.5 13.5L17.5 21L12 16.5L6.5 21L8.5 13.5L3 9L10 9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TapeStrip({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute -top-2 left-6 w-16 h-5 bg-[var(--color-yellow-highlight)] border border-black/10 z-10 ${className}`} style={{ transform: "rotate(-2deg)" }} />
  );
}

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
          {/* ===== HERO ===== */}
          <section className="grid items-center gap-12 py-16 lg:grid-cols-12 lg:gap-16 lg:py-24">
            <div className="lg:col-span-7">
              <div className="ag-eyebrow mb-7">
                <Sparkles size={14} /> Free for every student
              </div>

              <h1 className="ag-display mb-6">
                See your real college{" "}
                <span className="ag-underline">odds</span>.
              </h1>

              <p className="ag-lead mb-9">
                AdmitGPT shows your actual acceptance chances from your GPA,
                test scores, and extracurriculars — for every school on your list.
                Honest math, private by design, and free. Built by a student who was
                tired of the guessing game.
              </p>

              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <button
                  onClick={onStart}
                  disabled={isLoading}
                  className="btn btn-primary w-full sm:w-auto"
                >
                  {isLoading ? (
                    <>
                      <div className="loading-spinner !w-5 !h-5 !border-2 !border-[#1A1A1A]" />
                      <span>{loadingMessage}</span>
                    </>
                  ) : (
                    <>
                      <span>See my chances</span>
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>

                <button onClick={onShowWhy} className="btn btn-secondary w-full sm:w-auto">
                  Why trust us
                </button>
              </div>

              <dl className="mt-14 grid max-w-xl grid-cols-3 gap-6 border-t-2 border-[var(--color-border)] pt-8">
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

            <div className="lg:col-span-5 relative">
              {/* Doodle decorations around mascot */}
              <DoodleCircle className="absolute -top-6 -right-4 text-[var(--color-red-marker)] opacity-40 hidden lg:block" />
              <DoodleStar className="absolute top-10 -left-2 text-[var(--color-primary)] opacity-60 hidden lg:block" />

              <div className="ag-mascot mx-auto max-w-sm">
                <Image
                  src="/assets/AdmitGPT.png"
                  alt="AdmitGPT mascot"
                  width={877}
                  height={872}
                  className="ag-mascot-img"
                  priority
                  sizes="(max-width: 1024px) 90vw, 34vw"
                />
              </div>
              <div className="ag-bubble mt-8 mx-auto max-w-sm">
                <b>Hey, I&apos;m Admit.</b> Tell me your grades and activities — I&apos;ll show you
                the real odds, no sugar-coating. Takes about a minute.
              </div>
            </div>
          </section>

          <div className="my-6" aria-hidden />
        </div>

        {/* ===== REAL ODDS ===== */}
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

        {/* ===== PILLARS ===== */}
        <div className="ag-container">
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
                <article key={p.title} className="ag-card relative" style={{ transform: i === 1 ? "rotate(0.5deg)" : i === 2 ? "rotate(-0.5deg)" : undefined }}>
                  <TapeStrip className={i === 0 ? "" : "hidden"} />
                  <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-wobbly-2)] bg-[var(--color-yellow-highlight)] text-[var(--color-foreground)] border-2 border-[var(--color-border)]">
                    <p.Icon size={20} />
                  </div>
                  <h3 className="text-lg text-[var(--color-foreground)] mb-2">{p.title}</h3>
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
                <div key={t} className="ag-step" style={{ transform: i === 1 ? "rotate(0.3deg)" : i === 2 ? "rotate(-0.4deg)" : undefined }}>
                  <span className="ag-step-num">{i + 1}</span>
                  <span className="ag-step-txt"><b>{t}.</b> {d}</span>
                </div>
              ))}
            </div>
          </section>

          {/* ===== FOUNDER VOICE ===== */}
          <section className="py-16">
            <div className="ag-card relative" style={{ padding: "clamp(28px, 5vw, 56px)" }}>
              <TapeStrip />
              <Quote size={28} className="text-[var(--color-red-marker)] mb-6" />
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
          <section className="ag-card my-12 overflow-hidden p-10 text-center lg:p-16 relative" style={{ transform: "rotate(-0.3deg)" }}>
            <DoodleArrow className="absolute top-6 right-8 text-[var(--color-red-marker)] opacity-40 hidden lg:block" />
            <div className="mx-auto max-w-2xl">
              <h2 className="ag-h1 mb-4">
                Stop wondering. <span className="ag-underline">Start knowing</span>.
              </h2>
              <p className="ag-lead mx-auto mb-8">
                It takes about a minute. Answer a few questions about your grades and
                activities, and see where you actually stand — for every school on your list.
              </p>
              <button onClick={onStart} disabled={isLoading} className="btn btn-primary w-full sm:w-auto">
                {isLoading ? (
                  <>
                    <div className="loading-spinner !w-5 !h-5 !border-2 !border-[#1A1A1A]" />
                    <span>{loadingMessage}</span>
                  </>
                ) : (
                  <>
                    <span>Get my free analysis</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t-2 border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-8">
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
