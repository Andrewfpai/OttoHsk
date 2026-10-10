import type { ConfusableSet } from "./types";

export const confusablesHsk6: ConfusableSet[] = [
  {
    id: "h6-yizhi-yizhi2",
    words: [
      { hanzi: "以致", pinyin: "yǐzhì", gloss: "with the result that (usually bad)" },
      { hanzi: "以至", pinyin: "yǐzhì", gloss: "up to; so much so that" },
    ],
    explanation:
      "以致 introduces a result, almost always an unwelcome one, caused by what came before: 粗心大意，以致出了错. 以至 has two jobs: it marks the far end of a range (从A、B以至C), and, often as 以至于, it gives a result that follows from how extreme something was. If a mistake leads to a bad outcome, choose 以致; if there is a range or a degree, choose 以至.",
    questions: [
      {
        sentence: "他开车时一直在看手机，＿＿撞上了前面的车。",
        answer: "以致",
        why: "Crashing is an unwelcome result caused by careless behaviour, which is what 以致 introduces.",
      },
      {
        sentence: "这本小说太精彩了，＿＿我一口气读到了天亮。",
        answer: "以至",
        why: "Reading until dawn is not a bad outcome but follows from how gripping the book was, a degree result that takes 以至.",
      },
      {
        sentence: "从小学、中学＿＿大学，他的成绩一直名列前茅。",
        answer: "以至",
        why: "以至 marks the far end of a range (从A、B以至C); 以致 cannot link a list.",
      },
      {
        sentence: "由于长期管理不善，＿＿公司连续三年亏损。",
        answer: "以致",
        why: "Three years of losses is a bad result caused by poor management, the typical use of 以致.",
      },
    ],
  },
  {
    id: "h6-jiezhi-jiezhi2",
    words: [
      { hanzi: "截止", pinyin: "jiézhǐ", gloss: "to close, to end (at a deadline)" },
      { hanzi: "截至", pinyin: "jiézhì", gloss: "up to, as of (a point in time)" },
    ],
    explanation:
      "截止 is an intransitive verb meaning a period ends: the time comes before it (于五月一日截止, 到月底截止) or it appears in 截止日期. 截至 means 'as of, up to' and must be followed by the time point, usually to introduce figures: 截至去年年底. If the time follows the blank, choose 截至; if it comes before, or the word ends the clause, choose 截止.",
    questions: [
      {
        sentence: "报名将于本月三十日＿＿，请大家抓紧时间。",
        answer: "截止",
        why: "The time comes before the blank and registration simply ends, so the intransitive 截止 fits.",
      },
      {
        sentence: "＿＿去年年底，该市人口已超过一千万。",
        answer: "截至",
        why: "A time point follows the blank to mean 'as of', which is 截至.",
      },
      {
        sentence: "论文提交的＿＿日期是下周五。",
        answer: "截止",
        why: "截止日期 'deadline' is a fixed term.",
      },
      {
        sentence: "＿＿目前，已有两百多名志愿者报名参加这次活动。",
        answer: "截至",
        why: "截至目前 'as of now' introduces a running figure; 截止 cannot take a time as its object.",
      },
    ],
  },
  {
    id: "h6-fanzhi-fouze",
    words: [
      { hanzi: "反之", pinyin: "fǎnzhī", gloss: "conversely, on the other hand" },
      { hanzi: "否则", pinyin: "fǒuzé", gloss: "otherwise, or else" },
    ],
    explanation:
      "否则 means 'if not, then…': it follows something that should happen and says what goes wrong if it does not (快走吧，否则就迟到了), and it completes the pattern 除非……否则. 反之 turns a general rule around: if A brings B, then 反之, the opposite of A brings the opposite of B. If the first clause is an instruction or condition, choose 否则; if it is a rule being reversed, choose 反之.",
    questions: [
      {
        sentence: "快点儿走吧，＿＿就赶不上最后一班地铁了。",
        answer: "否则",
        why: "The first clause urges us to hurry, and 否则 says what happens if we do not.",
      },
      {
        sentence: "价格降低，需求就会增加；＿＿，需求就会减少。",
        answer: "反之",
        why: "The second half states the reverse of a general rule (prices rising, demand falling), which is the job of 反之.",
      },
      {
        sentence: "除非你亲自去请他，＿＿他是不会来的。",
        answer: "否则",
        why: "除非……否则 is a fixed pattern; 反之 cannot pair with 除非.",
      },
      {
        sentence: "态度积极，困难就会变小；＿＿，再小的困难也会变成大问题。",
        answer: "反之",
        why: "反之 reverses the rule to cover a negative attitude, a meaning 否则 does not have.",
      },
    ],
  },
  {
    id: "h6-jibian-jinguan",
    words: [
      { hanzi: "即便", pinyin: "jíbiàn", gloss: "even if" },
      { hanzi: "尽管", pinyin: "jǐnguǎn", gloss: "although; feel free to" },
    ],
    explanation:
      "即便 introduces a hypothetical case, 'even if', and pairs with 也: 即便下雨，我们也去. 尽管 introduces something already true, 'although', and pairs with 但是 or 还是. 尽管 is also an adverb before a verb meaning 'feel free to' (有问题尽管问). If the situation has not happened, choose 即便; if it is a known fact, choose 尽管.",
    questions: [
      {
        sentence: "＿＿明天下大雨，比赛也照常进行。",
        answer: "即便",
        why: "Tomorrow's rain is only a possibility, and a hypothetical concession with 也 needs 即便.",
      },
      {
        sentence: "＿＿他已经道歉了，但她还是不肯原谅他。",
        answer: "尽管",
        why: "The apology has already happened, so the factual 'although', 尽管, pairs with 但.",
      },
      {
        sentence: "有什么困难你＿＿说，我们一定会帮你。",
        answer: "尽管",
        why: "Before a verb, 尽管 means 'feel free to'; 即便 has no such use.",
      },
      {
        sentence: "＿＿你说得再好听，我也不会再相信你了。",
        answer: "即便",
        why: "再……也 sets up an imagined extreme, which is hypothetical and takes 即便.",
      },
    ],
  },
  {
    id: "h6-ningyuan-yuqi",
    words: [
      { hanzi: "宁愿", pinyin: "nìngyuàn", gloss: "would rather" },
      { hanzi: "与其", pinyin: "yǔqí", gloss: "rather than" },
    ],
    explanation:
      "Both weigh two options, but they point in opposite directions. 与其A，不如B rejects A and chooses B, so 与其 is always answered later by 不如. 宁愿A，也不B (or 也要B) chooses A even though A has a cost; 宁可 and 宁肯 work the same way. If you see 不如, choose 与其; if you see 也, choose 宁愿.",
    questions: [
      {
        sentence: "＿＿在家里发愁，不如出去想想办法。",
        answer: "与其",
        why: "与其……不如 rejects the first option; 宁愿 does not pair with 不如.",
      },
      {
        sentence: "我＿＿少赚点儿钱，也不愿意做违法的事。",
        answer: "宁愿",
        why: "宁愿……也不 chooses the costly option (earning less) over the other one.",
      },
      {
        sentence: "＿＿说他是一位科学家，不如说他是一位艺术家。",
        answer: "与其",
        why: "与其说……不如说 'he is less A than B' is a fixed pattern.",
      },
      {
        sentence: "母亲＿＿自己饿着，也要让孩子吃饱。",
        answer: "宁愿",
        why: "宁愿……也要 means she accepts going hungry so that her child can eat.",
      },
    ],
  },
  {
    id: "h6-jianyu-youyu",
    words: [
      { hanzi: "鉴于", pinyin: "jiànyú", gloss: "in view of, given (as grounds for a decision)" },
      { hanzi: "由于", pinyin: "yóuyú", gloss: "because of, due to" },
    ],
    explanation:
      "由于 gives a cause: it can pair with 所以 or 而, sit after the subject, or follow 是 (是由于……造成的). 鉴于 gives the facts on which a decision is based; it opens the sentence, the main clause states a measure or decision, and it never follows 是 or pairs with 所以. 鉴于此 and 有鉴于此 are fixed phrases.",
    questions: [
      {
        sentence: "这次事故主要是＿＿司机疲劳驾驶造成的。",
        answer: "由于",
        why: "Only 由于 can follow 是 to give a cause; 是鉴于 is not used.",
      },
      {
        sentence: "最近校园里发生了几起安全事故。＿＿此，学校决定加强对学生的安全教育。",
        answer: "鉴于",
        why: "鉴于此 'in view of this' introduces the grounds for a decision; 由于此 is not idiomatic.",
      },
      {
        sentence: "他＿＿工作压力太大而病倒了。",
        answer: "由于",
        why: "The blank follows the subject and pairs with 而 to give a cause, which only 由于 can do.",
      },
      {
        sentence: "近来小区里盗窃案件频发。有＿＿此，物业加强了夜间巡逻。",
        answer: "鉴于",
        why: "有鉴于此 is a fixed phrase that introduces a measure taken in response.",
      },
    ],
  },
  {
    id: "h6-buliao-yiliao-yiwai",
    words: [
      { hanzi: "不料", pinyin: "búliào", gloss: "unexpectedly, but as it turned out" },
      { hanzi: "意料", pinyin: "yìliào", gloss: "to anticipate; expectation" },
      { hanzi: "意外", pinyin: "yìwài", gloss: "unexpected; accident" },
    ],
    explanation:
      "不料 is a linking adverb that opens a second clause, 'but unexpectedly', after a first clause about a plan or expectation. 意料 is a verb or noun, 'expectation', and lives in fixed phrases: 出乎意料, 在意料之中. 意外 is an adjective, 'unexpected, surprised' (感到意外), or a noun, 'accident' (发生意外). Ask whether the blank needs a clause linker (不料), the object of 出乎 or 之中 (意料), or an adjective or noun (意外).",
    questions: [
      {
        sentence: "我们本来打算周末去爬山，＿＿那天下起了大雪。",
        answer: "不料",
        why: "The blank links a plan to what actually happened, the clause-linking job of 不料.",
      },
      {
        sentence: "比赛结果完全出乎大家的＿＿。",
        answer: "意料",
        why: "出乎意料 'beyond expectation' is a fixed phrase.",
      },
      {
        sentence: "听说他突然辞职了，同事们都感到很＿＿。",
        answer: "意外",
        why: "感到很 needs an adjective, and 意外 'surprised' is one; 意料 and 不料 are not adjectives.",
      },
      {
        sentence: "开车一定要小心，千万别发生＿＿。",
        answer: "意外",
        why: "发生意外 'have an accident' uses 意外 as a noun.",
      },
    ],
  },
  {
    id: "h6-zhaoyang-yijiu",
    words: [
      { hanzi: "照样", pinyin: "zhàoyàng", gloss: "all the same, as usual; after a model" },
      { hanzi: "依旧", pinyin: "yījiù", gloss: "as before, still" },
    ],
    explanation:
      "依旧 says something has stayed the way it was over time, and it can stand alone as the predicate at the end of a clause (风景依旧). 照样 says something goes on as usual regardless of a condition that might have stopped it (没有你，我们照样能完成), and literally means 'following a model' (照样画一张). 照样 cannot end a clause; 依旧 does not carry the 'regardless' meaning.",
    questions: [
      {
        sentence: "二十年没回来了，家乡的小河＿＿，只是我已经老了。",
        answer: "依旧",
        why: "The blank ends the clause as its predicate, which 依旧 can do and 照样 cannot.",
      },
      {
        sentence: "老师在黑板上画了一张图，让我们＿＿画一张。",
        answer: "照样",
        why: "Drawing one by following a model is the literal meaning of 照样.",
      },
      {
        sentence: "别以为你走了公司就办不下去了，离了谁，地球都＿＿转。",
        answer: "照样",
        why: "The world keeps turning regardless of who leaves, the 'all the same, regardless' meaning of 照样.",
      },
      {
        sentence: "多年不见，他的性格＿＿，还是那么爱开玩笑。",
        answer: "依旧",
        why: "His character has stayed the same over the years and the word stands as the predicate, so 依旧.",
      },
    ],
  },
  {
    id: "h6-qiahao-qiadang",
    words: [
      { hanzi: "恰好", pinyin: "qiàhǎo", gloss: "as it happens; exactly" },
      { hanzi: "恰当", pinyin: "qiàdàng", gloss: "appropriate, suitable" },
    ],
    explanation:
      "恰当 is an adjective meaning 'appropriate, suitable' and describes words, methods or ways of handling things: 用词恰当, 恰当的方式. 恰好 is an adverb meaning 'as it happens' (我去的时候他恰好不在) or 'exactly' with an amount (恰好十个人). If the question is whether something is fitting, choose 恰当; if it is chance timing or an exact amount, choose 恰好.",
    questions: [
      {
        sentence: "我去找他的时候，他＿＿出去了。",
        answer: "恰好",
        why: "This is about chance timing, which the adverb 恰好 expresses; 恰当 means 'suitable'.",
      },
      {
        sentence: "这篇文章有几个词用得不太＿＿。",
        answer: "恰当",
        why: "Whether a word is used appropriately is 恰当.",
      },
      {
        sentence: "我们一共需要十个人，现在报名的＿＿十个。",
        answer: "恰好",
        why: "恰好 + number means 'exactly'; 恰当 cannot modify a number.",
      },
      {
        sentence: "批评孩子的时候，要选择＿＿的方式。",
        answer: "恰当",
        why: "An appropriate method is 恰当的方式.",
      },
    ],
  },
  {
    id: "h6-shibi-wubi",
    words: [
      { hanzi: "势必", pinyin: "shìbì", gloss: "be bound to, will certainly" },
      { hanzi: "务必", pinyin: "wùbì", gloss: "must, be sure to" },
    ],
    explanation:
      "Both contain 必, but they do different jobs. 务必 is an urgent request or instruction to someone, often after 请: 请务必准时到达. 势必 is a prediction that something is bound to happen given the situation, usually a consequence: 这样下去势必影响健康. An instruction is 务必; a prediction is 势必.",
    questions: [
      {
        sentence: "这份文件非常重要，请你＿＿在周五之前交上来。",
        answer: "务必",
        why: "请……务必 is an urgent instruction to the listener.",
      },
      {
        sentence: "如果继续过度开发，＿＿会破坏当地的生态环境。",
        answer: "势必",
        why: "This predicts an inevitable consequence, which is 势必.",
      },
      {
        sentence: "出国以前，＿＿检查一下护照有没有过期。",
        answer: "务必",
        why: "This tells the reader to be sure to check, an instruction that takes 务必.",
      },
      {
        sentence: "物价不断上涨，＿＿影响普通家庭的生活。",
        answer: "势必",
        why: "Rising prices are bound to affect families, a prediction expressed by 势必.",
      },
    ],
  },
  {
    id: "h6-dongdang-dongyao",
    words: [
      { hanzi: "动荡", pinyin: "dòngdàng", gloss: "turbulent, unstable (society, markets)" },
      { hanzi: "动摇", pinyin: "dòngyáo", gloss: "to waver; to shake (belief, resolve)" },
    ],
    explanation:
      "动荡 describes a society, era or market in turmoil and takes no object: 社会动荡, 动荡的年代. 动摇 is about resolve, belief or a foundation wavering, and it can take an object: 动摇信心, 动摇不了我的决心. Turmoil is 动荡; wavering is 动摇.",
    questions: [
      {
        sentence: "那是一个＿＿的年代，人们的生活十分艰难。",
        answer: "动荡",
        why: "An era of turmoil is described with 动荡.",
      },
      {
        sentence: "无论遇到什么困难，他的决心都没有＿＿过。",
        answer: "动摇",
        why: "Resolve that never wavers is described with 动摇.",
      },
      {
        sentence: "什么也＿＿不了我们的信念。",
        answer: "动摇",
        why: "The verb takes 我们的信念 as its object, which 动摇 can do and 动荡 cannot.",
      },
      {
        sentence: "这场经济危机导致金融市场剧烈＿＿。",
        answer: "动荡",
        why: "A market in turmoil is 动荡.",
      },
    ],
  },
  {
    id: "h6-lvxing-zhixing-shixing",
    words: [
      { hanzi: "履行", pinyin: "lǚxíng", gloss: "to fulfil (a promise, duty, contract)" },
      { hanzi: "执行", pinyin: "zhíxíng", gloss: "to carry out (an order, task)" },
      { hanzi: "实行", pinyin: "shíxíng", gloss: "to put into practice (a policy, system)" },
    ],
    explanation:
      "履行 goes with things you have promised or owe: 履行诺言, 履行义务, 履行合同. 执行 goes with instructions given to you: 执行命令, 执行任务. 实行 goes with policies and systems being put into effect: 实行改革, 实行新制度. Promise or duty → 履行, order → 执行, policy → 实行.",
    questions: [
      {
        sentence: "他终于＿＿了当年对父母的承诺。",
        answer: "履行",
        why: "A promise is fulfilled with 履行.",
      },
      {
        sentence: "士兵必须服从并＿＿上级的命令。",
        answer: "执行",
        why: "Carrying out an order is 执行命令.",
      },
      {
        sentence: "从明年起，这座城市将＿＿垃圾分类制度。",
        answer: "实行",
        why: "Putting a system into practice is 实行制度.",
      },
      {
        sentence: "每个公民都应该＿＿纳税的义务。",
        answer: "履行",
        why: "An obligation is fulfilled with 履行义务.",
      },
    ],
  },
  {
    id: "h6-zunxun-zunshou",
    words: [
      { hanzi: "遵循", pinyin: "zūnxún", gloss: "to follow (principles, natural laws)" },
      { hanzi: "遵守", pinyin: "zūnshǒu", gloss: "to observe, to abide by (rules, laws)" },
    ],
    explanation:
      "遵守 is for concrete rules that can be broken: 遵守法律, 遵守纪律, 遵守交通规则, 遵守时间. 遵循 is for principles, patterns or guidance that you follow: 遵循原则, 遵循规律. Rules and laws → 遵守; principles and the laws of nature → 遵循.",
    questions: [
      {
        sentence: "开车一定要＿＿交通规则。",
        answer: "遵守",
        why: "Traffic rules are concrete rules you obey, which is 遵守.",
      },
      {
        sentence: "教育孩子应该＿＿他们的成长规律。",
        answer: "遵循",
        why: "A natural pattern (规律) is followed with 遵循, not obeyed with 遵守.",
      },
      {
        sentence: "考试期间，每个考生都必须＿＿考场纪律。",
        answer: "遵守",
        why: "遵守纪律 'observe discipline' is the fixed collocation.",
      },
      {
        sentence: "这项研究自始至终＿＿了客观、公正的原则。",
        answer: "遵循",
        why: "Principles are followed with 遵循原则.",
      },
    ],
  },
  {
    id: "h6-peiyu-peiyang",
    words: [
      { hanzi: "培育", pinyin: "péiyù", gloss: "to cultivate, to breed (plants, animals)" },
      { hanzi: "培养", pinyin: "péiyǎng", gloss: "to foster, to train (habits, abilities, talent)" },
    ],
    explanation:
      "培育 means raising living things so that they grow, especially seedlings and new breeds: 培育新品种, 培育树苗. 培养 means developing abilities, habits or interests, or training people for a role: 培养习惯, 培养兴趣, 培养人才. Seeds and breeds → 培育; skills and habits → 培养.",
    questions: [
      {
        sentence: "科学家们成功＿＿出了一种耐旱的水稻新品种。",
        answer: "培育",
        why: "Breeding a new variety of rice is 培育.",
      },
      {
        sentence: "父母应该从小＿＿孩子良好的生活习惯。",
        answer: "培养",
        why: "Habits are developed with 培养习惯.",
      },
      {
        sentence: "这家农场专门＿＿各种果树的树苗。",
        answer: "培育",
        why: "Raising seedlings is 培育; 培养 is not used for plants.",
      },
      {
        sentence: "这门课的目的是＿＿学生独立思考的能力。",
        answer: "培养",
        why: "Abilities are developed with 培养能力.",
      },
    ],
  },
  {
    id: "h6-po-hen",
    words: [
      { hanzi: "颇", pinyin: "pō", gloss: "quite, rather (formal)" },
      { hanzi: "很", pinyin: "hěn", gloss: "very" },
    ],
    explanation:
      "颇 is a formal written adverb meaning 'quite, considerably', and it forms set combinations such as 颇为, 颇具, 颇受 and 颇有. 很 is the everyday word and can do things 颇 cannot: it works as a complement after 得 (好得很) and forms 很多 directly before a noun. If 为 or 具 follows the blank, choose 颇; after 得, or in 很多 + noun, choose 很.",
    questions: [
      {
        sentence: "对于这次的考试成绩，他＿＿为满意。",
        answer: "颇",
        why: "颇为 + adjective is a fixed written form; 很为 does not exist.",
      },
      {
        sentence: "今天外面热得＿＿，大家都别出门了。",
        answer: "很",
        why: "Only 很 can serve as a complement after 得 (热得很).",
      },
      {
        sentence: "经过十年的发展，这个小镇的旅游业已经＿＿具规模。",
        answer: "颇",
        why: "颇具规模 'of considerable scale' is a set phrase; 很 does not combine with 具.",
      },
      {
        sentence: "广场上有＿＿多人在跳舞。",
        answer: "很",
        why: "很多 directly before a noun means 'many'; 颇多 can only follow its noun as a predicate.",
      },
    ],
  },
  {
    id: "h6-gongran-gongkai",
    words: [
      { hanzi: "公然", pinyin: "gōngrán", gloss: "openly, brazenly (disapproving)" },
      { hanzi: "公开", pinyin: "gōngkāi", gloss: "public, open; to make public" },
    ],
    explanation:
      "公开 is neutral and versatile: an adjective 'public, open' (公开的会议), a verb 'to make public' (公开信息), or an adverb (公开道歉). 公然 is only an adverb and is always critical: someone does something wrong brazenly, in full view (公然违反, 公然撒谎). If the action is wrongdoing and the writer disapproves, choose 公然; if the word must be an adjective or take an object, choose 公开.",
    questions: [
      {
        sentence: "这伙人竟然在光天化日之下＿＿抢劫。",
        answer: "公然",
        why: "Brazen wrongdoing condemned by the speaker (竟然, 光天化日) calls for 公然.",
      },
      {
        sentence: "公司决定向社会＿＿财务信息。",
        answer: "公开",
        why: "The blank is a verb with an object (财务信息), which only 公开 can be.",
      },
      {
        sentence: "这次会议是＿＿的，任何人都可以参加。",
        answer: "公开",
        why: "是……的 needs the adjective 'public', which is 公开; 公然 is only an adverb.",
      },
      {
        sentence: "他＿＿违反公司规定，事后还拒不认错。",
        answer: "公然",
        why: "Flouting the rules in plain sight and refusing to admit it is brazen misconduct, the meaning of 公然.",
      },
    ],
  },
  {
    id: "h6-yibian-yimian",
    words: [
      { hanzi: "以便", pinyin: "yǐbiàn", gloss: "so that, in order to" },
      { hanzi: "以免", pinyin: "yǐmiǎn", gloss: "so as to avoid, lest" },
    ],
    explanation:
      "Both open a second clause that gives the purpose of the first. 以便 introduces something you want to make easier or possible: 早点出发，以便赶上火车. 以免 introduces something you want to prevent: 带上雨伞，以免淋雨. If what follows is wanted, choose 以便; if it is a bad outcome to avoid, choose 以免.",
    questions: [
      {
        sentence: "请留下您的电话号码，＿＿我们及时与您联系。",
        answer: "以便",
        why: "Being able to contact you is the goal being made possible, so 以便.",
      },
      {
        sentence: "开车时不要打电话，＿＿发生事故。",
        answer: "以免",
        why: "An accident is the bad outcome being prevented, so 以免.",
      },
      {
        sentence: "他把重要的内容都记在本子上，＿＿以后复习。",
        answer: "以便",
        why: "Reviewing later is the purpose the notes make easier, which is 以便.",
      },
      {
        sentence: "出门前要检查一下门窗，＿＿家中被盗。",
        answer: "以免",
        why: "A burglary is what checking the windows is meant to prevent, which is 以免.",
      },
    ],
  },
  {
    id: "h6-weimian-bumian",
    words: [
      { hanzi: "未免", pinyin: "wèimiǎn", gloss: "rather too, a bit much (critical)" },
      { hanzi: "不免", pinyin: "bùmiǎn", gloss: "unavoidably, naturally" },
    ],
    explanation:
      "未免 gives the speaker's critical judgement that something goes too far, usually as 未免太……了 or 未免有点儿: 你未免太小气了. 不免 says that a reaction follows naturally from a situation, often a feeling: 第一次上台，不免有些紧张. Criticism → 未免; a natural consequence → 不免.",
    questions: [
      {
        sentence: "为这么点儿小事就发脾气，你也＿＿太小气了。",
        answer: "未免",
        why: "The speaker criticises the behaviour as excessive with 未免太……了.",
      },
      {
        sentence: "第一次在这么多人面前讲话，他＿＿有些紧张。",
        answer: "不免",
        why: "Nervousness follows naturally from the situation, which is 不免.",
      },
      {
        sentence: "一个人在国外生活，逢年过节＿＿会想家。",
        answer: "不免",
        why: "Missing home at festivals is a natural reaction, not a criticism, so 不免.",
      },
      {
        sentence: "这个价格＿＿太高了，我们再去别家看看吧。",
        answer: "未免",
        why: "Judging a price as too high is a criticism expressed with 未免太……了.",
      },
    ],
  },
  {
    id: "h6-shangqie-hekuang",
    words: [
      { hanzi: "尚且", pinyin: "shàngqiě", gloss: "even (… let alone)" },
      { hanzi: "何况", pinyin: "hékuàng", gloss: "let alone, much less" },
    ],
    explanation:
      "These two split one pattern between them: A尚且……，何况B呢？ 'even A…, let alone B'. 尚且 comes after the extreme case in the first clause, often with 连 (连大人尚且搬不动). 何况 opens the second clause with the easier case and usually ends in 呢 and a question mark. First clause → 尚且; second clause → 何况.",
    questions: [
      {
        sentence: "这么重的箱子，大人＿＿搬不动，何况孩子呢？",
        answer: "尚且",
        why: "The blank follows the extreme case in the first clause, the slot 尚且 fills before 何况.",
      },
      {
        sentence: "连他这样的高手都输了，＿＿我们这些新手呢？",
        answer: "何况",
        why: "The second clause opens with the weaker case and ends in 呢, which is 何况.",
      },
      {
        sentence: "这个问题连老师＿＿回答不了，我怎么会知道呢？",
        answer: "尚且",
        why: "连……尚且 marks the extreme case in the first clause; 何况 cannot follow the subject here.",
      },
      {
        sentence: "他平时都常常迟到，＿＿今天下这么大的雨呢？",
        answer: "何况",
        why: "何况……呢 introduces the case where lateness is even more likely.",
      },
    ],
  },
  {
    id: "h6-guran-suiran",
    words: [
      { hanzi: "固然", pinyin: "gùrán", gloss: "admittedly, it is true that" },
      { hanzi: "虽然", pinyin: "suīrán", gloss: "although" },
    ],
    explanation:
      "虽然 marks a plain concession, can stand before or after the subject, and is followed by 但是 or 可是. 固然 grants that something is true in order to make a further point; it sits after the subject, and besides 但是 it can be followed by 也 to grant that both sides have merit (A固然好，B也不错). If the next clause adds 也 rather than turning, choose 固然; if the blank comes before the subject, choose 虽然.",
    questions: [
      {
        sentence: "＿＿他工作很忙，但他每天都抽时间陪孩子读书。",
        answer: "虽然",
        why: "The blank comes before the subject 他, where 虽然 can stand but 固然 normally cannot.",
      },
      {
        sentence: "坐飞机＿＿快，坐火车也有坐火车的好处。",
        answer: "固然",
        why: "固然……也 grants one option's merit while defending the other; 虽然 does not pair with 也 this way.",
      },
      {
        sentence: "你的想法＿＿有道理，他的意见也不是没有道理。",
        answer: "固然",
        why: "Granting that both views have merit is the 固然……也 pattern.",
      },
      {
        sentence: "＿＿天下着大雨，可是比赛还是照常进行了。",
        answer: "虽然",
        why: "The blank opens the sentence before its subject 天 in a plain concession with 可是, which is 虽然.",
      },
    ],
  },
  {
    id: "h6-yiran-yiran2",
    words: [
      { hanzi: "毅然", pinyin: "yìrán", gloss: "resolutely, without hesitation" },
      { hanzi: "依然", pinyin: "yīrán", gloss: "still, as before" },
    ],
    explanation:
      "The two sound almost alike but mean different things. 毅然 describes a bold decision made firmly despite risk or cost, and goes before verbs such as 决定, 放弃, 离开: 毅然辞职. 依然 means 'still, as before': something has not changed (依然很冷, 依然如故). A decision → 毅然; an unchanged state → 依然.",
    questions: [
      {
        sentence: "为了实现自己的梦想，他＿＿辞去了高薪的工作。",
        answer: "毅然",
        why: "Quitting a well-paid job for a dream is a bold, resolute decision, which is 毅然.",
      },
      {
        sentence: "已经是三月了，天气＿＿很冷。",
        answer: "依然",
        why: "The weather has not changed, which is 依然 'still'.",
      },
      {
        sentence: "尽管家人都反对，她还是＿＿决定去西部支教。",
        answer: "毅然",
        why: "A firm decision made against opposition is 毅然决定.",
      },
      {
        sentence: "十年过去了，他＿＿住在那间小房子里。",
        answer: "依然",
        why: "Still living in the same place after ten years is an unchanged state, so 依然.",
      },
    ],
  },
  {
    id: "h6-fabu-banbu-gongbu",
    words: [
      { hanzi: "发布", pinyin: "fābù", gloss: "to release, to issue (news, products, warnings)" },
      { hanzi: "颁布", pinyin: "bānbù", gloss: "to promulgate (laws, regulations)" },
      { hanzi: "公布", pinyin: "gōngbù", gloss: "to make public, to announce" },
    ],
    explanation:
      "颁布 is reserved for a government or authority issuing laws and regulations: 颁布法律, 颁布条例. 发布 is releasing news, information, warnings or new products: 发布新闻, 发布预警, 发布新产品. 公布 is making known something previously hidden, such as results, names or the truth: 公布成绩, 公布于众.",
    questions: [
      {
        sentence: "国家于去年＿＿了新的环境保护法。",
        answer: "颁布",
        why: "A law issued by the state is 颁布.",
      },
      {
        sentence: "气象台＿＿了暴雨预警，提醒市民注意安全。",
        answer: "发布",
        why: "Issuing a weather warning is 发布预警.",
      },
      {
        sentence: "这家公司下个月将＿＿一款新手机。",
        answer: "发布",
        why: "Launching a new product is 发布.",
      },
      {
        sentence: "经过调查，这件事的真相终于被＿＿于众。",
        answer: "公布",
        why: "公布于众 'made known to all' is a fixed phrase for revealing what was hidden.",
      },
    ],
  },
  {
    id: "h6-caina-jiena",
    words: [
      { hanzi: "采纳", pinyin: "cǎinà", gloss: "to adopt (suggestions, opinions)" },
      { hanzi: "接纳", pinyin: "jiēnà", gloss: "to admit, to accept (people, members)" },
    ],
    explanation:
      "采纳 means accepting and acting on a suggestion, opinion or plan: 采纳建议, 采纳意见. 接纳 means accepting a person or group into a place or group, or accepting someone emotionally: 接纳新成员, 接纳他. Ideas are 采纳; people are 接纳.",
    questions: [
      {
        sentence: "经理＿＿了我的建议，决定调整上班时间。",
        answer: "采纳",
        why: "A suggestion is adopted with 采纳建议.",
      },
      {
        sentence: "这个俱乐部今年又＿＿了二十名新会员。",
        answer: "接纳",
        why: "Admitting new members is 接纳.",
      },
      {
        sentence: "刚到新学校时，他担心同学们不愿意＿＿他。",
        answer: "接纳",
        why: "Accepting a person into the group is 接纳; 采纳 is only for ideas.",
      },
      {
        sentence: "大会最终＿＿了专家组提出的方案。",
        answer: "采纳",
        why: "A proposed plan is adopted with 采纳.",
      },
    ],
  },
  {
    id: "h6-shicha-kaocha",
    words: [
      { hanzi: "视察", pinyin: "shìchá", gloss: "to inspect (by a superior)" },
      { hanzi: "考察", pinyin: "kǎochá", gloss: "to investigate on the spot; fieldwork" },
    ],
    explanation:
      "视察 is when a leader or official visits a lower level to inspect its work: 领导视察工厂. 考察 is studying a place or question on the spot to understand it, as in research or before a business decision: 实地考察, 考察市场. If a superior is checking on subordinates, choose 视察; if someone is investigating to learn, choose 考察.",
    questions: [
      {
        sentence: "市长昨天到这所学校＿＿了工作。",
        answer: "视察",
        why: "A mayor inspecting a school's work is a superior's visit, which is 视察.",
      },
      {
        sentence: "科学家们前往南极进行科学＿＿。",
        answer: "考察",
        why: "Scientific fieldwork is 科学考察.",
      },
      {
        sentence: "公司派他去东南亚＿＿当地的市场。",
        answer: "考察",
        why: "Investigating a market before doing business is 考察.",
      },
      {
        sentence: "省领导下周将来我们工厂＿＿。",
        answer: "视察",
        why: "Provincial leaders visiting a factory to inspect it is 视察.",
      },
    ],
  },
  {
    id: "h6-tuice-yuce",
    words: [
      { hanzi: "推测", pinyin: "tuīcè", gloss: "to infer, to deduce" },
      { hanzi: "预测", pinyin: "yùcè", gloss: "to forecast, to predict" },
    ],
    explanation:
      "预测 is always about the future: 预测天气, 预测地震, 预测市场走势. 推测 is working out something unknown from clues, usually about the past or the present: 据推测，这座古墓已有两千年的历史. Future → 预测; reasoning from evidence about what is or was → 推测.",
    questions: [
      {
        sentence: "到目前为止，地震还很难提前＿＿。",
        answer: "预测",
        why: "Saying in advance that an earthquake will happen is forecasting, which is 预测.",
      },
      {
        sentence: "根据出土的文物，专家＿＿这座古墓已有两千多年的历史。",
        answer: "推测",
        why: "Working out a tomb's age from evidence is inference about the past, which is 推测.",
      },
      {
        sentence: "从他说话的口音来＿＿，他应该是南方人。",
        answer: "推测",
        why: "Deducing where someone is from by their accent is 推测.",
      },
      {
        sentence: "人工智能可以帮助我们＿＿未来几天的交通流量。",
        answer: "预测",
        why: "Traffic in the coming days is in the future, so 预测.",
      },
    ],
  },
  {
    id: "h6-wanqiang-wangu",
    words: [
      { hanzi: "顽强", pinyin: "wánqiáng", gloss: "tenacious, indomitable (praise)" },
      { hanzi: "顽固", pinyin: "wángù", gloss: "stubborn, obstinate (criticism)" },
    ],
    explanation:
      "Both mean refusing to give in, but the attitude is opposite. 顽强 praises someone who keeps fighting against hardship: 顽强地生存, 顽强的意志. 顽固 criticises someone who will not change mistaken ideas, and also describes illnesses or habits that are hard to get rid of. Admirable persistence → 顽强; stubborn refusal to change → 顽固.",
    questions: [
      {
        sentence: "这棵小草在石头缝里＿＿地生长着。",
        answer: "顽强",
        why: "Growing against harsh conditions is admirable persistence, which is 顽强.",
      },
      {
        sentence: "他非常＿＿，别人怎么劝都不肯改变自己的看法。",
        answer: "顽固",
        why: "Refusing to change one's views no matter what is criticised as 顽固.",
      },
      {
        sentence: "凭着＿＿的意志，他最终战胜了病魔。",
        answer: "顽强",
        why: "顽强的意志 'indomitable will' is praise for fighting on.",
      },
      {
        sentence: "这种皮肤病很＿＿，治了好几年都没好。",
        answer: "顽固",
        why: "An illness that is hard to cure is described as 顽固.",
      },
    ],
  },
  {
    id: "h6-xiaochu-jiechu-paichu",
    words: [
      { hanzi: "消除", pinyin: "xiāochú", gloss: "to eliminate, to dispel" },
      { hanzi: "解除", pinyin: "jiěchú", gloss: "to remove, to terminate (a contract, an alarm)" },
      { hanzi: "排除", pinyin: "páichú", gloss: "to rule out; to clear away (obstacles)" },
    ],
    explanation:
      "消除 makes something harmful or unpleasant disappear: 消除误会, 消除疲劳, 消除隐患. 解除 ends a formal state or arrangement: 解除合同, 解除警报, 解除职务. 排除 clears obstacles away or rules something out: 排除困难, 排除故障, 排除……的可能.",
    questions: [
      {
        sentence: "他们俩好好谈了一次，终于＿＿了误会。",
        answer: "消除",
        why: "Clearing up a misunderstanding is 消除误会.",
      },
      {
        sentence: "由于对方违约，公司决定＿＿合同。",
        answer: "解除",
        why: "Ending a contract, a formal arrangement, is 解除合同.",
      },
      {
        sentence: "经过调查，警方已经＿＿了他杀的可能。",
        answer: "排除",
        why: "Ruling out a possibility is 排除……的可能.",
      },
      {
        sentence: "洗个热水澡可以＿＿一天的疲劳。",
        answer: "消除",
        why: "Making tiredness go away is 消除疲劳.",
      },
    ],
  },
  {
    id: "h6-weichi-weihu",
    words: [
      { hanzi: "维持", pinyin: "wéichí", gloss: "to maintain, to keep going" },
      { hanzi: "维护", pinyin: "wéihù", gloss: "to safeguard, to defend" },
    ],
    explanation:
      "维持 keeps something going so that it does not stop or collapse, often only just: 维持生活, 维持生命, 维持现状. 维护 protects something from being harmed or violated: 维护权益, 维护利益, 维护尊严. Keeping something going → 维持; defending it against damage → 维护.",
    questions: [
      {
        sentence: "他每个月的工资只够＿＿基本生活。",
        answer: "维持",
        why: "Just keeping daily life going is 维持生活.",
      },
      {
        sentence: "消费者应该学会用法律＿＿自己的合法权益。",
        answer: "维护",
        why: "Rights are defended against violation with 维护权益.",
      },
      {
        sentence: "病人现在完全靠机器＿＿生命。",
        answer: "维持",
        why: "Keeping a life going is 维持生命; 维护 is for protecting something from harm.",
      },
      {
        sentence: "作为外交官，他时刻不忘＿＿国家的尊严。",
        answer: "维护",
        why: "Dignity is protected from being harmed, which is 维护尊严.",
      },
    ],
  },
  {
    id: "h6-longzhong-zhengzhong",
    words: [
      { hanzi: "隆重", pinyin: "lóngzhòng", gloss: "grand, ceremonious" },
      { hanzi: "郑重", pinyin: "zhèngzhòng", gloss: "serious, solemn (in manner)" },
    ],
    explanation:
      "隆重 describes events held on a grand scale with ceremony: 隆重的婚礼, 隆重举行, 隆重开幕. 郑重 describes an earnest, serious manner of saying or doing something: 郑重声明, 郑重承诺, 郑重其事. Big occasions → 隆重; serious statements → 郑重.",
    questions: [
      {
        sentence: "开幕式在市体育馆＿＿举行。",
        answer: "隆重",
        why: "A ceremony held with grandeur is 隆重举行.",
      },
      {
        sentence: "本公司在此＿＿声明：我们从未委托任何个人收取费用。",
        answer: "郑重",
        why: "郑重声明 'solemnly declare' describes the serious manner of a statement.",
      },
      {
        sentence: "学校为这位老教授举办了＿＿的退休仪式。",
        answer: "隆重",
        why: "A grand ceremony is 隆重的仪式.",
      },
      {
        sentence: "他＿＿地向大家承诺，一定按时完成任务。",
        answer: "郑重",
        why: "Making a promise earnestly is 郑重地承诺.",
      },
    ],
  },
  {
    id: "h6-heai-hemu",
    words: [
      { hanzi: "和蔼", pinyin: "hé'ǎi", gloss: "kindly, amiable (of a person)" },
      { hanzi: "和睦", pinyin: "hémù", gloss: "harmonious (of relationships)" },
    ],
    explanation:
      "和蔼 describes one person's gentle, kindly manner toward others, especially an older person or a teacher: 和蔼可亲, 态度和蔼. 和睦 describes good relations between people, such as family members or neighbours: 家庭和睦, 和睦相处. One person's manner → 和蔼; relations between people → 和睦.",
    questions: [
      {
        sentence: "我们的校长是一位＿＿可亲的老人。",
        answer: "和蔼",
        why: "和蔼可亲 describes one person's kindly manner.",
      },
      {
        sentence: "邻里之间应该＿＿相处，互相帮助。",
        answer: "和睦",
        why: "Neighbours getting along is a relationship, which is 和睦相处.",
      },
      {
        sentence: "她说话的语气总是那么＿＿，孩子们都喜欢她。",
        answer: "和蔼",
        why: "A gentle tone of voice belongs to one person's manner, which is 和蔼.",
      },
      {
        sentence: "他们家三代同堂，一家人＿＿，从来不吵架。",
        answer: "和睦",
        why: "A family living in harmony describes relations between its members, which is 和睦.",
      },
    ],
  },
  {
    id: "h6-fanhua-fanrong",
    words: [
      { hanzi: "繁华", pinyin: "fánhuá", gloss: "bustling, busy (streets, districts)" },
      { hanzi: "繁荣", pinyin: "fánróng", gloss: "prosperous; to make prosper" },
    ],
    explanation:
      "繁华 describes a busy, lively urban place full of shops and people: 繁华的街道, 繁华地段. 繁荣 describes the prosperity of an economy, market, culture or country, and it can be a verb meaning 'to make flourish': 经济繁荣, 繁荣市场. Busy streets → 繁华; thriving economies and culture → 繁荣.",
    questions: [
      {
        sentence: "这家店位于市中心最＿＿的街道上。",
        answer: "繁华",
        why: "A busy city-centre street is 繁华.",
      },
      {
        sentence: "改革开放以后，这里的经济越来越＿＿。",
        answer: "繁荣",
        why: "A thriving economy is 繁荣.",
      },
      {
        sentence: "政府出台了一系列措施来＿＿文化市场。",
        answer: "繁荣",
        why: "As a verb with an object, 'to make flourish', only 繁荣 works.",
      },
      {
        sentence: "每到夜晚，这个商业区灯火辉煌，十分＿＿。",
        answer: "繁华",
        why: "A brightly lit, busy shopping district is 繁华.",
      },
    ],
  },
  {
    id: "h6-chenzhong-fanzhong",
    words: [
      { hanzi: "沉重", pinyin: "chénzhòng", gloss: "heavy (weight, mood, a blow)" },
      { hanzi: "繁重", pinyin: "fánzhòng", gloss: "heavy, onerous (workload)" },
    ],
    explanation:
      "繁重 means a workload is large and demanding: 任务繁重, 繁重的家务. 沉重 means heavy in weight or, figuratively, heavy on the heart: 沉重的箱子, 心情沉重, 沉重的打击. A lot of work → 繁重; weight, grief or a blow → 沉重.",
    questions: [
      {
        sentence: "听到这个坏消息，大家的心情都很＿＿。",
        answer: "沉重",
        why: "A heavy heart is 心情沉重.",
      },
      {
        sentence: "他每天的工作任务十分＿＿，常常加班到深夜。",
        answer: "繁重",
        why: "A demanding workload is 任务繁重.",
      },
      {
        sentence: "这次失败对他来说是一个＿＿的打击。",
        answer: "沉重",
        why: "A heavy blow is 沉重的打击.",
      },
      {
        sentence: "妈妈白天上班，晚上还要做＿＿的家务。",
        answer: "繁重",
        why: "A large amount of housework is 繁重的家务.",
      },
    ],
  },
  {
    id: "h6-zuyi-zugou",
    words: [
      { hanzi: "足以", pinyin: "zúyǐ", gloss: "enough to, sufficient to" },
      { hanzi: "足够", pinyin: "zúgòu", gloss: "enough, sufficient" },
    ],
    explanation:
      "足以 must be followed by a verb phrase and means 'is enough to', mostly in formal writing: 足以证明, 足以说明问题. 足够 is an adjective: it can be the predicate (时间足够), modify a noun (足够的钱), or follow 很. If a formal verb such as 证明 follows the blank, choose 足以; if the word modifies a noun or ends the clause, choose 足够.",
    questions: [
      {
        sentence: "这些事实＿＿证明他是无辜的。",
        answer: "足以",
        why: "足以证明 'is enough to prove' is the formal 足以 + verb pattern.",
      },
      {
        sentence: "别着急，我们还有＿＿的时间。",
        answer: "足够",
        why: "Modifying a noun with 的 needs the adjective 足够.",
      },
      {
        sentence: "他在医学上的成就＿＿载入史册。",
        answer: "足以",
        why: "The formal verb phrase 载入史册 follows, which takes 足以.",
      },
      {
        sentence: "准备的食物很＿＿，大家放心吃吧。",
        answer: "足够",
        why: "After 很 the blank needs an adjective, which is 足够.",
      },
    ],
  },
  {
    id: "h6-yuyi-jiyu",
    words: [
      { hanzi: "予以", pinyin: "yǔyǐ", gloss: "to give, to carry out (formal, + verb)" },
      { hanzi: "给予", pinyin: "jǐyǔ", gloss: "to give, to grant" },
    ],
    explanation:
      "Both are formal 'give', but they are built differently. 予以 is followed directly by a two-syllable verb and is the one to use when the action cannot really be 'given', such as 否认, 澄清 or 拒绝. 给予 can take the person directly (给予他们帮助) or a noun phrase with a modifier (给予很大的支持). If a person or a modified noun follows the blank, choose 给予.",
    questions: [
      {
        sentence: "对于网上的传言，公司已经正式＿＿否认。",
        answer: "予以",
        why: "A denial is not something handed over, so only 予以 + 否认 works.",
      },
      {
        sentence: "政府对受灾群众＿＿了很大的帮助。",
        answer: "给予",
        why: "A modified noun (很大的帮助) follows, which 给予 can take and 予以 cannot.",
      },
      {
        sentence: "老师经常＿＿学生鼓励和支持。",
        answer: "给予",
        why: "The person 学生 comes straight after the blank, which only 给予 allows.",
      },
      {
        sentence: "对于这类不实报道，有关部门将＿＿澄清。",
        answer: "予以",
        why: "予以澄清 'issue a clarification' pairs 予以 with an action verb that cannot be given.",
      },
    ],
  },
  {
    id: "h6-yanshi-yinman",
    words: [
      { hanzi: "掩饰", pinyin: "yǎnshì", gloss: "to cover up, to mask (feelings, faults)" },
      { hanzi: "隐瞒", pinyin: "yǐnmán", gloss: "to conceal, to keep (facts) from someone" },
    ],
    explanation:
      "隐瞒 means keeping facts from people by not telling them: 隐瞒真相, 隐瞒病情, 向……隐瞒. 掩饰 means hiding feelings or faults behind a false front, through how you act: 掩饰紧张, 掩饰失望, 掩饰错误. Withholding information → 隐瞒; putting on an act → 掩饰.",
    questions: [
      {
        sentence: "他笑了笑，想＿＿内心的紧张。",
        answer: "掩饰",
        why: "Hiding nervousness behind a smile is putting on a front, which is 掩饰.",
      },
      {
        sentence: "医生没有向病人＿＿病情。",
        answer: "隐瞒",
        why: "Keeping a diagnosis from a patient is withholding information, which is 隐瞒.",
      },
      {
        sentence: "她努力＿＿着自己的失望，装作若无其事的样子。",
        answer: "掩饰",
        why: "Acting as if nothing happened to cover disappointment is 掩饰.",
      },
      {
        sentence: "他在简历中＿＿了自己的真实年龄。",
        answer: "隐瞒",
        why: "Not stating a fact such as one's real age is 隐瞒.",
      },
    ],
  },
  {
    id: "h6-sunhuai-pohuai-sunhai",
    words: [
      { hanzi: "损坏", pinyin: "sǔnhuài", gloss: "to damage (objects)" },
      { hanzi: "破坏", pinyin: "pòhuài", gloss: "to destroy, to disrupt (environment, order)" },
      { hanzi: "损害", pinyin: "sǔnhài", gloss: "to harm (health, interests, reputation)" },
    ],
    explanation:
      "损坏 is physical damage to an object so that it no longer works properly: 损坏公物, 如有损坏. 破坏 is serious destruction or disruption, often deliberate, of the environment, structures, order or unity: 破坏环境, 破坏秩序. 损害 is harm to abstract things such as health, interests or reputation: 损害健康, 损害利益.",
    questions: [
      {
        sentence: "长期熬夜会严重＿＿身体健康。",
        answer: "损害",
        why: "Health is harmed, an abstract loss, which is 损害健康.",
      },
      {
        sentence: "借阅的图书如有＿＿，需要按价赔偿。",
        answer: "损坏",
        why: "Physical damage to a book is 损坏; 如有损坏 is a common notice phrase.",
      },
      {
        sentence: "有人在场外故意＿＿比赛秩序，被保安带走了。",
        answer: "破坏",
        why: "Deliberately disrupting order is 破坏秩序.",
      },
      {
        sentence: "这种虚假宣传＿＿了消费者的利益。",
        answer: "损害",
        why: "Interests are harmed with 损害利益.",
      },
    ],
  },
  {
    id: "h6-fengxian-gongxian",
    words: [
      { hanzi: "奉献", pinyin: "fèngxiàn", gloss: "to devote, to give selflessly" },
      { hanzi: "贡献", pinyin: "gòngxiàn", gloss: "contribution; to contribute" },
    ],
    explanation:
      "贡献 is the usual word for a contribution, especially as a noun after 做出 or 有: 做出巨大贡献, 对……有贡献. 奉献 stresses giving oneself selflessly, such as one's youth, life or love, with no thought of return: 奉献青春, 无私奉献. 做出 takes 贡献; 无私 goes with 奉献.",
    questions: [
      {
        sentence: "他为中国的航天事业做出了巨大的＿＿。",
        answer: "贡献",
        why: "做出贡献 'make a contribution' is the fixed collocation.",
      },
      {
        sentence: "她把自己的青春＿＿给了山区的孩子们。",
        answer: "奉献",
        why: "Giving one's youth selflessly to others is 奉献青春.",
      },
      {
        sentence: "这些志愿者默默地无私＿＿，从不求任何回报。",
        answer: "奉献",
        why: "无私奉献 'selfless devotion' is the set phrase.",
      },
      {
        sentence: "这项发明对人类社会有很大的＿＿。",
        answer: "贡献",
        why: "对……有贡献 'contributes to' uses the noun 贡献.",
      },
    ],
  },
  {
    id: "h6-mangmu-mangran",
    words: [
      { hanzi: "盲目", pinyin: "mángmù", gloss: "blind(ly), without thinking" },
      { hanzi: "茫然", pinyin: "mángrán", gloss: "at a loss, bewildered" },
    ],
    explanation:
      "盲目 describes acting without thought or understanding, like following a crowd: 盲目跟风, 盲目投资, 盲目自信. 茫然 describes the feeling of being lost and not knowing what to do or what is going on: 感到茫然, 一脸茫然. Thoughtless action → 盲目; a bewildered feeling → 茫然.",
    questions: [
      {
        sentence: "买东西要根据自己的需要，不要＿＿跟风。",
        answer: "盲目",
        why: "Following the crowd without thinking is 盲目跟风.",
      },
      {
        sentence: "刚毕业的时候，他对未来感到一片＿＿。",
        answer: "茫然",
        why: "Feeling lost about the future is 茫然.",
      },
      {
        sentence: "股市有风险，投资千万不能＿＿。",
        answer: "盲目",
        why: "Investing without careful thought is 盲目.",
      },
      {
        sentence: "听了老师的问题，他一脸＿＿，不知道该怎么回答。",
        answer: "茫然",
        why: "一脸茫然 describes a bewildered look.",
      },
    ],
  },
  {
    id: "h6-tiliang-liangjie",
    words: [
      { hanzi: "体谅", pinyin: "tǐliàng", gloss: "to be understanding, to show consideration" },
      { hanzi: "谅解", pinyin: "liàngjiě", gloss: "to forgive; understanding (after a conflict)" },
    ],
    explanation:
      "体谅 means putting yourself in someone's position and being considerate of their difficulties: 体谅父母的辛苦. 谅解 means forgiving or accepting someone after a misunderstanding, offence or inconvenience, and it is common as a noun: 请您谅解, 达成谅解. Being considerate → 体谅; forgiving after a problem → 谅解.",
    questions: [
      {
        sentence: "孩子长大了，开始懂得＿＿父母的辛苦了。",
        answer: "体谅",
        why: "Being considerate of parents' hardship is 体谅.",
      },
      {
        sentence: "经过双方的沟通，他们终于达成了＿＿。",
        answer: "谅解",
        why: "达成谅解 'reach an understanding' after a dispute uses 谅解.",
      },
      {
        sentence: "施工给您带来不便，敬请＿＿。",
        answer: "谅解",
        why: "Asking forgiveness for an inconvenience is 敬请谅解.",
      },
      {
        sentence: "他很会＿＿别人，从不给大家添麻烦。",
        answer: "体谅",
        why: "Being considerate of others in everyday life is 体谅.",
      },
    ],
  },
  {
    id: "h6-jianlou-jianpu",
    words: [
      { hanzi: "简陋", pinyin: "jiǎnlòu", gloss: "crude, shabby (facilities)" },
      { hanzi: "简朴", pinyin: "jiǎnpǔ", gloss: "simple and plain (lifestyle)" },
    ],
    explanation:
      "简陋 describes buildings, rooms or equipment that are crude and lack basic things, a negative judgement: 设备简陋, 简陋的教室. 简朴 praises a simple, frugal way of living or dressing: 生活简朴, 衣着简朴. Poor conditions → 简陋; a modest lifestyle → 简朴.",
    questions: [
      {
        sentence: "这所山村小学的条件十分＿＿，连一间像样的教室都没有。",
        answer: "简陋",
        why: "Facilities lacking even a proper classroom are 简陋.",
      },
      {
        sentence: "他虽然很富有，但生活一直很＿＿。",
        answer: "简朴",
        why: "A frugal lifestyle by choice is praised as 简朴.",
      },
      {
        sentence: "实验室的设备太＿＿了，很多实验根本做不了。",
        answer: "简陋",
        why: "Inadequate equipment is 设备简陋.",
      },
      {
        sentence: "老人衣着＿＿，待人却十分热情。",
        answer: "简朴",
        why: "Plain, modest dress is 衣着简朴.",
      },
    ],
  },
];
