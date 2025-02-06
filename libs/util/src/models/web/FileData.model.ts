import { Entry } from './entry/entry.model';

export interface MyDataFile {
  entries: FileData;
  path: string;
}

export type FileData = Entry[];

// TODO: Replace above type with this..
// export interface FileData {
//   version: number;
//   entries: Entry[];
// }

export const DEFAULT_DATA_KEY = 'p0394ujmsaiordjghsli8ey50seop95j7h6ybo9eu';
