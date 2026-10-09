# OttoHSK

HSK 5 (HSK 2.0, computer-based) prep for the exam on **7 November 2026**. A
sibling to OttoLabs: same stack, separate site, linked both ways.

| Page | What it does |
|---|---|
| Dashboard | Days left, words known / learning / not started, new words per day needed, due reviews, drill progress, latest mock |
| Words → Word list | All 1,298 HSK 2.0 level-5 words. Search by 汉字, toneless pinyin or English; filter by status |
| Words → Flashcards | Timed practice → test → spaced repetition, with a lockout for guessing (below) |
| Confusables | 45 near-synonym sets, 177 fill-the-blank questions (Reading Part 1 style) |
| Sentence order | 60 Writing Part 1 items with an explanation of each word-order rule |
| Essays | Q99 (five words) and Q100 (a described picture): 15-min timer, character count, word-use check, AI feedback naming the model that answered |
| Grammar | 45 HSK 5 patterns, each with examples and 2 quiz questions |
| Mock tests | Log correct answers per section (L /45, R /45, W Part 1 /8) and see the trend |

## Flashcards

1. **Practice** against a timer (15 s per card). The test unlocks once every
   card is flipped, or starts by itself when time runs out.
2. **Test**: multiple choice, mixing hanzi → meaning, meaning → hanzi and
   hanzi → pinyin. Wrong answers under 1.5 s count as guesses.
3. **Scheduling** (`features/flashcards/lib/schedule.ts`), counted in tests,
   not days. Every word stays in rotation; each has a strength 0–6.
   Right → +1 and further out; wrong → −2 and back in the very next test, so
   a slip on a strong word costs a little, not everything.

   | Strength | 0 | 1 | 2 | 3 | 4 | 5 (known) | 6 |
   |---|---|---|---|---|---|---|---|
   | Back after (tests) | 1 | 2 | 4 | 8 | 15 | 30 | 60 |

4. **Lockout** (`features/flashcards/lib/lockout.ts`): more than 60% wrong
   locks the *test* for 1 min, doubling per consecutive failure up to 1 h.
   A pass resets it. Practice always stays open. Enforced on the server.

## Essays and AI feedback

`features/essays/`. The checks that need no AI (timer, character count,
which of the five words appear) run as you type. "Get feedback" sends the
essay to an OpenAI-compatible endpoint, trying `AI_MODELS` in order: an HTTP
error, a timeout (55 s) or an unreadable reply moves on to the next model.
The feedback says which model answered and which failed. Each person can run
30 checks a day (`DAILY_ESSAY_LIMIT`), since each is a paid call.

## Content

`src/content/` is static and ships with the app; only results go in the
database, keyed by content id. **Never change a published id.**

- `words.json` is built by `npm run words:build` from
  [complete-hsk-vocabulary](https://github.com/drkameleon/complete-hsk-vocabulary)
  (MIT); definitions are CC-CEDICT (CC BY-SA 4.0).
- `confusables.ts`, `ordering.ts`, `grammar.ts` are hand-written. Tests in
  `src/content/__tests__` check their structure (one blank, answer among the
  options, unique ids), not the Chinese — a native-speaker read is worthwhile.

## Setup

### 1. Database (Neon)

Create a **new** Neon project (or a separate database). Do not reuse the
OttoLabs database: both apps have `users`, `accounts` and `sessions` tables.
Paste the pooled connection string into `.env.local` as `DATABASE_URL`, then:

```bash
npm run db:push
```

### 2. Google sign-in

Reuse the OttoLabs OAuth client. In Google Cloud Console → Credentials → that
client, add these authorized redirect URIs:

- `http://localhost:3100/api/auth/callback/google`
- `https://<your-ottohsk-domain>/api/auth/callback/google`

Copy its ID and secret into `AUTH_GOOGLE_ID` and `AUTH_GOOGLE_SECRET`.

### 3. Who can sign in

`ALLOWED_EMAILS`: comma-separated Google addresses (you and your friend).
Nobody else gets in. Each person has separate progress.

### 4. Run

```bash
npm run dev
```

Opens on <http://localhost:3100> (3000 is OttoLabs).

Without a database or login, `/zz-preview/<view>` shows every page with sample
data in development (`dashboard`, `words`, `flashcards`, `flashcards-locked`,
`confusables`, `ordering`, `essays`, `grammar`, `mocks`). It 404s in production.

## Deploy (Vercel)

1. Push this repo to GitHub and import it in Vercel.
2. Set environment variables: `DATABASE_URL`, `AUTH_SECRET` (`npx auth secret`),
   `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`, `ALLOWED_EMAILS`,
   `NEXT_PUBLIC_OTTOLABS_URL`, `AI_API_KEY` (and optionally `AI_MODELS`).
3. Add the production redirect URI to the Google client (step 2 above).
4. In the OttoLabs Vercel project, set `NEXT_PUBLIC_OTTOHSK_URL` to this
   site's URL and redeploy, so OttoLabs links here.

## Verification

```bash
npm run typecheck && npm run lint && npm run test
```
