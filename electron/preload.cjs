const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // expose whatever you need from Node.js to React
  ping: () => ipcRenderer.invoke('ping'),
});