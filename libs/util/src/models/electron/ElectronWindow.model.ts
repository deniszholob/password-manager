/* eslint-disable @typescript-eslint/no-explicit-any */

import { MyFile, ElectronResult } from './ElectronFile.model';
import { IpcRenderer } from 'electron';
import { Observable } from 'rxjs';

/** Exposed Electron API to Angular in the preload Electron contextBridge */
export interface ElectronWindow {
  electron: ElectronWindowApi;
}

/** Electron IPC */
export interface ElectronWindowApiRendererEvents {
  // /** Electron ipcRenderer wrapper of send method */
  // electronIpcSend: (channel: string, ...arg: any) => void;
  // /** Electron ipcRenderer wrapper of sendSync method */
  // electronIpcSendSync: (channel: string, ...arg: any) => any;
  // /** Electron ipcRenderer wrapper of on method */
  // electronIpcOn: (channel: string, listener: (event: any, ...arg: any) => void) => void;
  // /** Electron ipcRenderer wrapper of onOnce method */
  // electronIpcOnce: (channel: string, listener: (event: any, ...arg: any) => void) => void;
  // /** Electron ipcRenderer wrapper of removeListener method */
  // electronIpcRemoveListener: (channel: string, listener: (event: any, arg: any) => void) => void;
  // /** Electron ipcRenderer wrapper of removeAllListeners method */
  // electronIpcRemoveAllListeners: (channel: string) => void;

  // getAppVersion: () => Promise<string>;
  openFile: (path: string) => Promise<MyFile>;
  writeFile: (file: MyFile) => Promise<void>;
  getSaveFilePath: () => Promise<string | null>;
  showItemInFolder: (path: string) => Promise<void>;
}

export interface ElectronWindowApiMainEvents {
  /** Electron ipcRenderer wrapper of on method */
  // electronIpcOn: (
  //   channel: string,
  //   listener: (event: Electron.IpcRendererEvent, ...arg: any) => void
  // ) => void;
  fileOpenedApp: (
    listener: (event: Electron.IpcRendererEvent, path: string[]) => void
  ) => void;
  fileOpenedAppO: () => Observable<string>;
}

/** Exposed Electron API to Angular in the preload Electron contextBridge */
export interface ElectronWindowApi
  extends ElectronWindowApiRendererEvents,
    ElectronWindowApiMainEvents {
  platform: string;
  homeFile: (path: string) => string;
}
