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
              <div className="relative h-10 w-10 overflow-hidden transition-transform group-hover:scale-105">
                <Image src="/assets/AdmitGPT.png" alt="AdmitGPT" fill className="object-contain" />
                <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" style={{ boxShadow: "0 0 0 2px var(--color-primary), 0 0 12px rgba(0,254,0,0.5)" }} />
              </div>
              <span className="text-lg uppercase tracking-tighter ag-wordmark">
                Admit<span className="accent">GPT</span>
              </span>
            </button>

            <button
              onClick={() => setIsWhyOpen(!isWhyOpen)}
              className={`hidden text-[11px] font-bold uppercase tracking-widest transition-colors md:flex md:items-center md:gap-2 ${
                isWhyOpen ? "text-[var(--color-primary)]" : "text-[var(--color-muted)] hover:text-[var(--color-foreground)]"
              }`}
            >
              Philosophy
              <ChevronDown size={14} className={`transition-transform duration-500 ${isWhyOpen ? "rotate-180" : ""}`} />
            </button>
          </div>

          <div className="flex items-center gap-5">
            <div className="hidden items-center gap-5 sm:flex">
              {showBack && (
                <button
                  onClick={onBack}
                  className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-muted)] transition-colors hover:text-[var(--color-foreground)]"
                >
                  Modify Profile
                </button>
              )}

              <a
                href="/transparency"
                className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[var(--color-muted)] transition-colors hover:text-[var(--color-primary)]"
              >
                <Eye size={14} /> Transparency
              </a>
            </div>

            {showDownloadPDF && (
              <button
                onClick={onDownloadPDF}
                className="btn-zine !px-4 !py-2 !text-[11px]"
              >
                Full Audit
              </button>
            )}

            <div className="flex items-center gap-4 border-l border-[var(--color-border)] pl-5">
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
        <div className="animate-fade-in-up relative overflow-hidden border-b-2 border-[var(--color-border-strong)] bg-[var(--color-card)]">
          <div className="ag-container grid gap-10 py-14 md:grid-cols-12 md:py-18">
            <div className="space-y-6 md:col-span-4">
                <div className="group relative">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[var(--radius-lg)] border-2 border-[var(--color-border-strong)] bg-[var(--color-surface-2)]">
                  <Image
                    src="/assets/Ziad_Salah_Photo.jpg"
                    alt="Ziad Salah"
                    fill
                    className="object-cover grayscale transition-all duration-700 hover:grayscale-0"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--color-foreground)]/80 to-transparent p-4">
                    <p className="text-lg font-bold text-[var(--color-foreground)]">Ziad Salah</p>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-muted)]">Creator // Student</p>
                  </div>
                </div>
              </div>

                <div className="ag-sticker-card !border-[var(--color-primary-line)]">
                <div className="mb-4 flex items-center gap-2 text-[var(--color-primary)]">
                  <Shield size={18} />
                  <span className="text-base font-bold tracking-tight">Verified Student</span>
                </div>
                <p className="text-lg font-bold leading-tight text-[var(--color-foreground)]">
                  &quot;I am like you &mdash; a student.&quot;
                </p>
                <p className="mt-2 text-sm italic leading-relaxed text-[var(--color-muted)]">
                  I built this because I faced the same black box you&apos;re facing now. I wanted the tool I wish I had &mdash; honest, mathematical, and free.
                </p>
              </div>
            </div>

            <div className="space-y-8 md:col-span-8 md:space-y-10">
              <div className="space-y-4">
                <div className="inline-block border border-[var(--color-primary)] px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-[var(--color-primary)]">
                  The Transparency Manifesto
                </div>
                <h2 className="text-3xl font-black tracking-tighter text-[var(--color-foreground)] md:text-5xl">
                  No black boxes.<br />
                  <span className="ag-mark">Zero secrets.</span>
                </h2>
              </div>

              <div className="grid gap-8 sm:grid-cols-2">
                <div className="space-y-4">
                  <p className="text-base font-medium leading-relaxed text-[var(--color-foreground)] md:text-lg">
                    Mathematics should never be a secret sold for thousands.
                  </p>
                  <p className="text-sm leading-relaxed text-[var(--color-muted)]">
                    While consultants sell &quot;insider magic&quot;, AdmitGPT gives you calculated reality. The logic is open-source and runs entirely in your browser. No data collection, no hidden formulas.
                  </p>
                </div>
                <div className="space-y-4">
                  <p className="text-base font-medium leading-relaxed text-[var(--color-foreground)] md:text-lg">
                    A systematic strike against information inequality.
                  </p>
                  <p className="text-sm leading-relaxed text-[var(--color-muted)]">
                    The admissions industry thrives on fear and ambiguity. By making the math transparent, we return the power to students &mdash; leveling the playing field for everyone.
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
