/**
 * Own words: words starred while reading that no word list has. Their id is
 * "+<hanzi>", which never collides with a list word's id.
 */
export const OWN_PREFIX = "+";

export type OwnWord = { id: string; hanzi: string; pinyin: string; gloss: string };

export function isOwnWord(id: string): boolean {
  return id.startsWith(OWN_PREFIX);
}
