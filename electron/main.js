import { app, BrowserWindow, ipcMain } from 'electron';
import { createServer } from 'http';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../server/.env') });

const isDev = process.env.NODE_ENV === 'development';
const PORT = 4000;

let httpServer;

async function startExpressServer() {
  const { default: expressApp } = await import('../server/src/index.js');
  const { ConnectDB } = await import('../server/src/lib/db.js'); // ← import your DB

  await ConnectDB(); // ← connect before server starts

  httpServer = createServer(expressApp);

  await new Promise((resolve) => {
    httpServer.listen(PORT, () => {
      console.log(`Express running on http://localhost:${PORT}`);
      resolve();
    });
  });
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.cjs'),
    },
  });

  if (isDev) {
    win.loadURL('http://localhost:5173');
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(__dirname, '../client/dist/index.html'));
  }
}

ipcMain.handle('ping', () => 'pong');

app.whenReady().then(async () => {
  await startExpressServer();
  createWindow();
});

app.on('window-all-closed', () => {
  httpServer?.close();
  if (process.platform !== 'darwin') app.quit();
});