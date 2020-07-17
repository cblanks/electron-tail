import { app, shell } from 'electron';
const pjson = require('../package.json')

const isMac = process.platform === 'darwin'

export const template: Electron.MenuItemConstructorOptions[] = [
  {
    label: 'Menu',
    submenu: [
      {
        label: `About ${pjson.productName}`,
        click() {
          shell.openExternal(pjson.repository)
        }
      },
      { type: 'separator' },
      {
        label: `Quit ${pjson.productName}`,
        click() {
          app.quit()
        },
        accelerator: 'CmdOrCtrl+Q'
      }
    ]
  }
];
