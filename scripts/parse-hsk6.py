"""
Parses the text of the Chill Chinese HSK 6 list (scripts/data/hsk6-raw.txt,
extracted with pypdf) into scripts/data/hsk6-list.json:
[{hanzi, traditional, pinyin, meaning, n}], in list order (most common first).

The hard part is where the pinyin ends and the English begins, since both are
Latin letters. A word of N characters has N syllables per reading (儿 may be
an -r on the syllable before), and readings are separated by ", ". Syllables
are matched against every valid Mandarin syllable, so "hey" or "wow" after
the pinyin are never taken for one.
"""
import json
import re
import sys
import unicodedata

INITIALS = ["", "b", "p", "m", "f", "d", "t", "n", "l", "g", "k", "h", "j", "q", "x",
            "zh", "ch", "sh", "r", "z", "c", "s", "y", "w"]
FINALS = ["a", "o", "e", "i", "u", "v", "ai", "ei", "ao", "ou", "an", "en", "ang", "eng",
          "ong", "er", "ia", "ie", "iao", "iu", "ian", "in", "iang", "ing", "iong", "ua",
          "uo", "uai", "ui", "uan", "un", "uang", "ue", "ve"]
SYLLABLES = {i + f for i in INITIALS for f in FINALS}


def plain(s: str) -> str:
    s = unicodedata.normalize("NFD", s.lower()).replace("ü", "v")
    return "".join(c for c in s if not unicodedata.combining(c))


def min_syllables(word: str):
    """
    The fewest syllables `word` (no spaces) splits into, and whether it ends
    in an erhua -r; None if it is not pinyin at all. The fewest, because
    "yuanxiao" can also be yu-an-xiao: the reading must be the natural one.
    """
    # An apostrophe is a syllable boundary (zhì'ān): count each side alone.
    parts = re.split(r"['’‘ʼ]", plain(word))
    if len(parts) > 1:
        counts = [min_syllables(part) for part in parts]
        if any(c is None or c[1] for c in counts[:-1]) or counts[-1] is None:
            return None
        return sum(c[0] for c in counts), counts[-1][1]
    p = parts[0]
    if not re.fullmatch(r"[a-z]+", p):
        return None
    best = [None] * (len(p) + 1)
    best[0] = 0
    for i in range(len(p)):
        if best[i] is None:
            continue
        for j in range(i + 1, min(len(p), i + 6) + 1):
            if p[i:j] in SYLLABLES and (best[j] is None or best[i] + 1 < best[j]):
                best[j] = best[i] + 1
    if best[len(p)] is not None:
        return best[len(p)], False
    if p.endswith("r") and best[len(p) - 1] is not None:
        return best[len(p) - 1], True
    return None


def split_syllables(word: str, want: int) -> bool:
    found = min_syllables(word)
    return found is not None and found[0] == want


def parse_entry(simp: str, rest: str):
    n = len(simp)
    targets = {n, n - 1} if simp.endswith("儿") else {n}
    tokens = rest.split(" ")
    readings = []
    i = 0
    while i < len(tokens):
        # One reading may be written with spaces: "wú néng wéi lì".
        found = None
        for k in range(1, n + 2):
            if i + k > len(tokens):
                break
            chunk = tokens[i:i + k]
            last = chunk[-1].rstrip(",")
            joined = "".join(chunk[:-1] + [last])
            if any(split_syllables(joined, t) for t in targets):
                found = k
                break
        if found is None:
            break
        chunk = tokens[i:i + found]
        reading = " ".join(chunk).rstrip(",")
        readings.append(reading)
        i += found
        if not chunk[-1].endswith(","):
            break
    if not readings:
        return None
    return ", ".join(readings), " ".join(tokens[i:]).strip()


def main():
    lines = open("scripts/data/hsk6-raw.txt", encoding="utf-8").read().splitlines()
    han = re.compile(r"^(\S+) (\S+) (.*)$")

    def is_han(t: str) -> bool:
        return re.fullmatch(r"[一-鿿]+", t) is not None

    # Join each entry with the lines that wrap after it first: the pinyin
    # itself can wrap ("tōnghuò / péngzhàng").
    raw = []
    for line in lines:
        line = line.strip()
        if (not line or line.startswith("Simplified Traditional") or line.startswith("Page ")
                or "chill-chinese.com" in line or line in ("HSK 6 Vocabulary List",
                "Find all HSK words", "with example sentences and audio")):
            continue
        m = han.match(line)
        if m and is_han(m.group(1)) and is_han(m.group(2)):
            raw.append([m.group(1), m.group(2), m.group(3)])
        elif raw:
            raw[-1][2] += " " + line

    entries, problems = [], []
    for simp, trad, rest in raw:
        parsed = parse_entry(simp, rest)
        if parsed is None or not parsed[1]:
            problems.append(f"{simp} {rest}")
            continue
        entries.append({"hanzi": simp, "traditional": trad, "pinyin": parsed[0], "meaning": parsed[1]})

    # The same simplified word twice (哄 hǒng and 鬨 hòng): one entry, both readings.
    merged = {}
    for e in entries:
        if e["hanzi"] in merged:
            m = merged[e["hanzi"]]
            if e["pinyin"] not in m["pinyin"]:
                m["pinyin"] += ", " + e["pinyin"]
            continue
        merged[e["hanzi"]] = e
    out = list(merged.values())
    for n, e in enumerate(out, 1):
        e["n"] = n
    json.dump(out, open("scripts/data/hsk6-list.json", "w", encoding="utf-8"), ensure_ascii=False, indent=0)
    sys.stdout.reconfigure(encoding="utf-8")
    print(len(entries), "rows,", len(out), "words")
    for p in problems:
        print("PROBLEM:", p)


if __name__ == "__main__":
    main()
