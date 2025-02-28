import { FileData } from '../models/web/FileData.model';
import { Entry } from '../models/web/entry/entry.model';
import { IconSrcOptions } from '../models/web/icon-src-options.enum';
import {
  DEFAULT_SETTINGS,
  EncryptionOptions,
  SaveKeyOptions,
  SettingsData,
} from '../models/web/SettingsData.model';

export const mockSettingsEmpty: SettingsData = DEFAULT_SETTINGS;

export const mockSettings: SettingsData = {
  // version: '0.0.1',
  dataFile: 'G:/hello.txt',
  pinnedFiles: [],
  recentFiles: [],
  // encryption: 'off',
  // saveKeys: 'all',
  encryption: EncryptionOptions.off,
  saveKeys: SaveKeyOptions.off,
  defaultIconSrc: IconSrcOptions.fontawesome,
  keys: {
    'mock-key': 'mock-key',
  },
};

export const mockEntry: Entry = {
  guid: 'bc2faa78-2831-47aa-ab23-d5bd00260ee4',
  email: 'mock-account@mock-email.com',
  password: 'mock-password',
  serviceName: `Mock Service`,
  tags: ['mock-tag', 'mock-tag2', 'mock-tag3'],
  recovery: [{ question: 'Mock Question?', answer: 'Mock Answer!' }],
  serviceUrl: 'mock-service.com',
  username: 'mock-username',
  notes: 'Mock Notes',
  usedTimes: 0,
  iconSrc: IconSrcOptions.fontawesome,
};

export const mockEntryEmpty: Entry = {
  guid: '3e7bcfaf-802a-41de-838f-711fca7a6845',
  username: '',
  password: '',
  serviceName: '',
  usedTimes: 0,
};

export const mockSavedFile: FileData = {
  path: 'hello.json',
  displayAs: 'hello',
  entries: [mockEntry],
};
