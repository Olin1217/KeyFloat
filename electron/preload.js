const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("keyfloat", {
  setExpanded: (expanded) =>
    ipcRenderer.invoke("window:set-expanded", Boolean(expanded)),
  setPinned: (pinned) =>
    ipcRenderer.invoke("window:set-pinned", Boolean(pinned)),
  quit: () => ipcRenderer.invoke("window:quit"),
  platform: process.platform,
});
