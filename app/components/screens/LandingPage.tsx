"use client";

import Image from "next/image";
import Header from "@/app/components/Header";
import { CONTACT_EMAIL, GITHUB_URL } from "@/lib/siteConfig";
import { Sparkles, ArrowRight, Mail } from "lucide-react";

export function LandingPage({
  onStart,
  isLoading,
  loadingMessage,
  onShowWhy
}: {
  onStart: () => void;
  isLoading: boolean;
  loadingMessage: string;
  onShowWhy: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[#05050a]">
      <Header />

      {/* Hero */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-4xl w-full">
          <section className="relative py-20 px-8 rounded-[2rem] overflow-hidden glass-card border-none shadow-[0_0_100px_rgba(191,255,0,0.03)] bg-black/40 backdrop-blur-3xl">
            <div className="absolute inset-0 bg-gradient-to-br from-[rgba(191,255,0,0.05)] via-transparent to-transparent pointer-events-none" />

            <div className="max-w-3xl mx-auto text-center relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(191,255,0,0.05)] border border-[rgba(191,255,0,0.1)] text-[var(--color-primary)] text-xs font-bold uppercase tracking-widest mb-8 animate-fade-in">
                <Sparkles size={14} /> Intelligence for Education
              </div>

              {/* Logo container - Soft frame */}
              <div className="mx-auto mb-8 w-32 h-32 relative p-1 group">
                <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-primary)] to-transparent opacity-20 rounded-3xl group-hover:opacity-40 transition-opacity" />
                <div className="relative w-full h-full bg-black overflow-hidden border border-white/10 rounded-2xl shadow-2xl">
                  <Image
                    src="/assets/AdmitGPT.png"
                    alt="AdmitGPT Logo"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <h1 className="text-6xl md:text-7xl font-black tracking-tighter leading-[0.9] mb-8 animate-fade-in-up uppercase">
                ADMIT<span className="text-[var(--color-primary)]">GPT</span>
              </h1>

              <p className="text-lg md:text-xl text-[var(--color-muted)] leading-relaxed mb-12 max-w-2xl mx-auto animate-fade-in-up [animation-delay:100ms] font-medium">
                The world&apos;s first transparent, multiplicative admissions engine.
                Designed by students who believe mathematical truth should be free.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up [animation-delay:200ms]">
                <button
                  onClick={onStart}
                  disabled={isLoading}
                  className="btn-primary !px-12 !py-5 !text-lg !rounded-2xl w-full sm:w-auto shadow-2xl shadow-[var(--color-primary-glow)] group/btn"
                >
                  {isLoading ? (
                    <>
                      <div className="loading-spinner !w-5 !h-5 !border-2 !border-black" />
                      <span>{loadingMessage}</span>
                    </>
                  ) : (
                    <>
                      <span>Start Free Analysis</span>
                      <ArrowRight size={20} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>

                <button
                  onClick={onShowWhy}
                  className="btn-secondary !px-12 !py-5 !text-lg !rounded-2xl w-full sm:w-auto hover:border-[var(--color-primary)]/30"
                >
                  Our Philosophy
                </button>
              </div>

              <div className="mt-16 pt-8 border-t border-white/5 flex flex-wrap justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all">
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-black text-white">1,164+</span>
                  <span className="text-[10px] uppercase tracking-widest font-bold">Verified Profiles</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-black text-white">100%</span>
                  <span className="text-[10px] uppercase tracking-widest font-bold">Client-Side Logic</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-black text-white">0</span>
                  <span className="text-[10px] uppercase tracking-widest font-bold">Data Tracking</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-6 border-t border-[var(--color-border)] text-center text-xs text-[var(--color-muted)] bg-[#030307]">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2026 AdmitGPT. Built for the Transparency Movement.</p>
          <div className="flex gap-4">
            <a href="/transparency" className="hover:text-[var(--color-foreground)] transition-colors">Transparency Report</a>
            <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-[var(--color-foreground)] transition-colors flex items-center gap-1">
              <Mail size={12} /> Contact Us
            </a>
            <a href={GITHUB_URL} className="hover:text-[var(--color-foreground)] transition-colors">Source Code</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
