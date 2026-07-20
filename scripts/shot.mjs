import { chromium } from "playwright";

const url = process.env.URL || "http://localhost:3111/";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const errors = [];
page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
page.on("pageerror", (e) => errors.push("PAGEERR: " + e.message));
await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(1500);
await page.screenshot({ path: "/tmp/shot-desktop.png", fullPage: false });
await page.screenshot({ path: "/tmp/shot-desktop-full.png", fullPage: true });
// mobile
const m = await browser.newPage({ viewport: { width: 390, height: 844 } });
await m.goto(url, { waitUntil: "networkidle", timeout: 60000 });
await m.waitForTimeout(1200);
await m.screenshot({ path: "/tmp/shot-mobile.png", fullPage: false });
console.log("CONSOLE ERRORS:", errors.length ? errors.slice(0,10) : "none");
await browser.close();
console.log("DONE");
