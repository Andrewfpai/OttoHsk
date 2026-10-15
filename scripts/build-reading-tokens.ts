/**
 * Builds src/content/reading-tokens.json: every reading paper's passages,
 * questions and options split into words, each with its pinyin, meaning and
 * HSK level, so the learner can tap any word while reading.
 *
 * Words come from the app's own HSK 5 and HSK 6 lists first (checked
 * meanings), then complete-hsk-vocabulary (scripts/data/complete-hsk.json,
 * MIT; meanings from CC-CEDICT, CC BY-SA 4.0). The text is split by longest
 * match against both. Pinyin of a single character is read in context by
 * pinyin-pro, so 得 / 了 / 着 come out right.
 *
 *   npx tsx scripts/build-reading-tokens.ts
 */
import { readFileSync, writeFileSync } from "node:fs";
import { pinyin } from "pinyin-pro";

import { READING_SETS } from "../src/content/reading";
import type { ReadingPaper, ReadingToken as Token } from "../src/content/types";
import hsk5 from "../src/content/words.json" with { type: "json" };
import meanings5 from "../src/content/meanings.json" with { type: "json" };
import hsk6 from "../src/content/words-hsk6.json" with { type: "json" };

const PAPERS: ReadingPaper[] = READING_SETS.map((s) => s.paper);

type Entry = {
  pinyin: string;
  gloss: string;
  level?: string;
  id?: string;
  /** Every reading of a character, so the one used in context can be picked. */
  forms?: { pinyin: string; gloss: string }[];
};

const dict = new Map<string, Entry>();
type Complete = { s: string; l: string[]; f: { i: { y: string }; m: string[] }[] }[];
const complete: Complete = JSON.parse(readFileSync(new URL("./data/complete-hsk.json", import.meta.url), "utf8"));
/** The first few senses, kept short enough for a phone panel. */
function shortGloss(senses: string[]): string {
  let out = senses[0] ?? "";
  for (const m of senses.slice(1, 3)) if (out.length + m.length < 70) out += `; ${m}`;
  return out;
}
for (const e of complete) {
  const forms = e.f
    .filter((f) => f.m.length > 0 && !f.m.every((m) => /variant of|^used in /.test(m)))
    .map((f) => ({ pinyin: f.i.y.replace(/\s+/g, ""), gloss: shortGloss(f.m) }));
  if (forms.length === 0) continue;
  const old = e.l.find((l) => l.startsWith("o"));
  const neu = e.l.find((l) => l.startsWith("n"));
  dict.set(e.s, {
    ...forms[0],
    level: old ? `HSK ${old.slice(1)}` : neu ? `HSK 3.0 · ${neu.slice(1)}` : undefined,
    forms: forms.length > 1 ? forms : undefined,
  });
}
// The app's own lists win: checked meanings, and the words the learner studies.
const m5 = meanings5 as Record<string, { gloss: string }>;
for (const w of hsk5) dict.set(w.hanzi, { pinyin: w.pinyin, gloss: m5[w.id]?.gloss ?? w.gloss, level: "HSK 5", id: w.id });
for (const w of hsk6) dict.set(w.hanzi, { pinyin: w.pinyin, gloss: w.gloss, level: "HSK 6", id: w.id });

/**
 * Words the papers use that neither source has (names, literary words).
 * Hand-written; add to it when a new paper leaves words unexplained.
 */
