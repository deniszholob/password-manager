import { PathLike } from 'fs';

export interface MyFile {
  path: PathLike;
  data: string;
}

export interface ElectronResult<T> {
  success: boolean;
  data: T;
}
