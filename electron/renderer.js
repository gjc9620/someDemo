// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.



//
// const {app, globalShortcut} = require('electron')
//
// app.on('ready', () => {
//   globalShortcut.register('CommandOrControl+X', () => {
//     console.log('CommandOrControl+X is pressed')
//   })
// })


const { clipboard }= require('electron');


debugger
const pasteBtn = document.getElementById('paste-to');

pasteBtn.addEventListener('click', function () {
  // debugger
  clipboard.writeText('I am a good guy');
});
