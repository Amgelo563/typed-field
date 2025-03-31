export type Storeable =
  | Record<symbol, unknown>
  | { set(k: symbol, v: unknown): unknown; get(k: symbol): unknown };

export function createTypedField<T>(description: string) {
  const key = Symbol(description);
  return {
    get<F extends boolean>(
      backingMap: Storeable,
      force?: F,
    ): F extends true ? T : T | undefined {
      let result;

      if ('get' in backingMap) {
        result = backingMap.get(key);
      } else {
        result = backingMap[key];
      }

      if (!result && force) {
        throw new Error(
          `Cannot get field "${description}", it has not been set.`,
        );
      }

      return result as F extends true ? T : T | undefined;
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
