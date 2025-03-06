import { HyperLink } from '@pwm/components';

export const APP_TITLE = 'Password Manager';
export const WEB_WARNING = `DO NOT Enter sensitive information, this is a demo only!`;

// === App level constants === //

/** Contains constants for the app */
export const APP_INFO: AppInfo = {
  app: {
    name: APP_TITLE,
    url: 'https://deniszholob.github.io/password-manager/',
  },
  author: {
    name: 'deniszholob.com',
    url: 'https://deniszholob.com',
    title: 'Denis Zholob',
  },
  github: {
    name: 'Github',
    url: 'https://github.com/deniszholob/password-manager',
    icon: 'fab fa-github',
  },
  discord: {
    name: 'Discord',
    url: 'https://discord.gg/PkyzXzz',
    icon: 'fab fa-discord',
  },
  kofi: {
    name: 'Ko-Fi',
    url: 'https://ko-fi.com/deniszholob',
    icon: 'fa fa-coffee',
  },
  patreon: {
    name: 'Patreon',
    url: 'https://www.patreon.com/deniszholob',
    icon: 'fab fa-patreon',
  },
};

/** App level constants */
export interface AppInfo {
  app: HyperLink;
  author: HyperLink;
  github: HyperLink;
  discord: HyperLink;
  kofi: HyperLink;
  patreon: HyperLink;
}
