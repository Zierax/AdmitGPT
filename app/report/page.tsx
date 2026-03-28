"use client";

import { useState } from 'react';
import { buildVulnerabilityReportMailto } from '@/lib/crypto';
import { Shield, AlertTriangle, ArrowLeft, ExternalLink, Check } from 'lucide-react';
import Link from 'next/link';

export default function ReportPage() {
    const [description, setDescription] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = () => {
        if (!description.trim()) {
            alert('Please describe the vulnerability before submitting.');
            return;
        }
        const mailto = buildVulnerabilityReportMailto(description);
        window.location.href = mailto;
        setSubmitted(true);
    };

    return (
        <div className="min-h-screen bg-[#05050a] flex flex-col">
            {/* Header */}
            <header className="px-6 py-4 border-b border-[#1f1f1f] flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 text-[#6b7280] hover:text-white transition-colors">
                    <ArrowLeft size={16} />
                    <span className="font-mono text-sm">Back to AdmitGPT</span>
                </Link>
                <div className="flex items-center gap-2">
                    <Shield size={16} className="text-[#BFFF00]" />
                    <span className="font-mono text-xs text-[#BFFF00] uppercase tracking-widest">Vulnerability Report</span>
                </div>
            </header>

            {/* Content */}
            <main className="flex-1 flex items-center justify-center p-6">
                <div className="max-w-xl w-full">
                    {submitted ? (
                        <div className="bg-[rgba(10,10,15,0.9)] border border-[#10b981] p-8 text-center animate-fade-in-up">
                            <Check size={48} className="text-[#10b981] mx-auto mb-4" />
                            <h1 className="text-2xl font-black font-mono text-white mb-4">
                                Report Prepared
                            </h1>
                            <p className="text-[#6b7280] text-sm mb-6">
                                Your email client should have opened with the report. If it didn&apos;t, please copy the description and email it manually to <strong className="text-[#BFFF00]">dariangosztafio@gmail.com</strong>.
                            </p>
                            <button
                                onClick={() => { setSubmitted(false); setDescription(''); }}
                                className="px-6 py-3 bg-[#BFFF00] text-black font-mono font-bold text-sm uppercase tracking-wider hover:scale-105 transition-transform"
                            >
                                Submit Another Report
                            </button>
                        </div>
                    ) : (
                        <div className="bg-[rgba(10,10,15,0.9)] border border-[#1f1f1f] p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <AlertTriangle size={24} className="text-[#f59e0b]" />
                                <div>
                                    <h1 className="text-xl font-black font-mono text-white">
                                        Report a Logic Vulnerability
                                    </h1>
                                    <p className="text-[10px] text-[#6b7280] font-mono uppercase tracking-widest mt-1">
                                        Free • No Login Required • No Data Stored
                                    </p>
                                </div>
                            </div>

                            <div className="p-4 border-l-2 border-[#BFFF00] bg-[rgba(191,255,0,0.05)] mb-6">
                                <p className="text-xs text-[#e8e8f0]">
                                    If you found a broken formula, a logic flaw, or a mathematical inconsistency in AdmitGPT&apos;s engine, please report it here. 
                                    This opens your email client with the report pre-filled. <strong className="text-[#BFFF00]">No data is stored, no login is needed, no tracking occurs.</strong>
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-white mb-2">
                                        Vulnerability Description
                                    </label>
                                    <textarea
                                        className="w-full p-4 bg-[rgba(10,10,15,0.8)] border border-[#1f1f1f] text-[#e8e8f0] font-mono text-sm min-h-[200px] resize-none outline-none focus:border-[#BFFF00] transition-colors"
                                        placeholder="Describe the logic vulnerability you found...&#10;&#10;For example:&#10;- Which formula or section is affected?&#10;- What input produces the incorrect output?&#10;- What did you expect vs. what you got?"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>

                                <button
                                    onClick={handleSubmit}
                                    disabled={!description.trim()}
                                    className="w-full py-4 bg-[#BFFF00] text-black font-mono font-bold text-sm uppercase tracking-wider hover:scale-[1.02] transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    <ExternalLink size={16} />
                                    Open Email with Report
                                </button>

                                <p className="text-[10px] text-[#6b7280] font-mono text-center uppercase tracking-wider">
                                    This uses your default email client • dariangosztafio@gmail.com
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* Footer */}
            <footer className="px-6 py-4 border-t border-[#1f1f1f] text-center">
                <p className="text-[10px] text-[#6b7280] font-mono uppercase tracking-widest">
                    Built for the Transparency Movement • Every formula is public • Zero tracking
                </p>
            </footer>
        </div>
    );
}
