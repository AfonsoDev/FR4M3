import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import { fileURLToPath } from 'url';
import path from 'path';
import { setWallpaper } from 'wallpaper';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
    },
  });

  mainWindow.loadFile('index.html');

  ipcMain.handle('dialog:openFile', async () => {
    const result = await dialog.showOpenDialog(mainWindow, {
      properties: ['openFile'],
      filters: [
        { name: 'Images', extensions: ['jpg', 'jpeg', 'png', 'bmp'] }, // Apenas arquivos de imagem
      ],
    });

    // Verifica se o usuário cancelou o diálogo
    if (result.canceled) return null;

    // Retorna o caminho absoluto do arquivo selecionado
    return result.filePaths[0];
  });

  ipcMain.handle('set-wallpaper', async (event, imagePath) => {
    try {
      await setWallpaper(imagePath); // Define o wallpaper
      return { success: true };
    } catch (error) {
      console.error('Erro ao alterar o wallpaper:', error);
      return { success: false, error: error.message };
    }
  });
});
