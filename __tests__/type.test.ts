import { describe, expectTypeOf, test } from 'vitest';
import type { TypedField } from '../src';
import { createTypedField } from '../src';

describe('Types', () => {
  test('GIVEN a field with a type THEN set() only accepts that type', () => {
    const field = createTypedField<string>('myField');
    expectTypeOf(field.set).parameter(1).toExtend<string>();
  });

  test('GIVEN a store with a type THEN get() returns that type', () => {
    const field = createTypedField<string>('myField');
    expectTypeOf(field.get).returns.toExtend<string | undefined>();
  });

  test('GIVEN a field with a type THEN a forced get returns that type and not undefined', () => {
    const field = createTypedField<string>('myField');
    expectTypeOf(field.get<true>).returns.toExtend<string>();
  });

  test('GIVEN a field with a type THEN it matches TypedField<T>', () => {
    const field = createTypedField<string>('myField');
    expectTypeOf(field).toExtend<TypedField<string>>();
  });
});
