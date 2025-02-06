// import { faker } from '@faker-js/faker';

import { MOCK_Recovery_Array } from '../recovery/recovery.model.mock';
import { Entry } from './entry.model';

// ===== Simple Mock ====== //
export const MOCK_Entry: Entry = {
  guid: 'bc2faa78-2831-47aa-ab23-d5bd00260ee4',
  serviceName: `Mock Service`,
  email: 'mock-account@mock-email.com',
  password: 'mock-password',
  username: 'mock-username',
  serviceUrl: 'https://mock-service.com',
  recovery: [...MOCK_Recovery_Array],
  tags: ['mock-tag'],
  notes: 'This is a mock note',
  usedTimes: 0,
};

export const MOCK_Entry_Array: Entry[] = [MOCK_Entry];

// ===== Advanced Mock with https://v9.fakerjs.dev/api/ ====== //
// export function createMock_Entry(): Entry {
//   return {
//     guid: faker.string.uuid(),
//     serviceName: faker.company.name(),
//     email: faker.datatype.boolean() ? faker.internet.email() : undefined,
//     password: faker.internet.password(),
//     username: faker.internet.username(),
//     serviceUrl: faker.datatype.boolean() ? faker.internet.url() : undefined,
//     recovery: faker.datatype.boolean() ? [...MOCK_Recovery_Array] : undefined,
//     tags: faker.datatype.boolean()
//       ? faker.helpers.multiple(faker.lorem.word, { count: 3 }).sort()
//       : undefined,
//     notes: faker.datatype.boolean() ? faker.lorem.lines() : undefined,
//     usedTimes: faker.number.int(),
//     iconSrc: faker.datatype.boolean()
//       ? faker.helpers.enumValue(IconSrcOptions)
//       : undefined,
//   };
// }

// export function createMock_Entry_Array(count: number): Entry[] {
//   return faker.helpers.multiple(createMock_Entry, { count });
// }

// export const MOCK_Entry: Entry = createMock_Entry();
// export const MOCK_Entry_Array: Entry[] = createMock_Entry_Array(5);

// console.log(`MOCK_Entry`, MOCK_Entry);
// console.log(`MOCK_Entry_Array`, MOCK_Entry_Array);
