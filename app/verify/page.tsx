"use client";

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { verifySignature, getClassificationName, isLocalMode } from '@/lib/crypto';
import { CertificateSignature } from '@/lib/types';
import { Shield, AlertTriangle, CheckCircle2 } from 'lucide-react';

function VerifyContent() {
    const searchParams = useSearchParams();
    const code = searchParams.get('code');
    const [result, setResult] = useState<CertificateSignature | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!code) {
            setError('No verification code provided.');
            setLoading(false);
            return;
        }

        if (isLocalMode()) {
            setError('LOCAL MODE — Encryption is disabled. No verification available.');
            setLoading(false);
            return;
        }

        if (code === 'LOCAL_MODE_NO_ENCRYPTION') {
            setError('This certificate was generated in LOCAL mode without encryption.');
            setLoading(false);
            return;
        }

        const decoded = verifySignature(decodeURIComponent(code));
        if (decoded) {
            setResult(decoded);
        } else {
            setError('Invalid or corrupted verification code. The signature could not be authenticated.');
        }
        setLoading(false);
    }, [code]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#05050a]">
                <div className="text-center">
                    <div className="loading-spinner mx-auto mb-4 w-12 h-12 border-4 border-[#1f1f1f] border-t-[#BFFF00] rounded-full animate-spin" />
                    <p className="text-[#6b7280] font-mono text-sm">Decrypting signature...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#05050a] p-6">
                <div className="max-w-md w-full bg-[rgba(10,10,15,0.9)] border border-[#ef4444] p-8 text-center">
                    <AlertTriangle size={48} className="text-[#ef4444] mx-auto mb-4" />
                    <h1 className="text-2xl font-black font-mono text-[#ef4444] mb-4">VERIFICATION FAILED</h1>
                    <p className="text-[#6b7280] text-sm mb-6">{error}</p>
                    <a href="/" className="inline-block px-6 py-3 bg-[#BFFF00] text-black font-mono font-bold text-sm uppercase tracking-wider hover:scale-105 transition-transform">
                        Return to AdmitGPT
                    </a>
                </div>
            </div>
        );
    }

    if (!result) return null;

    const classificationName = getClassificationName(result.c);
    const isOutlier = result.c > 0;

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#05050a] p-6">
            <div className="max-w-lg w-full bg-[rgba(10,10,15,0.9)] border border-[#BFFF00] p-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <Shield size={48} className="text-[#BFFF00] mx-auto mb-4" />
                    <h1 className="text-2xl font-black font-mono text-white mb-2">
                        SIGNATURE VERIFIED
                    </h1>
                    <div className="flex items-center justify-center gap-2 text-[#10b981]">
                        <CheckCircle2 size={16} />
                        <span className="font-mono text-xs uppercase tracking-widest">Authenticated by AdmitGPT Engine</span>
                    </div>
                </div>

                {/* Verified Stats */}
                <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center p-4 border border-[#1f1f1f] bg-[rgba(191,255,0,0.05)]">
                        <span className="text-[#6b7280] font-mono text-xs uppercase tracking-wider">Candidate Name</span>
                        <span className="text-sm font-bold font-mono text-white">
                            {result.p === 1 ? (result.n || 'Anonymous Student') : 'Redacted for Privacy'}
                        </span>
                    </div>

                    <div className="flex justify-between items-center p-4 border border-[#1f1f1f] bg-[rgba(191,255,0,0.02)]">
                        <span className="text-[#6b7280] font-mono text-xs uppercase tracking-wider">Spike Score</span>
                        <span className="text-2xl font-black font-mono text-[#BFFF00]">{result.s}</span>
                    </div>

                    <div className="flex justify-between items-center p-4 border border-[#1f1f1f]">
                        <span className="text-[#6b7280] font-mono text-xs uppercase tracking-wider">Classification</span>
                        <span className={`font-bold font-mono text-sm ${isOutlier ? 'text-[#BFFF00]' : 'text-white'}`}>
                            {classificationName}
                        </span>
                    </div>

                    <div className="flex justify-between items-center p-4 border border-[#1f1f1f]">
                        <span className="text-[#6b7280] font-mono text-xs uppercase tracking-wider">Diversity Fields</span>
                        <span className="text-white font-mono font-bold">{result.f}</span>
                    </div>

                    <div className="flex justify-between items-center p-4 border border-[#1f1f1f]">
                        <span className="text-[#6b7280] font-mono text-xs uppercase tracking-wider">Date Issued</span>
                        <span className="text-white font-mono text-sm">{result.d}</span>
                    </div>

                    <div className="flex justify-between items-center p-4 border border-[#1f1f1f]">
                        <span className="text-[#6b7280] font-mono text-xs uppercase tracking-wider">Certificate ID</span>
                        <span className="text-[#6b7280] font-mono text-[10px]">{result.u}</span>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center border-t border-[#1f1f1f] pt-6">
                    <p className="text-[10px] text-[#6b7280] font-mono uppercase tracking-widest mb-4">
                        AES-256 Encrypted • Client-Side Only • Zero Data Stored
                    </p>
                    <a href="/" className="inline-block px-6 py-3 bg-[#BFFF00] text-black font-mono font-bold text-sm uppercase tracking-wider hover:scale-105 transition-transform">
                        Visit AdmitGPT
                    </a>
                </div>
            </div>
        </div>
    );
}

export default function VerifyPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-[#05050a]">
                <div className="loading-spinner mx-auto w-12 h-12 border-4 border-[#1f1f1f] border-t-[#BFFF00] rounded-full animate-spin" />
            </div>
        }>
            <VerifyContent />
        </Suspense>
    );
}
