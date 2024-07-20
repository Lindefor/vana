const { app } = require('electron')
const path = require("path");
const fs = require("fs");

const HABITS_DIR_PATH = 'habits' // Path relative to app.getPath('userData')


// Habitsystem utility functions
function createHabitDirectories(mainwindow) {
  const habitData = path.join(app.getPath("userData"), HABITS_DIR_PATH);

  if (!fs.existsSync(habitData)) {
    fs.mkdirSync(habitData);
  }
  watchDir(habitData, mainwindow);
}

function watchDir(dir, mainwindow) {
  fs.watch(dir, (_, filename) => {
    if (filename) {
      mainwindow.webContents.send('dir-changed', {dir, filename});
    }
  });
}

function readHabits(pathToFile, mainwindow) {
//   watchDir(pathToDir, mainwindow);
  fs.readFile(pathToFile, (err, data) => {
    if(err) throw err;
    const habitsData = JSON.parse(data);
    const subDirs = habitsData.subDirs
    const habits = habitsData.habits
    mainwindow.webContents.send('habits-loaded', { habitsData, subDirs, habits });
  });
}

function readHabit(pathToFile, mainwindow) {
  fs.readFile(pathToFile, (err, data) => {
    if(err) throw err;
    const habitData = JSON.parse(data);
    const name = habitData.name
    const completed = habitData.completed
    const description = habitData.description
    mainwindow.webContents.send('habit-loaded', { name, completed, description });
  });
}


module.exports = { createHabitDirectories, readHabits, readHabit };