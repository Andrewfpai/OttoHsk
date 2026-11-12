"""
Pre-made audio for words and example sentences, with Microsoft Edge's
neural voices (the edge-tts package: pip install edge-tts). Words are read
by Xiaoxiao (female); sentences by Yunyang (male, newsreader), as the HSK
listening paper mixes a woman's and a man's voice.

Files go to public/audio/<sha1 of voice+text, 12 chars>.mp3, so a clip is
only made once and a changed sentence gets a new file. The list of what was
made is written to src/content/audio-test.json for the audio test page.

    python -I scripts/build-audio.py [count]     (default: the first 20 HSK 6 words)

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
WORD_VOICE = "zh-CN-XiaoxiaoNeural"
SENTENCE_VOICE = "zh-CN-YunyangNeural"


def clip_name(voice, text):
    return hashlib.sha1(f"{voice}|{text}".encode("utf-8")).hexdigest()[:12] + ".mp3"


async def make(voice, text, rate="+0%"):
    name = clip_name(voice, text)
    path = os.path.join(OUT, name)
    if not os.path.exists(path):
        await edge_tts.Communicate(text, voice, rate=rate).save(path)
    return f"/audio/{name}"


async def main(count):
    os.makedirs(OUT, exist_ok=True)
    with open(os.path.join(ROOT, "src", "content", "words-hsk6.json"), encoding="utf-8") as f:
        words = json.load(f)[:count]
    out = []
    for w in words:
        # A word alone reads a touch slower, so each syllable's tone is clear.
        word_src = await make(WORD_VOICE, w["hanzi"], rate="-15%")
        ex = w.get("example")
        sentence = None
        if ex:
            sentence = {"zh": ex["zh"], "en": ex["en"], "src": await make(SENTENCE_VOICE, ex["zh"])}
        out.append({"id": w["id"], "hanzi": w["hanzi"], "pinyin": w["pinyin"], "gloss": w["gloss"], "src": word_src, "sentence": sentence})
        print(w["hanzi"], word_src, sentence and sentence["src"])
    with open(os.path.join(ROOT, "src", "content", "audio-test.json"), "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=1)
        f.write("\n")
    print(f"{len(out)} words, {sum(1 for o in out if o['sentence'])} sentences")


asyncio.run(main(int(sys.argv[1]) if len(sys.argv) > 1 else 20))
