import { v5 as uuid_v5, v4 as uuid_v4 } from 'uuid';

export function util(): string {
  return 'util';
}

export function copyMessageNavigator(msg: string): void {
  navigator.clipboard
    .writeText(msg)
    .then(() => {
      // console.log(`Text copied to clipboard: <${msg}>`);
    })
    .catch((err) => {
      // This can happen if the user denies clipboard permissions:
      console.error('Could not copy text: ', err);
    });
}

/**
 * Convert Windows backslash paths to slash paths: `foo\\bar` -> `foo/bar`
 *
 * Forward-slash paths can be used in Windows as long as
 * * they're not extended-length paths and
 * * don't contain any non-ascii characters.
 * @see http://superuser.com/a/176395/6877
 * @see https://github.com/sindresorhus/slash
 */
export function slash(path: string) {
  const isExtendedLengthPath = /^\\\\\?\\/.test(path);
  // eslint-disable-next-line no-control-regex
  const hasNonAscii = /[^\u0000-\u0080]+/.test(path);

  if (isExtendedLengthPath || hasNonAscii) {
    return path;
  }

  return path.replace(/\\/g, '/');
}

export const UUID_NAME = 'Password Manager';

export function getGuid() {
  // console.log(`getGuid()`);
  return uuid_v5(UUID_NAME, uuid_v4());
}

/**
 * @Ref https://stackoverflow.com/questions/5467129/sort-javascript-object-by-key
 * @Ref https://medium.com/@gmcharmy/sort-objects-in-javascript-e-c-how-to-get-sorted-values-from-an-object-142a9ae7157c
 */
export function sortObjectKeys(o: any) {
  return Object.keys(o)
    .sort()
    .reduce((r, k) => (((r as any)[k] = o[k]), r), {});

  // return Object.entries(o)
  //   .sort((a, b) => (b[1] as any) - (a[1] as any))
  //   .map((el) => el[0]);
}

/** @Ref https://stackoverflow.com/questions/1069666/sorting-object-property-by-values */
const sortable = (o: any) =>
  Object.entries(o)
    .sort(([, a], [, b]) => (a as any) - (b as any))
    .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
