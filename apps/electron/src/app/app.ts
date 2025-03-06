import { EVENT_CHANNELS, SETTINGS_NAME } from '@pwm/util';
import {
  BrowserWindow,
  Menu,
  MenuItem,
  MenuItemConstructorOptions,
  screen,
  shell,
  dialog,
} from 'electron';
import { join } from 'path';
import { async } from 'rxjs';
import { format } from 'url';

import { environment } from '../environments/environment';
import { homeFile } from './api/util';
import { AppMenu } from './app-menu';
import { rendererAppName, rendererAppPort } from './constants';

const DEFAULT_RESOLUTION = {
  w: 1920,
  h: 1080,
};

export default class App {
  // Keep a global reference of the window object, if you don't, the window will
  // be closed automatically when the JavaScript object is garbage collected.
  static mainWindow: Electron.BrowserWindow | null;
  static application: Electron.App;
  // static BrowserWindow;

  public static isDevelopmentMode() {
    const isEnvironmentSet: boolean = 'ELECTRON_IS_DEV' in process.env;
    const getFromEnvironment: boolean =
      !!process.env.ELECTRON_IS_DEV &&
      parseInt(process.env.ELECTRON_IS_DEV, 10) === 1;

    // console.log(`process.env;`, process.env;);
    // console.log(`isEnvironmentSet`, isEnvironmentSet);
    // console.log(`getFromEnvironment`, getFromEnvironment);
    // console.log(`!environment.production`, !environment.production);

    return isEnvironmentSet ? getFromEnvironment : !environment.production;
    // dialog.showErrorBox('environment.production', `${environment.production}`);
    // return !environment.production;
  }

  private static onWindowAllClosed() {
    if (process.platform !== 'darwin') {
      App.application.quit();
    }
  }

  private static onClose() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    App.mainWindow = null;
  }

  private static onRedirect(event: any, url: string) {
    if (App.mainWindow && url !== App.mainWindow.webContents.getURL()) {
      // this is a normal external redirect, open it in a new browser window
      event.preventDefault();
      shell.openExternal(url);
    }
  }

  private static onReady() {
    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    App.initMainWindow();
    App.loadMainWindow();
  }

  private static onActivate() {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (App.mainWindow === null) {
      App.onReady();
    }
  }

  private static initMenu() {
    // Default menu
    // let menu: Menu | null = Menu.getApplicationMenu();
    // let template: (MenuItemConstructorOptions | MenuItem)[] = menu
    //   ? menu.items.map((v, i) => {
    //       v.id = String(i + 1);
    //       return v;
    //     })
    //   : [];
    const template = AppMenu.getMenuTemplate();
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
    // App.mainWindow.setMenu(null);
  }

  private static initMainWindow() {
    const workAreaSize = screen.getPrimaryDisplay().workAreaSize;
    const width = Math.min(
      DEFAULT_RESOLUTION.w,
      workAreaSize.width || DEFAULT_RESOLUTION.w
    );
    const height = Math.min(
      DEFAULT_RESOLUTION.h,
      workAreaSize.height || DEFAULT_RESOLUTION.h
    );
    const icon = join(
      __dirname,
      '..',
      rendererAppName,
      'assets',
      'icon-512x512.png'
    );

    // Create the browser window.
    App.mainWindow = new BrowserWindow({
      width: width,
      height: height,
      backgroundColor: '#333',
      icon,
      show: false,
      webPreferences: {
        backgroundThrottling: false,
        preload: join(__dirname, 'preload.js'),
        devTools: true,
      },
    });

    if (App.isDevelopmentMode()) {
      App.mainWindow.webContents.openDevTools();
    }

    // Opens url links in native browser app, instead of creating a new electron window
    // https://stackoverflow.com/questions/31749625/make-a-link-from-electron-open-in-browser/67108615#67108615
    App.mainWindow.webContents.setWindowOpenHandler(({ url }) => {
      // config.fileProtocol is my custom file protocol
      // if (url.startsWith(config.fileProtocol)) {
      //     return { action: 'allow' };
      // }
      // open url in a browser and prevent default
      shell.openExternal(url);
      return { action: 'deny' };
    });

    App.initMenu();
    App.mainWindow.center();

    // if main window is ready to show, close the splash window and show the main window
    App.mainWindow.once('ready-to-show', () => {
      if (!App.mainWindow) {
        throw new Error('Electron window is null!');
      }
      App.mainWindow.show();
    });

    // handle all external redirects in a new browser window
    // App.mainWindow.webContents.on('will-navigate', App.onRedirect);
    // App.mainWindow.webContents.on('new-window', (event, url, frameName, disposition, options) => {
    //     App.onRedirect(event, url);
    // });

    // Emitted when the window is closed.
    App.mainWindow.on('closed', () => {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      App.mainWindow = null;
    });
  }

  private static loadMainWindow() {
    if (!App.mainWindow) {
      throw new Error('Electron window is null!');
    }
    // load the index.html of the app.
    if (!App.application.isPackaged) {
      App.mainWindow.loadURL(`http://localhost:${rendererAppPort}`);
    } else {
      App.mainWindow.loadURL(
        format({
          pathname: join(__dirname, '..', rendererAppName, 'index.html'),
          protocol: 'file:',
          slashes: true,
        })
      );
    }

    App.mainWindow.webContents.on('did-finish-load', () => {
      if (!App.mainWindow) {
        throw new Error('Electron window is null!');
      }
      App.mainWindow.webContents.send(
        EVENT_CHANNELS.fileOpenedApp,
        process.argv
      );
      // Not use if this matters
      App.mainWindow.webContents.focus();
    });
  }

  static main(app: Electron.App, browserWindow: typeof BrowserWindow) {
    // we pass the Electron.App object and the
    // Electron.BrowserWindow into this function
    // so this class has no dependencies. This
    // makes the code easier to write tests for

    // App.BrowserWindow = browserWindow;
    App.application = app;

    App.application.on('window-all-closed', App.onWindowAllClosed); // Quit when all windows are closed.
    App.application.on('ready', App.onReady); // App is ready to load data
    App.application.on('activate', App.onActivate); // App is activated
  }
}
