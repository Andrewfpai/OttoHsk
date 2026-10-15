import type { ReadingPaper } from "./types";

/**
 * HSK 5 paper H51332, Reading Parts 2 and 3 (questions 61–90), transcribed
 * from the learner's PDF (test.pdf, cross-checked against Hsk5set1.pdf) and
 * cleaned of text-layer errors. Answers are the official key (H51332Ans.pdf).
 * [[…]] marks words or sentences underlined in the paper.
 */
export const readingH51332: ReadingPaper = {
  id: "h51332",
  title: "H51332",
  source: "HSK 5 · H51332 · Reading 61–90",
  part2: [
    {
      id: "h51332-61",
      numbers: "61",
      passage:
        "宣纸是一种主要用于中国传统书画创作的纸张。它的寿命可达1000年，而普通纸大约在两三百年后就会因自然老化而破损，新闻纸的寿命则更短，五六十年后就会变黄、发脆。所以，宣纸算是纸中的“老寿星”了。",
      questions: [
        {
          number: 61,
          options: ["宣纸的寿命很长", "新闻纸是最高档的纸", "宣纸多用于广告宣传", "一般的纸都能保存五六百年"],
          answer: 0,
          why: "宣纸 lasts up to 1000年 and is called the “老寿星” of paper, so it lives a long time. Ordinary paper lasts only 两三百年, and 宣纸 is for 书画创作, not advertising.",
        },
      ],
    },
    {
      id: "h51332-62",
      numbers: "62",
      passage:
        "经常熬夜的人常会感到疲倦、头痛，时间久了，还会发现免疫力也在下降。许多年轻人觉得无所谓，可他们不知，到老的时候，身体的许多毛病就会显现出来，到时候再后悔就来不及了。",
      questions: [
        {
          number: 62,
          options: ["熬夜对身体伤害大", "老年人要多补充营养", "免疫力下降会让人失眠", "年轻人体力恢复得更快"],
          answer: 0,
          why: "Staying up late brings 疲倦、头痛, lowers 免疫力, and later 身体的许多毛病就会显现出来: it does real harm to the body. Nutrition, insomnia and recovery speed are not mentioned.",
        },
      ],
    },
    {
      id: "h51332-63",
      numbers: "63",
      passage:
        "张衡是中国东汉时期著名的科学家。他观测记录了2500颗恒星，并发明了世界上第一台能较准确预测地震的仪器——地动仪。此外，他还有哲学、文学等著作32篇，有历史学家称赞他为世上罕见的“全面发展的人物”。",
      questions: [
        {
          number: 63,
          options: ["张衡著有32篇哲学著作", "地动仪主要用于观测星星", "张衡在科学方面成就突出", "历史学家对张衡评价不高"],
          answer: 2,
          why: "He recorded 2500颗恒星 and invented the first device to predict earthquakes (地动仪): outstanding scientific achievements. The 32 works are 哲学、文学等 together, not all philosophy, and historians praise him (称赞).",
        },
      ],
    },
    {
      id: "h51332-64",
      numbers: "64",
      passage:
        "很多人认为事先做计划会很浪费时间，事实上，提前做好计划可以减少工作所用的总时间。行动之前先进行头脑热身，构想好要做之事的每个细节，梳理清楚思路，这样当我们行动时，便会得心应手。",
      questions: [
        {
          number: 64,
          options: ["细节决定成败", "考虑问题要周到", "行动离不开理论的指导", "事先做好计划可提高工作效率"],
          answer: 3,
          why: "提前做好计划可以减少工作所用的总时间 — planning ahead cuts the total time a job takes, so it makes work more efficient. Details are only part of the planning, not the main point.",
        },
      ],
    },
    {
      id: "h51332-65",
      numbers: "65",
      passage:
        "嫦娥奔月是中国古代的神话传说。据传嫦娥的丈夫后羿得到了不死药，为避免坏人抢走仙药，嫦娥就自己吞下了不死药，结果她飞到了月亮上，从此与后羿分离。月母见二人互相思念却不能相见，就让嫦娥每年八月十五这天与后羿相会。这就是中秋节团圆习俗的由来。",
      questions: [
        {
          number: 65,
          options: ["嫦娥偷吃了不死药", "嫦娥和后羿每月见一次", "月母阻止后羿和嫦娥见面", "中秋节与嫦娥奔月的传说有关"],
          answer: 3,
          why: "The last line: 这就是中秋节团圆习俗的由来 — the legend is the origin of the Mid-Autumn reunion custom. She swallowed the medicine to keep it from 坏人 (not stealing it), and the couple meet once a year, allowed by 月母.",
        },
      ],
    },
    {
      id: "h51332-66",
      numbers: "66",
      passage:
        "什么东西都想得到的人，到最后往往什么都得不到。人的生命有限，精力有限，这决定了我们应当有所取舍。该取时，要毫不犹豫，勇往直前；该舍时，也要做到干脆果断，绝不可惜。任何患得患失的行为，都只会加重心理负担，无形之中成为我们前进的绊脚石。",
      questions: [
        {
          number: 66,
          options: ["要学会取舍", "目标要明确", "不要轻易放弃", "选择多不见得好"],
          answer: 0,
          why: "Because life and energy are limited, 我们应当有所取舍: we must learn what to take and what to give up. C goes against 该舍时…干脆果断.",
        },
      ],
    },
    {
      id: "h51332-67",
      numbers: "67",
      passage:
        "为什么绝大多数运动品牌店都是在商场的地下或者高层呢？这是因为运动品牌的消费群体较为固定。顾客在进入商场前，对要买哪个运动品牌的哪款商品、价格大概是多少等问题，心中一般有数。至于它们位于商场的什么位置，对顾客影响并不大。因此，运动品牌自然会选在租金相对便宜的地下或是较高楼层来营业。",
      questions: [
        {
          number: 67,
          options: ["运动品牌店的租金较贵", "商场高层更容易招来顾客", "顾客更看重商品的样式而非品牌", "运动品牌有相对固定的消费群体"],
          answer: 3,
          why: "运动品牌的消费群体较为固定 — sports brands have a fairly fixed group of customers. They choose the basement or upper floors because rent there is 相对便宜, not expensive.",
        },
      ],
    },
    {
      id: "h51332-68",
      numbers: "68",
      passage:
        "研究表明，用牛奶服药不科学。牛奶会影响人体对药物的吸收速度，还容易在药物表面形成覆盖膜，使牛奶中的钙与镁等矿物质离子与药物发生化学反应，生成非水溶性物质，这样会降低药效。所以，在服药前后的一到两小时内不宜饮用牛奶。",
      questions: [
        {
          number: 68,
          options: ["饭前一小时不应服药", "用牛奶服药会降低药效", "牛奶会破坏药物表面的覆盖膜", "牛奶可促进人体对药物的吸收"],
          answer: 1,
          why: "Milk reacts with the medicine and 这样会降低药效 — it lowers the medicine's effect. Milk forms the coating film rather than breaking it, and it hinders absorption.",
        },
      ],
    },
    {
      id: "h51332-69",
      numbers: "69",
      passage:
        "洞庭湖位于湖南、湖北省交界处，是中国第二大淡水湖，号称“八百里洞庭”。洞庭湖风光迷人，据传是“神仙洞府”。它最大的特点是湖中有山，湖外有湖，水天一色。湖南省和湖北省中的“湖”字，指的就是洞庭湖。",
      questions: [
        {
          number: 69,
          options: ["洞庭湖景色优美", "洞庭湖的水是咸的", "洞庭湖动植物种类繁多", "洞庭湖面积在不断扩大"],
          answer: 0,
          why: "洞庭湖风光迷人 — its scenery is charming, i.e. beautiful. It is a 淡水湖 (freshwater), so B is wrong; wildlife and a growing area are not mentioned.",
        },
      ],
    },
    {
      id: "h51332-70",
      numbers: "70",
      passage:
        "心理学家发现，性格热情的人的社交圈子通常是其他人的一倍甚至数倍，他们的生活也比其他人更丰富多彩。无论何地何时，他们总能成为交际圈中的焦点和中心。热情不但可以提升人们自身的魅力指数，就连身边的朋友也能感受到他们带来的福利，跟着一起享受生活的乐趣。",
      questions: [
        {
          number: 70,
          options: ["性格热情的人更成熟", "性格热情的人交际圈广", "性格热情的人不爱表现自己", "性格热情的人会使其他人感到惭愧"],
          answer: 1,
          why: "Their 社交圈子 is 其他人的一倍甚至数倍 — warm people have a much wider social circle. They are the 焦点和中心, so C is wrong.",
        },
      ],
    },
  ],
  part3: [
    {
      id: "h51332-71",
      numbers: "71–74",
      passage: [
        "周六早上，我陪母亲到海边散步。经过海滨公园时，看见许多人在放风筝。令我不解的是，那些放风筝的人都挤在公园空地的一侧，而那密密麻麻的风筝线，似乎随时都可能绞成一团。",
        "我暗笑：为什么大家宁可挤成一团，也不去没人的那边？真傻！于是我买了一个风筝，独自走到没人的那边去放。",
        "风筝飞起来，线慢慢地放长了，但是不稳定的风使我不得不随时回卷手上的线，来不及卷线时，就只好向后退。终于，我的风筝飞得和别人的一样高了，这时我才发现，因为风向的缘故，自己竟然也和放风筝的那群人挤在一起了。",
        "一旁的母亲看出了我的心思，意味深长地告诉我：在我们嘲笑别人前，应该先想想别人为什么会这样做；在没有亲身经历前，不要随便批评别人。",
      ].join("\n"),
      questions: [
        {
          number: 71,
          prompt: "什么事让他感到不解？",
          options: ["风筝线都很短", "大家都在早晨放风筝", "放风筝的人都挤在一起", "人们通过放风筝来健身"],
          answer: 2,
          why: "令我不解的是，那些放风筝的人都挤在公园空地的一侧 — what puzzled him was that all the kite flyers were crowded on one side.",
        },
        {
          number: 72,
          prompt: "他选择在什么样的地方放风筝？",
          options: ["风速稳定的", "人群聚集的", "没人放风筝的", "道路比较宽的"],
          answer: 2,
          why: "He laughed at the crowd and 独自走到没人的那边去放 — he went to the empty side where nobody was flying kites. The wind there was 不稳定, so A is wrong.",
        },
        {
          number: 73,
          prompt: "关于他的风筝，下列哪项正确？",
          options: ["线断了", "最后飞起来了", "是他自己制作的", "撞上了别人的风筝"],
          answer: 1,
          why: "终于，我的风筝飞得和别人的一样高了 — in the end it flew as high as the others. He bought it (买了一个风筝) rather than making it.",
        },
        {
          number: 74,
          prompt: "上文主要想告诉我们：",
          options: ["对人要有礼貌", "要学会吸取教训", "不要随便笑话别人", "经历过的事印象更深刻"],
          answer: 2,
          why: "The mother's lesson: 在我们嘲笑别人前，应该先想想别人为什么会这样做 — don't laugh at others casually before you understand their reasons.",
        },
      ],
    },
    {
      id: "h51332-75",
      numbers: "75–78",
      passage: [
        "据说篮球运动刚诞生的时候，篮板上钉的是有底儿的篮筐。每当球投进的时候，就有一个人踩在梯子上专门负责把球拿出来。为此，比赛不得不断断续续地进行，缺少了激烈紧张的气氛。为了让比赛更顺畅地进行，人们想了很多取球方法，但都不太理想。有一位发明家甚至制造了一种机器，只要机器在篮筐下面一拉就能把球弹出来，不过这种方法还是没能让篮球比赛紧张激烈起来。",
        "有一天，一位父亲带着儿子去看球赛。小男孩儿看到大人们一次次不辞劳苦地取球，大惑不解：为什么不把篮筐的底儿去掉呢？人们这才[[如梦初醒]]，于是就有了今天我们看到的篮网样式。",
        "去掉篮筐的底儿，就这么简单，但那么多有识之士都没有想到，这个简单的“难题”就这样困扰了人们很多年。可见，无形的思维定式就像那个结实的篮筐，禁锢着我们的头脑，而我们的思维也像篮球一样被“囚禁”在了篮筐里。",
      ].join("\n"),
      questions: [
        {
          number: 75,
          prompt: "关于刚诞生的篮球运动，可以知道：",
          options: ["篮筐是有底儿的", "比赛场地非常窄", "比赛气氛很紧张", "球员还要负责取球"],
          answer: 0,
          why: "篮板上钉的是有底儿的篮筐 — the first baskets had bottoms. The game 缺少了激烈紧张的气氛, and a separate person (一个人…专门负责), not the players, fetched the ball.",
        },
        {
          number: 76,
          prompt: "第2段中，画线词语“如梦初醒”是什么意思？",
          options: ["梦想刚刚实现", "像做梦一样不真实", "受到启发而突然明白", "做梦时忽然被人叫醒"],
          answer: 2,
          why: "After the boy asked 为什么不把篮筐的底儿去掉呢, people suddenly saw it: 如梦初醒 means to suddenly realize something after being prompted, as if waking from a dream.",
        },
        {
          number: 77,
          prompt: "根据上文，下列哪项正确？",
          options: ["小男孩儿发明了篮网", "取球机器现在被广泛应用", "小男孩儿觉得捡球很好玩儿", "人们为快速取球做了很多努力"],
          answer: 3,
          why: "人们想了很多取球方法, and an inventor even built a machine: people tried hard to get the ball out faster. The boy only asked a question; he was puzzled (大惑不解), not amused.",
        },
        {
          number: 78,
          prompt: "上文主要想告诉我们什么？",
          options: ["是金子总会发光的", "要换个角度思考问题", "要虚心听取别人的意见", "要从小培养孩子的想象力"],
          answer: 1,
          why: "The last paragraph: 无形的思维定式…禁锢着我们的头脑 — fixed ways of thinking trap us, so we should look at a problem from a different angle.",
        },
      ],
    },
    {
      id: "h51332-79",
      numbers: "79–82",
      passage: [
        "一群野雁落在公园的湖边，它们打算先在这里生活，等到秋天再到南方过冬。",
        "公园里的游客见到大雁都很惊喜，纷纷掏出饼干、鱼片等食物丢给它们。一开始那群大雁不知道游客丢的是什么东西，“哗”地一声全吓跑了。等游客走了以后，它们才慢慢地靠近那些食物品尝起来。",
        "渐渐地，大雁知道游客对它们没有威胁，只要看见游客丢下食物，它们便一哄而上。日子久了，大雁就以游客给的食物为生，一个个长得圆滚滚的。",
        "秋天来了，大雁们还是过着安逸的生活。它们不再想去南方，因为飞那么远太累。",
        "到了冬天，大雪下个不停，游客日渐稀少。冷风不断地从羽毛里透进去，大雁冻得直发抖，再加上食物越来越少，它们又冷又饿。有几只试图往南方飞，但沉重的身躯和寒冷的天气让它们没飞多远就又折了回来。它们只能紧紧地依偎在一起，怀念去年的这个时候。",
        "贪图安逸的人往往会因小失大。幸福是通过自己不断地努力和奋斗得来的，而不是依靠别人的施舍才有的。",
      ].join("\n"),
      questions: [
        {
          number: 79,
          prompt: "一开始面对游客给的食物，大雁：",
          options: ["很兴奋", "很感激", "不敢吃", "觉得难吃"],
          answer: 2,
          why: "一开始…“哗”地一声全吓跑了 — at first they were frightened off and only approached the food after the visitors left, so they did not dare to eat.",
        },
        {
          number: 80,
          prompt: "大雁为什么不想回南方了？",
          options: ["南方气候恶劣", "南方食物稀少", "北方越来越温暖", "它们习惯了舒适的生活"],
          answer: 3,
          why: "In autumn they were still 过着安逸的生活 and found flying so far 太累: they had got used to an easy life. Nothing is said about the south's weather or food.",
        },
        {
          number: 81,
          prompt: "根据第5段，下列哪个正确？",
          options: ["大雁过得很艰苦", "大雁的羽毛很耐寒", "大雁喜欢单独行动", "有些大雁成功飞到了南方"],
          answer: 0,
          why: "In winter they 冻得直发抖 and were 又冷又饿 — life became very hard. The cold got through their feathers, they huddled together, and those that tried to fly south 折了回来.",
        },
        {
          number: 82,
          prompt: "上文主要想告诉我们什么？",
          options: ["学会适应环境", "遇事不要悲观", "幸福要靠自己争取", "适合自己的才是最好的"],
          answer: 2,
          why: "The last line: 幸福是通过自己不断地努力和奋斗得来的，而不是依靠别人的施舍 — happiness must be won by your own effort.",
        },
      ],
    },
    {
      id: "h51332-83",
      numbers: "83–86",
      passage: [
        "1928年，经徐志摩介绍，时任中国公学校长的胡适聘用了沈从文做讲师，主讲大学一年级的现代文学选修课。",
        "当时，沈从文已经在文坛上崭露头角，在社会上也小有名气，因此还未到上课时间，教室里就坐满了学生。上课时间到了，沈从文走进教室，看见下面黑压压一片，心里陡然一惊，脑子里变得一片空白，连准备了无数遍的第一句话都堵在嗓子里说不出来了。",
        "他呆呆地站在那里，面色尴尬至极，双手拧来拧去无处可放。上课前他自以为成竹在胸，所以就没带教案和教材。整整10分钟，教室里鸦雀无声，所有的学生都好奇地等着这位新来的老师开口。沈从文深吸了一口气，慢慢平静了下来，原先准备好的东西也重新在脑子里聚拢，然后他开始讲课了。不过由于他依然很紧张，原本预计一小时的授课内容，竟然用了不到15分钟就讲完了。",
        "接下来怎么办？他再次陷入了窘境。无奈之下，他只好拿起粉笔在黑板上写道：我第一次上课，见你们人多，怕了。",
        "顿时，教室里爆发出了一阵善意的笑声，随即一阵鼓励的掌声响起。得知这件事之后，胡适对沈从文大加赞赏，认为他非常成功。",
        "有了这次经历，在以后的课堂上，沈从文都会告诫自己不要紧张，渐渐地，他开始在课堂上变得从容起来。",
      ].join("\n"),
      questions: [
        {
          number: 83,
          prompt: "第2段中，“黑压压一片”指的是：",
          options: ["教室很暗", "听课的人多", "房间里很吵", "学生们发言很积极"],
          answer: 1,
          why: "Because he was already famous, 教室里就坐满了学生: 黑压压一片 describes the dense mass of students in front of him, i.e. a big audience, not a dark room.",
        },
        {
          number: 84,
          prompt: "沈从文没拿教材，是因为他觉得：",
          options: ["讲课内容不多", "自己准备得很充分", "这样可以减轻压力", "教材会限制自己的发挥"],
          answer: 1,
          why: "上课前他自以为成竹在胸，所以就没带教案和教材 — he thought he was fully prepared, so he brought no materials.",
        },
        {
          number: 85,
          prompt: "看见沈从文写的那句话，学生们：",
          options: ["急忙安慰他", "在心里埋怨他", "受到了极大的鼓舞", "表示理解并鼓励了他"],
          answer: 3,
          why: "教室里爆发出了一阵善意的笑声，随即一阵鼓励的掌声响起 — kind laughter, then encouraging applause: they understood and encouraged him.",
        },
        {
          number: 86,
          prompt: "上文主要谈的是：",
          options: ["中国教育制度的发展", "紧张时应如何调整自己", "沈从文第一次讲课时的情景", "沈从文如何从作家转变为教师的"],
          answer: 2,
          why: "The story follows his first lecture (我第一次上课) from his nerves to the students' applause. Calming himself is only one moment in it.",
        },
      ],
    },
    {
      id: "h51332-87",
      numbers: "87–90",
      passage: [
        "战国后期，有个人叫赵括，他是赵国大将赵奢的儿子。赵括从小受到父亲的影响，熟读兵书，并且还爱跟别人谈论军事，和人争论起来无往不胜，有时甚至连他父亲都说不过他。赵括因此很骄傲，自以为天下无敌。但是赵奢心里明白：自己的儿子虽然对兵书倒背如流，但是没有实际作战的经验，想法很不切实际。他曾私下里对妻子说：“儿子虽然对兵书理论都很了解，但是缺乏实际锻炼，不能当大将。如果让他当了大将，只能害了赵国。”",
        "有一年，秦国出兵攻打赵国。那时赵奢已经去世，由老将廉颇负责指挥全军。廉颇年纪虽高，但打仗却很有经验。他根据敌强己弱的形势，采取坚守阵地的做法，绝不主动出击，即使秦军多次挑战，也不出兵迎战，因此使得秦国无法快速取胜。",
        "秦国知道这样拖下去对自己十分不利，不仅士兵会疲惫不堪，粮食也会耗尽，于是就施行了反间计。他们派人到赵国散布谣言，说“秦军最害怕赵括，根本不怕廉颇”。赵王本来就对廉颇的做法不满，听到这些话后，就信以为真，派了赵括去替代廉颇。赵括完全改变了廉颇的作战方案，死搬兵书上的条文，主动攻打秦军，结果中了秦国的圈套，40多万赵军全部被歼灭，他自己也中箭身亡。",
        "这就是成语“纸上谈兵”的故事，现在这个词常用来比喻空谈理论不能解决问题，告诫我们做事一定要理论联系实际。",
      ].join("\n"),
      questions: [
        {
          number: 87,
          prompt: "赵奢是怎么评价儿子的？",
          options: ["很坚强", "看书太少", "缺乏作战经验", "具有指挥才能"],
          answer: 2,
          why: "赵奢 knew his son 没有实际作战的经验 and 缺乏实际锻炼 — he lacked real combat experience. He had read plenty (熟读兵书) and was judged unfit to command.",
        },
        {
          number: 88,
          prompt: "根据第2段，可以知道廉颇：",
          options: ["比较胆小", "善于用兵", "年龄不大", "打败了秦军"],
          answer: 1,
          why: "廉颇 was 打仗却很有经验 and chose to hold his ground against a stronger enemy, so Qin 无法快速取胜: he was skilled at war. He was old (年纪虽高), and holding back was strategy, not cowardice.",
        },
        {
          number: 89,
          prompt: "关于上文，下列哪项正确？",
          options: ["赵王上了秦国的当", "赵王十分尊重廉颇", "赵括积极配合廉颇", "赵括取得了战争胜利"],
          answer: 0,
          why: "Qin spread a rumour (反间计) and 赵王…就信以为真, replacing 廉颇 with 赵括: the king was tricked by Qin. He was already 对廉颇的做法不满, and 赵括 lost and died.",
        },
        {
          number: 90,
          prompt: "最适合做上文标题的是：",
          options: ["纸上谈兵", "以少胜多", "糊涂的国王", "了不起的赵括"],
          answer: 0,
          why: "这就是成语“纸上谈兵”的故事 — the passage itself says it is the story behind the idiom 纸上谈兵, so that is the best title.",
        },
      ],
    },
  ],
};
