/** The id a question inside a set or passage is stored under: "<parent id>#<index or number>". */
export function questionId(parentId: string, index: number): string {
  return `${parentId}#${index}`;
}
