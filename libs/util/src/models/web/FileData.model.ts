export interface MyDataFile {
  entries: FileData;
  path: string;
}

export type FileData = Entry[];

// TODO: Replace above type with this..
// export interface FileData {
//   version: number;
//   entries: Entry[];
// }

export interface Entry {
  guid: string;
  serviceName: string;
  email?: string;
  password: string;
  username: string;
  serviceUrl?: string;
  recovery?: Recovery[];
  tags?: string[];
  notes?: string;
  usedTimes: number;
  iconSrc?: IconSrcOptions;
}

export interface Recovery {
  question: string;
  answer: string;
}

export enum IconSrcOptions {
  google = 'google',
  duck = 'duck',
  statvoo = 'statvoo',
  fontawesome = 'fontawesome',
  default = 'default',
}

export function getIconSrcOptionValuesArray(): IconSrcOptions[] {
  return Object.values(IconSrcOptions);
}

export function getIconSrcOptionsArray(): {
  value: IconSrcOptions;
  label: string;
}[] {
  return getIconSrcOptionValuesArray().map((v) => {
    return {
      value: v,
      label: IconSrcOptionsLabels[v],
    };
  });
}

// TODO: Use these labels?
// export enum IconSrcOptionsLabels {
//   google = 'Google API',
//   duck = 'Duck Duck Go API',
//   statvoo = 'Statvoo API',
//   font = 'Font Awesome Icon',
//   default = 'Default Globe Icon',
// }
export const IconSrcOptionsLabels: Record<IconSrcOptions, string> = {
  [IconSrcOptions.google]: 'Google API',
  [IconSrcOptions.duck]: 'Duck Duck Go API',
  [IconSrcOptions.statvoo]: 'Statvoo API',
  [IconSrcOptions.fontawesome]: 'Font Awesome Icon',
  [IconSrcOptions.default]: 'Default Globe Icon',
};

export const IconSrcOptionsMap: Record<IconSrcOptions, string> = {
  [IconSrcOptions.google]:
    'https://www.google.com/s2/favicons?sz=32&domain_url={{URL}}',
  [IconSrcOptions.duck]: 'https://icons.duckduckgo.com/ip3/{{URL}}.ico',
  [IconSrcOptions.statvoo]: 'https://api.statvoo.com/favicon/?url={{URL}}',
  [IconSrcOptions.fontawesome]: 'fab fa-{{NAME}}',
  [IconSrcOptions.default]: 'default',
  // 'custom' = 'custom',
};

// export type IconSrcOptions = keyof typeof IconSrcOptionsEnum;

// export const iconMap = new Map([
//   ['./google.svg', ['google.com', 'www.google.com']],
// ]);

export const DEFAULT_DATA_KEY = 'p0394ujmsaiordjghsli8ey50seop95j7h6ybo9eu';
