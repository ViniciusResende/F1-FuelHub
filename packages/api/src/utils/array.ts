export function dedupeBy<T>(
  list: T[],
  keyFn: (item: T) => string | number
): T[] {
  const seen = new Set<string | number>();
  return list.filter((item) => {
    const key = keyFn(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
