import { chromium } from "playwright";

const url = "http://localhost:3111/";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(1000);

const data = await page.evaluate(() => {
  const out = {};
  const cs = (sel) => {
    const el = document.querySelector(sel);
    if (!el) return { missing: true };
    const r = el.getBoundingClientRect();
    const s = getComputedStyle(el);
    return {
      x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height),
      color: s.color, bg: s.backgroundColor, font: s.fontFamily.split(",")[0],
      fontSize: s.fontSize, fontWeight: s.fontWeight,
      opacity: s.opacity, mixBlend: s.mixBlendMode,
      text: (el.innerText || "").slice(0, 60).replace(/\n/g, " "),
    };
  };
  out.body = cs("body");
  out.h1 = cs("h1");
  out.lead = cs(".ag-lead");
  out.eyebrow = cs(".ag-eyebrow");
  out.mascot = cs(".ag-mascot-merge");
  out.mascotImg = cs(".ag-mascot-img");
  out.bubble = cs(".ag-bubble");
  out.ctaBtn = cs(".btn-zine");
  out.secBtn = cs(".btn-zine.secondary");
  out.nav = cs("nav");
  out.wordmark = cs(".ag-wordmark");
  out.oddsGrid = cs(".ag-odds");
  // viewport
  out.vw = window.innerWidth; out.vh = window.innerHeight;
  // scroll height
  out.docH = document.documentElement.scrollHeight;
  return out;
});

console.log(JSON.stringify(data, null, 2));

// contrast helper
function lum(rgb) {
  const m = rgb.match(/\d+/g).map(Number);
  const f = (c) => { c /= 255; return c <= 0.03928 ? c/12.92 : Math.pow((c+0.055)/1.055, 2.4); };
  return 0.2126*f(m[0]) + 0.7152*f(m[1]) + 0.0722*f(m[2]);
}
function ratio(a, b) {
  const L1 = lum(a), L2 = lum(b);
  const hi = Math.max(L1,L2), lo = Math.min(L1,L2);
  return ((hi+0.05)/(lo+0.05)).toFixed(2);
}
console.log("\nCONTRAST (text vs bg):");
console.log("h1 text/bg-page:", ratio(data.h1.color, data.body.bg));
console.log("lead text/bg-page:", ratio(data.lead.color, data.body.bg));
console.log("eyebrow(lime)/bg:", ratio(data.eyebrow.color, data.body.bg));

await browser.close();
