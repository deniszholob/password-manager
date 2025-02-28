import { IconSrcOptions } from './icon-src-options.enum';

export interface SettingsData {
  // version: string;
  defaultIconSrc: IconSrcOptions;
  encryption: EncryptionOptions;
  /** All the files paths that have been opened
   * When a file is opened, it is added here if not already
   * If there is an error opening a file, it should be removed
   */
  recentFiles: string[];
  /** Subset of recentFiles
   * File paths to show in tabs in ui
   * When a file is opened, it is added here if not already
   * Users will click on one to load its data
   * Users can close the file, upon which it should be remove and the dataFile should be set to the next available file
   */
  pinnedFiles: string[];
  /**
   * Data file path to load on startup
   * Last file user was viewing
   * When a file is opened, this represents the file
   * It is undefined, when a use is creating a new file or when there are no files in the recentFiles to chose from
   */
  dataFile?: string;
  saveKeys?: SaveKeyOptions;
  keys?: { [filename: string]: string };
}

// export type SaveKeyOptions = 'off' | 'last' | 'all';
// export type EncryptionOptions = 'off' | 'default' | 'custom';

// TODO: Enable all options
export enum EncryptionOptions {
  off = 'off',
  // background = 'background',
  // on = 'on',
}

// TODO: Enable all options
export enum SaveKeyOptions {
  off = 'off',
  // last = 'last',
  // all = 'all',
}

// TODO: Enable all options
export const EncryptionOptionsDescription: Record<EncryptionOptions, string> = {
  [EncryptionOptions.off]: 'No Encryption',
  // [EncryptionOptions.background]: 'Encryption with internal static key',
  // [EncryptionOptions.on]: 'Encryption with your custom key',
};

// TODO: Enable all options
export const SaveKeyOptionsDescription: Record<SaveKeyOptions, string> = {
  [SaveKeyOptions.off]: 'Do not save any keys',
  // [SaveKeyOptions.last]: 'Save key for last opened file',
  // [SaveKeyOptions.all]: 'Save keys for all files opened',
};

export function getSaveKeyOptionsArray(): string[] {
  return Object.values(SaveKeyOptions);
}

export function getEncryptionOptionsArray(): string[] {
  return Object.values(EncryptionOptions);
}

export const DEFAULT_SETTINGS: SettingsData = {
  // version: '0.0.1',
  defaultIconSrc: IconSrcOptions.fontawesome,
  // TODO: set to on
  encryption: EncryptionOptions.off,
  pinnedFiles: [],
  recentFiles: [],
};

export const DEFAULT_SETTINGS_KEY = 'ol82ynw3lo8nynla98w234yg';
