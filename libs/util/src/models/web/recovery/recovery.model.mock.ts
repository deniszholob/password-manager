// import { faker } from '@faker-js/faker';

import { Recovery } from './recovery.model';

// ===== Simple Mock ====== //
export const MOCK_Recovery: Recovery = {
  question: 'What is your favorite color?',
  answer: 'Blue. No yel-- Auuuuuuuugh!',
};

export const MOCK_Recovery_Array: Recovery[] = [MOCK_Recovery];

// ===== Advanced Mock with https://v9.fakerjs.dev/api/ ====== //
// export function createMock_Recovery(): Recovery {
//   return {
//     question: faker.lorem.sentence(),
//     answer: faker.lorem.word(),
//   };
// }

// export function createMock_Recovery_Array(count: number): Recovery[] {
//   return faker.helpers.multiple(createMock_Recovery, { count });
// }

// export const MOCK_Recovery: Recovery = createMock_Recovery();
// export const MOCK_Recovery_Array: Recovery[] = createMock_Recovery_Array(5);
