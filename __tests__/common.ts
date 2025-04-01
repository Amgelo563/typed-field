import { describe, expect, test } from 'vitest';
import { createTypedField, type Storeable } from '../src';

export function runCommonTests(options: {
  storeFactory: (this: void) => Storeable;
  keyDescription: string;
  testDescription: string;
}) {
  const { storeFactory, keyDescription, testDescription } = options;

  describe(testDescription, () => {
    test('GIVEN a store THEN it can save', () => {
      const field = createTypedField<number>(keyDescription);
      const store = storeFactory();

      expect(() => field.set(store, 42)).not.toThrow();
    });

    test('GIVEN a non set store THEN it returns undefined', () => {
      const field = createTypedField<number>(keyDescription);
      const store = storeFactory();

      expect(field.get(store)).toBe(undefined);
    });

    test('GIVEN a store with a saved value THEN getting returns that same value', () => {
      const field = createTypedField<number>(keyDescription);
      const store = storeFactory();

      field.set(store, 42);

      expect(field.get(store)).toBe(42);
    });

    test("GIVEN a store and two fields of the same description, THEN they don't collide", () => {
      const store = storeFactory();
      const field1 = createTypedField<number>(keyDescription);
      const field2 = createTypedField<number>(keyDescription);

      field1.set(store, 42);
      const result2 = field2.get(store);

      expect(result2).toBe(undefined);
    });

    test('GIVEN an empty store and a forced get, THEN it throws', () => {
      const store = storeFactory();
      const field = createTypedField<number>(keyDescription);

      expect(() => field.get(store, true)).toThrow();
    });

    test('GIVEN a non empty store and a forced get, THEN it does not throw', () => {
      const store = storeFactory();
      const field = createTypedField<number>(keyDescription);

      field.set(store, 0);

      expect(() => field.get(store, true)).not.toThrow();
    });
  });
}
