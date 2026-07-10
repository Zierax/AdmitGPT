// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// AdmitGPT — Cryptographic Signature Engine
// AES-256 Symmetric Encryption (Client-Side Only)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import CryptoJS from 'crypto-js';
import { CertificateSignature, OutlierClassification } from './types';

// .env access: Next.js injects NEXT_PUBLIC_ variables into the client bundle at build time.
// We access them directly without 'process' guards to allow the bundler to perform literal replacement.
const PASSCODE = process.env.NEXT_PUBLIC_PASSCODE_OF_OUTLINERS || '';
const EMAIL_HEADER = process.env.NEXT_PUBLIC_EMAIL_HEADER || 'ADMITGPT';
const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'dariangosztafio@gmail.com';
const ORIGIN_FALLBACK = process.env.NEXT_PUBLIC_SITE_ORIGIN || 'https://admitgpt.pages.dev';

// Client-side diagnostic for missing config
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development' && !PASSCODE) {
    console.warn("⚠️ AdmitGPT: Application is running in LOCAL_MODE because NEXT_PUBLIC_PASSCODE_OF_OUTLINERS is not set in .env.");
}

export function isLocalMode(): boolean {
    return !PASSCODE || PASSCODE.trim() === '' || PASSCODE === 'LOCAL';
}

export function getEmailHeader(): string {
    return EMAIL_HEADER;
}

function classificationToCode(c: OutlierClassification): number {
    switch (c) {
        case 'STANDARD': return 0;
        case 'NON_CONFORMIST_VISIONARY': return 1;
        case 'STRATEGIC_ELITE_SCHOLAR': return 2;
        case 'RADICAL_IMPACT_ARCHITECT': return 3;
        case 'ABSOLUTE_INTELLIGENCE_PHENOMENON': return 4;
        default: return 0;
    }
}

function codeToClassification(code: number): OutlierClassification {
    switch (code) {
        case 1: return 'NON_CONFORMIST_VISIONARY';
        case 2: return 'STRATEGIC_ELITE_SCHOLAR';
        case 3: return 'RADICAL_IMPACT_ARCHITECT';
        case 4: return 'ABSOLUTE_INTELLIGENCE_PHENOMENON';
        default: return 'STANDARD';
    }
}

/**
 * Generate a unique UUID for the certificate
 */
function generateUUID(): string {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
        return crypto.randomUUID();
    }
    if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
        const bytes = new Uint8Array(16);
        crypto.getRandomValues(bytes);
        bytes[6] = (bytes[6] & 0x0f) | 0x40;
        bytes[8] = (bytes[8] & 0x3f) | 0x80;
        const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
        return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
    }
    throw new Error('Secure random generator unavailable');
}

/**
 * Create a minified data object and encrypt it using AES-256.
 * Returns the Base64 ciphertext string.
 */
export function generateSignature(
    spikeScore: number,
    classification: OutlierClassification,
    diversityFieldCount: number,
    showPublicDetails: boolean = true,
    studentName: string = "Anonymous"
): string {
    if (isLocalMode()) {
        return 'PREVIEW-ONLY-OFFLINE-ACCESS-TOKEN';
    }

    const localDate = new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD in local time
    const data: CertificateSignature = {
        s: Math.round(spikeScore * 10) / 10, // 1 decimal
        c: classificationToCode(classification),
        d: localDate,
        u: generateUUID(),
        f: diversityFieldCount,
        p: showPublicDetails ? 1 : 0,
        n: studentName.substring(0, 20)
    };

    const jsonStr = JSON.stringify(data);
    const encrypted = CryptoJS.AES.encrypt(jsonStr, PASSCODE).toString();
    return encrypted;
}

/**
 * Decrypt the signature and return the original certificate data.
 * Returns null if decryption fails.
 */
export function verifySignature(encryptedCode: string): CertificateSignature | null {
    if (!encryptedCode || isLocalMode() || encryptedCode.includes('PREVIEW-ONLY')) {
        return null;
    }

    try {
        const bytes = CryptoJS.AES.decrypt(encryptedCode, PASSCODE);
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);
        if (!decrypted) return null;

        const data = JSON.parse(decrypted) as CertificateSignature;
        return data;
    } catch {
        return null;
    }
}

/**
 * Get a human-readable classification name from a code
 */
export function getClassificationName(code: number): string {
    const classification = codeToClassification(code);
    switch (classification) {
        case 'NON_CONFORMIST_VISIONARY': return 'Non-Conformist Visionary';
        case 'STRATEGIC_ELITE_SCHOLAR': return 'Strategic Elite Scholar';
        case 'RADICAL_IMPACT_ARCHITECT': return 'Radical Impact Architect';
        case 'ABSOLUTE_INTELLIGENCE_PHENOMENON': return 'Absolute Intelligence Phenomenon';
        default: return 'Standard Profile';
    }
}

/**
 * Generate the verification URL for the QR code
 */
export function getVerificationURL(encryptedCode: string): string {
    const base = typeof window !== 'undefined' ? window.location.origin : ORIGIN_FALLBACK;
    return `${base}/verify?code=${encodeURIComponent(encryptedCode)}`;
}

/**
 * Build the mailto link for the personal invitation
 */
export function buildInvitationMailto(
    name: string,
    email: string,
    profileLinks: string,
    spikeScore: number,
): string {
    const recipient = CONTACT_EMAIL;
    const subject = encodeURIComponent(`AdmitGPT Audit | ${name} | Spike: ${spikeScore.toFixed(1)}`);
    const body = encodeURIComponent(
        `Outlier Invitation\n` +
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Score: ${spikeScore.toFixed(1)}\n\n` +
        `Links: ${profileLinks}\n\n` +
        `Sent via AdmitGPT`
    );
    return `mailto:${recipient}?subject=${subject}&body=${body}`;
}

/**
 * Build the mailto link for vulnerability reporting
 */
export function buildVulnerabilityReportMailto(
    description: string,
): string {
    return `mailto:${CONTACT_EMAIL}`;
}
