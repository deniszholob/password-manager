/**
 * This module is responsible on handling all the inter process communications
 * between the frontend to the electron backend.
 */

import {
  ElectronWindowApiRendererEvents,
  EVENT_CHANNELS,
  FILE_ENCODING,
  FILE_FILTERS_DATA,
  MyFile,
  slash,
} from '@pwm/util';
import { app, dialog, ipcMain, shell } from 'electron';
import { readFile, writeFile } from 'fs/promises';

import { environment } from '../../environments/environment';

export default class ElectronEvents {
  static bootstrapElectronEvents(): Electron.IpcMain {
    return ipcMain;
  }
}

class ElectronEventHandler implements ElectronWindowApiRendererEvents {
  public async openFile(path: string): Promise<MyFile> {
    if (!environment.production) {
      // console.log(`openFile() - `, path);
    }
    const data = await readFile(path, FILE_ENCODING);
    return { path, data };
  }

  public async writeFile(file: MyFile): Promise<void> {
    if (!environment.production) {
      // console.log(`writeFile() - `, file);
    }
    const data = await writeFile(file.path, file.data, FILE_ENCODING);
    return data;
  }

  public async getSaveFilePath(): Promise<string | null> {
    if (!environment.production) {
      console.log(`getSaveFilePath() - Show save dialog`);
    }
    const data = await dialog.showSaveDialog({
      filters: FILE_FILTERS_DATA,
    });
    return data && data.filePath ? slash(data.filePath) : null;
  }

  public async showItemInFolder(path: string): Promise<void> {
    if (!environment.production) {
      // console.log(`showItemInFolder() - `, path);
    }
    await shell.showItemInFolder(path);
  }
}
const handler = new ElectronEventHandler();

ipcMain.handle(EVENT_CHANNELS.e_open_file, (event, arg) =>
  handler.openFile(arg)
);
ipcMain.handle(EVENT_CHANNELS.e_write_file, (event, arg) =>
  handler.writeFile(arg)
);
ipcMain.handle(EVENT_CHANNELS.e_get_saveFile_path, () =>
  handler.getSaveFilePath()
);
ipcMain.handle(
  EVENT_CHANNELS.e_show_item_in_folder,
  (_event, filePath: string) => handler.showItemInFolder(filePath)
);

// Retrieve app version
ipcMain.handle('get-app-version', (event): string => {
  if (!environment.production) {
    console.log(`Fetching application version... [v${environment.version}]`);
  }
  return environment.version;
});

// Handle App termination
ipcMain.on('quit', (event, code) => {
  app.exit(code);
});
