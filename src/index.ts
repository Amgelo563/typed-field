export type Storeable =
  | Record<symbol, unknown>
  | Map<symbol, unknown>
  | WeakMap<symbol, unknown>;

export function createTypedField<T>(description: string) {
  const key = Symbol(description);
  return {
    get(backingMap: Storeable): T | undefined {
      let result = null;

      if (backingMap instanceof Map || backingMap instanceof WeakMap) {
        result = backingMap.get(key);
      } else {
        result = backingMap[key];
      }

      return result as T | undefined;
    },
    set(backingMap: Storeable, val: T): void {
      if (backingMap instanceof Map || backingMap instanceof WeakMap) {
        backingMap.set(key, val);
      } else {
        backingMap[key] = val;
      }
    },
  };
}
