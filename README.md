# 📦 `typed-field`

A simple TypeScript library to create type safe field accessors/mutators in an unknown store.

Sometimes you may want to store data in a store that is inherently unknown, in a safe way and without type assertions. This library lets you create an object that will keep a unique key for a given field, and set/get from your store with that key, safely.

## Usage

The library exports a single function, `createTypedField`:

```ts
import { createTypedField } from 'typed-field';

declare const unknownStore:
  | Record<symbol, unknown>
  | Map<symbol, unknown>
  | WeakMap<symbol, unknown>;

// "myField" is a description for the underlying symbol key,
// fields with the same description won't collide.
const field = createTypedField<number>('myField');

field.set(unknownObjectStore, 42);
field.set(unknownObjectStore, null);
//                            ^^^^
// Argument of type 'null' is not assignable to parameter of type 'number'.

const wrongType: string = field.get(unknownObjectStore);
//    ^^^^^^^^^
// Type 'string' is not assignable to type 'number | null'.

const correct = field.get(unknownObjectStore);
//    ^? - const correct: number | null
```
