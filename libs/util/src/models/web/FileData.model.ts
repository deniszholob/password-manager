import { Entry } from './entry/entry.model';
import { FileDisplay } from './file-display/file-display.model';

export interface FileData extends FileDisplay {
  entries: Entry[];
}

// TODO: Replace above type with this..
// export interface FileData {
//   version: number;
//   entries: Entry[];
// }

export const DEFAULT_DATA_KEY = 'p0394ujmsaiordjghsli8ey50seop95j7h6ybo9eu';
