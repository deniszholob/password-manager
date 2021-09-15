import { ElectronWindowApi, EVENT_CHANNELS, MyFile } from '@pwm/util';
import { contextBridge, ipcRenderer } from 'electron';
import { resolve } from 'node:path';
import { homedir } from 'os';
import { Observable } from 'rxjs';
import { homeFile } from './util';

const exportApi: ElectronWindowApi = {
  // electronIpcSend: (channel: string, ...arg: any) => {
  //   ipcRenderer.send(channel, arg);
  // },
  // electronIpcSendSync: (channel: string, ...arg: any) => {
  //   return ipcRenderer.sendSync(channel, arg);
  // },
  // electronIpcOn: (channel: string, listener: (event: any, ...arg: any) => void) => {
  //   ipcRenderer.on(channel, listener);
  // },
  // electronIpcOnce: (channel: string, listener: (event: any, ...arg: any) => void) => {
  //   ipcRenderer.once(channel, listener);
  // },
  // electronIpcRemoveListener: (channel: string, listener: (event: any, ...arg: any) => void) => {
  //   ipcRenderer.removeListener(channel, listener);
  // },
  // electronIpcRemoveAllListeners: (channel: string) => {
  //   ipcRenderer.removeAllListeners(channel);
  // },
  // getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  fileOpenedApp: (listener) => {
    ipcRenderer.on(EVENT_CHANNELS.fileOpenedApp, listener);
  },
  fileOpenedAppO: () => {
    return new Observable<string>((subscriber) => {
      ipcRenderer.on(EVENT_CHANNELS.fileOpenedApp, (event, path) => {
        subscriber.next(path);
        subscriber.complete();
      });
    });
  },
  openFile: (path: string) =>
    ipcRenderer.invoke(EVENT_CHANNELS.e_open_file, path),
  writeFile: (file: MyFile) =>
    ipcRenderer.invoke(EVENT_CHANNELS.e_write_file, file),
  getSaveFilePath: () => ipcRenderer.invoke(EVENT_CHANNELS.e_get_saveFile_path),
  platform: process.platform,
  homeFile: homeFile,
};

contextBridge.exposeInMainWorld('electron', exportApi);
