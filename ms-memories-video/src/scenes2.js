// Remaining scenes + master timeline. Every frame is a pure function of t.
const BIG = "font-weight:500;color:#2B4FDB;-webkit-text-stroke:3px #2B4FDB;line-height:1.05;";
const SM = "font-weight:300;color:#7B83A1;";
const WH =
  "font-weight:500;color:#fff;-webkit-text-stroke:2px #fff;line-height:1.05;text-shadow:0 8px 40px rgba(15,40,140,.45);";
const pearl = () => $('<div class="layer pearl"></div>');
const grain = () => $('<div class="layer grain"></div>');
function put(el, p, dy = 40, bl = 14, extra = "") {
  el.style.opacity = p;
  el.style.transform = `translateY(${(1 - p) * dy}px)${extra}`;
  el.style.filter = `blur(${(1 - p) * bl}px)`;
  return el;
}
function txt(html, style, p, dy, bl, extra) {
  return put(
    $(`<div class="t" style="left:0;right:0;text-align:center;${style}">${html}</div>`),
    p,
    dy,
    bl,
    extra,
  );
}
function rawPol(kind, w) {
  const e = polaroid(kind, 0, 0, w, 0, "");
  e.style.left = "0";
  e.style.top = "0";
  e.style.transform = "";
  return e;
}

// keep: "نحتفظ فيها، ونقول: بنرجع لها يومًا ما"  (VO 5.09–8.59)
scenes.keep = (t) => {
  stage.innerHTML = "";
  stage.append(pearl());
  const d = t - 4.95;
  [
    ["mountain", 60, 130, 300, -8],
    ["city", 700, 1230, 320, 9],
    ["beach", -40, 1360, 300, 6],
  ].forEach(([k, x, y, w, r]) => {
    const e = polaroid(k, x, y + d * 22, w, r, "");
    e.style.opacity = 0.35;
    e.style.filter = "blur(6px)";
    stage.append(e);
  });
  const f = E.io(P(t, 7.0, 7.5));
  const pa = E.out(P(t, 5.05, 5.7));
  stage.append(
    txt(
      "نحتفظ فيها،",
      BIG + "top:580px;font-size:140px",
      pa * (1 - 0.78 * f),
      40,
      14,
      `translateY(${-f * 60}px)`,
    ),
    txt(
      "ونقول:",
      SM + "top:790px;font-size:66px",
      E.out(P(t, 6.3, 6.9)) * (1 - 0.78 * f),
      30,
      10,
      `translateY(${-f * 60}px)`,
    ),
    txt("بنرجع لها", BIG + "top:880px;font-size:200px", E.out(P(t, 7.2, 7.9)), 50, 16),
    txt(
      "يومًا ما",
      BIG + "top:1110px;font-size:130px;color:#6f86e6;-webkit-text-stroke-color:#6f86e6",
      E.out(P(t, 7.9, 8.5)),
      40,
      12,
    ),
  );
  const ln = $(
    '<div style="position:absolute;left:380px;top:1290px;height:6px;border-radius:6px;background:#D6322E"></div>',
  );
  ln.style.width = lerp(0, 320, E.expo(P(t, 8.2, 8.9))) + "px";
  stage.append(ln, grain());
};

