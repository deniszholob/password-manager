// import { faker } from '@faker-js/faker';

import { FileDisplay, filePathToFileDisplay } from './file-display.model';

// ===== Simple Mock ====== //
// export const MOCK_FileDisplay: FileDisplay = {
//   path: 'string',
//   displayAs: 'string',
// };

// export const MOCK_FileDisplay_Array: FileDisplay[] = [MOCK_FileDisplay];

// ===== Advanced Mock with https://v9.fakerjs.dev/api/ ====== //
// export function createMock_FileDisplay(): FileDisplay {
//   return {
//     id: faker.string.uuid(),
//   };
// }

// export function createMock_FileDisplay_Array(count: number): FileDisplay[] {
//   return faker.helpers.multiple(createMock_FileDisplay, { count });
// }

// export const MOCK_FileDisplay: FileDisplay = createMock_FileDisplay();
// export const MOCK_FileDisplay_Array: FileDisplay[] = createMock_FileDisplay_Array(5);

export const MOCK_FileDisplay: FileDisplay =
  filePathToFileDisplay('/file3.json');
export const MOCK_FileDisplay_Array: FileDisplay[] = [
  'mnt/9q3409q/folder/file.2.json',
  'src/file1.json',
  '/file3.json',
].map(filePathToFileDisplay);
