// import { faker } from '@faker-js/faker';

import { Entry, MOCK_Entry } from '../models/web';
import { Store } from './store.class';

// ===== Simple Mock ====== //
export const MOCK_Store: Store<Entry> = new Store<Entry>(MOCK_Entry);

export const MOCK_Store_Array: Store<Entry>[] = [MOCK_Store];

// ===== Advanced Mock with https://v9.fakerjs.dev/api/ ====== //
// export function createMock_Store(): Store {
//   return {
//     id: faker.string.uuid(),
//   };
// }

// export function createMock_Store_Array(count: number): Store[] {
//   return faker.helpers.multiple(createMock_Store, { count });
// }

// export const MOCK_Store: Store = createMock_Store();
// export const MOCK_Store_Array: Store[] = createMock_Store_Array(5);