// years: "سنة وراء سنة… تتغير الأماكن، وتكبر الحكايات"  (VO 9.15–13.52)
scenes.years = (t) => {
  stage.innerHTML = "";
  stage.append(pearl());
  const q = E.io(P(t, 10.7, 11.1)),
    y = Math.round(lerp(2018, 2025, E.io(P(t, 9.2, 10.7))));
  if (t < 11.2) {
    stage.append(
      txt("سنة وراء سنة", SM + "top:540px;font-size:72px", E.out(P(t, 9.1, 9.7)) * (1 - q), 30, 10),
      txt(
        String(y),
        BIG + "top:640px;font-size:360px;direction:ltr",
        E.out(P(t, 9.15, 9.7)) * (1 - q),
        50,
        16,
        `scale(${lerp(1, 1.25, q)})`,
      ),
    );
  }
  [
    ["city", 70, 1010, 420, -9, "2019", 10.95],
    ["mountain", 330, 1130, 440, 3, "2022", 11.25],
    ["beach", 590, 1000, 400, 10, "2025", 11.55],
  ].forEach(([k, x, yy, w, r, c, s], i) => {
    const pp = E.back(P(t, s, s + 0.7));
    const e = polaroid(k, x, yy + Math.sin(t * 1.3 + i) * 8, w, r, c);
    e.style.transform = `translateY(${(1 - pp) * 900}px) rotate(${r}deg)`;
    e.style.opacity = clamp(pp * 3);
    stage.append(e);
  });
  const g = E.out(P(t, 12.6, 13.3));
  stage.append(
    txt("تتغير الأماكن", SM + "top:380px;font-size:84px", E.out(P(t, 10.85, 11.4)), 30, 10),
    txt(
      `و<span style="display:inline-block;margin:0 30px;color:#D6322E;-webkit-text-stroke-color:#D6322E;transform:scale(${lerp(1, 1.3, g)})">تكبر</span> الحكايات`,
      BIG + "top:520px;font-size:120px",
      E.out(P(t, 11.9, 12.5)),
      40,
      12,
    ),
    grain(),
  );
};

// past: "وتصير اللحظات اللي عشناها جزءًا من ماضينا"  (VO 13.94–17.24)
scenes.past = (t) => {
  stage.innerHTML = "";
  stage.append($('<div class="layer sky"></div>'));
  const cl = $("<div></div>");
  cl.innerHTML = clouds(11, 10, 1350, 1960);
  cl.firstChild.style.transform = `translateX(${-(t - 13.7) * 14}px)`;
  stage.append(cl.firstChild);
  const g = E.io(P(t, 14.5, 17.0));
  [
    ["sunset", 70, 980, 330, -10, 13.95],
    ["mountain", 650, 900, 340, 8, 14.15],
    ["cake", 330, 1180, 360, -3, 14.35],
    ["balloons", 700, 1380, 300, 12, 14.55],
  ].forEach(([k, x, y, w, r, s], i) => {
    const pp = E.out(P(t, s, s + 0.8));
    const e = polaroid(k, x, y + Math.sin(t * 1.1 + i * 2) * 10 - (t - 13.7) * 10, w, r, "");
    e.style.transform = `translateY(${(1 - pp) * 700}px) rotate(${r}deg) scale(${lerp(1, 0.88, g)})`;
    e.style.opacity = pp * lerp(1, 0.8, g);
    e.style.filter = `grayscale(${g}) sepia(${g * 0.5})`;
    stage.append(e);
  });
  stage.append(
    txt(
      "وتصير اللحظات اللي عشناها",
      WH + "top:300px;font-size:62px;font-weight:300;-webkit-text-stroke:0",
      E.out(P(t, 13.95, 14.6)),
      30,
      10,
    ),
    txt("جزءًا من", WH + "top:410px;font-size:170px", E.out(P(t, 15.6, 16.2)), 40, 14),
    txt("ماضينا", WH + "top:590px;font-size:240px", E.out(P(t, 16.2, 16.9)), 50, 16),
    grain(),
  );
};

