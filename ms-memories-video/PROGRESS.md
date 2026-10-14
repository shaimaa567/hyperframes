# PROGRESS – Ms. Memories (updated 2026-10-13)

Phase: style board v2 (vertical) awaiting approval. Git commit NOT done: user interrupted the commit; pre-commit hook needs repo deps (bun install done; bun.lock got modified - restore with git checkout bun.lock).
Format: VERTICAL 9:16 1080x1920 @30fps (user request). Final ≈ 44.5 s (VO 42.45 s + ~2 s hold). Keep key content inside y 220–1500 (platform UI safe zone).
Done: reference analysed (53.9 s, 1024x576); VO intake (assets/vo/vo_v1.mp3, 42.45 s, mono 44.1k, mean -24.8 dB -> loudnorm later); engine src/stage.html + scripts/still.mjs; 4 style stills -> renders/previews/styleboard.jpg
Next step: user approves styleboard -> build all 13 scenes + master timeline + render CLI (src/render.js) + SFX/music + final mix.
Key decisions: video palette blue/white (as reference); brand accents beige + red; logo = assets/images/logo_black.png (black script, used as-is); fonts Tajawal Medium/Light only; IG handle @msmemo.om (confirm spelling); CTA = IG card.
VO segments (silencedetect, no Whisper: HF model download blocked by proxy 403) — start-end s:
1 كل يوم نعيش لحظات جديدة 0.00-2.27 | 2 ونحفظ منها صورًا كثيرة 2.65-4.59 | 3 نحتفظ فيها ونقول 5.09-6.85 | 4 بنرجع لها يومًا ما 7.26-8.59
5 سنة وراء سنة 9.15-10.44 | 6 تتغير الأماكن وتكبر الحكايات 10.82-13.52 | 7 وتصير اللحظات… ماضينا 13.94-17.24
8 غريبة كيف تمرّ السنوات… كأنها أمس 17.81-22.63 | 9 ولأن بعض اللحظات تستحق أكثر من مجرد صورة 23.13-26.91
10 في Ms. Memories نجمع لكم… تشبهكم 27.32-34.29 | 11 السنوات تمرّ… تستحق أن تبقى 34.64-38.88 | 12 Ms. Memories 39.26-40.31 | 13 Every Memory Matters 40.67-42.45
Open issues: word-level timing unavailable (segment-level only); photos are code-drawn SVG illustrations (swap for real photos if user supplies).
