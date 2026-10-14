// usage: node scripts/still.mjs <scene> <t> <out.png>
import { chromium } from "playwright-core";
import { fileURLToPath } from "node:url";
import path from "node:path";
const [scene, t, out] = process.argv.slice(2);
const html = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../src/stage.html");
const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome", args: ["--no-sandbox"] });
const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
p.on("pageerror", (e) => console.error("PAGEERR", e.message));
await p.goto("file://" + html);
await p.evaluate(async (s) => { window.__scene = s; await document.fonts.ready; await document.fonts.load('500 40px Tajawal'); await document.fonts.load('300 40px Tajawal'); }, scene);
await p.evaluate((tt) => window.renderAt(tt), parseFloat(t));
await p.waitForTimeout(150);
await p.screenshot({ path: out });
await b.close();
