/**
 * Words so close in meaning that no sentence tells them apart: 立即 and 立刻
 * both fit any blank the other fits. A question never offers two of a group
 * as options, or it would have two right answers. Collected from the
 * reviews of the test sentences; a word missing from both levels' lists is
 * simply never an option.
 */
export const SYNONYM_GROUPS: readonly (readonly string[])[] = [
  ["立即", "立刻", "马上"],
  ["如何", "怎样", "怎么样"],
  ["确定", "肯定"],
  ["缺乏", "缺少"],
  ["似乎", "好像", "仿佛"],
  ["赶快", "赶紧", "连忙", "急忙"],
  ["忽然", "突然"],
  ["始终", "一直", "一向", "一贯", "向来", "历来"],
  ["制定", "制订"],
  ["总共", "一共", "共计"],
  ["因而", "因此", "所以"],
  ["不见得", "未必"],
  ["调皮", "淘气"],
  ["幢", "栋"],
  ["往常", "以往", "平常", "平时"],
  ["惊奇", "惊讶", "诧异"],
  ["推测", "推断"],
  ["抵达", "到达"],
  ["处置", "处理"],
  ["过失", "失误"],
  ["原先", "原来", "起初", "当初"],
  ["当前", "目前"],
  ["启程", "起程", "动身", "出发"],
  ["埋怨", "抱怨"],
  ["谅解", "原谅"],
  ["请帖", "请柬"],
  ["依旧", "仍旧", "依然", "仍然"],
  ["疲倦", "疲惫", "疲劳"],
  ["弊病", "弊端"],
  ["叮嘱", "嘱咐"],
  ["恰巧", "正巧", "恰好", "刚好"],
  ["私自", "擅自"],
  ["次序", "顺序"],
  ["譬如", "比如", "例如"],
  ["谦逊", "谦虚"],
  ["鉴别", "辨别", "识别"],
  ["及早", "尽早", "尽快"],
  ["的确", "确实"],
  ["或许", "也许"],
  ["显然", "明显"],
  ["节省", "节约"],
  ["振动", "震动"],
  ["请求", "要求"],
  ["特征", "特点"],
  ["倒闭", "破产"],
  ["在意", "在乎"],
  ["情形", "情况"],
  ["忽略", "忽视"],
  ["索性", "干脆"],
  ["宁肯", "宁可", "宁愿"],
  ["混浊", "浑浊"],
  ["兴隆", "兴旺"],
  ["雇佣", "雇用"],
  ["通讯", "通信"],
  ["暂且", "暂时"],
  ["大体", "大概", "大致"],
];

const groupOf = new Map<string, number>();
SYNONYM_GROUPS.forEach((group, i) => group.forEach((w) => groupOf.set(w, i)));

/** Whether two words are in the same synonym group. */
export function areSynonyms(a: string, b: string): boolean {
  const ga = groupOf.get(a);
  return ga !== undefined && ga === groupOf.get(b);
}
