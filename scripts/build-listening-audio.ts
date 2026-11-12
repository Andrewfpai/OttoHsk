/**
 * Records the listening papers: every line of every recording, the spoken
 * intro of each Part 2 and 3 item ("第9到12题是根据下面一段话："), and its
 * spoken questions. Women's lines are read by Xiaoxiao, men's by Yunyang;
 * intros and questions by whichever of the two did not start the recording,
 * so the questions stand apart from the passage, as on the exam.
 *
 * Clips are named by a hash of voice and text, so only new or changed lines
 * are recorded again. Writes src/content/listening-audio.json: clip key
 * ("<item>:L<i>", "<item>:intro", "<item>:Q<n>") → public path.
 *
 *   npx tsx scripts/build-listening-audio.ts      (needs Python with edge-tts)
 */
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { listeningHsk6 } from "../src/content/listening-hsk6";
import type { ListeningSpeaker } from "../src/content/types";
import { introText } from "../src/features/listening/lib/script";

const VOICE: Record<ListeningSpeaker, string> = {
  woman: "zh-CN-XiaoxiaoNeural",
  man: "zh-CN-YunyangNeural",
};

type Job = { key: string; name: string; voice: string; text: string };

function job(key: string, voice: string, text: string): Job {
  const name = createHash("sha1").update(`${voice}|${text}`).digest("hex").slice(0, 12) + ".mp3";
  return { key, name, voice, text };
}

const jobs: Job[] = [];
for (const paper of listeningHsk6) {
  for (const item of paper.items) {
    const narrator = VOICE[item.lines[0].speaker === "man" ? "woman" : "man"];
    const intro = introText(item);
    if (intro) jobs.push(job(`${item.id}:intro`, narrator, intro));
    item.lines.forEach((line, i) => jobs.push(job(`${item.id}:L${i}`, VOICE[line.speaker], line.text)));
    if (item.part !== 1) {
      for (const q of item.questions) jobs.push(job(`${item.id}:Q${q.number}`, narrator, `${q.number}．${q.prompt}`));
    }
  }
}

const dir = mkdtempSync(join(tmpdir(), "ottohsk-tts-"));
const file = join(dir, "jobs.json");
writeFileSync(file, JSON.stringify(jobs));
const run = spawnSync("python", ["-I", "scripts/tts.py", file], { stdio: "inherit" });
if (run.status !== 0) process.exit(run.status ?? 1);

const audio = Object.fromEntries(jobs.map((j) => [j.key, `/audio/listening/${j.name}`]));
writeFileSync(new URL("../src/content/listening-audio.json", import.meta.url), JSON.stringify(audio, null, 1) + "\n");
console.log(`${jobs.length} clips for ${listeningHsk6.length} papers`);
