# OttoHSK — project rules

HSK 5 prep. See `README.md` for setup and how each feature works. Same stack
as OttoLabs (Next.js 16, Drizzle, Neon, Auth.js) — read the relevant guide in
`node_modules/next/dist/docs/` before writing Next.js code.

## Non-negotiables

1. **Study content is static; results are not.** Words, confusables,
   ordering items and grammar live in `src/content/`. The database only holds
   results, keyed by content id. Never change a published id.
2. **Every Server Action calls `requireUser()` itself.** They are reachable
   by direct POST, so a protected layout is not protection.
3. **The flashcard lockout is enforced on the server** (`submitTest`), not
   just hidden in the UI. It locks the test only — never practice.
4. **Only `features/*/server/` imports `db`.**
5. **Read the clock in the server query layer**, not in a component body
   (React's purity rule). Client countdowns use `useNow()`.
6. **Drill queues are fixed at mount from a server-chosen seed**, so server
   and client render the same order and a stats refresh never reshuffles a
   drill in progress.

## UI

- Orange (`cta`) is reserved for Start (practice, test) and nothing else.
- Green and red mean right and wrong answers; do not use them decoratively.
- Seal red (`seal`) is the brand mark only.
- Hanzi get `.font-hanzi`. Numbers that update in place get `.font-numeric`.
- Icon-only buttons need `aria-label`; clickable elements need `cursor-pointer`.

## Verification

`npm run typecheck && npm run lint && npm run test` before calling anything done.
