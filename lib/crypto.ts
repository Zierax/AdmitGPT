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
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
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
    const base = typeof window !== 'undefined' ? window.location.origin : 'https://admitgpt.io';
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
    const header = getEmailHeader();
    const recipient = "dariangosztafio@gmail.com";
    const subject = encodeURIComponent(`${header} | ${name} | Spike: ${spikeScore.toFixed(1)}`);
    const body = encodeURIComponent(
        `Outlier Invitation Accepted\n` +
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Score: ${spikeScore.toFixed(1)}\n\n` +
        `Links: ${profileLinks}\n\n` +
        `Sent via AdmitGPT v1.0`
    );
    return `mailto:${recipient}?subject=${subject}&body=${body}`;
}

/**
 * Build the mailto link for vulnerability reporting
 */
export function buildVulnerabilityReportMailto(
    description: string,
): string {
    const subject = encodeURIComponent('AdmitGPT Logic Vulnerability Report');
    const body = encodeURIComponent(
        `Logic Vulnerability Report\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
        `Description:\n${description}\n\n` +
        `Reported at: ${new Date().toISOString()}\n` +
        `Source: AdmitGPT In-App Vulnerability Reporter`
    );
    return `mailto:dariangosztafio@gmail.com?subject=${subject}&body=${body}`;
}
