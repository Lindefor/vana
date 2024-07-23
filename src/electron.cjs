/* eslint-disable @typescript-eslint/no-require-imports */
const path = require('path');
const { app, BrowserWindow } = require('electron');
const serve = require('electron-serve');
const ws = require('electron-window-state');
const { initIPC } = require('./electron-utility/ipc.cjs');
const { createHabitDirectories } = require('./electron-utility/helpers.cjs');
// const fs = require('fs');
// try { require("electron-reloader")(module); } catch {}

const port = process.env.PORT || 3000;
const isDev = !app.isPackaged || process.env.NODE_ENV == 'development';
const loadURL = serve({ directory: '.' });

/** @type {BrowserWindow} */
let mainWindow;
var splash;

function loadDev(port) {
	mainWindow.loadURL(`http://localhost:${port}`).catch(() => {
		setTimeout(() => {
			loadDev(port);
		}, 200);
	});
}

function loading() {
	mainWindow.loadFile('loading.html');
	splash = new BrowserWindow({
		width: 500,
		height: 300,
		transparent: true,
		frame: false,
		alwaysOnTop: true
	});
	splash.loadFile('loading.html');
	splash.center();
}

function createWindow() {
	let mws = ws({
		defaultWidth: 1000,
		defaultHeight: 800
	});
	// Create the browser window.
	mainWindow = new BrowserWindow({
		width: mws.width,
		minWidth: 1000,
		height: mws.height,
		minHeight: 900,

		backgroundColor: '#1C1C1E',
		show: false,

		webPreferences: {
			preload: path.join(__dirname, 'preload.cjs'),
			nodeIntegration: true,
			devTools: true
		},
		titleBarStyle: 'hiddenInset',
		trafficLightPosition: { x: 15, y: 15 }
	});

	loading();
	// Open the DevTools.
	if (isDev) {
		loadDev(port);
		mainWindow.webContents.openDevTools();
	} else {
		// mainWindow.removeMenu();
		loadURL(mainWindow);
		// mainWindow.loadFile(path.join(__dirname, 'build', 'index.html'));
	}

	mainWindow.center();
	mainWindow.once('ready-to-show', () => {
		// mainWindow.show();
	});
	mws.manage(mainWindow);
	initIPC(mainWindow);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
	createWindow();
	createHabitDirectories(mainWindow);
	setTimeout(() => {
		splash.close();
		mainWindow.show();
	}, 1700);
	app.on('activate', function () {
		// On macOS it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});