// more: "ولأن بعض اللحظات تستحق أكثر من مجرد صورة…"  (VO 23.13–26.91)
scenes.more = (t) => {
  stage.innerHTML = "";
  stage.append(pearl());
  const dim = 1 - 0.65 * E.io(P(t, 26.0, 26.6));
  stage.append(
    txt("ولأن بعض اللحظات", SM + "top:300px;font-size:66px", E.out(P(t, 23.2, 23.8)), 30, 10),
    txt("تستحق أكثر من", BIG + "top:400px;font-size:100px", E.out(P(t, 24.3, 24.9)), 40, 12),
    txt("مجرد صورة…", BIG + "top:520px;font-size:170px", E.out(P(t, 25.2, 25.9)) * dim, 50, 16),
  );
  const sl = $(
    '<div style="position:absolute;right:130px;top:640px;height:10px;border-radius:10px;background:#D6322E"></div>',
  );
  sl.style.width = lerp(0, 820, E.expo(P(t, 26.0, 26.7))) + "px";
  stage.append(sl);
  // 3D card
  const W = 520,
    H = W * 1.18,
    cx = 540,
    cy = 1130,
    L = E.io(P(t, 25.8, 26.9)),
    ap = E.out(P(t, 23.4, 24.3));
  const sh = $(
    `<div style="position:absolute;left:${cx - W / 2 + 40}px;top:${cy + H / 2 + 60}px;width:${W - 80}px;height:60px;border-radius:50%;background:rgba(30,45,110,.45);filter:blur(30px);opacity:${0.35 + 0.5 * L};transform:scale(${lerp(1, 0.8, L)})"></div>`,
  );
  stage.append(sh);
  const box = $(
    `<div style="position:absolute;left:${cx - W / 2}px;top:${cy - H / 2 + (1 - ap) * 500}px;width:${W}px;height:${H}px;transform-style:preserve-3d;opacity:${ap};transform:translateY(${-L * 60}px) rotateX(${lerp(0, 14, L)}deg) rotateY(${lerp(0, -22, L)}deg) translateZ(${lerp(0, 120, L)}px)"></div>`,
  );
  for (let i = 5; i >= 1; i--) {
    box.append(
      $(
        `<div style="position:absolute;inset:0;border-radius:10px;background:#d4d8ea;transform:translateZ(${-i * 3}px)"></div>`,
      ),
    );
  }
  box.append(rawPol("sunset", W));
  stage.append(box);
  // orbit chips
  const cp = E.out(P(t, 26.2, 26.9));
  const chips = [
    ["▶  فيديو", "#2B4FDB", "#fff", 0],
    ["2024", "#fff", "#2B4FDB", 2.1],
    ["♥", "#fff", "#D6322E", 4.2],
  ];
  chips.forEach(([tx, bg, fg, ph]) => {
    const a = t * 1.5 + ph,
      x = cx + Math.cos(a) * 400,
      y = cy - 60 + Math.sin(a) * 170,
      z = Math.sin(a);
    const c = $(
      `<div class="pill" style="left:${x - 90}px;top:${y - 40}px;padding:14px 36px;font-size:46px;background:${bg};color:${fg};box-shadow:0 18px 40px -12px rgba(20,40,120,.45);opacity:${cp};transform:scale(${(0.85 + 0.2 * z) * cp});z-index:${z > 0 ? 5 : 1}">${tx}</div>`,
    );
    stage.append(c);
  });
  stage.append(grain());
};

// album cover used in brand + stay scenes
function album(x, y, w, sc) {
  const h = w * 1.25;
  return $(`<div style="position:absolute;left:${x - w / 2}px;top:${y - h / 2}px;width:${w}px;height:${h}px;transform:scale(${sc});border-radius:18px 32px 32px 18px;background:linear-gradient(145deg,#f4e9d6,#e3d2b5);box-shadow:0 50px 90px -30px rgba(40,30,20,.5),inset 0 0 0 2px rgba(255,255,255,.6)">
    <div style="position:absolute;left:0;top:0;bottom:0;width:8%;background:#D6322E;border-radius:18px 0 0 18px"></div>
    <div style="position:absolute;inset:7% 7% 7% 14%;border:2px solid rgba(214,50,46,.35);border-radius:14px"></div>
    <img src="../assets/images/logo_black.png" style="position:absolute;left:8%;top:${-(w * 0.1)}px;width:${w * 1.04}px;mix-blend-mode:multiply"></div>`);
}

