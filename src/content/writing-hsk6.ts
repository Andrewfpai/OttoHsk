/**
 * New HSK 6 (HSK 3.0) writing. Part 1 is practical writing: a real-life
 * situation and the points the text must cover, at least 150 characters.
 * Part 2 is an opinion essay on a debatable question, at least 300 characters.
 * Original tasks worded like the official sample. Ids are stable.
 */
import type { WritingPrompt } from "./types";

export const writingHsk6: WritingPrompt[] = [
  // Part 1: practical writing (应用文), at least 150 characters.
  {
    id: "h6-w1-01",
    kind: "practical",
    prompt:
      "你是一家公司行政部的职员。公司定于下周五下午举行消防安全演习，要求全体员工参加。你需要在公司内部发布一则通知，内容包括演习的时间、集合地点、具体流程以及注意事项等。请根据要求，写一则通知，字数不少于150字。",
    english:
      "You work in the administration department of a company. The company has scheduled a fire safety drill for next Friday afternoon, and all staff must take part. You need to post an internal notice covering the time of the drill, the assembly point, how the drill will run, and what staff should pay attention to. Following these requirements, write a notice of at least 150 characters.",
    minChars: 150,
  },
  {
    id: "h6-w1-02",
    kind: "practical",
    prompt:
      "今年是你们高中毕业十周年，你负责组织一次同学聚会。你需要给老同学写一封邀请信，内容包括聚会的时间、地点、活动安排以及报名方式等。请根据要求，写一封邀请信，字数不少于150字。",
    english:
      "This year is the tenth anniversary of your high-school graduation, and you are organising a class reunion. You need to write a letter inviting your old classmates, covering the time and place of the reunion, the planned activities, and how to sign up. Following these requirements, write a letter of invitation of at least 150 characters.",
    minChars: 150,
  },
  {
    id: "h6-w1-03",
    kind: "practical",
    prompt:
      "上个月你在外地出差时突然生病，一位素不相识的出租车司机及时把你送到了医院，还帮你垫付了医药费。现在你已经康复，想给这位司机所在的出租车公司写一封感谢信，内容包括事情的经过、司机给你的帮助以及你的感激之情。请根据要求，写一封感谢信，字数不少于150字。",
    english:
      "Last month you suddenly fell ill while on a business trip, and a taxi driver you had never met got you to hospital in time and even paid your medical bill for you. Now that you have recovered, you want to write a letter of thanks to the taxi company the driver works for, covering what happened, how the driver helped you, and your gratitude. Following these requirements, write a thank-you letter of at least 150 characters.",
    minChars: 150,
  },
  {
    id: "h6-w1-04",
    kind: "practical",
    prompt:
      "你借了好朋友的相机去旅行，没想到在途中不小心把镜头摔坏了。你需要给朋友写一封信，内容包括事情的经过、你的歉意以及你打算怎样赔偿。请根据要求，写一封道歉信，字数不少于150字。",
    english:
      "You borrowed a good friend's camera for a trip and, without meaning to, dropped it on the way and broke the lens. You need to write to your friend, explaining what happened, apologising, and saying how you plan to make up for it. Following these requirements, write a letter of apology of at least 150 characters.",
    minChars: 150,
  },
  {
    id: "h6-w1-05",
    kind: "practical",
    prompt:
      "你在网上买了一台洗衣机，商家不但晚了一个星期才送货，而且安装后没多久洗衣机就出现了故障。你多次联系客服，问题却一直没有得到解决。你准备给商家写一封投诉信，内容包括事情的经过、你遇到的问题以及你希望得到的解决方式。请根据要求，写一封投诉信，字数不少于150字。",
    english:
      "You bought a washing machine online. Not only did the seller deliver it a week late, but it broke down soon after it was installed. You have contacted customer service several times, and the problem has still not been solved. You are going to write a letter of complaint to the seller, covering what happened, the problems you have had, and how you would like the matter resolved. Following these requirements, write a letter of complaint of at least 150 characters.",
    minChars: 150,
  },
  {
    id: "h6-w1-06",
    kind: "practical",
    prompt:
      "公司今年将选派几名员工到海外分公司参加为期三个月的培训，你很想参加。你打算给部门经理发一封电子邮件提出申请，内容包括你申请的理由、你具备的条件以及培训结束后你能为部门做出的贡献。请根据要求，写一封申请邮件，字数不少于150字。",
    english:
      "This year your company will send a few employees to an overseas branch for three months of training, and you are keen to go. You plan to email your department manager to apply, covering why you are applying, what makes you suitable, and what you can contribute to the department after the training. Following these requirements, write an application email of at least 150 characters.",
    minChars: 150,
  },
  {
    id: "h6-w1-07",
    kind: "practical",
    prompt:
      "你曾经指导过的一名学生正在申请出国读研究生，他请你为他写一封推荐信。推荐信的内容包括你和他的关系、他在学习和研究方面的能力、他的个人品质以及你推荐他的理由。请根据要求，写一封推荐信，字数不少于150字。",
    english:
      "A student you once supervised is applying for a master's degree abroad and has asked you to write him a letter of recommendation. The letter should cover your relationship with him, his ability in study and research, his personal qualities, and why you recommend him. Following these requirements, write a letter of recommendation of at least 150 characters.",
    minChars: 150,
  },
  {
    id: "h6-w1-08",
    kind: "practical",
    prompt:
      "你下个月就要出国留学了，打算把家里一些用不着的物品转让出去。你需要在网上发布一则转让信息，内容包括物品的名称、使用情况、转让价格以及联系方式和交易方式等。请根据要求，写一则转让信息，字数不少于150字。",
    english:
      "You are going abroad to study next month and plan to sell some things at home that you will no longer need. You need to post a listing online covering what the items are, what condition they are in, the asking prices, and how to contact you and complete the sale. Following these requirements, write a for-sale listing of at least 150 characters.",
    minChars: 150,
  },
  {
    id: "h6-w1-09",
    kind: "practical",
    prompt:
      "昨天晚上，你在下班回家的地铁上丢了一个背包，里面有一台笔记本电脑和一些重要的工作文件。你需要写一则寻物启事，内容包括丢失的时间和地点、背包的外观、包里的物品、你的联系方式以及对拾到者的酬谢等。请根据要求，写一则寻物启事，字数不少于150字。",
    english:
      "Last night you lost a backpack on the underground on your way home from work. Inside were a laptop and some important work documents. You need to write a lost-property notice covering when and where you lost it, what the backpack looks like, what was inside, how to contact you, and the reward for whoever finds it. Following these requirements, write a lost-property notice of at least 150 characters.",
    minChars: 150,
  },
  {
    id: "h6-w1-10",
    kind: "practical",
    prompt:
      "你所在的社区打算在重阳节举办一次关爱独居老人的活动，需要招募一批志愿者，由你负责撰写招募启事。启事的内容包括活动的时间和内容、对志愿者的要求以及报名方式等。请根据要求，写一则志愿者招募启事，字数不少于150字。",
    english:
      "Your neighbourhood is planning an event on the Double Ninth Festival to look after elderly people who live alone, and it needs to recruit volunteers. You are in charge of writing the call for volunteers, which should cover when the event is and what it involves, what is expected of volunteers, and how to sign up. Following these requirements, write a call for volunteers of at least 150 characters.",
    minChars: 150,
  },
  {
    id: "h6-w1-11",
    kind: "practical",
    prompt:
      "为了增强团队凝聚力，公司计划下个月组织全体员工开展一次户外拓展活动，领导让你负责策划。你需要写一份活动方案，内容包括活动的目的、时间和地点、具体安排以及经费预算等。请根据要求，写一份活动方案，字数不少于150字。",
    english:
      "To build team spirit, your company plans to take all its staff on an outdoor team-building day next month, and your manager has put you in charge of planning it. You need to write an event plan covering the purpose of the event, the time and place, the detailed programme, and the budget. Following these requirements, write an event plan of at least 150 characters.",
    minChars: 150,
  },
  {
    id: "h6-w1-12",
    kind: "practical",
    prompt:
      "你在网上买了一台扫地机器人，已经使用了一个多月。现在你想在购物网站上发表一则商品评价，内容包括你的使用感受、这款产品的优点和不足，以及你是否会把它推荐给别人。请根据要求，写一则商品评价，字数不少于150字。",
    english:
      "You bought a robot vacuum cleaner online and have been using it for over a month. Now you want to post a product review on the shopping site, covering your experience of using it, the product's strengths and weaknesses, and whether you would recommend it to others. Following these requirements, write a product review of at least 150 characters.",
    minChars: 150,
  },
  {
    id: "h6-w1-13",
    kind: "practical",
    prompt:
      "你刚刚结束了一次旅行，旅行期间在一家民宿住了三天。你打算在旅游网站上写一则点评，供其他游客参考，内容包括民宿的环境、服务、交通是否便利以及性价比等方面。请根据要求，写一则住宿点评，字数不少于150字。",
    english:
      "You have just come back from a trip, during which you stayed three nights at a guesthouse. You plan to write a review on a travel website for other travellers to refer to, covering the guesthouse's surroundings, its service, how convenient it is to get to, and its value for money. Following these requirements, write an accommodation review of at least 150 characters.",
    minChars: 150,
  },
  {
    id: "h6-w1-14",
    kind: "practical",
    prompt:
      "你刚刚加入一家公司，并被选为新员工代表，将在公司的入职欢迎会上发言。发言的内容包括简单的自我介绍、你对公司的初步印象以及今后的工作打算。请根据要求，写一篇发言稿，字数不少于150字。",
    english:
      "You have just joined a company and been chosen to speak for the new staff at the company's welcome event. The speech should include a brief introduction of yourself, your first impressions of the company, and your plans for your work ahead. Following these requirements, write a speech of at least 150 characters.",
    minChars: 150,
  },
  {
    id: "h6-w1-15",
    kind: "practical",
    prompt:
      "和你共事多年的王老师下个月就要退休了，学校将为他举办一场欢送会，你将代表全体同事致辞。致辞的内容包括回顾他多年来的贡献、表达大家对他的感谢以及对他退休生活的祝福。请根据要求，写一篇欢送词，字数不少于150字。",
    english:
      "Mr Wang, a teacher you have worked with for many years, retires next month. The school is holding a farewell party for him, and you will give a speech on behalf of all his colleagues. The speech should look back on what he has contributed over the years, express everyone's thanks to him, and wish him well in his retirement. Following these requirements, write a farewell speech of at least 150 characters.",
    minChars: 150,
  },
  {
    id: "h6-w1-16",
    kind: "practical",
    prompt:
      "你是某小区物业管理处的工作人员。由于小区的供水管道需要维修，下周二全天将暂停供水。你需要在小区公告栏张贴一则公告，内容包括停水的时间和范围、停水的原因、居民需要提前做的准备，并对给居民带来的不便表示歉意。请根据要求，写一则停水公告，字数不少于150字。",
    english:
      "You work in the property management office of a residential complex. Because the complex's water pipes need repairs, the water supply will be cut off all day next Tuesday. You need to put up an announcement on the complex's notice board covering when and where the water will be off, the reason, what residents should prepare in advance, and an apology for the inconvenience. Following these requirements, write an announcement of the water cut of at least 150 characters.",
    minChars: 150,
  },
  {
    id: "h6-w1-17",
    kind: "practical",
    prompt:
      "你在大学附近开了一家咖啡馆，因为生意越来越好，需要招聘两名兼职店员。你需要写一则招聘启事，内容包括工作内容、工作时间、对应聘者的要求、薪资待遇以及应聘方式等。请根据要求，写一则招聘启事，字数不少于150字。",
    english:
      "You run a café near a university, and as business keeps growing you need to hire two part-time staff. You need to write a job advertisement covering what the work involves, the working hours, what you require of applicants, the pay and benefits, and how to apply. Following these requirements, write a job advertisement of at least 150 characters.",
    minChars: 150,
  },
  {
    id: "h6-w1-18",
    kind: "practical",
    prompt:
      "你刚刚换了工作，新公司离现在的住处很远，因此你打算在公司附近租一套房子。你需要在租房网站上发布一则求租信息，内容包括你对房子的要求（如位置、面积、价格等）、计划入住的时间以及你的个人情况。请根据要求，写一则求租信息，字数不少于150字。",
    english:
      "You have just changed jobs, and the new company is a long way from where you live now, so you plan to rent a flat near the office. You need to post a \"flat wanted\" notice on a rental website, covering what you want in a flat (such as location, size and rent), when you plan to move in, and a little about yourself. Following these requirements, write a \"flat wanted\" notice of at least 150 characters.",
    minChars: 150,
  },
  {
    id: "h6-w1-19",
    kind: "practical",
    prompt:
      "你家附近的市图书馆正在向读者征求意见，以便改进服务。作为一名经常去那里的读者，你打算写一封建议信，内容包括你在使用过程中发现的问题以及你的改进建议。请根据要求，写一封建议信，字数不少于150字。",
    english:
      "The city library near your home is asking readers for feedback so that it can improve its service. As someone who goes there often, you plan to write a letter of suggestions, covering the problems you have noticed while using the library and your ideas for improving it. Following these requirements, write a letter of suggestions of at least 150 characters.",
    minChars: 150,
  },
  {
    id: "h6-w1-20",
    kind: "practical",
    prompt:
      "你的一位外国朋友下个月要来你所在的城市旅游，他写信请你给他一些建议。你打算给他回一封电子邮件，内容包括值得游览的地方、当地的特色美食以及旅途中需要注意的事项。请根据要求，写一封回信，字数不少于150字。",
    english:
      "A friend from abroad is coming to visit your city next month and has written to ask for your advice. You plan to reply by email, covering places worth visiting, the local specialities to eat, and things to watch out for on the trip. Following these requirements, write a reply of at least 150 characters.",
    minChars: 150,
  },

  // Part 2: opinion essay (议论文), at least 300 characters.
  {
    id: "h6-w2-01",
    kind: "opinion",
    prompt:
      "如今，人工智能已经能够帮人写文章、做翻译、解答问题，越来越多的学生和上班族开始依赖它。你认为人工智能会让人变得更聪明，还是会让人变得更懒惰？请就这个话题谈谈你的观点，字数不少于300字。",
    english:
      "Today artificial intelligence can write articles, translate and answer questions for people, and more and more students and office workers are coming to rely on it. Do you think AI will make people cleverer, or lazier? Give your views on this topic in at least 300 characters.",
    minChars: 300,
  },
  {
    id: "h6-w2-02",
    kind: "opinion",
    prompt:
      "过去，很多年轻人毕业后都想留在大城市打拼；如今，选择回到家乡发展的年轻人越来越多。你认为年轻人应该留在大城市，还是回到家乡发展？请就这个话题谈谈你的观点，字数不少于300字。",
    english:
      "In the past, many young people wanted to stay and make their way in a big city after graduating; today more and more are choosing to go back to their home towns to build their careers. Do you think young people should stay in big cities or go home? Give your views on this topic in at least 300 characters.",
    minChars: 300,
  },
  {
    id: "h6-w2-03",
    kind: "opinion",
    prompt:
      "随着网络技术的发展，网上课程越来越普及，有人认为它将来完全可以取代传统的课堂教学。你同意这种看法吗？请就这个话题谈谈你的观点，字数不少于300字。",
    english:
      "With the development of internet technology, online courses are becoming more and more widespread, and some people think they could one day completely replace traditional classroom teaching. Do you agree? Give your views on this topic in at least 300 characters.",
    minChars: 300,
  },
  {
    id: "h6-w2-04",
    kind: "opinion",
    prompt:
      "近几年，不少公司允许员工在家远程办公，这种工作方式既受到了欢迎，也引起了争议。你认为远程办公是利大于弊，还是弊大于利？请就这个话题谈谈你的观点，字数不少于300字。",
    english:
      "In recent years many companies have let their staff work remotely from home, a way of working that has been both welcomed and debated. Do you think remote working does more good than harm, or more harm than good? Give your views on this topic in at least 300 characters.",
    minChars: 300,
  },
  {
    id: "h6-w2-05",
    kind: "opinion",
    prompt:
      "在环境保护问题上，有人认为主要应该依靠政府和企业，个人的力量微不足道；也有人认为，环境保护必须从每个人做起。你怎么看待个人在环境保护中的作用？请就这个话题谈谈你的观点，字数不少于300字。",
    english:
      "When it comes to protecting the environment, some people think it is mainly up to governments and businesses and that what individuals can do is negligible; others think environmental protection has to start with each one of us. How do you see the role of the individual in protecting the environment? Give your views on this topic in at least 300 characters.",
    minChars: 300,
  },
  {
    id: "h6-w2-06",
    kind: "opinion",
    prompt:
      "短视频凭借内容短小、节奏快的特点，占据了人们大量的碎片时间。有人认为它丰富了人们的生活，也有人担心它会让人失去深度思考的能力。你认为短视频给人们带来的影响是积极的还是消极的？请就这个话题谈谈你的观点，字数不少于300字。",
    english:
      "Because they are short and fast-paced, short videos have taken over much of people's spare moments. Some think they enrich people's lives; others worry that they will make people lose the ability to think deeply. Do you think the influence of short videos on people is positive or negative? Give your views on this topic in at least 300 characters.",
    minChars: 300,
  },
  {
    id: "h6-w2-07",
    kind: "opinion",
    prompt:
      "随着社会的发展，不少传统节日的习俗正在逐渐淡化，一些年轻人反而对“洋节”更感兴趣。有人认为这是时代发展的必然，也有人认为应该努力保护和传承传统节日文化。你怎么看？请就这个话题谈谈你的观点，字数不少于300字。",
    english:
      "As society develops, the customs of many traditional festivals are gradually fading, while some young people are more interested in \"foreign festivals\" instead. Some think this is an inevitable result of the times; others think we should work hard to protect and pass on the culture of traditional festivals. What do you think? Give your views on this topic in at least 300 characters.",
    minChars: 300,
  },
  {
    id: "h6-w2-08",
    kind: "opinion",
    prompt:
      "不少年轻人为了事业经常加班熬夜，认为“趁年轻就该拼一把”；也有人认为，无论什么时候都应该把健康放在第一位，保持工作和生活的平衡。你更赞同哪种观点？请就这个话题谈谈你的观点，字数不少于300字。",
    english:
      "Many young people often work late into the night for the sake of their careers, believing that \"you should go all out while you're young\"; others think health should always come first and that work and life should be kept in balance. Which view do you agree with more? Give your views on this topic in at least 300 characters.",
    minChars: 300,
  },
  {
    id: "h6-w2-09",
    kind: "opinion",
    prompt:
      "在现代社会，人们常常用收入和社会地位来衡量一个人是否成功。你认为这样的标准合理吗？什么才是真正的成功？请就这个话题谈谈你的观点，字数不少于300字。",
    english:
      "In modern society people often judge whether someone is successful by their income and social status. Do you think this standard is reasonable? What is real success? Give your views on this topic in at least 300 characters.",
    minChars: 300,
  },
  {
    id: "h6-w2-10",
    kind: "opinion",
    prompt:
      "“不能让孩子输在起跑线上”，抱着这样的想法，许多父母从孩子很小的时候起就给他们报各种兴趣班和辅导班。你认为这种做法对孩子的成长是有利还是有害？请就这个话题谈谈你的观点，字数不少于300字。",
    english:
      "\"Don't let your child lose at the starting line\": with this idea in mind, many parents sign their children up for all kinds of hobby classes and tutoring from a very young age. Do you think this helps or harms children as they grow up? Give your views on this topic in at least 300 characters.",
    minChars: 300,
  },
  {
    id: "h6-w2-11",
    kind: "opinion",
    prompt:
      "在学习和工作中，有人认为竞争最能激发一个人的潜力，也有人认为合作比竞争更重要。对于个人的成长来说，你认为竞争和合作哪个更重要？请就这个话题谈谈你的观点，字数不少于300字。",
    english:
      "In study and at work, some people think competition does most to bring out a person's potential, while others think cooperation matters more than competition. For a person's growth, which do you think matters more, competition or cooperation? Give your views on this topic in at least 300 characters.",
    minChars: 300,
  },
  {
    id: "h6-w2-12",
    kind: "opinion",
    prompt:
      "人们常说“失败是成功之母”，但也有人认为“成功才是成功之母”，因为一次次的成功能给人带来自信和动力。你更同意哪种说法？请就这个话题谈谈你的观点，字数不少于300字。",
    english:
      "People often say \"failure is the mother of success\", but others believe \"success is the mother of success\", because success after success gives people confidence and drive. Which saying do you agree with more? Give your views on this topic in at least 300 characters.",
    minChars: 300,
  },
  {
    id: "h6-w2-13",
    kind: "opinion",
    prompt:
      "如今，很多手机应用都会收集用户的个人信息，以便提供更加个性化的服务。你认为为了生活上的便利而让出一部分个人隐私，值得吗？请就这个话题谈谈你的观点，字数不少于300字。",
    english:
      "Nowadays many mobile apps collect users' personal information in order to offer more personalised services. Do you think it is worth giving up some of your privacy for the sake of convenience in daily life? Give your views on this topic in at least 300 characters.",
    minChars: 300,
  },
  {
    id: "h6-w2-14",
    kind: "opinion",
    prompt:
      "有人认为，动物园有助于保护珍稀动物，也能让人们更好地了解自然；也有人认为，把动物关在笼子里供人观赏是不人道的。你认为动物园还有存在的必要吗？请就这个话题谈谈你的观点，字数不少于300字。",
    english:
      "Some people think zoos help protect rare animals and let people understand nature better; others think keeping animals in cages for people to look at is inhumane. Do you think zoos still need to exist? Give your views on this topic in at least 300 characters.",
    minChars: 300,
  },
  {
    id: "h6-w2-15",
    kind: "opinion",
    prompt:
      "每到节假日，各大热门景区都人山人海，不仅游客的体验很差，景区的环境也受到了破坏。有人建议通过限制游客数量或提高门票价格来解决这一问题。你认为这种做法合理吗？请就这个话题谈谈你的观点，字数不少于300字。",
    english:
      "Every holiday the popular tourist sites are packed with crowds: visitors have a poor experience, and the sites themselves are damaged. Some suggest solving this by limiting visitor numbers or raising ticket prices. Do you think this is reasonable? Give your views on this topic in at least 300 characters.",
    minChars: 300,
  },
  {
    id: "h6-w2-16",
    kind: "opinion",
    prompt:
      "借助信用卡和各种网络贷款，“先消费、后还钱”的超前消费方式在年轻人中越来越流行。你认为超前消费是一种合理的生活方式，还是一种潜在的风险？请就这个话题谈谈你的观点，字数不少于300字。",
    english:
      "With credit cards and all kinds of online loans, \"spend now, pay later\" consumption is becoming more and more popular among young people. Do you think spending ahead of your income is a reasonable way of life, or a hidden risk? Give your views on this topic in at least 300 characters.",
    minChars: 300,
  },
  {
    id: "h6-w2-17",
    kind: "opinion",
    prompt:
      "中国人常说“读万卷书，行万里路”，意思是既要多读书，也要多出去走走、看看。对于一个人的成长来说，你认为读书更重要，还是旅行更重要？请就这个话题谈谈你的观点，字数不少于300字。",
    english:
      "Chinese people often say \"read ten thousand books, travel ten thousand miles\", meaning that one should both read widely and get out to see the world. For a person's growth, do you think reading or travelling matters more? Give your views on this topic in at least 300 characters.",
    minChars: 300,
  },
  {
    id: "h6-w2-18",
    kind: "opinion",
    prompt:
      "随着人口老龄化的加剧，养老问题越来越受到社会的关注。有人认为老人住进养老院能得到更专业的照顾，也有人认为老人还是在家里由子女照顾更好。你认为哪种养老方式更好？请就这个话题谈谈你的观点，字数不少于300字。",
    english:
      "As the population ages, care for the elderly is drawing more and more public attention. Some think older people get more professional care in a care home; others think it is better for them to stay at home and be looked after by their children. Which way of caring for the elderly do you think is better? Give your views on this topic in at least 300 characters.",
    minChars: 300,
  },
  {
    id: "h6-w2-19",
    kind: "opinion",
    prompt:
      "在选择职业时，有人看重个人兴趣，认为只有喜欢才能做好；也有人更看重收入和发展前景。你认为选择职业时应该优先考虑什么？请就这个话题谈谈你的观点，字数不少于300字。",
    english:
      "When choosing a career, some people put personal interest first, believing you can only do a job well if you like it; others care more about income and prospects. What do you think should come first when choosing a career? Give your views on this topic in at least 300 characters.",
    minChars: 300,
  },
  {
    id: "h6-w2-20",
    kind: "opinion",
    prompt:
      "微信等社交软件让人们随时随地都能保持联系，但也有人发现，朋友之间面对面交流的机会越来越少，感情反而变淡了。你认为网络社交让人与人之间的距离变得更近了，还是更远了？请就这个话题谈谈你的观点，字数不少于300字。",
    english:
      "Social apps such as WeChat let people stay in touch anytime and anywhere, yet some find that friends have fewer and fewer chances to talk face to face, and that their friendships have actually grown weaker. Do you think online social networking has brought people closer together, or pushed them further apart? Give your views on this topic in at least 300 characters.",
    minChars: 300,
  },
];
