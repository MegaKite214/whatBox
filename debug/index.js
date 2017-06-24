const elec = require('electron'); 
const app = elec.app;
const ipc = elec.ipcMain;
const BrowserWindow = elec.BrowserWindow;

var createWindow = function(){

    mainWindow = new BrowserWindow({
    width: 560, 
    height: 450, 
    //resizable: false, 
    //maximizable: false,
    fullscreenable: false,
    fullscreen: false,
    frame: true
  });

  mainWindow.isMenuBarVisible(false);
  mainWindow.setMenuBarVisibility(false);
  //centerWindow();

  mainWindow.openDevTools();
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  mainWindow.on('closed', function() { mainWindow = null; });

}

app.on('ready',createWindow);

//macOS tricks
app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) { createWindow(); }
});
