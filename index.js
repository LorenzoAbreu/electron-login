const { app, BrowserWindow } = require('electron');
const path = require('path');

let window;

const showWindow = () => {
    window = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        show: false,
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true
        }
    })

    window.loadFile(path.join(__dirname, 'index.html'))

    window.once('ready-to-show', () => {
        window.show();
    })
}

app.on('ready', () => {
    showWindow();
})

app.on('window-all-closed', () => {
    app.quit();
})