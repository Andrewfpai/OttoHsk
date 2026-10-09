import type { OrderingItem } from "./types";

/** From the learner's own papers: 组词成句 (E)–(M). */
export const orderingPapersEM: OrderingItem[] = [
  // ── 组词成句 (E) ────────────────────────────────────────────────
  {
    id: "p-E-01",
    source: "组词成句 (E) 1",
    chunks: ["他的", "研究成果", "已经", "被", "承认", "了"],
    translation: "His research results have already been recognised.",
    point: "被 sentence without a doer",
    explanation:
      "The thing affected (他的研究成果) is the subject, and 被 can come straight before the verb when the doer is left out. Adverbs such as 已经 go before 被, and 了 closes the sentence.",
  },
  {
    id: "p-E-02",
    source: "组词成句 (E) 2",
    chunks: ["卫生间", "安装了", "这种", "半透明的", "玻璃"],
    alternatives: [["这种", "卫生间", "安装了", "半透明的", "玻璃"]],
    translation: "The bathroom has been fitted with this kind of semi-transparent glass.",
    point: "Order of attributives",
    explanation:
      "The place (卫生间) is the subject and 安装了 takes 玻璃 as its object. Before a noun, a demonstrative + measure word (这种) comes before a descriptive 的 phrase (半透明的). 这种 can also describe 卫生间 instead: 'this kind of bathroom is fitted with semi-transparent glass'.",
  },
  {
    id: "p-E-03",
    source: "组词成句 (E) 3",
    chunks: ["这类商品的", "设计者", "的确", "很", "了不起"],
    translation: "The designers of this kind of product really are remarkable.",
    point: "Adverb order: 的确 + 很",
    explanation:
      "这类商品的 modifies 设计者, which is the subject. A modal adverb like 的确 comes before the degree adverb 很, and both come before the adjective 了不起.",
  },
  {
    id: "p-E-04",
    source: "组词成句 (E) 4",
    chunks: ["请工程师", "把", "规则", "再", "强调", "一遍"],
    alternatives: [["请工程师", "再", "把", "规则", "强调", "一遍"]],
    translation: "Please ask the engineer to go over the rules once more.",
    point: "把 sentence with 再 and a verbal measure",
    explanation:
      "把 + object + verb + extra element: 把规则强调一遍, with the count 一遍 after the verb. 再 may sit either right before the verb or before 把; both are natural.",
  },
  {
    id: "p-E-05",
    source: "组词成句 (E) 5",
    chunks: ["领导", "不得不", "答应他", "辞职的", "请求"],
    translation: "The leader had no choice but to grant his request to resign.",
    point: "Adverb before verb; attributive 的",
    explanation:
      "不得不 goes before the verb phrase 答应他. 辞职的 describes 请求, and that whole noun phrase is what was agreed to, so it comes last.",
  },
  {
    id: "p-E-06",
    source: "组词成句 (E) 6",
    chunks: ["锅", "被", "砍", "漏", "了"],
    translation: "The pot got a hole hacked in it.",
    point: "被 + result complement",
    explanation:
      "The pot is what was affected, so it comes first, then 被 + verb. The result 漏 (leaking, holed) follows the verb 砍 directly, and 了 marks the change.",
  },
  {
    id: "p-E-07",
    source: "组词成句 (E) 7",
    chunks: ["这种做法", "不免", "显得", "有些", "自私"],
    translation: "This approach can't help seeming a bit selfish.",
    point: "Adverb before 显得",
    explanation:
      "不免 is an adverb, so it goes before the verb 显得. 显得 then takes the description 有些自私, with the degree word 有些 before the adjective.",
  },
  {
    id: "p-E-08",
    source: "组词成句 (E) 8",
    chunks: ["这几个学生的", "试卷", "答得", "极其", "出色"],
    translation: "These students answered their exam papers exceptionally well.",
    point: "Degree complement with 得",
    explanation:
      "这几个学生的 modifies 试卷, the topic. After verb + 得, the comment comes as degree adverb + adjective: 答得极其出色.",
  },
  {
    id: "p-E-09",
    source: "组词成句 (E) 9",
    chunks: ["这个导演", "拍的", "连续剧", "非常", "精彩"],
    translation: "The TV series this director makes are wonderful.",
    point: "Clause as attributive (…的 + noun)",
    explanation:
      "这个导演拍的 is a clause describing 连续剧: 'the series this director shot'. That whole noun phrase is the subject, and 非常精彩 is the predicate.",
  },
  {
    id: "p-E-10",
    source: "组词成句 (E) 10",
    chunks: ["老百姓的", "平均收入", "至今", "仍没有", "得到提高"],
    alternatives: [["至今", "老百姓的", "平均收入", "仍没有", "得到提高"]],
    translation: "Ordinary people's average income has still not risen to this day.",
    point: "Time word position",
    explanation:
      "老百姓的平均收入 is the subject, and 仍没有得到提高 is the predicate. A time word such as 至今 goes either after the subject or at the very start of the sentence, but always before the adverb 仍.",
  },

  // ── 组词成句 (F) ────────────────────────────────────────────────
  {
    id: "p-F-01",
    source: "组词成句 (F) 1",
    chunks: ["这几个部门", "共同开发了", "新的", "电脑软件"],
    translation: "These departments jointly developed new computer software.",
    point: "Subject + verb + object",
    explanation:
      "The doer 这几个部门 comes first, then the verb 共同开发了. 新的 describes 电脑软件, so it goes directly before it as part of the object.",
  },
  {
    id: "p-F-02",
    source: "组词成句 (F) 2",
    chunks: ["星期天", "商店", "特意", "延长了", "营业时间"],
    alternatives: [
      ["商店", "星期天", "特意", "延长了", "营业时间"],
      ["商店", "特意", "延长了", "星期天", "营业时间"],
    ],
    translation: "On Sunday the shop specially extended its opening hours.",
    point: "Time word position",
    explanation:
      "A time word like 星期天 goes before or right after the subject, never after the verb unless it describes the object. The adverb 特意 goes immediately before the verb 延长了, and 营业时间 is the object.",
  },
  {
    id: "p-F-03",
    source: "组词成句 (F) 3",
    chunks: ["幼儿园的", "很多孩子", "被", "烫", "伤", "了"],
    translation: "Many of the children at the kindergarten were scalded.",
    point: "被 + result complement",
    explanation:
      "幼儿园的 modifies 很多孩子, the people affected. With no doer, 被 sits right before the verb, and the result 伤 follows 烫 directly before the closing 了.",
  },
  {
    id: "p-F-04",
    source: "组词成句 (F) 4",
    chunks: ["服务员", "陆续辞职", "抗议", "受到的", "不公平待遇"],
    translation: "The waiters resigned one after another in protest at the unfair treatment they received.",
    point: "Serial verbs (action + purpose)",
    explanation:
      "Two verb phrases in a row show an action and its purpose: 陆续辞职 first, then 抗议 + object. 受到的 describes 不公平待遇, so the two go together as the object of 抗议.",
  },
  {
    id: "p-F-05",
    source: "组词成句 (F) 5",
    chunks: ["专家们", "都称赞", "餐厅的", "烤鸭", "很地道"],
    translation: "The experts all praised the restaurant's roast duck as very authentic.",
    point: "Clause as object of 称赞",
    explanation:
      "称赞 can take a whole clause as its object: 餐厅的烤鸭 (subject) + 很地道 (predicate). 都 refers back to 专家们, so it stays in front of the verb.",
  },
  {
    id: "p-F-06",
    source: "组词成句 (F) 6",
    chunks: ["人们", "能感受到", "打工人员的", "无奈"],
    translation: "People can sense the helplessness of migrant workers.",
    point: "Attributive 的",
    explanation:
      "人们 is the subject and 能感受到 the verb. 打工人员的 describes whose 无奈 it is, so it goes directly before the noun 无奈 at the end.",
  },
  {
    id: "p-F-07",
    source: "组词成句 (F) 7",
    chunks: ["签字后", "可以", "凭支票", "提取", "现金"],
    translation: "After signing, you can withdraw cash with the cheque.",
    point: "Modal before prepositional phrase",
    explanation:
      "The time phrase 签字后 sets the scene first. The modal 可以 comes before the prepositional phrase 凭支票, which in turn comes before the verb 提取 and its object 现金.",
  },
  {
    id: "p-F-08",
    source: "组词成句 (F) 8",
    chunks: ["包子", "这一类", "的", "小吃", "很", "受欢迎"],
    translation: "Snacks like baozi are very popular.",
    point: "Noun + 这一类的 + noun",
    explanation:
      "包子这一类的小吃 means 'snacks of the baozi kind': the example comes first, then 这一类的, then the general noun. 很受欢迎 is the predicate.",
  },
  {
    id: "p-F-09",
    source: "组词成句 (F) 9",
    chunks: ["班主任", "被", "逗", "乐", "了"],
    translation: "The homeroom teacher was made to laugh.",
    point: "被 + result complement",
    explanation:
      "The person affected comes first, then 被 + verb. The result 乐 follows the verb 逗 directly: 逗乐 means 'tease into laughing'.",
  },
  {
    id: "p-F-10",
    source: "组词成句 (F) 10",
    chunks: ["小伙子", "不得不", "假装", "欣赏", "操场附近的", "建筑"],
    translation: "The young man had to pretend to admire the buildings near the sports ground.",
    point: "Adverb before verb; verb + verb object",
    explanation:
      "不得不 goes before 假装, and 假装 takes the verb phrase 欣赏… as its object. 操场附近的 describes 建筑, so it goes directly before it.",
  },

  // ── 组词成句 (G) ────────────────────────────────────────────────
  {
    id: "p-G-01",
    source: "组词成句 (G) 1",
    chunks: ["士兵们", "特别", "感激", "指导员的", "关怀"],
    translation: "The soldiers are especially grateful for the instructor's care.",
    point: "Degree adverb before verb",
    explanation:
      "特别 is a degree adverb, so it goes before the psychological verb 感激. 指导员的 describes 关怀, which is the object.",
  },
  {
    id: "p-G-02",
    source: "组词成句 (G) 2",
    chunks: ["球迷", "非常期待", "运动员们", "可以创造", "奇迹"],
    translation: "The fans are really hoping the athletes can work a miracle.",
    point: "Clause as object of 期待",
    explanation:
      "期待 takes a whole clause as its object: 运动员们 (subject) + 可以创造奇迹. It is the fans who hope and the athletes who perform, so 球迷 comes first.",
  },
  {
    id: "p-G-03",
    source: "组词成句 (G) 3",
    chunks: ["姑娘们", "身材", "更加", "苗条", "了"],
    translation: "The girls' figures have become even slimmer.",
    point: "Topic + subject + predicate",
    explanation:
      "姑娘们 is the topic and 身材 the subject of the predicate 更加苗条: 'the girls, their figures are slimmer'. 更加 goes before the adjective and 了 marks the change.",
  },
  {
    id: "p-G-04",
    source: "组词成句 (G) 4",
    chunks: ["小伙子", "似乎", "被", "说服", "了"],
    translation: "The young man seems to have been persuaded.",
    point: "Adverb before 被",
    explanation:
      "The person affected is the subject. Adverbs such as 似乎 go before 被, and 被 + verb + 了 completes the passive.",
  },
  {
    id: "p-G-05",
    source: "组词成句 (G) 5",
    chunks: ["你们老板的", "饺子", "确实", "煮得", "难吃"],
    alternatives: [["你们老板的", "饺子", "煮得", "确实", "难吃"]],
    translation: "Your boss's dumplings really are badly cooked.",
    point: "Degree complement with 得",
    explanation:
      "饺子 is the topic, and 煮得 + adjective says how they were cooked. 确实 can go before the verb or after 得, but never after the adjective.",
  },
  {
    id: "p-G-06",
    source: "组词成句 (G) 6",
    chunks: ["单调的", "生活", "绝对", "称不上", "完美"],
    translation: "A monotonous life can in no way be called perfect.",
    point: "Adverb before verb; 称不上",
    explanation:
      "单调的 describes 生活, the subject. The adverb 绝对 goes before 称不上 ('cannot be called'), which takes 完美 after it.",
  },
  {
    id: "p-G-07",
    source: "组词成句 (G) 7",
    chunks: ["孩子", "用剪刀", "把牛仔裤", "剪", "破", "了"],
    translation: "The child cut a hole in the jeans with scissors.",
    point: "Instrument before 把",
    explanation:
      "The standard order is subject + instrument (用剪刀) + 把 + object + verb + result. The result 破 follows 剪 directly and 了 closes the sentence.",
  },
  {
    id: "p-G-08",
    source: "组词成句 (G) 8",
    chunks: ["老王", "居然", "主动承担", "最艰巨的", "任务"],
    translation: "Lao Wang actually volunteered to take on the toughest task.",
    point: "Adverb before verb",
    explanation:
      "居然 expresses surprise and goes after the subject, before the verb phrase. 最艰巨的 describes 任务, which is the object.",
  },
  {
    id: "p-G-09",
    source: "组词成句 (G) 9",
    chunks: ["我们", "要尽量", "协调", "各方面的", "利益"],
    translation: "We should do our best to balance the interests of all parties.",
    point: "Modal + adverb before verb",
    explanation:
      "要尽量 (modal + adverb) goes before the verb 协调. 各方面的 describes 利益, so the two form the object.",
  },
  {
    id: "p-G-10",
    source: "组词成句 (G) 10",
    chunks: ["几个专家的", "建议", "相对", "比较合理"],
    translation: "The experts' suggestions are relatively reasonable.",
    point: "Attributive 的; adverb before predicate",
    explanation:
      "几个专家的 modifies 建议, the subject. 相对 is an adverb, so it goes before the predicate 比较合理.",
  },

  // ── 组词成句 (H) ────────────────────────────────────────────────
  {
    id: "p-H-01",
    source: "组词成句 (H) 1",
    chunks: ["曾经的", "愿望", "如今", "终于", "实现了"],
    alternatives: [["如今", "曾经的", "愿望", "终于", "实现了"]],
    translation: "The wish I once had has finally come true.",
    point: "Time word before adverb",
    explanation:
      "曾经的 modifies 愿望, the subject. The time word 如今 goes after the subject or at the start, and always before the adverb 终于 + verb.",
  },
  {
    id: "p-H-02",
    source: "组词成句 (H) 2",
    chunks: ["保险公司", "根本", "没有同意", "赔偿", "房东的损失"],
    translation: "The insurance company never agreed to compensate the landlord's losses at all.",
    point: "根本 + negation",
    explanation:
      "根本 strengthens a negative and must come directly before it: 根本没有. 同意 then takes the verb phrase 赔偿房东的损失 as its object.",
  },
  {
    id: "p-H-03",
    source: "组词成句 (H) 3",
    chunks: ["鼠标", "不小心", "被", "摔", "碎", "了"],
    translation: "The mouse was accidentally dropped and broken.",
    point: "Adverbial before 被",
    explanation:
      "The thing affected comes first. Adverbials such as 不小心 go before 被, and the result 碎 follows the verb 摔 directly.",
  },
  {
    id: "p-H-04",
    source: "组词成句 (H) 4",
    chunks: ["离婚", "也不能", "彻底", "解决", "目前的困难"],
    translation: "Even divorce can't completely solve the current difficulties.",
    point: "Verb as subject; adverb before verb",
    explanation:
      "离婚 is the subject: 'divorcing'. 也不能 goes first, then the manner adverb 彻底 directly before the verb 解决, which takes 目前的困难 as its object.",
  },
  {
    id: "p-H-05",
    source: "组词成句 (H) 5",
    chunks: ["政府", "为志愿者们", "办理了", "多种形式的", "保险"],
    translation: "The government arranged various forms of insurance for the volunteers.",
    point: "Prepositional phrase before verb",
    explanation:
      "A 为 phrase ('for someone') goes between the subject and the verb. 多种形式的 describes 保险, which is the object of 办理了.",
  },
  {
    id: "p-H-06",
    source: "组词成句 (H) 6",
    chunks: ["相关", "企业", "承受着", "巨大的", "资金压力"],
    translation: "The companies involved are under enormous financial pressure.",
    point: "Attributives before nouns",
    explanation:
      "相关 describes 企业, the subject, and can go before it without 的. 巨大的 describes 资金压力, which is the object of 承受着.",
  },
  {
    id: "p-H-07",
    source: "组词成句 (H) 7",
    chunks: ["这几种", "蔬菜的", "营养", "未必", "那么全面"],
    translation: "These vegetables' nutritional value is not necessarily that complete.",
    point: "Order of attributives; 未必",
    explanation:
      "这几种 describes 蔬菜, and 蔬菜的 describes 营养, so the subject is 这几种蔬菜的营养. 未必 is an adverb and goes before the predicate 那么全面.",
  },
  {
    id: "p-H-08",
    source: "组词成句 (H) 8",
    chunks: ["上网", "把", "预订的", "房间", "取消了"],
    alternatives: [["把", "上网", "预订的", "房间", "取消了"]],
    translation: "(I) went online and cancelled the room I had booked.",
    point: "Method before 把",
    explanation:
      "How something is done (上网) comes before the 把 phrase, and 把 + object + 取消了 follows. 上网 can also sit inside the object, as 上网预订的房间, 'the room booked online'.",
  },
  {
    id: "p-H-09",
    source: "组词成句 (H) 9",
    chunks: ["博物馆的", "展览区", "设计得", "尤其", "巧妙"],
    translation: "The museum's exhibition area is especially cleverly designed.",
    point: "Degree complement with 得",
    explanation:
      "博物馆的 modifies 展览区, the topic. After verb + 得 comes degree adverb + adjective: 设计得尤其巧妙.",
  },
  {
    id: "p-H-10",
    source: "组词成句 (H) 10",
    chunks: ["他", "非常珍惜", "他们共同的", "宝贵", "记忆"],
    translation: "He deeply treasures the precious memories they share.",
    point: "Order of attributives",
    explanation:
      "Before the noun, a possessive 的 phrase (他们共同的) comes before a descriptive adjective joined directly to the noun (宝贵记忆).",
  },

  // ── 组词成句 (I) ────────────────────────────────────────────────
  {
    id: "p-I-01",
    source: "组词成句 (I) 1",
    chunks: ["他", "还在", "犹豫要不要", "辞职"],
    translation: "He is still hesitating over whether to resign.",
    point: "还在 + verb; A-not-A object",
    explanation:
      "还在 goes before the verb to show an ongoing state. 犹豫 takes the question 要不要辞职 as its object, so 辞职 completes it.",
  },
  {
    id: "p-I-02",
    source: "组词成句 (I) 2",
    chunks: ["她经常", "利用", "业余", "时间", "写作"],
    translation: "She often uses her spare time to write.",
    point: "利用 + time + purpose verb",
    explanation:
      "利用 + something + verb means 'use something to do'. 业余 describes 时间, and the purpose 写作 comes last.",
  },
  {
    id: "p-I-03",
    source: "组词成句 (I) 3",
    chunks: ["玉米的", "营养价值", "非常", "高"],
    translation: "Corn is very high in nutritional value.",
    point: "Adjective predicate",
    explanation:
      "玉米的 modifies 营养价值, the subject. The degree adverb 非常 goes before the adjective 高.",
  },
  {
    id: "p-I-04",
    source: "组词成句 (I) 4",
    chunks: ["目前已知的", "昆虫种类有", "多少", "种"],
    end: "？",
    translation: "How many insect species are currently known?",
    point: "Question word in place: 多少 + measure word",
    explanation:
      "Chinese asks in place: the question word stands where the answer would go. 目前已知的 describes 昆虫种类, and 多少 + the measure word 种 is the object of 有.",
  },
  {
    id: "p-I-05",
    source: "组词成句 (I) 5",
    chunks: ["这些", "研究成果", "值得我们", "参考"],
    translation: "These research findings are worth our consulting.",
    point: "值得 + verb",
    explanation:
      "The thing that deserves attention is the subject. 值得 + (person) + verb: 值得我们参考.",
  },
  {
    id: "p-I-06",
    source: "组词成句 (I) 6",
    chunks: ["我的", "梦想是", "经营", "一", "家", "酒吧"],
    translation: "My dream is to run a bar.",
    point: "是 + verb phrase; number + measure word",
    explanation:
      "我的梦想是 is followed by what the dream is: 经营 + object. Number + measure word + noun: 一家酒吧.",
  },
  {
    id: "p-I-07",
    source: "组词成句 (I) 7",
    chunks: ["全部的", "损失", "都", "由", "保险公司", "赔偿"],
    translation: "All the losses will be covered by the insurance company.",
    point: "由 + doer + verb",
    explanation:
      "The thing being dealt with comes first. 都 sums it up and goes before 由, and 由 + doer + verb says who is responsible.",
  },
  {
    id: "p-I-08",
    source: "组词成句 (I) 8",
    chunks: ["那趟", "航班因", "天气原因", "被临时", "取消了"],
    translation: "That flight was cancelled at short notice because of the weather.",
    point: "Reason phrase before 被",
    explanation:
      "那趟 is the measure for 航班. A reason phrase (因天气原因) goes before 被, and 被 + verb + 了 ends the sentence.",
  },
  {
    id: "p-I-09",
    source: "组词成句 (I) 9",
    chunks: ["操场上", "新增了", "一批", "健身设备"],
    translation: "A batch of new fitness equipment has been added on the sports ground.",
    point: "Existential sentence",
    explanation:
      "Place + verb + 了 + number/measure + noun says what has appeared where. The place 操场上 comes first and the new thing comes last.",
  },
  {
    id: "p-I-10",
    source: "组词成句 (I) 10",
    chunks: ["那个学生的", "考试资格", "被", "取消了"],
    translation: "That student's right to sit the exam was revoked.",
    point: "被 sentence without a doer",
    explanation:
      "The thing affected (那个学生的考试资格) is the subject. With no doer, 被 goes right before the verb 取消了.",
  },
  {
    id: "p-I-11",
    source: "组词成句 (I) 11",
    chunks: ["阳台上", "有", "一只", "美丽的蝴蝶"],
    translation: "There is a beautiful butterfly on the balcony.",
    point: "Existential 有",
    explanation:
      "Place + 有 + number/measure + noun says what exists somewhere. The measure word 一只 comes before the descriptive phrase 美丽的蝴蝶.",
  },
  {
    id: "p-I-12",
    source: "组词成句 (I) 12",
    chunks: ["疲劳驾驶", "是", "对生命", "不负责任", "的表现"],
    translation: "Driving while tired is a sign of irresponsibility towards life.",
    point: "对 + object + adjective as attributive",
    explanation:
      "疲劳驾驶 is the subject of 是. 对生命不负责任 ('irresponsible towards life') is a phrase describing 表现, with 对 before what it is irresponsible towards.",
  },
  {
    id: "p-I-13",
    source: "组词成句 (I) 13",
    chunks: ["这套", "房子", "的", "面积", "不到100平米"],
    translation: "This flat is under 100 square metres.",
    point: "Attributive 的",
    explanation:
      "这套房子的 modifies 面积, the subject. 不到100平米 is the predicate: 'less than 100 m²'.",
  },
  {
    id: "p-I-14",
    source: "组词成句 (I) 14",
    chunks: ["经济下滑", "使", "许多人", "面临", "失业的风险"],
    translation: "The economic downturn has left many people facing the risk of losing their jobs.",
    point: "Causative 使",
    explanation:
      "Cause + 使 + person + result. 经济下滑 is the cause, 许多人 is affected, and 面临失业的风险 is what happens to them.",
  },
  {
    id: "p-I-15",
    source: "组词成句 (I) 15",
    chunks: ["列车上的餐车", "一般在", "几号车厢", "呢"],
    end: "？",
    translation: "Which carriage is the dining car usually in on a train?",
    point: "Question word in place; 在 + place",
    explanation:
      "The subject 列车上的餐车 comes first, then 一般在 + the place being asked about. 呢 softens the question at the end.",
  },
  {
    id: "p-I-16",
    source: "组词成句 (I) 16",
    chunks: ["我们", "非常", "期待与您", "进行合作"],
    translation: "We very much look forward to working with you.",
    point: "Degree adverb before psychological verb",
    explanation:
      "非常 goes before the verb 期待. 期待 takes the verb phrase 与您进行合作 as its object, with the 与 phrase before 进行.",
  },

  // ── 组词成句 (J) ────────────────────────────────────────────────
  {
    id: "p-J-01",
    source: "组词成句 (J) 1",
    chunks: ["这个", "主持人", "很会", "活跃", "气氛"],
    translation: "This host is really good at livening up the atmosphere.",
    point: "很会 + verb; 活跃 as a verb",
    explanation:
      "很会 means 'be good at' and goes before a verb. Here 活跃 is a verb ('liven up'), and 气氛 is its object.",
  },
  {
    id: "p-J-02",
    source: "组词成句 (J) 2",
    chunks: ["简历上", "要", "突出", "你的优势"],
    translation: "Your résumé should highlight your strengths.",
    point: "Place topic + modal + verb",
    explanation:
      "The place 简历上 opens the sentence as the topic. The modal 要 goes before the verb 突出 ('highlight'), and 你的优势 is its object.",
  },
  {
    id: "p-J-03",
    source: "组词成句 (J) 3",
    chunks: ["我是", "一个", "业余的", "象棋", "爱好者"],
    translation: "I am an amateur chess enthusiast.",
    point: "Order of attributives",
    explanation:
      "Number + measure word (一个) comes first, then a 的 description (业余的), and a noun used as a classifier (象棋) sits directly against the head noun 爱好者.",
  },
  {
    id: "p-J-04",
    source: "组词成句 (J) 4",
    chunks: ["无人驾驶", "汽车的", "安全性", "如何"],
    end: "？",
    translation: "How safe are self-driving cars?",
    point: "如何 as a predicate",
    explanation:
      "无人驾驶 describes 汽车, and 汽车的 describes 安全性, the subject. 如何 ('how is it') is the predicate and closes the question.",
  },
  {
    id: "p-J-05",
    source: "组词成句 (J) 5",
    chunks: ["我们", "制定了", "详细的", "推广", "方案"],
    translation: "We drew up a detailed promotion plan.",
    point: "Order of attributives",
    explanation:
      "A 的 description (详细的) comes before a noun or verb that classifies the head noun directly (推广方案, 'promotion plan').",
  },
  {
    id: "p-J-06",
    source: "组词成句 (J) 6",
    chunks: ["领导的", "称赞", "使", "他", "很受", "鼓舞"],
    translation: "The leader's praise greatly encouraged him.",
    point: "Causative 使",
    explanation:
      "Cause + 使 + person + result. 领导的称赞 is the cause, 他 is affected, and 很受鼓舞 ('felt very encouraged') is the result.",
  },
  {
    id: "p-J-07",
    source: "组词成句 (J) 7",
    chunks: ["政府", "决定", "增加", "教育", "方面的", "投入"],
    translation: "The government decided to increase investment in education.",
    point: "Verb + verb-object; …方面的",
    explanation:
      "决定 takes the verb phrase 增加…投入 as its object. 教育方面的 ('in education') describes 投入, so it goes directly before it.",
  },
  {
    id: "p-J-08",
    source: "组词成句 (J) 8",
    chunks: ["球迷们", "十分", "关注这场", "决赛"],
    translation: "The fans are following this final very closely.",
    point: "Degree adverb before psychological verb",
    explanation:
      "十分 goes before the verb 关注. The measure phrase 这场 belongs with 决赛, so 关注这场决赛 reads as verb + object.",
  },
  {
    id: "p-J-09",
    source: "组词成句 (J) 9 (misprint 斤一倍 corrected to 近一倍)",
    chunks: ["丝绸的", "价格", "涨了", "近一倍"],
    translation: "The price of silk has nearly doubled.",
    point: "Verb + 了 + amount of change",
    explanation:
      "The subject is 丝绸的价格. After a verb of change, 了 comes first and the amount follows: 涨了近一倍 ('rose by nearly double').",
  },
  {
    id: "p-J-10",
    source: "组词成句 (J) 10",
    chunks: ["请", "把", "文件", "递给", "我"],
    translation: "Please pass me the document.",
    point: "把 + V给 + person",
    explanation:
      "请 opens a polite request. 把 + object + 递给 + recipient: the person receiving it comes after 给.",
  },
  {
    id: "p-J-11",
    source: "组词成句 (J) 11",
    chunks: ["那位女嘉宾", "表现", "得", "非常", "出色"],
    translation: "That female guest performed outstandingly.",
    point: "Degree complement with 得",
    explanation:
      "Subject + verb + 得 + degree adverb + adjective: 表现得非常出色.",
  },
  {
    id: "p-J-12",
    source: "组词成句 (J) 12",
    chunks: ["他", "被", "那所名牌大学", "录取", "了"],
    translation: "He was accepted by that prestigious university.",
    point: "被 + doer + verb",
    explanation:
      "The person affected comes first, then 被 + doer + verb + 了. The university does the accepting, so it follows 被.",
  },
  {
    id: "p-J-13",
    source: "组词成句 (J) 13",
    chunks: ["深呼吸", "有利于", "缓解", "紧张情绪"],
    translation: "Breathing deeply helps relieve nervous tension.",
    point: "有利于 + verb phrase",
    explanation:
      "深呼吸 is the subject. 有利于 ('is good for') takes the verb phrase 缓解紧张情绪 as its object.",
  },

  // ── 组词成句 (K) ────────────────────────────────────────────────
  {
    id: "p-J-14",
    source: "组词成句 (J) 14 (misprint 事务 corrected to 事物)",
    chunks: ["我们", "要学会", "从", "不同的角度", "观察", "事物"],
    translation: "We need to learn to look at things from different angles.",
    point: "从 + angle before the verb",
    explanation:
      "The prepositional phrase 从不同的角度 ('from different angles') goes before the verb 观察, and 事物 is its object. 要学会 takes the whole verb phrase.",
  },
  {
    id: "p-K-01",
    source: "组词成句 (K) 1",
    chunks: ["他", "显得", "有些", "犹豫"],
    translation: "He seems a bit hesitant.",
    point: "显得 + degree + adjective",
    explanation:
      "显得 ('appear') takes a description after it. The degree word 有些 goes before 犹豫.",
  },
  {
    id: "p-K-02",
    source: "组词成句 (K) 2",
    chunks: ["你还在", "为", "投资的事情", "发愁", "吗"],
    end: "？",
    translation: "Are you still worrying about the investment?",
    point: "为 + cause + 发愁",
    explanation:
      "为 + something + 发愁 means 'worry about something'; the 为 phrase goes before the verb. 吗 turns the statement into a question.",
  },
  {
    id: "p-K-03",
    source: "组词成句 (K) 3",
    chunks: ["鸽子", "象征", "着", "和平"],
    translation: "Doves symbolise peace.",
    point: "Verb + 着 + object",
    explanation:
      "着 attaches directly after the verb 象征 to show a lasting state, and the object 和平 follows.",
  },
  {
    id: "p-K-04",
    source: "组词成句 (K) 4",
    chunks: ["把", "文件", "放", "左边抽屉", "里"],
    translation: "Put the documents in the left-hand drawer.",
    point: "把 + V + place",
    explanation:
      "把 + object + 放 + place says where something goes. The locative 里 follows the place noun: 左边抽屉里.",
  },
  {
    id: "p-K-05",
    source: "组词成句 (K) 5",
    chunks: ["下载", "软件时", "应", "注意", "查杀病毒"],
    translation: "When downloading software, you should take care to scan for viruses.",
    point: "…时 time clause; modal before verb",
    explanation:
      "下载软件时 ('when downloading software') sets the time first. The modal 应 goes before 注意, which takes 查杀病毒 as its object.",
  },
  {
    id: "p-K-06",
    source: "组词成句 (K) 6",
    chunks: ["我会尽快", "把", "合影", "发给", "你们"],
    translation: "I'll send you the group photo as soon as possible.",
    point: "把 + V给 + person",
    explanation:
      "Modal and adverb (会尽快) go before 把. 把 + object + 发给 + recipient, with the recipient after 给.",
  },
  {
    id: "p-K-07",
    source: "组词成句 (K) 7",
    chunks: ["那位明星是", "电影节", "的", "主持人"],
    translation: "That star is the host of the film festival.",
    point: "Attributive 的",
    explanation:
      "是 links the subject to a noun phrase. 电影节的 describes whose host it is, so it comes before 主持人.",
  },
  {
    id: "p-K-08",
    source: "组词成句 (K) 8",
    chunks: ["对方在", "这场", "谈判中", "占", "优势"],
    translation: "The other side has the upper hand in these negotiations.",
    point: "在…中 before verb",
    explanation:
      "在 + 这场谈判 + 中 is a 'within' phrase and goes before the verb. 占优势 ('hold the advantage') is verb + object.",
  },
  {
    id: "p-K-09",
    source: "组词成句 (K) 9",
    chunks: ["我们每周", "轮流", "打扫宿舍", "卫生"],
    translation: "Every week we take turns cleaning the dormitory.",
    point: "Adverb before verb; 打扫…卫生",
    explanation:
      "轮流 ('in turn') goes before the verb. 打扫卫生 is a set verb-object pair, and 宿舍 tells where: 打扫宿舍卫生.",
  },
  {
    id: "p-K-10",
    source: "组词成句 (K) 10",
    chunks: ["他", "购买了", "一份", "意外保险"],
    translation: "He bought an accident insurance policy.",
    point: "Verb + 了 + number/measure + noun",
    explanation:
      "Number + measure word (一份) goes directly before the noun 意外保险, after the verb 购买了.",
  },
  {
    id: "p-K-11",
    source: "组词成句 (K) 11",
    chunks: ["黄金的", "价格", "一直在", "上涨"],
    translation: "The price of gold has been rising steadily.",
    point: "一直在 + verb",
    explanation:
      "黄金的价格 is the subject. 一直在 before a verb shows an action that has been continuing.",
  },
  {
    id: "p-K-12",
    source: "组词成句 (K) 12",
    chunks: ["他", "忍不住", "说出了那个", "秘密"],
    translation: "He couldn't help letting out that secret.",
    point: "忍不住 + verb",
    explanation:
      "忍不住 ('can't help') comes before the action. 那个 is the demonstrative for 秘密, so 秘密 completes 说出了那个.",
  },
  {
    id: "p-K-13",
    source: "组词成句 (K) 13",
    chunks: ["屋子里", "挂", "满了", "湿衣服"],
    translation: "The room is hung full of wet clothes.",
    point: "Existential sentence with V满了",
    explanation:
      "Place + verb + result (满了) + thing describes how a place is filled. The result 满 follows the verb 挂 directly.",
  },

  // ── 组词成句 (L) ────────────────────────────────────────────────
  {
    id: "p-L-01",
    source: "组词成句 (L) 1",
    chunks: ["电梯里的", "信号", "比较", "弱"],
    translation: "The signal in the lift is fairly weak.",
    point: "Adjective predicate",
    explanation:
      "电梯里的 modifies 信号, the subject. The degree adverb 比较 goes before the adjective 弱.",
  },
  {
    id: "p-L-02",
    source: "组词成句 (L) 2",
    chunks: ["他", "已经", "下决心", "戒烟了"],
    translation: "He has already made up his mind to quit smoking.",
    point: "Adverb before verb; 下决心 + verb",
    explanation:
      "已经 goes before the verb phrase. 下决心 ('make up one's mind') is followed by what one resolves to do: 戒烟.",
  },
  {
    id: "p-L-03",
    source: "组词成句 (L) 3",
    chunks: ["一个拥抱", "比", "什么安慰的话", "都温暖"],
    translation: "A hug is warmer than any words of comfort.",
    point: "A 比 B + 什么…都",
    explanation:
      "A 比 B + adjective. With 什么 in B, 都 must follow to mean 'than anything': 比什么安慰的话都温暖.",
  },
  {
    id: "p-L-04",
    source: "组词成句 (L) 4",
    chunks: ["那个", "花盆", "被", "打碎了"],
    translation: "That flowerpot was smashed.",
    point: "被 sentence without a doer",
    explanation:
      "那个 belongs with 花盆, the thing affected. With no doer, 被 goes right before the verb + result: 打碎了.",
  },
  {
    id: "p-L-05",
    source: "组词成句 (L) 5",
    chunks: ["你的", "简历", "还", "不够", "完善"],
    translation: "Your résumé still isn't polished enough.",
    point: "Adverb order: 还 + 不够",
    explanation:
      "你的简历 is the subject. 还 ('still') comes before the negative degree word 不够, which comes before the adjective 完善.",
  },
  {
    id: "p-L-06",
    source: "组词成句 (L) 6",
    chunks: ["我很", "期待他来", "我们", "学校", "演讲"],
    translation: "I'm really looking forward to him coming to our school to give a talk.",
    point: "来 + place + purpose",
    explanation:
      "期待 takes a clause as its object. 来 + place + verb means 'come somewhere to do something', so 我们学校 sits between 来 and 演讲.",
  },
  {
    id: "p-L-07",
    source: "组词成句 (L) 7",
    chunks: ["该地区的", "人口", "在逐年", "增加"],
    translation: "The population of the region is increasing year by year.",
    point: "在 + adverb + verb",
    explanation:
      "该地区的人口 is the subject. 在 (progressive) and 逐年 ('year by year') go before the verb 增加.",
  },
  {
    id: "p-L-08",
    source: "组词成句 (L) 8",
    chunks: ["这次夏令营", "让", "我", "收获", "很多"],
    translation: "I got a lot out of this summer camp.",
    point: "Causative 让",
    explanation:
      "Cause + 让 + person + result. 这次夏令营 is the cause, 我 is affected, and 收获很多 is the result.",
  },
  {
    id: "p-L-09",
    source: "组词成句 (L) 9",
    chunks: ["弟弟曾经", "是", "一位", "疯狂的", "球迷"],
    translation: "My younger brother was once a crazy football fan.",
    point: "Order of attributives",
    explanation:
      "曾经 goes before 是. In the noun phrase, number + measure word (一位) comes before the 的 description (疯狂的).",
  },
  {
    id: "p-L-10",
    source: "组词成句 (L) 10",
    chunks: ["书架", "上", "摆满了", "历史书"],
    translation: "The bookshelf is filled with history books.",
    point: "Existential sentence",
    explanation:
      "Place (书架上) + verb + result + thing. The locative 上 follows its noun, and the thing on display comes last.",
  },
  {
    id: "p-L-11",
    source: "组词成句 (L) 11",
    chunks: ["网络上", "有", "极其", "丰富的", "学习资源"],
    translation: "There are extremely rich learning resources online.",
    point: "Existential 有; degree adverb in attributive",
    explanation:
      "Place + 有 + thing. 极其 modifies the adjective 丰富, and 极其丰富的 together describe 学习资源.",
  },
  {
    id: "p-L-12",
    source: "组词成句 (L) 12",
    chunks: ["这个", "展览", "将", "持续", "10天", "左右"],
    translation: "The exhibition will run for about ten days.",
    point: "Duration after verb; 左右",
    explanation:
      "将 goes before the verb 持续. A duration follows the verb, and 左右 ('about') comes after the number it approximates.",
  },

  // ── 组词成句 (M) ────────────────────────────────────────────────
  {
    id: "p-M-01",
    source: "组词成句 (M) 1 (misprint 产商 corrected to 厂商)",
    chunks: ["这个厂商的", "优势", "很", "明显"],
    translation: "This manufacturer's advantage is very clear.",
    point: "Subject + 很 + adjective",
    explanation:
      "这个厂商的 describes 优势, which is the subject. The degree adverb 很 goes directly before the adjective predicate 明显.",
  },
  {
    id: "p-M-02",
    source: "组词成句 (M) 2",
    chunks: ["投资必须", "承担", "一定", "的风险"],
    translation: "Investing means having to accept a certain amount of risk.",
    point: "一定的 + noun",
    explanation:
      "必须 goes before the verb 承担. 一定的 ('a certain') describes 风险, so it sits directly before it.",
  },
  {
    id: "p-M-03",
    source: "组词成句 (M) 3",
    chunks: ["互联网转变了", "人们的", "消费", "观念"],
    translation: "The internet has changed people's attitudes to spending.",
    point: "Order of attributives",
    explanation:
      "A possessive 的 phrase (人们的) comes before a noun that classifies the head noun directly (消费观念).",
  },
  {
    id: "p-M-04",
    source: "组词成句 (M) 4",
    chunks: ["他的", "发言", "有点儿", "前后矛盾"],
    translation: "His speech was a bit self-contradictory.",
    point: "有点儿 before predicate",
    explanation:
      "他的发言 is the subject. 有点儿 ('a bit', usually for something negative) goes before the predicate 前后矛盾.",
  },
  {
    id: "p-M-05",
    source: "组词成句 (M) 5",
    chunks: ["酒后", "驾驶", "是一种", "违法", "行为"],
    translation: "Drink-driving is an illegal act.",
    point: "是一种 + noun phrase",
    explanation:
      "酒后驾驶 ('driving after drinking') is the subject. 是一种 + 违法行为 classifies it, with 违法 attached directly to 行为.",
  },
  {
    id: "p-M-06",
    source: "组词成句 (M) 6",
    chunks: ["陈教授", "推荐她", "去电台", "实习"],
    translation: "Professor Chen recommended her for an internship at the radio station.",
    point: "Pivotal sentence; 去 + place + purpose",
    explanation:
      "推荐 + person + action: 她 is both the object of 推荐 and the doer of what follows. 去 + place + verb means 'go somewhere to do something'.",
  },
  {
    id: "p-M-07",
    source: "组词成句 (M) 7",
    chunks: ["科学家", "正在", "积极", "地", "寻找新能源"],
    translation: "Scientists are actively searching for new energy sources.",
    point: "正在 + adjective 地 + verb",
    explanation:
      "正在 comes first, then the manner adverbial 积极地 directly before the verb 寻找.",
  },
  {
    id: "p-M-08",
    source: "组词成句 (M) 8",
    chunks: ["多家媒体", "都对", "此事", "进行了", "报道"],
    translation: "Many media outlets have reported on this matter.",
    point: "对 + object + 进行 + verb",
    explanation:
      "对 + topic goes before the verb. 进行 is a dummy verb that takes the real action 报道 as its object.",
  },
  {
    id: "p-M-09",
    source: "组词成句 (M) 9",
    chunks: ["这学期女儿", "的", "进步", "很明显"],
    translation: "My daughter's progress this term is obvious.",
    point: "Attributive 的",
    explanation:
      "这学期女儿的 describes 进步, the subject. 很明显 is the predicate.",
  },
  {
    id: "p-M-10",
    source: "组词成句 (M) 10",
    chunks: ["他", "说话的", "语气", "有些不耐烦"],
    translation: "His tone of voice was a little impatient.",
    point: "Clause as attributive",
    explanation:
      "他说话的 ('when he speaks') describes 语气, the subject. 有些不耐烦 is the predicate.",
  },
  {
    id: "p-M-11",
    source: "组词成句 (M) 11",
    chunks: ["姥姥手术后", "恢复", "得", "很好"],
    translation: "Grandma has recovered well since her operation.",
    point: "Degree complement with 得",
    explanation:
      "Subject + verb + 得 + comment: 恢复得很好.",
  },
  {
    id: "p-M-12",
    source: "组词成句 (M) 12",
    chunks: ["王教授", "的", "讲座", "允许录音", "吗"],
    end: "？",
    translation: "Is recording allowed at Professor Wang's lecture?",
    point: "Attributive 的; 吗 question",
    explanation:
      "王教授的讲座 is the subject and 允许录音 the predicate. 吗 goes at the very end to make a yes/no question.",
  },
  {
    id: "p-M-13",
    source: "组词成句 (M) 13",
    chunks: ["谁", "会计算这个", "圆形", "的", "面积"],
    end: "？",
    translation: "Who knows how to calculate the area of this circle?",
    point: "Question word as subject",
    explanation:
      "谁 asks about the doer, so it stands in the subject slot. 这个圆形的 describes 面积, the object of 计算.",
  },
  {
    id: "p-M-14",
    source: "组词成句 (M) 14",
    chunks: ["你别", "把", "咖啡", "洒在", "文件上"],
    translation: "Don't spill coffee on the documents.",
    point: "Negative imperative with 把",
    explanation:
      "别 goes before 把, never between the 把 phrase and the verb. 把 + object + V在 + place says where the coffee would end up.",
  },
  {
    id: "p-M-15",
    source: "组词成句 (M) 15",
    chunks: ["诗歌", "包含", "在文学研究", "的范围之内"],
    translation: "Poetry falls within the scope of literary studies.",
    point: "V在 + 的范围之内",
    explanation:
      "诗歌 is the subject. 包含在 + X + 的范围之内 means 'is included within the scope of X'.",
  },
  {
    id: "p-M-16",
    source: "组词成句 (M) 16",
    chunks: ["他", "决心用", "半年", "时间", "通过法律", "资格考试"],
    translation: "He is determined to pass the bar exam within six months.",
    point: "用 + time + verb",
    explanation:
      "决心 takes the verb phrase that follows. 用 + amount of time + verb means 'spend that time doing', and 法律资格考试 is the object of 通过.",
  },
];
