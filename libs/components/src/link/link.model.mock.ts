// import { faker } from '@faker-js/faker';

import { HyperLink } from './link.model';

// ===== Simple Mock ====== //
export const MOCK_HyperLink: HyperLink = {
  name: 'Google',
  url: 'https://google.com',
  title: 'Google Search',
  icon: 'fab fa-google',
};

export const MOCK_HyperLink_Array: HyperLink[] = [MOCK_HyperLink];

// ===== Advanced Mock with https://v9.fakerjs.dev/api/ ====== //
// export function createMock_HyperLink(): HyperLink {
//   return {
//     id: faker.string.uuid(),
//   };
// }

// export function createMock_HyperLink_Array(count: number): HyperLink[] {
//   return faker.helpers.multiple(createMock_HyperLink, { count });
// }

// export const MOCK_HyperLink: HyperLink = createMock_HyperLink();
// export const MOCK_HyperLink_Array: HyperLink[] = createMock_HyperLink_Array(5);
