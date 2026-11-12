import all from "./reading-tokens.json";
import type { ReadingToken } from "./types";

const tokens = all as Record<string, ReadingToken[]>;

/**
 * The pre-split texts of some content, for a page to send to the browser:
 * every key that is one of `ids` or starts with "<id>#" / "<id>-" / "<id>." /
 * "<id>:" (a listening line: "<item>:L<i>").
 * The whole file is too big to send to every page.
 */
export function tokensFor(ids: readonly string[]): Record<string, ReadingToken[]> {
  const wanted = new Set(ids);
  return Object.fromEntries(
    Object.entries(tokens).filter(([key]) => {
      const base = key.split(/[#.:]/)[0];
      return wanted.has(base) || wanted.has(base.replace(/-\d+$/, ""));
    }),
  );
}
