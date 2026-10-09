/**
 * Sample data for the dev-only preview pages. Never imported by real routes.
 */
import { words } from "@/content/words";
import type { Dashboard } from "@/features/dashboard/server/queries";
import type { ItemStat } from "@/features/drills/lib/stats";
import type { EssayRow } from "@/features/essays/server/queries";
import type { FlashcardInfo, ProgressRow, TestSummary } from "@/features/flashcards/server/queries";
import type { MockRow } from "@/features/mocks/server/queries";

const DAY = 86_400_000;

export function sampleData() {
  const now = Date.now();
  const testsTaken = 12;
  const progress: ProgressRow[] = words.slice(0, 80).map((w, i) => ({
    wordId: w.id,
    strength: i % 7,
    // Every fourth word is due in the next test.
    dueTest: i % 4 === 0 ? testsTaken : testsTaken + 1 + (i % 9),
  }));
  const info: FlashcardInfo = { testsTaken, nextTest: testsTaken + 1, lockLevel: 0, lockedUntil: null };
  const lockedInfo: FlashcardInfo = { ...info, lockLevel: 2, lockedUntil: now + 3 * 60_000 };
  const recentTests: TestSummary[] = [
    { id: "t1", takenAt: now - DAY, testNumber: 12, total: 20, correct: 15, guesses: 0, passed: true },
    { id: "t2", takenAt: now - 2 * DAY, testNumber: 11, total: 20, correct: 6, guesses: 4, passed: false },
  ];
  const mocks: MockRow[] = [
    { id: "00000000-0000-4000-8000-000000000001", takenOn: "2026-09-20", label: "H51001", listening: 24, reading: 21, writing: 4 },
    { id: "00000000-0000-4000-8000-000000000002", takenOn: "2026-09-28", label: "H51002", listening: 28, reading: 25, writing: 5 },
    { id: "00000000-0000-4000-8000-000000000003", takenOn: "2026-10-06", label: null, listening: 30, reading: 24, writing: 6 },
  ];
  const stats: Record<string, ItemStat> = {
    "ord-001": { attempts: 1, correct: 0, lastCorrect: false },
    "ord-002": { attempts: 2, correct: 2, lastCorrect: true },
  };
  const dashboard: Dashboard = {
    daysLeft: 28,
    words: { known: 32, learning: 48, new: words.length - 80 },
    newPerDay: Math.ceil((words.length - 80) / 28),
    due: 20,
    lockedUntil: null,
    drills: {
      confusable: { total: 177, tried: 30, mastered: 22 },
      ordering: { total: 60, tried: 12, mastered: 9 },
      grammar: { total: 90, tried: 20, mastered: 14 },
    },
    latestMock: mocks[2],
  };
  const essays: EssayRow[] = [
    {
      id: "e1",
      kind: "q99",
      prompt: "坚持、成果、交流、显然、至今",
      body: "我学习汉语至今已经三年了。我每天坚持练习，也常常和中国朋友交流。显然，这些努力有了成果，我的汉语水平提高很多了。",
      chars: 58,
      score: 68,
      model: "gpt-6-sol",
      createdAt: now - DAY,
      feedback: {
        score: 68,
        summary: "All five words are used and the passage is coherent, but it is short. Add one or two sentences to reach about 80 characters.",
        wordUse: [
          { word: "坚持", ok: true, note: "Correct: 坚持 + verb." },
          { word: "成果", ok: true, note: "" },
          { word: "交流", ok: true, note: "" },
          { word: "显然", ok: true, note: "Good as a sentence opener." },
          { word: "至今", ok: true, note: "" },
        ],
        corrections: [
          { original: "提高很多了", corrected: "提高了很多", why: "了 goes straight after the verb when a quantity follows." },
        ],
        corrected: "我学习汉语至今已经三年了。我每天坚持练习，也常常和中国朋友交流。显然，这些努力有了成果，我的汉语水平提高了很多。",
        modelAnswer: "我学习汉语至今已经三年了。刚开始时我觉得很难，但我一直坚持每天练习，还经常和中国朋友交流。显然，这些努力取得了成果：现在我不但能看懂中文新闻，而且能用汉语表达自己的想法。",
        tips: ["Aim for 80 characters: add an example or a result.", "Link sentences with 不但……而且 or 因此."],
      },
    },
  ];
  return { essays, progress, info, lockedInfo, recentTests, mocks, stats, dashboard, seed: 1234, today: "2026-10-10" };
}
