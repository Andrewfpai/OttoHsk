"""
Parses the learner's New HSK (HSK 3.0) Level 5 and Level 6 vocabulary PDFs
(MandarinBean.com, 1,600 and 1,800 entries) into
scripts/data/hsk3-l5.json and scripts/data/hsk3-l6.json:
[{n, hanzi, pinyin, pos: [english], translation}].

    python -I scripts/parse-hsk3.py

Needs pypdf. The PDFs sit in the project root (they are not committed).
"""
import json
import os
import re
import sys
import unicodedata

from pypdf import PdfReader

sys.stdout.reconfigure(encoding="utf-8")
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
HAN = re.compile(r"[㐀-鿿]")

# Level 6 writes parts of speech as Chinese abbreviations.
ZH_POS = {
    "名": "noun", "动": "verb", "形": "adjective", "副": "adverb", "量": "measure word",
    "代": "pronoun", "介": "preposition", "连": "conjunction", "助": "particle",
    "叹": "interjection", "数": "numeral", "拟声": "onomatopoeia", "前缀": "prefix",
    "后缀": "suffix", "数量": "numeral-measure word",
}
# Level 5 writes them in English, sometimes broken over two lines.
EN_POS = {
    "noun", "verb", "adjective", "adverb", "classifier", "measure", "pronoun", "preposition",
    "conjunction", "particle", "interjection", "numeral", "number", "onomatopoeia", "prefix",
    "suffix", "auxiliary", "phrase", "idiom", "number-classifier", "measure-word",
}
EN_FIX = {"classifier": "measure word", "number-classifier": "numeral-measure word", "number": "numeral"}


def lines_of(pdf):
    text = "\n".join((p.extract_text() or "") for p in PdfReader(pdf).pages)
    text = unicodedata.normalize("NFKC", text)  # Kangxi radicals (⽩) become 白
    out = []
    for raw in text.splitlines():
        line = raw.strip()
        if not line or line.startswith("MandarinBean.com") or line.startswith("NO. WORD"):
            continue
        out.append(line)
    return out


def entries_of(pdf, total):
    start = re.compile(r"^(\d{1,4}) (\S+) (.*)$")
    entries, cur = [], None
    for line in lines_of(pdf):
        m = start.match(line)
        if m and HAN.search(m.group(2)) and int(m.group(1)) == (cur["n"] + 1 if cur else 1):
            if cur:
                entries.append(cur)
            cur = {"n": int(m.group(1)), "hanzi": m.group(2), "rest": m.group(3)}
        elif cur:
            # A wrapped line. "number-" + "classifier" join without a space.
            cur["rest"] += ("" if cur["rest"].endswith("-") else " ") + line
    entries.append(cur)
    assert [e["n"] for e in entries] == list(range(1, total + 1)), (pdf, len(entries))
    return entries


def split_zh(rest):
    # pinyin (may hold spaces), then the Chinese POS run, then the English.
    m = re.match(r"^(.+?) ([一-鿿、，, ]+?) (.*)$", rest)
    if not m:
        # No part of speech printed (see split_en).
        tokens = rest.split(" ")
        i = 0
        while i < len(tokens) and not tokens[i].isascii():
            i += 1
        return " ".join(tokens[:i]), [], " ".join(tokens[i:])
    pos = []
    for p in re.split(r"[、，,]", m.group(2)):
        p = p.strip()
        if p:
            if p not in ZH_POS:
                print("unknown part of speech:", p, "in", rest)
            pos.append(ZH_POS.get(p, p))
    return m.group(1), pos, m.group(3)


def split_en(rest):
    tokens = rest.split(" ")
    i = 0
    while i < len(tokens) and tokens[i].lower() not in EN_POS:
        i += 1
    if i == len(tokens):
        # No part of speech printed: the pinyin is the run of tone-marked
        # syllables; the part of speech is filled in from the word's content.
        i = 0
        while i < len(tokens) and not tokens[i].isascii():
            i += 1
        return " ".join(tokens[:i]), [], " ".join(tokens[i:])
    pinyin = " ".join(tokens[:i])
    pos = []
    while i < len(tokens) and (tokens[i].lower() in EN_POS or tokens[i] == "、"):
        if tokens[i] != "、":
            p = tokens[i].lower()
            pos.append(EN_FIX.get(p, p))
        i += 1
    return pinyin, pos, " ".join(tokens[i:])


# Entries the PDF's text layer garbles, fixed by hand: hanzi -> fields.
FIXES = {
    "hsk3-l5.json": {
        "劳": {"hanzi": "劳动", "pinyin": "láodòng", "pos": ["noun", "verb"], "translation": "labor, work; to work"},
        "哈": {"pinyin": "hā", "pos": ["onomatopoeia", "interjection"]},
    },
    "hsk3-l6.json": {
        "方方面面": {"pinyin": "fāngfāngmiànmiàn", "pos": ["noun"]},
        "尽": {"pinyin": "jìn", "pos": ["verb", "adverb"]},
        "又头": {"hanzi": "口头", "pinyin": "kǒutóu", "translation": "oral, verbal; superficial"},
        "盘": {"pinyin": "pán", "pos": ["measure word", "verb"]},
        "则": {"pinyin": "zé", "pos": ["conjunction", "particle"], "translation": "then, or; (auxiliary particle)"},
    },
}


def build(pdf, total, split, name):
    out = []
    for e in entries_of(os.path.join(ROOT, pdf), total):
        pinyin, pos, translation = split(e["rest"])
        # The text layer turns the letters "verb" into 动 inside translations.
        translation = translation.replace("动 s", "verbs").replace("动 al", "verbal")
        # The PDFs' font maps 口 to the 又 code point (窗口 comes out 窗又);
        # the pinyin says which: kǒu, not yòu.
        plain = unicodedata.normalize("NFD", pinyin).encode("ascii", "ignore").decode().lower()
        if "又" in e["hanzi"] and "kou" in plain and "you" not in plain:
            e["hanzi"] = e["hanzi"].replace("又", "口")
        fix = FIXES[name].get(e["hanzi"], {})
        e["hanzi"] = fix.get("hanzi", e["hanzi"])
        pinyin = fix.get("pinyin", pinyin)
        pos = fix.get("pos", pos)
        translation = fix.get("translation", translation)
        out.append({
            "n": e["n"],
            "hanzi": e["hanzi"],
            "pinyin": pinyin.replace("’", "'").strip(),
            "pos": list(dict.fromkeys(pos)),
            "translation": re.sub(r"\s+", " ", translation).strip(),
        })
    path = os.path.join(ROOT, "scripts", "data", name)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=1)
    print(f"{name}: {len(out)} entries")
    return out


build("New-HSK-Vocabulary-Level-5.pdf", 1600, split_en, "hsk3-l5.json")
build("New-HSK-Vocabulary-L6.pdf", 1800, split_zh, "hsk3-l6.json")
