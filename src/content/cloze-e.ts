import type { ClozePassage } from "./types";

/** From the learner's own papers: mengisi HSK 5 (E). */
export const clozeE: ClozePassage[] = [
  // ── H51001 (2012) ──────────────────────────────────────────────
  {
    id: "e-h51001-46",
    source: "HSK 5 (E) H51001 (2012) · 46–48",
    text: "在沙滩排球场上，半躺在沙滩椅中，头顶着蓝天，脚下踩着软软的细沙，吹着海风，享受那份惬意。阳光下，球场两边各有两名{{46}}着太阳眼镜、晒得一身古铜色{{47}}的运动员在网前争夺。满身的沙子，还有满身的汗水，在蓝天白云的衬托下，阳光的照射下，动感而{{48}}活力。",
    blanks: [
      {
        number: 46,
        options: ["穿", "带", "挂", "戴"],
        answer: 3,
        why: "Glasses, hats and jewellery take 戴 (戴眼镜); 穿 is for clothes and shoes, and 带 means to carry along.",
      },
      {
        number: 47,
        options: ["皮肤", "身体", "头发", "胳膊"],
        answer: 0,
        why: "Sun tans the skin, so 晒得一身古铜色皮肤 is the natural phrase; 身体 is the body itself, not its colour.",
      },
      {
        number: 48,
        options: ["形成", "包括", "充满", "实现"],
        answer: 2,
        why: "充满活力 (full of energy) is a fixed collocation; 形成 and 实现 do not take 活力 as an object this way.",
      },
    ],
  },
  {
    id: "e-h51001-49",
    source: "HSK 5 (E) H51001 (2012) · 49–52",
    text: "一个姑娘和一个小伙子结婚了，他们结婚以后的生活十分幸福。小伙子非常喜欢足球，每次电视中有足球比赛的时候，他连饭都不吃也要看。对此，年轻的妻子一点儿{{49}}也没有。一天，电视里又播放足球比赛，丈夫坐在电视机前一动也不动，妻子跟他说话他也{{50}}没有听到。年轻的妻子非常{{51}}，她哭着回到自己的妈妈家，可是回到家的时候却发现家里只有爸爸一个人，也坐在电视机前看足球比赛。“{{52}}？”她很奇怪。“回她的妈妈家了。”父亲头也不回地说。",
    blanks: [
      {
        number: 49,
        options: ["办法", "意思", "方式", "能力"],
        answer: 0,
        why: "一点儿办法也没有 means she could do nothing about it; 方式 and 能力 do not fit this set phrase.",
      },
      {
        number: 50,
        options: ["好像", "相似", "表示", "相同"],
        answer: 0,
        why: "好像 is an adverb meaning 'seemed to' and can sit before 没有听到; 相似 and 相同 are adjectives of likeness, not adverbs.",
      },
      {
        number: 51,
        options: ["平静", "着急", "生气", "担心"],
        answer: 2,
        why: "Being ignored made her angry enough to cry and go home, so 生气; 着急 and 担心 suggest worry, which is not the situation.",
      },
      {
        number: 52,
        options: ["妈妈呢", "爸爸，你累了吧", "妈妈也看足球比赛", "您怎么不看电视呢"],
        answer: 0,
        why: "The father's reply 'she went back to her mother's home' answers the question 'where is Mum?', i.e. 妈妈呢.",
      },
    ],
  },
  {
    id: "e-h51001-53",
    source: "HSK 5 (E) H51001 (2012) · 53–56",
    text: "从前有一位老人叫愚公，他家门前有两座山，又高又大，{{53}}，全家人出门都很不方便。\n一天，愚公把家里人叫到一起，说：“有山挡着，出门太困难了，我们把它搬走，好不好？”全家人都很{{54}}，只有他的妻子没有信心。她说：“你已经快90了，怎么能搬山呢？而且山上的石头，要搬到哪里去呢？”愚公说：“可以扔到海里。”村里人看到愚公这么大年纪还在搬山，都很感动，也来帮助他们。有个叫智叟的老头儿看到了，{{55}}愚公太傻。愚公却说：“我死了还有儿子，儿子还有孙子，我们的人越来越多，山上的石头却越来越少，我们一定能{{56}}！”",
    blanks: [
      {
        number: 53,
        options: ["挡住了路", "十分矛盾", "因为无法推辞", "犹豫了很长时间"],
        answer: 0,
        why: "Two big mountains blocking the way explains why going out was inconvenient; the other options describe a person's state of mind, not the mountains.",
      },
      {
        number: 54,
        options: ["允许", "注意", "反对", "赞成"],
        answer: 3,
        why: "只有他的妻子没有信心 contrasts the wife with everyone else, so the rest of the family agreed (赞成), not 反对.",
      },
      {
        number: 55,
        options: ["相信", "考虑", "笑话", "确认"],
        answer: 2,
        why: "笑话 as a verb means to laugh at someone, which fits 'mocking 愚公 for being too foolish'; 相信 would not fit a sceptic named 智叟.",
      },
      {
        number: 56,
        options: ["发展", "努力", "到达", "成功"],
        answer: 3,
        why: "He is sure they will eventually succeed (一定能成功); 努力 is what they are already doing, not the outcome he promises.",
      },
    ],
  },
  {
    id: "e-h51001-57",
    source: "HSK 5 (E) H51001 (2012) · 57–60",
    text: "人的一生，就像乘坐一辆公交车。我们知道它有起点和终点，却无法预知沿途的经历。有的人行程长，有的人行程短。有的人很从容，可以{{57}}窗外的景色。有的人很窘迫，总处于拥挤之中。要想获得舒适与优雅，{{58}}。\n有的人很{{59}}，一上车就有座。有的人很倒霉，即使全车的人都坐下了，他还站着。有时别处的座位不断空出来，唯独身边这个毫无动静。而当他下定决心走向别处，刚才那个座位的人却正好离开。有的人用了种种的方式，经历了长长的{{60}}，终于可以坐下，但这时他已经到站了。",
    blanks: [
      {
        number: 57,
        options: ["旅游", "追求", "欣赏", "想像"],
        answer: 2,
        why: "欣赏景色 (enjoy the scenery) is the standard collocation; 旅游 cannot take 景色 as an object.",
      },
      {
        number: 58,
        options: ["需要好的心情", "座位必不可少", "忘掉那些不愉快吧", "应该自己买一辆车"],
        answer: 1,
        why: "The whole bus metaphor, and the next paragraph, is about getting a seat, so comfort requires a seat (座位必不可少); 'a good mood' breaks the metaphor.",
      },
      {
        number: 59,
        options: ["疲劳", "兴奋", "热情", "幸运"],
        answer: 3,
        why: "Getting a seat the moment you board is luck, and it contrasts directly with the next sentence's 倒霉 (unlucky).",
      },
      {
        number: 60,
        options: ["理解", "等待", "休息", "交谈"],
        answer: 1,
        why: "Someone who finally sits down after trying many ways has gone through a long wait (长长的等待); 休息 is what the seat would give, not what preceded it.",
      },
    ],
  },

  // ── H51002 (2012) ──────────────────────────────────────────────
  {
    id: "e-h51002-46",
    source: "HSK 5 (E) H51002 (2012) · 46–48",
    text: "医生为了说明饮酒的坏处，把两条一样的小虫{{46}}放进装酒和装水的瓶子里。放在酒里的那条小虫很快就死了，而放在水里的那条一点儿事也没有。医生对周围的病人说：“看见了吧，你们从这个{{47}}中明白了什么？”这时，一个病人站起来，认真回答说：“喝酒的人的{{48}}里绝对不会有这种虫子。”",
    blanks: [
      {
        number: 46,
        options: ["反复", "分别", "互相", "仍然"],
        answer: 1,
        why: "分别 means 'respectively', one worm into the wine bottle and one into the water bottle; 反复 would mean doing it again and again.",
      },
      {
        number: 47,
        options: ["现象", "规则", "道理", "项目"],
        answer: 0,
        why: "The doctor points to what they just observed, a 现象 (phenomenon), and asks what they learned from it; 道理 is the lesson itself, so 'learn something from this lesson' is circular.",
      },
      {
        number: 48,
        options: ["肚子", "抽屉", "物质", "粮食"],
        answer: 0,
        why: "The joke is that drinkers will never have worms in their stomach (肚子); the other nouns are not places worms would live in a person.",
      },
    ],
  },
  {
    id: "e-h51002-49",
    source: "HSK 5 (E) H51002 (2012) · 49–52",
    text: "人为什么会做梦，梦有什么意义，人类{{49}}了近千年也还没有找到答案。但是人们相信一些常见的梦{{50}}着特别的意义。例如，我们梦见要出门远行，要乘坐飞机、火车或者其他交通工具，但是却晚了一点儿，没有赶上。这种梦代表你错过了人生的一次机会，当人们面对重要的选择而犹豫的时候，常做这种梦。再有，{{51}}，可是却发现自己根本读不懂考试的题目。这种梦说明你正{{52}}挑战，但是你还没有做好准备。",
    blanks: [
      {
        number: 49,
        options: ["想像", "观察", "思考", "幻想"],
        answer: 2,
        why: "People have pondered (思考) the question for nearly a thousand years without finding an answer; 幻想 and 想像 are about imagining, not seeking an answer.",
      },
      {
        number: 50,
        options: ["表现", "包含", "保持", "采取"],
        answer: 1,
        why: "包含着……意义 (to contain a meaning) is the natural collocation; 保持 means to maintain, which does not fit a dream's meaning.",
      },
      {
        number: 51,
        options: ["当你加班的时候", "一次重要的考试结束后", "有时候我们会梦见参加考试", "如果你梦到和朋友去郊区旅游"],
        answer: 2,
        why: "The clause must introduce a dream about an exam, since it continues 'but find you cannot read the questions'; B is after the exam is over, so you would not be reading questions.",
      },
      {
        number: 52,
        options: ["面临", "逃避", "参考", "承担"],
        answer: 0,
        why: "面临挑战 (to face a challenge) fits 'but you are not ready yet'; 逃避 would mean avoiding it, which contradicts the 但是.",
      },
    ],
  },
  {
    id: "e-h51002-53",
    source: "HSK 5 (E) H51002 (2012) · 53–56",
    text: "有一个孩子跑到山上，对着山谷喊了一声：“喂……”声音刚落，从四面八方传来了阵阵“喂……”的回声。大山答应了，孩子很惊讶，又喊了一声：“你是谁？”大山也问：“你是谁？”孩子喊：“为什么不告诉我？”大山也喊：“为什么不告诉我？”孩子{{53}}生气了，喊道：“我恨你！”他哪里知道这一喊不得了，{{54}}世界传来的声音都是：“我恨你，我恨你……”孩子哭着跑回家，告诉了妈妈。妈妈说：“孩子，你回去对着大山喊‘我爱你’，试试看结果会怎样，好吗？”孩子又跑到山上。果然，这次孩子被包围在“我爱你，我爱你”的回声中。孩子笑了，群山笑了。\n有时候，我们总是在怪别人的态度太冷漠、自己的{{55}}太不好，却不知你是对方一面最好的镜子。如遇到这样的情况，不妨问问自己做了什么。{{56}}，你得先去爱别人。",
    blanks: [
      {
        number: 53,
        options: ["忍不住", "怪不得", "舍不得", "说不定"],
        answer: 0,
        why: "Being echoed back again and again, the child could not help getting angry (忍不住生气); 怪不得 means 'no wonder' and needs a cause stated before it.",
      },
      {
        number: 54,
        options: ["总共", "全面", "整个", "完整"],
        answer: 2,
        why: "整个世界 means 'the whole world'; 全面 means comprehensive and 完整 means intact, neither modifies 世界 this way.",
      },
      {
        number: 55,
        options: ["愿望", "运气", "气氛", "原则"],
        answer: 1,
        why: "People blame others' coldness and their own bad luck (运气太不好); 愿望 and 原则 cannot be 'bad' in this sense.",
      },
      {
        number: 56,
        options: ["想让别人爱你", "每个人都需要快乐", "尊重别人就是尊重自己", "不管别人喜欢不喜欢你"],
        answer: 0,
        why: "'If you want others to love you, you must love them first' pairs with 你得先去爱别人, echoing the 我爱你 story; C talks about respect, not love.",
      },
    ],
  },
  {
    id: "e-h51002-57",
    source: "HSK 5 (E) H51002 (2012) · 57–60",
    text: "警察站在一个新的路口，准备{{57}}第一辆通过的汽车。市政府规定，第一辆汽车的驾驶者，可获得1000元的奖金。\n一辆汽车飞快地开到这里，警察向驾驶者宣布了这个决定后，顺便问了一句：“先生，您得到了这笔钱，{{58}}？”\n驾驶者不假思索地答道：“首先，我要去领一个驾驶{{59}}。”坐在旁边的妻子一听，连忙向警察解释说：“警官先生，我丈夫今天酒喝多了，说话总是语无伦次的。”坐在后座上的、耳朵有问题的妈妈生气地补充道：“你看，我早就知道，你偷了汽车是{{60}}不了多远的……”",
    blanks: [
      {
        number: 57,
        options: ["掌握", "阻止", "迎接", "控制"],
        answer: 2,
        why: "The police are there to welcome (迎接) the first car and give it a prize; 阻止 (stop it) contradicts the reward.",
      },
      {
        number: 58,
        options: ["最想感谢谁", "一定十分激动吧", "准备用它来做什么", "是否考虑换一辆车"],
        answer: 2,
        why: "The driver answers 'first I will go and get a licence', which answers 'what will you use the money for?'.",
      },
      {
        number: 59,
        options: ["执照", "文件", "支票", "合同"],
        answer: 0,
        why: "驾驶执照 is a driving licence, and the joke is that the driver had none; 文件 and 合同 do not combine with 驾驶.",
      },
      {
        number: 60,
        options: ["抢", "逃", "瞧", "滚"],
        answer: 1,
        why: "逃不了多远 means 'won't get far running away', which fits a stolen car; 抢 (rob) is what they already did, not how far they go.",
      },
    ],
  },

  // ── H51003 (2012) ──────────────────────────────────────────────
  // The scan has no 49–52 for this paper.
  {
    id: "e-h51003-46",
    source: "HSK 5 (E) H51003 (2012) · 46–48",
    text: "有人问一位智者：“我觉得自己很有能力，可为什么没人{{46}}我呢？”智者随手捡起一块石头向远处扔去，接着叫他去捡回来，他说做不到。智者于是又扔出一块黄金，然后再叫他捡回来，结果很快他就回来了，{{47}}也找到了答案。当一个人总是抱怨为什么自己未被发现时，何不反过来想一下自己在别人眼中是否只是一块石头？{{48}}自己真是一块石头，就应该使自己变成一块黄金。",
    blanks: [
      {
        number: 46,
        options: ["强调", "欣赏", "忽视", "启发"],
        answer: 1,
        why: "He feels capable yet unappreciated, so 'why does no one appreciate (欣赏) me'; 忽视 (ignore) would make the 没人 a double negative that says the opposite.",
      },
      {
        number: 47,
        options: ["同时", "随时", "临时", "暂时"],
        answer: 0,
        why: "同时 means 'at the same time': he came back with the gold and also found his answer; 随时 means 'at any time'.",
      },
      {
        number: 48,
        options: ["何况", "要不", "毕竟", "假如"],
        answer: 3,
        why: "假如……就…… is a conditional: if you really are a stone, you should turn yourself into gold; 何况 and 毕竟 cannot pair with 就 this way.",
      },
    ],
  },
  {
    id: "e-h51003-53",
    source: "HSK 5 (E) H51003 (2012) · 53–56",
    text: "一位教育家曾这样讲过：“孩子需要鼓励，就如植物需要浇水一样。离开鼓励，孩子就不能生存。”\n周宏是一位普通的技术员，但是他非常懂得怎样鼓励别人。他女儿小时候特别不喜欢数学，{{53}}。有一天，周宏给女儿出了10道题，结果女儿竟然做错了9道。周宏并没有生气，而是对女儿大加{{54}}：“这么难的题目，你竟然也能做对？我小时候可是一道都做不出啊！”第二天晚上，周宏{{55}}准备了10道难度降低了的题目，再让女儿做，结果一下做对了5道。他又鼓励女儿说：“天哪，你真是太{{56}}了！一天之内，你可以进步这么大！”第三天，女儿自己主动要求：“爸爸，今晚我们还做数学题吧？”\n半年之后，这个小女孩成了班里的数学课代表。",
    blanks: [
      {
        number: 53,
        options: ["对数学很好奇", "所以数学成绩很差", "被一所大学录取了", "学校里的老师都很喜欢她"],
        answer: 1,
        why: "Disliking maths naturally leads to poor maths results, which sets up the story; 'curious about maths' contradicts 不喜欢数学.",
      },
      {
        number: 54,
        options: ["轻视", "确认", "称赞", "询问"],
        answer: 2,
        why: "大加称赞 means to praise lavishly, matching the flattering words that follow; 轻视 (look down on) is the opposite.",
      },
      {
        number: 55,
        options: ["特意", "逐步", "分别", "始终"],
        answer: 0,
        why: "He deliberately (特意) prepared easier questions for her; 逐步 means step by step and does not fit a single evening's action.",
      },
      {
        number: 56,
        options: ["专心", "意外", "不要紧", "了不起"],
        answer: 3,
        why: "太了不起了 (you're amazing) is praise for her progress; 意外 means unexpected and would not be praise.",
      },
    ],
  },
  {
    id: "e-h51003-57",
    source: "HSK 5 (E) H51003 (2012) · 57–60",
    text: "一个心理学家请一些实验者在周日晚上，把{{57}}7天所有可能发生的烦恼写下来，放到一个箱子里。\n7天后，他在实验者面前打开这个箱子，与他们逐一核对每一项“烦恼”，结果发现其中有90%的“烦恼”并未真正发生。接着，他又要求大家把那些剩下的字条重新丢入纸箱中。等又过了7天，他们打开箱子，{{58}}。\n烦恼是自己找来的，这就是{{59}}的“自寻烦恼”。据统计，一般人92%的忧虑从未发生过，剩下的8%则是你能够轻易{{60}}的。",
    blanks: [
      {
        number: 57,
        options: ["以来", "未来", "过去", "事先"],
        answer: 1,
        why: "Worries that 'might happen' must be about the coming (未来) seven days; 过去 would be days that have already happened.",
      },
      {
        number: 58,
        options: ["忍不住笑了起来", "很感激那位心理学家", "发现那些纸条不见了", "发现那些烦恼也不再是烦恼了"],
        answer: 3,
        why: "The conclusion that worries are self-made needs the remaining worries to have stopped being worries too; the notes disappearing (C) would prove nothing.",
      },
      {
        number: 59,
        options: ["相对", "相似", "神秘", "所谓"],
        answer: 3,
        why: "所谓 means 'what is called', introducing the set phrase 自寻烦恼 in quotation marks.",
      },
      {
        number: 60,
        options: ["利用", "达到", "应付", "批准"],
        answer: 2,
        why: "The remaining worries are ones you can easily cope with (应付); 利用 (make use of) and 达到 (reach) do not fit a worry.",
      },
    ],
  },

  // ── H51004 (2012) ──────────────────────────────────────────────
  // The scan has no 53–56 for this paper.
  {
    id: "e-h51004-46",
    source: "HSK 5 (E) H51004 (2012) · 46–48",
    text: "有一个年轻人在一家公司做得很出色，他为自己设计了一个美好的未来，对{{46}}充满信心。然而这家公司突然因为某些原因破产了，这位青年变得很悲观，认为自己是世界上最不幸、最{{47}}的人。但是他的经理，一位中年人拍了拍他的肩说：“你很幸运，小伙子。”“幸运？”青年人叫道。“对，很幸运！”经理重复了一遍，他解释道：“凡是青年时期受过挫折的人都很幸运，因为你可以学到如何{{48}}。现在重新开始，一点儿都不晚。”",
    blanks: [
      {
        number: 46,
        options: ["记忆", "前途", "命运", "价值"],
        answer: 1,
        why: "Having planned a bright future, he is confident about his prospects (前途); 命运 is fate, which one does not usually 'feel confident about' in this sense.",
      },
      {
        number: 47,
        options: ["善良", "谨慎", "糟糕", "倒霉"],
        answer: 3,
        why: "倒霉 (unlucky) pairs with 不幸 and is contradicted by the manager's 你很幸运; 糟糕 describes a situation rather than a person's luck.",
      },
      {
        number: 48,
        options: ["坚强", "宝贵", "明显", "熟练"],
        answer: 0,
        why: "Setbacks teach you how to be strong (如何坚强); 宝贵 and 明显 describe things, not a quality you learn.",
      },
    ],
  },
  {
    id: "e-h51004-49",
    source: "HSK 5 (E) H51004 (2012) · 49–52",
    text: "乘坐电梯时，如果电梯突然停住了，也没有其他人发现电梯坏了，你应该怎么办？首先不要{{49}}，确定电梯是不是真的无法正常运行。然后，立刻按红色的电梯门铃，求救铃声一响，就会有{{50}}的救援人员来救你。同时，也可以大声地呼救，电梯外的人有可能会听到，帮助你脱离困境。千万不要{{51}}激动地用力拍打电梯门，那样的话，电梯很可能会不正常地上升或下降，{{52}}。",
    blanks: [
      {
        number: 49,
        options: ["委屈", "慌张", "沉默", "犹豫"],
        answer: 1,
        why: "The first rule in an emergency is not to panic (不要慌张); 沉默 is wrong because the passage goes on to tell you to shout for help.",
      },
      {
        number: 50,
        options: ["完美", "时髦", "成熟", "专业"],
        answer: 3,
        why: "专业的救援人员 means professional rescuers; 时髦 (fashionable) and 完美 (perfect) do not describe rescue staff.",
      },
      {
        number: 51,
        options: ["情绪", "心理", "逻辑", "思想"],
        answer: 0,
        why: "情绪激动 (emotionally agitated) is the fixed collocation; 心理 and 思想 do not combine with 激动 this way.",
      },
      {
        number: 52,
        options: ["改变危险的状况", "威胁到他人安全", "造成不必要的危险", "直到引起人们的注意"],
        answer: 2,
        why: "An elevator moving abnormally would create unnecessary danger for you; there are no other people in the lift to threaten (B).",
      },
    ],
  },
  {
    id: "e-h51004-57",
    source: "HSK 5 (E) H51004 (2012) · 57–60",
    text: "春秋时期，齐国和楚国是著名的强国。有一回，齐国的国王派自己的大臣晏子访问楚国。楚王想趁这个机会，找一个办法让齐国的使者丢脸，借此来{{57}}楚国的强大。\n楚王了解到晏子身材矮小，就命令手下的人在城门旁边开了一个很低的洞。晏子来到楚国的时候，楚王命令守门的士兵关闭了城门，让晏子从旁边的洞口爬进去。晏子看到这样的{{58}}，明白了楚王的目的，他思考了一小会儿，便对{{59}}的人说：“这是一个狗洞，不是城门。我要是访问狗国，当然可以爬狗洞。请你们替我问一下楚王，我来访问的国家到底是楚国还是狗国？”楚王听了士兵的报告，{{60}}，迎接晏子进城。",
    blanks: [
      {
        number: 57,
        options: ["具备", "显示", "发表", "领导"],
        answer: 1,
        why: "The king wants to show off (显示) Chu's power by humiliating the envoy; 具备 means to possess, not to display.",
      },
      {
        number: 58,
        options: ["情景", "景色", "背景", "奇迹"],
        answer: 0,
        why: "情景 is the scene or situation in front of him (a closed gate and a low hole); 景色 is natural scenery.",
      },
      {
        number: 59,
        options: ["说服", "批准", "咨询", "接待"],
        answer: 3,
        why: "He speaks to the people receiving him (接待的人), the soldiers at the gate; 说服的人 would mean people he had persuaded.",
      },
      {
        number: 60,
        options: ["变得非常愤怒", "思考了很长时间", "只好命令打开城门", "发现晏子是个很有智慧的人"],
        answer: 2,
        why: "Cornered by the logic, the king had no choice but to open the gate, which leads straight into 迎接晏子进城; anger (A) does not lead to welcoming him.",
      },
    ],
  },

  // ── H51005 (2012) ──────────────────────────────────────────────
  {
    id: "e-h51005-46",
    source: "HSK 5 (E) H51005 (2012) · 46–48",
    text: "有个楚国人乘船渡江，一不小心，把自己的剑掉进了江里。他{{46}}在船上刻了一个记号，说：“我的剑就是从这儿掉下去的。”船靠{{47}}后，这个人顺着船上的记号下水去找剑，但找了半天也没有找到。船已经走了很远，而剑却还在原来的地方，根据那个记号怎么能找回丢失的剑呢。这个故事告诉我们，世界上的{{48}}，总是在不断地发展变化，人们想问题、办事情，都应当考虑到这种变化，适应这种变化。",
    blanks: [
      {
        number: 46,
        options: ["始终", "陆续", "未必", "急忙"],
        answer: 3,
        why: "Right after dropping the sword he hurriedly (急忙) carved a mark; 陆续 means one after another and needs several actions or people.",
      },
      {
        number: 47,
        options: ["弯", "岸", "田野", "池子"],
        answer: 1,
        why: "船靠岸 means the boat reached the shore; a boat crossing a river does not dock at a field or a pond.",
      },
      {
        number: 48,
        options: ["事物", "状况", "精力", "业务"],
        answer: 0,
        why: "世界上的事物 (things in the world) are always developing and changing; 状况 is a particular condition, not 'all things'.",
      },
    ],
  },
  {
    id: "e-h51005-49",
    source: "HSK 5 (E) H51005 (2012) · 49–52",
    text: "某少年认为自己最大的缺点是胆小，所以他去看心理医生。\n医生听了他介绍的情况后，说：“这怎么叫缺点呢，分明是个优点嘛。你只不过是非常{{49}}罢了，而这样的人总是最可靠，很少出乱子。”\n少年有些疑惑：“怎么勇敢倒成为缺点了？”\n医生摇摇头，说：“不，勇敢是一种优点，而胆小是另一种优点。胆小和勇敢，就好像白银和黄金，人们重视黄金，但并不是说要{{50}}白银。如果你是个战士，胆小{{51}}是缺点；但如果你是个司机，胆小则是优点。你与其为自己的胆小而担心，还不如利用这个特点，想办法增长自己的才能。到那时候，{{52}}，也很困难了。”",
    blanks: [
      {
        number: 49,
        options: ["周到", "谨慎", "沉默", "专心"],
        answer: 1,
        why: "The doctor reframes timidity as being cautious (谨慎), which explains why such people are reliable and rarely cause trouble.",
      },
      {
        number: 50,
        options: ["承认", "确定", "否定", "珍惜"],
        answer: 2,
        why: "Valuing gold does not mean rejecting (否定) silver; 珍惜 would say the opposite of what 并不是说 needs.",
      },
      {
        number: 51,
        options: ["显然", "居然", "竟然", "依然"],
        answer: 0,
        why: "For a soldier, timidity is obviously (显然) a weakness; 居然 and 竟然 express surprise, which this plain statement does not need.",
      },
      {
        number: 52,
        options: ["哪怕你非常勇敢", "没有人会笑话你", "即使你想做个胆小鬼", "只要你能坚持下去"],
        answer: 2,
        why: "即使……也…… pairs with 也很困难了: once you are skilled, even if you wanted to be a coward it would be hard; 'even if you were brave' makes no sense here.",
      },
    ],
  },
  {
    id: "e-h51005-53",
    source: "HSK 5 (E) H51005 (2012) · 53–56",
    text: "有个人在草原上养了一群羊。草原上同时还生活着一群狼，狼一有机会就会吃羊，那些弱小的羊总是成了狼的食物。为了羊的安全，那个人决定追杀狼。一段时间后，草原上的狼{{53}}上被杀光了，没被杀的也逃走了。\n因为不用担心羊被吃掉，那个人过得很悠闲，羊的数量也慢慢多起来。可是，没过多久，很多羊都生病了，今天死一只，明天死两只，{{54}}，那个人不断地请医生给羊治病。看着羊的数量越来越少，那个人很着急，便去{{55}}一个有经验的老人。老人告诉他：狼是羊最好的医生。\n于是，那个人又从别的地方把狼找了回来。从那以后，羊的病渐渐地好了起来，羊群又{{56}}到了以前的数量。",
    blanks: [
      {
        number: 53,
        options: ["基本", "根本", "毕竟", "反正"],
        answer: 0,
        why: "基本上 means 'basically, for the most part', which fits 'almost all killed, the rest fled'; 根本 does not take 上 in this sense.",
      },
      {
        number: 54,
        options: ["死的羊越来越少", "狼非常高兴地回来了", "没有生病的羊也越来越瘦", "剩下的羊决定搬离大草原"],
        answer: 2,
        why: "The situation is getting worse, so even the healthy sheep grew thinner; A contradicts 'one dies today, two tomorrow', and the wolves only come back later.",
      },
      {
        number: 55,
        options: ["推荐", "询问", "处理", "促使"],
        answer: 1,
        why: "He went to ask (询问) an experienced old man for advice, and the old man then tells him the answer.",
      },
      {
        number: 56,
        options: ["统一", "修改", "传染", "恢复"],
        answer: 3,
        why: "恢复到以前的数量 means the flock recovered to its former size; 传染 means to infect, the wrong direction.",
      },
    ],
  },
  {
    id: "e-h51005-57",
    source: "HSK 5 (E) H51005 (2012) · 57–60",
    text: "当你有6个苹果的时候，千万不要都吃掉。因为你全部吃掉，也只能吃到一种味道。如果你把其中5个给别人，尽管从{{57}}上看你少了5个苹果，但实际上你却得到了5个人的友情和好感。{{58}}，你会从这个人手里得到一个橘子，那个人手里得到一个梨，最后你可能得到6种不同的水果，5个人的友谊。人一定要学会用你拥有的东西去换取{{59}}重要的东西。所以说，放弃有时候是一种{{60}}。",
    blanks: [
      {
        number: 57,
        options: ["表现", "表面", "抽象", "道理"],
        answer: 1,
        why: "从表面上看 (on the surface) contrasts with the following 但实际上 (but in reality); 表现 is behaviour, not appearance.",
      },
      {
        number: 58,
        options: ["它们的味道各不相同", "以后你还能得到更多", "被真正的友谊所感动", "然后你可以选择你喜欢的"],
        answer: 1,
        why: "The sentence goes on to list the extra fruit you will receive later, so 'later you will get even more' introduces it; A would need fruit to have been mentioned already.",
      },
      {
        number: 59,
        options: ["简直", "再三", "片面", "更加"],
        answer: 3,
        why: "更加重要 (even more important) compares what you get with what you give up; 简直 and 再三 cannot modify 重要 this way.",
      },
      {
        number: 60,
        options: ["智慧", "后果", "幻想", "魅力"],
        answer: 0,
        why: "Knowing when to give something up is a kind of wisdom (智慧); 后果 (consequence) is usually negative and does not fit the moral.",
      },
    ],
  },
];
