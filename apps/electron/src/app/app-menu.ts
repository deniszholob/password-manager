import { SETTINGS_NAME, SETTINGS_NAME_DEV } from '@pwm/util';
import { MenuItemConstructorOptions } from 'electron';
import { homeFile } from './api/util';
import { environment } from '../environments/environment';

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
            shell.showItemInFolder(
              homeFile(
                environment.production ? SETTINGS_NAME : SETTINGS_NAME_DEV
              )
            );
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
