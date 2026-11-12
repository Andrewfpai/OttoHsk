"""
Makes speech clips with Microsoft Edge's neural voices (pip install edge-tts).
Called by scripts/build-listening-audio.ts with a JSON file of jobs,
[{name, voice, text}], and writes public/audio/listening/<name> for each one
not made yet.

edge-tts uses Microsoft's online read-aloud service: free but unofficial.
"""
import asyncio
import json
import os
import sys

import edge_tts

sys.stdout.reconfigure(encoding="utf-8")
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "public", "audio", "listening")


async def make(job):
    path = os.path.join(OUT, job["name"])
    if os.path.exists(path):
        return False
    # The service drops a request now and then; wait and try again.
    for attempt in range(6):
        try:
            await edge_tts.Communicate(job["text"], job["voice"]).save(path)
            return True
        except edge_tts.exceptions.NoAudioReceived:
            if os.path.exists(path):
                os.remove(path)
            if attempt == 5:
                raise
            await asyncio.sleep(2 * (attempt + 1))


async def main(jobs_file):
    os.makedirs(OUT, exist_ok=True)
    with open(jobs_file, encoding="utf-8") as f:
        jobs = json.load(f)
    made = 0
    for i, job in enumerate(jobs):
        if await make(job):
            made += 1
            if made % 20 == 0:
                print(f"{i + 1}/{len(jobs)}", flush=True)
    print(f"{made} new clips, {len(jobs) - made} already made")


asyncio.run(main(sys.argv[1]))
