export enum IconSrcOptions {
  google = 'google',
  duck = 'duck',
  statvoo = 'statvoo',
  fontawesome = 'fontawesome',
  default = 'default',
}

export const ICON_SRC_OPTIONS_OPTIONS: IconSrcOptions[] =
  Object.values(IconSrcOptions);

export function isIconSrcOptions(value: string): value is IconSrcOptions {
  return ICON_SRC_OPTIONS_OPTIONS.includes(value as IconSrcOptions);
}

// ====== Simple Enum Association: enum => string ===== //
// export const ICON_SRC_OPTIONS_DISPLAY: Record<IconSrcOptions, string> = {
//   [IconSrcOptions.option1]: 'Option 1',
// };

// ====== Advanced Enum Association: enum => object ===== //
// export interface IconSrcOptionsInfo {
//   id: IconSrcOptions;
//   display: string;
// }

// export const ICON_SRC_OPTIONS_INFO: Record<IconSrcOptions, IconSrcOptionsInfo> = {
//   [IconSrcOptions.OptionId1]: {
//     id: IconSrcOptions.OptionId1,
//     display: 'Option Id 1',
//   },
// } as const;

// export const ICON_SRC_OPTIONS_INFO_OPTIONS: IconSrcOptionsInfo[] =
//   ICON_SRC_OPTIONS_OPTIONS.map(
//     (o: IconSrcOptions): IconSrcOptionsInfo => ICON_SRC_OPTIONS_INFO[o],
//   );

// ====== Visualize Data ===== //
// console.log({ ICON_SRC_OPTIONS_OPTIONS, ICON_SRC_OPTIONS_DISPLAY, ICON_SRC_OPTIONS_INFO, ICON_SRC_OPTIONS_INFO_OPTIONS });

// ====== OLD CODE TODO: Refactor to use the above instead ===== //

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
