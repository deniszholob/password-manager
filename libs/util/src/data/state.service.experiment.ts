import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { FileData } from '../models/web/FileData.model';
import { Store } from '../store';

export interface AppState {
  data: Progress;
  settings: Progress;
}

export enum Progress {
  INIT,
  LOADING,
  COMPLETE,
  ERROR,
}

export interface FileState<T> {
  progress: Progress;
  data: T;
}

export class Stores {
  // private sliceDataFile = new Store<FileData | null>(null);
  // private sliceSettingsFile = new Store<FileData | null>(null);
  // private sliceAppState = new Store<AppState>({
  //   data: States.INIT,
  //   settings: States.INIT,
  // });
  private sliceDataFile = new Store<FileState<FileData>>({
    progress: Progress.INIT,
    data: [],
  });
  private sliceSettingsFile = new Store<FileState<SettingsData>>({
    progress: Progress.INIT,
    data: [],
  });

  // === Selectors === //

  public selectDataState() {
    return this.sliceDataFile.getStore();
  }

  public selectSettingsState() {
    return this.sliceDataFile.getStore();
  }

  // === Actions === //

  public actionDataNew(data: FileData) {
    const currentState = this.sliceSettingsFile.getState();
    this.sliceSettingsFile.setState({
      ...currentState,
      progress: Progress.COMPLETE,
      data: data,
    });
  }

  public actionDataStateSet(progress: Progress) {
    const currentState = this.sliceSettingsFile.getState();
    this.sliceSettingsFile.setState({
      ...currentState,
      progress: Progress.ERROR,
    });
  }

  public actionNewSettings(data: FileData) {
    this.sliceSettingsFile.setState({ data, progress: Progress.COMPLETE });
  }
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  // Observable sources
  private srcFile = new Subject<FileData>();
  private srcSettings = new Subject<SettingsData>();

  // Observable streams
  public $File: Observable<FileData>;
  public $Settings: Observable<SettingsData>;

  constructor() {
    // Create Observable streams
    this.$File = this.srcFile.asObservable();
    this.$Settings = this.srcSettings.asObservable();
  }

  // Service message commands
  public updateFile(d: FileData) {
    this.srcFile.next(d);
  }

  public updateSettings(d: SettingsData) {
    this.srcSettings.next(d);
  }
}
