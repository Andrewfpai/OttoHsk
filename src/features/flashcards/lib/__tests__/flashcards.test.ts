import { describe, expect, it } from "vitest";

import { bankHsk5 as bank, wordsHsk5 as words } from "@/content/words-hsk5";
import { seededRng } from "@/lib/random";

import { buildDeck } from "../deck";
import { afterTest, failAt, isLocked, isPass, lockDurationMs, MAX_LOCK_MS } from "../lockout";
import { isRightAnswer } from "../grade";
import { areSynonyms } from "../synonyms";
import { type ChoiceQuestion, type Question, blankedSentence, buildQuestions, pinyinMatches } from "../questions";
import { KNOWN_STRENGTH, gapFor, nextSchedule, statusOf } from "../schedule";

const NOW = new Date("2026-10-10T08:00:00Z");
const MIN = 60_000;

describe("schedule", () => {
  const SLOW = 4000; // a considered answer, not a quick guess

  it("calls a word known after 3 right answers in a row: 0 → 1 → 2 → 3", () => {
    let strength: number | null = null;
    let test = 1;
    for (let i = 0; i < KNOWN_STRENGTH; i++) {
      expect(statusOf(strength)).not.toBe("known");
      const next = nextSchedule(strength, true, test, i === 0 ? 900 : SLOW);
      strength = next.strength;
      test = next.dueTest;
    }
    expect(strength).toBe(3);
    expect(statusOf(strength)).toBe("known");
    // Right in test 1, back in 4 (+3), then 9 (+5); known, and away 20 tests.
    expect(test).toBe(1 + 3 + 5 + 20);
  });

  it("brings a first right answer back three tests later, not two", () => {
    expect(nextSchedule(null, true, 1, 900)).toEqual({ strength: 1, dueTest: 4 });
    expect(nextSchedule(0, true, 7, SLOW)).toEqual({ strength: 1, dueTest: 10 });
  });

  it("fast-tracks a new word right on its first try: counts as two right, one more makes it known", () => {
    expect(nextSchedule(null, true, 1, SLOW)).toEqual({ strength: 2, dueTest: 6 });
    expect(nextSchedule(2, true, 6, SLOW)).toEqual({ strength: 3, dueTest: 26 });
    expect(statusOf(3)).toBe("known");
  });

  it("brings any wrong answer back in the very next test, 2 strength lower", () => {
    expect(nextSchedule(4, false, 10, SLOW)).toEqual({ strength: 2, dueTest: 11 });
    expect(nextSchedule(1, false, 10, SLOW)).toEqual({ strength: 0, dueTest: 11 });
    expect(nextSchedule(null, false, 1, SLOW)).toEqual({ strength: 0, dueTest: 2 });
  });

  it("forgives a slip on a strong word: one right answer after it and it is known again", () => {
    const slip = nextSchedule(5, false, 40, SLOW); // known word, misclicked in test 40
    expect(slip).toEqual({ strength: 3, dueTest: 41 });
    expect(statusOf(slip.strength)).toBe("known");
    expect(nextSchedule(slip.strength, true, 41, SLOW)).toEqual({ strength: 4, dueTest: 81 });
  });

  it("spaces strength 0–6 as 1, 3, 5, 20, 40, 60, 90 tests, capped at 6", () => {
    expect([0, 1, 2, 3, 4, 5, 6, 9].map(gapFor)).toEqual([1, 3, 5, 20, 40, 60, 90, 90]);
    expect(nextSchedule(6, true, 100, SLOW)).toEqual({ strength: 6, dueTest: 190 });
  });

  it("says new only for words never tested, and known from strength 3", () => {
    expect(statusOf(null)).toBe("new");
    expect(statusOf(0)).toBe("learning");
    expect(statusOf(2)).toBe("learning");
    expect(statusOf(3)).toBe("known");
  });
});

