import sys, json
from faster_whisper import WhisperModel
m = WhisperModel("small", device="cpu", compute_type="int8")
segs, info = m.transcribe(sys.argv[1], language="ar", word_timestamps=True, vad_filter=False)
out = []
for s in segs:
    out.append({"start": round(s.start,2), "end": round(s.end,2), "text": s.text.strip(),
                "words": [{"w": w.word.strip(), "s": round(w.start,2), "e": round(w.end,2)} for w in (s.words or [])]})
json.dump(out, open(sys.argv[2], "w"), ensure_ascii=False, indent=1)
for s in out: print(s["start"], s["end"], s["text"])
