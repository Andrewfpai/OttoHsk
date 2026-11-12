import type { ListeningPaper } from "./types";

/**
 * Original practice paper in the style of the new HSK 6 (HSK 3.0) Listening
 * section (questions 1–40). Part 1 (1–8): eight short passages, one question
 * each with no spoken prompt. Part 2 (9–28): five longer passages, four
 * spoken questions each. Part 3 (29–40): three interviews, four spoken
 * questions each. The lines are read aloud by text-to-speech, one voice per
 * speaker, so they are written as spoken Chinese.
 */
export const listeningHsk6Paper1: ListeningPaper = {
  id: "h6l1",
  title: "Listening practice 1",
  items: [
    // ── Part 1 ───────────────────────────────────────────────────────────
    {
      id: "h6l1-01",
      part: 1,
      numbers: "1",
      lines: [
        {
          speaker: "woman",
          text: "近日，某市一个社区在居民楼下设立了一间“共享工具屋”，里面存放着电钻、梯子、打气筒等一百多件物品。",
        },
        {
          speaker: "woman",
          text: "居民只要用手机扫一下二维码，就能免费借用，用完后按时归还就可以了。",
        },
        {
          speaker: "woman",
          text: "社区负责人表示，这些工具大多是居民主动捐赠的。工具屋投入使用三个月以来，借用次数已经超过了两千次。",
        },
      ],
      questions: [
        {
          number: 1,
          options: ["工具大多来自居民捐赠", "借用工具需要付费", "工具屋只在周末开放", "借用次数不足一千次"],
          answer: 0,
          why: "The organiser says 这些工具大多是居民主动捐赠的. Borrowing is 免费, opening days are never mentioned, and borrowings 超过了两千次.",
        },
      ],
    },
    {
      id: "h6l1-02",
      part: 1,
      numbers: "2",
      lines: [
        {
          speaker: "man",
          text: "研究人员发现，许多植物的种子在干燥、寒冷的环境中，可以保存几十年，甚至上百年。",
        },
        {
          speaker: "man",
          text: "正因为如此，不少国家都建立了种子库，把从各地收集来的种子存放在零下十八度左右的地下仓库里。",
        },
        {
          speaker: "man",
          text: "一旦某些植物因为灾难或者气候变化而消失，人们就可以依靠这些种子，让它们重新生长。",
        },
      ],
      questions: [
        {
          number: 2,
          options: ["种子库多建在山区", "种子只能保存几年", "种子库有助于保护植物", "种子库温度需经常调节"],
          answer: 2,
          why: "If a plant disappears, 人们就可以依靠这些种子，让它们重新生长, so seed banks help protect plants. Seeds keep 几十年，甚至上百年, and mountains or adjusting the temperature are not mentioned.",
        },
      ],
    },
    {
      id: "h6l1-03",
      part: 1,
      numbers: "3",
      lines: [
        {
          speaker: "woman",
          text: "一个年轻人向一位知名摄影师请教拍出好照片的技巧。",
        },
        {
          speaker: "woman",
          text: "摄影师没有直接回答，而是打开电脑，给他看了一个文件夹，说：“这些年我一共拍了三十多万张照片，其中一大半都被我自己删掉了，留在这里的只是一小部分。”",
        },
        {
          speaker: "woman",
          text: "年轻人这才意识到，所谓技巧，其实是靠大量的拍摄和不断的挑选积累起来的。",
        },
      ],
      questions: [
        {
          number: 3,
          options: ["摄影师的作品获过大奖", "好作品来自大量练习", "年轻人想当摄影师助理", "摄影师很少删照片"],
          answer: 1,
          why: "The young man realises that 技巧……是靠大量的拍摄和不断的挑选积累起来的. The photographer deleted 一大半 of his photos, and prizes or a job as assistant are never mentioned.",
        },
      ],
    },
    {
      id: "h6l1-04",
      part: 1,
      numbers: "4",
      lines: [
        {
          speaker: "man",
          text: "各位乘客请注意：由于线路升级改造，本周六和周日，地铁三号线将暂停运营，请大家选择公交等其他交通方式出行。",
        },
        {
          speaker: "man",
          text: "为方便市民，沿线将增开八条临时公交线路，乘客凭交通卡可以免费乘坐。",
        },
        {
          speaker: "man",
          text: "由此给大家带来的不便，敬请谅解。",
        },
      ],
      questions: [
        {
          number: 4,
          options: ["三号线将永久关闭", "临时公交需另外收费", "改造工程持续一周", "周末三号线停运"],
          answer: 3,
          why: "Line 3 is closed 本周六和周日, i.e. this weekend. The closure is temporary (暂停), the temporary buses are 免费, and nothing says the work lasts a week.",
        },
      ],
    },
    {
      id: "h6l1-05",
      part: 1,
      numbers: "5",
      lines: [
        {
          speaker: "woman",
          text: "不少人以为，周末多睡几个小时，就能把平时熬夜欠下的睡眠补回来。",
        },
        {
          speaker: "woman",
          text: "但医学研究表明，这样补回来的效果十分有限。长期睡眠不足对大脑和心脏造成的损害，并不会因为周末晚起几个小时而消除，反而可能打乱人体的生物钟。",
        },
        {
          speaker: "woman",
          text: "专家建议，保持规律的作息才是关键。",
        },
      ],
      questions: [
        {
          number: 5,
          options: ["周末补觉效果明显", "规律作息比补觉重要", "熬夜主要损害心脏", "睡懒觉有助于调节生物钟"],
          answer: 1,
          why: "Catching up at the weekend 效果十分有限, while 保持规律的作息才是关键. Lack of sleep harms 大脑和心脏 (both, not mainly the heart), and lying in (周末晚起) may 打乱 the body clock.",
        },
      ],
    },
    {
      id: "h6l1-06",
      part: 1,
      numbers: "6",
      lines: [
        {
          speaker: "man",
          text: "近年来，二手商品交易越来越受到年轻消费者的欢迎。",
        },
        {
          speaker: "man",
          text: "一份最新统计显示，去年国内二手交易平台的用户数量比前年增长了将近三成，其中三十岁以下的用户占一半以上。",
        },
        {
          speaker: "man",
          text: "分析人士认为，这一方面是因为年轻人的消费观念更加理性，另一方面也和人们环保意识的提升有关。",
        },
      ],
      questions: [
        {
          number: 6,
          options: ["年轻人是二手平台的主要用户", "二手商品质量普遍提高", "年轻人收入有所下降", "二手平台用户有所减少"],
          answer: 0,
          why: "三十岁以下的用户占一半以上, so young people make up most of the users. Users grew by 将近三成 rather than fell, and quality or falling incomes are not given as reasons.",
        },
      ],
    },
    {
      id: "h6l1-07",
      part: 1,
      numbers: "7",
      lines: [
        {
          speaker: "woman",
          text: "从下个月起，市博物馆将在每周五和周六开放夜场，开放时间延长到晚上九点。",
        },
        {
          speaker: "woman",
          text: "夜场期间，馆内除了常规展览以外，还会安排讲解员带领观众参观，并举办书法、国画等互动体验活动。",
        },
        {
          speaker: "woman",
          text: "博物馆方面表示，这样做主要是为了方便白天要上班、上学的观众。",
        },
      ],
      questions: [
        {
          number: 7,
          options: ["夜场需提前一周预约", "夜场每天都开放", "夜场门票价格较高", "夜场照顾上班族和学生"],
          answer: 3,
          why: "The night opening is 为了方便白天要上班、上学的观众. It runs only on Fridays and Saturdays, and booking and ticket prices are never mentioned.",
        },
      ],
    },
    {
      id: "h6l1-08",
      part: 1,
      numbers: "8",
      lines: [
        {
          speaker: "man",
          text: "很多老年人不习惯使用智能手机，在网上预约挂号、购买车票的时候常常遇到困难。",
        },
        {
          speaker: "man",
          text: "为此，一些城市组织志愿者走进社区，手把手地教老人使用手机上的常用功能。",
        },
        {
          speaker: "man",
          text: "一位七十多岁的大爷说，现在他不仅学会了网上购物，还能和在外地工作的子女视频聊天，生活方便了不少。",
        },
      ],
      questions: [
        {
          number: 8,
          options: ["老人更喜欢去医院排队", "志愿者教老人修理手机", "有老人学会了视频聊天", "智能手机价格普遍下降"],
          answer: 2,
          why: "The old man 还能和……子女视频聊天. The volunteers teach 手机上的常用功能, not phone repair, and prices or preferring queues are not mentioned.",
        },
      ],
    },

    // ── Part 2 ───────────────────────────────────────────────────────────
    {
      id: "h6l1-09",
      part: 2,
      numbers: "9–12",
      lines: [
        {
          speaker: "woman",
          text: "在寸土寸金的城市中心，要建一座大型公园并不容易。",
        },
        {
          speaker: "woman",
          text: "于是，越来越多的城市开始把目光投向那些被忽略的角落，把街边闲置的土地、废弃的停车场改造成小型绿地，人们形象地把它们称为“口袋公园”。",
        },
        {
          speaker: "woman",
          text: "口袋公园的面积一般不大，有的甚至只有几百平方米，但里面往往设有座椅、步行道和儿童游乐设施。",
        },
        {
          speaker: "woman",
          text: "和大公园相比，它最大的优势在于距离近：居民从家里出发，步行五到十分钟就能到达。对于行动不便的老人和需要照顾孩子的家长来说，这一点尤其重要。",
        },
        {
          speaker: "woman",
          text: "口袋公园的作用不只是提供休息的场所。研究发现，城市里这些分散的小块绿地能够在一定程度上降低周边的温度，还能在暴雨时吸收一部分雨水，减轻城市排水系统的负担。",
        },
        {
          speaker: "woman",
          text: "当然，口袋公园建成之后，日常的维护和管理同样不能忽视。",
        },
        {
          speaker: "woman",
          text: "一些城市的做法是邀请周边居民和志愿者参与管理，让居民从使用者变成守护者，这也增进了邻里之间的交流。",
        },
      ],
      questions: [
        {
          number: 9,
          prompt: "口袋公园一般建在什么地方？",
          options: ["城市郊区", "大型公园内部", "街边闲置的土地", "商场的楼顶"],
          answer: 2,
          why: "Cities turn 街边闲置的土地、废弃的停车场 into small green spaces. They are in the 城市中心, not the suburbs, and rooftops or big parks are not mentioned.",
        },
        {
          number: 10,
          prompt: "和大公园相比，口袋公园最大的优势是什么？",
          options: ["离居民近", "设施更齐全", "面积更大", "全天开放"],
          answer: 0,
          why: "它最大的优势在于距离近: residents can walk there in five to ten minutes.",
        },
        {
          number: 11,
          prompt: "关于口袋公园的作用，可以知道什么？",
          options: ["能吸引外地游客", "能增加就业机会", "能代替排水系统", "能降低周边温度"],
          answer: 3,
          why: "Small green spaces 能够在一定程度上降低周边的温度. They only 减轻 the drainage system's load; they do not replace it.",
        },
        {
          number: 12,
          prompt: "一些城市是怎样管理口袋公园的？",
          options: ["交给物业公司", "让居民参与管理", "安装监控设备", "限制开放时间"],
          answer: 1,
          why: "Some cities 邀请周边居民和志愿者参与管理, turning users into 守护者.",
        },
      ],
    },
    {
      id: "h6l1-13",
      part: 2,
      numbers: "13–16",
      lines: [
        {
          speaker: "man",
          text: "王师傅今年五十八岁，是一位钟表修理师。",
        },
        {
          speaker: "man",
          text: "他十几岁的时候就跟着父亲学习修表。那时候，几乎家家户户都有机械表或者闹钟，修表铺门前总是排着长队。",
        },
        {
          speaker: "man",
          text: "后来，电子表和手机普及了，来修表的人越来越少，许多修表师傅都换了工作，王师傅却一直坚持了下来。",
        },
        {
          speaker: "man",
          text: "在王师傅看来，修表最难的不是技术，而是耐心。一块老式机械表有上百个零件，最小的比米粒还小，拆开、清洗、重新组装，往往要花上好几天。",
        },
        {
          speaker: "man",
          text: "有一次，一位老太太拿来一块已经停了三十多年的手表，说那是她父亲留下的遗物。",
        },
        {
          speaker: "man",
          text: "王师傅花了整整两个月，终于让它重新走了起来。老太太拿到表的时候，激动得流下了眼泪。",
        },
        {
          speaker: "man",
          text: "近年来，随着收藏老物件逐渐成为潮流，王师傅的修表铺又热闹了起来，还有不少年轻人专门来跟他学手艺。",
        },
        {
          speaker: "man",
          text: "王师傅说，他愿意把这门手艺毫无保留地传下去。",
        },
      ],
      questions: [
        {
          number: 13,
          prompt: "王师傅是跟谁学修表的？",
          options: ["一位老师傅", "他的父亲", "钟表厂的师傅", "职业学校老师"],
          answer: 1,
          why: "他十几岁的时候就跟着父亲学习修表.",
        },
        {
          number: 14,
          prompt: "王师傅认为修表最难的是什么？",
          options: ["买到零件", "清洗零件", "掌握技术", "保持耐心"],
          answer: 3,
          why: "修表最难的不是技术，而是耐心. Technique is explicitly ruled out.",
        },
        {
          number: 15,
          prompt: "关于那块停了三十多年的手表，可以知道什么？",
          options: ["是老太太父亲的遗物", "王师傅修了两天", "最后没能修好", "是一块电子表"],
          answer: 0,
          why: "The old woman (老太太) says 那是她父亲留下的遗物. It took 整整两个月, and it did start again (重新走了起来).",
        },
        {
          number: 16,
          prompt: "近年来，王师傅的修表铺有什么变化？",
          options: ["搬到了新地址", "开始卖新手表", "生意又好了起来", "只为收藏家服务"],
          answer: 2,
          why: "As collecting old things became a trend, 王师傅的修表铺又热闹了起来: business picked up again, and young people even come to learn the trade.",
        },
      ],
    },
    {
      id: "h6l1-17",
      part: 2,
      numbers: "17–20",
      lines: [
        {
          speaker: "woman",
          text: "很多人都有这样的经历：明明知道有重要的任务要完成，却总是忍不住先刷一会儿手机，直到最后期限快到了，才匆匆忙忙开始动手。这种现象叫作拖延。",
        },
        {
          speaker: "woman",
          text: "不少人认为，拖延是因为懒，或者不会安排时间。但心理学研究发现，拖延的根本原因往往在于情绪。",
        },
        {
          speaker: "woman",
          text: "当一项任务让人感到焦虑、无聊，或者担心做不好的时候，大脑就会本能地寻找让自己舒服的事情，以此来逃避这些负面情绪。",
        },
        {
          speaker: "woman",
          text: "也就是说，拖延其实是一种调节情绪的方式，只不过代价很高。",
        },
        {
          speaker: "woman",
          text: "那么，该如何应对拖延呢？专家建议，可以把一项大任务分成几个具体的小步骤，先从最简单的一步做起。一旦开始行动，焦虑感通常会明显减轻。",
        },
        {
          speaker: "woman",
          text: "另外，与其因为拖延而责备自己，不如对自己宽容一些。有研究发现，那些能够原谅自己上一次拖延的人，下一次反而更少拖延。",
        },
      ],
      questions: [
        {
          number: 17,
          prompt: "根据心理学研究，拖延的根本原因是什么？",
          options: ["缺乏能力", "时间安排不当", "性格懒惰", "逃避负面情绪"],
          answer: 3,
          why: "拖延的根本原因往往在于情绪: the brain seeks comfort 来逃避这些负面情绪. Laziness and poor planning are what 不少人认为, not what research found.",
        },
        {
          number: 18,
          prompt: "专家建议怎样开始一项大任务？",
          options: ["先完成最难的部分", "从最简单的一步做起", "等心情好了再做", "请别人一起完成"],
          answer: 1,
          why: "把一项大任务分成几个具体的小步骤，先从最简单的一步做起.",
        },
        {
          number: 19,
          prompt: "根据研究，哪种人下一次会更少拖延？",
          options: ["经常责备自己的人", "时间观念强的人", "能原谅自己的人", "任务比较少的人"],
          answer: 2,
          why: "能够原谅自己上一次拖延的人，下一次反而更少拖延. Blaming yourself is what the speaker advises against.",
        },
        {
          number: 20,
          prompt: "这段话主要谈的是什么？",
          options: ["拖延的原因和对策", "如何提高工作效率", "手机对人的影响", "焦虑症的治疗方法"],
          answer: 0,
          why: "The talk first explains why people procrastinate (情绪) and then 该如何应对拖延: causes and remedies.",
        },
      ],
    },
    {
      id: "h6l1-21",
      part: 2,
      numbers: "21–24",
      lines: [
        {
          speaker: "man",
          text: "所谓“老字号”，指的是那些历史悠久，有世代相传的产品或手艺，而且在社会上口碑很好的品牌。",
        },
        {
          speaker: "man",
          text: "在很多人的印象中，老字号意味着可靠的品质，但也常常和“老旧”“过时”联系在一起。随着消费者需求的变化，一些老字号一度陷入了经营困境。",
        },
        {
          speaker: "man",
          text: "近年来，不少老字号开始主动求变。有的推出新口味、新包装，把传统点心做成小巧精致的礼盒；有的和动画、游戏等年轻人喜爱的品牌合作，推出联名产品；还有的走进直播间，由老师傅亲自讲述产品背后的故事。",
        },
        {
          speaker: "man",
          text: "这些尝试让老字号重新回到了年轻人的视线中，一些产品甚至在网上卖到断货。",
        },
        {
          speaker: "man",
          text: "不过，也有业内人士提醒，创新不能只停留在外观上。老字号之所以能够长久生存，靠的是过硬的品质和对手艺的坚持。",
        },
        {
          speaker: "man",
          text: "如果为了追求流量而降低标准，就算短期内销量上升，也难以赢得消费者长期的信任。",
        },
      ],
      questions: [
        {
          number: 21,
          prompt: "在很多人的印象中，老字号是什么样的？",
          options: ["品质可靠但较老旧", "价格昂贵", "只在本地销售", "包装精美"],
          answer: 0,
          why: "老字号意味着可靠的品质，但也常常和“老旧”“过时”联系在一起.",
        },
        {
          number: 22,
          prompt: "下列哪项属于老字号的创新尝试？",
          options: ["降低产品价格", "开设海外门店", "和动画品牌合作", "招聘年轻师傅"],
          answer: 2,
          why: "Some brands 和动画、游戏等年轻人喜爱的品牌合作，推出联名产品. Price cuts, overseas shops and young staff are not mentioned.",
        },
        {
          number: 23,
          prompt: "老师傅在直播间里做什么？",
          options: ["现场制作点心", "讲述产品故事", "回答顾客投诉", "发放优惠券"],
          answer: 1,
          why: "In the livestreams 由老师傅亲自讲述产品背后的故事.",
        },
        {
          number: 24,
          prompt: "业内人士提醒老字号要注意什么？",
          options: ["加快开店速度", "减少联名产品", "重视网络宣传", "不能降低品质标准"],
          answer: 3,
          why: "Insiders warn against 为了追求流量而降低标准, because longevity 靠的是过硬的品质.",
        },
      ],
    },
    {
      id: "h6l1-25",
      part: 2,
      numbers: "25–28",
      lines: [
        {
          speaker: "woman",
          text: "在一栋普通的大楼里，一层层架子上整整齐齐地摆满了绿油油的生菜和小白菜。",
        },
        {
          speaker: "woman",
          text: "这里没有阳光，也没有土壤，植物依靠特制的灯光和营养液生长。这就是所谓的“植物工厂”。",
        },
        {
          speaker: "woman",
          text: "和传统种植相比，植物工厂有不少优势。首先，它不受天气和季节的影响，一年四季都能稳定生产；其次，由于环境封闭，基本上不需要使用农药。",
        },
        {
          speaker: "woman",
          text: "另外，它的用水量还不到传统农田的十分之一，因为大部分水都可以回收，循环使用。",
        },
        {
          speaker: "woman",
          text: "更重要的是，植物工厂可以建在城市里，蔬菜从采摘到送上餐桌只需要几个小时，既新鲜，又减少了运输成本。",
        },
        {
          speaker: "woman",
          text: "然而，植物工厂目前还难以大规模推广。最大的障碍是能源消耗：灯光和温度控制系统需要大量电力，导致蔬菜的生产成本偏高。",
        },
        {
          speaker: "woman",
          text: "此外，适合在植物工厂里种植的品种也比较有限，像水稻、小麦这样的粮食作物，目前还很难在室内高效种植。",
        },
        {
          speaker: "woman",
          text: "研究人员正在研发更节能的灯光技术，希望将来能把成本降下来。",
        },
      ],
      questions: [
        {
          number: 25,
          prompt: "植物工厂里的植物依靠什么生长？",
          options: ["阳光和土壤", "雨水和化肥", "灯光和营养液", "地下水和农药"],
          answer: 2,
          why: "这里没有阳光，也没有土壤，植物依靠特制的灯光和营养液生长.",
        },
        {
          number: 26,
          prompt: "关于植物工厂的用水，可以知道什么？",
          options: ["主要来自雨水", "需要定期更换", "比传统农田多", "大部分能循环使用"],
          answer: 3,
          why: "大部分水都可以回收，循环使用, so it uses less than a tenth of the water a field needs (not more).",
        },
        {
          number: 27,
          prompt: "植物工厂难以大规模推广的主要原因是什么？",
          options: ["耗能大，成本高", "蔬菜口感较差", "缺少专业人员", "消费者不信任"],
          answer: 0,
          why: "最大的障碍是能源消耗: lighting and temperature control use a lot of power, 导致……生产成本偏高.",
        },
        {
          number: 28,
          prompt: "关于植物工厂，下列哪项正确？",
          options: ["已能大量种植水稻", "蔬菜运输时间短", "需要大量使用农药", "只在夏季生产"],
          answer: 1,
          why: "Vegetables go 从采摘到送上餐桌只需要几个小时. Rice is still 很难 to grow indoors, pesticides are 基本上不需要, and production runs 一年四季.",
        },
      ],
    },

    // ── Part 3 ───────────────────────────────────────────────────────────
    {
      id: "h6l1-29",
      part: 3,
      numbers: "29–32",
      lines: [
        {
          speaker: "woman",
          text: "您的新作品《飞越千里》记录了候鸟迁徙的全过程。当初为什么会选择这个题材呢？",
        },
        {
          speaker: "man",
          text: "其实最初的动机很简单。我小时候住在湖边，每年秋天都能看到成群的大雁飞过。可是这些年回老家，我发现鸟越来越少了。我想弄清楚它们去了哪里，路上遭遇了什么，于是就决定拍这部纪录片。",
        },
        {
          speaker: "woman",
          text: "听说整个拍摄过程用了将近四年，最大的困难是什么？",
        },
        {
          speaker: "man",
          text: "最难的是等待。鸟不会按照剧本来表演，有时候我们在野外一蹲就是十几天，一个镜头也拍不到。另外，为了不打扰鸟群，我们不能靠得太近，只能用远距离镜头和无人机拍摄，对技术的要求非常高。",
        },
        {
          speaker: "woman",
          text: "纪录片里有很多鸟群飞行的画面特别震撼，观众都很想知道是怎么拍到的。",
        },
        {
          speaker: "man",
          text: "我们和一些飞行爱好者合作，用一种很轻的滑翔伞，远远地跟着鸟群一起飞。当然，飞行员事先要经过大量的训练，确保不会惊吓到它们。",
        },
        {
          speaker: "woman",
          text: "这部纪录片上映以后，有没有带来一些您没想到的变化？",
        },
        {
          speaker: "man",
          text: "最让我高兴的是，不少观众看完以后主动报名当了护鸟志愿者。还有一些地方根据纪录片里拍到的情况，加强了对湿地的保护。我一直认为，纪录片不只是记录现实，它还应该推动人们去改变一些东西。",
        },
      ],
      questions: [
        {
          number: 29,
          prompt: "男的为什么决定拍这部纪录片？",
          options: ["受到朋友邀请", "发现候鸟变少了", "想回湖边生活", "为了参加电影节"],
          answer: 1,
          why: "Back home he 发现鸟越来越少了 and wanted to find out where they had gone, 于是就决定拍这部纪录片.",
        },
        {
          number: 30,
          prompt: "男的认为拍摄中最大的困难是什么？",
          options: ["长时间等待", "资金不足", "天气恶劣", "缺少设备"],
          answer: 0,
          why: "最难的是等待: they sometimes spent 十几天 in the wild without getting a single shot.",
        },
        {
          number: 31,
          prompt: "纪录片里鸟群飞行的画面是怎么拍到的？",
          options: ["在鸟群附近搭观察站", "用直升机远距离拍", "用电脑技术合成", "用滑翔伞跟着鸟群飞"],
          answer: 3,
          why: "They worked with flying enthusiasts and 用一种很轻的滑翔伞跟着鸟群一起飞. Drones are mentioned for other shots, but no helicopter.",
        },
        {
          number: 32,
          prompt: "下列哪项属于男的的观点？",
          options: ["纪录片应完全客观", "野外拍摄比较容易", "纪录片应推动改变", "观众更爱看故事片"],
          answer: 2,
          why: "He says a documentary 不只是记录现实，它还应该推动人们去改变一些东西.",
        },
      ],
    },
    {
      id: "h6l1-33",
      part: 3,
      numbers: "33–36",
      lines: [
        {
          speaker: "woman",
          text: "这几年跑马拉松的人越来越多。作为一名跑步教练，您觉得原因是什么？",
        },
        {
          speaker: "man",
          text: "我想主要有两个方面。一方面，大家的健康意识提高了，而且跑步的门槛低，一双跑鞋就能开始；另一方面，马拉松已经变成了一种社交活动，很多人跑完会在朋友圈分享成绩，互相鼓励。",
        },
        {
          speaker: "woman",
          text: "不过，我们也常常听说有人在比赛中受伤，甚至发生意外。",
        },
        {
          speaker: "man",
          text: "对，这正是我最担心的。很多新手报名的时候热情很高，但是缺乏系统的训练，比赛前几周突然加大运动量，结果反而容易受伤。我一般建议，第一次参加全程马拉松之前，最好先坚持半年以上的规律训练。",
        },
        {
          speaker: "woman",
          text: "对于普通的跑步爱好者，您有什么具体的建议？",
        },
        {
          speaker: "man",
          text: "第一是循序渐进，每周增加的跑量最好不要超过百分之十。第二是重视休息，肌肉是在休息的时候恢复和变强的。第三，要学会倾听身体的声音，如果出现持续的疼痛，就应该停下来，千万别硬撑。",
        },
        {
          speaker: "woman",
          text: "有人说，跑马拉松就一定要追求速度。您怎么看？",
        },
        {
          speaker: "man",
          text: "我不太赞同。对绝大多数业余跑者来说，跑步的意义在于享受过程、保持健康。与其和别人比成绩，不如和过去的自己比。只要比以前跑得更轻松、更快乐，就是进步。",
        },
      ],
      questions: [
        {
          number: 33,
          prompt: "男的认为马拉松流行的原因之一是什么？",
          options: ["比赛奖金高", "政府大力推广", "跑鞋价格下降", "具有社交功能"],
          answer: 3,
          why: "马拉松已经变成了一种社交活动: people share their results with friends and encourage each other.",
        },
        {
          number: 34,
          prompt: "男的最担心什么？",
          options: ["报名人数太少", "比赛组织混乱", "新手缺乏训练而受伤", "跑者过度追求装备"],
          answer: 2,
          why: "Asked about injuries, he says 这正是我最担心的: beginners 缺乏系统的训练 and get hurt.",
        },
        {
          number: 35,
          prompt: "关于训练，男的有什么建议？",
          options: ["每天都要跑步", "每周跑量不宜增加太多", "赛前加大运动量", "疼痛时坚持跑完"],
          answer: 1,
          why: "每周增加的跑量最好不要超过百分之十. Raising the load before a race is what causes injuries, and with pain one should 停下来.",
        },
        {
          number: 36,
          prompt: "男的怎么看待追求速度？",
          options: ["不必和别人比成绩", "速度是最重要的", "应该请专业教练", "年轻人更该追求速度"],
          answer: 0,
          why: "He disagrees (我不太赞同) and says 与其和别人比成绩，不如和过去的自己比.",
        },
      ],
    },
    {
      id: "h6l1-37",
      part: 3,
      numbers: "37–40",
      lines: [
        {
          speaker: "man",
          text: "王老师，您负责的老旧小区改造项目最近受到了很多关注。能先给我们介绍一下这个项目吗？",
        },
        {
          speaker: "woman",
          text: "好的。我们改造的是一个上世纪八十年代建成的小区，住着六百多户人家，居民里六十岁以上的老人将近一半。原来的问题很多，比如没有电梯，停车难，路灯也经常坏。",
        },
        {
          speaker: "man",
          text: "改造方案是怎么确定的呢？",
        },
        {
          speaker: "woman",
          text: "我们没有先拿出设计图，而是花了两个多月，挨家挨户上门走访，还发了问卷，了解居民最希望先解决什么问题。结果发现，大家最关心的不是外观好不好看，而是上下楼方便不方便。所以，我们把加装电梯放在了首位。",
        },
        {
          speaker: "man",
          text: "听说加装电梯的时候，费用怎么分担很容易引起争议。",
        },
        {
          speaker: "woman",
          text: "确实是这样。住在低楼层的居民用得少，不太愿意出钱。我们组织了好几次居民会议，最后大家商量出一个办法：楼层越高，分担的费用越多，一楼的住户不用出钱。这样一来，大家都觉得比较公平。",
        },
        {
          speaker: "man",
          text: "现在回头看，您最大的体会是什么？",
        },
        {
          speaker: "woman",
          text: "我觉得，老旧小区改造在技术上并不难，难的是让每个人都参与进来。居民不是被改造的对象，而是改造的主人。只有充分听取他们的意见，改造的成果才能真正得到大家的认可。",
        },
      ],
      questions: [
        {
          number: 37,
          prompt: "那个小区原来有什么问题？",
          options: ["没有电梯", "绿化面积小", "房屋漏水", "噪音太大"],
          answer: 0,
          why: "Among the old problems she lists 没有电梯，停车难，路灯也经常坏.",
        },
        {
          number: 38,
          prompt: "改造方案是怎么确定的？",
          options: ["参考其他城市的经验", "由政府直接决定", "举办设计比赛", "先调查居民的需求"],
          answer: 3,
          why: "Before any drawings they spent two months 挨家挨户上门走访，还发了问卷，了解居民最希望先解决什么问题.",
        },
        {
          number: 39,
          prompt: "加装电梯的费用最后是怎么分担的？",
          options: ["全部由政府承担", "每户平均分担", "楼层越高出钱越多", "由物业公司支付"],
          answer: 2,
          why: "楼层越高，分担的费用越多，一楼的住户不用出钱, so it was not split equally.",
        },
        {
          number: 40,
          prompt: "下列哪项属于女的的观点？",
          options: ["改造的关键在于技术", "应让居民参与改造", "外观比功能更重要", "老旧小区应该拆除"],
          answer: 1,
          why: "She says the hard part is 让每个人都参与进来, since residents are 改造的主人. She says the technology 并不难.",
        },
      ],
    },
  ],
};
