import { IconSrcOptions } from './FileData.model';

export interface SettingsData {
  // version: string;
  defaultIconSrc: IconSrcOptions;
  encryption: EncryptionOptions;
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
};

export const DEFAULT_SETTINGS_KEY = 'ol82ynw3lo8nynla98w234yg';
