/**
 * Search-friendly pinyin: "zhēn shí" → "zhenshi", "lǜ" → "lv".
 * Lets a search for "zhenshi" or "zhen shi" find the word without tone marks.
 */
export function plainPinyin(pinyin: string): string {
  return (
    pinyin
      .toLowerCase()
      // Decompose first: "ǜ" is one precomposed character, not "ü" + a tone.
      .normalize("NFD")
      .replace(/ü/g, "v")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z]/g, "")
  );
}

export function syllableCount(pinyin: string): number {
  return pinyin.split(/[\s/]+/).filter(Boolean).length;
}