describe("lockout", () => {
  it("fails only when more than 60% are wrong", () => {
    expect(isPass(8, 20)).toBe(true); // 60% wrong exactly
    expect(isPass(7, 20)).toBe(false); // 65% wrong
    expect(isPass(0, 0)).toBe(false);
  });

  it("names the exact wrong count that fails, matching isPass for every size", () => {
    expect([10, 20, 30].map(failAt)).toEqual([7, 13, 19]);
    for (let total = 1; total <= 50; total++) {
      const n = failAt(total);
      expect(isPass(total - (n - 1), total), `${n - 1} wrong of ${total}`).toBe(true);
      expect(isPass(total - n, total), `${n} wrong of ${total}`).toBe(false);
    }
  });

  it("doubles from 1 minute and caps at 1 hour", () => {
    expect([0, 1, 2, 3, 4, 5].map(lockDurationMs)).toEqual([1, 2, 4, 8, 16, 32].map((m) => m * MIN));
    expect(lockDurationMs(6)).toBe(MAX_LOCK_MS);
    expect(MAX_LOCK_MS).toBe(60 * MIN);
    expect(lockDurationMs(30)).toBe(MAX_LOCK_MS);
  });

  it("escalates on consecutive failures and resets on a pass", () => {
    let s = afterTest({ level: 0, lockedUntil: null }, false, NOW);
    expect(s.level).toBe(1);
    expect(s.lockedUntil!.getTime() - NOW.getTime()).toBe(MIN);

    s = afterTest(s, false, NOW);
    expect(s.lockedUntil!.getTime() - NOW.getTime()).toBe(2 * MIN);

    expect(afterTest(s, true, NOW)).toEqual({ level: 0, lockedUntil: null });
  });

  it("is locked strictly before lockedUntil", () => {
    const until = new Date(NOW.getTime() + MIN);
    expect(isLocked(until, NOW)).toBe(true);
    expect(isLocked(until, until)).toBe(false);
    expect(isLocked(null, NOW)).toBe(false);
  });
});

describe("deck", () => {
  it("fills an empty history with the most common new words", () => {
    const deck = buildDeck(words, [], 1, 10);
    expect(deck.newCount).toBe(10);
    expect(deck.words.map((w) => w.id)).toEqual(words.slice(0, 10).map((w) => w.id));
  });

  it("puts overdue words weakest first, and skips words not yet due", () => {
    const progress = [
      { wordId: words[5].id, strength: 2, dueTest: 4 },
      { wordId: words[6].id, strength: 1, dueTest: 9 },
      { wordId: words[7].id, strength: 0, dueTest: 3 },
      { wordId: words[8].id, strength: 3, dueTest: 4 },
    ];
    const deck = buildDeck(words, progress, 5, 10);
    expect(deck.words.slice(0, 3).map((w) => w.id)).toEqual([words[7].id, words[5].id, words[8].id]);
    expect(deck.words.some((w) => w.id === words[6].id)).toBe(false);
    expect(deck.reviewCount).toBe(3);
  });

  it("brings last test's misses back ahead of an older backlog", () => {
    // 30 old overdue words at strength 0, then a miss from test 9 (due in 10).
    const backlog = words.slice(0, 30).map((w) => ({ wordId: w.id, strength: 0, dueTest: 2 }));
    const missed = { wordId: words[40].id, strength: 2, dueTest: 10 };
    const deck = buildDeck(words, [...backlog, missed], 10, 10);
    expect(deck.words[0].id).toBe(words[40].id);
  });

  it("never leaves nothing to study once every word has been seen", () => {
    const progress = words.map((w, i) => ({ wordId: w.id, strength: 6, dueTest: 100 + i }));
    const deck = buildDeck(words, progress, 50, 10);
    expect(deck.words.map((w) => w.id)).toEqual(words.slice(0, 10).map((w) => w.id));
  });

  it("caps reviews at 70% while new words remain", () => {
    const progress = words.slice(0, 50).map((w) => ({ wordId: w.id, strength: 0, dueTest: 1 }));
    const deck = buildDeck(words, progress, 2, 10);
    expect(deck.reviewCount).toBe(7);
    expect(deck.newCount).toBe(3);
  });
});

