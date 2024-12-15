let selectedFilePath = null;

document.getElementById('selectFileButton').addEventListener('click', async () => {
  const filePath = await window.electronAPI.selectFile(); // Abre o diálogo de seleção de arquivos

  if (filePath) {
    selectedFilePath = filePath; // Armazena o caminho do arquivo selecionado
    document.getElementById('status').textContent = `Arquivo selecionado: ${filePath}`;
    document.getElementById('setWallpaperButton').disabled = false; // Ativa o botão
  } else {
    document.getElementById('status').textContent = 'Nenhum arquivo selecionado.';
  }
});

document.getElementById('setWallpaperButton').addEventListener('click', async () => {
  if (!selectedFilePath) {
    document.getElementById('status').textContent = 'Por favor, selecione uma imagem!';
    return;
  }

  const result = await window.electronAPI.setWallpaper(selectedFilePath);

  if (result.success) {
    document.getElementById('status').textContent = 'Wallpaper alterado com sucesso!';
  } else {
    document.getElementById('status').textContent = `Erro ao alterar o wallpaper: ${result.error}`;
  }
});
