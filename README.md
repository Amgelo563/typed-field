# 📦 `typed-field`

[![Build Status](https://img.shields.io/github/actions/workflow/status/Amgelo563/typed-field/build.yml?style=for-the-badge&logo=github)](https://github.com/Amgelo563/typed-field/actions/workflows/build.yml)
[![Test Status](https://img.shields.io/github/actions/workflow/status/Amgelo563/typed-field/test.yml?style=for-the-badge&logo=vitest&label=Tests)](https://github.com/Amgelo563/typed-field/actions/workflows/test.yml)
[![View on NPM](https://img.shields.io/badge/View%20on-NPM-c60000?style=for-the-badge&logo=npm&logoColor=ffffff)](https://www.npmjs.com/package/typed-field)
[![Built with Typescript](https://img.shields.io/badge/Built%20with-Typescript-3176C6?style=for-the-badge&logo=typescript&logoColor=3178C6)](https://www.typescriptlang.org/)

A simple TypeScript library to create type safe field accessors/mutators in an unknown store.

Sometimes you may want to store data in a store that is inherently unknown, in a safe way and without type assertions. This library lets you create an object that will keep a unique key for a given field, and set/get from your store with that key, safely.

## Usage

The library exports a single function, `createTypedField`:

```ts
import { createTypedField } from 'typed-field';

// Compatible with records and map-like objects.
declare const unknownStore:
  | Record<symbol, unknown>
  | { set(k: symbol, v: unknown): unknown; get(k: symbol): unknown };

// "myField" is a description for the underlying symbol key,
// fields with the same description won't collide.
const field = createTypedField<number>('myField');

field.set(unknownObjectStore, 42);
field.set(unknownObjectStore, null);
//                            ^^^^
// Argument of type 'null' is not assignable to parameter of type 'number'.

const wrongType: string = field.get(unknownObjectStore);
//    ^^^^^^^^^
// Type 'string' is not assignable to type 'number | undefined'.

const correct = field.get(unknownObjectStore);
//    ^? - const correct: number | undefined

// Throws an error if the field has not been set (is undefined).
const forced = field.get(unknownObjectStore, true);
//    ^? - const forced: number
```
