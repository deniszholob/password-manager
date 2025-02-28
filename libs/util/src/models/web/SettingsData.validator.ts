import {
  getIconSrcOptionValuesArray,
  IconSrcOptions,
} from './icon-src-options.enum';
import {
  DEFAULT_SETTINGS,
  EncryptionOptions,
  getEncryptionOptionsArray,
  SettingsData,
} from './SettingsData.model';

/** Returns null if valid, or SettingsData with corrections if not */
export function settingsValidator(
  settings: Partial<SettingsData>
): SettingsData | null {
  const settingsCorrections: SettingsData = {
    ...DEFAULT_SETTINGS,
    ...settings,
  };
  let valid: boolean = true;

  if (
    !settings?.defaultIconSrc ||
    !getIconSrcOptionValuesArray().includes(settings?.defaultIconSrc)
  ) {
    valid = false;
    settingsCorrections.defaultIconSrc = IconSrcOptions.fontawesome;
  }

  if (
    !settings?.encryption ||
    !getEncryptionOptionsArray().includes(settings?.encryption)
  ) {
    valid = false;
    settingsCorrections.encryption = EncryptionOptions.off;
  }

  if (!settings?.pinnedFiles) {
    valid = false;
    settingsCorrections.pinnedFiles = [];
  }

  if (!settings?.recentFiles) {
    valid = false;
    settingsCorrections.pinnedFiles = [];
  }

  if (settings?.dataFile) {
    if (!settings?.pinnedFiles?.includes(settings.dataFile)) {
      valid = false;
      settingsCorrections.pinnedFiles.push(settings.dataFile);
    }

    if (!settings?.recentFiles?.includes(settings.dataFile)) {
      valid = false;
      settingsCorrections.recentFiles.unshift(settings.dataFile);
    }
  }

  return valid ? null : settingsCorrections;
}
