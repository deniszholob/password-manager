export interface FileDisplay {
  path: string;
  displayAs: string;
}

export function filePathToFileDisplay(path: string): FileDisplay {
  return {
    path,
    displayAs: path.split('/').pop()?.split('.')[0] ?? path,
  };
}
