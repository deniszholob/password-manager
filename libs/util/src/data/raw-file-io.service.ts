// TODO: File IO just return/accept strings? Do JSON.parse/JSON/stringify in whatever uses this (state.service) instead?
import { Inject, Injectable } from '@angular/core';
import { from, fromEvent, Observable, of, throwError } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import {
  FILE_ENCODING,
  SETTINGS_NAME,
  SETTINGS_NAME_DEV,
} from '../files.const';
import { ElectronWindow, ElectronWindowApi, MyFile } from '../models/electron';
import { ERRORS } from './errors';
import { mockSavedFile, mockSettings } from './mock.data';
import { ENV_CONFIG, EnvironmentConfig } from '../injection-tokens.const';
import { FileDisplay } from '../models/web';

const WEB_FILE_NAME = 'local';
const WEB_SETTINGS_NAME = 'settings';

/** Do not use directly in components, user DataService instead */
@Injectable({ providedIn: 'root' })
export class RawFileIOService {
  public readonly settingFile: FileDisplay;
  private electron: ElectronWindowApi | null = null;

  public get isElectron(): boolean {
    return !!this.electron;
  }

  constructor(@Inject(ENV_CONFIG) private environment: EnvironmentConfig) {
    this.settingFile = FileDisplay.fromPath(WEB_SETTINGS_NAME);
    this.electron = (window as unknown as ElectronWindow).electron;
    if (this.electron) {
      const settingName = this.environment.production
        ? SETTINGS_NAME
        : SETTINGS_NAME_DEV;
      this.settingFile = FileDisplay.fromPath(
        this.electron.homeFile(settingName)
      );

      // console.log(`Settings location change to: `, this.settingsPath);
    }
  }

  // /** @deprecated Use fileOpenedApp() returning observable*/
  // public fileOpenedAppPromise(): Promise<string[]> {
  //   return new Promise((resolve, reject) => {
  //     this.electron.fileOpenedApp((event, paths) => {
  //       resolve(paths);
  //     });
  //   });
  // }

  // /** @deprecated Not needed? */
  // public fileOpenedApp(): Observable<string[] | null> {
  //   const electron: ElectronWindowApi | null = this.electron;
  //   return electron
  //     ? new Observable((observer) => {
  //         electron.fileOpenedApp((event, paths) => {
  //           observer.next(paths);
  //         });
  //       })
  //     : of(null);
  // }

  // ======================================================================== //
  // ============================= Filepaths ================================ //

  /** Returns filepath to use
   * * Electron - file dialog opens for user to select file
   * * Web - default key is returned
   */
  public getNewDataFilePath(): Observable<string | null> {
    // console.log(`getDataFilePath()`);
    return this.electron
      ? from(this.electron.getSaveFilePath()).pipe(
          map((p) => {
            // FIXME: Where/When to throw error?
            // if (!p) throw new Error(`"${p}" ${ERRORS.INVALID_PATH}`);
            return p;
          })
        )
      : of(`${WEB_FILE_NAME}${this.getHighestItemNumber(WEB_FILE_NAME) + 1}`);
  }

  // ======================================================================== //
  // ============================= Reads ==================================== //

  /** Gets file data from:
   * * FileReader - Html open file dialog (saves to local storage if not electron app)
   * * Electron - file load
   * * Local storage contents
   * @param location system path OR local storage key in web mode
   * @param file file from file dialog
   */
  public readFile<T>(location: string, file?: File): Observable<T> {
    // console.log(`readFile() - `, location, file);
    return file
      ? this.readFileWeb<T>(file).pipe(
          switchMap((f) => {
            if (!this.electron) {
              // Need to save contents to local storage to reference
              // otherwise settings entry will point to undefined
              return this.writeFile(location, f).pipe(map(() => f));
            }
            return of(f);
          })
        )
      : this.electron
      ? this.readFileElectron<T>(location)
      : this.readFileLocal<T>(location);
  }