// brand: "في Ms. Memories نجمع لكم صوركم وفيديوهاتكم وأجمل تفاصيلكم… في تجربة تشبهكم"  (VO 27.32–34.29)
scenes.brand = (t) => {
  stage.innerHTML = "";
  stage.append($('<div class="layer sky"></div>'));
  const cl = $("<div></div>");
  cl.innerHTML = clouds(23, 9, 1500, 1960);
  cl.firstChild.style.transform = `translateX(${-(t - 27) * 10}px)`;
  stage.append(cl.firstChild);
  const lp = E.out(P(t, 27.4, 28.2));
  const lg = $(
    `<div class="glass" style="left:190px;top:260px;width:700px;height:240px;overflow:hidden"><img src="../assets/images/logo_black.png" style="position:absolute;left:50px;top:-109px;width:600px;mix-blend-mode:multiply"></div>`,
  );
  put(lg, lp, 40, 14);
  stage.append(lg);
  [
    ["صوركم", 28.2, 29.8, 190],
    ["فيديوهاتكم", 29.8, 31.2, 165],
    ["وأجمل تفاصيلكم", 31.2, 33.0, 140],
    ["تجربة تشبهكم", 33.0, 34.7, 150],
  ].forEach(([w, s, e, fs]) => {
    if (t < s || t > e + 0.3) return;
    stage.append(
      txt(
        w,
        WH + `top:${700 - fs * 0.3}px;font-size:${fs}px`,
        E.out(P(t, s + 0.12, s + 0.55)) * (1 - E.io(P(t, e - 0.2, e + 0.05))),
        30,
        14,
      ),
    );
  });
  const C = [540, 1180],
    A = E.io(P(t, 33.0, 33.9));
  const items = [];
  [
    ["sunset", -340, 930, 60, 930, -8, 28.3],
    ["mountain", 1140, 950, 700, 950, 9, 28.5],
    ["beach", -340, 1320, 60, 1330, 6, 28.7],
    ["balloons", 1140, 1340, 700, 1340, -7, 28.9],
  ].forEach(([k, fx, fy, tx, ty, r, s]) => {
    const e = polaroid(k, 0, 0, 300, r, "");
    items.push([e, fx, fy, tx, ty, r, s, 300, 354]);
  });
  [
    ["city", -360, 1150, 40, 1120, -4, 29.95],
    ["night", 1140, 1150, 740, 1130, 4, 30.15],
    ["garden", 380, 1900, 380, 1560, 0, 30.35],
  ].forEach(([k, fx, fy, tx, ty, r, s]) => {
    const e = $(
      `<div class="pol" style="width:300px;height:210px;padding:0;border-radius:22px;overflow:hidden"><div style="width:100%;height:100%">${art(k)}</div><div style="position:absolute;left:50%;top:50%;width:80px;height:80px;margin:-40px;border-radius:50%;background:rgba(255,255,255,.85);display:flex;align-items:center;justify-content:center;font-size:36px;color:#2B4FDB">▶</div></div>`,
    );
    items.push([e, fx, fy, tx, ty, r, s, 300, 210]);
  });
  [
    ["تواريخ", -300, 880, 90, 880, 31.3],
    ["أسماء", 1200, 880, 720, 880, 31.45],
    ["ضحكات", -300, 1520, 80, 1500, 31.6],
    ["لحظات", 1200, 1500, 660, 1500, 31.75],
  ].forEach(([w, fx, fy, tx, ty, s]) => {
    const e = $(
      `<div class="pill" style="padding:14px 40px;font-size:50px;background:rgba(255,255,255,.85);color:#2B4FDB;box-shadow:0 18px 40px -12px rgba(20,40,120,.4)">${w}</div>`,
    );
    items.push([e, fx, fy, tx, ty, 0, s, 200, 80]);
  });
  items.forEach(([e, fx, fy, tx, ty, r, s, w, h]) => {
    const p = E.out(P(t, s, s + 0.9));
    let x = lerp(fx, tx, p),
      y = lerp(fy, ty, p);
    x = lerp(x, C[0] - w / 2, A);
    y = lerp(y, C[1] - h / 2, A);
    e.style.left = x + "px";
    e.style.top = y + "px";
    e.style.transform = `rotate(${r * (1 - A)}deg) scale(${lerp(1, 0.25, A)})`;
    e.style.opacity = 1 - clamp((A - 0.6) / 0.4);
    if (p > 0) stage.append(e);
  });
  const ab = E.back(P(t, 33.4, 34.2));
  if (t > 33.3) {
    const al = album(C[0], C[1], 420, lerp(0.5, 1, ab));
    al.style.opacity = clamp(ab * 2);
    stage.append(al);
  }
  stage.append(grain());
};

