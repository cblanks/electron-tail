import { app, BrowserWindow, Menu } from 'electron';
import * as path from 'path';
import { template } from './src/electron-app/menu-template';
import { environment } from './src/environments/environment';
const windowStateKeeper = require('electron-window-state');
declare function require(moduleName: string): any;

if (!environment.production) {
  // Enable live reload for Electron.
  const electronReload = require('electron-reload');
  electronReload(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
    forceHardReset: true
  });
}

function createWindow() {
  // Load the previous state with fallback to defaults
  let mainWindowState = windowStateKeeper({
    defaultWidth: 900,
    defaultHeight: 600
  });
  
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    }
  });

  // Load the app content.
  if (environment.production) {
    mainWindow.loadFile(path.join(__dirname, '/dist/electron-tail/index.html'));

  } else {
    mainWindow.loadURL('http://localhost:4200/');
    
    // Open the DevTools.
    mainWindow.webContents.openDevTools({
      mode: 'detach',
    });
  }

  // Define app menu
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createWindow();

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
