"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Eye,
  Github,
  ChevronDown,
  Shield,
  Instagram,
  Mail,
} from "lucide-react";
import { GITHUB_URL, INSTAGRAM_URL, CONTACT_EMAIL } from "@/lib/siteConfig";

interface HeaderProps {
  onBack?: () => void;
  showBack?: boolean;
  onDownloadPDF?: () => void;
  showDownloadPDF?: boolean;
}

export default function Header({
  onBack,
  showBack,
  onDownloadPDF,
  showDownloadPDF,
}: HeaderProps) {
  const [isWhyOpen, setIsWhyOpen] = useState(false);

  return (
    <>
      <nav className="ag-nav">
        <div className="ag-container flex items-center justify-between py-4">
          <div className="flex items-center gap-6">
            <button
              onClick={() => (window.location.href = "/")}
              className="group flex items-center gap-3"
              aria-label="AdmitGPT home"
            >
              <div className="relative h-11 w-11 shrink-0 transition-transform group-hover:scale-105">
                <Image src="/assets/AdmitGPT.png" alt="AdmitGPT" fill className="object-contain" />
                <span className="pointer-events-none absolute inset-0 rounded-[var(--radius-wobbly-1)] opacity-0 group-hover:opacity-100 transition-opacity" style={{ boxShadow: "0 0 0 2px var(--color-primary), 0 0 12px rgba(0,254,0,0.5)" }} />
              </div>
              <span className="text-xl text-[var(--color-foreground)]" style={{ fontFamily: "var(--font-display)" }}>
                Admit<span className="text-[var(--color-red-marker)]">GPT</span>
              </span>
            </button>

            <button
              onClick={() => setIsWhyOpen(!isWhyOpen)}
              className={`hidden text-sm transition-colors md:flex md:items-center md:gap-2 ${
                isWhyOpen ? "text-[var(--color-red-marker)]" : "text-[var(--color-foreground-dim)] hover:text-[var(--color-foreground)]"
              }`}
              style={{ fontFamily: "var(--font-hand)" }}
            >
              Philosophy
              <ChevronDown size={14} className={`transition-transform duration-300 ${isWhyOpen ? "rotate-180" : ""}`} />
            </button>
          </div>

          <div className="flex items-center gap-5">
            <div className="hidden items-center gap-5 sm:flex">
              {showBack && (
                <button
                  onClick={onBack}
                  className="text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-foreground)]"
                  style={{ fontFamily: "var(--font-hand)" }}
                >
                  Modify Profile
                </button>
              )}

              <a
                href="/transparency"
                className="flex items-center gap-2 text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-red-marker)]"
                style={{ fontFamily: "var(--font-hand)" }}
              >
                <Eye size={14} /> Transparency
              </a>
            </div>

            {showDownloadPDF && (
              <button
                onClick={onDownloadPDF}
                className="btn btn-secondary !px-4 !py-2 !text-sm"
              >
                Full Audit
              </button>
            )}

            <div className="flex items-center gap-4 border-l-2 border-[var(--color-border)] pl-5">
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="text-[var(--color-muted)] transition-colors hover:text-[var(--color-foreground)]" aria-label="GitHub">
                <Github size={19} />
              </a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-[var(--color-muted)] transition-colors hover:text-[var(--color-foreground)]" aria-label="Instagram">
                <Instagram size={19} />
              </a>
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-[var(--color-muted)] transition-colors hover:text-[var(--color-foreground)]" aria-label="Contact">
                <Mail size={19} />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {isWhyOpen && (
        <div className="animate-fade-in-up relative overflow-hidden border-b-2 border-[var(--color-border)] bg-[var(--color-card)]">
          <div className="ag-container grid gap-10 py-14 md:grid-cols-12 md:py-18">
            <div className="space-y-6 md:col-span-4">
              <div className="group relative">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[var(--radius-wobbly-2)] border-2 border-[var(--color-border)] bg-[var(--color-surface)]">
                  <Image
                    src="/assets/Ziad_Salah_Photo.jpg"
                    alt="Ziad Salah"
                    fill
                    className="object-cover grayscale transition-all duration-700 hover:grayscale-0"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <p className="text-lg text-white" style={{ fontFamily: "var(--font-display)" }}>Ziad Salah</p>
                    <p className="text-[10px] uppercase tracking-widest text-white/70" style={{ fontFamily: "var(--font-hand)" }}>Creator // Student</p>
                  </div>
                </div>
              </div>

              <div className="ag-card !border-[var(--color-red-marker)]">
                <div className="mb-4 flex items-center gap-2 text-[var(--color-red-marker)]">
                  <Shield size={18} />
                  <span className="text-base tracking-tight" style={{ fontFamily: "var(--font-display)" }}>Verified Student</span>
                </div>
                <p className="text-lg leading-tight text-[var(--color-foreground)]" style={{ fontFamily: "var(--font-display)" }}>
                  &quot;I am like you — a student.&quot;
                </p>
                <p className="mt-2 text-sm italic leading-relaxed text-[var(--color-muted)]" style={{ fontFamily: "var(--font-hand)" }}>
                  I built this because I faced the same black box you&apos;re facing now. I wanted the tool I wish I had — honest, mathematical, and free.
                </p>
              </div>
            </div>

            <div className="space-y-8 md:col-span-8 md:space-y-10">
              <div className="space-y-4">
                <div className="ag-pill">
                  The Transparency Manifesto
                </div>
                <h2 className="text-3xl tracking-tighter text-[var(--color-foreground)] md:text-5xl" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>
                  No black boxes.<br />
                  <span className="ag-underline">Zero secrets.</span>
                </h2>
              </div>

              <div className="grid gap-8 sm:grid-cols-2">
                <div className="space-y-4">
                  <p className="text-base leading-relaxed text-[var(--color-foreground)] md:text-lg" style={{ fontFamily: "var(--font-hand)" }}>
                    Mathematics should never be a secret sold for thousands.
                  </p>
                  <p className="text-sm leading-relaxed text-[var(--color-muted)]" style={{ fontFamily: "var(--font-hand)" }}>
                    While consultants sell &quot;insider magic&quot;, AdmitGPT gives you calculated reality. The logic is open-source and runs entirely in your browser. No data collection, no hidden formulas.
                  </p>
                </div>
                <div className="space-y-4">
                  <p className="text-base leading-relaxed text-[var(--color-foreground)] md:text-lg" style={{ fontFamily: "var(--font-hand)" }}>
                    A systematic strike against information inequality.
                  </p>
                  <p className="text-sm leading-relaxed text-[var(--color-muted)]" style={{ fontFamily: "var(--font-hand)" }}>
                    The admissions industry thrives on fear and ambiguity. By making the math transparent, we return the power to students — leveling the playing field for everyone.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
