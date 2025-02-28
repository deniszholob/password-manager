import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators';

import {
  DEFAULT_SETTINGS,
  Entry,
  FileData,
  FileDisplay,
  SettingsData,
  settingsValidator,
} from '../models/web';
import { DataStoreService, SettingsStore } from '../store';
import { errorHas, ERRORS } from './errors';
import { RawFileIOService } from './raw-file-io.service';

/** Ref: https://stackoverflow.com/questions/16231210/file-path-validation-in-javascript */
// eslint-disable-next-line no-useless-escape
const PATH_REGEX = /^[a-z]:((\\|\/)[a-z0-9\s_@\-^!#$%&+={}\[\]]+)+\.xml$/i;
const INVALID_FILE_ERROR: string = 'Invalid file or contents';

/** Uses RawFileIoService to perform actions and updates app states */
@Injectable({ providedIn: 'root' })
export class DataService {
  constructor(
    private dataStore: DataStoreService,
    private settingsStore: SettingsStore,
    private rawFileIOService: RawFileIOService
  ) {}

  // ======================================================================== //
  // ============================= Read ===================================== //

  // /** @deprecated Not needed? */
  // public readOpenedFile(): Observable<boolean> {
  //   return this.rawFileIOService.fileOpenedApp().pipe(
  //     switchMap((paths: string[] | null) => {
  //       console.log(`Electron argv -`, paths);
  //       // paths[0] is main app
  //       // paths[1] is calling file
  //       if (paths && paths[1] && PATH_REGEX.test(paths[1])) {
  //         console.log(`Opened through save file -`, paths[1]);
  //         return this.readData(paths[1]).pipe(map(() => true));
  //       }
  //       return of(false);
  //     })
  //   );
  // }

  /** Gets file data from:
   * * FileReader - Html open file dialog (saves to local storage if not electron app)
   * * Electron - file load
   * * Local storage contents
   * @param location system path OR local storage key in web mode
   * @param file file from file dialog
   */
  public readData(location: string, file?: File): Observable<null> {
    // console.log(`readData() - `, location, file);
    return this.rawFileIOService.readFile<Entry[]>(location, file).pipe(
      map(
        (entries: Entry[]): FileData => ({
          entries,
          ...FileDisplay.fromPath(location),
        })
      ),
      tap((d) => this.dataStore.setState(d)),
      switchMap(() => this.saveFilePathToSettings(location)),
      catchError((err) => {
        if (
          errorHas(err, ERRORS.ELECTRON_NO_FILE) ||
          errorHas(err, ERRORS.ANGULAR_NO_DATA) ||
          errorHas(err, ERRORS.INVALID_CONTENTS)
        ) {
          return this.clearDataFilePathFromSettingsFile(location).pipe(
            switchMap(() => {
              // TODO: console warn happens but not sure about the throw
              console.warn(INVALID_FILE_ERROR);
              return throwError(INVALID_FILE_ERROR);
              // throw new Error(INVALID_FILE_ERROR);
            })
          );
        }
        return throwError(err);
      }),
      take(1)
    );
  }

  public readSettings(location = this.getSettingsFilePath()): Observable<null> {
    // console.log(`readSettings() - `, location);
    return this.rawFileIOService.readFile<SettingsData>(location).pipe(
      switchMap(this.checkValidSettings.bind(this)),
      catchError((err) => {
        if (
          errorHas(err, ERRORS.ELECTRON_NO_FILE) ||
          errorHas(err, ERRORS.ANGULAR_NO_DATA) ||
          errorHas(err, ERRORS.INVALID_CONTENTS)
        ) {
          // No settings file exists, so make a new one
          return this.createSettingsFile();
        }
        return throwError(err);
      }),
      take(1)
    );
  }

  private checkValidSettings(settings: SettingsData): Observable<null> {
    // console.log(`checkValidSettings() - `, settings);
    const settingCorrections: SettingsData | null = settingsValidator(settings);
    if (!settingCorrections) {
      this.settingsStore.setState(settings);
      return of(null);
    }

    // console.log(`Applying Settings Corrections and Saving...`);
    return this.saveSettings(settingCorrections);
  }
  // ======================================================================== //
  // ============================= Write ==================================== //

  /** @param path is for new files, existing files will read from settings */
  public saveData(data: FileData): Observable<null> {
    let path: string = data.path;
    // data.forEach((e) => {
    //   e.email = e.email?.toLowerCase();
    //   e.serviceUrl = e.serviceUrl?.toLowerCase();
    // });
    // console.log(`saveData() - `, path, data);
    try {
      path = this.getDataFilePath(path);
    } catch (err) {
      return throwError(err);
    }
    return this.rawFileIOService.writeFile(path, data.entries).pipe(
      tap(() => this.dataStore.setState(data)),
      catchError((err) => {
        // console.warn(err);
        return throwError(err);
      }),
      take(1)
    );
  }

  public saveSettings(data: SettingsData): Observable<null> {
    console.log(`saveSettings() - `, data);
    return this.rawFileIOService
      .writeFile<SettingsData>(this.getSettingsFilePath(), data)
      .pipe(
        tap(() => {
          // console.debug(`[SET STATE] settingsStore: `, data);
          this.settingsStore.setState(data);
        }),
        take(1)
      );
  }

  // ======================================================================== //
  // ============================= Create =================================== //

  // TODO: When to update the settings file with the path reference?
  // Settings update must be after file exists as app will try to load it
  public createDataFile(): Observable<null> {
    // console.log('createDataFile()');
    return this.rawFileIOService.getNewDataFilePath().pipe(
      // Ignore null, means user closed window
      filter((p) => p != null),
      switchMap((path) => {
        if (!path) return of(null);
        return this.saveData({
          entries: [],
          ...FileDisplay.fromPath(path),
        }).pipe(
          switchMap(() => {
            return this.saveFilePathToSettings(path);
          })
        );
      }),
      take(1)
    );
  }

  private createSettingsFile(): Observable<null> {
    // console.log(`  createSettingsFile()`);
    return this.saveSettings(DEFAULT_SETTINGS);
  }

  // ======================================================================== //
  // ============================= Filepaths ================================ //

  private getSettingsFilePath(): string {
    // console.log(`  getSettingsFilePath()`);
    return this.rawFileIOService.settingsPath;
  }

  /** Note: Will not propagate to observable return,
   * if using in a function with an observable return type
   * wrap in a try catch and return an observable throwError() before returning observable
   */
  private getDataFilePath(path: string | undefined): string {
    // console.log(`  getDataFilePath() - `, path);
    if (path) return path;
    // console.debug(`[GET STATE] settingsStore`, this.settingsStore.getState());
    path = this.settingsStore.getState()?.dataFile;
    if (path) return path;
    throw new Error(`${path} ${ERRORS.INVALID_PATH}`);
  }

  // ======================================================================== //
  // ============================= Misc ===================================== //
  public removeFileFromRecents(filePath: string): Observable<null> {
    // console.log(`removeFileFromRecents() - `, path);
    const settingsState: SettingsData | null = this.settingsStore.getState();
    if (!settingsState) return throwError(`settingsState is null`);

    const newSettingsState: SettingsData = {
      ...settingsState,
      recentFiles: settingsState.recentFiles.filter((p) => p !== filePath),
    };
    return this.saveSettings(newSettingsState);
  }

  private clearDataFilePathFromSettingsFile(
    filePath: string
  ): Observable<null> {
    // console.log(`  clearDataFilePathFromSettingsFile()`);
    const settingsState: SettingsData | null = this.settingsStore.getState();
    if (!settingsState) return throwError(`settingsState is null`);
    // if (!settingsState) return of(null);

    const newSettingsState: SettingsData = {
      ...settingsState,
      pinnedFiles: settingsState.pinnedFiles.filter((p) => p !== filePath),
      recentFiles: settingsState.recentFiles.filter((p) => p !== filePath),
    };

    if (settingsState.dataFile === filePath) {
      newSettingsState.dataFile = undefined;
    }

    console.log(`${filePath} was removed from settings file`);
    return this.saveSettings(newSettingsState);
  }

  /** Saves the file path to the settings file
   * Also adds the path to the recentFiles and pinnedFiles
   */
  private saveFilePathToSettings(path: string): Observable<null> {
    // console.log(`  saveFilePathToSettings() - `, path);
    const settingsState: SettingsData | null = this.settingsStore.getState();
    if (!settingsState) return throwError(`settingsState is null`);
    // if (!settingsState) return of(null);

    const alreadySaved: boolean = !!(
      settingsState &&
      settingsState.dataFile &&
      settingsState.dataFile === path &&
      settingsState.pinnedFiles.includes(path) &&
      settingsState.recentFiles.includes(path)
    );

    if (alreadySaved) return of(null);

    const newSettingsState: SettingsData = {
      ...settingsState,
      dataFile: path,
      pinnedFiles: [...settingsState.pinnedFiles],
      recentFiles: [...settingsState.recentFiles],
    };
    if (!newSettingsState.pinnedFiles.includes(path)) {
      newSettingsState.pinnedFiles.push(path);
    }
    if (!newSettingsState.recentFiles.includes(path)) {
      newSettingsState.recentFiles.unshift(path);
    }
    return this.saveSettings(newSettingsState);
  }

  public isElectron(): boolean {
    return this.rawFileIOService.isElectron;
  }
}