describe("questions", () => {
  const deck = words.slice(0, 40);
  const questions = buildQuestions(deck, bank, seededRng(42));
  const choices = (qs: Question[]) => qs.filter((q): q is ChoiceQuestion => q.kind !== "pinyin");

  it("asks about every word once; choice questions have 4 distinct options including the answer", () => {
    expect(questions.map((q) => q.wordId).sort()).toEqual(deck.map((w) => w.id).sort());
    for (const q of choices(questions)) {
      expect(q.options).toHaveLength(4);
      expect(new Set(q.options).size).toBe(4);
      expect(q.options).toContain(q.wordId);
    }
  });

  it("mixes the four kinds evenly", () => {
    const count = (k: string) => questions.filter((q) => q.kind === k).length;
    expect([count("meaning"), count("hanzi"), count("sentence"), count("pinyin")]).toEqual([10, 10, 10, 10]);
  });

  const all = buildQuestions(words, bank, seededRng(7));
  const byId = new Map(words.map((w) => [w.id, w]));
  const senses = (gloss: string) => gloss.split(/[;,](?![^(]*\))/).map((x) => x.trim());

  it("never offers two options that share a meaning", () => {
    for (const q of choices(all)) {
      const opts = q.options.map((id) => byId.get(id)!);
      for (let i = 0; i < opts.length; i++) {
        for (let j = i + 1; j < opts.length; j++) {
          const a = senses(opts[i].gloss);
          expect(senses(opts[j].gloss).some((m) => a.includes(m))).toBe(false);
        }
      }
    }
  });

  it("never offers two words that are true synonyms (立即 / 立刻)", () => {
    for (const q of choices(all)) {
      for (let i = 0; i < q.options.length; i++) {
        for (let j = i + 1; j < q.options.length; j++) {
          expect(areSynonyms(q.options[i], q.options[j]), `${q.options[i]} / ${q.options[j]}`).toBe(false);
        }
      }
    }
  });

  it("blanks the word out of its example sentence, and offers no option that contains the answer", () => {
    for (const q of choices(all).filter((x) => x.kind === "sentence")) {
      const w = byId.get(q.wordId)!;
      const blanked = blankedSentence(w);
      expect(blanked, w.id).toContain("＿＿");
      expect(blanked, w.id).not.toContain(w.hanzi);
      for (const id of q.options) {
        if (id !== w.id) expect(w.hanzi.includes(id) || id.includes(w.hanzi), `${w.id}: ${id}`).toBe(false);
      }
    }
  });

  it("gives about four in five choice questions look-alike options", () => {
    const qs = choices(all);
    const hard = qs.filter((q) => q.difficulty === "hard").length / qs.length;
    expect(hard).toBeGreaterThan(0.7);
    expect(hard).toBeLessThan(0.9);
  });

  it("uses look-alikes such as a shared character", () => {
    const q = choices(buildQuestions([byId.get("农村")!], bank, seededRng(1)))[0];
    const shared = (id: string) => id !== "农村" && [...id].some((c) => "农村".includes(c));
    expect(q.difficulty).toBe("hard");
    expect(q.options.filter(shared).length).toBeGreaterThanOrEqual(2);
  });
});

describe("typed pinyin", () => {
  it("ignores tones, spaces, apostrophes, tone numbers and case", () => {
    expect(pinyinMatches("biaoxian", "biǎoxiàn")).toBe(true);
    expect(pinyinMatches(" Biao xian ", "biǎoxiàn")).toBe(true);
    expect(pinyinMatches("biao3xian4", "biǎoxiàn")).toBe(true);
    expect(pinyinMatches("fangan", "fāng'àn")).toBe(true);
    expect(pinyinMatches("ouzhou", "Ōuzhōu")).toBe(true);
  });

  it("takes ü as ü, v or u", () => {
    for (const t of ["lüshi", "lvshi", "lushi"]) expect(pinyinMatches(t, "lǜshī")).toBe(true);
  });

  it("needs every syllable: knowing one character is not enough", () => {
    expect(pinyinMatches("biao", "biǎoxiàn")).toBe(false);
    expect(pinyinMatches("biaoxiang", "biǎoxiàn")).toBe(false);
    expect(pinyinMatches("", "biǎoxiàn")).toBe(false);
  });

  it("is graded on the server the same way", () => {
    expect(isRightAnswer({ wordId: "表现", typed: "biaoxian", ms: 3000 }, bank.getWord)).toBe(true);
    expect(isRightAnswer({ wordId: "表现", typed: "biaoxin", ms: 3000 }, bank.getWord)).toBe(false);
    expect(isRightAnswer({ wordId: "表现", chosenId: "表现", ms: 3000 }, bank.getWord)).toBe(true);
    expect(isRightAnswer({ wordId: "表现", chosenId: "表达", ms: 3000 }, bank.getWord)).toBe(false);
  });
});
