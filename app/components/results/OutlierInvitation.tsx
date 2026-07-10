"use client";

import { useState } from "react";
import { OutlierClassification } from "@/lib/types";
import { getOutlierTheme } from "@/lib/engine";
import { Heart, Check, Shield, Lock } from "lucide-react";

export function OutlierInvitation({ spikeScore, classification }: { spikeScore: number; classification: OutlierClassification }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profileLinks, setProfileLinks] = useState('');
  const [message, setMessage] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const themeInfo = getOutlierTheme(classification);

  const handleAccept = async () => {
    if (!name.trim() || !message.trim()) {
      setError('Name and message are required.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email: email || 'N/A',
          message,
          links: profileLinks,
          score: spikeScore,
          classification: classification,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to submit message.');
      }

      setAccepted(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="personal-invitation" className="glass-card p-8 animate-fade-in-up border-l-4 border-l-[var(--color-accent)] scroll-mt-8 shadow-2xl relative">
      <div className="flex items-center gap-3 mb-4">
        <Heart size={24} className="text-[var(--color-accent)]" />
        <h3 className="text-xl font-black font-sans text-white tracking-tight">Private Invitation</h3>
      </div>

      {themeInfo.message && (
        <div className="p-4 mb-6 border-l-2 border-[var(--color-primary)] bg-[rgba(191,255,0,0.05)]">
          <p className="text-xs text-[var(--color-muted)] font-sans uppercase tracking-widest mb-2 font-bold">
            Classification: {classification.replace(/_/g, ' ')}
          </p>
          <p className="text-sm text-[var(--color-foreground)] leading-relaxed italic">
            &quot;{themeInfo.message}&quot;
          </p>
        </div>
      )}

      <div className="p-5 bg-[rgba(255,255,255,0.03)] border border-[var(--color-border)] mb-6">
        <p className="text-sm text-[var(--color-foreground)] leading-relaxed mb-4">
          So you seem to have great achievements and skills. I want to know you personally and hear your story by my own ears — with no systems and calculations.
          If you agree, you can accept by writing your message and links below.
        </p>
        <p className="text-[10px] text-[var(--color-muted)] font-sans uppercase tracking-widest font-bold">
          — Ziad Salah, Creator of AdmitGPT
        </p>
      </div>

      {accepted ? (
        <div className="space-y-4">
          <div className="text-center p-6 border border-[var(--color-success)] bg-[rgba(16,185,129,0.05)] rounded-lg">
            <Check size={32} className="text-[var(--color-success)] mx-auto mb-2" />
            <p className="text-sm font-bold text-[var(--color-success)] uppercase tracking-widest">Message Securely Sent</p>
            <p className="text-xs text-[var(--color-muted)] mt-2">Your data was saved locally on the private server. It has not been sent via external email providers.</p>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <input
            type="text"
            className="input-field"
            placeholder="Your Full Name *"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            className="input-field"
            placeholder="Your Email Address (Optional)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            className="input-field"
            placeholder="Profile Links (LinkedIn, GitHub, Portfolio, etc.)"
            value={profileLinks}
            onChange={(e) => setProfileLinks(e.target.value)}
          />
          <textarea
            className="input-field min-h-[120px] resize-none"
            placeholder="Introduce yourself, your story, your vision... *"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          {error && <p className="text-[11px] text-[var(--color-danger)] font-bold">{error}</p>}

          <button
            onClick={handleAccept}
            disabled={!name.trim() || !message.trim() || isSubmitting}
            className="btn-primary w-full !bg-white !text-black !border-white hover:!bg-[var(--color-primary)] disabled:opacity-30 transition-all font-bold"
          >
            {isSubmitting ? 'Transmitting Data...' : <><Shield size={16} /> Submit Securely</>}
          </button>

          <div className="flex items-center justify-center gap-2 text-[10px] text-[var(--color-muted)] font-sans uppercase tracking-wider font-bold mt-2">
            <Lock size={10} /> 100% Private Database — No Third Parties
          </div>
        </div>
      )}
    </div>
  );
}
