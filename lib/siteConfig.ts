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

export const LINKEDIN_URL =
    process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://www.linkedin.com/in/z14d';

export const WIKIDATA_URL =
    process.env.NEXT_PUBLIC_WIKIDATA_URL || 'https://www.wikidata.org/wiki/Q140676440';

export const SITE_ORIGIN =
    process.env.NEXT_PUBLIC_SITE_ORIGIN || 'https://admitgpt.pages.dev';

// All verifiable brand/author profiles, used for schema.org sameAs so AI
// search engines can corroborate the AdmitGPT entity across the web.
export const BRAND_PROFILES = [
  GITHUB_URL,
  INSTAGRAM_URL,
  LINKEDIN_URL,
  WIKIDATA_URL,
];
