// usage: node src/render.js --from 0 --to 44.5 --fps 30 --scale 1 --out cache/frames [--workers 4] [--start-index N]
// Every frame depends only on t (renderAt(t)), so previews equal finals, just smaller.
import { chromium } from "playwright-core";
import { fileURLToPath } from "node:url";
import fs from "node:fs";
import path from "node:path";
const a = Object.fromEntries(
  process.argv
    .slice(2)
    .reduce((r, v, i, arr) => (v.startsWith("--") ? [...r, [v.slice(2), arr[i + 1]]] : r), []),
);
const from = +(a.from ?? 0),
  to = +(a.to ?? 44.5),
  fps = +(a.fps ?? 30),
  scale = +(a.scale ?? 1),
  workers = +(a.workers ?? 4);
const out = path.resolve(a.out ?? "cache/frames");
fs.mkdirSync(out, { recursive: true });
const html = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "stage.html");
const total = Math.round((to - from) * fps);
let next = 0;
const b = await chromium.launch({
  executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
  args: ["--no-sandbox"],
});
async function worker() {
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: scale });
  p.on("pageerror", (e) => console.error("PAGEERR", e.message));
  await p.goto("file://" + html);
  await p.evaluate(async () => {
    await document.fonts.load("500 40px Tajawal");
    await document.fonts.load("300 40px Tajawal");
    await document.fonts.ready;
  });
  for (;;) {
    const i = next++;
    if (i >= total) break;
    const t = from + i / fps;
    await p.evaluate(async (tt) => {
      window.renderAt(tt);
      await Promise.all([...document.images].map((im) => im.decode().catch(() => {})));
    }, t);
    const name = a["by-time"] ? `t_${t.toFixed(2).padStart(6, "0")}` : String(i).padStart(5, "0");
    await p.screenshot({ path: path.join(out, name + ".jpg"), type: "jpeg", quality: 92 });
  }
  await p.close();
}
await Promise.all(Array.from({ length: workers }, worker));
await b.close();
console.log("rendered", total, "frames ->", out);
