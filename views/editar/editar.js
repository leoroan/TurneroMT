// const { BrowserWindow } = require("electron");
alert("hola");
// function editWindow() {
//   // Crear la nueva ventana de edición
//   const editWindow = new BrowserWindow({
//     width: 800,
//     height: 600,
//     title: 'Editar',
//     parent: mainWindow, // Hacer que la ventana de edición sea hija de la principal
//     modal: true,
//     webPreferences: {
//       contextIsolation: true,
//       enableRemoteModule: false,
//       nodeIntegration: false,
//     },
//   });

//   // Verifica si la ventana ya está abierta
//   if (editWindow) {
//     editWindow.focus();
//     return;
//   }

//   // editWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/edit.html`)); // Cargar el contenido de la ventana de edición
//   editWindow.loadFile(`./edit.html`); // Cargar el contenido de la ventana de edición

//   // Liberar el objeto editWindow cuando se cierre la ventana
//   editWindow.on('closed', () => {
//     editWindow = null;
//   });
// }

// module.exports = { editWindow };