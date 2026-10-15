/**
 * A learner's results. The study material itself (words, confusables,
 * ordering items, cloze passages) is static content in `src/content/` and is never
 * stored here — rows reference it by its stable id.
 */
import { sql } from "drizzle-orm";
import {
  boolean,
  check,
  date,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  primaryKey,
  smallint,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { users } from "./auth";

const userId = () =>
  text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" });

/** The HSK level a row belongs to: 5 or 6. Existing rows are all HSK 5. */
const level = () => smallint("level").notNull().default(5);

/**
 * One row per word the learner has been tested on. No row means "not started".
 * Scheduling is counted in tests, not days; the rules live in
 * `features/flashcards/lib/schedule.ts`.
 */
export const wordProgress = pgTable(
  "word_progress",
  {
    userId: userId(),
    /** The word's simplified hanzi — its id in `content/words.json`. */
    wordId: text("word_id").notNull(),
    /** 0–6: +1 per right answer, −2 per wrong one. 5+ is "known". */
    strength: smallint("strength").notNull(),
    /** The test number from which the word may be asked again. */
    dueTest: integer("due_test").notNull(),
    correctCount: integer("correct_count").notNull().default(0),
    wrongCount: integer("wrong_count").notNull().default(0),
    lastAnsweredAt: timestamp("last_answered_at", { mode: "date", withTimezone: true }).notNull(),
  },
  (t) => [
    primaryKey({ columns: [t.userId, t.wordId] }),
    index("word_progress_due_idx").on(t.userId, t.dueTest),
    check("word_progress_strength_range", sql`${t.strength} between 0 and 6`),
  ],
);

/**
 * Per-learner flashcard state for one HSK level: how many tests they have
 * taken (the clock the schedule runs on) and the lockout. One row per learner
 * and level, created on their first test at that level. Lockout rules in
 * `features/flashcards/lib/lockout.ts`.
 */
export const flashcardState = pgTable(
  "flashcard_state",
  {
    userId: userId(),
    level: level(),
    testsTaken: integer("tests_taken").notNull().default(0),
    /** Consecutive failed tests; sets the next lock's length. Reset by a pass. */
    lockLevel: smallint("lock_level").notNull().default(0),
    lockedUntil: timestamp("locked_until", { mode: "date", withTimezone: true }),
  },
  (t) => [
    primaryKey({ columns: [t.userId, t.level] }),
    check("flashcard_state_lock_level_nonnegative", sql`${t.lockLevel} >= 0`),
    check("flashcard_state_tests_nonnegative", sql`${t.testsTaken} >= 0`),
  ],
);

export const flashcardTests = pgTable(
  "flashcard_tests",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: userId(),
    level: level(),
    takenAt: timestamp("taken_at", { mode: "date", withTimezone: true }).notNull().defaultNow(),
    /** 1 for the learner's first test. */
    testNumber: integer("test_number").notNull(),
    total: smallint("total").notNull(),
    correct: smallint("correct").notNull(),
    /** Wrong answers given faster than a real attempt takes. */
    guesses: smallint("guesses").notNull(),
    passed: boolean("passed").notNull(),
    /**
     * Each word's result, in the order asked, for the test history. Null for
     * tests taken before it was recorded. Shape: `TestAnswerRecord[]` in
     * features/flashcards/lib/history.ts.
     */
    answers: jsonb("answers"),
  },
  (t) => [
    index("flashcard_tests_user_idx").on(t.userId, t.takenAt),
    check("flashcard_tests_counts", sql`${t.correct} between 0 and ${t.total}`),
  ],
);

/**
 * A full mock paper. HSK 5: correct answers per section (L /45, R /45,
 * W Part 1 /8). HSK 6: L /50, R /50, and the 缩写 essay's score /100.
 */
export const mockTests = pgTable(
  "mock_tests",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: userId(),
    level: level(),
    takenOn: date("taken_on", { mode: "string" }).notNull(),
    label: text("label"),
    listening: smallint("listening").notNull(),
    reading: smallint("reading").notNull(),
    /** HSK 5: Writing Part 1 (sentence ordering). HSK 6: the essay's score. */
    writing: smallint("writing").notNull(),
    createdAt: timestamp("created_at", { mode: "date", withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index("mock_tests_user_idx").on(t.userId, t.takenOn),
    check(
      "mock_tests_scores_range",
      sql`(${t.level} = 5 and ${t.listening} between 0 and 45 and ${t.reading} between 0 and 45 and ${t.writing} between 0 and 8)
       or (${t.level} = 6 and ${t.listening} between 0 and 50 and ${t.reading} between 0 and 50 and ${t.writing} between 0 and 100)`,
    ),
  ],
);

/** "error" is HSK 6's 病句 drill (find the sentence with an error). */
export const drillKind = pgEnum("drill_kind", ["confusable", "ordering", "cloze", "error"]);

/**
 * Every answer in the confusables, ordering and fill-in (cloze) drills.
 * `item_id` is the content id, with "#n" for a question inside a set or
 * passage (for cloze, n is the exam question number, e.g. "d-2012-1-46#47").
 */
export const drillAttempts = pgTable(
  "drill_attempts",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: userId(),
    kind: drillKind("kind").notNull(),
    itemId: text("item_id").notNull(),
    correct: boolean("correct").notNull(),
    answeredAt: timestamp("answered_at", { mode: "date", withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("drill_attempts_user_kind_idx").on(t.userId, t.kind, t.answeredAt)],
);

/** "retell" is HSK 6's 缩写 (question 101). */
export const essayKind = pgEnum("essay_kind", ["q99", "q100", "retell"]);

/**
 * Writing Part 2 practice: Q99 (five given words) and Q100 (a picture,
 * described in words). `feedback` is the AI's parsed reply, shaped by
 * `features/essays/lib/feedback.ts`; `model` is the model that gave it.
 */
export const essays = pgTable(
  "essays",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: userId(),
    kind: essayKind("kind").notNull(),
    /** Q99: the five words joined by "、". Q100: the scene description. Retell: the story id. */
    prompt: text("prompt").notNull(),
    body: text("body").notNull(),
    chars: smallint("chars").notNull(),
    durationMs: integer("duration_ms").notNull(),
    score: smallint("score").notNull(),
    feedback: jsonb("feedback").notNull(),
    model: text("model").notNull(),
    createdAt: timestamp("created_at", { mode: "date", withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index("essays_user_idx").on(t.userId, t.createdAt),
    check("essays_score_range", sql`${t.score} between 0 and 100`),
  ],
);

export type WordProgress = typeof wordProgress.$inferSelect;
export type MockTest = typeof mockTests.$inferSelect;
export type DrillKind = (typeof drillKind.enumValues)[number];
