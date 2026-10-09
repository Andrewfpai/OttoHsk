import type { OrderingItem } from "./types";

export const orderingItems: OrderingItem[] = [
  // ── 把 sentences ────────────────────────────────────────────────
  {
    id: "ord-001",
    chunks: ["请你", "把桌子上的", "那份材料", "复印", "两份"],
    translation: "Please make two copies of the document on the table.",
    point: "把 sentence",
    explanation:
      "In a 把 sentence the object, with all its modifiers, moves in front of the verb: 把 + object + verb + something extra. The verb cannot stand bare, so the quantity 两份 follows it.",
  },
  {
    id: "ord-002",
    chunks: ["我", "还没", "把这个消息", "告诉", "妈妈"],
    translation: "I haven't told Mum the news yet.",
    point: "Negation before 把",
    explanation:
      "Negatives (不, 没, 还没) and most adverbs go before 把, never between the 把 phrase and the verb. The person told (妈妈) comes after 告诉.",
  },
  {
    id: "ord-003",
    chunks: ["她", "把护照", "忘在", "宾馆的", "房间里了"],
    translation: "She left her passport in the hotel room.",
    point: "把 + V在 + place",
    explanation:
      "把 + object + V在 + place says where the object ends up. The place follows 在, and 宾馆的 must modify 房间 directly before it.",
  },
  {
    id: "ord-004",
    chunks: ["你", "能不能", "把这段对话", "翻译成", "中文"],
    end: "？",
    translation: "Could you translate this dialogue into Chinese?",
    point: "Modal before 把; 把…V成",
    explanation:
      "Modal verbs such as 能不能 come before the 把 phrase. 把 A 翻译成 B means 'turn A into B', so the target language follows 成.",
  },

  // ── 被 sentences ────────────────────────────────────────────────
  {
    id: "ord-005",
    chunks: ["我刚买的", "自行车", "被人", "偷走了"],
    translation: "The bike I had just bought was stolen.",
    point: "被 sentence",
    explanation:
      "The thing affected comes first, then 被 + doer + verb. As with 把, the verb needs a complement or 了 after it (偷走了), not a bare verb.",
  },
  {
    id: "ord-006",
    chunks: ["他的", "申请", "没有", "被公司", "批准"],
    translation: "His application was not approved by the company.",
    point: "Negation before 被",
    explanation:
      "没有 negates the whole passive, so it goes before 被, not before the main verb. Receiver + 没有 + 被 + doer + verb.",
  },
  {
    id: "ord-007",
    chunks: ["孩子们", "都", "被这个", "有趣的故事", "吸引住了"],
    translation: "The children were all captivated by this interesting story.",
    point: "被 + result complement",
    explanation:
      "都 refers back to the plural subject and sits before 被. The doer (这个有趣的故事) follows 被, and the verb carries a result complement (吸引住了).",
  },
  {
    id: "ord-008",
    chunks: ["这座", "古老的建筑", "已经", "被", "政府", "保护起来了"],
    translation: "This ancient building has already been placed under protection by the government.",
    point: "Adverb before 被",
    explanation:
      "Adverbs like 已经 go before 被, just as they go before 把. The doer 政府 sits between 被 and the verb phrase.",
  },

  // ── Adverb placement ────────────────────────────────────────────
  {
    id: "ord-009",
    chunks: ["我们班的", "同学", "几乎", "都", "参加了这次比赛"],
    translation: "Almost all the students in our class took part in this competition.",
    point: "几乎都",
    explanation:
      "几乎 ('almost') modifies 都 ('all'), so the order is always 几乎都, never 都几乎. Both adverbs sit after the subject and before the verb.",
  },
  {
    id: "ord-010",
    chunks: ["我", "一直", "想去", "西藏", "旅游"],
    translation: "I have always wanted to travel to Tibet.",
    point: "Adverb 一直",
    explanation:
      "Adverbs like 一直 go after the subject and before the verb phrase, including before modal verbs such as 想. The destination follows 去, and the purpose 旅游 comes last.",
  },
  {
    id: "ord-011",
    chunks: ["他们", "正在", "讨论", "明年的", "工作计划"],
    translation: "They are discussing next year's work plan.",
    point: "Progressive 正在",
    explanation:
      "正在 marks an action in progress and goes directly before the verb. The modifier 明年的 attaches to the noun it describes.",
  },
  {
    id: "ord-012",
    chunks: ["他的", "父母", "也", "都是", "医生"],
    translation: "His parents are both doctors too.",
    point: "也都",
    explanation:
      "When 也 and 都 appear together, the order is 也都 — 也 links to something said before, then 都 sums up the plural subject. 都也 is wrong.",
  },

  // ── Time and place before the verb ──────────────────────────────
  {
    id: "ord-013",
    chunks: ["爷爷", "每天晚饭后都", "要在公园里", "散步", "半个小时"],
    translation: "Every day after dinner, Grandpa takes a half-hour walk in the park.",
    point: "Time before place before verb",
    explanation:
      "Chinese puts 'when' before 'where', and both before the verb. Duration (半个小时) is different: it follows the verb.",
  },
  {
    id: "ord-014",
    chunks: ["他", "在一家", "外国公司", "当", "翻译"],
    translation: "He works as a translator at a foreign company.",
    point: "Place before verb",
    explanation:
      "A 在 + place phrase goes before the verb, unlike English 'work as a translator at a company'. Putting 在一家外国公司 at the end is a classic error.",
  },
  {
    id: "ord-015",
    chunks: ["会议", "将于", "下周一上午", "在三楼", "举行"],
    translation: "The meeting will be held on the third floor next Monday morning.",
    point: "将于 + time + place + verb",
    explanation:
      "Formal 将于 ('will, at') introduces the time. The standard adverbial order is time, then place, then the verb 举行.",
  },

  // ── 是……的 ──────────────────────────────────────────────────────
  {
    id: "ord-016",
    chunks: ["这本", "小说", "是我", "在网上", "买的"],
    translation: "I bought this novel online.",
    point: "是……的 emphasis",
    explanation:
      "是……的 highlights the details of a past action — who, where, how. 是 goes before the stressed part (我 在网上) and 的 closes the sentence after the verb.",
  },
  {
    id: "ord-017",
    chunks: ["你", "是", "什么时候", "开始", "学汉语的"],
    end: "？",
    translation: "When did you start learning Chinese?",
    point: "是……的 asking when",
    explanation:
      "To ask about the time of a past action, put 是 directly before the question word 什么时候 and end with 的 after the verb phrase.",
  },
  {
    id: "ord-018",
    chunks: ["他们俩", "是", "在一次", "朋友的", "婚礼上认识的"],
    translation: "The two of them met at a friend's wedding.",
    point: "是……的 emphasising place",
    explanation:
      "Here 是……的 stresses where they met. 是 comes right before the place phrase 在…上, and 一次 and 朋友的 both modify 婚礼.",
  },

  // ── Attributive 的 chains ───────────────────────────────────────
  {
    id: "ord-019",
    chunks: ["这是", "我", "见过的", "最漂亮的", "风景"],
    translation: "This is the most beautiful scenery I have ever seen.",
    point: "Clause attributive with 的",
    explanation:
      "In Chinese, a whole clause (我见过的) can describe a noun and goes before it. The relative clause comes first, then the adjective (最漂亮的), then the noun.",
  },
  {
    id: "ord-020",
    chunks: ["他", "是", "我们公司", "最年轻的", "经理"],
    translation: "He is the youngest manager in our company.",
    point: "Multiple modifiers before a noun",
    explanation:
      "All modifiers come before the noun. The 'belonging to' modifier (我们公司) goes outermost, and the descriptive one (最年轻的) goes closest to the noun.",
  },
  {
    id: "ord-021",
    chunks: ["那家公司", "生产的", "电脑", "质量", "很好"],
    translation: "The computers made by that company are of very good quality.",
    point: "Clause attributive with 的",
    explanation:
      "那家公司生产的 ('that company makes') is a clause describing 电脑, so it goes before it. The whole noun phrase is then the topic, followed by 质量很好.",
  },

  // ── Complements ─────────────────────────────────────────────────
  {
    id: "ord-022",
    chunks: ["他", "终于", "考上了", "理想的", "大学"],
    translation: "He finally got into the university he wanted.",
    point: "Result complement 上",
    explanation:
      "考上 is verb + result complement ('pass the exam and get in'). 了 follows the whole verb-complement unit, and the object comes after that.",
  },
  {
    id: "ord-023",
    chunks: ["他", "急忙", "跑回", "宿舍", "去了"],
    translation: "He hurried back to the dorm.",
    point: "Direction complement with place object",
    explanation:
      "When a compound direction complement has a place object, the place goes between the two parts: 跑回 + 宿舍 + 去. 跑回去宿舍 is wrong.",
  },
  {
    id: "ord-024",
    chunks: ["大家", "高兴地", "唱起", "歌", "来"],
    translation: "Everyone happily started singing.",
    point: "V起…来 (start doing)",
    explanation:
      "起来 meaning 'start to' splits around the object: 唱起 + 歌 + 来. The manner adverbial 高兴地 goes before the verb.",
  },
  {
    id: "ord-025",
    chunks: ["我", "一时", "想不起来", "他的", "名字了"],
    translation: "For the moment I can't remember his name.",
    point: "Potential complement",
    explanation:
      "不 inside 想不起来 means 'unable to'. Adverbs of time like 一时 go before the verb, and the object follows the complement.",
  },
  {
    id: "ord-026",
    chunks: ["你", "一个人", "搬得动", "这张", "桌子吗"],
    end: "？",
    translation: "Can you move this table by yourself?",
    point: "Potential complement",
    explanation:
      "得 inside 搬得动 means 'able to move'. 一个人 ('by oneself') describes how the subject acts, so it sits between the subject and the verb.",
  },
  {
    id: "ord-027",
    chunks: ["她", "说汉语", "说得", "非常", "流利"],
    translation: "She speaks Chinese very fluently.",
    point: "Degree complement 得 with verb copy",
    explanation:
      "A verb cannot take both an object and 得 at once, so the verb is repeated: V + object + V得 + description. The degree adverb 非常 goes before the adjective.",
  },
  {
    id: "ord-028",
    chunks: ["他", "激动得", "一句话", "也", "说不出来"],
    translation: "He was so moved that he couldn't say a single word.",
    point: "Degree complement 得 + clause",
    explanation:
      "Adjective + 得 can be followed by a whole clause showing the result. Inside it, 一 + measure word + noun + 也 + negative means 'not even one'.",
  },

  // ── 连……都/也 ───────────────────────────────────────────────────
  {
    id: "ord-029",
    chunks: ["他", "忙得", "连", "吃饭的时间", "都没有"],
    translation: "He is so busy he doesn't even have time to eat.",
    point: "连……都",
    explanation:
      "连 + the extreme case + 都 + verb means 'not even'. Here the whole 连 phrase is the result after 忙得.",
  },
  {
    id: "ord-030",
    chunks: ["他", "连一句", "汉语", "也", "不会说"],
    translation: "He can't speak even a single sentence of Chinese.",
    point: "连 + 一 + MW + N + 也 + negative",
    explanation:
      "The emphasised item goes between 连 and 也, and the negative verb comes after 也. The subject stays in front of 连.",
  },
  {
    id: "ord-031",
    chunks: ["他", "连看", "都没看", "就", "签了字"],
    translation: "He signed without even looking at it.",
    point: "连 V 都没 V",
    explanation:
      "连 + verb + 都没 + same verb means 'didn't even do it'. 就 then links to the next action that happened anyway.",
  },

  // ── 比 comparisons ──────────────────────────────────────────────
  {
    id: "ord-032",
    chunks: ["今年的", "收入", "比去年", "增加了", "百分之二十"],
    translation: "This year's income rose by twenty percent compared with last year.",
    point: "比 + verb + amount",
    explanation:
      "A 比 B comes before the verb, and the amount of difference (百分之二十) follows the verb at the end.",
  },
  {
    id: "ord-033",
    chunks: ["弟弟", "没有哥哥", "那么", "喜欢", "运动"],
    translation: "The younger brother doesn't like sports as much as the older brother.",
    point: "A 没有 B 那么 + adj/verb",
    explanation:
      "The negative comparison is A 没有 B (那么) + adjective or verb phrase. 那么 sits right before what is being compared.",
  },
  {
    id: "ord-034",
    chunks: ["我觉得", "坐高铁", "比坐飞机", "更", "方便"],
    translation: "I think taking the high-speed train is more convenient than flying.",
    point: "比 + 更",
    explanation:
      "With 比, intensifiers 更 or 还 go before the adjective, after the 比 phrase. 很 and 非常 are not allowed in a 比 sentence.",
  },

  // ── Modal verbs before prepositional phrases ────────────────────
  {
    id: "ord-035",
    chunks: ["你", "应该", "向那位", "老人", "道歉"],
    translation: "You should apologise to that old man.",
    point: "Modal before 向 phrase",
    explanation:
      "Modal verbs (应该, 能, 可以) come before the prepositional phrase, not between it and the main verb. Subject + modal + 向 + person + verb.",
  },
  {
    id: "ord-036",
    chunks: ["你", "能", "给我", "介绍", "一下", "你们的产品吗"],
    end: "？",
    translation: "Could you tell me a bit about your products?",
    point: "Modal before 给 phrase",
    explanation:
      "能 precedes the 给 phrase. 一下 follows the verb directly, before its object.",
  },
  {
    id: "ord-037",
    chunks: ["每个人", "都", "要", "对自己的", "行为", "负责"],
    translation: "Everyone must take responsibility for their own actions.",
    point: "都 + modal + 对 phrase",
    explanation:
      "The order is adverb (都), then modal (要), then the 对 phrase, then the verb. 对…负责 means 'be responsible for'.",
  },

  // ── 对 / 给 / 向 / 跟 phrases ───────────────────────────────────
  {
    id: "ord-038",
    chunks: ["长时间", "玩手机", "对眼睛", "有", "很大的", "影响"],
    translation: "Using a phone for long periods has a big effect on your eyes.",
    point: "对…有影响",
    explanation:
      "The 对 phrase ('on / towards') comes before the verb 有, unlike English 'have an effect on'. 长时间 describes the action, so it precedes 玩手机.",
  },
  {
    id: "ord-039",
    chunks: ["他的", "演讲", "给大家", "留下了", "深刻的", "印象"],
    translation: "His speech left a deep impression on everyone.",
    point: "给…留下印象",
    explanation:
      "The fixed pattern is A 给 B 留下(了)……的印象. The 给 phrase goes before the verb, and the adjective describing the impression goes directly before 印象.",
  },
  {
    id: "ord-040",
    chunks: ["他", "向我", "借了", "五百块钱"],
    translation: "He borrowed five hundred yuan from me.",
    point: "向 + person + verb",
    explanation:
      "'From me' is expressed with 向我 before the verb, not after it. 了 follows the verb, and the amount borrowed is the object.",
  },
  {
    id: "ord-041",
    chunks: ["我", "想", "跟你", "商量", "一件事"],
    translation: "I'd like to discuss something with you.",
    point: "跟 + person + verb",
    explanation:
      "The 跟 phrase ('with') goes before the verb, and the modal 想 goes before 跟. The object 一件事 follows the verb.",
  },

  // ── 使 / 让 / 令 causatives ─────────────────────────────────────
  {
    id: "ord-042",
    chunks: ["这个消息", "让", "大家", "感到", "非常失望"],
    translation: "The news left everyone feeling very disappointed.",
    point: "Causative 让",
    explanation:
      "Cause + 让 + person affected + resulting feeling. The person comes directly after 让.",
  },
  {
    id: "ord-043",
    chunks: ["经常", "运动", "可以", "使我们的", "身体", "更健康"],
    translation: "Regular exercise can make us healthier.",
    point: "Causative 使",
    explanation:
      "The cause (经常运动) is the subject. A modal like 可以 goes before 使, and the thing changed plus its new state follow 使.",
  },
  {
    id: "ord-044",
    chunks: ["他的", "成功", "令", "所有人", "感到", "意外"],
    translation: "His success took everyone by surprise.",
    point: "Causative 令",
    explanation:
      "令 works like 让 and 使 but is more formal. Cause + 令 + person + 感到 + feeling.",
  },

  // ── 不但……而且 ──────────────────────────────────────────────────
  {
    id: "ord-045",
    chunks: ["这家餐厅的菜", "不但很便宜", "而且", "味道", "也不错"],
    translation: "The food at this restaurant is not only cheap but also tastes good.",
    point: "不但……而且 (same subject)",
    explanation:
      "When both clauses share one subject, the subject comes first and 不但 follows it. The second clause starts with 而且 and often has 也 or 还 before its verb.",
  },
  {
    id: "ord-046",
    chunks: ["不但", "孩子们", "喜欢看这部电影", "而且", "大人们也很喜欢"],
    translation: "Not only do children love watching this film, adults love it too.",
    point: "不但……而且 (different subjects)",
    explanation:
      "When the two clauses have different subjects, 不但 goes before the first subject. Putting it after 孩子们 would wrongly suggest the same subject continues.",
  },

  // ── 越来越 ──────────────────────────────────────────────────────
  {
    id: "ord-047",
    chunks: ["这里的", "空气", "变得", "越来越", "好了"],
    translation: "The air here has been getting better and better.",
    point: "越来越 + adjective",
    explanation:
      "越来越 goes directly before the adjective. It already means 'more and more', so it never takes 很 or 非常, and 了 at the end marks the change.",
  },
  {
    id: "ord-048",
    chunks: ["越来越多的", "年轻人", "选择", "在大城市", "工作"],
    translation: "More and more young people are choosing to work in big cities.",
    point: "越来越多的 + noun",
    explanation:
      "越来越多的 is a modifier, so it goes before the noun like any other 的 phrase. 在大城市 comes before 工作 inside the object of 选择.",
  },
  {
    id: "ord-049",
    chunks: ["我", "越来越", "喜欢", "这座", "城市了"],
    translation: "I'm growing to like this city more and more.",
    point: "越来越 + psychological verb",
    explanation:
      "越来越 can modify feeling verbs like 喜欢 and goes after the subject, right before the verb. The final 了 shows the change.",
  },

  // ── 一……就 ──────────────────────────────────────────────────────
  {
    id: "ord-050",
    chunks: ["他", "一", "回到家", "就", "打开了电脑"],
    translation: "As soon as he got home, he turned on the computer.",
    point: "一……就 (same subject)",
    explanation:
      "With one subject, the pattern is subject + 一 + action 1 + 就 + action 2. Both 一 and 就 sit directly before their verbs.",
  },
  {
    id: "ord-051",
    chunks: ["我", "一", "出门", "就", "下起了大雨"],
    translation: "The moment I stepped outside, it started pouring.",
    point: "一……就 (different subjects)",
    explanation:
      "一 attaches to the first event and 就 to the second, even when the second has no subject (weather). 就 always comes directly before the second verb.",
  },

  // ── 无论 / 不管……都 ────────────────────────────────────────────
  {
    id: "ord-052",
    chunks: ["无论", "遇到", "多大的", "困难", "他", "都不会放弃"],
    alternatives: [["他", "无论", "遇到", "多大的", "困难", "都不会放弃"]],
    translation: "No matter how great the difficulties, he will never give up.",
    point: "无论……都",
    explanation:
      "无论 + question-word phrase (多大的) sets up 'no matter', and 都 must follow in the main clause, before its verb. Because both clauses share the subject 他, it can go either at the very start or after the 无论 clause.",
  },
  {
    id: "ord-053",
    chunks: ["不管", "是谁", "都", "必须", "遵守这条规定"],
    translation: "Whoever you are, you must follow this rule.",
    point: "不管……都",
    explanation:
      "不管 + question word (谁) needs 都 in the main clause. 都 comes before the modal 必须, which comes before the verb.",
  },
  {
    id: "ord-054",
    chunks: ["无论", "做什么", "事情", "都要", "认真"],
    translation: "Whatever you do, you should do it carefully.",
    point: "无论 + 什么 + 都",
    explanation:
      "无论 requires a question word (什么) or a choice in its clause; 都 then introduces the conclusion. 什么 modifies 事情, so they stay together.",
  },

  // ── 之一 ────────────────────────────────────────────────────────
  {
    id: "ord-055",
    chunks: ["长城", "是", "世界上", "最有名的", "建筑之一"],
    translation: "The Great Wall is one of the most famous structures in the world.",
    point: "……之一",
    explanation:
      "Chinese says 'the most famous structures, one of them': the whole group with its modifiers comes first and 之一 closes the phrase.",
  },
  {
    id: "ord-056",
    chunks: ["李白", "是", "中国", "历史上", "最伟大的", "诗人之一"],
    translation: "Li Bai is one of the greatest poets in Chinese history.",
    point: "……之一",
    explanation:
      "The scope (中国历史上) comes first, then the superlative (最伟大的), then the noun + 之一. 之一 is always at the very end.",
  },

  // ── Measure words ───────────────────────────────────────────────
  {
    id: "ord-057",
    chunks: ["桌子上", "放着", "一台", "新买的", "笔记本电脑"],
    translation: "On the desk there is a newly bought laptop.",
    point: "Number + measure word + 的 phrase + noun",
    explanation:
      "Existence sentences follow place + V着 + thing. In the noun phrase, number + measure word (一台) comes first, then the descriptive 的 phrase, then the noun.",
  },
  {
    id: "ord-058",
    chunks: ["他", "送给我", "一束", "美丽的", "鲜花"],
    translation: "He gave me a bunch of beautiful flowers.",
    point: "Number + measure word + adjective + noun",
    explanation:
      "The measure word 束 ('bunch') goes right after the number, and the adjective with 的 sits between the measure word and the noun.",
  },

  // ── 了 placement ────────────────────────────────────────────────
  {
    id: "ord-059",
    chunks: ["他", "已经", "学了", "三年", "汉语了"],
    translation: "He has been studying Chinese for three years now.",
    point: "Double 了 with duration",
    explanation:
      "Duration goes between the verb and its object: 学了三年汉语. The second 了 at the end shows the action is still going on.",
  },
  {
    id: "ord-060",
    chunks: ["我", "去超市", "买了", "一些", "水果"],
    translation: "I went to the supermarket and bought some fruit.",
    point: "了 in serial-verb sentences",
    explanation:
      "In a serial-verb sentence (go somewhere + do something), 了 marks the completed action, so it goes after the last verb 买, not after 去.",
  },
];
