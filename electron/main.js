const { app, BrowserWindow, ipcMain, screen } = require("electron");
const fs = require("fs");
const path = require("path");

const WINDOW_SIZE = {
  collapsed: { width: 224, height: 58 },
  expanded: { width: 432, height: 716 },
};

let mainWindow;
let saveTimer;

function stateFile() {
  return path.join(app.getPath("userData"), "window-state.json");
}

function readWindowState() {
  try {
    return JSON.parse(fs.readFileSync(stateFile(), "utf8"));
  } catch {
    return null;
  }
}

function saveWindowState() {
  if (!mainWindow || mainWindow.isDestroyed()) return;
  const bounds = mainWindow.getBounds();
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    try {
      fs.writeFileSync(
        stateFile(),
        JSON.stringify({ x: bounds.x, y: bounds.y }, null, 2),
      );
    } catch {
      // Window position persistence is a convenience; it should never block launch.
    }
  }, 180);
}

function initialBounds() {
  const saved = readWindowState();
  const display = saved
    ? screen.getDisplayNearestPoint({ x: saved.x, y: saved.y })
    : screen.getPrimaryDisplay();
  const area = display.workArea;
  const fallback = {
    x: area.x + area.width - WINDOW_SIZE.collapsed.width - 22,
    y: area.y + Math.max(84, Math.round(area.height * 0.16)),
  };

  if (!saved) return fallback;
  return {
    x: Math.min(
      Math.max(saved.x, area.x),
      area.x + area.width - WINDOW_SIZE.collapsed.width,
    ),
    y: Math.min(
      Math.max(saved.y, area.y),
      area.y + area.height - WINDOW_SIZE.collapsed.height,
    ),
  };
}

function createWindow() {
  const position = initialBounds();
  mainWindow = new BrowserWindow({
    ...WINDOW_SIZE.collapsed,
    ...position,
    show: false,
    frame: false,
    transparent: true,
    backgroundColor: "#00000000",
    resizable: false,
    movable: true,
    alwaysOnTop: true,
    skipTaskbar: false,
    fullscreenable: false,
    minimizable: false,
    maximizable: false,
    hasShadow: true,
    roundedCorners: true,
    title: "KeyFloat",
    ...(process.platform === "darwin"
      ? { vibrancy: "under-window", visualEffectState: "active" }
      : {}),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      devTools: !app.isPackaged,
    },
  });

  mainWindow.loadFile("index.html");
  mainWindow.setAlwaysOnTop(true, "floating");
  mainWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  mainWindow.on("move", saveWindowState);
  mainWindow.once("ready-to-show", () => mainWindow.show());
}

ipcMain.handle("window:set-expanded", (_event, expanded) => {
  if (!mainWindow || mainWindow.isDestroyed()) return null;

  const current = mainWindow.getBounds();
  const target = expanded ? WINDOW_SIZE.expanded : WINDOW_SIZE.collapsed;
  const display = screen.getDisplayMatching(current);
  const area = display.workArea;
  const rightEdge = current.x + current.width;
  const x = Math.min(
    Math.max(rightEdge - target.width, area.x),
    area.x + area.width - target.width,
  );
  const y = Math.min(
    Math.max(current.y, area.y),
    area.y + area.height - target.height,
  );

  mainWindow.setBounds({ x, y, ...target }, false);
  return { expanded, bounds: mainWindow.getBounds() };
});

ipcMain.handle("window:set-pinned", (_event, pinned) => {
  if (!mainWindow || mainWindow.isDestroyed()) return false;
  mainWindow.setAlwaysOnTop(Boolean(pinned), "floating");
  mainWindow.setVisibleOnAllWorkspaces(Boolean(pinned), {
    visibleOnFullScreen: Boolean(pinned),
  });
  return mainWindow.isAlwaysOnTop();
});

ipcMain.handle("window:quit", () => app.quit());

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
