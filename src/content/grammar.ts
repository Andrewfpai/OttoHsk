import type { GrammarPattern } from "./types";

export const grammarPatterns: GrammarPattern[] = [
  // ───────────────────────────── Connectors ─────────────────────────────
  {
    id: "yuqi-buru",
    pattern: "与其……不如……",
    pinyin: "yǔqí……bùrú……",
    category: "connector",
    meaning: "rather than A, better to B",
    explanation:
      "Weighs two options and recommends the second. 与其 introduces the option you reject; 不如 (often 还不如 or 倒不如) introduces the one you prefer. Note the order is the reverse of 宁可……也不……, where the preferred option comes first.",
    examples: [
      {
        zh: "与其在家里等消息，不如自己去问问。",
        pinyin: "Yǔqí zài jiā li děng xiāoxi, bùrú zìjǐ qù wènwen.",
        en: "Rather than waiting at home for news, you'd do better to go and ask yourself.",
      },
      {
        zh: "与其花钱买新的，还不如把旧的修一修。",
        pinyin: "Yǔqí huā qián mǎi xīn de, hái bùrú bǎ jiù de xiū yi xiū.",
        en: "Rather than spending money on a new one, you might as well fix the old one.",
      },
    ],
    quiz: [
      {
        prompt: "与其每天抱怨工作太累，＿＿换一份适合自己的工作。",
        options: ["而且", "不如", "所以", "还是"],
        answer: "不如",
      },
      {
        prompt: "＿＿坐在这里发愁，不如想想解决的办法。",
        options: ["宁可", "即使", "与其", "只要"],
        answer: "与其",
      },
    ],
  },
  {
    id: "jishi-ye",
    pattern: "即使……也……",
    pinyin: "jíshǐ……yě……",
    category: "connector",
    meaning: "even if … still …",
    explanation:
      "Introduces a hypothetical (often extreme) condition, and the main clause says the result does not change. 也 goes after the subject of the main clause, before the verb. Use 即使 for a supposition; for a fact that is already true, use 虽然 or 尽管 instead. 哪怕 and 就算 are more colloquial equivalents.",
    examples: [
      {
        zh: "即使明天下雨，比赛也会按时举行。",
        pinyin: "Jíshǐ míngtiān xià yǔ, bǐsài yě huì ànshí jǔxíng.",
        en: "Even if it rains tomorrow, the match will still be held on time.",
      },
      {
        zh: "即使工作再忙，他也坚持每天锻炼一个小时。",
        pinyin: "Jíshǐ gōngzuò zài máng, tā yě jiānchí měitiān duànliàn yí ge xiǎoshí.",
        en: "However busy work gets, he still exercises for an hour every day.",
      },
    ],
    quiz: [
      {
        prompt: "即使你不同意，我＿＿要试一试。",
        options: ["才", "就", "却", "也"],
        answer: "也",
      },
      {
        prompt: "＿＿遇到再大的困难，我们也不能放弃。",
        options: ["因为", "即使", "既然", "只有"],
        answer: "即使",
      },
    ],
  },
  {
    id: "ningke-yebu",
    pattern: "宁可……也不……",
    pinyin: "nìngkě……yě bù……",
    category: "connector",
    meaning: "would rather A than B",
    explanation:
      "The speaker accepts A (often something unpleasant) to avoid B. The preferred option comes right after 宁可; the rejected one follows 也不. A related form, 宁可……也要……, means \"would rather A in order to achieve B\". Don't mix it up with 与其……不如……, which puts the rejected option first.",
    examples: [
      {
        zh: "我宁可走路回家，也不坐他的车。",
        pinyin: "Wǒ nìngkě zǒulù huí jiā, yě bú zuò tā de chē.",
        en: "I'd rather walk home than ride in his car.",
      },
      {
        zh: "她宁可少赚点儿钱，也不愿意每天加班。",
        pinyin: "Tā nìngkě shǎo zhuàn diǎnr qián, yě bú yuànyì měitiān jiābān.",
        en: "She'd rather earn a bit less than work overtime every day.",
      },
    ],
    quiz: [
      {
        prompt: "他宁可饿着肚子，＿＿吃不干净的东西。",
        options: ["也不", "不如", "而且", "就"],
        answer: "也不",
      },
      {
        prompt: "我＿＿自己多花点儿时间，也不想麻烦别人。",
        options: ["与其", "不但", "因为", "宁可"],
        answer: "宁可",
      },
    ],
  },
  {
    id: "zhisuoyi-shiyinwei",
    pattern: "之所以……是因为……",
    pinyin: "zhīsuǒyǐ……shì yīnwèi……",
    category: "connector",
    meaning: "the reason why … is that …",
    explanation:
      "States the result first and the cause second, the reverse of 因为……所以……. It is formal and common in reading passages. 之所以 goes after the subject of the first clause, and the second clause must use 是因为 (or 是由于), not plain 所以.",
    examples: [
      {
        zh: "他之所以能成功，是因为他从来不放弃。",
        pinyin: "Tā zhīsuǒyǐ néng chénggōng, shì yīnwèi tā cónglái bú fàngqì.",
        en: "The reason he succeeded is that he never gives up.",
      },
      {
        zh: "这家饭馆之所以受欢迎，是因为价格便宜、味道好。",
        pinyin: "Zhè jiā fànguǎn zhīsuǒyǐ shòu huānyíng, shì yīnwèi jiàgé piányi, wèidao hǎo.",
        en: "The reason this restaurant is popular is that it is cheap and the food tastes good.",
      },
    ],
    quiz: [
      {
        prompt: "我之所以选择这个专业，＿＿我对历史特别感兴趣。",
        options: ["所以", "因此", "是因为", "于是"],
        answer: "是因为",
      },
      {
        prompt: "他＿＿迟到，是因为路上堵车了。",
        options: ["之所以", "因为", "所以", "既然"],
        answer: "之所以",
      },
    ],
  },
  {
    id: "jiran-jiu",
    pattern: "既然……就……",
    pinyin: "jìrán……jiù……",
    category: "connector",
    meaning: "since (given that) …, then …",
    explanation:
      "The first clause states a fact both speakers already accept; the second draws a conclusion, usually a suggestion, decision or question. The main clause normally has 就 (sometimes 也 or 还) after its subject. Unlike 因为, 既然 is not used to tell the listener a new cause.",
    examples: [
      {
        zh: "既然你已经决定了，就别再犹豫了。",
        pinyin: "Jìrán nǐ yǐjīng juédìng le, jiù bié zài yóuyù le.",
        en: "Since you've already decided, stop hesitating.",
      },
      {
        zh: "既然大家都同意，我们就按这个计划做吧。",
        pinyin: "Jìrán dàjiā dōu tóngyì, wǒmen jiù àn zhège jìhuà zuò ba.",
        en: "Since everyone agrees, let's go with this plan.",
      },
    ],
    quiz: [
      {
        prompt: "＿＿你身体不舒服，就早点儿回去休息吧。",
        options: ["虽然", "即使", "尽管", "既然"],
        answer: "既然",
      },
      {
        prompt: "既然你知道错了，＿＿应该向他道歉。",
        options: ["才", "就", "却", "而"],
        answer: "就",
      },
    ],
  },
  {
    id: "napa-ye",
    pattern: "哪怕……也……",
    pinyin: "nǎpà……yě……",
    category: "connector",
    meaning: "even if …, still …",
    explanation:
      "Like 即使, it concedes a hypothetical condition, but it is more colloquial and more emphatic, often with an extreme case (只有一点儿, 再晚, 一分钟). The main clause uses 也, 都 or 还 after its subject. Don't use it for a plain fact; use 虽然 for that.",
    examples: [
      {
        zh: "哪怕只有一点儿希望，我们也要努力争取。",
        pinyin: "Nǎpà zhǐ yǒu yìdiǎnr xīwàng, wǒmen yě yào nǔlì zhēngqǔ.",
        en: "Even if there is only a little hope, we must fight for it.",
      },
      {
        zh: "哪怕再晚，妈妈也会等我回家。",
        pinyin: "Nǎpà zài wǎn, māma yě huì děng wǒ huí jiā.",
        en: "No matter how late it gets, Mum will wait up for me to come home.",
      },
    ],
    quiz: [
      {
        prompt: "哪怕别人都反对，他＿＿坚持自己的想法。",
        options: ["就", "也", "才", "却"],
        answer: "也",
      },
      {
        prompt: "＿＿只能睡三个小时，我也要把报告写完。",
        options: ["因为", "只要", "除非", "哪怕"],
        answer: "哪怕",
      },
    ],
  },
  {
    id: "wulun-dou",
    pattern: "无论……都……",
    pinyin: "wúlùn……dōu……",
    category: "connector",
    meaning: "no matter …, always …",
    explanation:
      "Says the result holds under every condition. 无论 must be followed by an open choice: a question word (什么, 谁, 怎么, 多), an A还是B choice, or an A不A form. \"无论下雨\" is a classic mistake; it should be 无论下不下雨. The main clause uses 都 or 也; 不管 is the colloquial equivalent.",
    examples: [
      {
        zh: "无论遇到什么困难，他都不会放弃。",
        pinyin: "Wúlùn yùdào shénme kùnnan, tā dōu bú huì fàngqì.",
        en: "No matter what difficulties he meets, he won't give up.",
      },
      {
        zh: "无论天气好不好，他都坚持每天跑步。",
        pinyin: "Wúlùn tiānqì hǎo bu hǎo, tā dōu jiānchí měitiān pǎobù.",
        en: "Whether the weather is good or not, he still runs every day.",
      },
    ],
    quiz: [
      {
        prompt: "无论你去还是不去，我＿＿要去。",
        options: ["才", "所以", "都", "却"],
        answer: "都",
      },
      {
        prompt: "＿＿工作多忙，他都会抽时间陪家人。",
        options: ["只要", "虽然", "因为", "无论"],
        answer: "无论",
      },
    ],
  },
  {
    id: "bujin-erqie",
    pattern: "不仅……而且/还……",
    pinyin: "bùjǐn……érqiě/hái……",
    category: "connector",
    meaning: "not only … but also …",
    explanation:
      "Adds a second, usually stronger, point to the first. If both clauses share one subject, 不仅 goes after the subject; if the subjects differ, 不仅 goes before the first subject. The second clause uses 而且, 还 or 也. 不仅 is a slightly more formal 不但.",
    examples: [
      {
        zh: "这本书不仅内容有意思，而且语言也很简单。",
        pinyin: "Zhè běn shū bùjǐn nèiróng yǒu yìsi, érqiě yǔyán yě hěn jiǎndān.",
        en: "Not only is this book's content interesting, its language is also simple.",
      },
      {
        zh: "他不仅会说汉语，还会说日语。",
        pinyin: "Tā bùjǐn huì shuō Hànyǔ, hái huì shuō Rìyǔ.",
        en: "He can speak not only Chinese but also Japanese.",
      },
    ],
    quiz: [
      {
        prompt: "运动不仅对身体有好处，＿＿能让人心情愉快。",
        options: ["但是", "而且", "所以", "否则"],
        answer: "而且",
      },
      {
        prompt: "她＿＿长得漂亮，而且性格也很好。",
        options: ["不仅", "虽然", "即使", "因为"],
        answer: "不仅",
      },
    ],
  },
  {
    id: "jiaru-jiu",
    pattern: "假如/要是……就……",
    pinyin: "jiǎrú/yàoshi……jiù……",
    category: "connector",
    meaning: "if …, then …",
    explanation:
      "A conditional, like 如果……就……. 假如 is more formal and suits imagined situations; 要是 is colloquial. 就 goes after the subject of the main clause, not before it, and 的话 can close the condition (要是你有空的话).",
    examples: [
      {
        zh: "假如明天不下雨，我们就去爬山。",
        pinyin: "Jiǎrú míngtiān bú xià yǔ, wǒmen jiù qù pá shān.",
        en: "If it doesn't rain tomorrow, we'll go hiking.",
      },
      {
        zh: "要是你有什么问题，就给我打电话。",
        pinyin: "Yàoshi nǐ yǒu shénme wèntí, jiù gěi wǒ dǎ diànhuà.",
        en: "If you have any questions, give me a call.",
      },
    ],
    quiz: [
      {
        prompt: "假如我是你，我＿＿不会这么做。",
        options: ["却", "就", "而且", "所以"],
        answer: "就",
      },
      {
        prompt: "＿＿你明天有空，就来我家吃饭吧。",
        options: ["要是", "虽然", "无论", "即使"],
        answer: "要是",
      },
    ],
  },
  {
    id: "fouze",
    pattern: "……，否则……",
    pinyin: "fǒuzé",
    category: "connector",
    meaning: "otherwise; or else",
    explanation:
      "Opens the second clause and states the bad result if the first clause is not done. The first clause usually contains 必须, 得, 要, 应该 or 最好. It is the formal counterpart of 不然 and is often followed by 就 or 会.",
    examples: [
      {
        zh: "你得赶快出发，否则就赶不上飞机了。",
        pinyin: "Nǐ děi gǎnkuài chūfā, fǒuzé jiù gǎn bu shàng fēijī le.",
        en: "You need to leave right away, otherwise you'll miss the plane.",
      },
      {
        zh: "做事情要有计划，否则很容易浪费时间。",
        pinyin: "Zuò shìqing yào yǒu jìhuà, fǒuzé hěn róngyì làngfèi shíjiān.",
        en: "You need a plan when you do things, or it's easy to waste time.",
      },
    ],
    quiz: [
      {
        prompt: "出门前要检查一下门窗，＿＿可能会有危险。",
        options: ["因此", "而且", "否则", "于是"],
        answer: "否则",
      },
      {
        prompt: "我们必须马上出发，＿＿就来不及了。",
        options: ["从而", "可见", "以便", "否则"],
        answer: "否则",
      },
    ],
  },
  {
    id: "hekuang",
    pattern: "……，何况……",
    pinyin: "hékuàng",
    category: "connector",
    meaning: "let alone; not to mention; besides",
    explanation:
      "Two uses. After 连……都……, it introduces an even more obvious case: \"even A can't, let alone B\" (often ending in 呢). It can also add one more reason to support what was just said (\"and besides\"). It always begins the second clause; 更何况 is a stronger form.",
    examples: [
      {
        zh: "这道题连老师都不会做，何况我们呢？",
        pinyin: "Zhè dào tí lián lǎoshī dōu bú huì zuò, hékuàng wǒmen ne?",
        en: "Even the teacher can't solve this problem, let alone us.",
      },
      {
        zh: "现在去已经太晚了，何况外面还下着大雨。",
        pinyin: "Xiànzài qù yǐjīng tài wǎn le, hékuàng wàimian hái xiàzhe dà yǔ.",
        en: "It's already too late to go now, and besides, it's pouring outside.",
      },
    ],
    quiz: [
      {
        prompt: "这么重的箱子，年轻人都搬不动，＿＿老人呢？",
        options: ["而且", "何况", "因此", "否则"],
        answer: "何况",
      },
      {
        prompt: "你别跟他生气了，他还是个孩子，＿＿他已经道歉了。",
        options: ["可见", "以免", "从而", "何况"],
        answer: "何况",
      },
    ],
  },
  {
    id: "yimian",
    pattern: "……，以免……",
    pinyin: "yǐmiǎn",
    category: "connector",
    meaning: "so as to avoid; lest",
    explanation:
      "Opens the second clause and names an unwanted result that the first clause's action prevents. It is written and formal. Contrast 以便, which introduces a result you want. Don't add a negative after it: 以免迟到 already means \"so as not to be late\".",
    examples: [
      {
        zh: "开车时不要打电话，以免发生危险。",
        pinyin: "Kāichē shí búyào dǎ diànhuà, yǐmiǎn fāshēng wēixiǎn.",
        en: "Don't make phone calls while driving, so as to avoid accidents.",
      },
      {
        zh: "请把重要的文件保存好，以免丢失。",
        pinyin: "Qǐng bǎ zhòngyào de wénjiàn bǎocún hǎo, yǐmiǎn diūshī.",
        en: "Please keep important documents safe so they don't get lost.",
      },
    ],
    quiz: [
      {
        prompt: "出门记得带伞，＿＿被雨淋湿。",
        options: ["以便", "从而", "以免", "可见"],
        answer: "以免",
      },
      {
        prompt: "我们应该提前订票，＿＿到时候买不到。",
        options: ["以免", "以便", "何况", "总之"],
        answer: "以免",
      },
    ],
  },
  {
    id: "yibian",
    pattern: "……，以便……",
    pinyin: "yǐbiàn",
    category: "connector",
    meaning: "so that; in order to",
    explanation:
      "Opens the second clause and states the purpose that the first clause's action makes easier. It is formal and common in notices and instructions. It is the positive counterpart of 以免: 以便 introduces a goal you want, 以免 a result you want to avoid.",
    examples: [
      {
        zh: "请留下您的电话号码，以便我们及时联系您。",
        pinyin: "Qǐng liúxià nín de diànhuà hàomǎ, yǐbiàn wǒmen jíshí liánxì nín.",
        en: "Please leave your phone number so that we can contact you promptly.",
      },
      {
        zh: "他每天提前半小时到公司，以便做好准备。",
        pinyin: "Tā měitiān tíqián bàn xiǎoshí dào gōngsī, yǐbiàn zuò hǎo zhǔnbèi.",
        en: "He gets to the office half an hour early every day so he can prepare.",
      },
    ],
    quiz: [
      {
        prompt: "我把会议资料提前发给大家，＿＿大家做好准备。",
        options: ["以免", "何况", "以便", "否则"],
        answer: "以便",
      },
      {
        prompt: "他把手机号写在本子上，＿＿以后联系。",
        options: ["以便", "以免", "尽管", "何况"],
        answer: "以便",
      },
    ],
  },
  {
    id: "conger",
    pattern: "……，从而……",
    pinyin: "cóng'ér",
    category: "connector",
    meaning: "thus; thereby",
    explanation:
      "Opens the second clause and gives the result achieved by the method or action in the first clause. It is formal and written, and the two clauses usually share a subject. It often comes before verbs like 提高, 使, 达到 or 改善.",
    examples: [
      {
        zh: "他改进了学习方法，从而提高了学习效率。",
        pinyin: "Tā gǎijìnle xuéxí fāngfǎ, cóng'ér tígāole xuéxí xiàolǜ.",
        en: "He improved his study methods and thereby raised his efficiency.",
      },
      {
        zh: "公司降低了产品价格，从而吸引了更多顾客。",
        pinyin: "Gōngsī jiàngdīle chǎnpǐn jiàgé, cóng'ér xīyǐnle gèng duō gùkè.",
        en: "The company lowered its prices, thereby attracting more customers.",
      },
    ],
    quiz: [
      {
        prompt: "政府加大了对教育的投入，＿＿改善了农村学校的条件。",
        options: ["否则", "从而", "何况", "以免"],
        answer: "从而",
      },
      {
        prompt: "通过这次培训，员工们学到了新技术，＿＿提高了工作效率。",
        options: ["以免", "可是", "除非", "从而"],
        answer: "从而",
      },
    ],
  },
  {
    id: "kejian",
    pattern: "……，可见……",
    pinyin: "kějiàn",
    category: "connector",
    meaning: "it can be seen that; evidently",
    explanation:
      "Draws a conclusion from facts stated just before. It opens the concluding clause or sentence. Use it only when the second part is an inference from evidence; for a plain cause and effect, use 所以 or 因此.",
    examples: [
      {
        zh: "他连续三年获得第一名，可见他有多努力。",
        pinyin: "Tā liánxù sān nián huòdé dì-yī míng, kějiàn tā yǒu duō nǔlì.",
        en: "He came first three years in a row, which shows how hard he works.",
      },
      {
        zh: "这本书一出版就卖完了，可见读者非常喜欢。",
        pinyin: "Zhè běn shū yì chūbǎn jiù màiwán le, kějiàn dúzhě fēicháng xǐhuan.",
        en: "The book sold out as soon as it came out, so readers clearly love it.",
      },
    ],
    quiz: [
      {
        prompt: "他这么晚了还在办公室，＿＿工作有多忙。",
        options: ["可见", "以免", "何况", "否则"],
        answer: "可见",
      },
      {
        prompt: "连小孩子都知道这个道理，＿＿这个问题并不难。",
        options: ["以便", "否则", "可见", "除非"],
        answer: "可见",
      },
    ],
  },
  {
    id: "bushi-ershi",
    pattern: "不是……而是……",
    pinyin: "bú shì……ér shì……",
    category: "connector",
    meaning: "not A, but B",
    explanation:
      "Denies A and puts B forward as the truth. The second half must be 而是, not 但是. Don't confuse it with 不是……就是……, which means \"either A or B\".",
    examples: [
      {
        zh: "他不是不想帮你，而是真的没有时间。",
        pinyin: "Tā bú shì bù xiǎng bāng nǐ, ér shì zhēn de méiyǒu shíjiān.",
        en: "It's not that he doesn't want to help you; he really has no time.",
      },
      {
        zh: "成功的关键不是聪明，而是坚持。",
        pinyin: "Chénggōng de guānjiàn bú shì cōngming, ér shì jiānchí.",
        en: "The key to success isn't intelligence but persistence.",
      },
    ],
    quiz: [
      {
        prompt: "我不是不喜欢这份工作，＿＿觉得压力太大了。",
        options: ["所以", "还是", "而是", "并且"],
        answer: "而是",
      },
      {
        prompt: "他＿＿忘了，而是故意不来。",
        options: ["不但", "不是", "虽然", "即使"],
        answer: "不是",
      },
    ],
  },
  {
    id: "chufei-fouze",
    pattern: "除非……否则……",
    pinyin: "chúfēi……fǒuzé……",
    category: "connector",
    meaning: "unless …, otherwise …",
    explanation:
      "除非 names the only condition under which something changes; 否则 (or 不然) gives what happens if that condition is not met. The clause after 否则 is the default, often negative, outcome. A related form, 除非……才……, means \"only if …\".",
    examples: [
      {
        zh: "除非你亲自去请他，否则他不会来的。",
        pinyin: "Chúfēi nǐ qīnzì qù qǐng tā, fǒuzé tā bú huì lái de.",
        en: "Unless you invite him in person, he won't come.",
      },
      {
        zh: "除非天气特别不好，否则比赛会照常进行。",
        pinyin: "Chúfēi tiānqì tèbié bù hǎo, fǒuzé bǐsài huì zhàocháng jìnxíng.",
        en: "Unless the weather is especially bad, the match will go ahead as usual.",
      },
    ],
    quiz: [
      {
        prompt: "除非你提前预订，＿＿很难买到票。",
        options: ["所以", "否则", "而且", "因此"],
        answer: "否则",
      },
      {
        prompt: "＿＿你答应我一个条件，否则我不会帮你。",
        options: ["只要", "既然", "即使", "除非"],
        answer: "除非",
      },
    ],
  },
  {
    id: "zhiyao-jiu",
    pattern: "只要……就……",
    pinyin: "zhǐyào……jiù……",
    category: "connector",
    meaning: "as long as …, then …",
    explanation:
      "Gives a sufficient condition: meeting it is enough for the result. Pair 只要 with 就; pairing it with 才 is a classic error. Contrast 只有……才……, which gives the only possible condition.",
    examples: [
      {
        zh: "只要你努力，就一定能通过考试。",
        pinyin: "Zhǐyào nǐ nǔlì, jiù yídìng néng tōngguò kǎoshì.",
        en: "As long as you work hard, you will definitely pass the exam.",
      },
      {
        zh: "只要有时间，我就去图书馆看书。",
        pinyin: "Zhǐyào yǒu shíjiān, wǒ jiù qù túshūguǎn kàn shū.",
        en: "Whenever I have time, I go and read at the library.",
      },
    ],
    quiz: [
      {
        prompt: "只要多练习，你的口语＿＿会越来越好。",
        options: ["才", "却", "就", "而"],
        answer: "就",
      },
      {
        prompt: "＿＿天气好，我们就去公园散步。",
        options: ["只有", "除非", "无论", "只要"],
        answer: "只要",
      },
    ],
  },
  {
    id: "zhiyou-cai",
    pattern: "只有……才……",
    pinyin: "zhǐyǒu……cái……",
    category: "connector",
    meaning: "only if …, (then) …",
    explanation:
      "Gives a necessary condition: without it, the result is impossible. 才 goes after the subject of the second clause, before the verb. Writing 只有……就…… is a common mistake; 就 belongs with 只要.",
    examples: [
      {
        zh: "只有多听多说，才能学好外语。",
        pinyin: "Zhǐyǒu duō tīng duō shuō, cái néng xuéhǎo wàiyǔ.",
        en: "Only by listening and speaking a lot can you learn a foreign language well.",
      },
      {
        zh: "只有经过老师同意，学生才可以使用这个实验室。",
        pinyin: "Zhǐyǒu jīngguò lǎoshī tóngyì, xuéshēng cái kěyǐ shǐyòng zhège shíyànshì.",
        en: "Students may use this lab only with the teacher's permission.",
      },
    ],
    quiz: [
      {
        prompt: "只有亲自去试一试，你＿＿知道自己行不行。",
        options: ["就", "也", "都", "才"],
        answer: "才",
      },
      {
        prompt: "＿＿提前做好准备，才能在考试中取得好成绩。",
        options: ["只要", "只有", "既然", "虽然"],
        answer: "只有",
      },
    ],
  },
  {
    id: "jinguan-danshi",
    pattern: "尽管……但是/却……",
    pinyin: "jǐnguǎn……dànshì/què……",
    category: "connector",
    meaning: "although; even though",
    explanation:
      "Concedes a real fact, then says the outcome goes against it, like 虽然……但是…… but a little more formal. The second clause takes 但是, 可是, 还是, 仍然 or 却. 却 is an adverb, so it goes after the subject (成绩却……), never before it. Don't use 尽管 for a hypothetical; that is 即使.",
    examples: [
      {
        zh: "尽管下着大雨，但是他还是准时到了。",
        pinyin: "Jǐnguǎn xiàzhe dà yǔ, dànshì tā háishi zhǔnshí dào le.",
        en: "Although it was pouring, he still arrived on time.",
      },
      {
        zh: "尽管他很努力，成绩却一直不太理想。",
        pinyin: "Jǐnguǎn tā hěn nǔlì, chéngjì què yìzhí bú tài lǐxiǎng.",
        en: "Although he works very hard, his grades have never been very good.",
      },
    ],
    quiz: [
      {
        prompt: "尽管已经很晚了，＿＿他还在办公室工作。",
        options: ["所以", "因此", "而且", "但是"],
        answer: "但是",
      },
      {
        prompt: "＿＿他已经六十多岁了，但身体还非常健康。",
        options: ["即使", "尽管", "只要", "既然"],
        answer: "尽管",
      },
    ],
  },

  // ───────────────────────────── Structures ─────────────────────────────
  {
    id: "lian-dou",
    pattern: "连……都/也……",
    pinyin: "lián……dōu/yě……",
    category: "structure",
    meaning: "even …",
    explanation:
      "Highlights an extreme case to show how strong a situation is. 连 comes before the emphasised word (a subject, object or even a verb), and 都 or 也 must follow before the verb. An emphasised object moves in front of the verb: 连一口水都没喝. It is very often negative.",
    examples: [
      {
        zh: "他忙得连吃饭的时间都没有。",
        pinyin: "Tā máng de lián chīfàn de shíjiān dōu méiyǒu.",
        en: "He is so busy he doesn't even have time to eat.",
      },
      {
        zh: "这个问题太简单了，连小孩子也知道。",
        pinyin: "Zhège wèntí tài jiǎndān le, lián xiǎo háizi yě zhīdào.",
        en: "This question is so easy that even a child knows the answer.",
      },
    ],
    quiz: [
      {
        prompt: "他太紧张了，连一句话＿＿说不出来。",
        options: ["就", "都", "才", "却"],
        answer: "都",
      },
      {
        prompt: "这件事＿＿他最好的朋友都不知道。",
        options: ["把", "被", "连", "对"],
        answer: "连",
      },
    ],
  },
  {
    id: "ba-sentence",
    pattern: "把……＋动词＋其他成分",
    pinyin: "bǎ",
    category: "structure",
    meaning: "the 把 construction: do something to a specific object",
    explanation:
      "Subject + 把 + a specific (known) object + verb + something extra: a complement, 了, or a 在/到/给/成 phrase. The verb can never stand alone at the end (not 我把房间打扫). Negatives and modal verbs go before 把: 没把, 要把, 别把. It is required when the verb is followed by 在/到/给/成 + a place or result.",
    examples: [
      {
        zh: "请把你的护照放在桌子上。",
        pinyin: "Qǐng bǎ nǐ de hùzhào fàng zài zhuōzi shang.",
        en: "Please put your passport on the table.",
      },
      {
        zh: "我还没把这篇文章翻译成中文。",
        pinyin: "Wǒ hái méi bǎ zhè piān wénzhāng fānyì chéng Zhōngwén.",
        en: "I haven't translated this article into Chinese yet.",
      },
    ],
    quiz: [
      {
        prompt: "你能＿＿窗户打开吗？屋里太热了。",
        options: ["被", "把", "对", "比"],
        answer: "把",
      },
      {
        prompt: "我已经＿＿房间打扫干净了。",
        options: ["被", "让", "把", "向"],
        answer: "把",
      },
    ],
  },
  {
    id: "bei-passive",
    pattern: "被……＋动词＋其他成分",
    pinyin: "bèi",
    category: "structure",
    meaning: "passive: be done (by someone)",
    explanation:
      "Receiver + 被 (+ doer) + verb + something extra, such as a complement or 了. It is often used for unwanted events, though modern Chinese uses it more widely. The doer can be left out after 被, but 叫 and 让 (colloquial passive) must name the doer. Negatives go before 被 (没被), and formal writing uses 被……所…….",
    examples: [
      {
        zh: "我的自行车被人偷走了。",
        pinyin: "Wǒ de zìxíngchē bèi rén tōuzǒu le.",
        en: "My bike was stolen.",
      },
      {
        zh: "他的建议被公司采纳了。",
        pinyin: "Tā de jiànyì bèi gōngsī cǎinà le.",
        en: "His suggestion was adopted by the company.",
      },
    ],
    quiz: [
      {
        prompt: "那个杯子＿＿弟弟打破了。",
        options: ["把", "对", "被", "向"],
        answer: "被",
      },
      {
        prompt: "我的钱包没＿＿偷，是我自己放错地方了。",
        options: ["被", "把", "让", "叫"],
        answer: "被",
      },
    ],
  },
  {
    id: "yue-yue",
    pattern: "越……越……",
    pinyin: "yuè……yuè……",
    category: "structure",
    meaning: "the more …, the more …",
    explanation:
      "Each 越 is an adverb directly before a verb or adjective, after any subject. Don't add 很 or 非常 after 越 (越来越很好 is wrong). 越来越 + adjective describes change over time.",
    examples: [
      {
        zh: "雨越下越大，我们只好回家了。",
        pinyin: "Yǔ yuè xià yuè dà, wǒmen zhǐhǎo huí jiā le.",
        en: "The rain got heavier and heavier, so we had to go home.",
      },
      {
        zh: "这本小说我越看越喜欢。",
        pinyin: "Zhè běn xiǎoshuō wǒ yuè kàn yuè xǐhuan.",
        en: "The more I read this novel, the more I like it.",
      },
    ],
    quiz: [
      {
        prompt: "这个问题我越想＿＿糊涂。",
        options: ["更", "很", "越", "最"],
        answer: "越",
      },
      {
        prompt: "天气＿＿冷了，你要多穿点儿衣服。",
        options: ["越", "越是", "越来越", "一直"],
        answer: "越来越",
      },
    ],
  },
  {
    id: "you-zucheng",
    pattern: "由……组成/负责",
    pinyin: "yóu……zǔchéng/fùzé",
    category: "structure",
    meaning: "consist of …; be handled by …",
    explanation:
      "由 introduces the parts that make something up (A由B组成, \"A consists of B\") or the person responsible for a task (这件事由小王负责, \"Xiao Wang is in charge of this\"). It is formal and common in reading passages. Don't replace it with 被 or 从: 由 marks who does or makes up something, not who something is done to.",
    examples: [
      {
        zh: "我们的研究小组由五名成员组成。",
        pinyin: "Wǒmen de yánjiū xiǎozǔ yóu wǔ míng chéngyuán zǔchéng.",
        en: "Our research group consists of five members.",
      },
      {
        zh: "这次活动由李老师负责。",
        pinyin: "Zhè cì huódòng yóu Lǐ lǎoshī fùzé.",
        en: "Teacher Li is in charge of this event.",
      },
    ],
    quiz: [
      {
        prompt: "这个委员会＿＿九位专家组成。",
        options: ["从", "由", "对", "给"],
        answer: "由",
      },
      {
        prompt: "会议的安排由王经理＿＿。",
        options: ["组成", "构成", "负责"],
        answer: "负责",
      },
    ],
  },
  {
    id: "dui-laishuo",
    pattern: "对……来说",
    pinyin: "duì……lái shuō",
    category: "structure",
    meaning: "for …; as far as … is concerned",
    explanation:
      "Names the person or group from whose point of view a judgment holds. It usually starts the sentence; 对于……来说 and 对……而言 are variants. Don't follow 对我来说 with 我认为, which says the same thing twice. 在我看来 is the related phrase, and \"对我看来\" is wrong.",
    examples: [
      {
        zh: "对我来说，健康比钱更重要。",
        pinyin: "Duì wǒ lái shuō, jiànkāng bǐ qián gèng zhòngyào.",
        en: "For me, health matters more than money.",
      },
      {
        zh: "对初学者来说，汉字是最难的部分。",
        pinyin: "Duì chūxuézhě lái shuō, Hànzì shì zuì nán de bùfen.",
        en: "For beginners, Chinese characters are the hardest part.",
      },
    ],
    quiz: [
      {
        prompt: "对留学生＿＿，适应新环境需要一段时间。",
        options: ["看来", "来说", "以来", "起来"],
        answer: "来说",
      },
      {
        prompt: "＿＿老年人来说，每天散步是很好的锻炼。",
        options: ["在", "把", "对", "向"],
        answer: "对",
      },
    ],
  },
  {
    id: "yi-wei",
    pattern: "以……为……",
    pinyin: "yǐ……wéi……",
    category: "structure",
    meaning: "take A as B; treat A as B",
    explanation:
      "A formal, written frame: 以A为B means \"take A as B\". Common set phrases include 以……为主 (mainly …), 以……为例 (take … as an example), 以……为目标 (aim for …) and 以……为中心 (centre on …). Here 为 is read wéi, not wèi.",
    examples: [
      {
        zh: "这家公司以年轻人为主要顾客。",
        pinyin: "Zhè jiā gōngsī yǐ niánqīngrén wéi zhǔyào gùkè.",
        en: "This company treats young people as its main customers.",
      },
      {
        zh: "我们以这本书为例，分析一下作者的写作风格。",
        pinyin: "Wǒmen yǐ zhè běn shū wéi lì, fēnxī yíxià zuòzhě de xiězuò fēnggé.",
        en: "Let's take this book as an example and analyse the author's writing style.",
      },
    ],
    quiz: [
      {
        prompt: "这次比赛的选手以大学生＿＿主。",
        options: ["是", "作", "为", "成"],
        answer: "为",
      },
      {
        prompt: "他＿＿成为一名医生为目标，每天努力学习。",
        options: ["对", "以", "被", "由"],
        answer: "以",
      },
    ],
  },
  {
    id: "zai-xia",
    pattern: "在……下",
    pinyin: "zài……xià",
    category: "structure",
    meaning: "under (someone's help, influence or conditions)",
    explanation:
      "Used with abstract nouns to give the conditions behind an outcome: 在……的帮助/支持/影响/指导/领导下. The noun is usually modified with 的. It goes at the start of the sentence or after the subject. Learners often write 在……的帮助中 or 在……的帮助里, but the fixed collocation is 下.",
    examples: [
      {
        zh: "在老师的帮助下，我的汉语进步得很快。",
        pinyin: "Zài lǎoshī de bāngzhù xià, wǒ de Hànyǔ jìnbù de hěn kuài.",
        en: "With my teacher's help, my Chinese improved quickly.",
      },
      {
        zh: "在父母的支持下，她决定出国留学。",
        pinyin: "Zài fùmǔ de zhīchí xià, tā juédìng chūguó liúxué.",
        en: "With her parents' support, she decided to study abroad.",
      },
    ],
    quiz: [
      {
        prompt: "在大家的共同努力＿＿，问题终于解决了。",
        options: ["上", "下", "里"],
        answer: "下",
      },
      {
        prompt: "＿＿医生的指导下，他的身体慢慢恢复了。",
        options: ["从", "对", "把", "在"],
        answer: "在",
      },
    ],
  },
  {
    id: "na-laishuo",
    pattern: "拿……来说",
    pinyin: "ná……lái shuō",
    category: "structure",
    meaning: "take … for example",
    explanation:
      "Introduces a concrete example that supports a general statement made just before. It is common in speech and argumentative writing, often as 就拿……来说吧. Don't confuse it with 对……来说, which gives a point of view rather than an example.",
    examples: [
      {
        zh: "现在很多人喜欢网上购物，就拿我妈妈来说吧，她几乎每天都在网上买东西。",
        pinyin:
          "Xiànzài hěn duō rén xǐhuan wǎngshàng gòuwù, jiù ná wǒ māma lái shuō ba, tā jīhū měitiān dōu zài wǎngshàng mǎi dōngxi.",
        en: "Lots of people like online shopping now. Take my mum: she buys things online almost every day.",
      },
      {
        zh: "这个城市变化很大，拿交通来说，十年前还没有地铁呢。",
        pinyin: "Zhège chéngshì biànhuà hěn dà, ná jiāotōng lái shuō, shí nián qián hái méiyǒu dìtiě ne.",
        en: "This city has changed a lot. Take transport: ten years ago there wasn't even a subway.",
      },
    ],
    quiz: [
      {
        prompt: "学外语的方法很多，＿＿我来说，我最喜欢看电影学习。",
        options: ["拿", "把", "被", "比"],
        answer: "拿",
      },
      {
        prompt: "运动的好处很多，就拿跑步＿＿吧，它能让人心情变好。",
        options: ["看来", "起来", "来说", "下来"],
        answer: "来说",
      },
    ],
  },

  // ───────────────────────────── Adverbs ─────────────────────────────
  {
    id: "nandao",
    pattern: "难道……吗？",
    pinyin: "nándào……ma?",
    category: "adverb",
    meaning: "surely not …? could it really be that …?",
    explanation:
      "Turns a statement into a rhetorical question: the speaker does not want an answer and means the opposite of what is said. The sentence usually ends in 吗 (sometimes 不成). 难道 can go before or after the subject. Don't use it with question words; that is 究竟 or 到底.",
    examples: [
      {
        zh: "难道你不知道明天要考试吗？",
        pinyin: "Nándào nǐ bù zhīdào míngtiān yào kǎoshì ma?",
        en: "Surely you know there's an exam tomorrow?",
      },
      {
        zh: "这么简单的道理，难道还需要我解释吗？",
        pinyin: "Zhème jiǎndān de dàoli, nándào hái xūyào wǒ jiěshì ma?",
        en: "Does something this obvious really need me to explain it?",
      },
    ],
    quiz: [
      {
        prompt: "你＿＿忘了我们昨天说好的事情吗？",
        options: ["究竟", "难道", "到底", "毕竟"],
        answer: "难道",
      },
      {
        prompt: "这么简单的问题，＿＿你都回答不出来吗？",
        options: ["难道", "究竟", "尽管", "何况"],
        answer: "难道",
      },
    ],
  },
  {
    id: "jiujing",
    pattern: "究竟",
    pinyin: "jiūjìng",
    category: "adverb",
    meaning: "exactly; on earth (in questions); after all",
    explanation:
      "Mainly used in questions to press for the real answer, like 到底. It works only with question-word or A不A questions, never with 吗. If the subject is a question word, 究竟 goes before it (究竟谁去?). In formal writing it can also mean \"after all\", like 毕竟.",
    examples: [
      {
        zh: "你究竟想说什么？",
        pinyin: "Nǐ jiūjìng xiǎng shuō shénme?",
        en: "What exactly are you trying to say?",
      },
      {
        zh: "这件事究竟是谁做的，到现在也没人知道。",
        pinyin: "Zhè jiàn shì jiūjìng shì shéi zuò de, dào xiànzài yě méi rén zhīdào.",
        en: "To this day, nobody knows who actually did it.",
      },
    ],
    quiz: [
      {
        prompt: "你＿＿去不去？快点儿决定吧！",
        options: ["究竟", "难道", "毕竟", "几乎"],
        answer: "究竟",
      },
      {
        prompt: "我等了这么久，他＿＿什么时候才来？",
        options: ["居然", "毕竟", "究竟", "难道"],
        answer: "究竟",
      },
    ],
  },
  {
    id: "bijing",
    pattern: "毕竟",
    pinyin: "bìjìng",
    category: "adverb",
    meaning: "after all; when all is said and done",
    explanation:
      "Points to the basic fact that explains or excuses a situation, often in advice like 别怪他，他毕竟还是个孩子. It is not used in questions; that is 究竟 or 到底. It usually follows the subject and comes before 是 or the verb.",
    examples: [
      {
        zh: "别对他要求太高，他毕竟才学了半年汉语。",
        pinyin: "Bié duì tā yāoqiú tài gāo, tā bìjìng cái xuéle bàn nián Hànyǔ.",
        en: "Don't expect too much of him; after all, he's only studied Chinese for half a year.",
      },
      {
        zh: "虽然有一些问题，但这毕竟是我们第一次合作。",
        pinyin: "Suīrán yǒu yìxiē wèntí, dàn zhè bìjìng shì wǒmen dì-yī cì hézuò.",
        en: "There were some problems, but after all, this is our first time working together.",
      },
    ],
    quiz: [
      {
        prompt: "你就原谅他吧，他＿＿还是个孩子。",
        options: ["何况", "毕竟", "居然", "难道"],
        answer: "毕竟",
      },
      {
        prompt: "他虽然有缺点，但＿＿是个好人。",
        options: ["何况", "居然", "难道", "毕竟"],
        answer: "毕竟",
      },
    ],
  },
  {
    id: "juran",
    pattern: "居然",
    pinyin: "jūrán",
    category: "adverb",
    meaning: "unexpectedly; to one's surprise",
    explanation:
      "Shows the speaker's surprise that something happened against expectation, like 竟然. It goes after the subject, before the verb. It describes things that actually happened, so it isn't used in commands or plans.",
    examples: [
      {
        zh: "这么难的题，他居然几分钟就做完了。",
        pinyin: "Zhème nán de tí, tā jūrán jǐ fēnzhōng jiù zuòwán le.",
        en: "Such a hard problem, and he finished it in just a few minutes!",
      },
      {
        zh: "我们认识十年了，他居然忘了我的名字。",
        pinyin: "Wǒmen rènshi shí nián le, tā jūrán wàngle wǒ de míngzi.",
        en: "We've known each other for ten years, and he actually forgot my name.",
      },
    ],
    quiz: [
      {
        prompt: "天气预报说今天是晴天，没想到＿＿下起了大雨。",
        options: ["居然", "毕竟", "究竟", "难道"],
        answer: "居然",
      },
      {
        prompt: "他平时成绩很差，这次考试＿＿得了第一名。",
        options: ["毕竟", "难道", "究竟", "居然"],
        answer: "居然",
      },
    ],
  },
  {
    id: "jihu",
    pattern: "几乎",
    pinyin: "jīhū",
    category: "adverb",
    meaning: "almost; nearly",
    explanation:
      "Means \"almost\" (几乎所有人, 几乎每天) or \"nearly happened\", like 差点儿 (几乎摔倒). It goes before the verb or adjective, or before words like 所有, 每 and 全部. Note the tones: jīhū, both first tone.",
    examples: [
      {
        zh: "他几乎每天都去健身房。",
        pinyin: "Tā jīhū měitiān dōu qù jiànshēnfáng.",
        en: "He goes to the gym almost every day.",
      },
      {
        zh: "路太滑了，我几乎摔倒了。",
        pinyin: "Lù tài huá le, wǒ jīhū shuāidǎo le.",
        en: "The road was so slippery that I almost fell.",
      },
    ],
    quiz: [
      {
        prompt: "这个消息太让人吃惊了，＿＿所有人都不敢相信。",
        options: ["究竟", "几乎", "难道", "何况"],
        answer: "几乎",
      },
      {
        prompt: "他工作太忙了，＿＿没有时间休息。",
        options: ["尽管", "以免", "几乎", "何况"],
        answer: "几乎",
      },
    ],
  },
  {
    id: "weibi",
    pattern: "未必",
    pinyin: "wèibì",
    category: "adverb",
    meaning: "not necessarily; may not",
    explanation:
      "A soft negation meaning 不一定, often used to challenge an assumption (贵的东西未必好). It is somewhat formal; 不见得 is the colloquial equivalent. Don't confuse it with 不必 (\"no need to\") or 何必 (\"why bother\").",
    examples: [
      {
        zh: "价格高的东西未必质量好。",
        pinyin: "Jiàgé gāo de dōngxi wèibì zhìliàng hǎo.",
        en: "Expensive things are not necessarily of good quality.",
      },
      {
        zh: "他说的话未必是真的，你别全信。",
        pinyin: "Tā shuō de huà wèibì shì zhēn de, nǐ bié quán xìn.",
        en: "What he says may not be true, so don't believe all of it.",
      },
    ],
    quiz: [
      {
        prompt: "学历高的人＿＿能力就强，关键还要看实际经验。",
        options: ["一定", "未必", "肯定", "必须"],
        answer: "未必",
      },
      {
        prompt: "这个办法听起来不错，但＿＿行得通。",
        options: ["必定", "何必", "不必", "未必"],
        answer: "未必",
      },
    ],
  },
  {
    id: "budebu",
    pattern: "不得不",
    pinyin: "bùdébù",
    category: "adverb",
    meaning: "have no choice but to",
    explanation:
      "Says that circumstances force someone to do something they would rather not. It goes before the verb. Don't confuse it with 不得了 (\"extremely; terrible\"), 舍不得 (\"reluctant to\") or 不必 (\"needn't\").",
    examples: [
      {
        zh: "因为下大雨，比赛不得不推迟。",
        pinyin: "Yīnwèi xià dà yǔ, bǐsài bùdébù tuīchí.",
        en: "Because of the heavy rain, the match had to be postponed.",
      },
      {
        zh: "钱包丢了，我不得不向朋友借钱。",
        pinyin: "Qiánbāo diū le, wǒ bùdébù xiàng péngyou jiè qián.",
        en: "I lost my wallet, so I had no choice but to borrow money from a friend.",
      },
    ],
    quiz: [
      {
        prompt: "由于身体原因，他＿＿放弃了这次比赛。",
        options: ["怪不得", "不得不", "不得了", "舍不得"],
        answer: "不得不",
      },
      {
        prompt: "末班车已经开走了，我们＿＿打车回去。",
        options: ["何必", "难道", "几乎", "不得不"],
        answer: "不得不",
      },
    ],
  },
  {
    id: "fei-buke",
    pattern: "非……不可",
    pinyin: "fēi……bùkě",
    category: "adverb",
    meaning: "must; simply have to; be bound to",
    explanation:
      "Expresses strong determination (我非去不可), absolute necessity, or an inevitable result (你这样下去非生病不可). 非 comes before the verb phrase and 不可 closes it; 非……不行 and colloquial 非得 are variants. In the exam, keep the 不可; don't drop it.",
    examples: [
      {
        zh: "这件事非他亲自去不可。",
        pinyin: "Zhè jiàn shì fēi tā qīnzì qù bùkě.",
        en: "This has to be handled by him in person.",
      },
      {
        zh: "你再不努力，这次考试非失败不可。",
        pinyin: "Nǐ zài bù nǔlì, zhè cì kǎoshì fēi shībài bùkě.",
        en: "If you don't start working hard, you're bound to fail this exam.",
      },
    ],
    quiz: [
      {
        prompt: "听说这部电影特别好看，我非去看＿＿。",
        options: ["不了", "不得", "不可", "不必"],
        answer: "不可",
      },
      {
        prompt: "他决定的事，＿＿做到不可。",
        options: ["非", "不", "没", "别"],
        answer: "非",
      },
    ],
  },
  {
    id: "jianzhi",
    pattern: "简直",
    pinyin: "jiǎnzhí",
    category: "adverb",
    meaning: "simply; practically; virtually",
    explanation:
      "Exaggerates for effect: \"it's practically …\". It often appears with 太……了, 像……一样, 是, or a complement after 得. It is emotional and not literal, unlike 几乎, which is a neutral \"almost\".",
    examples: [
      {
        zh: "这里的风景简直太美了！",
        pinyin: "Zhèlǐ de fēngjǐng jiǎnzhí tài měi le!",
        en: "The scenery here is simply gorgeous!",
      },
      {
        zh: "他汉语说得那么好，简直像中国人一样。",
        pinyin: "Tā Hànyǔ shuō de nàme hǎo, jiǎnzhí xiàng Zhōngguó rén yíyàng.",
        en: "He speaks Chinese so well that he sounds practically like a native.",
      },
    ],
    quiz: [
      {
        prompt: "这个房间乱得＿＿没法住人。",
        options: ["究竟", "简直", "毕竟", "难道"],
        answer: "简直",
      },
      {
        prompt: "他高兴得＿＿像个孩子一样跳了起来。",
        options: ["简直", "毕竟", "究竟", "未必"],
        answer: "简直",
      },
    ],
  },

  // ───────────────────────────── Complements ─────────────────────────────
  {
    id: "xialai-extended",
    pattern: "动词/形容词＋下来",
    pinyin: "xiàlai",
    category: "complement",
    meaning: "fix in place; settle down; continue up to now",
    explanation:
      "Beyond literal \"come down\", 下来 has three extended meanings. (1) Fixing or keeping something: 记下来, 写下来, 留下来, 拍下来. (2) Moving from motion or strength to stillness or calm: 停下来, 安静下来, 冷静下来. (3) Continuing from the past up to now: 坚持下来, 流传下来. Contrast 下去, which continues from now into the future.",
    examples: [
      {
        zh: "请把老师说的重点记下来。",
        pinyin: "Qǐng bǎ lǎoshī shuō de zhòngdiǎn jì xiàlai.",
        en: "Please write down the key points the teacher mentions.",
      },
      {
        zh: "听到这个消息，教室里一下子安静下来了。",
        pinyin: "Tīngdào zhège xiāoxi, jiàoshì li yíxiàzi ānjìng xiàlai le.",
        en: "On hearing the news, the classroom suddenly went quiet.",
      },
    ],
    quiz: [
      {
        prompt: "这个故事是从古代流传＿＿的。",
        options: ["下来", "下去", "起来", "出来"],
        answer: "下来",
      },
      {
        prompt: "车慢慢地停了＿＿。",
        options: ["过去", "起来", "下来", "下去"],
        answer: "下来",
      },
    ],
  },
  {
    id: "xiaqu-extended",
    pattern: "动词/形容词＋下去",
    pinyin: "xiàqu",
    category: "complement",
    meaning: "keep on (from now into the future)",
    explanation:
      "After a verb, 下去 means an action that is already going on continues into the future: 说下去, 坚持下去, 活下去. After an adjective, it means a state (often a bad one) keeps going or getting worse: 再这样瘦下去. The potential form V不下去 means \"can't bear to go on\" (听不下去, 过不下去).",
    examples: [
      {
        zh: "别停，请你接着说下去。",
        pinyin: "Bié tíng, qǐng nǐ jiēzhe shuō xiàqu.",
        en: "Don't stop; please go on.",
      },
      {
        zh: "学外语很难，但只要坚持下去，就会有收获。",
        pinyin: "Xué wàiyǔ hěn nán, dàn zhǐyào jiānchí xiàqu, jiù huì yǒu shōuhuò.",
        en: "Learning a foreign language is hard, but if you keep at it, you'll see results.",
      },
    ],
    quiz: [
      {
        prompt: "你说得很好，请继续说＿＿。",
        options: ["下去", "下来", "起来", "出来"],
        answer: "下去",
      },
      {
        prompt: "这样的日子我再也过不＿＿了。",
        options: ["下来", "下去", "起来", "出来"],
        answer: "下去",
      },
    ],
  },
  {
    id: "qilai-extended",
    pattern: "动词＋起来",
    pinyin: "qǐlai",
    category: "complement",
    meaning: "start to; when one does; recall; gather",
    explanation:
      "Extended meanings: (1) to start and continue (笑起来; an object goes between 起 and 来: 下起雨来). (2) \"When you do it / judging by\" (看起来, 听起来, 说起来容易做起来难). (3) To recall something (想起来). (4) To collect or put away (收起来). Note that 想起来 means to remember something you once knew, while 想出来 means to come up with something new.",
    examples: [
      {
        zh: "听到这个笑话，大家都笑了起来。",
        pinyin: "Tīngdào zhège xiàohua, dàjiā dōu xiàole qǐlai.",
        en: "Everyone burst out laughing at the joke.",
      },
      {
        zh: "这件事说起来容易，做起来难。",
        pinyin: "Zhè jiàn shì shuō qǐlai róngyì, zuò qǐlai nán.",
        en: "This is easier said than done.",
      },
    ],
    quiz: [
      {
        prompt: "他的名字我一时想不＿＿了。",
        options: ["下来", "起来", "过来", "下去"],
        answer: "起来",
      },
      {
        prompt: "这个菜看＿＿很普通，吃起来却特别香。",
        options: ["下来", "下去", "出来", "起来"],
        answer: "起来",
      },
    ],
  },

  // ───────────────────────────── Expressions ─────────────────────────────
  {
    id: "shuobuding",
    pattern: "说不定",
    pinyin: "shuōbudìng",
    category: "expression",
    meaning: "perhaps; maybe; quite possibly",
    explanation:
      "Expresses the speaker's guess that something is quite likely. It goes at the start of the clause or before the verb, and it is colloquial. It can also be a predicate meaning \"it's hard to say\" (这事还说不定).",
    examples: [
      {
        zh: "他今天没来上课，说不定是生病了。",
        pinyin: "Tā jīntiān méi lái shàngkè, shuōbudìng shì shēngbìng le.",
        en: "He didn't come to class today; maybe he's ill.",
      },
      {
        zh: "你去问问吧，说不定他知道答案。",
        pinyin: "Nǐ qù wènwen ba, shuōbudìng tā zhīdào dá'àn.",
        en: "Go and ask him; he might know the answer.",
      },
    ],
    quiz: [
      {
        prompt: "别着急，再等一会儿，＿＿他马上就到了。",
        options: ["怪不得", "说不定", "舍不得", "恨不得"],
        answer: "说不定",
      },
      {
        prompt: "天这么阴，＿＿一会儿要下雨。",
        options: ["怪不得", "不得不", "舍不得", "说不定"],
        answer: "说不定",
      },
    ],
  },
  {
    id: "guaibude",
    pattern: "怪不得",
    pinyin: "guàibude",
    category: "expression",
    meaning: "no wonder",
    explanation:
      "The speaker suddenly understands why something already observed is so. The reason is often given with 原来, before or after the 怪不得 clause. It is a synonym of 难怪. Literally it can also mean \"can't blame\" (这事怪不得他).",
    examples: [
      {
        zh: "外面下雪了，怪不得这么冷。",
        pinyin: "Wàimian xià xuě le, guàibude zhème lěng.",
        en: "It's snowing outside; no wonder it's so cold.",
      },
      {
        zh: "怪不得他汉语这么好，原来他在北京住了十年。",
        pinyin: "Guàibude tā Hànyǔ zhème hǎo, yuánlái tā zài Běijīng zhùle shí nián.",
        en: "No wonder his Chinese is so good; it turns out he lived in Beijing for ten years.",
      },
    ],
    quiz: [
      {
        prompt: "原来他昨天晚上没睡觉，＿＿今天看起来这么累。",
        options: ["说不定", "不见得", "怪不得", "恨不得"],
        answer: "怪不得",
      },
      {
        prompt: "怪不得他这么高兴，＿＿他通过考试了。",
        options: ["因此", "原来", "所以", "否则"],
        answer: "原来",
      },
    ],
  },
  {
    id: "henbude",
    pattern: "恨不得",
    pinyin: "hènbude",
    category: "expression",
    meaning: "be itching to; wish one could",
    explanation:
      "Expresses a strong, often exaggerated or unrealistic wish. It is followed by a verb phrase, often with 马上, 立刻 or 一下子. Don't confuse it with 舍不得 (\"reluctant to part with\"): 恨不得 means you want to do something, while 舍不得 means you can't bear to.",
    examples: [
      {
        zh: "听到这个好消息，他恨不得马上告诉所有人。",
        pinyin: "Tīngdào zhège hǎo xiāoxi, tā hènbude mǎshàng gàosu suǒyǒu rén.",
        en: "Hearing the good news, he was itching to tell everyone at once.",
      },
      {
        zh: "我太想家了，恨不得现在就飞回去。",
        pinyin: "Wǒ tài xiǎng jiā le, hènbude xiànzài jiù fēi huíqu.",
        en: "I'm so homesick I wish I could fly back right now.",
      },
    ],
    quiz: [
      {
        prompt: "说错话以后，他尴尬得＿＿找个地方躲起来。",
        options: ["恨不得", "舍不得", "怪不得", "说不定"],
        answer: "恨不得",
      },
      {
        prompt: "他气得＿＿把手机摔了。",
        options: ["舍不得", "怪不得", "说不定", "恨不得"],
        answer: "恨不得",
      },
    ],
  },
  {
    id: "shebude",
    pattern: "舍不得",
    pinyin: "shěbude",
    category: "expression",
    meaning: "be reluctant to part with or use; hate to",
    explanation:
      "Two uses: being reluctant to leave someone or something (舍不得离开), and grudging spending or using something (舍不得花钱, 舍不得穿). It takes a noun or verb after it, or stands alone (我真舍不得). The opposite is 舍得 (\"be willing to spend or give up\").",
    examples: [
      {
        zh: "要毕业了，我真舍不得离开这些同学。",
        pinyin: "Yào bìyè le, wǒ zhēn shěbude líkāi zhèxiē tóngxué.",
        en: "We're about to graduate, and I really hate to leave these classmates.",
      },
      {
        zh: "这件衣服太贵了，她一直舍不得穿。",
        pinyin: "Zhè jiàn yīfu tài guì le, tā yìzhí shěbude chuān.",
        en: "This dress was so expensive that she has never been able to bring herself to wear it.",
      },
    ],
    quiz: [
      {
        prompt: "奶奶很节约，连一张旧报纸都＿＿扔。",
        options: ["恨不得", "舍不得", "说不定", "怪不得"],
        answer: "舍不得",
      },
      {
        prompt: "在这里住了二十年，现在要搬走了，我真＿＿。",
        options: ["舍不得", "恨不得", "怪不得", "不得不"],
        answer: "舍不得",
      },
    ],
  },
];
