/**
 * Builds src/content/quiz-hsk5.json and quiz-hsk6.json: one test-only
 * sentence per word, for the flashcard test's sentence questions. It is
 * never the example shown on the practice card, so the test checks the word,
 * not memory of a sentence. Sources: scripts/data/quiz-batches/out-*.json.
 *
 *   node scripts/build-quiz.mjs
 */
import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";

const dir = new URL("./data/quiz-batches/", import.meta.url);
for (const level of ["hsk5", "hsk6"]) {
  const merged = {};
  for (const name of readdirSync(dir).filter((n) => n.startsWith(`out-${level}-`)).sort()) {
    Object.assign(merged, JSON.parse(readFileSync(new URL(name, dir), "utf8")));
  }
  const out = new URL(`../src/content/quiz-${level}.json`, import.meta.url);
  if (!existsSync(out) || Object.keys(merged).length > 0) {
    writeFileSync(out, JSON.stringify(merged) + "\n");
  }
  console.log(`${level}: ${Object.keys(merged).length} test sentences`);
}
