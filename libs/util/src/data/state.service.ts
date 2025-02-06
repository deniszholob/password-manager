//  TODO: Rename to data.service.ts

import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators';

import { DEFAULT_SETTINGS, FileData, SettingsData } from '../models/web';
import { DataStoreService, SettingsStore } from '../store';
import { errorHas, ERRORS } from './errors';
import { RawFileIOService } from './raw-file-io.service';

/** Ref: https://stackoverflow.com/questions/16231210/file-path-validation-in-javascript */
// eslint-disable-next-line no-useless-escape
const PATH_REGEX = /^[a-z]:((\\|\/)[a-z0-9\s_@\-^!#$%&+={}\[\]]+)+\.xml$/i;

/** Uses RawFileIoService to perform actions and updates app states */
@Injectable({ providedIn: 'root' })
export class StateService {
  constructor(
    private dataStore: DataStoreService,
    private settingsStore: SettingsStore,
    private rawFileIOService: RawFileIOService
  ) {}

  // ======================================================================== //
  // ============================= Read ===================================== //
  public readOpenedFile(): Observable<boolean> {
    return this.rawFileIOService.fileOpenedApp().pipe(
      switchMap((paths: string[]) => {
        console.log(`Electron argv -`, paths);
        // paths[0] is main app
        // paths[1] is calling file
        if (paths && paths[1] && PATH_REGEX.test(paths[1])) {
          console.log(`Opened through save file -`, paths[1]);
          return this.readData(paths[1]);
          return of(true);
        }
        return of(false);
      })
    );
  }

  public readData(location: string, file?: File): Observable<null> {
    // console.log(`readData() - `, location, file);
    return this.rawFileIOService.readFile<FileData>(location, file).pipe(
      tap((d) => this.dataStore.setState(d)),
      switchMap(() => this.saveFilePathToSettings(location)),
      catchError((err) => {
        if (
          errorHas(err, ERRORS.ELECTRON_NO_FILE) ||
          errorHas(err, ERRORS.ANGULAR_NO_DATA) ||
          errorHas(err, ERRORS.INVALID_CONTENTS)
        ) {
          return this.clearDataFilePathFromSettingsFile();
        }
        return throwError(err);
      }),
      take(1)
    );
  }

  public readSettings(location = this.getSettingsFilePath()): Observable<null> {
    // console.log(`readSettings() - `, location);
    return this.rawFileIOService.readFile<SettingsData>(location).pipe(
      tap((d) => this.settingsStore.setState(d)),
      map((): null => null),
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

  // ======================================================================== //
  // ============================= Write ==================================== //

  /** @param path is for new files, existing files will read from settings */
  public saveData(data: FileData, path?: string): Observable<null> {
    // console.log(`saveData() - `, path, data);
    try {
      path = this.getDataFilePath(path);
    } catch (err) {
      return throwError(err);
    }
    return this.rawFileIOService.writeFile(path, data).pipe(
      tap(() => this.dataStore.setState(data)),
      catchError((err) => {
        // console.warn(err);
        return throwError(err);
      }),
      take(1)
    );
  }

  public saveSettings(data: SettingsData): Observable<null> {
    // console.log(`saveSettings() - `, data);
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
    const data: FileData = [];
    return this.rawFileIOService.getNewDataFilePath().pipe(
      // Ignore null, means user closed window
      filter((p) => p != null),
      switchMap((path) => {
        if (!path) return of(null);
        return this.saveData(data, path).pipe(
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

  private clearDataFilePathFromSettingsFile(): Observable<null> {
    // console.log(`  clearDataFilePathFromSettingsFile()`);
    const settingsState = this.settingsStore.getState();
    return this.saveSettings({ ...settingsState, dataFile: undefined });
  }

  private saveFilePathToSettings(path: string): Observable<null> {
    // console.log(`  saveFilePathToSettings() - `, path);
    const settingsState = this.settingsStore.getState();
    if (
      !(
        settingsState &&
        settingsState.dataFile &&
        settingsState.dataFile === path
      )
    ) {
      return this.saveSettings({ ...settingsState, dataFile: path });
    }
    return of(null);
  }

  public isElectron(): boolean {
    return this.rawFileIOService.isElectron;
  }
}
