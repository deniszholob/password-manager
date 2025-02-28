export interface FileDisplayI {
  path: string;
  displayAs: string;
}

export class FileDisplay implements FileDisplayI {
  constructor(
    public path: string,
    public displayAs: string = FileDisplay.displayAsFromPath(path) // default displayAs to be the file name if not provided in the constructor
  ) {}

  public static displayAsFromPath(path: string): string {
    return path.split('/').pop()?.split('.')[0] ?? path;
  }

  public static fromPath(path: string): FileDisplay {
    return new FileDisplay(path);
  }
}

// export function filePathToFileDisplay(path: string): FileDisplayI {
//   return {
//     path,
//     displayAs: path.split('/').pop()?.split('.')[0] ?? path,
//   };
// }
