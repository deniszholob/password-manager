import { Injectable } from '@angular/core';
import { SettingsData } from '../models/web';
import { Store } from './store.class';

@Injectable({ providedIn: 'root' })
export class SettingsStore extends Store<SettingsData | null> {
  constructor() {
    // console.log(`SettingsStore Init`)
    super(null);
  }
}

@Injectable({ providedIn: 'root' })
export class AppStore extends Store<AppData | null> {
  constructor() {
    // console.log(`SettingsStore Init`)
    super(null);
  }
}

export interface AppData {
  unsavedChanges: boolean;
}
