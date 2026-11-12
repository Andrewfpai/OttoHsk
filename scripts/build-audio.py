"""
Pre-made audio for words and example sentences, with Microsoft Edge's
neural voices (the edge-tts package: pip install edge-tts), in several
voices and speeds so they can be compared on the audio test page.

Files go to public/audio/<sha1 of voice+rate+text, 12 chars>.mp3, so a clip
is only made once and a changed sentence gets a new file. What was made is
listed in src/content/audio-test.json.

    python -I scripts/build-audio.py [count]     (default: the first 8 HSK 6 words)

edge-tts uses Microsoft's online read-aloud service. It is free but
unofficial; if it stops working, the browser voice still works.
"""
import asyncio
import hashlib
import json
import os
import sys

import edge_tts

sys.stdout.reconfigure(encoding="utf-8")

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "public", "audio")

# Standard Mandarin voices, plus one Taiwan-accented voice for comparison.
VOICES = {
    "xiaoxiao": ("zh-CN-XiaoxiaoNeural", "Xiaoxiao", "female · warm"),
    "xiaoyi": ("zh-CN-XiaoyiNeural", "Xiaoyi", "female · bright"),
    "yunyang": ("zh-CN-YunyangNeural", "Yunyang", "male · newsreader"),
    "yunxi": ("zh-CN-YunxiNeural", "Yunxi", "male · young"),
    "yunjian": ("zh-CN-YunjianNeural", "Yunjian", "male · deep"),
    "hsiaochen": ("zh-TW-HsiaoChenNeural", "HsiaoChen", "female · Taiwan accent"),
}
# Read-aloud speed: the service slows the reading itself, with natural pauses.
SPEEDS = {"normal": "+0%", "slower": "-20%", "slowest": "-35%"}


def clip_name(voice, rate, text):
    return hashlib.sha1(f"{voice}|{rate}|{text}".encode("utf-8")).hexdigest()[:12] + ".mp3"


async def make(voice, rate, text):
    name = clip_name(voice, rate, text)
    path = os.path.join(OUT, name)
    if not os.path.exists(path):
        # The service drops a request now and then; wait and try again.
        for attempt in range(5):
            try:
                await edge_tts.Communicate(text, voice, rate=rate).save(path)
                break
            except edge_tts.exceptions.NoAudioReceived:
                if os.path.exists(path):
                    os.remove(path)
                if attempt == 4:
                    raise
                await asyncio.sleep(2 * (attempt + 1))
    return f"/audio/{name}"


async def clips(text):
    """Every voice at every speed: {voice key: {speed key: src}}."""
    out = {}
    for key, (voice, _, _) in VOICES.items():
        out[key] = {}
        for speed, rate in SPEEDS.items():
            out[key][speed] = await make(voice, rate, text)
    return out


async def main(count):
    os.makedirs(OUT, exist_ok=True)
    with open(os.path.join(ROOT, "src", "content", "words-hsk6.json"), encoding="utf-8") as f:
        words = json.load(f)[:count]
    out = []
    for w in words:
        ex = w.get("example")
        out.append({
            "id": w["id"],
            "hanzi": w["hanzi"],
            "pinyin": w["pinyin"],
            "gloss": w["gloss"],
            "clips": await clips(w["hanzi"]),
            "sentence": {"zh": ex["zh"], "en": ex["en"], "clips": await clips(ex["zh"])} if ex else None,
        })
        print(w["hanzi"], "done")
    data = {
        "voices": [{"key": k, "name": n, "note": note} for k, (_, n, note) in VOICES.items()],
        "speeds": list(SPEEDS),
        "words": out,
    }
    with open(os.path.join(ROOT, "src", "content", "audio-test.json"), "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=1)
        f.write("\n")
    print(f"{len(out)} words × {len(VOICES)} voices × {len(SPEEDS)} speeds")


asyncio.run(main(int(sys.argv[1]) if len(sys.argv) > 1 else 8))
