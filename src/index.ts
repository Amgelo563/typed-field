export type Storeable =
  | Record<symbol, unknown>
  | { set(k: symbol, v: unknown): unknown; get(k: symbol): unknown };

export function createTypedField<T>(description: string) {
  const key = Symbol(description);
  return {
    get(backingMap: Storeable): T | undefined {
      let result = null;

      if ('get' in backingMap) {
        result = backingMap.get(key);
      } else {
        result = backingMap[key];
      }

      return result as T | undefined;
    },
    set(backingMap: Storeable, val: T): void {
      if ('set' in backingMap) {
        backingMap.set(key, val);
      } else {
        backingMap[key] = val;
      }
    },
  };
}
