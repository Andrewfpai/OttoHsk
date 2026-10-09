import type { ConfusableSet } from "./types";

export const confusables: ConfusableSet[] = [
  {
    id: "bixu-bixu2",
    words: [
      { hanzi: "必须", pinyin: "bìxū", gloss: "must (adverb)" },
      { hanzi: "必需", pinyin: "bìxū", gloss: "necessary, essential" },
    ],
    explanation:
      "必须 is an adverb meaning 'must' and always comes before a verb. 必需 means 'indispensable, required' and describes things: it appears in 必需品 (necessities) and in the pattern (为/是)……所必需的. If a verb follows the blank, you want 必须; if a noun or the end of the sentence follows, you want 必需.",
    questions: [
      {
        sentence: "明天的会议非常重要，你＿＿准时参加。",
        answer: "必须",
        why: "A verb (参加) follows, so the adverb 必须 'must' is needed; 必需 cannot modify a verb.",
      },
      {
        sentence: "水和空气是人类生存所＿＿的。",
        answer: "必需",
        why: "The pattern 是……所必需的 'is required by' takes 必需; 必须 would need a verb after it.",
      },
      {
        sentence: "出发前，请把药品等旅行＿＿品准备好。",
        answer: "必需",
        why: "必需品 'necessities' is a fixed word; 必须品 does not exist.",
      },
      {
        sentence: "申请奖学金的同学＿＿在月底以前提交材料。",
        answer: "必须",
        why: "This is an obligation before a verb phrase (在月底以前提交), which is the job of the adverb 必须.",
      },
    ],
  },
  {
    id: "chengdan-danren",
    words: [
      { hanzi: "承担", pinyin: "chéngdān", gloss: "to bear, to take on (responsibility, costs)" },
      { hanzi: "担任", pinyin: "dānrèn", gloss: "to hold (a post), to serve as" },
    ],
    explanation:
      "担任 takes a job title or role as its object: 担任经理, 担任主角, 担任翻译. 承担 takes something you have to carry, such as responsibility, costs or risk: 承担责任, 承担费用. If the object is a position or role, choose 担任; if it is a burden, choose 承担.",
    questions: [
      {
        sentence: "他在这家公司＿＿销售经理。",
        answer: "担任",
        why: "销售经理 is a post, and holding a post is 担任.",
      },
      {
        sentence: "这次事故的责任应该由谁来＿＿？",
        answer: "承担",
        why: "Responsibility is a burden you take on, so 承担责任.",
      },
      {
        sentence: "所有的费用都由公司＿＿。",
        answer: "承担",
        why: "Covering costs is 承担费用; 担任 needs a post or role.",
      },
      {
        sentence: "她在这部电影中＿＿女主角。",
        answer: "担任",
        why: "Playing a role is 担任 + role.",
      },
    ],
  },
  {
    id: "nanmian-bimian",
    words: [
      { hanzi: "难免", pinyin: "nánmiǎn", gloss: "hard to avoid, inevitable" },
      { hanzi: "避免", pinyin: "bìmiǎn", gloss: "to avoid, to prevent" },
    ],
    explanation:
      "避免 is an action verb: someone avoids something, and it takes an object (避免错误, 避免迟到). 难免 is an adjective meaning 'hard to avoid'; it describes a situation, either as 是难免的 or before a verb phrase, often with 会 (难免会紧张). 难免 never takes a direct object.",
    questions: [
      {
        sentence: "新手开车，出点儿小错误是＿＿的。",
        answer: "难免",
        why: "是……的 needs an adjective describing the situation, and 难免 'inevitable' is one; 避免 is a verb that needs an object.",
      },
      {
        sentence: "为了＿＿迟到，他提前半个小时出了门。",
        answer: "避免",
        why: "He actively avoids being late, so the verb 避免 with its object 迟到 is right.",
      },
      {
        sentence: "两个人在一起生活久了，＿＿会有一些矛盾。",
        answer: "难免",
        why: "难免会 means 'will inevitably'; 避免会有 is ungrammatical.",
      },
      {
        sentence: "平时多运动，可以＿＿很多健康问题。",
        answer: "避免",
        why: "Exercise prevents health problems, an action with an object, which needs the verb 避免.",
      },
    ],
  },
  {
    id: "faner-raner",
    words: [
      { hanzi: "反而", pinyin: "fǎn'ér", gloss: "on the contrary, instead" },
      { hanzi: "然而", pinyin: "rán'ér", gloss: "however, yet" },
    ],
    explanation:
      "反而 is an adverb: it comes after the subject and before the verb, and says the result is the opposite of what you would expect (often after 不但不/没……). 然而 is a conjunction for a general contrast and stands at the start of a clause, before the subject. If a subject follows the blank, 反而 is impossible.",
    questions: [
      {
        sentence: "吃了药以后，他的感冒不但没好，＿＿更严重了。",
        answer: "反而",
        why: "不但没……反而 'not only did it not…, it actually…' marks the opposite of the expected result.",
      },
      {
        sentence: "这个方法听起来很简单，＿＿很多人真正做起来却发现并不容易。",
        answer: "然而",
        why: "The blank comes before the subject 很多人, a position only the conjunction 然而 can take.",
      },
      {
        sentence: "我好心帮他，没想到他＿＿怪我多管闲事。",
        answer: "反而",
        why: "The blank sits after the subject 他 and the result is the opposite of what kindness should bring, which is the job of 反而.",
      },
      {
        sentence: "大家都以为他会赢，＿＿比赛结果出乎所有人的意料。",
        answer: "然而",
        why: "The blank opens a clause before its subject 比赛结果, so the conjunction 然而 is needed.",
      },
    ],
  },
  {
    id: "hebi-bubi",
    words: [
      { hanzi: "何必", pinyin: "hébì", gloss: "why bother? (rhetorical)" },
      { hanzi: "不必", pinyin: "bùbì", gloss: "need not" },
    ],
    explanation:
      "Both say something is unnecessary. 何必 does it with a rhetorical question, so the sentence usually ends in 呢 and a question mark (又何必……呢？). 不必 is a plain statement, 'there is no need to', and ends with a full stop.",
    questions: [
      {
        sentence: "这点小事，你＿＿生这么大的气呢？",
        answer: "何必",
        why: "The rhetorical question with 呢 and a question mark calls for 何必.",
      },
      {
        sentence: "明天的会你＿＿参加了，我会把会议内容告诉你。",
        answer: "不必",
        why: "This is a plain statement that you need not attend, so 不必 fits; 何必 would need a rhetorical question.",
      },
      {
        sentence: "既然已经决定了，又＿＿后悔呢？",
        answer: "何必",
        why: "又何必……呢？ is the fixed rhetorical pattern 'why bother…?'",
      },
      {
        sentence: "大家＿＿担心，问题已经解决了。",
        answer: "不必",
        why: "A calm statement 'there is no need to worry' uses 不必.",
      },
    ],
  },
  {
    id: "jianqiang-jianjue",
    words: [
      { hanzi: "坚强", pinyin: "jiānqiáng", gloss: "strong (in character), resilient" },
      { hanzi: "坚决", pinyin: "jiānjué", gloss: "firm, resolute, determined" },
    ],
    explanation:
      "坚强 describes a person's inner strength: not breaking down in hardship or pain. 坚决 describes a firm attitude or decision that will not change, and it often comes before verbs like 反对, 支持 or 要求. Strength in suffering is 坚强; firmness in a decision is 坚决.",
    questions: [
      {
        sentence: "遇到再大的困难，她都很＿＿，从来不哭。",
        answer: "坚强",
        why: "Not crying in hardship is inner strength, which is 坚强.",
      },
      {
        sentence: "我们＿＿反对这种浪费的做法。",
        answer: "坚决",
        why: "坚决反对 'firmly oppose' is a resolute attitude before a verb.",
      },
      {
        sentence: "失去父母以后，这个孩子＿＿地活了下来。",
        answer: "坚强",
        why: "Carrying on through grief shows resilience, which is 坚强.",
      },
      {
        sentence: "他的态度很＿＿，谁劝都没用。",
        answer: "坚决",
        why: "An attitude that no one can change is 坚决.",
      },
    ],
  },
  {
    id: "biran-biyao",
    words: [
      { hanzi: "必然", pinyin: "bìrán", gloss: "inevitable, bound to" },
      { hanzi: "必要", pinyin: "bìyào", gloss: "necessary, needed" },
    ],
    explanation:
      "必然 means something is bound to happen by its nature: 必然结果, 是必然的, 必然会. 必要 means something is needed or worth doing: 有必要, 没有必要, 必要的准备. Inevitability is 必然; necessity is 必要.",
    questions: [
      {
        sentence: "你没有＿＿为这点小事生气。",
        answer: "必要",
        why: "没有必要 'there is no need' is about necessity.",
      },
      {
        sentence: "不努力学习，考试失败是＿＿的。",
        answer: "必然",
        why: "Failure is the inevitable outcome, which is 必然.",
      },
      {
        sentence: "出国以前，最好带上一些＿＿的药品。",
        answer: "必要",
        why: "Medicine you need is 必要的; 必然的药品 makes no sense.",
      },
      {
        sentence: "这是社会发展的＿＿结果。",
        answer: "必然",
        why: "必然结果 'inevitable result' is the fixed collocation.",
      },
    ],
  },
  {
    id: "fahui-fayang",
    words: [
      { hanzi: "发挥", pinyin: "fāhuī", gloss: "to bring into play, to perform" },
      { hanzi: "发扬", pinyin: "fāyáng", gloss: "to carry forward, to develop" },
    ],
    explanation:
      "发挥 means to make full use of an ability or to perform on the day: 发挥作用, 发挥特长, 发挥水平, 发挥得很好. 发扬 means to carry forward and spread something good that already exists: 发扬传统, 发扬精神, 发扬优点. Only 发挥 is used for how well someone performed.",
    questions: [
      {
        sentence: "这次比赛他＿＿得很好，拿了第一名。",
        answer: "发挥",
        why: "How well someone performs is 发挥得好; 发扬 cannot describe performance.",
      },
      {
        sentence: "我们要继续＿＿艰苦奋斗的优良传统。",
        answer: "发扬",
        why: "发扬传统 'carry forward a tradition' is the fixed collocation.",
      },
      {
        sentence: "每个人都应该充分＿＿自己的特长。",
        answer: "发挥",
        why: "Making full use of one's strengths is 发挥特长.",
      },
      {
        sentence: "助人为乐的精神值得大力＿＿。",
        answer: "发扬",
        why: "A spirit or virtue is carried forward with 发扬精神.",
      },
    ],
  },
  {
    id: "gaijin-gaishan",
    words: [
      { hanzi: "改进", pinyin: "gǎijìn", gloss: "to improve (methods, technique)" },
      { hanzi: "改善", pinyin: "gǎishàn", gloss: "to improve (conditions, relations)" },
    ],
    explanation:
      "改进 is for making methods, technology, designs and ways of working more advanced: 改进技术, 改进方法. 改善 is for making conditions or situations better: 改善环境, 改善生活, 改善关系. Think 'tools and techniques' for 改进 and 'circumstances' for 改善.",
    questions: [
      {
        sentence: "近几年，这里的居住环境得到了很大的＿＿。",
        answer: "改善",
        why: "Living conditions and the environment are improved with 改善.",
      },
      {
        sentence: "工厂＿＿了生产技术，效率提高了一倍。",
        answer: "改进",
        why: "Technology and methods are improved with 改进.",
      },
      {
        sentence: "两国关系近来有所＿＿。",
        answer: "改善",
        why: "Relationships are said to 改善, not 改进.",
      },
      {
        sentence: "这台机器经过＿＿，耗电量少了很多。",
        answer: "改进",
        why: "Redesigning a machine is a technical improvement, which is 改进.",
      },
    ],
  },
  {
    id: "jinli-jinliang",
    words: [
      { hanzi: "尽力", pinyin: "jìnlì", gloss: "to do one's best" },
      { hanzi: "尽量", pinyin: "jǐnliàng", gloss: "as far as possible" },
    ],
    explanation:
      "尽量 is an adverb meaning 'as much or as far as possible', so a verb phrase must follow it (尽量早点儿到). 尽力 is a verb phrase meaning 'to do one's utmost', so it can end a sentence (已经尽力了) and appears in 尽力而为. If nothing follows the blank, or it is 而为, choose 尽力.",
    questions: [
      {
        sentence: "你别怪他了，他已经＿＿了。",
        answer: "尽力",
        why: "The blank ends the clause, and only the verb phrase 尽力 can stand alone; 尽量 needs a verb after it.",
      },
      {
        sentence: "明天的考试很重要，请大家＿＿早点儿到。",
        answer: "尽量",
        why: "尽量 + verb phrase means 'as early as possible'.",
      },
      {
        sentence: "写作文时，要＿＿使用学过的新词语。",
        answer: "尽量",
        why: "Using new words as much as possible is the adverb 尽量 before a verb.",
      },
      {
        sentence: "这件事能不能成功我不敢保证，但我一定＿＿而为。",
        answer: "尽力",
        why: "尽力而为 'do one's best' is a fixed phrase.",
      },
    ],
  },
  {
    id: "bijing-jiujing",
    words: [
      { hanzi: "毕竟", pinyin: "bìjìng", gloss: "after all" },
      { hanzi: "究竟", pinyin: "jiūjìng", gloss: "on earth? exactly? (in questions)" },
    ],
    explanation:
      "毕竟 is used in statements to stress a key fact that should be remembered: 他毕竟是个孩子. 究竟 is used in questions to press for the real answer, like 到底: 你究竟去不去？ (究竟 can mean 'after all' in formal writing, but in modern usage treat it as a question word.) A question mark is the quickest clue.",
    questions: [
      {
        sentence: "你＿＿想不想去？快点儿决定吧。",
        answer: "究竟",
        why: "This is a question demanding a real answer, so 究竟 'on earth' fits.",
      },
      {
        sentence: "别对他要求太高，他＿＿还是个孩子。",
        answer: "毕竟",
        why: "This statement reminds us of a key fact, which is the job of 毕竟 'after all'.",
      },
      {
        sentence: "这件事＿＿是谁做的？",
        answer: "究竟",
        why: "A 谁 question pressing for the truth takes 究竟.",
      },
      {
        sentence: "虽然这次失败了，但这＿＿是一次宝贵的经验。",
        answer: "毕竟",
        why: "This statement stresses a fact that still counts, which calls for 毕竟.",
      },
    ],
  },
  {
    id: "fabiao-gongbu",
    words: [
      { hanzi: "发表", pinyin: "fābiǎo", gloss: "to publish; to state (an opinion)" },
      { hanzi: "公布", pinyin: "gōngbù", gloss: "to announce publicly, to make public" },
    ],
    explanation:
      "发表 is for putting your own writing or views out there: 发表文章, 发表意见, 发表讲话. 公布 is for an organisation making information public: 公布成绩, 公布名单, 公布结果. Your own words are 发表; official information is 公布.",
    questions: [
      {
        sentence: "他在杂志上＿＿了一篇关于环境保护的文章。",
        answer: "发表",
        why: "Publishing an article is 发表文章.",
      },
      {
        sentence: "考试成绩下周一＿＿。",
        answer: "公布",
        why: "Results released officially for everyone are 公布.",
      },
      {
        sentence: "请大家＿＿一下自己的意见。",
        answer: "发表",
        why: "Stating your own opinion is 发表意见.",
      },
      {
        sentence: "学校已经在网上＿＿了录取名单。",
        answer: "公布",
        why: "An official list made public is 公布名单.",
      },
    ],
  },
  {
    id: "zaisan-yizai",
    words: [
      { hanzi: "再三", pinyin: "zàisān", gloss: "again and again (deliberately)" },
      { hanzi: "一再", pinyin: "yīzài", gloss: "repeatedly, time after time" },
    ],
    explanation:
      "Both can go before a verb meaning 'repeatedly' (再三嘱咐, 一再强调). Only 再三 can also come after a verb as a complement: 考虑再三, 犹豫再三. 再三 describes a person's deliberate repeated action, while 一再 can also describe events that keep happening on their own, such as 一再发生.",
    questions: [
      {
        sentence: "他考虑＿＿，最后还是决定出国留学。",
        answer: "再三",
        why: "The blank comes after the verb 考虑, a position only 再三 can take.",
      },
      {
        sentence: "犹豫＿＿之后，她终于说出了心里的话。",
        answer: "再三",
        why: "犹豫再三 puts the word after the verb, which 一再 cannot do.",
      },
      {
        sentence: "这类安全事故＿＿发生，说明管理上存在问题。",
        answer: "一再",
        why: "Accidents happening again and again is not a deliberate act, so 一再 fits and 再三 does not.",
      },
    ],
  },
  {
    id: "jianzhi-jihu",
    words: [
      { hanzi: "简直", pinyin: "jiǎnzhí", gloss: "simply, virtually (exaggeration)" },
      { hanzi: "几乎", pinyin: "jīhū", gloss: "almost, nearly" },
    ],
    explanation:
      "几乎 is factual: something is very close to a limit or an amount (几乎坐满, 几乎每个人). 简直 is emotional exaggeration: 'simply, just', said with feeling, often with 是, 太……了 or 像. If the sentence measures how close something is, choose 几乎; if it exclaims, choose 简直.",
    questions: [
      {
        sentence: "会场里＿＿坐满了人，只剩下几个空位。",
        answer: "几乎",
        why: "The hall is close to full with a few seats left, a factual approximation that needs 几乎.",
      },
      {
        sentence: "你这样做＿＿是在浪费时间！",
        answer: "简直",
        why: "This is an emotional exaggeration with 是, the typical use of 简直.",
      },
      {
        sentence: "我们班＿＿每个人都去过长城。",
        answer: "几乎",
        why: "几乎 can modify 每个人 to mean 'almost everyone'; 简直 cannot.",
      },
      {
        sentence: "这么难的题他十分钟就做完了，＿＿太厉害了！",
        answer: "简直",
        why: "An exclamation with 太……了 calls for 简直; 几乎太厉害了 is wrong.",
      },
    ],
  },
  {
    id: "baochi-baocun",
    words: [
      { hanzi: "保持", pinyin: "bǎochí", gloss: "to maintain, to keep (a state)" },
      { hanzi: "保存", pinyin: "bǎocún", gloss: "to preserve, to save (an object, a file)" },
    ],
    explanation:
      "保持 keeps a state or condition from changing: 保持安静, 保持联系, 保持健康. 保存 keeps a physical thing or data safe so it is not lost or damaged: 保存照片, 保存文件. Ask whether the object is a state (保持) or a thing (保存).",
    questions: [
      {
        sentence: "请大家在图书馆里＿＿安静。",
        answer: "保持",
        why: "安静 is a state to maintain, so 保持 fits.",
      },
      {
        sentence: "这些老照片他一直＿＿得很好。",
        answer: "保存",
        why: "Photos are physical objects kept safe, which is 保存.",
      },
      {
        sentence: "毕业以后，我们还一直＿＿着联系。",
        answer: "保持",
        why: "保持联系 'keep in touch' is the fixed collocation.",
      },
      {
        sentence: "文件写完以后，别忘了＿＿。",
        answer: "保存",
        why: "Saving a computer file is 保存.",
      },
    ],
  },
  {
    id: "jiaohuan-jiaoliu",
    words: [
      { hanzi: "交换", pinyin: "jiāohuàn", gloss: "to exchange, to swap (things)" },
      { hanzi: "交流", pinyin: "jiāoliú", gloss: "to communicate; exchange (of ideas, culture)" },
    ],
    explanation:
      "交换 means giving one thing and getting another back: 交换礼物, 交换座位. 交流 means sharing ideas, experience or culture, or simply communicating with people: 文化交流, 跟别人交流. Swapping concrete items is 交换; talking and sharing is 交流.",
    questions: [
      {
        sentence: "新年的时候，同学们互相＿＿了礼物。",
        answer: "交换",
        why: "Giving and receiving gifts is a swap of concrete things, which is 交换.",
      },
      {
        sentence: "我们可以＿＿一下座位吗？",
        answer: "交换",
        why: "Swapping seats is 交换; 交流 is never used for objects.",
      },
      {
        sentence: "这次活动促进了两国之间的文化＿＿。",
        answer: "交流",
        why: "文化交流 'cultural exchange' is the fixed term.",
      },
      {
        sentence: "他性格内向，不太喜欢跟别人＿＿。",
        answer: "交流",
        why: "Communicating with people is 交流; 交换 needs something concrete to swap.",
      },
    ],
  },
  {
    id: "tihui-tiyan",
    words: [
      { hanzi: "体会", pinyin: "tǐhuì", gloss: "to understand through experience; insight" },
      { hanzi: "体验", pinyin: "tǐyàn", gloss: "to experience for oneself; an experience" },
    ],
    explanation:
      "体会 is about understanding: grasping a meaning or someone's feelings, often as 体会到. 体验 is about living through something yourself: 体验生活, and as a noun 'an experience'. Understanding a meaning or feeling is 体会; trying out a way of life or an activity is 体验.",
    questions: [
      {
        sentence: "读了好几遍以后，我才慢慢＿＿到这句话的意思。",
        answer: "体会",
        why: "Grasping the meaning of a sentence is understanding, which is 体会.",
      },
      {
        sentence: "暑假他去农村＿＿了一个月的农民生活。",
        answer: "体验",
        why: "Living a farmer's life for a month is experiencing it first-hand, which is 体验.",
      },
      {
        sentence: "坐过山车是一种非常刺激的＿＿。",
        answer: "体验",
        why: "As a noun meaning 'an experience' you went through, the word is 体验.",
      },
      {
        sentence: "你能＿＿我现在的心情吗？",
        answer: "体会",
        why: "Understanding another person's feelings is 体会.",
      },
    ],
  },
  {
    id: "zhijin-conglai",
    words: [
      { hanzi: "至今", pinyin: "zhìjīn", gloss: "up to now, so far" },
      { hanzi: "从来", pinyin: "cónglái", gloss: "always, ever (usually with a negative)" },
    ],
    explanation:
      "至今 marks a time span ending now and can come after a verb (保留至今) or before a clause (至今还没有……). 从来 describes a constant habit or fact from the past until now, almost always with a negative (从来不, 从来没) or as 从来就. 至今 answers 'up until when?'; 从来 says 'never' or 'always'.",
    questions: [
      {
        sentence: "这个传统一直保留＿＿。",
        answer: "至今",
        why: "The blank comes after the verb to mean 'until today', which only 至今 can do.",
      },
      {
        sentence: "他＿＿就不喜欢吃辣的。",
        answer: "从来",
        why: "从来就不 'has never' describes a constant preference; 至今就 is not used.",
      },
      {
        sentence: "那件事已经过去十年了，＿＿还没有人知道真相。",
        answer: "至今",
        why: "The point is that up to now nobody knows, a time span ending now, which is 至今.",
      },
      {
        sentence: "他是个守时的人，上班＿＿不迟到。",
        answer: "从来",
        why: "A permanent habit is stated with 从来不 'never'.",
      },
    ],
  },
  {
    id: "gaizheng-xiugai",
    words: [
      { hanzi: "改正", pinyin: "gǎizhèng", gloss: "to correct (a mistake or fault)" },
      { hanzi: "修改", pinyin: "xiūgǎi", gloss: "to revise, to modify" },
    ],
    explanation:
      "改正 means putting right something that is wrong, so its object is a mistake, fault or bad habit: 改正错误, 改正缺点. 修改 means revising a piece of writing, a plan or a design to make it better: 修改文章, 修改计划. Faults are 改正; documents and plans are 修改.",
    questions: [
      {
        sentence: "老师帮我＿＿了这篇作文。",
        answer: "修改",
        why: "Revising a piece of writing is 修改; an essay is not a fault you 改正.",
      },
      {
        sentence: "他下决心＿＿自己的坏习惯。",
        answer: "改正",
        why: "A bad habit is a fault to put right, which is 改正.",
      },
      {
        sentence: "这个计划还需要再＿＿一下。",
        answer: "修改",
        why: "Plans are revised with 修改.",
      },
      {
        sentence: "我们要帮助他＿＿缺点。",
        answer: "改正",
        why: "改正缺点 'correct one's shortcomings' is the fixed collocation.",
      },
    ],
  },
  {
    id: "chuli-jiejue",
    words: [
      { hanzi: "处理", pinyin: "chǔlǐ", gloss: "to handle, to deal with; to sell off" },
      { hanzi: "解决", pinyin: "jiějué", gloss: "to solve, to resolve" },
    ],
    explanation:
      "解决 means to solve a problem or difficulty so it is gone: 解决问题, 解决困难. 处理 means to handle or deal with something, which need not mean solving it: 处理事情, 处理旧家具; it also means selling goods off cheaply. Getting rid of objects or selling stock is 处理; making a difficulty disappear is 解决.",
    questions: [
      {
        sentence: "这些旧家具你打算怎么＿＿？",
        answer: "处理",
        why: "Getting rid of old furniture is 处理; furniture is not a problem you 解决.",
      },
      {
        sentence: "只要大家一起努力，困难总会＿＿的。",
        answer: "解决",
        why: "A difficulty that goes away has been 解决; 处理 does not mean overcoming a difficulty.",
      },
      {
        sentence: "商场正在低价＿＿一批过季的衣服。",
        answer: "处理",
        why: "Selling off stock cheaply is a special meaning of 处理.",
      },
      {
        sentence: "政府帮他们＿＿了住房困难。",
        answer: "解决",
        why: "解决困难 'resolve a difficulty' is the standard collocation.",
      },
    ],
  },
  {
    id: "xianshi-biaoshi",
    words: [
      { hanzi: "显示", pinyin: "xiǎnshì", gloss: "to show, to display" },
      { hanzi: "表示", pinyin: "biǎoshì", gloss: "to express, to indicate" },
    ],
    explanation:
      "显示 means that data, results or a screen show something clearly: 调查显示, 屏幕上显示. 表示 means a person expresses an attitude or feeling (表示感谢, 表示同意), or that a sign means something. Results and screens 显示; people 表示.",
    questions: [
      {
        sentence: "调查结果＿＿，越来越多的年轻人喜欢在网上购物。",
        answer: "显示",
        why: "Survey results 'show' a finding with 显示; 表示 is for a person stating something.",
      },
      {
        sentence: "他向帮助过自己的人＿＿了感谢。",
        answer: "表示",
        why: "表示感谢 'express thanks' is the fixed collocation.",
      },
      {
        sentence: "手机屏幕上＿＿有三个未接电话。",
        answer: "显示",
        why: "Information appearing on a screen is 显示.",
      },
      {
        sentence: "他点了点头，＿＿同意。",
        answer: "表示",
        why: "A person nodding to express agreement is 表示同意.",
      },
    ],
  },
  {
    id: "wanyi-ruguo",
    words: [
      { hanzi: "万一", pinyin: "wànyī", gloss: "in case; an unlikely mishap" },
      { hanzi: "如果", pinyin: "rúguǒ", gloss: "if" },
    ],
    explanation:
      "如果 is the neutral 'if' for any condition. 万一 means 'in case', for an unlikely possibility that is usually unwelcome, and it is also a noun in 以防万一 'just in case'. Use 万一 only when the condition is a risk you are guarding against.",
    questions: [
      {
        sentence: "出门多带点儿钱吧，以防＿＿。",
        answer: "万一",
        why: "以防万一 'just in case' is a fixed phrase where 万一 is a noun.",
      },
      {
        sentence: "＿＿你努力学习，就一定能通过考试。",
        answer: "如果",
        why: "Studying hard is not a risk to guard against, so the neutral 如果 is right.",
      },
      {
        sentence: "＿＿把冰加热，它就会变成水。",
        answer: "如果",
        why: "This is a general cause-and-effect condition with no risk involved, so only 如果 fits.",
      },
    ],
  },
  {
    id: "yizhi-tongyi",
    words: [
      { hanzi: "一致", pinyin: "yīzhì", gloss: "unanimous, consistent" },
      { hanzi: "统一", pinyin: "tǒngyī", gloss: "to unify, to standardise; unified" },
    ],
    explanation:
      "一致 is an adjective meaning 'in agreement, consistent', and it often comes before a verb: 一致同意, 一致认为, 言行一致. 统一 is mainly a verb meaning 'to unify, to make the same' and takes an object: 统一国家, 统一标准. If the blank needs an object after it, choose 统一.",
    questions: [
      {
        sentence: "大家＿＿同意了这个方案。",
        answer: "一致",
        why: "一致同意 'unanimously agreed' is the fixed pattern.",
      },
      {
        sentence: "公司决定＿＿员工的工作服。",
        answer: "统一",
        why: "Making the uniforms the same takes an object, which is the verb 统一.",
      },
      {
        sentence: "他说的和做的不＿＿，所以大家都不相信他。",
        answer: "一致",
        why: "Words and actions being consistent is 一致.",
      },
      {
        sentence: "秦始皇＿＿了中国。",
        answer: "统一",
        why: "Unifying a country is 统一 + object.",
      },
    ],
  },
  {
    id: "luxu-lianxu",
    words: [
      { hanzi: "陆续", pinyin: "lùxù", gloss: "one after another, in succession" },
      { hanzi: "连续", pinyin: "liánxù", gloss: "continuously, in a row" },
    ],
    explanation:
      "陆续 means people or things come or go one after another, with gaps, over a period. 连续 means without a break, and it is often followed by a number and a time word (连续三年, 连续工作十二个小时). Use 连续 when you are counting an unbroken run.",
    questions: [
      {
        sentence: "他已经＿＿工作了十二个小时，太累了。",
        answer: "连续",
        why: "Twelve hours without a break is an unbroken run, which is 连续.",
      },
      {
        sentence: "会议快开始了，代表们＿＿走进了会场。",
        answer: "陆续",
        why: "The delegates come in one after another, which is 陆续.",
      },
      {
        sentence: "这支球队＿＿三年获得了冠军。",
        answer: "连续",
        why: "连续 + number + time word means 'in a row'; 陆续 cannot take a count like this.",
      },
      {
        sentence: "毕业以后，同学们＿＿离开了这座城市。",
        answer: "陆续",
        why: "Classmates leaving one by one at different times is 陆续.",
      },
    ],
  },
  {
    id: "guoran-juran",
    words: [
      { hanzi: "果然", pinyin: "guǒrán", gloss: "as expected, sure enough" },
      { hanzi: "居然", pinyin: "jūrán", gloss: "unexpectedly, to one's surprise" },
    ],
    explanation:
      "These are opposites. 果然 says that what happened matches what was predicted or said beforehand. 居然 says that what happened is surprising and goes against expectation. Look for a prediction in the context (果然) or a contrast with what was normal (居然).",
    questions: [
      {
        sentence: "天气预报说今天有雨，下午＿＿下起了大雨。",
        answer: "果然",
        why: "The rain matches the forecast, so 果然 'sure enough' fits.",
      },
      {
        sentence: "这么简单的问题，他＿＿答错了。",
        answer: "居然",
        why: "Getting such an easy question wrong is surprising, which is 居然.",
      },
      {
        sentence: "我早就猜到他会来，他＿＿来了。",
        answer: "果然",
        why: "His coming matches the speaker's guess, so 果然 fits.",
      },
      {
        sentence: "他平时成绩很差，这次＿＿考了第一名。",
        answer: "居然",
        why: "Coming first goes against his usual results, which is the surprise expressed by 居然.",
      },
    ],
  },
  {
    id: "huifu-huifu2",
    words: [
      { hanzi: "恢复", pinyin: "huīfù", gloss: "to recover, to restore" },
      { hanzi: "回复", pinyin: "huífù", gloss: "to reply (to a message)" },
    ],
    explanation:
      "These sound almost the same but mean different things. 恢复 means to return to a former, normal state: health, order, power supply (恢复健康, 恢复正常). 回复 means to reply to a letter, email or message. If the context is about messages, choose 回复.",
    questions: [
      {
        sentence: "经过一个月的治疗，他的身体已经完全＿＿了。",
        answer: "恢复",
        why: "Health returning to normal is 恢复.",
      },
      {
        sentence: "收到邮件后，请尽快＿＿。",
        answer: "回复",
        why: "Answering an email is 回复.",
      },
      {
        sentence: "停电几个小时以后，供电终于＿＿了正常。",
        answer: "恢复",
        why: "恢复正常 'return to normal' is the fixed collocation.",
      },
      {
        sentence: "我给他发了好几条短信，他一条也没＿＿。",
        answer: "回复",
        why: "Replying to text messages is 回复.",
      },
    ],
  },
  {
    id: "caiqu-caiyong",
    words: [
      { hanzi: "采取", pinyin: "cǎiqǔ", gloss: "to take (measures, action, an attitude)" },
      { hanzi: "采用", pinyin: "cǎiyòng", gloss: "to adopt, to use (technology, materials)" },
    ],
    explanation:
      "采取 goes with abstract courses of action: 采取措施, 采取行动, 采取态度. 采用 means to choose something and put it to use: 采用新技术, 采用材料, 采用建议. If you could physically use the thing, it is usually 采用.",
    questions: [
      {
        sentence: "我们必须马上＿＿行动。",
        answer: "采取",
        why: "采取行动 'take action' is the fixed collocation.",
      },
      {
        sentence: "这座大楼＿＿了最新的环保材料。",
        answer: "采用",
        why: "Materials are adopted and used, which is 采用.",
      },
      {
        sentence: "面对困难，我们应该＿＿积极的态度。",
        answer: "采取",
        why: "An attitude is taken with 采取态度.",
      },
      {
        sentence: "这家工厂＿＿了新技术以后，产量提高了一倍。",
        answer: "采用",
        why: "Technology is adopted and put to use with 采用.",
      },
    ],
  },
  {
    id: "xiaoshi-shiqu",
    words: [
      { hanzi: "消失", pinyin: "xiāoshī", gloss: "to disappear, to vanish" },
      { hanzi: "失去", pinyin: "shīqù", gloss: "to lose" },
    ],
    explanation:
      "消失 is intransitive: something itself disappears, and it takes no object (雾消失了). 失去 is transitive: someone loses something, and it needs an object (失去工作, 失去信心). If the blank is followed by an object, choose 失去.",
    questions: [
      {
        sentence: "他的身影很快＿＿在人群中。",
        answer: "消失",
        why: "His figure itself disappears, with no object, which is 消失.",
      },
      {
        sentence: "因为一次意外，他＿＿了工作。",
        answer: "失去",
        why: "工作 is the object of losing, so the transitive 失去 is needed.",
      },
      {
        sentence: "不要因为一次失败就＿＿信心。",
        answer: "失去",
        why: "失去信心 'lose confidence' takes an object, which 消失 cannot.",
      },
      {
        sentence: "太阳出来以后，雾慢慢＿＿了。",
        answer: "消失",
        why: "The fog itself vanishes, with no object, which is 消失.",
      },
    ],
  },
  {
    id: "guancha-canguan",
    words: [
      { hanzi: "观察", pinyin: "guānchá", gloss: "to observe closely, to watch" },
      { hanzi: "参观", pinyin: "cānguān", gloss: "to visit (a place), to tour" },
    ],
    explanation:
      "参观 means to visit and look around a place such as a museum, school or factory. 观察 means to watch something carefully in order to understand it, such as a patient, an animal or a situation. Places are 参观; things you study are 观察.",
    questions: [
      {
        sentence: "我们明天要去＿＿历史博物馆。",
        answer: "参观",
        why: "Visiting a museum is 参观.",
      },
      {
        sentence: "医生正在仔细＿＿病人的情况。",
        answer: "观察",
        why: "Watching a patient's condition carefully is 观察.",
      },
      {
        sentence: "科学家们长期＿＿这种动物的生活习惯。",
        answer: "观察",
        why: "Studying an animal's habits over time is 观察.",
      },
      {
        sentence: "欢迎大家来我们工厂＿＿。",
        answer: "参观",
        why: "Touring a factory is 参观.",
      },
    ],
  },
  {
    id: "shuxi-shulian",
    words: [
      { hanzi: "熟悉", pinyin: "shúxī", gloss: "familiar (with); to get to know" },
      { hanzi: "熟练", pinyin: "shúliàn", gloss: "skilled, proficient" },
    ],
    explanation:
      "熟悉 means knowing a person, place or situation well, and it can take an object (熟悉环境). 熟练 describes a well-practised skill or technique (技术熟练, 熟练地操作). People and places are 熟悉; skills are 熟练.",
    questions: [
      {
        sentence: "我在这里住了十年，对这个城市很＿＿。",
        answer: "熟悉",
        why: "Knowing a city well is being 熟悉 with it.",
      },
      {
        sentence: "他已经能＿＿地使用电脑了。",
        answer: "熟练",
        why: "Using a computer skilfully describes a practised skill, which is 熟练.",
      },
      {
        sentence: "刚来的时候，我还不＿＿这里的环境。",
        answer: "熟悉",
        why: "熟悉 can take an object like 环境; 熟练 cannot.",
      },
      {
        sentence: "这位师傅的技术非常＿＿。",
        answer: "熟练",
        why: "A technique being highly practised is 熟练.",
      },
    ],
  },
  {
    id: "chongfen-chongzu",
    words: [
      { hanzi: "充分", pinyin: "chōngfèn", gloss: "full, ample; fully (abstract)" },
      { hanzi: "充足", pinyin: "chōngzú", gloss: "sufficient, plentiful (supplies)" },
    ],
    explanation:
      "充足 describes a physical supply that is plentiful: 阳光充足, 雨水充足, 资金充足. 充分 is mostly abstract and, unlike 充足, works as an adverb before a verb: 充分利用, 充分认识, 充分发挥. If the blank modifies a verb, it must be 充分.",
    questions: [
      {
        sentence: "这间屋子朝南，阳光很＿＿。",
        answer: "充足",
        why: "A plentiful physical supply like sunlight is 充足.",
      },
      {
        sentence: "我们要＿＿利用时间。",
        answer: "充分",
        why: "The blank modifies the verb 利用, and only 充分 works as an adverb.",
      },
      {
        sentence: "我们已经＿＿认识到了这个问题的重要性。",
        answer: "充分",
        why: "充分认识到 'fully realise' uses 充分 as an adverb, which 充足 cannot be.",
      },
      {
        sentence: "这个地区雨水＿＿，适合种水稻。",
        answer: "充足",
        why: "Plentiful rainfall is a physical supply, described with 充足.",
      },
    ],
  },
  {
    id: "zhudong-zidong",
    words: [
      { hanzi: "主动", pinyin: "zhǔdòng", gloss: "on one's own initiative" },
      { hanzi: "自动", pinyin: "zìdòng", gloss: "automatic(ally)" },
    ],
    explanation:
      "主动 describes a person who acts on their own initiative without being asked. 自动 describes machines working by themselves, or things happening automatically. Willing people are 主动; doors and computers are 自动.",
    questions: [
      {
        sentence: "他总是＿＿帮助有困难的同学。",
        answer: "主动",
        why: "A person helping others without being asked acts 主动.",
      },
      {
        sentence: "这扇门是＿＿的，人一走近就会打开。",
        answer: "自动",
        why: "A door that opens by itself is a machine working 自动.",
      },
      {
        sentence: "遇到问题，你应该＿＿跟老师联系。",
        answer: "主动",
        why: "Taking the initiative to contact the teacher is 主动.",
      },
      {
        sentence: "这台电脑每隔十分钟会＿＿保存文件。",
        answer: "自动",
        why: "A computer saving by itself is 自动.",
      },
    ],
  },
  {
    id: "xiande-xianran",
    words: [
      { hanzi: "显得", pinyin: "xiǎnde", gloss: "to look, to appear (+ adjective)" },
      { hanzi: "显然", pinyin: "xiǎnrán", gloss: "obviously, clearly" },
    ],
    explanation:
      "显得 is a verb meaning 'to look, to seem' and is followed by an adjective describing an appearance (显得很精神). 显然 means 'obviously' and comments on a whole statement; it often opens a sentence, as 显然， or 很显然，. If an adjective of appearance follows, choose 显得.",
    questions: [
      {
        sentence: "他今天穿了一身新西装，＿＿特别精神。",
        answer: "显得",
        why: "The new suit makes him look smart, so 显得 plus an adjective fits.",
      },
      {
        sentence: "＿＿，他没有听懂老师的话。",
        answer: "显然",
        why: "A sentence-opening comment 'obviously,' is 显然; 显得 cannot stand alone.",
      },
      {
        sentence: "房间刷成白色以后，＿＿大多了。",
        answer: "显得",
        why: "The room 'looks' much bigger, an appearance described by 显得.",
      },
      {
        sentence: "很＿＿，这个办法行不通。",
        answer: "显然",
        why: "很显然 'it is very obvious' is a set opener; 很显得 is wrong.",
      },
    ],
  },
  {
    id: "jieshou-chengshou",
    words: [
      { hanzi: "接受", pinyin: "jiēshòu", gloss: "to accept" },
      { hanzi: "承受", pinyin: "chéngshòu", gloss: "to bear, to withstand" },
    ],
    explanation:
      "接受 means to accept something offered: an invitation, a gift, criticism, a suggestion. 承受 means to bear a burden or withstand a force: pressure, pain, weight. If the object is heavy or painful, choose 承受.",
    questions: [
      {
        sentence: "他高兴地＿＿了我们的邀请。",
        answer: "接受",
        why: "An invitation is accepted, which is 接受.",
      },
      {
        sentence: "她已经无法＿＿这么大的压力了。",
        answer: "承受",
        why: "Pressure is something you bear, which is 承受.",
      },
      {
        sentence: "我愿意虚心＿＿大家的批评。",
        answer: "接受",
        why: "接受批评 'accept criticism' is the fixed collocation.",
      },
      {
        sentence: "这座桥最多能＿＿多少吨的重量？",
        answer: "承受",
        why: "A bridge withstanding weight is 承受.",
      },
    ],
  },
  {
    id: "duidai-duifu",
    words: [
      { hanzi: "对待", pinyin: "duìdài", gloss: "to treat, to approach (neutral)" },
      { hanzi: "对付", pinyin: "duìfu", gloss: "to cope with, to deal with; to make do" },
    ],
    explanation:
      "对待 is neutral: how you treat people or approach things (认真对待工作, 热情对待顾客). 对付 means dealing with an opponent or a difficulty, and in speech also 'to make do' with something not ideal (对付着穿). You 对待 customers but 对付 rivals.",
    questions: [
      {
        sentence: "我们应该热情地＿＿每一位顾客。",
        answer: "对待",
        why: "Treating customers well is 对待; 对付 would make them sound like opponents.",
      },
      {
        sentence: "这个对手很难＿＿，大家要小心。",
        answer: "对付",
        why: "Coping with a tough opponent is 对付.",
      },
      {
        sentence: "这件衣服旧是旧了点儿，还能＿＿着穿。",
        answer: "对付",
        why: "对付着穿 'make do and keep wearing it' is a colloquial use only 对付 has.",
      },
      {
        sentence: "他＿＿工作非常认真。",
        answer: "对待",
        why: "One's attitude toward work is expressed with 对待.",
      },
    ],
  },
  {
    id: "dadao-daoda",
    words: [
      { hanzi: "达到", pinyin: "dádào", gloss: "to reach (a level, goal, standard)" },
      { hanzi: "到达", pinyin: "dàodá", gloss: "to arrive at (a place)" },
    ],
    explanation:
      "到达 is for arriving at a physical place: 到达北京, 到达目的地. 达到 is for reaching an abstract level, goal or standard: 达到水平, 达到目的, 达到效果. Places take 到达; levels and goals take 达到.",
    questions: [
      {
        sentence: "火车将于下午三点＿＿北京。",
        answer: "到达",
        why: "Arriving at a city is 到达.",
      },
      {
        sentence: "他的汉语已经＿＿了中级水平。",
        answer: "达到",
        why: "Reaching a level is 达到.",
      },
      {
        sentence: "这次活动＿＿了预期的效果。",
        answer: "达到",
        why: "达到效果 'achieve the effect' is an abstract goal.",
      },
      {
        sentence: "我们＿＿目的地的时候，天已经黑了。",
        answer: "到达",
        why: "A destination is a physical place, so 到达.",
      },
    ],
  },
  {
    id: "chansheng-fasheng",
    words: [
      { hanzi: "产生", pinyin: "chǎnshēng", gloss: "to produce, to give rise to" },
      { hanzi: "发生", pinyin: "fāshēng", gloss: "to happen, to occur" },
    ],
    explanation:
      "发生 means an event happens: 发生事故, 发生了什么事. 产生 means something new comes into being or is produced, often abstract: 产生兴趣, 产生想法, 产生影响, or physical output like 产生垃圾. Events 发生; ideas, feelings and products are 产生.",
    questions: [
      {
        sentence: "昨天这个路口＿＿了一起交通事故。",
        answer: "发生",
        why: "An accident is an event that happens, which is 发生.",
      },
      {
        sentence: "看到这个广告以后，他突然＿＿了一个新的想法。",
        answer: "产生",
        why: "An idea comes into being, which is 产生想法.",
      },
      {
        sentence: "这家工厂每天都会＿＿大量垃圾。",
        answer: "产生",
        why: "Producing waste is 产生; 发生 cannot take a product as its object.",
      },
      {
        sentence: "你知道刚才＿＿了什么事吗？",
        answer: "发生",
        why: "Asking what happened is 发生了什么事.",
      },
    ],
  },
  {
    id: "chengguo-jieguo-houguo",
    words: [
      { hanzi: "成果", pinyin: "chéngguǒ", gloss: "achievement, fruitful result" },
      { hanzi: "结果", pinyin: "jiéguǒ", gloss: "result, outcome; in the end" },
      { hanzi: "后果", pinyin: "hòuguǒ", gloss: "(bad) consequence" },
    ],
    explanation:
      "结果 is a neutral result or outcome, and it can also open a clause to mean 'in the end, as it turned out'. 成果 is a positive achievement earned through work (取得成果). 后果 is almost always a bad consequence (后果严重, 后果自负).",
    questions: [
      {
        sentence: "如果你不听劝告，一切＿＿由你自己负责。",
        answer: "后果",
        why: "Bad consequences you must answer for are 后果.",
      },
      {
        sentence: "经过几年的努力，他们在科研上取得了丰硕的＿＿。",
        answer: "成果",
        why: "取得丰硕的成果 'achieve rich results' is a positive achievement.",
      },
      {
        sentence: "他跑得很快，＿＿还是没赶上火车。",
        answer: "结果",
        why: "Opening a clause to mean 'in the end' is a use only 结果 has.",
      },
      {
        sentence: "比赛的＿＿是二比一，我们赢了。",
        answer: "结果",
        why: "A score is a neutral outcome, which is 结果.",
      },
    ],
  },
  {
    id: "biaoxian-biaoda",
    words: [
      { hanzi: "表现", pinyin: "biǎoxiàn", gloss: "to perform, to behave; performance" },
      { hanzi: "表达", pinyin: "biǎodá", gloss: "to express (thoughts, feelings)" },
    ],
    explanation:
      "表达 means putting your thoughts or feelings into words or another medium: 表达意思, 语言表达能力. 表现 means how someone performs or behaves, and what they show through actions: 表现得很好, 在学校的表现. Communicating meaning is 表达; behaviour and performance are 表现.",
    questions: [
      {
        sentence: "他在这次比赛中＿＿得非常出色。",
        answer: "表现",
        why: "How well someone performed is 表现得出色.",
      },
      {
        sentence: "他的汉语还不太好，有时候不能准确地＿＿自己的意思。",
        answer: "表达",
        why: "Putting one's meaning into words is 表达意思.",
      },
      {
        sentence: "这个孩子在学校的＿＿一直很好。",
        answer: "表现",
        why: "A child's behaviour at school is his 表现.",
      },
      {
        sentence: "这份工作要求有很强的语言＿＿能力。",
        answer: "表达",
        why: "语言表达能力 'verbal communication skills' is a fixed term.",
      },
    ],
  },
  {
    id: "ganshou-ganjue",
    words: [
      { hanzi: "感受", pinyin: "gǎnshòu", gloss: "impression, feelings (from an experience)" },
      { hanzi: "感觉", pinyin: "gǎnjué", gloss: "feeling, sensation; to feel, to think" },
    ],
    explanation:
      "感觉 covers physical sensation (没有感觉) and, as a verb, a hunch or opinion followed by a clause (我感觉要下雨). 感受 is the deeper impression or feeling an experience leaves on you, as in 感受很深. A hunch or physical sensation is 感觉; a lasting impression is 感受.",
    questions: [
      {
        sentence: "我＿＿今天可能会下雨。",
        answer: "感觉",
        why: "A hunch followed by a clause is 感觉; 感受 cannot introduce a clause like this.",
      },
      {
        sentence: "看完这部电影，我＿＿很深。",
        answer: "感受",
        why: "感受很深 'deeply moved' describes a lasting impression.",
      },
      {
        sentence: "天太冷了，我的手冻得没有＿＿了。",
        answer: "感觉",
        why: "Physical sensation is 感觉.",
      },
    ],
  },
  {
    id: "anwei-guli",
    words: [
      { hanzi: "安慰", pinyin: "ānwèi", gloss: "to comfort, to console" },
      { hanzi: "鼓励", pinyin: "gǔlì", gloss: "to encourage" },
    ],
    explanation:
      "安慰 is for someone who is sad or hurt: you comfort them so they feel better. 鼓励 is for pushing someone forward to try or keep going, and it often takes a person plus an action (鼓励我们说汉语). Sadness calls for 安慰; a new attempt calls for 鼓励.",
    questions: [
      {
        sentence: "孩子摔倒了，哭个不停，妈妈抱着他轻声＿＿。",
        answer: "安慰",
        why: "Calming a crying child is comforting, which is 安慰.",
      },
      {
        sentence: "老师常常＿＿我们大胆地开口说汉语。",
        answer: "鼓励",
        why: "Urging someone to do something takes 鼓励 + person + action.",
      },
      {
        sentence: "在家人的＿＿下，他报名参加了这次比赛。",
        answer: "鼓励",
        why: "Support that pushes him to enter a contest is encouragement, 鼓励.",
      },
      {
        sentence: "朋友去世了，他很难过，我不知道该说些什么来＿＿他。",
        answer: "安慰",
        why: "Consoling someone who is grieving is 安慰.",
      },
    ],
  },
  {
    id: "ouran-ouer",
    words: [
      { hanzi: "偶然", pinyin: "ǒurán", gloss: "by chance, accidental" },
      { hanzi: "偶尔", pinyin: "ǒu'ěr", gloss: "occasionally, once in a while" },
    ],
    explanation:
      "偶尔 is about frequency: something happens now and then. 偶然 is about chance: something happens by accident and was not planned, and it can be an adjective (偶然的, 不是偶然的). 'Not often' is 偶尔; 'not on purpose' is 偶然.",
    questions: [
      {
        sentence: "我们是在一次旅行中＿＿认识的。",
        answer: "偶然",
        why: "Meeting by chance on a trip is about luck, not frequency, so 偶然.",
      },
      {
        sentence: "他平时不喝酒，只是＿＿喝一点儿。",
        answer: "偶尔",
        why: "Drinking only now and then is a frequency, which is 偶尔.",
      },
      {
        sentence: "这次成功不是＿＿的，而是他长期努力的结果。",
        answer: "偶然",
        why: "不是偶然的 'not a matter of chance' uses 偶然 as an adjective.",
      },
      {
        sentence: "周末我＿＿也会去看场电影。",
        answer: "偶尔",
        why: "Going to a film once in a while is a frequency, which is 偶尔.",
      },
    ],
  },
  {
    id: "fada-fazhan",
    words: [
      { hanzi: "发达", pinyin: "fādá", gloss: "developed, advanced (adjective)" },
      { hanzi: "发展", pinyin: "fāzhǎn", gloss: "to develop; development" },
    ],
    explanation:
      "发达 is an adjective describing a state that is already advanced: 经济发达, 发达国家. 发展 is a verb or noun for the process of growing: 发展得很快, 发展经济. Degree words like 很 or 非常 go with 发达, while 得 complements and objects go with 发展.",
    questions: [
      {
        sentence: "这个国家的经济非常＿＿。",
        answer: "发达",
        why: "非常 + adjective describes an advanced state, which is 发达.",
      },
      {
        sentence: "近年来，这座城市＿＿得很快。",
        answer: "发展",
        why: "A process happening quickly takes the verb 发展 with 得.",
      },
      {
        sentence: "毕业后，他想去沿海＿＿地区工作。",
        answer: "发达",
        why: "发达地区 'developed regions' uses the adjective.",
      },
      {
        sentence: "我们要大力＿＿教育事业。",
        answer: "发展",
        why: "The blank needs a verb with the object 教育事业, which is 发展.",
      },
    ],
  },
  {
    id: "yange-yansu-yanzhong",
    words: [
      { hanzi: "严格", pinyin: "yángé", gloss: "strict (rules, standards)" },
      { hanzi: "严肃", pinyin: "yánsù", gloss: "serious, solemn (manner)" },
      { hanzi: "严重", pinyin: "yánzhòng", gloss: "serious, severe (bad situation)" },
    ],
    explanation:
      "严格 describes strict demands, rules or standards, and can modify a verb (严格按照). 严肃 describes a serious, solemn manner or attitude: 表情严肃. 严重 describes how bad a problem is: 病很严重, 严重的污染.",
    questions: [
      {
        sentence: "他的病很＿＿，需要马上住院。",
        answer: "严重",
        why: "How bad an illness is is 严重.",
      },
      {
        sentence: "我们公司对员工的要求非常＿＿。",
        answer: "严格",
        why: "Strict requirements are 严格.",
      },
      {
        sentence: "开会的时候，他的表情很＿＿。",
        answer: "严肃",
        why: "A solemn facial expression is 严肃.",
      },
      {
        sentence: "这家工厂＿＿按照国家标准生产。",
        answer: "严格",
        why: "严格按照 'strictly according to' is the adverbial use of 严格.",
      },
    ],
  },
  {
    id: "liaobuqi-budeliao",
    words: [
      { hanzi: "了不起", pinyin: "liǎobuqǐ", gloss: "amazing, remarkable" },
      { hanzi: "不得了", pinyin: "bùdéliǎo", gloss: "extremely; disastrous, terrible" },
    ],
    explanation:
      "了不起 is praise: a person or achievement is remarkable (了不起的人), and it appears in 有什么了不起的 'what's so great about it'. 不得了 most often follows 得 to mean 'extremely' (高兴得不得了), or stands alone as an alarm, 'Oh no! Terrible!'. Praise is 了不起; degree or alarm is 不得了.",
    questions: [
      {
        sentence: "他一个人照顾全家，还读完了大学，真是个＿＿的人。",
        answer: "了不起",
        why: "Praising a remarkable person uses 了不起的人.",
      },
      {
        sentence: "听说自己考上了大学，他高兴得＿＿。",
        answer: "不得了",
        why: "After 得, 不得了 means 'extremely'; 了不起 is not a degree complement.",
      },
      {
        sentence: "＿＿了，厨房着火了！",
        answer: "不得了",
        why: "An alarm at a disaster is the exclamation 不得了了.",
      },
      {
        sentence: "这有什么＿＿的？我也能做到。",
        answer: "了不起",
        why: "有什么了不起的 'what's so great about that' is a fixed phrase.",
      },
    ],
  },
];