  // TODO: Return Observable<string>
  private readFileElectron<T>(path: string): Observable<T> {
    // console.log(`  readFileElectron() - `, path);
    if (!this.electron) return throwError('Electron is not available!');
    return from(this.electron.openFile(path)).pipe(
      map<MyFile, T>((v) => {
        if (!v) {
          throw new Error(`${ERRORS.ANGULAR_NO_DATA} for "${path}"`);
        }
        // TODO: Needs decrypting before parsing, move both out to the readfile function instead of duplicating
        return JSON.parse(v.data);
      })
    );
  }

  // TODO: Return Observable<string>
  /** @see https://developer.mozilla.org/en-US/docs/Web/API/FileReader/onload */
  private readFileWeb<T>(f: File): Observable<T> {
    // console.log(`  readFileWeb() - `, f);
    const reader = new FileReader();
    reader.readAsText(f, FILE_ENCODING);
    return fromEvent<ProgressEvent<FileReader>>(reader, 'load').pipe(
      map((ev) => {
        if (!ev.target) {
          throw new Error(`${ERRORS.ANGULAR_NO_DATA} for "${f.name}"`);
        }
        // TODO: Needs decrypting before parsing, move both out to the readfile function instead of duplicating
        return JSON.parse(ev.target.result as string);
      })
    );
  }

  // TODO: Return Observable<string>
  private readFileLocal<T>(key: string): Observable<T> {
    // console.log(`  readFileLocal() - `, key);
    return of(localStorage.getItem(key)).pipe(
      map<string | null, T>((v) => {
        if (!v) {
          throw new Error(`${ERRORS.ANGULAR_NO_DATA} for "${key}"`);
        }
        // TODO: Needs decrypting before parsing, move both out to the readfile function instead of duplicating
        return JSON.parse(v);
      })
    );
  }

  private readFileMock<T>(key: string): Observable<T> {
    // console.log(`  readFileMock() - `, key);
    return key.toLocaleLowerCase().includes('settings')
      ? of(mockSettings as unknown as T)
      : of(mockSavedFile as unknown as T);
  }
  // ======================================================================== //
  // ============================= Writes =================================== //

  /** Writes file to
   * * Electron - os file system
   * * Local storage
   * @param location system path OR local storage key in web mode
   * @param fileContents data to save
   */
  public writeFile<T>(location: string, fileContents: T): Observable<null> {
    // console.log(`writeFile() - `, location, fileContents);
    const spacing = this.electron ? 2 : 0;
    const myFile: MyFile = {
      path: location,
      // TODO: Needs encrypting after stringifying
      data: JSON.stringify(fileContents, null, spacing),
    };
    return this.electron
      ? this.writeFileElectron(myFile)
      : this.writeFileLocal(myFile);
  }

  private writeFileElectron(myFile: MyFile): Observable<null> {
    // console.log(`  writeFileElectron() - `, myFile);
    if (!this.electron) return throwError('Electron is not available!');
    return from(this.electron.writeFile(myFile)).pipe(
      map((): null => {
        return null;
      })
    );
  }

  private writeFileLocal(myFile: MyFile): Observable<null> {
    // console.log(`  writeFileLocal() - `, myFile);
    localStorage.setItem(String(myFile.path), myFile.data);
    return of(null);
  }

  private getHighestItemNumber(pattern: string): number {
    let highestItemNumber: number = 0;

    // Iterate through all keys in local storage
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);

      // Check if the key matches the pattern (e.g., item1, item2, etc.)
      const match = key?.match(new RegExp(`^${pattern}(\\d+)$`));

      if (match && match[1] != null) {
        const itemNumber = parseInt(match[1], 10);

        // Update highestItemNumber if this one is larger
        if (itemNumber > highestItemNumber) {
          highestItemNumber = itemNumber;
        }
      }
    }

    return highestItemNumber;
  }

  // ======================================================================== //
  // ============================= Other =================================== //

  public showItemInExplorer(filePath: string): void {
    // TODO: Download from localstorage if Electron is not available (browser)
    if (!this.electron) throw new Error('Electron is not available!');
    this.electron.showItemInFolder(filePath);
  }
}
