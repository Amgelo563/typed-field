import { runCommonTests } from './common';

runCommonTests({
  storeFactory: () => new Map(),
  keyDescription: 'myField',
  testDescription: 'Map',
});