const EXTRA: Record<string, [string, string]> = {
  武术: ["wǔshù", "martial arts"],
  练武: ["liànwǔ", "to practise martial arts"],
  练武者: ["liànwǔzhě", "martial arts practitioner"],
  强身健体: ["qiángshēn jiàntǐ", "to build up one's health"],
  刘半农: ["Liú Bànnóng", "Liu Bannong (writer, 1891–1934)"],
  赵元任: ["Zhào Yuánrèn", "Zhao Yuanren (linguist, 1892–1982)"],
  逐个击破: ["zhúgè jīpò", "to deal with one by one"],
  终极: ["zhōngjí", "ultimate; final"],
  企及: ["qǐjí", "to hope to reach"],
  何以: ["héyǐ", "how; why (literary)"],
  漠河: ["Mòhé", "Mohe (China's northernmost county)"],
  失恋: ["shīliàn", "to be lovelorn; a break-up"],
  断言: ["duànyán", "to assert"],
  郁闷: ["yùmèn", "depressed; gloomy"],
  无以复加: ["wúyǐ fùjiā", "extreme; could not be greater"],
  预想: ["yùxiǎng", "to anticipate"],
  消弭: ["xiāomǐ", "to dispel; to fade away"],
  味美: ["wèiměi", "tasty"],
  促: ["cù", "to urge; to prompt"],
  金币: ["jīnbì", "gold coin"],
  一半儿: ["yíbànr", "half"],
  眼珠: ["yǎnzhū", "eyeball"],
  坚称: ["jiānchēng", "to insist"],
  谎称: ["huǎngchēng", "to claim falsely"],
  公孙仪: ["Gōngsūn Yí", "Gongsun Yi (a musician in an old story)"],
  涓涓: ["juānjuān", "trickling (of water)"],
  怒涛: ["nùtāo", "raging waves"],
  秋虫: ["qiūchóng", "autumn insects"],
  低鸣: ["dīmíng", "a low chirp"],
  婉转: ["wǎnzhuǎn", "sweet and lilting; tactful"],
  突发奇想: ["tūfā qíxiǎng", "to suddenly have an odd idea"],
  嗡嗡: ["wēngwēng", "buzz (sound)"],
  哞哞: ["mōumōu", "moo (sound)"],
  勤学苦练: ["qínxué kǔliàn", "to study and practise hard"],
  衔: ["xián", "to hold in the mouth"],
  鼻头: ["bítóu", "tip of the nose"],
  自娱自乐: ["zìyú zìlè", "to amuse oneself"],
  齐白石: ["Qí Báishí", "Qi Baishi (painter, 1864–1957)"],
  艾青: ["Ài Qīng", "Ai Qing (poet, 1910–1996)"],
  真伪: ["zhēnwěi", "genuine or fake"],
  放大镜: ["fàngdàjìng", "magnifying glass"],
  愁眉不展: ["chóuméi bùzhǎn", "to frown with worry"],
  盛名于世: ["shèngmíng yú shì", "famous throughout the world"],
  描红: ["miáohóng", "to trace characters (beginner calligraphy)"],
  赞誉: ["zànyù", "praise; acclaim"],
  飘飘然: ["piāopiāorán", "smug; carried away"],
  不实之词: ["bùshí zhī cí", "untrue words"],
  蒙蔽: ["méngbì", "to deceive; to blind"],
  懈怠: ["xièdài", "to slack off"],
  棒状: ["bàngzhuàng", "rod-shaped"],
  球状: ["qiúzhuàng", "ball-shaped"],
  茶杯状: ["chábēizhuàng", "cup-shaped"],
  由此可知: ["yóucǐ kězhī", "from this we can see"],
  原貌: ["yuánmào", "original appearance"],
  // Sets B–D (H51332, H51328, H51553C).
  居多: ["jūduō", "to be the majority"],
  始于: ["shǐyú", "to begin with; to start from"],
  不失为: ["bùshīwéi", "can still be considered"],
  有过: ["yǒuguo", "to have had (before)"],
  爱上: ["àishang", "to fall in love with"],
  小石子: ["xiǎo shízǐ", "pebble"],
  石子: ["shízǐ", "pebble"],
  音: ["yīn", "sound; note"],
  叹: ["tàn", "to sigh"],
  描: ["miáo", "to trace; to draw over"],
  身为: ["shēnwéi", "being (in one's role as)"],
  可达: ["kědá", "can reach"],
  宣纸: ["xuānzhǐ", "Xuan paper (for calligraphy and painting)"],
  寿星: ["shòuxing", "god of longevity; a very old person"],
  老寿星: ["lǎo shòuxing", "a very old person (respectful)"],
  张衡: ["Zhāng Héng", "Zhang Heng (scientist, 78–139)"],
  东汉: ["Dōng Hàn", "Eastern Han dynasty (25–220)"],
  恒星: ["héngxīng", "star"],
  地动仪: ["dìdòngyí", "seismoscope (Zhang Heng's earthquake detector)"],
  世上: ["shìshàng", "in the world"],
  热身: ["rèshēn", "to warm up"],
  后羿: ["Hòu Yì", "Hou Yi (archer in Chinese myth)"],
  仙药: ["xiānyào", "elixir of immortality"],
  相见: ["xiāngjiàn", "to meet each other"],
  相会: ["xiānghuì", "to meet (each other)"],
  取舍: ["qǔshě", "to choose what to keep and what to drop"],
  患得患失: ["huàndé huànshī", "to worry about gains and losses"],
  绊脚石: ["bànjiǎoshí", "stumbling block"],
  镁: ["měi", "magnesium"],
  水溶性: ["shuǐróngxìng", "water-soluble"],
  药效: ["yàoxiào", "effect of a medicine"],
  饮用: ["yǐnyòng", "to drink"],
  洞庭湖: ["Dòngtíng Hú", "Dongting Lake (Hunan)"],
  洞庭: ["Dòngtíng", "Dongting (the lake)"],
  洞府: ["dòngfǔ", "cave home (of immortals)"],
  繁多: ["fánduō", "many and varied"],
  何地: ["hé dì", "where (literary)"],
  意味深长: ["yìwèi shēncháng", "full of meaning"],
  风速: ["fēngsù", "wind speed"],
  篮板: ["lánbǎn", "backboard (basketball)"],
  篮筐: ["lánkuāng", "basket; hoop"],
  篮网: ["lánwǎng", "basketball net"],
  底儿: ["dǐr", "bottom"],
  不辞劳苦: ["bùcí láokǔ", "to spare no effort"],
  大惑不解: ["dàhuò bùjiě", "to be greatly puzzled"],
  有识之士: ["yǒushí zhī shì", "people of insight"],
  禁锢: ["jìngù", "to confine; to shackle"],
  囚禁: ["qiújìn", "to imprison"],
  野雁: ["yěyàn", "wild goose"],
  哗: ["huā", "whoosh; splash (sound)"],
  日渐: ["rìjiàn", "day by day"],
  羽毛: ["yǔmáo", "feather"],
  依偎: ["yīwēi", "to snuggle up"],
  因小失大: ["yīn xiǎo shī dà", "to lose a lot by saving a little"],
  施舍: ["shīshě", "charity; to give alms"],
  耐寒: ["nàihán", "cold-hardy"],
  徐志摩: ["Xú Zhìmó", "Xu Zhimo (poet, 1897–1931)"],
  胡适: ["Hú Shì", "Hu Shi (scholar, 1891–1962)"],
  沈从文: ["Shěn Cóngwén", "Shen Congwen (writer, 1902–1988)"],
  讲师: ["jiǎngshī", "lecturer"],
  崭露头角: ["zhǎnlù tóujiǎo", "to show one's talent for the first time"],
  陡然: ["dǒurán", "suddenly"],
  成竹在胸: ["chéngzhú zài xiōng", "to have a plan ready in mind"],
  教案: ["jiào'àn", "lesson plan"],
  聚拢: ["jùlǒng", "to gather together"],
  授课: ["shòukè", "to teach a class"],
  窘境: ["jiǒngjìng", "awkward situation"],
  战国: ["Zhànguó", "Warring States period (475–221 BC)"],
  赵括: ["Zhào Kuò", "Zhao Kuo (general of Zhao, d. 260 BC)"],
  赵国: ["Zhàoguó", "the State of Zhao"],
  赵奢: ["Zhào Shē", "Zhao She (general of Zhao)"],
  不切实际: ["bú qiè shíjì", "unrealistic"],
  秦国: ["Qínguó", "the State of Qin"],
  廉颇: ["Lián Pō", "Lian Po (veteran general of Zhao)"],
  全军: ["quánjūn", "the whole army"],
  敌强己弱: ["dí qiáng jǐ ruò", "the enemy strong, ourselves weak"],
  出击: ["chūjī", "to attack"],
  秦军: ["Qínjūn", "the Qin army"],
  迎战: ["yíngzhàn", "to meet the enemy in battle"],
  赵王: ["Zhào wáng", "the King of Zhao"],
  赵军: ["Zhàojūn", "the Zhao army"],
  身亡: ["shēnwáng", "to die"],
  疑人不用: ["yí rén bú yòng", "don't employ someone you doubt"],
  用人不疑: ["yòng rén bù yí", "don't doubt those you employ"],
  财商: ["cáishāng", "financial intelligence"],
  财: ["cái", "money; wealth"],
  誉为: ["yùwéi", "to be hailed as"],
  王府井: ["Wángfǔjǐng", "Wangfujing (Beijing shopping street)"],
  王府: ["wángfǔ", "prince's mansion"],
  美术馆: ["měishùguǎn", "art gallery"],
  交友: ["jiāoyǒu", "to make friends"],
  永续: ["yǒngxù", "lasting forever; sustainable"],
  取之不尽: ["qǔ zhī bú jìn", "inexhaustible"],
  用之不竭: ["yòng zhī bù jié", "inexhaustible"],
  不均: ["bùjūn", "uneven"],
  明代: ["Míngdài", "Ming dynasty (1368–1644)"],
  李釜源: ["Lǐ Fǔyuán", "Li Fuyuan (Ming-dynasty author)"],
  综要: ["zōngyào", "summary; essentials"],
  稻米: ["dàomǐ", "rice"],
  明清: ["Míng Qīng", "the Ming and Qing dynasties"],
  江浙: ["Jiāng Zhè", "Jiangsu and Zhejiang"],
  农学: ["nóngxué", "agronomy"],
  有意义: ["yǒu yìyì", "meaningful"],
  赵匡胤: ["Zhào Kuāngyìn", "Zhao Kuangyin (founder of the Song dynasty)"],
  馍: ["mó", "steamed bun; flatbread"],
  干馍: ["gānmó", "dry flatbread"],
  宋朝: ["Sòngcháo", "Song dynasty (960–1279)"],
  宋代: ["Sòngdài", "Song dynasty (960–1279)"],
  羊肉泡馍: ["yángròu pàomó", "mutton soup with bread (Xi'an dish)"],
  不胫而走: ["bújìng'érzǒu", "to spread fast (of news)"],
  风靡: ["fēngmǐ", "to be all the rage"],
  身旁: ["shēnpáng", "at one's side"],
  易: ["yì", "easy; easily"],
  郑板桥: ["Zhèng Bǎnqiáo", "Zheng Banqiao (painter, 1693–1765)"],
  硬物: ["yìngwù", "hard object"],
  妄自菲薄: ["wàngzì fěibó", "to belittle oneself"],
  刮目相看: ["guāmù xiāngkàn", "to see someone in a new light"],
  椰壳: ["yēké", "coconut shell"],
  悟: ["wù", "to realise; to understand"],
  房里: ["fángli", "in the room"],
  桌边: ["zhuōbiān", "at the table"],
  一道儿: ["yídàor", "a stroke; a line"],
  一知半解: ["yìzhī bànjiě", "a little knowledge; a smattering"],
  异味: ["yìwèi", "strange smell"],
  发霉: ["fāméi", "to go mouldy"],
  酿: ["niàng", "to brew"],
  佳酿: ["jiāniàng", "fine wine"],
  甘醇: ["gānchún", "sweet and mellow"],
  腐臭: ["fǔchòu", "rotten and smelly"],
  醇: ["chún", "mellow (of wine)"],
  面目可憎: ["miànmù kězēng", "repulsive; hateful"],
  寿礼: ["shòulǐ", "birthday present (for an elder)"],
  影展: ["yǐngzhǎn", "photo exhibition"],
  心灰意冷: ["xīnhuī yìlěng", "disheartened"],
  一落千丈: ["yíluò qiānzhàng", "to drop sharply"],
  而言: ["éryán", "as far as … is concerned"],
  沉默不语: ["chénmò bùyǔ", "to stay silent"],
  张僧繇: ["Zhāng Sēngyáo", "Zhang Sengyao (painter, 6th century)"],
  栩栩如生: ["xǔxǔ rúshēng", "lifelike"],
  屋檐: ["wūyán", "eaves"],
  活灵活现: ["huólíng huóxiàn", "vivid; lifelike"],
  奔走相告: ["bēnzǒu xiānggào", "to rush to tell each other"],
  轰鸣: ["hōngmíng", "to roar"],
  破壁: ["pò bì", "to break through the wall"],
  无影无踪: ["wúyǐng wúzōng", "without a trace"],
  精辟: ["jīngpì", "incisive"],
  语句: ["yǔjù", "sentence"],
  爱因斯坦: ["Àiyīnsītǎn", "Einstein"],
  五岳: ["Wǔ Yuè", "the Five Great Mountains"],
  岳: ["yuè", "high mountain"],
  泰山: ["Tài Shān", "Mount Tai (Shandong)"],
  华山: ["Huà Shān", "Mount Hua (Shaanxi)"],
  嵩山: ["Sōng Shān", "Mount Song (Henan)"],
  恒山: ["Héng Shān", "Mount Heng (Shanxi)"],
  衡山: ["Héng Shān", "Mount Heng (Hunan)"],
  效能: ["xiàonéng", "efficiency"],
  衣着: ["yīzhuó", "clothing; dress"],
  易皱: ["yì zhòu", "creases easily"],
  紧身: ["jǐnshēn", "tight-fitting"],
  华容道: ["Huáróng Dào", "Huarong Road (a sliding-block puzzle)"],
  曹操: ["Cáo Cāo", "Cao Cao (warlord, 155–220)"],
  益智: ["yìzhì", "brain-training"],
  款: ["kuǎn", "(measure word) style; model"],
  源自: ["yuánzì", "to come from"],
  心仪: ["xīnyí", "to admire; favourite"],
  川菜: ["chuāncài", "Sichuan cuisine"],
  鲁菜: ["lǔcài", "Shandong cuisine"],
  淮菜: ["huáicài", "Huaiyang cuisine"],
  粤菜: ["yuècài", "Cantonese cuisine"],
  重庆: ["Chóngqìng", "Chongqing"],
  菜肴: ["càiyáo", "dishes"],
  菜馆: ["càiguǎn", "restaurant"],
  农具: ["nóngjù", "farm tools"],
  殊不知: ["shūbùzhī", "little do they know"],
  本校: ["běnxiào", "this school"],
  全校: ["quánxiào", "the whole school"],
  村民: ["cūnmín", "villager"],
  松茸: ["sōngróng", "matsutake mushroom"],
  菌类: ["jūnlèi", "fungi"],
  菌: ["jūn", "fungus; mushroom"],
  木棍: ["mùgùn", "wooden stick"],
  恋: ["liàn", "to be attached to; to love"],
  举手之劳: ["jǔshǒu zhī láo", "a tiny effort"],
  赠予: ["zèngyǔ", "to give as a gift"],
  饮水思源: ["yǐnshuǐ sīyuán", "remember where your blessings come from"],
  万物: ["wànwù", "all things"],
  绵绵不绝: ["miánmián bùjué", "endless; continuous"],
  世世代代: ["shìshì dàidài", "for generations"],
  主食: ["zhǔshí", "staple food"],
  感同身受: ["gǎntóng shēnshòu", "to feel it as if it were one's own"],
  皱眉: ["zhòuméi", "to frown"],
  抗压性: ["kàngyāxìng", "ability to cope with pressure"],
};
for (const [word, [p, g]] of Object.entries(EXTRA)) {
  if (!dict.has(word)) dict.set(word, { pinyin: p.replace(/\s+/g, ""), gloss: g });
}

