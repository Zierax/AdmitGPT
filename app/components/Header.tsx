"use client";

import Image from "next/image";
import { useState } from "react";
import { Eye, Github, ChevronDown, X, Shield, Users, Zap, ExternalLink, Mail, AlertTriangle, Instagram } from "lucide-react";

interface HeaderProps {
  onBack?: () => void;
  showBack?: boolean;
  onDownloadPDF?: () => void;
  showDownloadPDF?: boolean;
}

export default function Header({ onBack, showBack, onDownloadPDF, showDownloadPDF }: HeaderProps) {
  const [isWhyOpen, setIsWhyOpen] = useState(false);

  return (
    <>
      <nav className="flex items-center justify-between px-6 md:px-10 py-5 border-b border-white/5 sticky top-0 z-50 bg-black/40 backdrop-blur-3xl shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
        <div className="flex items-center gap-4 md:gap-8">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.location.href = "/"}>
            <div className="relative w-8 h-8 md:w-9 md:h-9 rounded-xl overflow-hidden border border-white/10 group-hover:border-[var(--color-primary)]/40 transition-colors shadow-2xl">
              <Image
                src="/assets/AdmitGPT.png"
                alt="AdmitGPT Logo"
                fill
                className="object-cover"
              />
            </div>
            <span className="font-black text-lg md:text-xl tracking-tighter uppercase">ADMIT<span className="text-[var(--color-primary)]">GPT</span></span>
          </div>
          
          <button 
            onClick={() => setIsWhyOpen(!isWhyOpen)}
            className={`text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2 ${isWhyOpen ? 'text-[var(--color-primary)] glow-text' : 'text-[var(--color-muted)] hover:text-white'}`}
          >
            Philosophy <ChevronDown size={14} className={`transition-transform duration-500 ${isWhyOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>

        <div className="flex items-center gap-3 md:gap-6">
          <div className="hidden sm:flex items-center gap-6 mr-2">
            {showBack && (
              <button onClick={onBack} className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-muted)] hover:text-white transition-colors">
                Modify Profile
              </button>
            )}
            
            <a href="/transparency" className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors flex items-center gap-2">
              <Eye size={14} /> Transparency
            </a>
          </div>

          {showDownloadPDF && (
            <button onClick={onDownloadPDF} className="btn-primary !py-2 !px-4 !text-[10px] !rounded-xl shadow-lg shadow-[var(--color-primary-glow)]">
              Full Audit
            </button>
          )}

          <div className="flex items-center gap-4 border-l border-white/10 pl-6">
            <a
              href="https://github.com/Zierax/AdmitGPT"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-muted)] hover:text-white transition-colors"
            >
              <Github size={20} />
            </a>
            <a
              href="https://instagram.com/z14d.d"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-muted)] hover:text-white transition-colors"
            >
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </nav>

      {/* Expanded "Why" Section / Manifesto */}
      {isWhyOpen && (
        <div className="border-b border-[var(--color-border)] bg-[var(--color-card)] animate-fade-in-up relative overflow-hidden">
          {/* Decorative Background Pattern */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(var(--color-primary) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          </div>

          <div className="max-w-6xl mx-auto px-6 py-12 md:py-16 relative z-10">
            <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-start">
              {/* Profile Side */}
              <div className="md:col-span-4 space-y-6">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[var(--color-primary)] to-transparent opacity-25 blur transition duration-1000 group-hover:opacity-50"></div>
                  <div className="relative aspect-[4/5] w-full border border-[var(--color-border)] bg-black overflow-hidden">
                    <Image
                      src="/assets/Ziad_Salah_Photo.jpg"
                      alt="Ziad Salah"
                      fill
                      className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                      <p className="font-sans font-bold text-white text-lg">ZIAD SALAH</p>
                      <p className="text-[10px] text-[var(--color-muted)] font-mono tracking-widest uppercase">Creator // Student</p>
                    </div>
                  </div>
                </div>
                <div className="glass-card p-6 border-[var(--color-primary-glow)]">
                  <div className="flex items-center gap-2 text-[var(--color-primary)] mb-4">
                    <Shield size={18} />
                    <span className="font-bold tracking-tight text-base">Verified Student</span>
                  </div>
                  <p className="text-xl font-bold leading-tight text-white mb-2">
                    &quot;I am like you students.&quot;
                  </p>
                  <p className="text-sm text-[var(--color-muted)] leading-relaxed italic">
                    I built this because I faced the same black box you&apos;re facing now. I wanted to build the tool I wish I had—honest, mathematical, and free.
                  </p>
                </div>
              </div>

              {/* Manifesto Side */}
              <div className="md:col-span-8 space-y-8 md:space-y-10">
                <div className="space-y-4">
                  <div className="inline-block px-3 py-1 border border-[var(--color-primary)] text-[var(--color-primary)] font-mono text-[10px] tracking-widest uppercase mb-4">
                    The Transparency Manifesto
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black font-sans tracking-tighter leading-none text-white">
                    NO BLACK BOXES.<br />
                    <span className="text-[var(--color-primary)] glow-text">ZERO SECRETS.</span>
                  </h2>
                </div>

                <div className="grid sm:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <p className="text-base md:text-lg text-white font-medium leading-relaxed">
                      Mathematics should never be a secret sold for thousands.
                    </p>
                    <p className="text-xs md:text-sm text-[var(--color-muted)] leading-relaxed">
                      While consultants sell &quot;insider magic&quot;, AdmitGPT provides calculated reality. My logic is open-source and runs entirely in your browser. No data collection, no hidden formulas.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <p className="text-base md:text-lg text-white font-medium leading-relaxed">
                      A systematic strike against information inequality.
                    </p>
                    <p className="text-xs md:text-sm text-[var(--color-muted)] leading-relaxed">
                      The admissions industry thrives on fear and ambiguity. By making the math transparent, we return the power to the students. This is about leveling the playing field for everyone.
                    </p>
                  </div>
                </div>

                <div className="pt-8 border-t border-white/10 grid sm:grid-cols-2 gap-8 md:gap-12">
                  <div className="space-y-4">
                    <p className="text-[10px] md:text-xs text-[var(--color-muted)] leading-relaxed">
                      Built for transparency, designed by students.
                    </p>
                  </div>
                  <div className="space-y-4 flex flex-col justify-end">
                    <div className="flex items-center gap-4 text-[var(--color-muted)] mb-2">
                       <div className="flex items-center gap-3">
                        <a href="https://github.com/Zierax/AdmitGPT" className="hover:text-[var(--color-primary)] transition-colors"><Github size={22} /></a>
                        <a href="https://instagram.com/z14d.d" className="hover:text-[var(--color-primary)] transition-colors"><Instagram size={22} /></a>
                       </div>
                      <div className="h-px flex-1 bg-[var(--color-border)]"></div>
                      <span className="font-mono text-[9px] uppercase tracking-widest opacity-40">Built for you</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
