const { contextBridge, ipcRenderer } = require('electron')
const path = require('path');

contextBridge.exposeInMainWorld('electron', {
  getPathSeparator: () => path.sep,
  getFilesRoot: () => ipcRenderer.invoke('get-files-root'),
  generateHash: (...params) => {
    return new Promise((resolve, reject) => {
      ipcRenderer.invoke('generate-hash', params)
      .then(hash => resolve(hash))
      .catch(error => reject(error));
    });
  },
  readHabits: () => { //readFiles
    ipcRenderer.send('load-habits'); //load-files
  },
  updateHabits: (habitDir, dirID) => {
    ipcRenderer.send('update-habits', habitDir, dirID)
  },
  readFromPath: (pathToDir, file) => {
    ipcRenderer.send('load-from-path', pathToDir, file);
  },
  copyFromPath: (fromPath, toPath) => {
    ipcRenderer.send('copy-from-path', fromPath, toPath);
  },
  onLoadedHabits: (func) => {
    ipcRenderer.on('habits-loaded', (_, data) => func(data));
  },
  onLoadedHabit: (func) => { //receiveLoadedFile
    ipcRenderer.on('habit-loaded', (_, data) => func(data)); //file-loaded
  },
  habitSystemRemove: (func) => { //fileSystemRemove
    ipcRenderer.on('hs-removed', (_, fullPath) => func(fullPath));
  },
  directoryChange: (func) => {
    ipcRenderer.on('dir-changed', (_, dir, filename) => func(dir, filename));
  },
})