// stay: "السنوات تمرّ… لكن ذكرياتكم تستحق أن تبقى"  (VO 34.64–38.88)
scenes.stay = (t) => {
  stage.innerHTML = "";
  stage.append(pearl());
  const xs = [120, 820, 430, 900, 60, 610, 300, 740];
  xs.forEach((x, i) => {
    const y = ((((1900 - (t * 110 + i * 260)) % 2100) + 2100) % 2100) - 100;
    stage.append(
      $(
        `<div class="t" style="left:${x}px;top:${y}px;font-weight:500;font-size:96px;direction:ltr;color:rgba(43,79,219,.09)">${2019 + i}</div>`,
      ),
    );
  });
  stage.append(
    txt("السنوات تمرّ…", SM + "top:480px;font-size:92px", E.out(P(t, 34.7, 35.4)), 30, 10),
    txt(
      "لكن ذكرياتكم",
      BIG + "top:700px;font-size:90px;-webkit-text-stroke-width:2px",
      E.out(P(t, 36.5, 37.1)),
      30,
      10,
    ),
    txt("تستحق", BIG + "top:830px;font-size:200px", E.out(P(t, 37.4, 38.0)), 50, 16),
    txt(
      'أن <span style="color:#D6322E;-webkit-text-stroke-color:#D6322E">تبقى</span>',
      BIG + "top:1030px;font-size:200px",
      E.out(P(t, 37.9, 38.5)),
      50,
      16,
    ),
  );
  const ln = $(
    '<div style="position:absolute;left:300px;top:1260px;height:6px;border-radius:6px;background:#D6322E"></div>',
  );
  ln.style.width = lerp(0, 480, E.expo(P(t, 38.3, 38.9))) + "px";
  stage.append(ln, grain());
};

// ---------- master timeline ----------
const LIST = [
  ["open", 0],
  ["gallery", 2.55],
  ["keep", 4.95],
  ["years", 8.9],
  ["past", 13.7],
  ["night", 17.75],
  ["more", 22.95],
  ["brand", 27.25],
  ["stay", 34.5],
  ["end", 39.1],
];
const XF = 0.4;
function renderAt(t) {
  const one = window.__scene;
  root.innerHTML = "";
  LIST.forEach(([name, a], i) => {
    if (one && name !== one) return;
    const nx = i < LIST.length - 1 ? LIST[i + 1][1] : 1e9;
    if (!one && (t < a || t >= nx + XF)) return;
    const w = $('<div style="position:absolute;inset:0;overflow:hidden;perspective:1800px"></div>');
    stage = w;
    scenes[name](t);
    stage = root;
    if (!one) {
      const p = E.out(P(t, a, a + XF));
      if (i > 0) {
        w.style.opacity = p;
        w.style.filter = `blur(${(1 - p) * 18}px)`;
        w.style.transform = `scale(${lerp(1.05, 1, p)})`;
      }
    }
    root.append(w);
  });
}
window.renderAt = renderAt;
