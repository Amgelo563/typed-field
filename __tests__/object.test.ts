import { runCommonTests } from './common';

runCommonTests({
  storeFactory: () => Object.create(null),
  keyDescription: 'myField',
  testDescription: 'Object',
});
