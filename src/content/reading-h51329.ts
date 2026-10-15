import type { ReadingPaper } from "./types";

/**
 * HSK 5 paper H51329, Reading Parts 2 and 3 (questions 61–90), transcribed
 * from the learner's PDF (Hsk5set1.pdf, the first paper) and cleaned of
 * text-layer errors. Answers are the official key (H51329Ans.pdf).
 * [[…]] marks words or sentences underlined in the paper.
 */
export const readingH51329: ReadingPaper = {
  id: "h51329",
  title: "H51329",
  source: "HSK 5 · H51329 · Reading 61–90",
  part2: [
    {
      id: "h51329-61",
      numbers: "61",
      passage:
        "武术是中国的一项传统体育项目，因为训练的过程很艰苦，所以练武不仅可以提高人的身体素质，还能够磨练人的意志和品格，这也是练武者往往都具有勤奋刻苦、坚强勇敢的品质的原因。",
      questions: [
        {
          number: 61,
          options: ["练武者以男性居多", "武术是现代流行运动", "练武有益于身心健康", "练武对强身健体作用不大"],
          answer: 2,
          why: "Martial arts improve 身体素质 (the body) and 磨练意志和品格 (the mind), so it is good for body and mind. Men, modern popularity and 'little effect' are not said.",
        },
      ],
    },
    {
      id: "h51329-62",
      numbers: "62",
      passage:
        "刘半农是中国著名的文学家、语言学家。1920年他创作了一首题为《教我如何不想她》的小诗，后经赵元任谱成歌曲，在国内传唱开来，流传至今。这首诗中第一次用“她”字来指代女性，后来“她”字得到人们的普遍认可，被收入词典。",
      questions: [
        {
          number: 62,
          options: [
            "赵元任发明了“她”字",
            "赵元任认为男女应该平等",
            "用“她”字指代女性始于刘半农",
            "将“她”收入词典是为了纪念刘半农",
          ],
          answer: 2,
          why: "刘半农's poem was the first (第一次) to use 她 for women. 赵元任 only set it to music, and the dictionary took it in because people accepted it, not as a memorial.",
        },
      ],
    },
    {
      id: "h51329-63",
      numbers: "63",
      passage:
        "将目标化整为零，变成一个个容易实现的小目标，然后将其逐个击破，这不失为一个实现终极目标的有效方法。很多时候，我们之所以感到困难不可克服、成功无法企及，正是因为目标太过遥远，从而失去了信心。",
      questions: [
        {
          number: 63,
          options: ["目标一定要明确", "制定目标要符合实际", "不要轻易改变自己的目标", "化整为零有助于实现最终目标"],
          answer: 3,
          why: "Breaking a goal into small ones (化整为零) is called 实现终极目标的有效方法: it helps reach the final goal. The other options are never mentioned.",
        },
      ],
    },
    {
      id: "h51329-64",
      numbers: "64",
      passage:
        "模特是一种与时尚紧密相关的职业。模特们用自己的身体语言来表现服装或者其他物品的内涵，给人带来美的享受。但并不是每个人都可以成为模特，做模特的人通常身材非常好，很苗条，而且个子也很高。",
      questions: [
        {
          number: 64,
          options: ["模特要保持神秘感", "模特不能吃油炸食品", "模特这个职业对身材有要求", "高学历的人更容易成为模特"],
          answer: 2,
          why: "Not everyone can be a model: they are usually slim and tall (身材非常好…个子也很高), so the job has requirements for one's figure.",
        },
      ],
    },
    {
      id: "h51329-65",
      numbers: "65",
      passage:
        "人人都希望成就一番大事业，却很少有人对小事感兴趣，但“一屋不扫，何以扫天下？”大成就往往是由小成绩累积而成的，“扫天下”局面的出现往往离不开“扫一屋”。如果连“一屋”都扫不好，“扫天下”就更无从说起了。",
      questions: [
        {
          number: 65,
          options: ["做事要细心", "要多与人合作", "要养成良好的卫生习惯", "做好小事是成就大事业的基础"],
          answer: 3,
          why: "Big achievements are built from small ones (大成就往往是由小成绩累积而成的). 扫一屋 is a metaphor, not about hygiene.",
        },
      ],
    },
    {
      id: "h51329-66",
      numbers: "66",
      passage:
        "漠河县位于中国版图的最北端，冬季长达7个多月，日照时间非常短；夏季只有两个月左右，但每天日照时间长达17个小时。漠河地区的年平均气温为零下4°C，冬季温度低于零下40°C，气温虽然很低，但由于有森林挡风，因此并没有人们想象中的那么可怕。",
      questions: [
        {
          number: 66,
          options: ["漠河地区四季如春", "漠河地区夏季日照时间极短", "漠河地区年平均气温低于零度", "森林导致漠河地区的气温下降"],
          answer: 2,
          why: "The yearly average is 零下4°C, below zero. Summer days get 17 hours of sun (not short), and the forest blocks the wind rather than lowering the temperature.",
        },
      ],
    },
    {
      id: "h51329-67",
      numbers: "67",
      passage:
        "很多人都有过失恋的经历，刚开始，以为这就是世界末日，断言自己一辈子都走不出失恋的阴影，不会再爱上任何一个人。可实验表明，人们失恋后感觉痛苦郁闷的时间，比预期的要短暂得多。在短期内，我们可能对某人有强烈的无以复加的情感，但是没有了他，结果未必如你预想的那样坏，你会慢慢地适应没有他的生活，痛苦也会随着时间而消弭。",
      questions: [
        {
          number: 67,
          options: ["失恋使人不自信", "失恋会让人更坚强", "时间会缓解失恋的痛苦", "要学会控制自己的情绪"],
          answer: 2,
          why: "The last line: 痛苦也会随着时间而消弭 — the pain fades with time. Confidence, getting stronger and controlling emotions are not said.",
        },
      ],
    },
    {
      id: "h51329-68",
      numbers: "68",
      passage:
        "葡萄不仅味美可口，而且营养价值很高。身体虚弱的人，多吃些葡萄或葡萄干，有助于增强体质，这是因为葡萄含有蛋白质、维生素及矿物质等多种营养成分，尤其是葡萄糖，含量较高，而且可被人体直接吸收。",
      questions: [
        {
          number: 68,
          options: ["葡萄不易保存", "葡萄营养丰富", "葡萄糖不好吸收", "身体弱的人要少吃葡萄"],
          answer: 1,
          why: "营养价值很高 and 多种营养成分: grapes are nutritious. Glucose is absorbed directly (C is the opposite), and weak people should eat more (D is the opposite).",
        },
      ],
    },
    {
      id: "h51329-69",
      numbers: "69",
      passage:
        "一个人如果长期生活在一个相对不变的环境中，没有新信息激发他去思考、去比较，他就很难“预测”未来。相反，一个人若处于不断变化的环境中，时常接触一些新的信息，他就可以打开思路，把自己在不同环境中观察到的东西加以比较，找出规律，预测出未来的发展趋势。",
      questions: [
        {
          number: 69,
          options: ["要学会适应环境", "变化的环境能促人思考", "人的性格与环境密切相关", "稳定的环境有利于人的成长"],
          answer: 1,
          why: "In a changing environment new information 打开思路 (opens up one's thinking): it makes people think. D is the opposite of the passage.",
        },
      ],
    },
    {
      id: "h51329-70",
      numbers: "70",
      passage:
        "铁树开花具有很强的地域性。在热带，铁树生长10年后就能开花结果。但当它被移植到中国寒冷干燥的地方时，就很少开花了。即使是室内盆栽的铁树，有的往往也要几十年甚至上百年才能开花，所以人们就用“铁树开花”来比喻极难实现或非常罕见的事情。",
      questions: [
        {
          number: 70,
          options: ["铁树寿命短", "盆栽铁树年年开花", "铁树开花需一定的气候条件", "铁树开花在热带地区很罕见"],
          answer: 2,
          why: "It flowers in 10 years in the tropics but rarely in cold, dry places (地域性): flowering depends on climate. In the tropics it is not rare (D), and potted ones take decades (B).",
        },
      ],
    },
  ],
  part3: [
    {
      id: "h51329-71",
      numbers: "71–74",
      passage: [
        "一个富翁丢了钱包，十分着急，他广贴告示说，如果有人能替他把钱包找回来，他就把钱包里的金币分一半儿给那个人。",
        "几天后，有一个人找到了钱包，将它还给富翁。[[吝啬]]的富翁见到找回的钱包非常高兴，却又舍不得拿出一半儿金币。他眼珠一转，故作惊慌地说：“钱包里少了一枚钻石戒指。”那个人坚称自己从未见过钻石戒指。两人争吵起来，决定让法官来裁决。",
        "法官早就听闻富翁为人吝啬，便问富翁：“你敢肯定钱包里除了100枚金币，还有一枚钻石戒指吗？”",
        "“是的，我可以发誓！我的戒指就在钱包里！”富翁说。",
        "“那好，”法官接着说，“这个钱包里只有100枚金币，没什么钻石戒指。由此可以断定，这个钱包并不是你丢的那个。你还是去找里边有钻石戒指的钱包吧。”",
      ].join("\n"),
      questions: [
        {
          number: 71,
          prompt: "第2段中，画线词语“吝啬”最可能是什么意思？",
          options: ["小气", "谨慎", "谦虚", "自私"],
          answer: 0,
          why: "He is happy to get the wallet back but 舍不得拿出一半儿金币 — can't bear to part with the coins: 吝啬 means stingy, 小气. 自私 (selfish) is close, but the clue is about money.",
        },
        {
          number: 72,
          prompt: "富翁看见找回的钱包后：",
          options: ["感到很吃惊", "发现自己被骗了", "给了那个人50枚金币", "谎称里面原来有枚戒指"],
          answer: 3,
          why: "故作惊慌地说：“钱包里少了一枚钻石戒指。” — he pretended (故作) a ring was missing, a lie to avoid paying. He never paid the reward.",
        },
        {
          number: 73,
          prompt: "法官：",
          options: ["不相信富翁", "把钱包还给了富翁", "认为那个人是小偷", "要求那个人赔偿戒指"],
          answer: 0,
          why: "The judge already knew the rich man was stingy (早就听闻富翁为人吝啬) and used his own lie against him: he did not believe him, and did not return the wallet.",
        },
        {
          number: 74,
          prompt: "最适合做上文标题的是：",
          options: ["富翁的烦恼", "钱包里的戒指", "金币去哪儿了", "占小便宜的法官"],
          answer: 1,
          why: "The whole story turns on the made-up ring in the wallet: the lie, the quarrel and the judge's verdict all hang on it.",
        },
      ],
    },
    {
      id: "h51329-75",
      numbers: "75–78",
      passage: [
        "从前，有个叫公孙仪的人，非常善于弹琴。从他的琴声中能听出泉水涓涓，也能听出大海的怒涛；能听出秋虫的低鸣，也能听出小鸟婉转的歌唱。他弹奏欢快的曲调，会让人眉开眼笑；而悲哀的曲调，又使人心酸不已，甚至跟着琴声呜咽。凡是听过他弹琴的人，没有不被他的琴声打动的。",
        "一次，公孙仪在弹琴时，看见有几头牛在不远处吃草，不由得突发奇想：“我的琴声，听了的人都说好，牛会不会也觉得好呢？”",
        "于是，公孙仪就坐到牛旁边，弹了他最拿手的曲子《清角》。他的琴声美妙极了，任何人听了都会发出“此曲只应天上有，人间能得几回闻”的感慨。可是那些牛还是静静地低着头吃草，丝毫没有反应，就好像它们什么都没听到一样。",
        "公孙仪想了想，又重新弹了一曲。这一次曲调变了，音不成音、调不成调，听上去实在不怎么样，像是一群蚊子扇动翅膀发出的“嗡嗡”声，中间似乎还夹杂着小牛“哞哞”的叫声。",
        "这回牛总算有了反应，纷纷竖起耳朵、甩着尾巴听了起来。",
        "琴声最终引起了牛的注意，是因为这个声音接近它所熟悉的东西。",
        "后来，人们就用“对牛弹琴”这个成语来比喻有些人说话不看对象，对外行人说内行话，白白浪费了时间。",
      ].join("\n"),
      questions: [
        {
          number: 75,
          prompt: "第1段主要谈的是公孙仪：",
          options: ["琴声动人", "喜欢养牛", "歌声很美", "热爱大自然"],
          answer: 0,
          why: "Paragraph 1 ends 凡是听过他弹琴的人，没有不被他的琴声打动的 — his playing moves everyone. He plays the qin; he does not sing.",
        },
        {
          number: 76,
          prompt: "为什么公孙仪弹第二支曲子时才引起了牛的注意？",
          options: ["牛正好饿了", "他换了一把琴", "牛听得更清楚了", "琴声像牛熟悉的声音"],
          answer: 3,
          why: "The story says it directly: 是因为这个声音接近它所熟悉的东西 — the sound was close to what cows know (mosquitoes, a calf mooing).",
        },
        {
          number: 77,
          prompt: "根据上文，下列哪项正确？",
          options: ["公孙仪太骄傲了", "公孙仪十分伤心", "牛的耳朵受伤了", "牛不会欣赏优美的琴声"],
          answer: 3,
          why: "The cows ignored his most beautiful piece (丝毫没有反应) and only reacted to noise like their own sounds: they cannot appreciate fine music.",
        },
        {
          number: 78,
          prompt: "上文主要想告诉我们什么？",
          options: ["要勤学苦练", "不要不懂装懂", "具体问题具体分析", "兴趣是最好的老师"],
          answer: 2,
          why: "对牛弹琴 is about speaking without regard to the listener (说话不看对象): you must suit what you do to who you are dealing with — 具体问题具体分析.",
        },
      ],
    },
    {
      id: "h51329-79",
      numbers: "79–82",
      passage: [
        "我注意到，狗独处时一般不会玩耍。狗单独呆着时，就会显出动物式的“一本正经”来。要是没有其他事情可做，它就会东看看西望望，或是陷入沉思，或是睡觉。但是它不会玩耍，不会追自己的尾巴，不会在草地上兜圈子跑来跑去，不会嘴里衔着小树枝，也不会用鼻头去推小石子。这些行为，狗只有在有观众或者一起玩耍的伙伴时才会做出来。",
        "狗的玩耍是充满友情和快乐的。也有敏感到你停止观看的那一瞬间就失去玩耍心情的狗，它们玩耍的乐趣似乎只在于获得你的赞赏。总之，狗的玩耍是需要兴致的，是需要与他人接触的。",
        "至于猫，它们的玩耍却是“[[自娱自乐]]”的，丝毫不在意有没有观众鼓掌喝彩。猫独处时，只要有毛线球或松紧带，就能安静地、专心地玩儿。猫在玩耍时，不会表现出“人类先生，你能在一旁看着，我真高兴”的样子。",
        "猫享受独处的快乐，狗则是希望和别人分享快乐，甚至主动带给别人快乐。狗在跟人一起玩耍时，总是全心全意地投入其中，直到精力耗尽为止。猫只对自己感兴趣，狗则希望别人对自己感兴趣。",
      ].join("\n"),
      questions: [
        {
          number: 79,
          prompt: "狗独处时，最可能做以下哪种行为？",
          options: ["四处看", "逗猫玩儿", "踩自己的影子", "追自己的尾巴"],
          answer: 0,
          why: "Alone, a dog 东看看西望望 — looks around. Chasing its tail (D) is exactly what it does NOT do alone.",
        },
        {
          number: 80,
          prompt: "根据上文，狗的玩耍具有什么特点？",
          options: ["懒洋洋", "模仿人类行为", "在乎别人的反应", "不带有任何感情"],
          answer: 2,
          why: "Some dogs lose interest the moment you stop watching; their fun lies in 获得你的赞赏: they care how others react.",
        },
        {
          number: 81,
          prompt: "第3段中，画线词语“自娱自乐”指的是猫：",
          options: ["很淘气", "更爱热闹", "需要别人的掌声", "享受独自玩耍的快乐"],
          answer: 3,
          why: "The same paragraph explains it: cats don't care about an audience and play quietly alone — they enjoy playing by themselves. C is the opposite.",
        },
        {
          number: 82,
          prompt: "上文主要谈的是：",
          options: ["动物的行为心理", "如何训练猫和狗", "猫和狗玩耍时的区别", "养宠物时要注意什么"],
          answer: 2,
          why: "Paragraphs 1–2 describe how dogs play, 3 how cats play, and 4 sums up the contrast: the difference between how cats and dogs play.",
        },
      ],
    },
    {
      id: "h51329-83",
      numbers: "83–86",
      passage: [
        "齐白石是中国著名的书画大师。一天，诗人艾青前来拜访已经88岁高龄的齐白石，还带来一幅画，请他鉴别真伪。齐白石拿出放大镜，仔细看了看，对艾青说：“我用刚创作的两幅画跟你换这幅，行吗？”",
        "艾青听后，赶紧收起画，笑着应道：“您就是拿20幅，我也不跟您换。”齐白石见换画无望，不禁叹了一口气说：“我年轻时画画多认真呀，现在退步了。”原来，艾青带来的这幅画正是齐白石几十年前的作品。",
        "艾青走后，齐白石一直愁眉不展。一天夜里，他儿子起来上厕所，看到书房的灯还亮着，走进一看，发现齐白石正坐在书桌前，一笔一划地描红。他儿子不解地问道：“您都这么大年纪了，早就盛名于世，怎么突然想起描红了，而且描的还是这么初级的东西？”",
        "齐白石摇了摇头，不紧不慢地答道：“现在我的声望高，很多人都说我画得好，觉得我随便抹一笔都是好的，[[我也被这些赞誉弄得有些飘飘然了]]，无形中就放松了对自己的要求。直到前几天，我看见自己年轻时画的一幅画，才猛然惊醒，我不能再被外界的那些不实之词蒙蔽了，以后还得认真练习，自己管住自己啊。”",
        "此后，即便年龄越来越大，齐白石还是坚持每天练习，从不懈怠。有时为了一幅画，他甚至会花上几个月的时间。",
        "不沉醉于过往的成就，不放松对自己的要求，这正是齐白石这位书画大师令人佩服的地方。",
      ].join("\n"),
      questions: [
        {
          number: 83,
          prompt: "艾青拿来的那幅画：",
          options: ["是齐白石画的", "是他自己的作品", "是中国古代名画", "齐白石认为是假的"],
          answer: 0,
          why: "原来，艾青带来的这幅画正是齐白石几十年前的作品 — the painting was by 齐白石 himself, decades earlier. 他 in B would be 艾青.",
        },
        {
          number: 84,
          prompt: "根据第3段，儿子对什么不解？",
          options: ["父亲夜里不睡觉", "书房的灯竟然还亮着", "父亲突然放弃了画画", "身为书画大师的父亲在描红"],
          answer: 3,
          why: "The son asks why someone so famous (早就盛名于世) is doing 描红, a beginner's tracing exercise. That is what puzzled him.",
        },
        {
          number: 85,
          prompt: "文中画线句子是想说明齐白石：",
          options: ["经常头晕", "心情十分糟糕", "愿望都实现了", "面对赞美有些得意"],
          answer: 3,
          why: "飘飘然 means carried away, smug: the praise (赞誉) had made him a little pleased with himself. It has nothing to do with dizziness.",
        },
        {
          number: 86,
          prompt: "上文主要想告诉我们：",
          options: ["不要忘掉过去", "要严格要求自己", "要经常夸奖别人", "不要在乎别人的看法"],
          answer: 1,
          why: "The last line: 不沉醉于过往的成就，不放松对自己的要求 — don't rest on past success; keep strict standards for yourself.",
        },
      ],
    },
    {
      id: "h51329-87",
      numbers: "87–90",
      passage: [
        "在日常生活中，谁都有不小心打碎东西的时候，但极少有人会去研究这些碎片中的学问。有位物理学家却从花瓶的碎片中发现了这样一个规律：将打碎后的物体碎片按重量级的数量分类，不同的重量级间会表现出统一的倍数关系。例如，被打碎的花瓶，最大的碎片与次大的碎片重量比是16:1，次大的与第三大的碎片间的重量比也是16:1，以此类推。这就是著名的“碎花瓶理论”。",
        "物理学家进一步研究发现，不同形状的物体，这个重量比是不同的。对于花瓶或茶杯状的物体，这个倍数约为16，棒状物体约为11，球状物体则约为40。更重要的是，这个倍数与物体的材料无关，即使是一块儿冻豆腐摔碎了，也会遵循这个规律。",
        "由此可知，只要有同一物体的部分碎片就能求出这个倍数，从而可以推测出物体破碎前的大概形状。目前，“碎花瓶理论”在恢复文物原貌、推测陨石形状等工作中有特别的用处，它给这些原来全凭经验和想象的工作提供了理论依据。",
      ].join("\n"),
      questions: [
        {
          number: 87,
          prompt: "根据第1段，最大的花瓶碎片：",
          options: ["数量最多", "用处不大", "形状最特别", "重量是第二大的16倍"],
          answer: 3,
          why: "最大的碎片与次大的碎片重量比是16:1 — the largest piece weighs 16 times the second largest.",
        },
        {
          number: 88,
          prompt: "第2段中，举“冻豆腐”的例子是为了说明：",
          options: ["食物碎片很难统计", "重量比不受材料影响", "碎片形状和重量比有关", "重量比与温度有一定关系"],
          answer: 1,
          why: "Right before the example: 这个倍数与物体的材料无关 — even frozen tofu follows the rule, so the ratio does not depend on the material.",
        },
        {
          number: 89,
          prompt: "关于碎花瓶理论，下列哪项正确？",
          options: ["缺少理论支持", "对实验室条件要求高", "很多人提出反对意见", "球状物体重量比约为40:1"],
          answer: 3,
          why: "球状物体则约为40 — for round objects the ratio is about 40. The theory itself provides 理论依据, so A is the opposite.",
        },
        {
          number: 90,
          prompt: "第3段主要介绍的是碎花瓶理论的：",
          options: ["应用价值", "实验步骤", "历史背景", "理论依据"],
          answer: 0,
          why: "Paragraph 3 lists its uses: restoring relics and estimating meteorite shapes (有特别的用处) — its practical value.",
        },
      ],
    },
  ],
};
