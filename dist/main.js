"use strict";
const { app, BrowserWindow, ipcMain, Menu } = require("electron");
const path = require("node:path");
const { spawn } = require("child_process");
let mainWindow;
let editWindow;
const createEditWindow = () => {
  if (editWindow) {
    editWindow.focus();
    return;
  }
  editWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: "Editar",
    alwaysOnTop: true,
    parent: mainWindow,
    modal: true,
    autoHideMenuBar: true,
    resizable: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, "preload.js")
    }
  });
  editWindow.loadFile("./views/editar/edit.html");
  editWindow.on("closed", () => {
    editWindow = null;
  });
};
const createWindow = () => {
  const mainWindow2 = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    // closable: false,
    contextIsolation: true,
    enableRemoteModule: false,
    nodeIntegration: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    },
    fullscreen: true,
    // Abre en modo pantalla completa
    frame: true,
    // Con bordes de ventana
    autoHideMenuBar: true,
    // Oculta automáticamente la barra de menú
    resizable: true
  });
  {
    mainWindow2.loadURL("http://localhost:5173");
  }
  mainWindow2.once("ready-to-show", () => {
    mainWindow2.show();
  });
  const menuTemplate = [
    {
      label: "Archivo",
      submenu: [
        { role: "quit", label: "Salir" }
      ]
    },
    {
      label: "Opciones",
      submenu: [
        {
          label: "Editar",
          click: () => {
            createEditWindow();
          }
        }
      ]
    },
    {
      label: "Ayuda",
      submenu: [
        {
          label: "Acerca de",
          click: () => {
            console.log("Mostrar información de la aplicación");
          }
        }
      ]
    }
  ];
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
  mainWindow2.webContents.on("before-input-event", (event, input) => {
    if (input.key === "F11") {
      mainWindow2.setMenuBarVisibility(true);
    }
    if (input.key === "F12") {
      mainWindow2.webContents.toggleDevTools();
    }
  });
};
function startServer() {
  return new Promise((resolve, reject) => {
    const serverProcess = spawn("node", ["./server/index.js"], {
      // detached: true,  // El proceso se ejecuta en segundo plano
      stdio: "inherit",
      shell: true
    });
    serverProcess.unref();
    resolve();
  });
}
function imprimirRespuestaTurno(respuesta) {
  const ventanaImpresion = new BrowserWindow({ show: false });
  ventanaImpresion.loadURL("data:text/html;charset=utf-8," + encodeURIComponent(`
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
        <\/script>
      </body>
      </html>
  `));
  ventanaImpresion.webContents.on("did-finish-load", () => {
    ventanaImpresion.webContents.print({
      silent: true,
      // Cambia a true para imprimir sin mostrar el diálogo
      printBackground: true
    }, (success, errorType) => {
      if (!success) console.error("Error en la impresión:", errorType);
      ventanaImpresion.close();
    });
  });
}
ipcMain.on("imprimir-turno", (event, respuesta) => {
  imprimirRespuestaTurno(respuesta);
});
app.whenReady().then(async () => {
  try {
    await startServer();
    createWindow();
    app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
      }
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