/** The structural particles, read from the word before them. */
const PARTICLES: Record<string, string> = {
  的: "(particle) of; 's; marks what describes a noun",
  地: "(particle) -ly: turns what comes before into an adverb",
  得: "(particle) links a verb to how / how much",
  了: "(particle) completed action; change of state",
  着: "(particle) -ing: an ongoing action or state",
};

/**
 * pinyin-pro misreads 地 / 得 on their own (慢慢地 dì). As separate tokens
 * they are nearly always particles; the exceptions follow a few words.
 */
function particleReading(char: string, prev: string | undefined): string | null {
  if (char === "的") return "de";
  // 地 dì after a place word (在地上, 各地, 当地); otherwise the adverb particle.
  if (char === "地") return !prev || /^(在|各|当|本|外|内|此|满|土|大|草|山|田|陆|基|落)$/.test(prev) ? "dì" : "de";
  if (char === "得") {
    if (prev && /^(还|就|也|都|总|又|可|只)$/.test(prev)) return "děi";
    if (prev && /^(能|难|获|取|所|必|不)$/.test(prev)) return "dé";
    return "de";
  }
  return null;
}

const HAN = /\p{Script=Han}/u;
const MAX = 6;

function tokenize(text: string, underline = false): Token[] {
  const chars = [...text];
  // Context-aware readings for single characters.
  const readings = pinyin(text, { type: "array", toneType: "symbol" });
  const out: Token[] = [];
  let i = 0;
  while (i < chars.length) {
    const c = chars[i];
    if (!HAN.test(c)) {
      // Punctuation, digits and Latin letters stay as plain text.
      const last = out.at(-1);
      if (last && !last.p && !last.g && last.t !== "\n" && c !== "\n") last.t += c;
      else out.push({ t: c });
      i++;
      continue;
    }
    let len = Math.min(MAX, chars.length - i);
    for (; len > 1; len--) if (dict.has(chars.slice(i, i + len).join(""))) break;
    const word = chars.slice(i, i + len).join("");
    const entry = dict.get(word);
    const prev = out.at(-1)?.p ? out.at(-1)!.t : undefined;
    const particle = len === 1 ? particleReading(word, prev) : null;
    const p = particle ?? (len === 1 ? readings[i] : entry?.pinyin ?? readings.slice(i, i + len).join(""));
    // 个 gè, not gě; 了 le, not liǎo: the sense that goes with the reading.
    const form = entry?.forms?.find((f) => f.pinyin === p) ?? entry;
    const token: Token = { t: word, p };
    if (len === 1 && PARTICLES[word] && /^(de|le|zhe)$/.test(p)) {
      token.g = PARTICLES[word];
    } else if (form?.gloss) token.g = form.gloss;
    if (entry?.level) token.l = entry.level;
    if (entry?.id) token.id = entry.id;
    if (underline) token.u = 1;
    out.push(token);
    i += len;
  }
  if (underline) for (const t of out) t.u = 1;
  return out;
}

/** Text with [[underlined]] parts: tokenized piece by piece. */
function tokenizeMarked(text: string): Token[] {
  return text.split(/(\[\[[^\]]+\]\])/).flatMap((part) =>
    part.startsWith("[[") ? tokenize(part.slice(2, -2), true) : part ? tokenize(part) : [],
  );
}

const tokens: Record<string, Token[]> = {};
for (const paper of PAPERS) {
  for (const item of [...paper.part2, ...paper.part3]) {
    tokens[item.id] = tokenizeMarked(item.passage);
    for (const q of item.questions) {
      if (q.prompt) tokens[`${paper.id}#${q.number}`] = tokenizeMarked(q.prompt);
      q.options.forEach((o, i) => (tokens[`${paper.id}#${q.number}.${i}`] = tokenize(o)));
    }
  }
}

writeFileSync(new URL("../src/content/reading-tokens.json", import.meta.url), JSON.stringify(tokens) + "\n");
const all = Object.values(tokens).flat();
const han = all.filter((t) => t.p);
console.log(`${Object.keys(tokens).length} texts, ${han.length} words; ${han.filter((t) => t.g).length} with a meaning, ${han.filter((t) => !t.g).map((t) => t.t).join("")} without`);
