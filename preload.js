const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  selectFile: () =>
    ipcRenderer.invoke('dialog:openFile'), // Handler para abrir diálogo nativo
  setWallpaper: (imagePath) => ipcRenderer.invoke('set-wallpaper', imagePath),
});
