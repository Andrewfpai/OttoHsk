import type { ClozePassage } from "./types";

/**
 * Original practice passages in the style of HSK 6 Reading Part 2
 * (选词填空, questions 61–70). Blanks are numbered from 61 in each passage,
 * as on the exam, and the right answers are mostly HSK 6 words.
 */
export const clozeHsk6: ClozePassage[] = [
  {
    id: "h6-cloze-01",
    source: "HSK 6 practice · 1",
    text: "很多人都有{{61}}的毛病：明明知道任务的期限，却总要等到最后一刻才{{62}}准备。心理学家认为，其根源往往不在于懒惰，而在于对失败的{{63}}——人们担心自己做得不够完美，于是干脆把事情往后推。要{{64}}这种习惯，不妨把大任务分解成几个小目标，每完成一个就给自己一点儿奖励。这样一来，压力减轻了，做事也就顺利多了。",
    blanks: [
      {
        number: 61,
        options: ["延期", "延续", "拖延", "延伸"],
        answer: 2,
        why: "The passage is about leaving things until the last moment, which is 拖延 (procrastination); 延期 is postponing a fixed date, and 延续/延伸 mean continuing or extending.",
      },
      {
        number: 62,
        options: ["着手", "着重", "着想", "着迷"],
        answer: 0,
        why: "着手 means to set about doing something, so 才着手准备 is “only then start preparing”; 着重 means to stress, 着想 to consider someone's interests, 着迷 to be fascinated.",
      },
      {
        number: 63,
        options: ["恐怖", "惊讶", "慌张", "恐惧"],
        answer: 3,
        why: "对失败的恐惧 is “fear of failure”, a noun after 的; 恐怖 describes something terrifying, and 惊讶 and 慌张 are reactions, not a lasting fear.",
      },
      {
        number: 64,
        options: ["解脱", "摆脱", "摆放", "逃避"],
        answer: 1,
        why: "摆脱 takes a bad habit or situation as its object (摆脱这种习惯); 解脱 is usually intransitive, 摆放 means to place objects, and 逃避 is avoiding a duty, not breaking a habit.",
      },
    ],
  },
  {
    id: "h6-cloze-02",
    source: "HSK 6 practice · 2",
    text: "每年秋天，成千上万的候鸟会{{61}}到几千公里外的南方过冬。它们为什么不会迷路呢？科学家发现，候鸟体内似乎有一种天然的“指南针”，能够{{62}}地球磁场的细微变化。此外，太阳和星星的位置也为它们提供了重要的{{63}}。不过，城市夜间的灯光有时会{{64}}它们的判断，使一些鸟偏离原来的路线。",
    blanks: [
      {
        number: 61,
        options: ["迁就", "变迁", "搬迁", "迁徙"],
        answer: 3,
        why: "迁徙 is the word for animals migrating; 迁就 means to give in to someone, 变迁 is change over time, and 搬迁 is people or offices relocating.",
      },
      {
        number: 62,
        options: ["鉴别", "鉴定", "识别", "区分"],
        answer: 2,
        why: "识别 means to detect or recognise a signal such as a change in the magnetic field; 鉴别 and 鉴定 judge authenticity or quality, and 区分 needs two things to tell apart.",
      },
      {
        number: 63,
        options: ["关照", "参照", "按照", "依照"],
        answer: 1,
        why: "提供参照 means to give a point of reference, which is what the sun and stars are for navigation; 关照 is looking after someone, and 按照/依照 are prepositions (“according to”).",
      },
      {
        number: 64,
        options: ["打扰", "骚扰", "干扰", "干涉"],
        answer: 2,
        why: "干扰判断 means to interfere with judgement or a signal; 打扰 and 骚扰 are disturbing or harassing a person, and 干涉 is meddling in someone's affairs.",
      },
    ],
  },
  {
    id: "h6-cloze-03",
    source: "HSK 6 practice · 3",
    text: "在福建、广东一带，喝功夫茶是一种{{61}}已久的习俗。所谓“功夫”，指的并不是武术，而是泡茶所需的耐心和技巧。从烫杯、洗茶到倒茶，每一步都很有讲究。主人泡茶时动作{{62}}，客人品茶时也不慌不忙。对当地人来说，一壶茶不仅能解渴，更是{{63}}感情、交流信息的好机会。",
    blanks: [
      {
        number: 61,
        options: ["盛开", "兴旺", "旺盛", "盛行"],
        answer: 3,
        why: "盛行 means a custom is widespread, so 盛行已久 fits 习俗; 盛开 is for flowers, 兴旺 for a business or family, and 旺盛 for energy or growth.",
      },
      {
        number: 62,
        options: ["从容", "宽容", "包容", "容纳"],
        answer: 0,
        why: "动作从容 means unhurried, calm movements, matching 不慌不忙; 宽容 and 包容 mean tolerant towards people, and 容纳 means to hold or accommodate.",
      },
      {
        number: 63,
        options: ["联想", "联络", "连接", "联合"],
        answer: 1,
        why: "联络感情 is the set phrase for keeping a relationship warm; 联想 is to associate ideas, 连接 joins physical things, and 联合 means to unite forces.",
      },
    ],
  },
  {
    id: "h6-cloze-04",
    source: "HSK 6 practice · 4",
    text: "近年来，越来越多的城市开始{{61}}垃圾分类，要求居民把厨余垃圾、有害垃圾和其他垃圾分别投放。刚开始，不少人觉得麻烦，甚至有些{{62}}。但随着宣传的深入，大家逐渐认识到，分类不仅能减少污染，还能让许多废弃物被{{63}}再利用。在这种{{64}}的影响下，垃圾分类已经成了很多家庭的日常习惯。",
    blanks: [
      {
        number: 61,
        options: ["设施", "措施", "实施", "实质"],
        answer: 2,
        why: "The blank needs a verb taking 垃圾分类 as its object, and 实施 means to put a policy into effect; 设施, 措施 and 实质 are all nouns.",
      },
      {
        number: 62,
        options: ["排除", "排斥", "排放", "排练"],
        answer: 1,
        why: "有些排斥 means people felt some resistance to the new rule; 排除 is to rule something out, 排放 is to discharge waste gas or water, and 排练 is to rehearse.",
      },
      {
        number: 63,
        options: ["回避", "回顾", "回报", "回收"],
        answer: 3,
        why: "回收再利用 means collected and recycled; 回避 is to avoid, 回顾 to look back on, and 回报 to repay.",
      },
      {
        number: 64,
        options: ["潜移默化", "日新月异", "层出不穷", "与日俱增"],
        answer: 0,
        why: "潜移默化的影响 is a fixed phrase for a gradual, unnoticed influence that changes habits; the other idioms describe rapid change, endless new things or daily growth, and none goes with 影响 here.",
      },
    ],
  },
  {
    id: "h6-cloze-05",
    source: "HSK 6 practice · 5",
    text: "与人交往时，很多人急于表达自己的观点，却{{61}}了倾听的重要性。其实，认真倾听不仅是对他人的尊重，也能帮助我们更{{62}}地了解对方的想法。在倾听时，不要轻易打断别人，不要{{63}}，更不要{{64}}下结论。适当地点头、微笑，或者简单地重复对方的话，都能让对方感受到你的真诚。",
    blanks: [
      {
        number: 61,
        options: ["省略", "简化", "删除", "忽略"],
        answer: 3,
        why: "忽略……的重要性 means to overlook the importance of something; 省略, 简化 and 删除 are about leaving out or cutting words and steps, not ignoring a fact.",
      },
      {
        number: 62,
        options: ["确信", "确切", "确立", "确保"],
        answer: 1,
        why: "The blank is an adverbial before 地了解, so it needs the adjective 确切 (accurate, exact); 确信, 确立 and 确保 are verbs.",
      },
      {
        number: 63,
        options: ["聚精会神", "津津有味", "东张西望", "兴高采烈"],
        answer: 2,
        why: "东张西望 (glancing all around) is something a good listener should not do; telling someone not to be 聚精会神 or 兴高采烈 makes no sense, and 津津有味 is about relish.",
      },
      {
        number: 64,
        options: ["草率", "坦率", "爽快", "直率"],
        answer: 0,
        why: "草率下结论 means to jump to a conclusion carelessly; 坦率, 爽快 and 直率 are positive words for frankness, not something to warn against.",
      },
    ],
  },
  {
    id: "h6-cloze-06",
    source: "HSK 6 practice · 6",
    text: "科学研究发现，睡眠对记忆有着重要的影响。人在睡觉时，大脑并没有完全休息，而是在对白天获得的信息进行整理和{{61}}，从而{{62}}学到的知识。因此，考试前熬夜复习往往{{63}}，不仅记不住知识，还会影响第二天的状态。专家建议，学生应{{64}}充足的睡眠，这才是提高学习效果的关键。",
    blanks: [
      {
        number: 61,
        options: ["选拔", "筛选", "选举", "挑剔"],
        answer: 1,
        why: "筛选信息 means sifting information to keep what is useful; 选拔 is selecting people for a post, 选举 is voting, and 挑剔 is being fussy.",
      },
      {
        number: 62,
        options: ["坚固", "牢固", "巩固", "稳固"],
        answer: 2,
        why: "巩固知识 means to consolidate knowledge, and it is the only verb here that takes an object; 坚固, 牢固 and 稳固 are adjectives.",
      },
      {
        number: 63,
        options: ["一举两得", "恰到好处", "理所当然", "得不偿失"],
        answer: 3,
        why: "Staying up costs more than it gains, since you forget anyway and feel worse, so it is 得不偿失; the other idioms are all positive or neutral.",
      },
      {
        number: 64,
        options: ["确保", "确认", "确定", "确立"],
        answer: 0,
        why: "确保充足的睡眠 means to make sure you get enough sleep; 确认 is to confirm a fact, 确定 to decide, and 确立 to establish a system or goal.",
      },
    ],
  },
  {
    id: "h6-cloze-07",
    source: "HSK 6 practice · 7",
    text: "春节期间，家家户户都要在门上贴春联。春联{{61}}于古代的“桃符”：人们在桃木板上写下神的名字，挂在门旁，用来驱赶邪气。后来，桃木板逐渐被红纸代替，春联的内容也{{62}}成了表达祝福的吉祥话。春联上下两句字数相同、结构{{63}}，读起来很有节奏。如今，一副副红红的春联，{{64}}着人们对新一年的美好期待。",
    blanks: [
      {
        number: 61,
        options: ["根源", "起源", "源泉", "起初"],
        answer: 1,
        why: "起源于 means “to originate from”; 根源 and 源泉 are nouns that cannot take 于 like this, and 起初 means “at first”.",
      },
      {
        number: 62,
        options: ["演绎", "演奏", "演变", "演习"],
        answer: 2,
        why: "演变成 describes something gradually evolving into a new form over history; 演绎 is to interpret or deduce, 演奏 to play music, and 演习 to hold a drill.",
      },
      {
        number: 63,
        options: ["对称", "对照", "对立", "对策"],
        answer: 0,
        why: "结构对称 means the two lines mirror each other in structure; 对照 is to compare, 对立 means opposed or hostile, and 对策 is a countermeasure.",
      },
      {
        number: 64,
        options: ["委托", "托运", "依托", "寄托"],
        answer: 3,
        why: "寄托着期待 means the couplets carry people's hopes; 委托 is entrusting a task to someone, 托运 is checking in luggage, and 依托 is relying on a base.",
      },
    ],
  },
  {
    id: "h6-cloze-08",
    source: "HSK 6 practice · 8",
    text: "搬家的时候，人们常常会惊讶地发现，自己{{61}}了那么多用不上的东西：几年没穿的衣服、早已过时的电器、舍不得扔的旧杂志……这些物品不仅占据空间，还会让人感到{{62}}。于是，“断舍离”渐渐成了一种生活{{63}}。它提倡人们只保留真正需要的东西，让生活变得简单而{{64}}。",
    blanks: [
      {
        number: 61,
        options: ["堆积", "沉淀", "储蓄", "积极"],
        answer: 0,
        why: "堆积 means things have piled up, which fits clutter found when moving; 沉淀 is sediment settling, 储蓄 is saving money, and 积极 is an adjective (positive).",
      },
      {
        number: 62,
        options: ["压迫", "压抑", "压缩", "压制"],
        answer: 1,
        why: "感到压抑 means to feel oppressed or stifled inside; 压迫 and 压制 are what one side does to another, and 压缩 is to compress.",
      },
      {
        number: 63,
        options: ["潮流", "潮湿", "流通", "流露"],
        answer: 0,
        why: "生活潮流 is a lifestyle trend; 潮湿 means damp, 流通 is circulation of money or air, and 流露 is revealing a feeling.",
      },
      {
        number: 64,
        options: ["充足", "充沛", "充当", "充实"],
        answer: 3,
        why: "简单而充实 means simple yet fulfilling, describing a life; 充足 is for supplies, 充沛 for energy, and 充当 means to act as.",
      },
    ],
  },
  {
    id: "h6-cloze-09",
    source: "HSK 6 practice · 9",
    text: "蜜蜂找到花蜜后，会飞回蜂巢，用一种特殊的“舞蹈”把食物的位置{{61}}给同伴：花离得近，它就跳“圆圈舞”；花离得远，它就跳“8字舞”。舞蹈的方向{{62}}着花所在的方向，身体摆动的快慢则表示距离的远近。正是{{63}}这种独特的方式，整个蜂群才能高效地{{64}}花蜜。",
    blanks: [
      {
        number: 61,
        options: ["传授", "传达", "传记", "遗传"],
        answer: 1,
        why: "传达给 means to pass a message on to someone, here where the food is; 传授 is teaching a skill, 传记 is a biography, and 遗传 is genetic inheritance.",
      },
      {
        number: 62,
        options: ["应对", "对待", "相应", "对应"],
        answer: 3,
        why: "对应着 means one thing corresponds to another (dance direction ↔ flower direction); 应对 is coping with a problem, 对待 is treating someone, and 相应 is an adjective.",
      },
      {
        number: 63,
        options: ["借助", "借鉴", "协助", "辅助"],
        answer: 0,
        why: "借助这种方式 means “by means of this method”; 借鉴 is learning from others' experience, and 协助 and 辅助 mean to assist a person.",
      },
      {
        number: 64,
        options: ["采纳", "采购", "采集", "采访"],
        answer: 2,
        why: "采集花蜜 is to gather nectar from nature; 采纳 is to adopt a suggestion, 采购 to purchase, and 采访 to interview.",
      },
    ],
  },
  {
    id: "h6-cloze-10",
    source: "HSK 6 practice · 10",
    text: "刚开始跑步的人，往往头几天热情很高，可没过多久就{{61}}了。其实，运动的效果不在于某一次跑得多远，而在于有没有长期坚持下去的{{62}}。专家建议，初学者不要一开始就给自己定太高的目标，而应{{63}}地增加运动量。此外，找几个朋友一起锻炼，相互鼓励、相互{{64}}，也能让人更容易做到这一点。",
    blanks: [
      {
        number: 61,
        options: ["精益求精", "自力更生", "一举两得", "半途而废"],
        answer: 3,
        why: "High enthusiasm that soon fades means giving up halfway, 半途而废; the other idioms describe perfectionism, self-reliance and a double gain.",
      },
      {
        number: 62,
        options: ["威力", "毅力", "魄力", "实力"],
        answer: 1,
        why: "毅力 is the willpower to keep going over time; 威力 is destructive power, 魄力 is boldness in decisions, and 实力 is actual strength or ability.",
      },
      {
        number: 63,
        options: ["争先恐后", "迫不及待", "循序渐进", "急于求成"],
        answer: 2,
        why: "The advice is to increase gradually, step by step, which is 循序渐进; 迫不及待 and 急于求成 are exactly the impatience being warned against.",
      },
      {
        number: 64,
        options: ["监督", "监视", "监测", "监控"],
        answer: 0,
        why: "相互监督 means friends keep each other on track; 监视 is spying on someone, and 监测 and 监控 are monitoring data or equipment.",
      },
    ],
  },
  {
    id: "h6-cloze-11",
    source: "HSK 6 practice · 11",
    text: "随着智能手机的{{61}}，网上购物、扫码支付已经成为年轻人的生活常态。然而，对于不少老年人来说，这些新技术却成了生活中的一大{{62}}。为了帮助他们，一些社区开设了手机培训班，由志愿者耐心、{{63}}地教老人们如何挂号、打车、视频聊天。许多老人表示，学会用手机后，生活方便了，和子女之间的{{64}}也少了。",
    blanks: [
      {
        number: 61,
        options: ["普遍", "普通", "普及", "遍布"],
        answer: 2,
        why: "随着……的普及 needs a noun meaning “spread into general use”; 普遍 and 普通 are adjectives, and 遍布 is a verb (to be found everywhere).",
      },
      {
        number: 62,
        options: ["隔阂", "界限", "故障", "障碍"],
        answer: 3,
        why: "一大障碍 means a big obstacle for the elderly; 隔阂 is emotional distance between people, 界限 is a boundary, and 故障 is a machine fault.",
      },
      {
        number: 63,
        options: ["细致", "精致", "别致", "细胞"],
        answer: 0,
        why: "耐心、细致地教 means teaching patiently and thoroughly; 精致 and 别致 describe how an object looks, and 细胞 is a cell.",
      },
      {
        number: 64,
        options: ["隔离", "间隔", "隔阂", "距离"],
        answer: 2,
        why: "子女之间的隔阂 is the gap in understanding between generations, which shrinks as they share a way to talk; 隔离 is quarantine, 间隔 is a time or space interval, and 距离 would go with 近了, not 少了.",
      },
    ],
  },
  {
    id: "h6-cloze-12",
    source: "HSK 6 practice · 12",
    text: "京剧有两百多年的历史，在中国几乎{{61}}。京剧演员常常画着各种颜色的脸谱，不同的颜色代表不同的性格：红色代表忠诚勇敢，黑色代表正直无私，白色则多用于{{62}}的反面人物。观众看一眼脸谱，人物是好是坏便{{63}}。小小的脸谱，{{64}}着一代代艺人的智慧。",
    blanks: [
      {
        number: 61,
        options: ["络绎不绝", "家喻户晓", "层出不穷", "川流不息"],
        answer: 1,
        why: "家喻户晓 means known to every household, which suits a famous art form; 络绎不绝 and 川流不息 describe streams of people or traffic, and 层出不穷 describes new things appearing endlessly.",
      },
      {
        number: 62,
        options: ["虚心", "谦逊", "虚拟", "虚伪"],
        answer: 3,
        why: "A villain (反面人物) is hypocritical, 虚伪; 虚心 and 谦逊 are virtues, and 虚拟 means virtual.",
      },
      {
        number: 63,
        options: ["一举两得", "一如既往", "一目了然", "一丝不苟"],
        answer: 2,
        why: "One glance at the mask makes it clear, 一目了然; the other idioms mean a double gain, as always, and meticulous.",
      },
      {
        number: 64,
        options: ["凝聚", "凝固", "凝视", "聚精会神"],
        answer: 0,
        why: "凝聚着智慧 means the masks embody the condensed wisdom of generations; 凝固 is to solidify, 凝视 is to gaze, and 聚精会神 cannot take an object.",
      },
    ],
  },
  {
    id: "h6-cloze-13",
    source: "HSK 6 practice · 13",
    text: "人生不可能{{61}}，每个人都会遇到挫折。面对失败，有的人从此一蹶不振，有的人却能从中{{62}}到宝贵的道理，变得更加成熟。心理学家发现，两者的区别往往不在于能力的高低，而在于看待失败的{{63}}。把失败看作学习机会的人，往往更加{{64}}，也更有可能最终取得成功。",
    blanks: [
      {
        number: 61,
        options: ["一帆风顺", "一丝不苟", "一举两得", "一目了然"],
        answer: 0,
        why: "人生不可能一帆风顺 means life cannot always be smooth sailing, which leads into 挫折; the other idioms mean meticulous, a double gain and clear at a glance.",
      },
      {
        number: 62,
        options: ["领袖", "领先", "率领", "领悟"],
        answer: 3,
        why: "领悟到道理 means to come to understand a lesson; 领袖 is a leader, 领先 is to be in the lead, and 率领 is to command troops or a team.",
      },
      {
        number: 63,
        options: ["眼神", "眼光", "目光", "视线"],
        answer: 1,
        why: "看待……的眼光 means one's way of looking at something; 眼神 and 目光 are the literal look in someone's eyes, and 视线 is a line of sight.",
      },
      {
        number: 64,
        options: ["顽固", "固执", "顽强", "任性"],
        answer: 2,
        why: "顽强 means tenacious, a positive trait that helps people succeed; 顽固, 固执 and 任性 are all negative kinds of stubbornness.",
      },
    ],
  },
  {
    id: "h6-cloze-14",
    source: "HSK 6 practice · 14",
    text: "竹子是世界上生长最快的植物之一，有的品种一天能长高一米左右。然而在最初的几年里，竹子在地面上的生长却十分{{61}}，因为它把养分都用来让根系向地下不断{{62}}。等根系足够发达后，它才开始迅速向上生长。这给我们带来{{63}}：成功并非一夜之间的事，前期默默的积累为后来的突破{{64}}了基础。",
    blanks: [
      {
        number: 61,
        options: ["迟钝", "迟疑", "迟缓", "缓和"],
        answer: 2,
        why: "迟缓 means slow, as in slow growth; 迟钝 is a slow mind or reaction, 迟疑 is hesitating, and 缓和 means easing tension.",
      },
      {
        number: 62,
        options: ["延伸", "延续", "延期", "拖延"],
        answer: 0,
        why: "延伸 is extending in space, as roots spreading downward; 延续 is continuing in time, and 延期 and 拖延 mean putting off.",
      },
      {
        number: 63,
        options: ["启程", "启蒙", "启事", "启示"],
        answer: 3,
        why: "带来启示 means to offer a lesson or insight, which the colon then states; 启程 is setting off on a journey, 启蒙 is enlightenment or first schooling, and 启事 is a posted notice.",
      },
      {
        number: 64,
        options: ["确立", "奠定", "树立", "设立"],
        answer: 1,
        why: "奠定基础 is the fixed collocation for laying a foundation; 确立 goes with systems, 树立 with an image or example, and 设立 with organisations.",
      },
    ],
  },
  {
    id: "h6-cloze-15",
    source: "HSK 6 practice · 15",
    text: "如今，只要动动手指，热腾腾的饭菜半小时内就能送到家门口。外卖给人们的生活带来了极大的{{61}}，尤其是对于{{62}}的上班族来说。然而，外卖也带来了一些问题：大量一次性餐盒造成了资源浪费，有些小餐馆还存在卫生{{63}}。因此，营养专家{{64}}大家，在条件允许的情况下，还是应该尽量自己做饭。",
    blanks: [
      {
        number: 61,
        options: ["利益", "便利", "利润", "权利"],
        answer: 1,
        why: "带来便利 means to bring convenience, which is what fast delivery does; 利益, 利润 and 权利 are interests, profit and rights.",
      },
      {
        number: 62,
        options: ["繁华", "忙碌", "急忙", "慌忙"],
        answer: 1,
        why: "忙碌的上班族 means busy office workers; 繁华 describes a bustling city, and 急忙 and 慌忙 describe a hurried action, not a person.",
      },
      {
        number: 63,
        options: ["隐私", "隐蔽", "隐患", "隐瞒"],
        answer: 2,
        why: "卫生隐患 is a hidden hygiene risk; 隐私 is privacy, 隐蔽 means concealed, and 隐瞒 is to cover up a fact.",
      },
      {
        number: 64,
        options: ["告诫", "告辞", "告别", "告状"],
        answer: 0,
        why: "告诫大家 means to warn or advise people earnestly; 告辞 and 告别 mean taking leave, and 告状 is complaining about someone.",
      },
    ],
  },
  {
    id: "h6-cloze-16",
    source: "HSK 6 practice · 16",
    text: "雨后天晴时，天空中有时会出现一道美丽的彩虹。这是因为阳光照射到空气中的小水滴上，发生了折射和{{61}}。阳光看似是白色的，实际上由多种颜色的光{{62}}而成。由于不同颜色的光折射的角度不同，它们就被{{63}}开来，在天空中{{64}}出红、橙、黄、绿、蓝、靛、紫七种颜色。想看到彩虹，观察者必须背对着太阳。",
    blanks: [
      {
        number: 61,
        options: ["放射", "发射", "反射", "辐射"],
        answer: 2,
        why: "Light bouncing back inside a water drop is 反射 (reflection), paired with 折射; 放射 and 辐射 are radiation, and 发射 is launching or emitting.",
      },
      {
        number: 62,
        options: ["混合", "混乱", "混淆", "掺杂"],
        answer: 0,
        why: "由……混合而成 means “made up of a mixture of”; 混乱 means chaotic, 混淆 is confusing two things, and 掺杂 does not go with 而成.",
      },
      {
        number: 63,
        options: ["分配", "分散", "分裂", "分红"],
        answer: 1,
        why: "分散开来 means the colours are spread apart; 分配 is to allocate, 分裂 is to split a group or cell, and 分红 is to pay dividends.",
      },
      {
        number: 64,
        options: ["表现", "体现", "发现", "呈现"],
        answer: 3,
        why: "呈现出 means to appear or display visibly, as colours in the sky; 表现 and 体现 are about showing a quality, and 发现 is to discover.",
      },
    ],
  },
  {
    id: "h6-cloze-17",
    source: "HSK 6 practice · 17",
    text: "筷子是中国人日常生活中最常用的餐具，已经有三千多年的历史。用筷子吃饭看似简单，其实需要手指、手腕和手臂相互{{61}}，共同配合。有研究认为，经常使用筷子可以锻炼手指的灵活性，对儿童大脑的{{62}}也有好处。此外，用筷子还有不少{{63}}，比如不能把筷子竖着插在饭碗里，也不能用筷子敲打碗盘。",
    blanks: [
      {
        number: 61,
        options: ["协会", "协议", "协调", "协商"],
        answer: 2,
        why: "相互协调 means parts working smoothly together, as fingers and wrist must; 协会 and 协议 are nouns (association, agreement), and 协商 is negotiating between people.",
      },
      {
        number: 62,
        options: ["发扬", "发育", "发行", "发布"],
        answer: 1,
        why: "大脑的发育 is the development of a growing body; 发扬 is carrying forward a tradition, 发行 is issuing books or money, and 发布 is releasing news.",
      },
      {
        number: 63,
        options: ["禁止", "避免", "顾虑", "忌讳"],
        answer: 3,
        why: "有不少忌讳 means there are many taboos, which the examples then list; 禁止 and 避免 are verbs, and 顾虑 means worries.",
      },
    ],
  },
  {
    id: "h6-cloze-18",
    source: "HSK 6 practice · 18",
    text: "在信息传播极快的今天，网络谣言也随之增多。一些人为了吸引眼球，故意{{61}}谣言；而有些网友在没有{{62}}真假的情况下，就随手转发，使谣言越传越广。谣言不仅会误导公众，有时还会{{63}}他人的名誉。面对网上的各种消息，我们应该保持{{64}}的头脑，不信谣、不传谣。",
    blanks: [
      {
        number: 61,
        options: ["散布", "散发", "遍布", "分布"],
        answer: 0,
        why: "散布谣言 is the fixed collocation for spreading rumours on purpose; 散发 is giving off a smell or handing out leaflets, and 遍布 and 分布 describe where things are located.",
      },
      {
        number: 62,
        options: ["借鉴", "鉴别", "鉴于", "鉴赏"],
        answer: 1,
        why: "鉴别真假 means to tell true from false; 借鉴 is learning from others, 鉴于 means “in view of”, and 鉴赏 is appreciating art.",
      },
      {
        number: 63,
        options: ["腐败", "失败", "败坏", "打败"],
        answer: 2,
        why: "败坏名誉 means to ruin someone's reputation; 腐败 means corrupt, 失败 means to fail, and 打败 is to defeat an opponent.",
      },
      {
        number: 64,
        options: ["清澈", "清淡", "清洁", "清醒"],
        answer: 3,
        why: "保持清醒的头脑 means to keep a clear head; 清澈 describes clear water, 清淡 light food, and 清洁 clean surfaces.",
      },
    ],
  },
  {
    id: "h6-cloze-19",
    source: "HSK 6 practice · 19",
    text: "很多家长喜欢夸孩子“你真聪明”，可研究发现，这样的表扬未必{{61}}。被夸聪明的孩子往往害怕失败，{{62}}于选择简单的任务，以保住自己“聪明”的形象；而被夸努力的孩子则更愿意{{63}}有难度的任务。因此，教育专家建议，家长在表扬孩子时，应该把重点放在孩子付出的{{64}}上，而不是天赋上。",
    blanks: [
      {
        number: 61,
        options: ["恰巧", "正当", "恰当", "妥协"],
        answer: 2,
        why: "表扬未必恰当 means such praise is not necessarily appropriate; 恰巧 means by coincidence, 正当 means legitimate, and 妥协 is to compromise.",
      },
      {
        number: 62,
        options: ["倾向", "倾听", "倾斜", "偏偏"],
        answer: 0,
        why: "倾向于 means “to tend to”; 倾听 is to listen, 倾斜 is to tilt, and 偏偏 is an adverb that cannot take 于.",
      },
      {
        number: 63,
        options: ["试图", "试验", "考验", "尝试"],
        answer: 3,
        why: "尝试有难度的任务 means to try a hard task; 试图 must be followed by a verb, 试验 is a scientific experiment, and 考验 is a test of someone's character.",
      },
      {
        number: 64,
        options: ["心灵", "心态", "心理", "心血"],
        answer: 3,
        why: "付出的心血 means the effort one has put in, which contrasts with 天赋; 心灵, 心态 and 心理 are the soul, mindset and psychology, which are not “paid out”.",
      },
    ],
  },
  {
    id: "h6-cloze-20",
    source: "HSK 6 practice · 20",
    text: "含羞草是一种很有趣的植物，只要用手轻轻一碰，它的叶子{{61}}合拢起来，好像害羞了一样。这其实是含羞草自我保护的一种{{62}}。科学家{{63}}，叶子合拢后，可以减少被动物吃掉的可能，也能避免叶子受到狂风暴雨的{{64}}。正是这种奇特的反应，很早就{{65}}了植物学家们的研究兴趣。",
    blanks: [
      {
        number: 61,
        options: ["时常", "顿时", "时而", "不时"],
        answer: 1,
        why: "顿时 means “at once”, matching the instant reaction to a touch; 时常, 时而 and 不时 all mean “from time to time”.",
      },
      {
        number: 62,
        options: ["本身", "本钱", "本能", "本人"],
        answer: 2,
        why: "自我保护的本能 is an instinct for self-protection; 本身 means “itself”, 本钱 is capital, and 本人 is “oneself” as a person.",
      },
      {
        number: 63,
        options: ["推测", "推销", "推辞", "推翻"],
        answer: 0,
        why: "科学家推测 means scientists infer or suppose, introducing their explanation; 推销 is selling, 推辞 is declining an offer, and 推翻 is overturning.",
      },
      {
        number: 64,
        options: ["残忍", "残酷", "残疾", "摧残"],
        answer: 3,
        why: "受到……的摧残 means to suffer damage from wind and rain; 残忍 and 残酷 are adjectives (cruel), and 残疾 is a disability.",
      },
      {
        number: 65,
        options: ["激发", "激励", "激情", "感激"],
        answer: 0,
        why: "激发兴趣 means to arouse interest; 激励 encourages a person rather than an interest, 激情 is a noun (passion), and 感激 means to be grateful.",
      },
    ],
  },
  {
    id: "h6-cloze-21",
    source: "HSK 6 practice · 21",
    text: "二十四节气是中国古人通过长期观察太阳运行而总结出来的，是古代劳动人民智慧的{{61}}。每个节气都有{{62}}的含义，比如“惊蛰”{{63}}春雷开始响起，冬眠的动物逐渐苏醒。2016年，二十四节气被列入联合国教科文组织人类非物质文化遗产名录。直到今天，许多农民仍然{{64}}节气来安排播种和收获。",
    blanks: [
      {
        number: 61,
        options: ["结论", "结局", "结晶", "总结"],
        answer: 2,
        why: "智慧的结晶 is the fixed phrase “the crystallisation of wisdom”; 结论 is a conclusion, 结局 an ending, and 总结 a summary.",
      },
      {
        number: 62,
        options: ["特定", "特意", "特长", "特地"],
        answer: 0,
        why: "特定的含义 means a specific meaning; 特意 and 特地 are adverbs (on purpose), and 特长 is a special skill.",
      },
      {
        number: 63,
        options: ["意料", "意味着", "意图", "意向"],
        answer: 1,
        why: "意味着 means “signifies”, linking the term 惊蛰 to what happens in nature; 意料 is to expect, and 意图 and 意向 are intentions.",
      },
      {
        number: 64,
        options: ["依恋", "依据", "依旧", "依偎"],
        answer: 1,
        why: "依据节气来安排 means planning on the basis of the solar terms; 依恋 is emotional attachment, 依旧 means “as before”, and 依偎 is to snuggle up.",
      },
    ],
  },
  {
    id: "h6-cloze-22",
    source: "HSK 6 practice · 22",
    text: "现代人生活节奏快，很难有大块的时间用来学习。其实，我们每天都有许多{{61}}的时间，比如等车、排队、坐地铁的时候。如果能把这些时间利用起来，一年下来，收获会相当{{62}}。当然，利用碎片时间的{{63}}是要有明确的目标，否则只是漫无目的地刷手机，反而会让人感到更加{{64}}。",
    blanks: [
      {
        number: 61,
        options: ["零件", "零钱", "零星", "零售"],
        answer: 2,
        why: "零星的时间 means scattered bits of time; 零件 are machine parts, 零钱 is small change, and 零售 is retail.",
      },
      {
        number: 62,
        options: ["可观", "美观", "壮观", "乐观"],
        answer: 0,
        why: "收获可观 means the gain is considerable; 美观 and 壮观 describe how something looks, and 乐观 describes a person's outlook.",
      },
      {
        number: 63,
        options: ["前景", "前提", "前途", "提前"],
        answer: 1,
        why: "……的前提是 means “the precondition is”; 前景 and 前途 are future prospects, and 提前 means “in advance”.",
      },
      {
        number: 64,
        options: ["空白", "空洞", "空想", "空虚"],
        answer: 3,
        why: "感到空虚 means to feel empty inside after aimless scrolling; 空白 is a blank space, 空洞 describes hollow speech or writing, and 空想 is a fantasy.",
      },
    ],
  },
  {
    id: "h6-cloze-23",
    source: "HSK 6 practice · 23",
    text: "近年来，人工智能技术的发展速度{{61}}了人们的想象。如今，它不仅能翻译文章、识别人脸，还能{{62}}医生分析病情。不过，也有人担心，人工智能会给许多传统行业带来巨大的{{63}}，导致一些人失业。专家认为，与其害怕被机器{{64}}，不如主动学习新技能，让自己跟上时代的步伐。",
    blanks: [
      {
        number: 61,
        options: ["穿越", "优越", "超越", "跨越"],
        answer: 2,
        why: "超越想象 means to go beyond what people imagined; 穿越 is passing through a place, 优越 is an adjective (superior), and 跨越 is crossing an obstacle or a span.",
      },
      {
        number: 62,
        options: ["协会", "协助", "协议", "协商"],
        answer: 1,
        why: "协助医生 means to assist doctors; 协会 and 协议 are nouns, and 协商 is to negotiate, not to help.",
      },
      {
        number: 63,
        options: ["冲击", "冲突", "冲动", "冲锋"],
        answer: 0,
        why: "给……带来冲击 means to deal a heavy blow to an industry; 冲突 is a conflict, 冲动 an impulse, and 冲锋 a military charge.",
      },
      {
        number: 64,
        options: ["抛弃", "开除", "排除", "淘汰"],
        answer: 3,
        why: "被淘汰 means to be pushed out by competition, which is the fear about machines; 抛弃 is to abandon, 开除 is to be fired by an employer, and 排除 is to rule out.",
      },
    ],
  },
  {
    id: "h6-cloze-24",
    source: "HSK 6 practice · 24",
    text: "有人说，幸福不在于拥有得多，而在于{{61}}得少。一个人如果总是拿自己和别人比，看到别人买了新车、住了大房子就心里不平衡，那么他永远也不会感到满足。古人说“{{62}}”，懂得珍惜眼前所拥有的一切，内心才会变得{{63}}。当然，知足并不意味着不求{{64}}，而是在努力的同时，保持一颗平和的心。",
    blanks: [
      {
        number: 61,
        options: ["计算", "计较", "较量", "计划"],
        answer: 1,
        why: "计较得少 means fussing less over gains and losses; 计算 is calculating numbers, 较量 is a contest of strength, and 计划 is to plan.",
      },
      {
        number: 62,
        options: ["精益求精", "得不偿失", "知足常乐", "急于求成"],
        answer: 2,
        why: "知足常乐 (contentment brings happiness) is the saying the passage goes on to explain with 知足; the other idioms are about perfectionism, a net loss and impatience.",
      },
      {
        number: 63,
        options: ["踏实", "结实", "扎实", "坚实"],
        answer: 0,
        why: "内心踏实 means feeling settled and at ease; 结实 describes a sturdy body or object, 扎实 solid skills, and 坚实 a firm foundation.",
      },
      {
        number: 64,
        options: ["上级", "上任", "上游", "上进"],
        answer: 3,
        why: "不求上进 is the fixed phrase for having no ambition to improve; 上级 is a superior, 上任 is taking office, and 上游 is upstream.",
      },
    ],
  },
];
