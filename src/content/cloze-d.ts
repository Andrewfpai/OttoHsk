import type { ClozePassage } from "./types";

/** From the learner's own papers: mengisi HSK 5 (d). */
export const clozeD: ClozePassage[] = [
  // ───────────────────────── HSK 5 (A) 2012 (I) ─────────────────────────
  {
    id: "d-2012-1-46",
    source: "HSK 5 (A) 2012 (I) · 46–48",
    text: "有个女人一直{{46}}住在对面的女人，觉得她又笨又懒，“那个女人的衣服永远洗不干净，看，她挂在院子里的衣服，总是黑一块，白一块，我真的不知道，她怎么{{47}}衣服都不会洗。男人娶了这样的老婆可真是{{48}}啊！”\n直到有一天，有个细心的朋友到她家，才发现不是对面的女人不会洗衣服。朋友拿了一块抹布，把窗户上的灰擦掉，说：“看，这不就干净了吗？”原来，是自己家的窗户脏了。",
    blanks: [
      {
        number: 46,
        options: ["担心", "恨", "接触", "看不起"],
        answer: 3,
        why: "She thinks the neighbour is stupid and lazy, so she looks down on her (看不起); 恨 (hate) is too strong for mere disdain about laundry.",
      },
      {
        number: 47,
        options: ["连", "把", "将", "对于"],
        answer: 0,
        why: "连……都 means “even”: she can't even wash clothes; 把/将 would need a verb with a result after the object, not 都不会.",
      },
      {
        number: 48,
        options: ["倒霉", "虚心", "单纯", "谦虚"],
        answer: 0,
        why: "A man who marries such a wife is unlucky (倒霉); 虚心, 单纯 and 谦虚 describe a person's character, not bad luck.",
      },
    ],
  },
  {
    id: "d-2012-1-49",
    source: "HSK 5 (A) 2012 (I) · 49–52",
    text: "有一回，卞庄子住在一家旅馆里，两只胆大的老虎竟然在白天{{49}}进了隔壁人家，咬死了一头小牛。卞庄子是一个{{50}}的人，他马上抽出刀来，要去杀老虎。旅馆的老板拦住他说：“别{{51}}。只有一头小牛，那两只老虎一定会互相咬起来，结果一定是一只被咬死，一只被咬伤。到时候你只要把伤的那只砍死就成了。”卞庄子听了他的话，待了一会儿，{{52}}，小的被咬死了，大的被咬伤了。卞庄子杀死了受伤的老虎，结果只动了一次手，得到了两只老虎。",
    blanks: [
      {
        number: 49,
        options: ["走", "爬", "闯", "躲"],
        answer: 2,
        why: "闯进 means to burst in boldly, which fits “bold tigers in broad daylight”; 躲进 (hide in) contradicts 胆大.",
      },
      {
        number: 50,
        options: ["聪明", "勇敢", "坚强", "结实"],
        answer: 1,
        why: "He immediately draws his knife to fight tigers, so he is brave (勇敢); 聪明 doesn't fit since the clever plan comes from the innkeeper.",
      },
      {
        number: 51,
        options: ["害怕", "犹豫", "灰心", "着急"],
        answer: 3,
        why: "The innkeeper tells him not to rush (别着急) and to wait for the tigers to fight; he was not afraid or hesitating, so 别害怕/别犹豫 make no sense.",
      },
      {
        number: 52,
        options: ["两只老虎果然互相咬了起来", "牛被吃完了", "卞庄子把两只老虎打倒在地", "两只老虎居然都死了"],
        answer: 0,
        why: "果然 confirms the innkeeper's prediction that the tigers would fight, and the next clause (one died, one was hurt) shows they did not both die.",
      },
    ],
  },
  {
    id: "d-2012-1-53",
    source: "HSK 5 (A) 2012 (I) · 53–56",
    text: "有一对兄弟，他们的家住在第80层楼。有一天他们外出旅行回家，发现大楼停电了！虽然他们背着大包的行李，但看来没有什么别的{{53}}，于是哥哥对弟弟说：“我们爬楼梯上去吧！”于是，他们背着两大包行李开始爬楼梯。爬到20楼的时候他们开始{{54}}了，哥哥说：“包太重了，不如这样吧，我们把包放在这里，等来电后坐电梯来拿。”于是，他们把行李放在了20楼，轻松多了，继续向上爬。\n他们有说有笑地往上爬，但爬到40楼的时候，两人实在爬不动了。想到才爬了一半，两人开始互相{{55}}对方不注意大楼的停电公告，才会落得如此下场。他们边吵边爬，就这样一路爬到了60楼。到了60楼，他们累得连吵架的力气也没有了。弟弟对哥哥说：“我们不要吵了，爬完它吧。”于是他们默默地继续爬楼，80楼终于到了！兴奋地来到家门口，兄弟俩才发现没法进门，原来{{56}}。",
    blanks: [
      {
        number: 53,
        options: ["路", "机会", "选择", "电梯"],
        answer: 2,
        why: "没有别的选择 means “no other choice” but to climb; 电梯 is wrong because the lift is exactly what isn't working.",
      },
      {
        number: 54,
        options: ["困", "饿", "累", "悲观"],
        answer: 2,
        why: "Carrying heavy bags up 20 floors makes them tired (累), and the brother's next words are about the bags being too heavy, not hunger or sleepiness.",
      },
      {
        number: 55,
        options: ["吵架", "责备", "抗议", "否定"],
        answer: 1,
        why: "责备对方 + reason means blaming each other for not noticing the notice; 吵架 cannot take an object like 对方不注意…….",
      },
      {
        number: 56,
        options: ["他们已经搬家了", "他们的钥匙还在20楼的包里", "他们实在太累了", "家里没人"],
        answer: 1,
        why: "They left their bags on the 20th floor, so the key is still in the bag there; 太累了 wouldn't stop them opening the door.",
      },
    ],
  },
  {
    id: "d-2012-1-57",
    source: "HSK 5 (A) 2012 (I) · 57–60",
    text: "闪电是一种自然放电{{57}}，而放电使空气{{58}}发出声音，就形成雷声。声音在空气中每秒钟约走340米，而光在空气里差不多每秒走30万公里，所以我们总是{{59}}。有时，由于放电云层离我们太远，或者发出的声音不够响，我们就只看见闪电而听不见雷声。雷电虽然有时很美，但它也会带来危害，一次闪电所带的能量极大，它不仅能击毁房屋，还会引起森林火灾，{{60}}人们的生命安全。",
    blanks: [
      {
        number: 57,
        options: ["行为", "行动", "现象", "系统"],
        answer: 2,
        why: "Lightning is a natural phenomenon (自然现象); 行为 and 行动 are actions done by people.",
      },
      {
        number: 58,
        options: ["动作", "活动", "振动", "活跃"],
        answer: 2,
        why: "Sound is produced by the air vibrating (振动); 活动 is general movement or activity, not the physics of sound.",
      },
      {
        number: 59,
        options: ["听到雷声", "害怕闪电", "爱看闪电", "先看到闪电后听到雷声"],
        answer: 3,
        why: "所以 follows the comparison of light's speed with sound's, so the result is that we see lightning first and hear thunder after.",
      },
      {
        number: 60,
        options: ["威胁", "危险", "引起", "恶劣"],
        answer: 0,
        why: "威胁 is a verb that takes 人们的生命安全 as its object (“threaten people's lives”); 危险 is an adjective and cannot take an object.",
      },
    ],
  },

  // ───────────────────────── HSK 5 (A) 2012 (II) ─────────────────────────
  {
    id: "d-2012-2-46",
    source: "HSK 5 (A) 2012 (II) · 46–48",
    text: "有两个女人在聊天儿，其中一个问道：“你儿子还好吧？”\n“别提了，真是不幸哦，这孩子最让我{{46}}了。”这个女人说道：“他实在是{{47}}，娶的媳妇懒得不得了，不烧饭、不扫地、不洗衣服、不带孩子，整天就是睡觉，早饭还要我儿子送到她的床上呢！”\n“那你女儿呢？”\n“那她可就幸运多了。”女人满脸微笑：“她嫁了一个不错的丈夫，从来不做家务，全部都由先生一手包办，煮饭、洗衣、扫地、带孩子，而且每天早上还送早点到床上给她吃呢！”\n同样的状况，但是当我们从不同{{48}}去看时，就会产生不同的看法。站在别人的立场看一看，或换个角度想一想，很多事儿就不一样了。",
    blanks: [
      {
        number: 46,
        options: ["疼爱", "操心", "委屈", "不耐烦"],
        answer: 1,
        why: "After “真是不幸” the mother says her son makes her worry most (让我操心); 疼爱 is affectionate love, which doesn't fit a complaint.",
      },
      {
        number: 47,
        options: ["匆忙", "不利", "可怜", "勤劳"],
        answer: 2,
        why: "She pities her son, who has to do everything for a lazy wife, so he is 可怜; 勤劳 praises him and doesn't match the complaint.",
      },
      {
        number: 48,
        options: ["角度", "矛盾", "背景", "概念"],
        answer: 0,
        why: "从不同角度去看 means looking from different angles, echoed by 换个角度 in the next sentence.",
      },
    ],
  },
  {
    id: "d-2012-2-49",
    source: "HSK 5 (A) 2012 (II) · 49–52",
    text: "古代有个卖酒的人，开着一家小饭馆，这个人十分勤劳，总是将饭馆打扫得干干净净，酒壶、酒杯、筷子之类的东西也{{49}}得干干净净，为了{{50}}更多的顾客，他还在门外挂了一个“天下第一酒”的大牌子。应该说这个人确实很有生意头脑，然而奇怪的是，酒的销售情况却非常不{{51}}，很多酒因为长期卖不出去都变酸变臭，十分可惜。\n因为损失非常严重，卖酒的人十分着急，于是向旁边的邻居咨询为什么这么香的酒竟然卖不出去。邻居们告诉他：“{{52}}。我们都亲眼看到过，有的人高高兴兴地提着酒壶准备到你家去买酒，可是还没等走到店门口，你家的狗就跳出来狂叫不止，甚至还要扑上去咬人家。这样一来，又有谁还敢到你家去买酒呢？因此，你家的酒就只好放在家里等着变坏啦。”",
    blanks: [
      {
        number: 49,
        options: ["放", "摆", "搞", "收拾"],
        answer: 3,
        why: "收拾得干干净净 (tidied up spotlessly) is the natural collocation; 摆 goes with 整整齐齐 (neatly arranged), not 干干净净.",
      },
      {
        number: 50,
        options: ["吸引", "卖", "感兴趣", "构成"],
        answer: 0,
        why: "He hangs a big sign to attract more customers (吸引顾客); 感兴趣 cannot take an object directly.",
      },
      {
        number: 51,
        options: ["乐观", "充分", "出色", "可靠"],
        answer: 0,
        why: "情况不乐观 is the set way to say a situation (here sales) is poor; 充分 and 可靠 don't describe sales figures.",
      },
      {
        number: 52,
        options: ["地点太偏僻了", "酒的味道一般", "你这个店的名字起得不好", "你家养的狗太可怕了"],
        answer: 3,
        why: "The neighbours go on to describe the dog barking and lunging at customers, so the reason is his frightening dog.",
      },
    ],
  },
  {
    id: "d-2012-2-53",
    source: "HSK 5 (A) 2012 (II) · 53–56",
    text: "老张夫妇晚上很少出门，但上星期六，太太对老张说：“电影院今晚有场好电影，我们去看好吗？”\n老张同意了，电影非常{{53}}，他们非常满意。\n晚上十一点，他们从电影院出来，钻进汽车，开始驾车回家。天很黑。这时，太太说：“看，一个高大结实的男人正在大街上追一个女人，女的可能有{{54}}，{{55}}。”\n老张说：“好的。”他慢慢把车开近那女人，说道：“你需要帮忙吗？”\n“不，谢谢，”女人答道，但她没有放慢速度，“我丈夫跟我在看完电影后，经常跑步回家，后到家的做{{56}}。”",
    blanks: [
      {
        number: 53,
        options: ["激烈", "精彩", "无聊", "生动"],
        answer: 1,
        why: "精彩 is the standard word for a great film and fits 他们非常满意; 无聊 contradicts their satisfaction.",
      },
      {
        number: 54,
        options: ["损失", "钱", "危险", "问题"],
        answer: 2,
        why: "A big man chasing a woman at night suggests she may be in danger (有危险).",
      },
      {
        number: 55,
        options: ["咱们去帮帮她吧", "我们快点走吧", "有点像你的同事小李", "给110打电话吧"],
        answer: 0,
        why: "Lao Zhang answers “好的” and drives up to ask if she needs help, so his wife suggested going to help her, not calling the police.",
      },
      {
        number: 56,
        options: ["作业", "事情", "家务", "健身"],
        answer: 2,
        why: "The couple race home and the loser does the housework (做家务); 做作业 is homework for students.",
      },
    ],
  },
  {
    id: "d-2012-2-57",
    source: "HSK 5 (A) 2012 (II) · 57–60",
    text: "可爱的大熊猫是动物园里最受欢迎的明星。很多小朋友以为大熊猫也是猫的一种，但实际上，科学家认为它跟熊才是真正的“{{57}}”呢，所以在台湾地区人们都叫它“猫熊”。大熊猫爱吃竹子是出了名的，高山地区的各种竹子它都爱吃，因此在当地又被称为“竹猫”。但是如果竹子全开花的话，熊猫就有{{58}}了，它就要{{59}}没有食物的危险。有时大熊猫也爱吃肉，尤其爱吃羊肉。大熊猫的力气可大啦，遇到老虎也不怕，真打起来的话，{{60}}。",
    blanks: [
      {
        number: 57,
        options: ["亲戚", "朋友", "对手", "敌人"],
        answer: 0,
        why: "Scientists consider pandas biologically related to bears, i.e. real relatives (亲戚), which is why they are called 猫熊.",
      },
      {
        number: 58,
        options: ["遗憾", "麻烦", "慌张", "糟糕"],
        answer: 1,
        why: "有麻烦了 means “to be in trouble”; 遗憾, 慌张 and 糟糕 are not used after 有 this way.",
      },
      {
        number: 59,
        options: ["改善", "光临", "面临", "控制"],
        answer: 2,
        why: "面临……的危险 means “to face the danger of”; none of the other verbs collocate with 危险.",
      },
      {
        number: 60,
        options: ["一般大熊猫会赢", "大熊猫会逃走", "大熊猫就会成为对手的食物", "大熊猫根本不占优势"],
        answer: 0,
        why: "The passage stresses the panda's great strength and that it isn't afraid of tigers, so in a real fight it usually wins.",
      },
    ],
  },

  // ───────────────────────── HSK 5 (A) 2012 (III) ─────────────────────────
  {
    id: "d-2012-3-46",
    source: "HSK 5 (A) 2012 (III) · 46–48",
    text: "一只狼出去找食物，找了半天都没有{{46}}。{{47}}经过一户人家，听见房中孩子哭闹，接着传来一位老太太的声音：“别哭啦，再不听话，就把你扔出去喂狼吃。”狼一听此言，心中大喜，便蹲在不远的地方等起来。太阳落山了，也没见老太婆把孩子扔出来。到了晚上，狼已经等得{{48}}了，正想冲进屋里，却又听老太太说：“宝贝，快睡吧，别怕，狼来了，咱们就把它砍死煮了吃。”狼听了，吓得迅速跑回家。同伴问它怎么了，它说：“别提了，坏老太太说话不算数，害得我饿了一天，不过幸好后来我跑得快。”\n别人开个玩笑，你就信以为真，完全不知许多时候人家只是在拿你说事。千万不要让别人的话改变了你的正常工作和生活。",
    blanks: [
      {
        number: 46,
        options: ["收获", "机会", "产品", "果实"],
        answer: 0,
        why: "没有收获 means searching produced no result; 果实 is literal fruit and 机会 doesn't fit 找食物.",
      },
      {
        number: 47,
        options: ["突然", "有时", "偶然", "居然"],
        answer: 2,
        why: "偶然经过 means it happened to pass by a house by chance; 居然 expresses surprise and 有时 suggests a repeated habit.",
      },
      {
        number: 48,
        options: ["不耐烦", "疯狂", "好奇", "恐怖"],
        answer: 0,
        why: "After waiting from sunset to night the wolf grew impatient (等得不耐烦了) and was about to rush in.",
      },
    ],
  },
  {
    id: "d-2012-3-49",
    source: "HSK 5 (A) 2012 (III) · 49–52",
    text: "曾参是孔子的学生，在他的家乡有一个同名同姓的人在外地杀了人，于是“曾参杀人”的消息就迅速传播开来。\n第一个向曾子的母亲报告情况的是一位邻居，那人没有亲眼看见，只是从别人那里得知杀人犯名叫曾参。曾子的母亲一直以自己的儿子为{{49}}，他是孔子的好学生，显然不会干这种事情。因此曾母听了邻居的话后，并没有慌张，一边干着手里的活儿，一边坚定地对邻居说：“{{50}}”\n没隔多久，又有一个人跑到曾子的母亲面前说：“曾参真的在外面杀了人。”曾子的母亲仍然很平静，什么都没说。\n又过了一会儿，第三个报信的人跑来对曾母说：“现在外面大家都在议论，都说你儿子的确杀了人。”曾母听到这里，心里一下子紧张起来。因为杀人是重罪，按照当地的{{51}}，她可能也要被抓起来，一辈子都失去{{52}}，于是她赶紧停下手中的工作，悄悄地爬墙跑了。",
    blanks: [
      {
        number: 49,
        options: ["宝贝", "骄傲", "自信", "能干"],
        answer: 1,
        why: "以……为骄傲 means “to be proud of”; her son is Confucius's good student, so she takes pride in him.",
      },
      {
        number: 50,
        options: ["他怎么会这么傻呢。", "他是他，我是我。", "我儿子现在怎么样？", "我的儿子是不会去杀人的。"],
        answer: 3,
        why: "She is calm and speaks firmly (坚定地) because she is sure her son would never kill anyone.",
      },
      {
        number: 51,
        options: ["习惯", "法律", "办法", "纪律"],
        answer: 1,
        why: "Being arrested for a relative's serious crime is a matter of the local law (法律); 纪律 is discipline within an organisation.",
      },
      {
        number: 52,
        options: ["民主", "权利", "财产", "自由"],
        answer: 3,
        why: "Being locked up for life means losing one's freedom (失去自由).",
      },
    ],
  },
  {
    id: "d-2012-3-53",
    source: "HSK 5 (A) 2012 (III) · 53–56",
    text: "一只狼掉到洞里去了，怎么跳也跳不出来。后来，一只老山羊走过来了，狼连忙装成狗向老山羊求救。羊觉得它不像狗。狼立刻装出一副又老实又可怜的模样，说：“请你相信，我{{53}}是狗，我还会摇尾巴，不信你瞧，我的尾巴摇得多好。”\n狼为了{{54}}自己的话，就拖着那条硬尾巴来摇了几下，把洞里的一些土块都敲打下来。羊慌忙后退了一步，说：“是的，你会摇尾巴。可是会摇尾巴的不一定都是狗。”\n狼有些不耐烦了：“没错儿，没错儿！快点儿吧！为了友谊，只要你伸下一条腿来，我马上就可以得救了。”\n羊还是有点儿犹豫，又往后退了一步：“不行，我得考虑考虑。”\n这时候，狼终于忍不住了，露出{{55}}，对羊大叫道：“你这老家伙！{{56}}”\n老山羊冷静地看了它一眼，慢慢地回答说：“什么也不干。”然后就离开了。",
    blanks: [
      {
        number: 53,
        options: ["的确", "其实", "毕竟", "始终"],
        answer: 0,
        why: "的确 (“really, truly”) insists on a claim, matching “请你相信”; 其实 introduces a contrast with what was assumed.",
      },
      {
        number: 54,
        options: ["对比", "证明", "补充", "承认"],
        answer: 1,
        why: "He wags his tail to prove (证明) what he said about being a dog.",
      },
      {
        number: 55,
        options: ["嘴", "牙", "眼睛", "尾巴"],
        answer: 1,
        why: "露出牙 (baring its teeth) shows the wolf's true fierce nature as it loses patience.",
      },
      {
        number: 56,
        options: ["你到底要干什么？", "你不想活了吧！", "真的认不出来了吗？", "求你帮帮我吧！"],
        answer: 0,
        why: "The goat's reply “什么也不干” answers the question “你到底要干什么？”.",
      },
    ],
  },
  {
    id: "d-2012-3-57",
    source: "HSK 5 (A) 2012 (III) · 57–60",
    text: "握手，是交际的一个部分。握手的力量、姿势与时间的长短往往能够表达出对对方的不同态度，给人留下不同{{57}}，我们也可通过握手了解对方的个性，从而赢得交际的{{58}}。需注意的是，戴着手套握手是极不礼貌的行为。男士在握手前应先脱下手套，摘下帽子。{{59}}，比如在严寒的室外双方都戴着手套、帽子，这时一般也应先说声：“对不起。”握手时双方互相微笑、问候，不要看第三者或显得注意力不{{60}}。除了关系亲近的人可以长久地把手握在一起外，一般握两三下就行，不要太用力，一般要将时间控制在三五秒钟以内。如果要表示自己的热情，也可较长时间握手，并上下摇晃几下。",
    blanks: [
      {
        number: 57,
        options: ["影响", "风格", "印象", "观念"],
        answer: 2,
        why: "给人留下……印象 is the fixed collocation for leaving an impression; 影响 is “influence”, not something you 留下 on a person this way.",
      },
      {
        number: 58,
        options: ["积极", "主动", "主观", "灵活"],
        answer: 1,
        why: "赢得主动 means to gain the initiative; 主动 can act as a noun here, while 积极 cannot.",
      },
      {
        number: 59,
        options: ["当然有些情况下也可以不脱", "冬天的时候怎么办呢", "然后才可以握手", "握手的季节也有讲究"],
        answer: 0,
        why: "The example that follows (both wearing gloves in the bitter cold, just say sorry) is an exception, so the blank says sometimes you need not take them off.",
      },
      {
        number: 60,
        options: ["专心", "仔细", "集中", "强烈"],
        answer: 2,
        why: "注意力集中 is the fixed collocation (concentrated attention); 专心 describes a person, not 注意力.",
      },
    ],
  },

  // ───────────────────────── HSK 5 (A) 2012 (IV) ─────────────────────────
  {
    id: "d-2012-4-46",
    source: "HSK 5 (A) 2012 (IV) · 46–49",
    text: "有个朋友非常善良，几乎没人见过他生气。有一次我去看他，却发现他正在顶楼上对着天上飞过来的飞机大喊大叫，我很{{46}}，就问他原因。\n他说：“我住的地方靠近机场，每当飞机起落时都会听到巨大的声音。后来，当我心情不好或是受了{{47}}，想要发脾气时，我就会跑上顶楼，等待飞机飞过，然后对着飞机放声大叫。等飞机飞走了，我的不快、怒气也被飞机一起带走了！”\n这时我才明白，{{48}}他脾气这么好，原来他知道如何减轻自己的{{49}}。",
    blanks: [
      {
        number: 46,
        options: ["怀疑", "害怕", "好奇", "佩服"],
        answer: 2,
        why: "Seeing a gentle friend shouting at planes makes the writer curious (好奇), which is why he asks the reason.",
      },
      {
        number: 47,
        options: ["困难", "委屈", "不安", "倒霉"],
        answer: 1,
        why: "受委屈 (to be wronged) is the fixed collocation with 受; 受困难 is not said.",
      },
      {
        number: 48,
        options: ["怪不得", "大概", "恐怕", "所以"],
        answer: 0,
        why: "怪不得……原来…… means “no wonder…, it turns out…”, the pattern used when the cause is finally understood.",
      },
      {
        number: 49,
        options: ["慌张", "压力", "疯狂", "体重"],
        answer: 1,
        why: "减轻压力 means to relieve stress, which is what shouting at the planes does for him.",
      },
    ],
  },
  {
    id: "d-2012-4-50",
    source: "HSK 5 (A) 2012 (IV) · 50–52",
    text: "一天晚上，孔子看书看得很晚，觉得有点儿饿，就叫来身边最得意的学生颜回，让他把晚上吃剩的那点饭再热一热。颜回把饭热好，刚走出厨房，谁知外面天气十分恶劣，狂风四起，碗里马上就落满了沙土。颜回十分不安，怎么能让敬爱的老师吃这样脏的东西呢？但倒掉又太{{50}}，粮食非常宝贵，颜回实在舍不得倒掉，打算自己把它吃了再给师傅做一碗。孔老夫子饿得受不了了，就起身出来想看个究竟，正好碰见颜回在吃自己的饭。孔子非常生气，就问他：“这是怎么回事？师傅的饭你也敢偷吃？”颜回委屈地说：“师傅，刚才狂风把沙土刮进碗里，给师傅吃是对您的不尊重，颜回{{51}}粮食就自己吃了。”\n孔子仔细一看全都明白了，十分惭愧地对颜回说：“是老师错了，看来这眼睛看到的都未必是真的，{{52}}”",
    blanks: [
      {
        number: 50,
        options: ["可惜", "遗憾", "严重", "烦恼"],
        answer: 0,
        why: "Throwing away food is a waste, i.e. 可惜, explained by 粮食非常宝贵; 遗憾 is regret about an outcome, not wastefulness.",
      },
      {
        number: 51,
        options: ["喜欢", "爱惜", "爱护", "宝贵"],
        answer: 1,
        why: "爱惜粮食 means cherishing food and not wasting it; 爱护 is for protecting people, animals or public property.",
      },
      {
        number: 52,
        options: ["也许是听来的。", "还不如听来的。", "什么是真的呢？", "何况是听来的呢？"],
        answer: 3,
        why: "何况 makes the a-fortiori point: if even what you see may be false, what you only hear is even less reliable.",
      },
    ],
  },
  {
    id: "d-2012-4-53",
    source: "HSK 5 (A) 2012 (IV) · 53–56",
    text: "有一天，动物园的管理员们发现猴子们跑出来了，于是开会{{53}}，一致认为是墙的高度过低，从而{{54}}猴子们逃了出来。所以他们决定将墙的高度由原来的4米加高到6米。谁知第二天，他们发现猴子们依旧能够跑到外面来，所以他们又决定再将高度加高到8米。\n然而，没料到第三天居然又看到猴子们全跑到外面，于是管理员们大为紧张，决定一不做二不休，{{55}}将高度加高到10米：“这下子看你们还能不能逃出来！”\n第四天，神了，猴子们还是跑了出来，而且，还在与它们的好朋友熊猫聊天呢。“你们看，这些人会不会把墙继续加高呢？”熊猫问。\n“很有可能，”猴子们说：“{{56}}”",
    blanks: [
      {
        number: 53,
        options: ["议论", "讨论", "决定", "评价"],
        answer: 1,
        why: "开会讨论 is holding a meeting to discuss a problem, which leads to 一致认为; 议论 suggests gossip or chatter.",
      },
      {
        number: 54,
        options: ["导致", "形成", "妨碍", "构成"],
        answer: 0,
        why: "导致 means “to lead to” a (bad) result: the low wall led to the monkeys escaping.",
      },
      {
        number: 55,
        options: ["故意", "索性", "尽量", "持续"],
        answer: 1,
        why: "索性 (“simply, might as well go all the way”) matches 一不做二不休, jumping straight to 10 metres.",
      },
      {
        number: 56,
        options: ["如果他们再继续忘记关门的话！", "你一定也很羡慕我们吧？", "人真是太蠢了！", "我们可没那么笨。"],
        answer: 0,
        why: "The joke is that the monkeys escape through an unlocked door, so the walls will keep growing if the keepers keep forgetting to close it.",
      },
    ],
  },
  {
    id: "d-2012-4-57",
    source: "HSK 5 (A) 2012 (IV) · 57–60",
    text: "日常生活中，人们虽然每天都刷牙，可是有相当一部分人不懂得刷牙的{{57}}，所以学会正确刷牙对{{58}}个人的卫生极为重要。刷牙的时候有两点需要特别注意：首先，刷牙的动作要轻，不要太用力，但要反复多次。牙的每个面都要刷到，特别是最靠后的牙，一定要把牙刷伸进去刷。每次刷完牙，如果不放心，还可以对着镜子看一看是否干净了，{{59}}才能保证刷牙的效果。其次，刷牙时最好采用温水（水温35℃左右的水）刷牙。如果长期用凉水刷牙，可能会使牙齿{{60}}缩短。",
    blanks: [
      {
        number: 57,
        options: ["规律", "问题", "风格", "学问"],
        answer: 3,
        why: "学问 here means the know-how or proper technique of brushing, which the passage then explains; 规律 is a natural law or regular pattern.",
      },
      {
        number: 58,
        options: ["保护", "完善", "保持", "维持"],
        answer: 2,
        why: "保持卫生 means keeping (personal) hygiene; 维持 is maintaining order or a situation, not hygiene.",
      },
      {
        number: 59,
        options: ["只有认真对待", "不干净的话", "只要刷得认真", "每天刷一次牙"],
        answer: 0,
        why: "The following 才 requires 只有……才……; 只要 pairs with 就, not 才.",
      },
      {
        number: 60,
        options: ["时间", "寿命", "功能", "过程"],
        answer: 1,
        why: "Cold water can shorten the teeth's life span (寿命缩短); 功能 is reduced (降低), not shortened.",
      },
    ],
  },

  // ───────────────────────── HSK 5 (A) 2012 (V) ─────────────────────────
  {
    id: "d-2012-5-46",
    source: "HSK 5 (A) 2012 (V) · 46–48",
    text: "有个老工人盖了一辈子的房子，一天，他对老板说自己想要退休了，要回家与妻子儿女{{46}}家庭的欢乐。\n老板舍不得他的好工人走，问他是否能帮忙再建一座房子，老工人犹豫了一会儿，终于答应了。但是大家后来都看得出来，他的心已不在工作上，为了追求速度，工作干得非常{{47}}。房子建好的时候，老板把大门的钥匙递给他。“这是你的房子，”他说，“我送给你的礼物。”老工人听到后，既{{48}}又后悔。",
    blanks: [
      {
        number: 46,
        options: ["承受", "制造", "享受", "度过"],
        answer: 2,
        why: "享受欢乐 means to enjoy happiness; 承受 is to bear something hard and 度过 goes with periods of time.",
      },
      {
        number: 47,
        options: ["马虎", "迫切", "刻苦", "激烈"],
        answer: 0,
        why: "His heart wasn't in it and he rushed for speed, so the work was careless (马虎); 刻苦 would mean diligent.",
      },
      {
        number: 48,
        options: ["平静", "惭愧", "悲观", "好奇"],
        answer: 1,
        why: "Learning the sloppy house is his own, he feels ashamed (惭愧) and regretful; 平静 contradicts 后悔.",
      },
    ],
  },
  {
    id: "d-2012-5-49",
    source: "HSK 5 (A) 2012 (V) · 49–52",
    text: "有一位皇帝特别爱骑马，愿意出一千两黄金购买一天能跑一千里的好马，然而时间过去了三年，始终没能买到，又过去了三个月，好不{{49}}发现了一匹千里马，当皇帝派人带着大量黄金去买的时候，马已经死了。谁都没想到的是，被派出去买马的人居然用五百两黄金把千里马的骨头买了回来。皇帝生气地说：“你为什么要{{50}}我的黄金？我要的是活马，你怎么花这么多钱弄一匹死马来呢？”\n这人回答道：“这样别人肯定会想：死马都舍得花五百两黄金买，{{51}}我们的这一{{52}}必然会引来天下人为你提供千里马。”果然，没过几天，就有人送来了三匹千里马。",
    blanks: [
      {
        number: 49,
        options: ["困难", "容易", "高兴", "宝贵"],
        answer: 1,
        why: "好不容易 is a fixed phrase meaning “with great difficulty, finally”, after three years of searching.",
      },
      {
        number: 50,
        options: ["罚", "换", "破坏", "浪费"],
        answer: 3,
        why: "The emperor thinks spending 500 taels on a dead horse wastes his gold (浪费).",
      },
      {
        number: 51,
        options: ["更何况活马呢？", "真是有钱！", "究竟有什么用呢？", "有必要吗？"],
        answer: 0,
        why: "死马都……, 更何况活马呢 is the “even X…, let alone Y” logic: people will expect even more for a live horse.",
      },
      {
        number: 52,
        options: ["动作", "观点", "行动", "借口"],
        answer: 2,
        why: "这一行动 refers to the deliberate act of buying the bones; 动作 is a physical movement.",
      },
    ],
  },
  {
    id: "d-2012-5-53",
    source: "HSK 5 (A) 2012 (V) · 53–56",
    text: "有一位女士非常害怕老鼠，看见老鼠就会全身{{53}}。有一天她看到一只老鼠竟然在自家的厨房地板上跑来跑去，她赶紧冲出屋子，搭上了公共汽车直奔商店。在那儿，她买了一只老鼠夹。店主告诉她：“放块肉在里面，很快你就会{{54}}那只老鼠的。”\n这位女士带着鼠夹回到家里，但她没有在家里找到肉。她不想再回到商店里去，因为已经很晚了。于是，她就从一份杂志中剪下一张牛肉的图片放进了夹子里。\n奇怪的是，这画有牛肉的图片竟然真的起{{55}}了！第二天早上，这位女士来到厨房时，发现鼠夹里{{56}}！",
    blanks: [
      {
        number: 53,
        options: ["发抖", "难受", "发愁", "发烧"],
        answer: 0,
        why: "全身发抖 (trembling all over) is the fear reaction; 发愁 is worrying and 发烧 is a fever.",
      },
      {
        number: 54,
        options: ["追到", "抓住", "受伤", "消失"],
        answer: 1,
        why: "A trap with meat in it lets you catch (抓住) the mouse.",
      },
      {
        number: 55,
        options: ["实用", "转变", "作用", "启发"],
        answer: 2,
        why: "起作用 is the fixed phrase “to take effect, to work”.",
      },
      {
        number: 56,
        options: ["照片不见了", "真的有一块牛肉", "只有一张照片", "多了一张画有老鼠的图片"],
        answer: 3,
        why: "The joke: a picture of beef “worked” and caught a picture of a mouse, matching 奇怪的是 and 真的起作用了.",
      },
    ],
  },
  {
    id: "d-2012-5-57",
    source: "HSK 5 (A) 2012 (V) · 57–60",
    text: "足球运动是一项古老的体育活动，历史{{57}}。中国古代的一种球类游戏经过阿拉伯人传到欧洲后，逐渐发展成为现代足球。直到1848年，足球运动的第一个文字形式的规则《剑桥规则》{{58}}产生。\n所谓的《剑桥规则》，是19世纪早期牛津大学和剑桥大学之间进行比赛时{{59}}的一些规则。在现代足球的规则中，{{60}}，原来当时在学校里每间宿舍住有10个学生和一位教师，所以他们就每方11人进行宿舍与宿舍之间的比赛。",
    blanks: [
      {
        number: 57,
        options: ["古老", "悠久", "长久", "丰富"],
        answer: 1,
        why: "历史悠久 is the fixed collocation for a long history; 古老 is already used earlier and does not follow 历史.",
      },
      {
        number: 58,
        options: ["已经", "就", "才", "便"],
        answer: 2,
        why: "直到……才…… means “not until”: written rules only appeared as late as 1848.",
      },
      {
        number: 59,
        options: ["制定", "称呼", "制作", "主张"],
        answer: 0,
        why: "制定规则 means to draw up rules; 制作 is for making physical objects.",
      },
      {
        number: 60,
        options: ["有很多跟《剑桥规则》有关", "有些内容并不合理", "有些内容很有意思", "为什么每队只允许11人上场呢"],
        answer: 3,
        why: "The sentence goes on with 原来 to explain the 10 students plus one teacher per dorm, which answers why each side has 11 players.",
      },
    ],
  },
];
