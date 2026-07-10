// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// AdmitGPT — Site configuration
// Centralized, env-driven public site constants.
// NEXT_PUBLIC_* vars are inlined by Next.js at build time.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const CONTACT_EMAIL =
    process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'zs.01117875692@gmail.com';

export const GITHUB_URL =
    process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/Zierax/AdmitGPT';

export const INSTAGRAM_URL =
    process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://instagram.com/z14d.d';

export const SITE_ORIGIN =
    process.env.NEXT_PUBLIC_SITE_ORIGIN || 'https://admitgpt.pages.dev';
