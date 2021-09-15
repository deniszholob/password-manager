import { SETTINGS_NAME } from '@pwm/util';
import { MenuItemConstructorOptions } from 'electron';
import { homeFile } from './api/util';

export class AppMenu {
  static getMenuTemplate(): MenuItemConstructorOptions[] {
    const isMac = process.platform === 'darwin';

    const fileItem: MenuItemConstructorOptions = {
      role: 'fileMenu',
      submenu: [
        {
          label: 'Settings File',
          click: async () => {
            // TODO: await import('electron'); ?
            const { shell } = require('electron');
            // Show the given file in a file manager. If possible, select the file.
            shell.showItemInFolder(homeFile(SETTINGS_NAME));
          },
        },
        isMac ? { role: 'close' } : { role: 'quit' },
      ],
    };
    return [
      fileItem,
      { role: 'editMenu' },
      { role: 'viewMenu' },
      { role: 'windowMenu' },
    ];
  }
}
