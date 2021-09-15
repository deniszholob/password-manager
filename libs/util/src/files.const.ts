import { FileFilter } from 'electron/main';

const FILE_FILTERS_TEXT: FileFilter[] = [
  {
    name: 'Data',
    extensions: [
      // 'txt',
      'json',
    ],
  },
];

export const FILE_ENCODING = 'utf8';
export const FILE_DATA_EXTENSION = 'json'; //'pwmd';
export const FILE_SAVE_EXTENSION = 'json'; //'pwms';

export const SETTINGS_NAME = `pswm-config.${FILE_SAVE_EXTENSION}`;
export const DEFAULT_SETTINGS_PATH = `G:/${SETTINGS_NAME}`;

/** File filters to use in electron file dialogs
 * @see https://www.electronjs.org/docs/api/dialog#dialogshowopendialogbrowserwindow-options
 */
export const FILE_FILTERS_DATA: FileFilter[] = [
  ...FILE_FILTERS_TEXT,
  { name: 'Password Manager Data', extensions: [FILE_DATA_EXTENSION] },
];

const FILE_FILTERS_SAVE: FileFilter[] = [
  ...FILE_FILTERS_TEXT,
  { name: 'Password Manager Save', extensions: [FILE_SAVE_EXTENSION] },
];

/** Accepted extensions string to use in HTML <input type="file" accept="{{FILE_ACCEPT}}">
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#unique_file_type_specifiers
 */
export const FILE_ACCEPT_DATA: string = FILE_FILTERS_DATA.map((v) => {
  // Only use extensions field
  return (
    v.extensions
      // Prefix with .
      .map((s) => `.${s}`)
      // Combine extensions array with comma delimited values
      .reduce((prev, curr) => {
        return `${prev}, ${curr}`;
      })
  );
}).reduce((prev, curr) => {
  // Combine root array with comma delimited values
  return `${prev}, ${curr}`;
});
