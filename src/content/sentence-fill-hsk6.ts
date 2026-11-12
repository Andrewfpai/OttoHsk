import type { SentenceFillPassage } from "./types";

/**
 * Original practice passages in the style of the new HSK 6 (HSK 3.0) Reading
 * Part 2 (questions 51–60): two passages per paper, each with five gaps and
 * six clauses, A–F. Five fill the gaps; one is an on-topic distractor that
 * fits nowhere. Odd-numbered passages use 51–55 and even-numbered ones 56–60,
 * as on the exam, so passages 1 and 2 make up practice paper 1, and so on.
 */
export const sentenceFillHsk6: SentenceFillPassage[] = [
  {
    id: "h6-sf-01",
    source: "HSK 6 practice · 1",
    text: "早上十点半，北京某小区的长者食堂里已经飘出了饭菜香。七十六岁的王奶奶拿着饭卡排队，一荤两素加一碗汤，结账时只花了十二块钱。\n王奶奶的老伴去世后，儿女都在外地工作，{{51}}。“一个人做饭，做多了吃不完，做少了又不值得开火，常常是一锅粥对付一天。”她说。自从小区开了这家食堂，她每天中午都会准时过来，{{52}}。\n近年来，随着老龄化程度不断加深，“吃饭难”成了不少独居老人的烦恼。为此，许多城市开始在社区建设长者食堂，由政府提供场地和补贴，引入专业餐饮企业运营。{{53}}，菜单也会专门照顾老年人的口味和健康需求，少油少盐、软烂易嚼。\n不过，长者食堂要办得长久，光靠补贴是不够的。有的食堂在保证老人优惠的前提下，也向周边居民和上班族开放，{{54}}。还有的食堂与外卖平台合作，为行动不便的老人送餐上门。\n“吃饭虽是小事，{{55}}。”一位社区工作人员说，“老人们在这里不光吃得好，还能和老邻居聊聊天，心情也好多了。”",
    options: [
      "这些食堂的饭菜价格普遍低于市场价",
      "却关系着老人晚年生活的质量",
      "她平时只能自己凑合着吃",
      "可惜很多老人还不太会用手机点餐",
      "有时还会给楼上腿脚不便的老姐妹带一份",
      "靠增加的客流来维持收支平衡",
    ],
    blanks: [
      {
        number: 51,
        answer: 2,
        why: "With her husband gone and her children away, she has to fend for herself; the quote that follows (一个人做饭……一锅粥对付一天) describes exactly that 凑合.",
      },
      {
        number: 52,
        answer: 4,
        why: "This continues what she does now that she comes every day at noon, and only a clause with her as the subject fits after 她每天中午都会准时过来.",
      },
      {
        number: 53,
        answer: 0,
        why: "The 也 in 菜单也会 needs a parallel point about the canteens before it: cheap prices, and also menus suited to the elderly.",
      },
      {
        number: 54,
        answer: 5,
        why: "The paragraph is about staying afloat without relying on subsidies, so opening to outside diners is how they 维持收支平衡.",
      },
      {
        number: 55,
        answer: 1,
        why: "虽 in 吃饭虽是小事 calls for a contrast with 却: eating is a small thing, yet it shapes the quality of old age.",
      },
    ],
  },
  {
    id: "h6-sf-02",
    source: "HSK 6 practice · 1",
    text: "每年秋天，成千上万只斑头雁从青藏高原起飞，飞越喜马拉雅山脉，前往南亚越冬。它们究竟沿着什么路线飞行？途中在哪里停歇？过去，{{56}}，研究人员只能给鸟套上脚环，等别人在远方捕获或看到后再反馈信息，往往等上好几年也收不到一条记录。\n如今，卫星追踪技术让这一切变得简单多了。研究人员给鸟儿装上一个只有几十克重的太阳能定位器，{{57}}。坐在实验室里，就能在电脑屏幕上看到一只鸟一天飞了多远、在多高的地方飞行。\n借助这些数据，科学家有了不少意外的发现。比如，人们一直以为斑头雁会始终保持在高空飞越喜马拉雅山，{{58}}，而是会顺着山势时高时低，像坐过山车一样，以节省体力。\n追踪数据还在保护工作中派上了用场。研究人员发现，一些候鸟的停歇地正好位于正在规划的风电场附近，{{59}}。有关部门据此调整了选址，为鸟儿留出了途中的“加油站”。\n当然，{{60}}。定位器的重量必须控制在鸟体重的3%以内，佩戴方式也要经过反复试验，以免影响鸟类正常飞行和生活。",
    options: [
      "鸟儿的位置信息便会定时传回地面",
      "因此它们需要在途中多次补充能量",
      "给鸟儿佩戴定位器也有讲究",
      "科学家对这些问题知之甚少",
      "风电场一旦建成将威胁鸟儿的安全",
      "实际上它们并不总是飞在最高处",
    ],
    blanks: [
      {
        number: 56,
        answer: 3,
        why: "这些问题 points back to the two questions just asked (what route, where they stop), and 过去 sets up how little was known before satellite tracking.",
      },
      {
        number: 57,
        answer: 0,
        why: "便 marks the result of fitting the tracker: once it is on, the bird's position is sent back, which is why the researchers can then watch it on screen.",
      },
      {
        number: 58,
        answer: 5,
        why: "人们一直以为 sets up a belief to be corrected, and the 而是 that follows needs a 不是/并不 clause before it: 并不总是飞在最高处，而是…….",
      },
      {
        number: 59,
        answer: 4,
        why: "The stopover sites lie next to planned wind farms, and the threat this poses is what makes the authorities 据此 move them.",
      },
      {
        number: 60,
        answer: 2,
        why: "当然 introduces a caveat, and the sentences after it (weight under 3%, how it is worn) spell out the 讲究 of fitting trackers.",
      },
    ],
  },
  {
    id: "h6-sf-03",
    source: "HSK 6 practice · 2",
    text: "在省图书馆一间安静的工作室里，二十八岁的林晓正用镊子把一小片发黄的纸轻轻贴回原处。她面前的这本清代医书，书页被虫蛀得像筛子一样，{{51}}。\n林晓大学学的是化学，毕业时本可以进企业拿高薪，{{52}}。“第一次看到老师傅把一本快散架的书修得平平整整，我觉得这简直是魔术。”她笑着说。\n古籍修复是一门慢功夫。一页纸往往要经过清洗、补洞、压平等十几道工序，{{53}}。修复讲究“修旧如旧”，补上去的地方既要结实，又不能显得突兀。有时为了找到颜色、厚薄都合适的补纸，她要在上百种纸张里反复比对。刚入行那几年，林晓常常因为一个小失误而前功尽弃，{{54}}。\n如今，林晓已经独立修复了两百多册古籍。她还尝试把化学专业的知识用到工作中，比如分析纸张的酸碱度，为每本书制定更科学的修复方案。\n在她看来，修复古籍不只是一门手艺，{{55}}。“每修好一本书，就等于让一段历史多活几百年。”",
    options: [
      "更是一份对历史的责任",
      "稍微用点儿力就可能碎掉",
      "但她从来没有想过放弃",
      "一本书修下来常常要花好几个月",
      "她却一头扎进了这个冷门行当",
      "就能看出这本书大致出自哪个年代",
    ],
    blanks: [
      {
        number: 51,
        answer: 1,
        why: "Pages eaten through like a sieve are fragile, so the clause that follows describes how easily they would crumble.",
      },
      {
        number: 52,
        answer: 4,
        why: "本可以 (could have) sets up a contrast with what she actually did, and 却 supplies it.",
      },
      {
        number: 53,
        answer: 3,
        why: "If a single page takes a dozen steps, the natural next point is how long a whole book takes, in keeping with 慢功夫.",
      },
      {
        number: 54,
        answer: 2,
        why: "Losing all her work over small mistakes is a setback, and 但 turns it to her persistence, which the next paragraph (如今……两百多册) confirms.",
      },
      {
        number: 55,
        answer: 0,
        why: "不只是 pairs with 更是: not just a craft, but also a responsibility, which her quote about letting history live longer echoes.",
      },
    ],
  },
  {
    id: "h6-sf-04",
    source: "HSK 6 practice · 2",
    text: "考试前熬夜复习，是不少学生的习惯。他们觉得，多看一个小时书，就能多记住一些内容。然而，越来越多的研究表明，{{56}}。\n科学家发现，人在睡眠中，大脑并没有完全“休息”。白天接收到的大量信息先被临时存放在海马体中，{{57}}。这个过程就像把桌面上散乱的文件整理好，放进柜子里，需要的时候才能很快找到。\n在一项实验中，研究人员让两组大学生学习同样的单词，一组学习后正常睡觉，另一组则通宵不睡。第二天测试时，{{58}}。即使第二组在随后几天补足了睡眠，差距也没有完全消失。\n那么，怎样做才最有利于记忆呢？专家建议，{{59}}，因为睡前学到的内容受到的干扰最少，更容易被大脑“保存”下来。此外，白天小睡二三十分钟，也能在一定程度上提高学习效率。\n需要注意的是，睡眠并不能代替学习本身。{{60}}，睡得再多也无济于事。只有把认真学习和充足睡眠结合起来，才能事半功倍。",
    options: [
      "如果白天根本没有认真学进去",
      "到了夜里再被转移到大脑皮层长期保存",
      "牺牲睡眠换来的学习时间往往得不偿失",
      "重要的内容最好安排在睡前复习",
      "而睡得太多反而会让人头脑昏沉",
      "前一组记住的单词明显多于后一组",
    ],
    blanks: [
      {
        number: 56,
        answer: 2,
        why: "然而 contradicts the students' belief that an extra hour of study means more remembered, so the research finding must say the trade is not worth it.",
      },
      {
        number: 57,
        answer: 1,
        why: "先 (first) is answered by 再 (then): information is first held in the hippocampus, then moved for long-term storage, the 过程 compared to filing in the next sentence.",
      },
      {
        number: 58,
        answer: 5,
        why: "第二天测试时 asks for the test result, and 即使第二组……差距也没有完全消失 shows the sleeping group did better.",
      },
      {
        number: 59,
        answer: 3,
        why: "The reason given after it, 因为睡前学到的内容受到的干扰最少, only supports reviewing before sleep.",
      },
      {
        number: 60,
        answer: 0,
        why: "睡眠并不能代替学习本身 is illustrated by a condition: if nothing was learned in the day, no amount of sleep helps (睡得再多也无济于事).",
      },
    ],
  },
  {
    id: "h6-sf-05",
    source: "HSK 6 practice · 3",
    text: "在内蒙古西部的一片沙漠里，一排排蓝色的光伏板整齐地排列着，一眼望不到头。光伏板下面，原本寸草不生的沙地上，{{51}}。\n这里曾是有名的风沙源头。每到春季，大风卷起黄沙，打在脸上生疼，附近的村庄常常白天也要开着灯。当地政府试过多种治沙办法，{{52}}：树苗种下去，没过多久就被风沙埋住或者干死了。\n几年前，一家新能源企业在这里建起光伏电站，情况开始发生变化。光伏板像一把把大伞，{{53}}，减少了水分蒸发；清洗光伏板用的水流到地上，又为植物提供了难得的水分。工人们趁机在板下种上了耐旱的沙柳和甘草，{{54}}。\n更让村民高兴的是，他们也从中得到了实惠。不少人在电站里找到了工作，负责清洗光伏板、管理植被；板下的甘草长成以后，还能卖个好价钱。“{{55}}，现在一年下来能挣好几万。”一位村民说。\n“板上发电、板下种草、板间养殖”，这种模式如今正在西北多个省份推广。专家表示，它既能生产清洁能源，又能改善生态环境，还能增加农民收入，可谓一举多得。",
    options: [
      "因此电站的建设成本一直居高不下",
      "挡住了强烈的阳光",
      "以前守着几亩薄地靠天吃饭",
      "竟然长出了一片片绿油油的植物",
      "流动的沙丘渐渐被固定了下来",
      "效果却一直不太理想",
    ],
    blanks: [
      {
        number: 51,
        answer: 3,
        why: "原本寸草不生 (once barren) sets up a surprise, and 竟然 marks it: plants now grow there.",
      },
      {
        number: 52,
        answer: 5,
        why: "The colon introduces the failure (saplings buried or dried out), so the clause before it must say the methods did not work; 却 marks the contrast with 试过多种办法.",
      },
      {
        number: 53,
        answer: 1,
        why: "Panels compared to umbrellas block the sun, and that is what 减少了水分蒸发 follows from.",
      },
      {
        number: 54,
        answer: 4,
        why: "Planting hardy shrubs is a classic way to fix sand, so the result is that the shifting dunes settle.",
      },
      {
        number: 55,
        answer: 2,
        why: "现在 in the quote needs a 以前 to contrast with: once a poor farmer at the mercy of the weather, now earning tens of thousands.",
      },
    ],
  },
  {
    id: "h6-sf-06",
    source: "HSK 6 practice · 3",
    text: "节假日去博物馆，正在成为越来越多年轻人的选择。在一些热门博物馆门口，排队的人群从早上一直排到中午，{{56}}。\n年轻人为什么爱上了逛博物馆？一位在读研究生说，以前觉得文物离自己的生活很远，{{57}}。“看到一千多年前的人也会在杯子上画小猫，我一下子觉得他们离我很近。”\n这种变化，与博物馆自身的转变密不可分。过去，不少博物馆只是把文物摆进玻璃柜，配上一张简单的说明卡，{{58}}。如今，许多博物馆推出了夜场、沉浸式展览和互动体验，还把文物“搬”上了短视频平台，用轻松幽默的方式讲述背后的故事。\n文创产品也功不可没。以文物为原型设计的冰箱贴、雪糕、书签，既有文化味，又实用有趣，{{59}}。有人甚至专门为了买一款文创产品，跑到另一座城市的博物馆。\n不过，也有专家提醒，{{60}}。如果只顾着拍照打卡，却不愿意停下来读一读展品介绍，那就失去了参观的意义。",
    options: [
      "逛博物馆不能只停留在凑热闹上",
      "深受年轻消费者的喜爱",
      "热门博物馆不妨适当延长开放时间",
      "预约名额常常一放出来就被抢光",
      "观众看完往往留不下什么印象",
      "后来才发现古人的生活也很有烟火气",
    ],
    blanks: [
      {
        number: 56,
        answer: 3,
        why: "The sentence piles up signs of demand: long queues, and tickets that sell out as soon as they are released.",
      },
      {
        number: 57,
        answer: 5,
        why: "以前觉得 needs a 后来才发现 to show the change of mind, and the quote about a cat painted on a cup is that discovery.",
      },
      {
        number: 58,
        answer: 4,
        why: "过去 describes the old, dull way of display, so its result is visitors who remember little, contrasted with 如今 in the next sentence.",
      },
      {
        number: 59,
        answer: 1,
        why: "The products are described as cultural, practical and fun, so they are popular, which the next sentence (traveling to another city to buy one) backs up.",
      },
      {
        number: 60,
        answer: 0,
        why: "不过……专家提醒 introduces a warning about the trend, and the next sentence explains it: only taking photos and not reading the labels misses the point. Longer opening hours would not lead into that sentence.",
      },
    ],
  },
  {
    id: "h6-sf-07",
    source: "HSK 6 practice · 4",
    text: "搬家时清理出来的旧书、只穿过一次的大衣、买回来就后悔的健身器材……这些闲置物品，过去往往被堆在角落里，{{51}}。如今，越来越多的人选择把它们放到二手交易平台上，让它们找到新主人。\n二十六岁的小周就是其中之一。去年，她把家里用不上的东西拍照上传，{{52}}。“卖出去的东西一共不到两千块钱，但家里一下子宽敞了不少。”她说，现在买东西前，她会先在二手平台上搜一搜，{{53}}。\n业内人士分析，二手交易的兴起，一方面是因为{{54}}；另一方面也得益于移动支付和物流的发展，买卖双方即使远隔千里，也能很快完成交易。\n当然，二手交易也存在一些问题，比如商品描述与实物不符、售后难以保障等。为此，一些平台推出了专业验货服务，{{55}}，以减少交易纠纷。\n专家认为，二手交易不仅能为个人节省开支，还能减少资源浪费，是一种值得提倡的绿色消费方式。",
    options: [
      "能买到九成新的就不买全新的",
      "由第三方对商品的成色和真伪进行鉴定",
      "最后不是被扔掉就是被当成废品卖掉",
      "却发现根本没有人愿意买",
      "人们的消费观念越来越理性",
      "没想到不到一个月就卖掉了一大半",
    ],
    blanks: [
      {
        number: 51,
        answer: 2,
        why: "过去 describes what used to happen to unused things before second-hand platforms (如今): left in a corner and finally thrown out.",
      },
      {
        number: 52,
        answer: 5,
        why: "Her quote (卖出去的东西……家里一下子宽敞了) shows the things did sell, so 没想到……卖掉了一大半 fits and 却发现没有人愿意买 does not.",
      },
      {
        number: 53,
        answer: 0,
        why: "Searching second-hand listings before shopping leads to her new rule: buy nearly new if she can.",
      },
      {
        number: 54,
        answer: 4,
        why: "一方面是因为 needs a society-wide cause to pair with 另一方面也得益于 mobile payment and logistics: people now spend more rationally. Her personal rule (A) belongs after her own shopping habit in 53.",
      },
      {
        number: 55,
        answer: 1,
        why: "It spells out what 专业验货服务 is, checking condition and authenticity, which tackles the problem of goods not matching their descriptions.",
      },
    ],
  },
  {
    id: "h6-sf-08",
    source: "HSK 6 practice · 4",
    text: "在没有电话和网络的古代，朝廷的命令是如何迅速传到各地的？边关的军情又是如何及时报告给皇帝的呢？答案是驿站。\n早在两千多年前，我国就建立起了比较完善的邮驿制度。朝廷在主要道路上每隔一段距离设立一个驿站，{{56}}。送信的人骑马到达一个驿站后，{{57}}，再继续赶路。这样一站接一站地传递，人和马都能保持较好的状态，速度自然就快了。\n据史料记载，在唐代，紧急公文一天最多可以传送五百里。{{58}}，但在当时的条件下，已经相当惊人了。\n驿站的用途也不仅限于传递公文。来往的官员可以在这里吃饭、住宿，{{59}}。一些驿站还逐渐发展成了热闹的集镇，后来甚至变成了城市。\n随着近代邮政和电报的出现，驿站慢慢退出了历史舞台。{{60}}，比如“驿”字至今仍出现在不少地名中，提醒人们这里曾经是交通要道。如今，一些保存下来的古驿站还被修缮成了博物馆，吸引着游客前来参观。",
    options: [
      "因此送信的人常常累得病倒",
      "不过它留下的痕迹并没有完全消失",
      "可以换一匹体力充沛的马",
      "外国使臣到来时也会在此停留",
      "这个速度在今天看来并不算快",
      "站里备有马匹、粮草和专门的管理人员",
    ],
    blanks: [
      {
        number: 56,
        answer: 5,
        why: "After the stations are set up, the sentence says what each one held; the horses kept there are what the rider swaps in the next sentence.",
      },
      {
        number: 57,
        answer: 2,
        why: "The rider arrives, does something, then 再继续赶路; the next sentence says horses stay fresh, so he changes horses.",
      },
      {
        number: 58,
        answer: 4,
        why: "但在当时的条件下……相当惊人 needs a concession before it: by today's standards the speed is not fast.",
      },
      {
        number: 59,
        answer: 3,
        why: "The paragraph lists uses beyond carrying documents; 也 adds foreign envoys to the officials who ate and slept there.",
      },
      {
        number: 60,
        answer: 1,
        why: "The stations disappeared, and 不过 turns to what remains; 比如 then gives place names with 驿 as an example of that trace.",
      },
    ],
  },
  {
    id: "h6-sf-09",
    source: "HSK 6 practice · 5",
    text: "在浙江一座海岛上，开小超市的陈大姐每天下午都会抬头看看天空。不一会儿，一架无人机稳稳地降落在码头旁的停机坪上，{{51}}。\n过去，岛上的货物全靠轮船运送。一旦遇上大风天气，轮船就要停航，{{52}}。有一年台风过后，岛上的蔬菜和药品断供了整整一个星期。\n去年，当地开通了无人机物流航线。从陆地起飞到海岛降落，全程只需要十几分钟，{{53}}。除了日常用品，无人机还承担起了运送急救药品和血液样本的任务，为岛上居民看病就医提供了便利。陈大姐说，以前进一趟货要提前好几天计划，现在头天晚上下单，第二天下午就能收到。\n不过，无人机配送也有自身的局限。目前一架无人机一次最多只能运载十几公斤的货物，{{54}}。此外，雨雪天气同样会影响飞行安全。\n业内人士表示，随着电池技术的进步和相关政策的完善，{{55}}。到那时，“快递从天上来”将不再是新鲜事。",
    options: [
      "居民们只能眼巴巴地等着",
      "体积太大的商品还是得靠轮船运输",
      "无人机的载重和航程有望进一步提升",
      "货舱里装着的正是陈大姐前一天订的货",
      "比坐船节省了一个多小时",
      "就连岛上的老人也学会了用手机下单",
    ],
    blanks: [
      {
        number: 51,
        answer: 3,
        why: "This explains why she watches the sky: the drone that lands is bringing her order.",
      },
      {
        number: 52,
        answer: 0,
        why: "一旦……就 sets out what happens in bad weather: ships stop, and islanders can only wait, as the week-long shortage after a typhoon shows.",
      },
      {
        number: 53,
        answer: 4,
        why: "A flight time of ten-odd minutes invites a comparison with the boat it replaced.",
      },
      {
        number: 54,
        answer: 1,
        why: "This follows from the limited payload under 局限: bulky goods still have to go by ship.",
      },
      {
        number: 55,
        answer: 2,
        why: "随着电池技术的进步 points to a future improvement in exactly what was named as a limit: load and range.",
      },
    ],
  },
  {
    id: "h6-sf-10",
    source: "HSK 6 practice · 5",
    text: "中考成绩出来后，十六岁的李响没有像大多数同学那样去读普通高中，{{56}}。当时，不少亲戚都替他惋惜，觉得上职校“没出息”。\n可李响有自己的想法。他从小就喜欢拆装家里的旧电器，{{57}}。在学校里，他每天有一半时间在实训车间度过，跟着老师学习数控机床的操作。三年级时，他代表学校参加全国职业院校技能大赛，{{58}}。还没毕业，就有好几家企业主动找上门来。最后，他进了一家汽车零部件企业当技术员，月薪比不少本科毕业生还高。\n李响的经历并不是个例。近年来，我国制造业转型升级，{{59}}。为此，国家出台了一系列政策支持职业教育发展，不仅鼓励企业和学校联合培养人才，还打通了职校学生继续升学的通道。\n尽管如此，{{60}}。一些家长仍然认为，孩子只有考上好大学才算成功。专家指出，社会需要的是各种各样的人才，职业教育和普通教育只是类型不同，并没有高低之分。",
    options: [
      "对高技能人才的需求越来越大",
      "动手能力一直比同龄人强",
      "因此文化课成绩一直名列前茅",
      "人们对职业教育的偏见还没有完全消除",
      "而是主动选择了一所职业学校",
      "一举拿下了数控车工项目的一等奖",
    ],
    blanks: [
      {
        number: 56,
        answer: 4,
        why: "没有 pairs with 而是: he did not go to high school but chose a vocational school, which is why his relatives call it 没出息.",
      },
      {
        number: 57,
        answer: 1,
        why: "Taking apart old appliances as a child shows practical skill; good grades with 因此 would not follow from it.",
      },
      {
        number: 58,
        answer: 5,
        why: "The competition needs a result, and a first prize explains why companies came looking for him before he graduated.",
      },
      {
        number: 59,
        answer: 0,
        why: "Industrial upgrading creates the demand for skilled workers that 为此 then answers with policies supporting vocational education.",
      },
      {
        number: 60,
        answer: 3,
        why: "尽管如此 (despite this) sets up a remaining problem, and parents who still see only university as success show the prejudice.",
      },
    ],
  },
  {
    id: "h6-sf-11",
    source: "HSK 6 practice · 6",
    text: "在寸土寸金的大城市里，想建一座大型公园并不容易。于是，一种面积不大、“见缝插针”的口袋公园悄然兴起。\n所谓口袋公园，是指利用城市中零散的空地建成的小型公共绿地。它们有的藏在两栋楼之间，有的就在马路转角处，{{51}}。别看面积小，里面往往有座椅、步道、健身器材，有的还专门为孩子设计了游乐区。\n家住上海某老小区的张先生对此深有体会。以前小区门口有一块荒地，{{52}}，居民们走过都要绕着走。前年，这块地被改造成了口袋公园，{{53}}。“晚饭后下楼走一走，五分钟就到了，再也不用专门开车去郊区的公园了。”\n口袋公园之所以受欢迎，{{54}}。相比大型公园，它离居民更近，使用起来更方便，而且建设成本低、周期短，几个月就能完工。\n目前，许多城市都提出了建设口袋公园的计划。不过有专家提醒，口袋公园的数量固然重要，{{55}}。只有充分听取周边居民的意见，才能让这些小空间真正发挥大作用。",
    options: [
      "但如何建得实用、管得长久更值得关注",
      "而是交给周边社区自行管理",
      "一下子成了附近居民最爱去的地方",
      "是因为它很好地弥补了大公园的不足",
      "常年堆满了建筑垃圾",
      "面积小的只有几百平方米",
    ],
    blanks: [
      {
        number: 51,
        answer: 5,
        why: "The sentence describes where and how big the parks are, and 别看面积小 right after picks up the small size.",
      },
      {
        number: 52,
        answer: 4,
        why: "A wasteland that residents walk around needs something unpleasant on it, such as piles of rubble.",
      },
      {
        number: 53,
        answer: 2,
        why: "After the makeover, the park's new popularity is what Mr Zhang's quote about walking there after dinner shows.",
      },
      {
        number: 54,
        answer: 3,
        why: "之所以 needs 是因为, and the next sentence lists how it makes up for big parks: closer, handier, cheaper and quicker to build.",
      },
      {
        number: 55,
        answer: 0,
        why: "固然 (admittedly) concedes a point and calls for 但: numbers matter, but usefulness and upkeep matter more.",
      },
    ],
  },
  {
    id: "h6-sf-12",
    source: "HSK 6 practice · 6",
    text: "我们餐桌上的许多食物，比如苹果、草莓、西瓜，都离不开一类小小的“功臣”——传粉昆虫。据估计，全球约四分之三的主要农作物在一定程度上依赖动物传粉，{{56}}。\n然而近几十年来，世界各地都出现了蜜蜂等传粉昆虫数量减少的现象。科学家认为，造成这一现象的原因是多方面的：农药的大量使用会损害昆虫的神经系统，{{57}}；栖息地被破坏，让它们失去了食物来源和筑巢的地方；气候变化则打乱了花期与昆虫活动时间之间的配合。\n传粉昆虫减少带来的影响已经开始显现。在一些果园里，{{58}}，果农不得不雇人拿着毛笔一朵一朵地给花授粉，不仅费时费力，效果也不如昆虫。\n保护传粉昆虫，其实每个人都能出一份力。比如，在阳台或院子里种一些开花的植物，{{59}}；减少使用杀虫剂，给昆虫留下生存空间。一些城市还在公园里设置了“昆虫旅馆”，用竹管、树枝等材料为野生蜂类提供栖身之所。\n{{60}}，但它们的命运与人类的饭碗紧紧连在一起。",
    options: [
      "为它们提供更多的花粉和花蜜",
      "这些小昆虫虽然不起眼",
      "使它们迷失方向、找不到回巢的路",
      "其中最重要的传粉者就是蜜蜂",
      "因此果农们纷纷开始自己养蜂",
      "由于前来采蜜的蜜蜂越来越少",
    ],
    blanks: [
      {
        number: 56,
        answer: 3,
        why: "其中 picks out one member of the 动物 that pollinate crops, and the next paragraph goes on to talk about bees.",
      },
      {
        number: 57,
        answer: 2,
        why: "使它们 continues the harm done to insects' nervous systems: they lose their way home.",
      },
      {
        number: 58,
        answer: 5,
        why: "由于 gives the cause and 不得不 the forced result: with too few bees, farmers pollinate by hand.",
      },
      {
        number: 59,
        answer: 0,
        why: "Planting flowers is a way to help, and the clause says what it gives the insects, parallel to 给昆虫留下生存空间 after the semicolon.",
      },
      {
        number: 60,
        answer: 1,
        why: "虽然 pairs with the 但 that follows: insignificant-looking, yet tied to our food supply.",
      },
    ],
  },
  {
    id: "h6-sf-13",
    source: "HSK 6 practice · 7",
    text: "“阿拉”“侬”“伐”——这些上海话中的常用词，如今不少上海孩子已经说不出来了。{{51}}，在全国很多地方，方言都在年轻一代中逐渐淡出。\n造成这种现象的原因并不难理解。随着普通话的普及和人口流动的加快，学校、单位里大家都说普通话，{{52}}。不少年轻父母担心孩子说方言会影响普通话的学习，干脆在家也只跟孩子说普通话。\n但方言的价值不应被忽视。语言学家指出，方言里保存着大量古代汉语的读音和词汇，{{53}}。比如，用某些南方方言朗读唐诗，有些在普通话里不押韵的诗句，读起来反而合辙押韵了。方言还承载着一个地方的民俗、戏曲和集体记忆，{{54}}。\n为了留住乡音，各地开始想办法。有的地方组织专家录制方言音档，建立方言数据库；有的学校开设了方言兴趣课；还有的电视台推出了方言节目，{{55}}。\n专家认为，推广普通话和保护方言并不矛盾。会说普通话，可以方便与各地的人交流；会说家乡话，则能让人记住自己从哪里来。",
    options: [
      "反而有助于孩子学好普通话",
      "是维系乡情的重要纽带",
      "其实不只是上海",
      "收视率出乎意料地高",
      "是研究汉语历史的“活化石”",
      "说方言的机会自然越来越少",
    ],
    blanks: [
      {
        number: 51,
        answer: 2,
        why: "不只是上海 pairs with 在全国很多地方 to widen Shanghai children's lost dialect into a nationwide trend.",
      },
      {
        number: 52,
        answer: 5,
        why: "If school and work are all in Mandarin, chances to speak dialect naturally (自然) shrink; this is one of the causes the paragraph lists.",
      },
      {
        number: 53,
        answer: 4,
        why: "Ancient pronunciations and words make dialects a “living fossil” of the history of Chinese, which the Tang poetry example illustrates.",
      },
      {
        number: 54,
        answer: 1,
        why: "还 adds a second value: a dialect carries local customs, opera and shared memory, so it binds people to their hometown. The “living fossil” (E) is about old sounds and words, the point of 53.",
      },
      {
        number: 55,
        answer: 3,
        why: "This comments on the dialect TV programmes just mentioned: their ratings were surprisingly good.",
      },
    ],
  },
  {
    id: "h6-sf-14",
    source: "HSK 6 practice · 7",
    text: "每周六上午，北京某社区服务中心门口都会排起一条长队。人们手里拿着坏了的收音机、台灯、电饭锅，{{56}}。\n这位老人叫赵建国，今年七十岁，退休前是一家电子厂的高级工程师。五年前，他发现小区里很多老人家里的小电器坏了，{{57}}：送去修理店，维修费有时比买新的还贵；直接扔了，又觉得可惜。于是，他决定在社区开一个免费修理摊。\n赵师傅修东西有个原则：{{58}}。有一次，一位老太太拿来一台用了三十多年的收音机，那是她去世的老伴留下的。零件早已停产，赵师傅就自己动手做了一个，前后花了半个多月。当老太太再次听到收音机里传出声音时，激动得流下了眼泪。\n如今，赵师傅的修理摊已经修好了三千多件物品。他的事迹传开后，{{59}}，有大学生，也有和他一样的退休职工。大家轮流值班，修理摊从每月一次变成了每周一次。\n有人问他图什么，赵师傅笑着说：“{{60}}，我心里就踏实。东西能接着用，也是给地球减轻负担嘛。”",
    options: [
      "能修的绝不让人换新的",
      "不少志愿者主动加入进来",
      "等着请一位白发老人帮忙“看看病”",
      "能用自己的手艺帮上别人",
      "却不知道该拿它们怎么办",
      "而且只收取少量的材料费",
    ],
    blanks: [
      {
        number: 56,
        answer: 2,
        why: "People holding broken appliances are waiting for someone; the next paragraph begins 这位老人, so the white-haired man must be introduced here.",
      },
      {
        number: 57,
        answer: 4,
        why: "The colon is followed by two bad choices (costly repair, wasteful throwing away), which explains why the old people did not know what to do.",
      },
      {
        number: 58,
        answer: 0,
        why: "The colon after 原则 introduces the rule itself, and the radio he rebuilt by hand rather than replace shows it in action.",
      },
      {
        number: 59,
        answer: 1,
        why: "有大学生，也有……退休职工 lists kinds of people, so the clause must name a group that joined, and 大家轮流值班 follows from it.",
      },
      {
        number: 60,
        answer: 3,
        why: "His answer to 图什么 is what makes him feel at ease (心里就踏实): being able to help others with his skills.",
      },
    ],
  },
  {
    id: "h6-sf-15",
    source: "HSK 6 practice · 8",
    text: "提起喝咖啡，很多人首先想到的是一线城市的写字楼。但如今，咖啡正在走进越来越多的县城。在一些中部省份的小县城里，{{51}}，主街上隔几十米就能看到一家。\n在江西某县城开咖啡店的小吴，几年前还在深圳一家互联网公司上班。{{52}}，他决定回到老家创业。“开店前，我心里其实也没底，担心县城的人不习惯喝咖啡。”小吴说。没想到，开业第一个月，{{53}}。\n小吴发现，他的顾客大多是年轻人，有从大城市回乡工作的白领，也有在当地上班的教师和公务员。对他们来说，{{54}}，更是一个可以和朋友聊天、安静看书的地方。为了吸引更多顾客，小吴还把本地特产融入饮品中，推出了几款特色咖啡。\n业内人士分析，县城咖啡的兴起，背后是县城年轻人消费观念的变化。随着收入的提高，他们不再满足于“吃饱穿暖”，{{55}}。与此同时，县城的房租和人工成本相对较低，也给了创业者更多的机会。",
    options: [
      "而是愿意为品质和体验多花一些钱",
      "咖啡店不只是一个买饮料的地方",
      "可惜大部分店都没能坚持下来",
      "厌倦了长期加班的生活后",
      "咖啡店的数量几年间翻了好几倍",
      "店里的营业额就超出了他的预期",
    ],
    blanks: [
      {
        number: 51,
        answer: 4,
        why: "The sentence describes how common cafés have become, ending with one every few dozen metres, so it needs a rapid rise in their number, not a failure.",
      },
      {
        number: 52,
        answer: 3,
        why: "Between his old city job and his decision to go home, a time clause ending in 后 gives the turning point.",
      },
      {
        number: 53,
        answer: 5,
        why: "没想到 answers his fear that locals would not drink coffee with a pleasant surprise, and 就 stresses how soon it came.",
      },
      {
        number: 54,
        answer: 1,
        why: "更是 needs 不只是 before it: a café is not only somewhere to buy drinks, but a place to meet and read.",
      },
      {
        number: 55,
        answer: 0,
        why: "不再满足于 sets up 而是: no longer content with the basics, but willing to pay for quality.",
      },
    ],
  },
  {
    id: "h6-sf-16",
    source: "HSK 6 practice · 8",
    text: "近年来，我国青少年近视率居高不下，而且呈现出低龄化的趋势。不少孩子刚上小学，{{56}}；有的班级里，戴眼镜的学生甚至占了一大半。\n很多家长认为，孩子近视主要是因为看书、写作业的时间太长，或者玩手机太多。这些固然是重要原因，{{57}}，那就是户外活动时间不足。现在的孩子课业负担重，放学后又要上各种辅导班，很少有机会到户外活动。\n研究发现，每天在户外活动两个小时左右，能有效降低儿童患近视的风险。{{58}}，而是充足的自然光。户外的光照强度通常是室内的几十倍甚至上百倍，强光能促进视网膜释放一种叫多巴胺的物质，{{59}}。此外，在户外时，孩子的眼睛会更多地看向远处，眼部肌肉也能得到放松。\n因此，专家建议，学校和家长都应该创造条件，让孩子多到户外去。课间十分钟，{{60}}；周末和假期，也可以多带孩子去公园、郊外走一走。即使是阴天，户外的光线也比室内强得多。目前，一些学校已经把部分体育课和兴趣课搬到了室外，效果相当不错。",
    options: [
      "但还有一个原因常常被人忽视",
      "不妨让孩子走出教室晒晒太阳",
      "从而延缓眼球的过度增长",
      "所以阴天最好让孩子留在室内",
      "就已经戴上了眼镜",
      "起关键作用的并不是运动本身",
    ],
    blanks: [
      {
        number: 56,
        answer: 4,
        why: "刚 (only just) pairs with 就已经 to stress how young: children already wear glasses when they start school, illustrating 低龄化.",
      },
      {
        number: 57,
        answer: 0,
        why: "固然 concedes the known causes and calls for 但; 那就是 then names the overlooked cause, so the clause must announce one.",
      },
      {
        number: 58,
        answer: 5,
        why: "The 而是 after the gap needs a 并不是 before it: it is not exercise itself but natural light.",
      },
      {
        number: 59,
        answer: 2,
        why: "从而 (thereby) gives the effect of the dopamine released by bright light: slower eyeball growth.",
      },
      {
        number: 60,
        answer: 1,
        why: "This is a suggestion for school break time, parallel to the advice for weekends after the semicolon; keeping children indoors would contradict the last sentence about cloudy days.",
      },
    ],
  },
];
