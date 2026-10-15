import type { ReadingPaper } from "./types";

/**
 * HSK 5 paper H51328, Reading Parts 2 and 3 (questions 61–90), transcribed
 * from the learner's PDF (h51328/test.pdf, cross-checked against the copy in
 * Hsk5set1.pdf) and cleaned of text-layer errors. Answers are the official
 * key (H51328Ans.pdf). [[…]] marks words or sentences underlined in the paper.
 */
export const readingH51328: ReadingPaper = {
  id: "h51328",
  title: "H51328",
  source: "HSK 5 · H51328 · Reading 61–90",
  part2: [
    {
      id: "h51328-61",
      numbers: "61",
      passage:
        "“疑人不用，用人不疑”是一种比较合理的人才管理观念。领导者在用人之前，必须十分谨慎，应全面考察候选人各方面的素质和能力，一旦任用后，就应对其充分信任，不要随便怀疑。",
      questions: [
        {
          number: 61,
          options: ["选人要谨慎", "必须严格管理员工", "要提高员工的素质", "不要轻易辞退已聘用员工"],
          answer: 0,
          why: "Before hiring, a leader 必须十分谨慎 and must check the candidate thoroughly: choose people carefully. Strict management, training and firing are not mentioned.",
        },
      ],
    },
    {
      id: "h51328-62",
      numbers: "62",
      passage:
        "什么是财商？简单地说，财商就是理财的智慧，也就是人们认识金钱和控制金钱的能力。财商不高的人容易乱投资、无节制地消费，最后不仅理不好财，甚至还可能欠下一大笔钱。",
      questions: [
        {
          number: 62,
          options: ["财商高的人智商也高", "财商低的人不善理财", "财商高的人容易乱消费", "财商低的人更懂得节约"],
          answer: 1,
          why: "财商不高的人…最后不仅理不好财 — people with low financial intelligence manage money badly. It is they, not the high-财商 people, who spend without control, so C and D are reversed.",
        },
      ],
    },
    {
      id: "h51328-63",
      numbers: "63",
      passage:
        "被誉为“中华第一街”的王府井大街南起东长安街，北至中国美术馆，全长约1.6公里，是北京一条著名的商业街。从前这条街的北段有很多王府，南段有一口水井，所以人们就称这条街为“王府井大街”。",
      questions: [
        {
          number: 63,
          options: ["那口井现在还保留着", "王府井大街在中国很有名", "王府井大街在长安街的南侧", "王府井大街距离中国美术馆很远"],
          answer: 1,
          why: "It is called 中华第一街 and is 北京一条著名的商业街, so it is famous in China. It starts at 长安街 and runs north (not south of it), it reaches the art museum, and the well is only mentioned as history.",
        },
      ],
    },
    {
      id: "h51328-64",
      numbers: "64",
      passage:
        "在正常情况下，对于不太熟悉的人，人们往往会根据对方的反应和外界条件来选择相应的言语或行为。特别是对还不十分了解，但又希望继续交往的人，人们会尽量把自己好的一面表现出来，把缺点隐藏起来。",
      questions: [
        {
          number: 64,
          options: ["第一印象很难改变", "真诚是交友的基础", "言语行为多受环境影响", "人们会对熟悉的人有所保留"],
          answer: 2,
          why: "People choose their 言语或行为 according to 对方的反应和外界条件 — their words and actions are shaped by circumstances. It is with unfamiliar people, not familiar ones, that they hide their faults.",
        },
      ],
    },
    {
      id: "h51328-65",
      numbers: "65",
      passage:
        "可再生能源是指在自然界中可以不断再生、永续利用的能源，具有取之不尽、用之不竭的特点，主要包括太阳能、风能、水能、地热能和海洋能等。可再生能源对环境无害或危害极小，而且分布广泛，适宜就地开发利用，有很大的发展潜力。",
      questions: [
        {
          number: 65,
          options: ["可再生能源分布不均", "可再生能源开发难度大", "可再生能源利用率不高", "可再生能源不易污染环境"],
          answer: 3,
          why: "可再生能源对环境无害或危害极小 — it does little or no harm to the environment. It is 分布广泛 (not uneven) and 适宜就地开发 (not hard to develop).",
        },
      ],
    },
    {
      id: "h51328-66",
      numbers: "66",
      passage:
        "“湖广熟，天下足”首见于明代李釜源编写的《地图综要》一书，意思是说湖南、湖北两省盛产稻米，两湖丰收则全国的老百姓都能吃饱。明清时期，原先被称为“鱼米之乡”的江浙两省改种棉花，这使得湖广地区作为全国最重要粮食产地的地位得以巩固。",
      questions: [
        {
          number: 66,
          options: ["湖广地区不适合种棉花", "明清时湖广粮食产量很高", "《地图综要》是一部农学书", "江浙地区是中国的粮食生产中心"],
          answer: 1,
          why: "In the Ming and Qing, 湖广 was 全国最重要粮食产地 — the most important grain region, so its output was high. 江浙 switched to cotton, so D is wrong, and nothing says 湖广 can't grow cotton.",
        },
      ],
    },
    {
      id: "h51328-67",
      numbers: "67",
      passage:
        "父子俩驾着一艘小船准备回家，突然海上风浪大作，小船摇摇晃晃眼看就要翻了。儿子惊慌失措，这时父亲大喊：“快往船舱里灌水！”当船舱的水位到达一定高度时，奇迹出现了，小船不再摇晃了。行船如此，生命也如此，负重的生命也许更有韧性、更有意义。",
      questions: [
        {
          number: 67,
          options: ["要学会释放压力", "小船被风浪打翻了", "适当负重的生命更有意义", "父亲是位很有经验的水手"],
          answer: 2,
          why: "The moral: 负重的生命也许更有韧性、更有意义 — a life that carries some weight is more meaningful. The boat steadied once it held water; it did not capsize.",
        },
      ],
    },
    {
      id: "h51328-68",
      numbers: "68",
      passage:
        "相传赵匡胤当初流落长安时，有一次身上只剩下两块干馍，他便恳求一家羊肉铺的店主给他一碗羊肉汤，然后把馍掰碎泡在汤里，馍软、汤香，吃起来非常可口。后来他当了宋朝的开国皇帝，仍念念不忘那一顿美餐，于是又去那家羊肉铺，让人如法炮制，他吃后大加赞赏。皇帝爱吃羊肉泡馍的消息不胫而走，自此，羊肉泡馍成了风靡长安的美食。",
      questions: [
        {
          number: 68,
          options: ["赵匡胤赏赐了店主", "宋代人喜欢吃羊肉", "羊肉泡馍的口味很多", "羊肉泡馍在长安很流行"],
          answer: 3,
          why: "The last line: 羊肉泡馍成了风靡长安的美食 — it became all the rage in Chang'an. He praised the dish (大加赞赏), but no reward to the owner is mentioned.",
        },
      ],
    },
    {
      id: "h51328-69",
      numbers: "69",
      passage:
        "失败时，身旁的人可能会告诉你：要坚强，要快乐。坚强是绝对需要的，但在这种情形下，要快乐恐怕是太为难你了。毕竟没有人能在跌得头破血流的时候，还高兴得起来。但是至少我们应该做到平静，平静地看待这件事，平静地把其他该处理的事处理好，这也算是另一种意义上的成功。",
      questions: [
        {
          number: 69,
          options: ["要平静地对待失败", "乐观的人更易成功", "要懂得吸取经验教训", "坚强的人更值得尊重"],
          answer: 0,
          why: "至少我们应该做到平静，平静地看待这件事 — after failing we should at least stay calm and face it calmly. Being happy is called too much to ask.",
        },
      ],
    },
    {
      id: "h51328-70",
      numbers: "70",
      passage:
        "著名书画家郑板桥有句名言叫“难得糊涂”，这句话的内涵其实就是“贵在理解”。人与人相处时，因为年龄、文化水平、个人修养、家庭与生活环境等不同，对一些事物的认识肯定会存在差异，这些都是正常现象，无需过分计较，应给予彼此更多的理解和包容。",
      questions: [
        {
          number: 70,
          options: ["相处之道重在理解", "做事情要细致认真", "文化水平高的人往往更糊涂", "个人修养决定了人们的处事方式"],
          answer: 0,
          why: "难得糊涂 really means 贵在理解, and when getting along we should give each other 更多的理解和包容: understanding is the key to getting along.",
        },
      ],
    },
  ],
  part3: [
    {
      id: "h51328-71",
      numbers: "71–74",
      passage: [
        "一所大学的学生要做这样一个实验：用牛奶糖刺破椰子壳。牛奶糖比较软，而椰子壳比较硬，想用牛奶糖刺破椰子壳，这几乎是不可能完成的任务。但应用物理学的知识，学生们竟然办到了。",
        "他们将牛奶糖做成针的形状，针尖朝上，放在地上，然后将椰子对准针尖，垂直扔下，牛奶糖真的把椰子壳刺破了。",
        "当我看到这个实验时，内心产生了很大的震动。我们往往受限于日常的生活经验，认为有些事情是不可能发生的。若是当初学生们也抱定“牛奶糖无法刺穿硬物”的想法，便不可能完成这个实验。",
        "同样，一个人如果[[妄自菲薄]]，以为自己没什么才能，也是成不了大事的。再柔软的事物，只要塑造成合适的形状，或是放对位置，都有可能发挥出惊人的力量，令人刮目相看。所以，不要看轻别人，表面上弱小的人，很可能拥有你想象不到的巨大力量。",
      ].join("\n"),
      questions: [
        {
          number: 71,
          prompt: "为什么说那个实验“几乎是不可能完成的”？",
          options: ["实验条件简陋", "奶糖软而椰壳硬", "学生采用的方法不对", "扔椰子时很难对准牛奶糖"],
          answer: 1,
          why: "The passage gives the reason right before: 牛奶糖比较软，而椰子壳比较硬 — the candy is soft and the shell is hard.",
        },
        {
          number: 72,
          prompt: "根据第3段，可以知道：",
          options: ["欣赏别人并不难", "内在比外表更重要", "不要受经验的限制", "不要被表面现象欺骗"],
          answer: 2,
          why: "Paragraph 3 says we are often 受限于日常的生活经验, and the students would have failed had they believed candy can't pierce hard things: don't be limited by experience.",
        },
        {
          number: 73,
          prompt: "“妄自菲薄”最可能是什么意思？",
          options: ["十分骄傲", "过分看轻自己", "过于依赖他人", "不肯面对现实"],
          answer: 1,
          why: "It is explained straight after: 以为自己没什么才能 — thinking you have no talent, i.e. underrating yourself. 骄傲 (proud) is the opposite.",
        },
        {
          number: 74,
          prompt: "最适合做上文标题的是：",
          options: ["柔软的力量", "一颗牛奶糖", "神奇的物理学", "最适合的位置"],
          answer: 0,
          why: "The point is that 再柔软的事物…都有可能发挥出惊人的力量 — even soft things can have surprising power. The candy and physics are just the example.",
        },
      ],
    },
    {
      id: "h51328-75",
      numbers: "75–78",
      passage: [
        "从前，有个地主请了一位老师来教他的儿子读书认字。第一天上课，老师用毛笔在纸上写了一笔，说：“这是‘一’字。”地主的儿子学得很认真，牢牢地记住了。第二天，老师在纸上写了两笔，说：“这是‘二’字。”这回，儿子不觉得有什么新鲜了。到了第三天，老师又在纸上写了三笔，说：“这是‘三’字。”儿子眼珠一转，仿佛悟到了什么，课也不上了，跑到父亲房间，说：“认字很简单，我已经学会了，您把老师辞退了吧。”见儿子这么聪明，地主十分高兴，便辞退了老师。",
        "一天早上，地主想请一位姓“万”的朋友来喝酒，于是让儿子写个请帖。儿子满口答应：“行，没问题。”可是，眼看太阳都下山了，还不见儿子写好，地主不禁有些着急，便去儿子房里找他。",
        "一进门，地主便看见儿子愁眉苦脸地坐在桌边，拿着笔在纸上一道儿一道儿地画着。儿子见父亲来了，便埋怨道：“天下的姓氏那么多，他为什么偏偏姓‘万’呢？我从早上写到现在，手都酸了，才写了不到3000划，这个字太难写了！”",
        "知识是无穷无尽的，如果我们学习也只满足于一知半解，那和地主的笨儿子又有什么区别呢？",
      ].join("\n"),
      questions: [
        {
          number: 75,
          prompt: "根据第1段，下列哪项正确？",
          options: ["老师本领很大", "老师夸奖了儿子", "儿子觉得写字简单", "地主舍不得花钱请人"],
          answer: 2,
          why: "After three lessons the son tells his father 认字很简单，我已经学会了 — he thinks writing is easy. The teacher never praises him.",
        },
        {
          number: 76,
          prompt: "地主为什么很着急？",
          options: ["菜没做好", "客人还没到", "儿子不肯去送请帖", "儿子一直没把请帖给他"],
          answer: 3,
          why: "眼看太阳都下山了，还不见儿子写好 — by sunset the son still hadn't finished the invitation, so the landlord got anxious.",
        },
        {
          number: 77,
          prompt: "关于儿子，可以知道：",
          options: ["非常刻苦", "很感谢老师", "字写得很漂亮", "没有真正学会写字"],
          answer: 3,
          why: "He thinks 万 is written with ten thousand strokes (一道儿一道儿地画着), so he never really learned to write; the story calls him 笨儿子 who knows only 一知半解.",
        },
        {
          number: 78,
          prompt: "最适合做上文标题的是：",
          options: ["地主的请帖", "汉字的起源", "笨儿子学写字", "中国的姓氏文化"],
          answer: 2,
          why: "The whole story follows the 笨儿子 (foolish son) learning to write characters and failing at 万. The invitation is only one episode.",
        },
      ],
    },
    {
      id: "h51328-79",
      numbers: "79–82",
      passage: [
        "一锅米饭，放到第二天，水分就会少一些；放到第三天，恐怕就有异味了；第四天，我们会发现，它已经发霉了。是什么使那锅米饭变坏的呢？是时间。",
        "在古时，女儿出生后，父母便在自家地里埋下几坛米酿的酒。十七八年后，女儿长大结婚了，这些酒就成了女儿婚礼上的佳酿。它有一个美丽的名字，叫“女儿红”。是什么使那些平凡的米，变成芬芳甘醇的酒呢？答案也是时间。",
        "时间到底是善良的，还是邪恶的？都不是。时间只是一种简单的乘法，使原来的数值倍增而已。开始变坏的米饭，每一天都会变得更腐臭；而开始变醇的美酒，每一分钟都在增加它的芬芳。",
        "我们也曾看到天真的少年一旦开始堕落，便不免愈陷愈深，最终变得面目可憎。但相反，时间却把温和的笑容、成熟的风采添加在那些追寻善良的人身上。同样是父母所生，但后来有人堕落成罪犯，有人成为品德高尚的人，关键就在于内心深处是否有对真善美的渴望。时间将如何对待你我？这就要看我们是以什么态度来要求自己了。",
      ].join("\n"),
      questions: [
        {
          number: 79,
          prompt: "作者举米饭的例子，是为了说明：",
          options: ["时间的作用", "要爱惜粮食", "不要浪费时间", "要懂得抓住时机"],
          answer: 0,
          why: "是什么使那锅米饭变坏的呢？是时间 — the rice shows what time does to things. Wasting food or time is not the point.",
        },
        {
          number: 80,
          prompt: "关于“女儿红”，下列哪项正确？",
          options: ["是一种美酒", "由玫瑰花酿造", "存放在女孩子的卧室内", "是女儿送给父母的寿礼"],
          answer: 0,
          why: "女儿红 is the name of the rice wine (米酿的酒) buried at a daughter's birth and served as 佳酿 at her wedding. It is buried in the fields, made from rice, and is a wedding wine, not a birthday gift.",
        },
        {
          number: 81,
          prompt: "根据第4段，对人的成长最重要的是：",
          options: ["人生态度", "家庭教育", "不懈的努力", "周围人的看法"],
          answer: 0,
          why: "Paragraph 4 ends: 这就要看我们是以什么态度来要求自己了 — how time treats us depends on our attitude. Same parents (同样是父母所生) still give different people, so it isn't family upbringing.",
        },
        {
          number: 82,
          prompt: "根据上文，下列哪项正确？",
          options: ["成熟的人更有魅力", "善良的人比较严肃", "品德高尚的人追求真善美", "有渴望才能成就一番事业"],
          answer: 2,
          why: "Whether one becomes 品德高尚的人 depends on 内心深处是否有对真善美的渴望 — people of high character long for truth, goodness and beauty. The yearning is about virtue, not career success (D).",
        },
      ],
    },
    {
      id: "h51328-83",
      numbers: "83–86",
      passage: [
        "有位摄影家，他的作品经常被刊登在国际知名的报刊杂志上，他举办过十几次个人影展，作品也屡次获得国际大奖，当有人问他是如何取得这样的成就时，那位摄影家讲了这样一件事情：",
        "小时候，他的兴趣非常广泛，也很要强。画画儿、游泳、打篮球，必须样样第一才行，但这当然是不可能的。于是，他[[心灰意冷]]，学习成绩一落千丈。父亲知道后，找来一个漏斗和一些玉米种子，让他把手放在漏斗下面接着，然后拿起一粒种子投进漏斗，种子顺着漏斗滑到了他的手里。父亲投了十几次，他的手中也就有了十几粒种子。接着，父亲又抓起满满的一把玉米粒放到漏斗里面，玉米粒相互挤着，竟一粒也没有掉下来。父亲对他说：“做事情就像往漏斗中投玉米粒一样。假如你每天都能做好一件事，那你每天都会有一粒种子的收获和快乐。可是，当你把所有的事情都挤到一块儿来做，那你连一粒种子也收获不到。”",
        "每个人都渴望成功，不过，“一口吃不成胖子”，成功需要一步一步来。如果你想同时完成很多事情，同时实现很多愿望，事事都想做，事事都去做，那成功很可能将离你而去，成功对你而言，将可能只是美梦一场。",
      ].join("\n"),
      questions: [
        {
          number: 83,
          prompt: "关于那位摄影家，可以知道：",
          options: ["爱吃玉米", "事业很成功", "学习成绩一直很优秀", "小时候就举办过影展"],
          answer: 1,
          why: "His work appears in international magazines, he has held 十几次个人影展 and won 国际大奖: his career is very successful. As a child his grades fell (一落千丈).",
        },
        {
          number: 84,
          prompt: "第2段的“心灰意冷”，最可能是什么意思？",
          options: ["失望难过", "情绪激动", "沉默不语", "感到惭愧"],
          answer: 0,
          why: "He wanted to be first at everything, which was impossible, so he lost heart and his grades fell: 心灰意冷 means disappointed and dejected.",
        },
        {
          number: 85,
          prompt: "父亲把满满一把玉米粒放到漏斗里时：",
          options: ["漏斗掉在了地上", "玉米粒被挤碎了", "玉米粒排列很有规律", "没有一粒玉米掉下来"],
          answer: 3,
          why: "玉米粒相互挤着，竟一粒也没有掉下来 — the kernels jammed together and not one fell through. They were squeezed, not crushed.",
        },
        {
          number: 86,
          prompt: "上文主要想告诉我们什么？",
          options: ["兴趣要从小培养", "要善于听取他人意见", "成功需要远大的目标", "应先集中精力做好一件事"],
          answer: 3,
          why: "假如你每天都能做好一件事 you gain something each day, but cramming everything together gains nothing; 成功需要一步一步来 — focus on doing one thing well first.",
        },
      ],
    },
    {
      id: "h51328-87",
      numbers: "87–90",
      passage: [
        "南北朝时期有位著名的画家叫张僧繇，他笔下的飞禽走兽栩栩如生，令人拍手叫绝。据说，他曾在墙壁上画过两只鹰，吓得一些小鸟从此不敢在屋檐下做窝。他画的龙更是活灵活现。成语“画龙点睛”便出自关于他的传说。",
        "有一年，张僧繇在安乐寺的墙壁上画龙，人们听说了，便奔走相告，争着前去看个究竟。在安乐寺里，张僧繇不到半天功夫就画好了四条龙。可这些龙都没有眼睛，众人好奇地问他：“为什么不给龙画上眼睛呢？”张僧繇解释说：“眼睛是整条龙的关键，画上眼睛，龙有了精神，就会飞走了。”大家听了都不相信，认为这话过于荒诞，一定要他给龙画上眼睛试试。张僧繇没有办法，只好拿起笔来给其中两条龙画上了眼睛。刹那间，电光闪闪，雷声轰鸣，画上眼睛的两条龙破壁飞去。人们都被这突如其来的情景吓呆了，等到定下神来，那两只龙早已飞得无影无踪，墙壁上只剩下两条没画上眼睛的龙。",
        "后来人们就用“画龙点睛”这个成语比喻写作或说话时在关键地方加上精辟的语句，使内容更加生动传神。",
      ].join("\n"),
      questions: [
        {
          number: 87,
          prompt: "小鸟为什么不敢在屋檐下做窝？",
          options: ["害怕龙", "屋檐漏水", "总有人打扰", "以为见到了真的鹰"],
          answer: 3,
          why: "He painted 两只鹰 so lifelike (栩栩如生) that small birds were scared away: they took the painted hawks for real ones. The dragons come later.",
        },
        {
          number: 88,
          prompt: "根据第2段，下列哪项正确？",
          options: ["龙被人们吓跑了", "人们被张僧繇骗了", "画上眼睛的龙飞走了", "墙上一条龙也没有了"],
          answer: 2,
          why: "画上眼睛的两条龙破壁飞去 — the two dragons given eyes broke through the wall and flew off. 两条没画上眼睛的龙 stayed, so D is wrong.",
        },
        {
          number: 89,
          prompt: "关于张僧繇，可以知道什么？",
          options: ["擅长写作", "绘画技术很高", "能与动物交流", "不喜欢画人物"],
          answer: 1,
          why: "He is a 著名的画家 whose birds and beasts are 栩栩如生 and whose dragons are 活灵活现: his painting skill is superb. 写作 only appears in the idiom's later meaning.",
        },
        {
          number: 90,
          prompt: "上文主要讲的是：",
          options: ["绘画技巧", "关于龙的传说", "张僧繇勤学苦练的故事", "成语“画龙点睛”的由来"],
          answer: 3,
          why: "The text says 成语“画龙点睛”便出自关于他的传说, tells that legend, then gives the idiom's meaning: it explains where 画龙点睛 comes from.",
        },
      ],
    },
  ],
};
