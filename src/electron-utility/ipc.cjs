const {app, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");
const { readHabits, readHabit, generateHash, updateHabits } = require("./helpers.cjs")

const HABITS_DIR_PATH = 'habits' // Path relative to app.getPath('userData')

function initIPC(mainwindow) {
  
  ipcMain.handle('get-files-root', () => {
    return HABITS_DIR_PATH;
  });
  
  ipcMain.on("load-habits", () => {
    const habitData = path.join(app.getPath("userData"), HABITS_DIR_PATH);
    fs.readdir(habitData, (err, habits) => {
      if(err) throw err;
      habits.forEach(habit => {
        const pathToElement = path.join(habitData, habit);
        readHabits(pathToElement, mainwindow);
      });
    });
  });

  ipcMain.on('update-habits', (_, habitdir, dirID) => {
    updateHabits(habitdir, dirID);
  });

  ipcMain.handle('generate-hash', (...params) => {
    return generateHash(params)
  });
  
  ipcMain.on('load-from-path', (_, pathToDir, file) => {
    let fullPath = path.join(pathToDir, file);
    if (fs.existsSync(fullPath)) {
      if (fs.lstatSync(fullPath).isDirectory()) {
        readDir(fullPath, mainwindow);
      }
      else {
        readHabit(fullPath, mainwindow);
      }
    } 
    else {
      mainwindow.webContents.send('fs-removed', {fullPath});    
    }
  }); 
  
  ipcMain.on('copy-from-path', (_, fromPath, toPath) => {
    let filename = fromPath.split(path.sep);
    filename = filename[filename.length-1];
    const fullpath = path.join(toPath, filename);
    
    if (fs.lstatSync(fromPath).isDirectory()) {
      fs.cpSync(fromPath, fullpath, {recursive: true});
    }
    else {
      fs.copyFileSync(fromPath, fullpath);
    }
  });
}

module.exports = { initIPC };