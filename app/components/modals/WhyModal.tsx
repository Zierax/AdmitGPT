"use client";

import Image from "next/image";
import { X } from "lucide-react";

export function WhyModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[var(--color-background)] bg-opacity-90 backdrop-blur-md animate-fade-in shadow-[inset_0_0_100px_rgba(191,255,0,0.1)]">
      <div className="glass-card max-w-4xl w-full p-0 relative animate-scale-in border border-[var(--color-primary)] overflow-hidden">
        <button onClick={onClose} className="absolute top-6 right-6 z-50 text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors">
          <X size={24} />
        </button>

        <div className="grid md:grid-cols-2">
          {/* Photo Section */}
          <div className="relative aspect-[4/5] md:aspect-auto h-full bg-black border-r border-[var(--color-primary)] border-opacity-30 min-h-[400px]">
            <Image
              src="/assets/Ziad_Salah_Photo.jpg"
              alt="Ziad Salah"
              fill
              className="object-cover grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
            <div className="absolute bottom-8 left-8 right-8">
              <p className="font-sans text-[var(--color-primary)] font-black text-3xl tracking-tighter uppercase">Ziad Salah</p>
              <div className="h-0.5 w-12 bg-[var(--color-primary)] mt-2 mb-4" />
              <p className="text-sm font-sans text-white tracking-widest uppercase opacity-80 font-bold">Student / Creator</p>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-10 space-y-8 bg-[var(--color-card)] relative">
            {/* Scanned paper effect header */}
            <div className="space-y-2">
              <span className="font-sans text-[var(--color-primary)] text-[10px] tracking-widest uppercase font-bold">Our Philosophy</span>
              <h2 className="text-4xl font-black text-white tracking-tighter leading-none italic uppercase underline decoration-[var(--color-primary)] decoration-4 underline-offset-4">
                Transparency over Guesswork.
              </h2>
            </div>

            <div className="space-y-6 text-sm text-[var(--color-foreground)] leading-relaxed">
              <p className="font-bold text-lg text-[var(--color-primary-light)]">
                &quot;I am like you students. I built this because I hate black boxes.&quot;
              </p>
              <p className="opacity-80">
                Growing up in an environment with zero institutional support, I realized early on that information is the ultimate gatekeeper. I saw students with immense potential being priced out of their dreams by consultants charging $500/hour for data that should be public.
              </p>
              <p className="opacity-80">
                When I developed the math engine for my own applications, I chose to make it public. Because keeping it secret would mean becoming the very gatekeeper I&apos;m trying to disrupt.
              </p>
              <div className="p-4 border-l-2 border-[var(--color-primary)] bg-[rgba(191,255,0,0.05)] font-sans text-[11px] leading-tight font-medium">
                AdmitGPT is a tool for student empowerment. It’s analysis against uncertainty. You aren&apos;t a metric; you&apos;re a student with a future. And you deserve to see the numbers.
              </div>
            </div>

            <div className="pt-4 flex justify-between items-end">
              <div className="font-sans text-[10px] text-[var(--color-muted)] uppercase tracking-widest font-bold">
                [ Verification Complete ]
              </div>
              <button
                onClick={onClose}
                className="btn-primary !px-10 !py-3 tracking-widest"
              >
                Continue.
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
