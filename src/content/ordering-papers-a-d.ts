import type { OrderingItem } from "./types";

/** From the learner's own papers: 组词成句 (A)–(D). */
export const orderingPapersAD: OrderingItem[] = [
  // ── 组词成句 (A) ────────────────────────────────────────────────
  {
    id: "p-A-01",
    source: "组词成句 (A) 1",
    chunks: ["录取", "结果", "将在", "月底", "公布"],
    translation: "The admission results will be announced at the end of the month.",
    point: "Time phrase after 将在, before the verb",
    explanation:
      "录取 modifies 结果 directly to make the subject 录取结果. 将在 + time + verb is the formal future: the time 月底 sits between 将在 and the verb 公布.",
  },
  {
    id: "p-A-02",
    source: "组词成句 (A) 2",
    chunks: ["他", "承认自己", "缺乏", "自信"],
    translation: "He admits that he lacks self-confidence.",
    point: "Clause as object of 承认",
    explanation:
      "承认 takes a whole clause as its object: 自己 + 缺乏 + 自信. 缺乏 is a verb that needs an abstract noun object, so 自信 comes last.",
  },
  {
    id: "p-A-03",
    source: "组词成句 (A) 3",
    chunks: ["打折商品", "不再", "参加其他优惠", "活动"],
    translation: "Discounted goods are no longer eligible for other promotions.",
    point: "Adverb before verb",
    explanation:
      "The subject is 打折商品. The adverb 不再 goes before the verb 参加, and 其他优惠 modifies 活动 to form the object 其他优惠活动.",
  },
  {
    id: "p-A-04",
    source: "组词成句 (A) 4",
    chunks: ["汽油的", "价格", "又", "上涨", "了"],
    translation: "The price of petrol has gone up again.",
    point: "Adverb before verb; sentence-final 了",
    explanation:
      "汽油的 must stand directly before the noun it modifies, 价格. The adverb 又 ('again') goes before the verb 上涨, and 了 closes the sentence to mark the change.",
  },
  {
    id: "p-A-05",
    source: "组词成句 (A) 5",
    chunks: ["这两家", "公司的待遇", "差别", "很大"],
    translation: "The pay and benefits at these two companies differ greatly.",
    point: "Measure word + noun; subject–predicate predicate",
    explanation:
      "这两家 needs a noun after its measure word 家, so it goes before 公司. The topic 这两家公司的待遇 is followed by a small subject–predicate phrase: 差别 + 很大.",
  },
  {
    id: "p-A-06",
    source: "组词成句 (A) 6",
    chunks: ["那个", "小姑娘", "非常", "孝顺"],
    translation: "That little girl is very devoted to her parents.",
    point: "Degree adverb before adjective",
    explanation:
      "Demonstrative + measure word (那个) comes before the noun 小姑娘. A degree adverb such as 非常 sits directly before the adjective 孝顺.",
  },
  {
    id: "p-A-07",
    source: "组词成句 (A) 7",
    chunks: ["请在", "前台", "办理入住", "手续"],
    translation: "Please check in at the front desk.",
    point: "在 + place before the verb",
    explanation:
      "A 在 + place phrase goes before the verb, so 前台 follows 请在. 办理 takes 入住手续 as its object, so 手续 comes last.",
  },
  {
    id: "p-A-08",
    source: "组词成句 (A) 8",
    chunks: ["这里还", "保留着一些古老", "的", "风俗习惯"],
    translation: "Some ancient customs are still preserved here.",
    point: "Attributive 的; existential V着",
    explanation:
      "Place + V着 + object describes what exists somewhere: 这里还保留着…. The adjective 古老 links to the noun with 的, so 的 sits between 古老 and 风俗习惯.",
  },
  {
    id: "p-A-09",
    source: "组词成句 (A) 9",
    chunks: ["请您", "主动", "出示", "证件"],
    translation: "Please show your ID without being asked.",
    point: "Adverbial before verb",
    explanation:
      "请您 opens a polite request. The manner word 主动 goes before the verb 出示, and the object 证件 follows the verb.",
  },
  {
    id: "p-A-10",
    source: "组词成句 (A) 10",
    chunks: ["这条", "牛仔裤", "一点儿", "都", "不结实"],
    translation: "These jeans are not durable at all.",
    point: "一点儿都不 + adjective",
    explanation:
      "一点儿都不 / 一点儿也不 + adjective means 'not … at all'; 都 always comes between 一点儿 and the negative. 这条 (measure word 条 for trousers) goes before 牛仔裤.",
  },

  // ── 组词成句 (B) ────────────────────────────────────────────────
  {
    id: "p-B-01",
    source: "组词成句 (B) 1",
    chunks: ["开幕式将于", "本月", "中旬", "举行"],
    translation: "The opening ceremony will be held in the middle of this month.",
    point: "将于 + time + verb",
    explanation:
      "将于 ('will, at') is followed by a time and then the verb. Larger time units come first, so 本月 precedes 中旬, and 举行 ends the sentence.",
  },
  {
    id: "p-B-02",
    source: "组词成句 (B) 2",
    chunks: ["这家企业在", "建筑", "行业", "很有名"],
    translation: "This company is well known in the construction industry.",
    point: "在 + scope before the predicate",
    explanation:
      "在 + 建筑行业 sets the scope and goes before the predicate 很有名. 建筑 modifies 行业 directly, so it comes first.",
  },
  {
    id: "p-B-03",
    source: "组词成句 (B) 3",
    chunks: ["他的", "情绪已经", "稳定", "下来", "了"],
    translation: "His mood has calmed down now.",
    point: "Directional complement 下来",
    explanation:
      "V/Adj + 下来 shows something settling into a stable state, so 下来 follows 稳定. 已经 goes before the predicate, and 了 closes the sentence.",
  },
  {
    id: "p-B-04",
    source: "组词成句 (B) 4",
    chunks: ["名片", "上", "有我的", "联系", "方式"],
    translation: "My contact details are on the business card.",
    point: "Existential 有 (place + 有 + thing)",
    explanation:
      "To say what is somewhere, use place + 有 + thing. The place is 名片上, and the thing is 我的联系方式, with 联系 modifying 方式.",
  },
  {
    id: "p-B-05",
    source: "组词成句 (B) 5",
    chunks: ["他提的", "方案", "值得我们", "参考"],
    translation: "The plan he proposed is worth our consideration.",
    point: "值得 + verb",
    explanation:
      "The subject is 他提的方案 (a clause + 的 modifying 方案). 值得 is followed by the verb phrase it praises: 值得我们参考.",
  },
  {
    id: "p-B-06",
    source: "组词成句 (B) 6",
    chunks: ["志愿者们", "受到了", "热烈的", "欢迎"],
    translation: "The volunteers were warmly welcomed.",
    point: "受到 + noun; attributive 的",
    explanation:
      "受到 ('receive') has a passive sense and takes the noun 欢迎 as its object. 热烈的 modifies 欢迎, so it sits directly before it.",
  },
  {
    id: "p-B-07",
    source: "组词成句 (B) 7",
    chunks: ["这只狐狸", "真是", "太狡猾", "了"],
    translation: "This fox really is too cunning.",
    point: "真是 + 太…了",
    explanation:
      "太 + adjective + 了 is a fixed exclamation, so 了 must end the sentence. The emphatic 真是 comes before the whole predicate 太狡猾了.",
  },
  {
    id: "p-B-08",
    source: "组词成句 (B) 8",
    chunks: ["谈判的成功", "给了他", "极大的", "鼓舞"],
    translation: "The success of the negotiations gave him a huge boost.",
    point: "给 + person + thing; attributive 的",
    explanation:
      "给 takes two objects: the person (他) and then the thing (鼓舞). 极大的 modifies 鼓舞, so it goes directly before it.",
  },
  {
    id: "p-B-09",
    source: "组词成句 (B) 9",
    chunks: ["你把", "数据", "再重新", "计算", "一遍"],
    translation: "Recalculate the data once more.",
    point: "把 sentence with verbal measure",
    explanation:
      "In a 把 sentence the object (数据) follows 把, then the adverbs 再重新, then the verb. The verb cannot stand bare, so the verbal measure 一遍 follows it.",
  },
  {
    id: "p-B-10",
    source: "组词成句 (B) 10",
    chunks: ["法院", "就", "在", "这座大厦的对面"],
    translation: "The court is right across from this building.",
    point: "就 + 在 + place",
    explanation:
      "Thing + 在 + place says where something is. 就 ('right, just') is an adverb, so it goes before the verb 在.",
  },

  // ── 组词成句 (C) ────────────────────────────────────────────────
  {
    id: "p-C-01",
    source: "组词成句 (C) 1",
    chunks: ["春节", "期间", "本店照常", "营业"],
    translation: "This shop is open as usual during the Spring Festival.",
    point: "Time phrase at the front",
    explanation:
      "春节期间 is a time phrase and can open the sentence before the subject 本店. 照常 is an adverb, so the verb 营业 follows it.",
  },
  {
    id: "p-C-02",
    source: "组词成句 (C) 2",
    chunks: ["非", "工作", "人员", "请勿入内"],
    translation: "Staff only. No entry for unauthorised persons.",
    point: "非 + noun (prefix 'non-')",
    explanation:
      "非 works like the prefix 'non-' and attaches to the whole noun 工作人员. The sign-style command 请勿入内 follows the person it addresses.",
  },
  {
    id: "p-C-03",
    source: "组词成句 (C) 3",
    chunks: ["那个小姑娘", "委屈得", "哭了", "起来"],
    translation: "The little girl felt so wronged that she started crying.",
    point: "Complement of degree with 得; V起来",
    explanation:
      "Adjective + 得 + result describes how far a feeling went: 委屈得哭了起来. 起来 marks the start of an action and attaches after 哭了.",
  },
  {
    id: "p-C-04",
    source: "组词成句 (C) 4",
    chunks: ["网上", "有", "很多", "免费资源", "可以", "利用"],
    translation: "There are many free resources online that you can use.",
    point: "Existential 有 + noun + verb phrase",
    explanation:
      "Place + 有 + thing says what exists there: 网上有很多免费资源. In a 有 sentence a verb phrase can follow the noun to say what it is for, so 可以利用 comes last.",
  },
  {
    id: "p-C-05",
    source: "组词成句 (C) 5",
    chunks: ["不要", "轻易", "否定", "自己"],
    translation: "Don't be quick to dismiss yourself.",
    point: "Negative imperative + adverb",
    explanation:
      "不要 starts a negative command. The adverb 轻易 ('lightly, rashly') goes before the verb 否定, and 自己 is its object.",
  },
  {
    id: "p-C-06",
    source: "组词成句 (C) 6",
    chunks: ["小狗", "朝他", "摇了", "摇尾巴"],
    translation: "The puppy wagged its tail at him.",
    point: "Verb reduplication V了V; 朝 + person",
    explanation:
      "A one-syllable verb doubles as V了V for a brief action: 摇了摇尾巴. The direction phrase 朝他 goes before the verb.",
  },
  {
    id: "p-C-07",
    source: "组词成句 (C) 7",
    chunks: ["请您", "登记", "一下", "个人", "信息"],
    translation: "Please register your personal details.",
    point: "Verb + 一下 + object",
    explanation:
      "一下 softens the request and comes right after the verb, before the object. 个人 modifies 信息 directly.",
  },
  {
    id: "p-C-08",
    source: "组词成句 (C) 8",
    chunks: ["此次展览", "将", "持续", "至", "4月中旬"],
    translation: "This exhibition will run until mid-April.",
    point: "将 + verb + 至 + time",
    explanation:
      "将 ('will') goes before the verb 持续. 至 ('until') follows the verb as a complement and is followed by the end time 4月中旬.",
  },
  {
    id: "p-C-09",
    source: "组词成句 (C) 9",
    chunks: ["两个队的", "差距", "开始", "逐渐缩小"],
    translation: "The gap between the two teams has begun to narrow.",
    point: "开始 + verb phrase",
    explanation:
      "两个队的 modifies 差距 to form the subject. 开始 takes a verb phrase as its object, so 逐渐缩小 follows it.",
  },
  {
    id: "p-C-10",
    source: "组词成句 (C) 10",
    chunks: ["营业执照", "的", "办理手续", "很", "麻烦"],
    translation: "The procedure for getting a business licence is very troublesome.",
    point: "Attributive 的; 很 + adjective",
    explanation:
      "营业执照的办理手续 is the subject, with 的 linking the two nouns. The adjective predicate 麻烦 takes 很 before it.",
  },

  // ── 组词成句 (D) ────────────────────────────────────────────────
  {
    id: "p-D-01",
    source: "组词成句 (D) 1",
    chunks: ["幸亏你", "及时", "发现了合同里的", "错误"],
    translation: "Luckily you spotted the mistake in the contract in time.",
    point: "Adverb before verb; attributive 的",
    explanation:
      "The adverb 及时 goes before the verb 发现. 合同里的 modifies 错误, so 错误 comes directly after it.",
  },
  {
    id: "p-D-02",
    source: "组词成句 (D) 2",
    chunks: ["这个方案还", "需", "进一步", "修改"],
    translation: "This plan still needs further revision.",
    point: "Modal + adverb + verb",
    explanation:
      "The modal 需 ('need') comes first, then the adverb 进一步 ('further'), then the verb 修改. Adverbs describing the action sit right before the verb.",
  },
  {
    id: "p-D-03",
    source: "组词成句 (D) 3",
    chunks: ["数据", "被马工程师", "删掉", "了"],
    translation: "The data was deleted by Engineer Ma.",
    point: "被 sentence",
    explanation:
      "Receiver + 被 + doer + verb + extra: 数据 + 被马工程师 + 删掉 + 了. The verb needs something after it, here the result 掉 and 了.",
  },
  {
    id: "p-D-04",
    source: "组词成句 (D) 4",
    chunks: ["酒后", "驾驶", "危害", "很大"],
    translation: "Drink-driving is very dangerous.",
    point: "Subject–predicate predicate",
    explanation:
      "酒后驾驶 ('driving after drinking') is the topic, with the time 酒后 before the verb 驾驶. The comment is 危害很大: noun + 很 + adjective.",
  },
  {
    id: "p-D-05",
    source: "组词成句 (D) 5",
    chunks: ["要", "客观地", "评价", "他人"],
    translation: "You should judge others objectively.",
    point: "Adverbial 地 before verb",
    explanation:
      "The modal 要 comes first, then the manner adverbial 客观地 (marked with 地), then the verb 评价 and its object 他人.",
  },
  {
    id: "p-D-06",
    source: "组词成句 (D) 6",
    chunks: ["我不小心", "把", "水壶", "打翻", "了"],
    translation: "I accidentally knocked over the kettle.",
    point: "把 sentence",
    explanation:
      "Adverbials such as 不小心 go before 把. Then come the object 水壶, the verb with its result 打翻, and 了.",
  },
  {
    id: "p-D-07",
    source: "组词成句 (D) 7",
    chunks: ["那个城市的", "基础设施", "还", "不够", "完善"],
    translation: "That city's infrastructure is still not adequate.",
    point: "Adverb order: 还 + 不够 + adjective",
    explanation:
      "那个城市的 modifies 基础设施. 还 ('still') comes before the negative degree word 不够, which goes directly before the adjective 完善.",
  },
  {
    id: "p-D-08",
    source: "组词成句 (D) 8",
    chunks: ["醋", "有", "帮助", "消化的", "功能"],
    translation: "Vinegar helps digestion.",
    point: "Verb phrase + 的 as attributive",
    explanation:
      "醋有…功能 is the frame ('vinegar has the function of …'). The verb phrase 帮助消化 plus 的 describes 功能, so it goes right before it.",
  },
  {
    id: "p-D-09",
    source: "组词成句 (D) 9",
    chunks: ["一", "道", "彩虹", "出现在", "天空中"],
    translation: "A rainbow appeared in the sky.",
    point: "Number + measure word + noun; V在 + place",
    explanation:
      "Number + measure word + noun: 一道彩虹 (道 is the measure word for rainbows). 出现在 is followed by the place 天空中.",
  },
  {
    id: "p-D-10",
    source: "组词成句 (D) 10",
    chunks: ["长时间使用电脑", "易", "导致", "眼睛", "疲劳"],
    translation: "Using a computer for long periods can easily cause eye strain.",
    point: "易 + 导致 + result",
    explanation:
      "The cause 长时间使用电脑 is the subject. 易 ('easily, likely to') goes before the verb 导致, which is followed by the result 眼睛疲劳.",
  },
];
