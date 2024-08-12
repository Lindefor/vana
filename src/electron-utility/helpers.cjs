const { app } = require('electron')
const path = require("path");
const fs = require("fs");
const { createHash } = require('crypto')
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

function getSubdir(habitDir, dirID) {
	for (const subDir of habitDir.subDirs) {
		if (subDir.id === dirID) {
			return subDir;
		}
	}
	
	for (const subDir of habitDir.subDirs) {
		return getSubdir(subDir, dirID);
	}
}

function updateHabits(habitDir, dirID) {
  
  const habitData = path.join(app.getPath("userData"), HABITS_DIR_PATH, "habits.json");
  fs.readFile(habitData, (err, data) => {
    if(err) throw err;
    const habits = JSON.parse(data.toString());
    let dirToReplace = (dirID === "0") ? habits:getSubdir(habits, dirID);
    if (dirToReplace) {
      // Replace the content of dirToReplace with habitDir
      Object.assign(dirToReplace, habitDir);
      
      // Write the updated habits back to the file
      fs.writeFile(habitData, JSON.stringify(habits, null, 2), (err) => {
        if (err) throw err;
        console.log('Habits updated successfully.');
      });
    } else {
      console.log('Directory to replace not found.');
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

function generateHash(...params) {
  const hash = createHash('sha256');
  params.forEach(param => {
    hash.update(param.toString());
  });
  return hash.digest('hex');
}

module.exports = { createHabitDirectories, readHabits, readHabit, generateHash, updateHabits };