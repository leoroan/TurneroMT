const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const path = require('node:path');
const { spawn } = require('child_process')

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const editWindow = (mainWindow) => {
  // Crear la nueva ventana de edición
  const editWindow = new BrowserWindow({
    width: 400,
    height: 300,
    title: 'Editar',
    alwaysOnTop: true,
    parent: mainWindow, // Hacer que la ventana de edición sea hija de la principal
    modal: true,
    autoHideMenuBar: true,
    resizable: true,
    webPreferences: {
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
    },
  });

  // Verifica si la ventana ya está abierta
  if (editWindow) {
    editWindow.focus();
    return;
  }

  editWindow.loadFile(path.join(__dirname, `../views/editar/edit.html`)); // Cargar el contenido de la ventana de edición

  // Liberar el objeto editWindow cuando se cierre la ventana
  editWindow.on('closed', () => {
    editWindow = null;
  });
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    // closable: false,
    contextIsolation: true,
    enableRemoteModule: false,
    nodeIntegration: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
    fullscreen: true, // Abre en modo pantalla completa
    frame: true, // Con bordes de ventana
    autoHideMenuBar: true, // Oculta automáticamente la barra de menú
    resizable: true,
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  })

  // Definir el menú personalizado
  const menuTemplate = [
    {
      label: 'Archivo',
      submenu: [
        { role: 'quit', label: 'Salir' }
      ]
    },
    {
      label: 'Opciones',
      submenu: [
        {
          label: 'Editar',
          click: () => { editWindow(editWindow) }
        }
      ]
    },
    {
      label: 'Ayuda',
      submenu: [
        {
          label: 'Acerca de',
          click: () => {
            console.log('Mostrar información de la aplicación');
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);

  mainWindow.webContents.on('before-input-event', (event, input) => {
    if (input.key === 'F11') {
      mainWindow.setMenuBarVisibility(true)
    }
    if (input.key === 'F12') {
      mainWindow.webContents.toggleDevTools(); // Alternar DevTools
    }
  });
  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};

// Iniciar servidor Express en paralelo con Electron
function startServer() {
  const serverProcess = spawn('node', ['./server/index.js'], {
    stdio: 'inherit',
    shell: true
  })

  serverProcess.on('close', (code) => {
    console.log(`Server exited with code ${code}`)
  })
}

function imprimirRespuestaTurno(respuesta) {
  const ventanaImpresion = new BrowserWindow({ show: false });
  ventanaImpresion.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(`
    <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Impresión de Turno</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 20px;
          }
          .container {
            border: 1px solid #000;
            padding: 20px;
            width: 300px;
            text-align: center;
          }
          h1 {
            font-size: 18px;
            margin-bottom: 10px;
          }
          p {
            margin: 5px 0;
          }
          .label {
            font-weight: bold;
          }
          .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #555;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Detalles del Turno</h1>
          <p><span class="label">Servicio:</span> ${respuesta.servicio}</p>
          <p><span class="label">Número de Turno:</span> ${respuesta.numero}</p>
          <div class="footer">
            <p>Impreso el: <span id="fechaActual"></span></p>
          </div>
        </div>

        <script>
          // Script para mostrar la fecha actual de impresión
          document.getElementById('fechaActual').innerText = new Date().toLocaleDateString();
        </script>
      </body>
      </html>
  `));

  ventanaImpresion.webContents.on('did-finish-load', () => {
    ventanaImpresion.webContents.print({
      silent: true, // Cambia a true para imprimir sin mostrar el diálogo
      printBackground: true,
    }, (success, errorType) => {
      if (!success) console.error("Error en la impresión:", errorType);
      ventanaImpresion.close();
    });
  });
}

// Escuchar el evento de impresión desde el renderer
ipcMain.on('imprimir-turno', (event, respuesta) => {
  imprimirRespuestaTurno(respuesta);
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  startServer();
  createWindow();
  // editWindow()

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
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

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
