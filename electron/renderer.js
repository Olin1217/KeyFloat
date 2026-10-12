const library = window.SHORTCUT_LIBRARY;

const UI = {
  zh: {
    helper: "快捷键助手",
    library: "快捷键库",
    search: "搜索命令、工具或按键",
    all: "全部",
    favorites: "收藏",
    allShortcuts: "全部快捷键",
    favoriteShortcuts: "已收藏快捷键",
    searchResults: "搜索结果",
    items: "项",
    pickerTitle: "选择软件",
    pickerSubtitle: "切换当前快捷键库",
    pickerNote: "更多设计、视频与 3D 软件快捷键库会持续加入。",
    emptyTitle: "没有找到快捷键",
    emptySearch: "试试搜索中文、英文、工具名或具体按键。",
    emptyFavorite: "点击快捷键右侧的星标，把常用命令收进这里。",
    pin: "置顶窗口",
    unpin: "取消置顶",
    collapse: "收起",
    quit: "退出",
    languageAction: "Switch to English",
    footerMac: "<kbd>Esc</kbd> 收起 · <kbd>⌘ K</kbd> 搜索",
    footerWin: "<kbd>Esc</kbd> 收起 · <kbd>Ctrl K</kbd> 搜索",
    expand: "展开快捷键助手",
    addedFavorite: "取消收藏",
    addFavorite: "收藏快捷键",
    categories: "分类",
  },
  en: {
    helper: "Shortcut companion",
    library: "Shortcut library",
    search: "Search commands, tools or keys",
    all: "All",
    favorites: "Favorites",
    allShortcuts: "All shortcuts",
    favoriteShortcuts: "Favorite shortcuts",
    searchResults: "Search results",
    items: "items",
    pickerTitle: "Choose software",
    pickerSubtitle: "Switch the active shortcut library",
    pickerNote: "More design, video and 3D shortcut packs are on the way.",
    emptyTitle: "No shortcuts found",
    emptySearch: "Try a command, tool, key, or its name in either language.",
    emptyFavorite: "Use the star beside a shortcut to keep it here.",
    pin: "Pin window",
    unpin: "Unpin window",
    collapse: "Collapse",
    quit: "Quit",
    languageAction: "切换到中文",
    footerMac: "<kbd>Esc</kbd> collapse · <kbd>⌘ K</kbd> search",
    footerWin: "<kbd>Esc</kbd> collapse · <kbd>Ctrl K</kbd> search",
    expand: "Expand shortcut companion",
    addedFavorite: "Remove favorite",
    addFavorite: "Add favorite",
    categories: "Categories",
  },
};

const DEFAULT_STATE = {
  expanded: false,
  language: "zh",
  software: "figma",
  platform: window.keyfloat?.platform === "win32" ? "win" : "mac",
  category: "all",
  filter: "all",
  query: "",
  pinned: true,
  favorites: [],
};

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem("keyfloat:preferences"));
    if (!saved || typeof saved !== "object") return { ...DEFAULT_STATE };
    return {
      ...DEFAULT_STATE,
      ...saved,
      expanded: false,
      software: library[saved.software] ? saved.software : "figma",
      language: saved.language === "en" ? "en" : "zh",
      platform: saved.platform === "win" ? "win" : "mac",
      favorites: Array.isArray(saved.favorites) ? saved.favorites : [],
    };
  } catch {
    return { ...DEFAULT_STATE };
  }
}

const state = loadState();
state.favorites = new Set(state.favorites);

const $ = (selector) => document.querySelector(selector);
const elements = {
  collapsed: $("#collapsed"),
  collapsedLogo: $("#collapsed-logo"),
  collapsedName: $("#collapsed-name"),
  collapsedHint: $("#collapsed-hint"),
  collapsedCount: $("#collapsed-count"),
  panel: $("#expanded"),
  softwareButton: $("#software-button"),
  headerLogo: $("#header-logo"),
  softwareName: $("#software-name"),
  libraryLabel: $("#library-label"),
  pinButton: $("#pin-button"),
  langButton: $("#lang-button"),
  collapseButton: $("#collapse-button"),
  closeButton: $("#close-button"),
  search: $("#search-input"),
  searchKey: $("#search-key"),
  allFilter: $("#all-filter"),
  favoriteFilter: $("#favorite-filter"),
  favoriteFilterLabel: $("#favorite-filter-label"),
  macButton: $("#mac-button"),
  winButton: $("#win-button"),
  categoryTabs: $("#category-tabs"),
  resultSummary: $("#result-summary"),
  resultCount: $("#result-count"),
  shortcutList: $("#shortcut-list"),
  footerTip: $("#footer-tip"),
  picker: $("#software-picker"),
  pickerBackdrop: $("#picker-backdrop"),
  pickerClose: $("#picker-close"),
  pickerTitle: $("#picker-title"),
  pickerSubtitle: $("#picker-subtitle"),
  pickerNote: $("#picker-note"),
  softwareGrid: $("#software-grid"),
};

function persist() {
  try {
    localStorage.setItem(
      "keyfloat:preferences",
      JSON.stringify({
        language: state.language,
        software: state.software,
        platform: state.platform,
        pinned: state.pinned,
        favorites: [...state.favorites],
      }),
    );
  } catch {
    // The app remains fully usable if storage is unavailable.
  }
}

function totalShortcuts(software) {
  return software.categories.reduce((sum, group) => sum + group.items.length, 0);
}

function applyLogo(element, software) {
  element.className = `app-logo${software.id === "figma" ? " app-logo--figma" : ""}`;
  if (software.id === "figma") {
    element.removeAttribute("data-glyph");
  } else {
    element.dataset.glyph = software.glyph;
  }
}

function applyTheme(software) {
  document.documentElement.style.setProperty("--accent", software.accent);
  document.documentElement.style.setProperty("--accent-rgb", software.accentRgb);
}

function favoriteKey(item) {
  return `${state.software}:${item.id}`;
}

function normalized(value) {
  return String(value || "")
    .toLocaleLowerCase()
    .replaceAll("command", "cmd")
    .replaceAll("control", "ctrl")
    .replaceAll("option", "alt")
    .replaceAll("⌘", "cmd")
    .replaceAll("⌥", "alt")
    .replaceAll("⌃", "ctrl")
    .replaceAll("⇧", "shift")
    .replace(/\s+/g, " ")
    .trim();
}

function matches(item, group, query) {
  if (!query) return true;
  const haystack = normalized([
    item.zh,
    item.en,
    group.zh,
    group.en,
    ...(item.keys.mac || []),
    ...(item.keys.win || []),
    ...(item.tags || []),
  ].join(" "));
  return query.split(" ").every((token) => haystack.includes(token));
}

function currentRows() {
  const software = library[state.software];
  const query = normalized(state.query);
  return software.categories
    .filter((group) => state.category === "all" || group.id === state.category)
    .map((group) => ({
      group,
      items: group.items.filter((item) => {
        if (state.filter === "favorites" && !state.favorites.has(favoriteKey(item))) return false;
        return matches(item, group, query);
      }),
    }))
    .filter(({ items }) => items.length);
}

function createKeyCombo(keys) {
  const combo = document.createElement("div");
  combo.className = "key-combo";
  keys.forEach((key) => {
    const cap = document.createElement("span");
    cap.className = "keycap";
    cap.textContent = key;
    combo.appendChild(cap);
  });
  return combo;
}

function starIcon() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 16 16");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", "m8 2 1.7 3.6 3.9.5-2.9 2.8.8 4L8 11l-3.5 1.9.8-4-2.9-2.8 3.9-.5L8 2Z");
  svg.appendChild(path);
  return svg;
}

function renderCategories() {
  const software = library[state.software];
  const t = UI[state.language];
  elements.categoryTabs.replaceChildren();

  const entries = [
    { id: "all", zh: "全部分类", en: "All categories" },
    ...software.categories,
  ];
  entries.forEach((entry) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `category-tab${state.category === entry.id ? " is-active" : ""}`;
    button.textContent = entry[state.language];
    button.setAttribute("aria-label", `${t.categories}: ${entry[state.language]}`);
    button.addEventListener("click", () => {
      state.category = entry.id;
      render();
      button.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    });
    elements.categoryTabs.appendChild(button);
  });
}

function renderList() {
  const rows = currentRows();
  const t = UI[state.language];
  elements.shortcutList.replaceChildren();
  const shown = rows.reduce((sum, entry) => sum + entry.items.length, 0);
  elements.resultCount.textContent = `${shown} ${t.items}`;

  if (state.query) {
    elements.resultSummary.textContent = `${t.searchResults} · “${state.query}”`;
  } else if (state.filter === "favorites") {
    elements.resultSummary.textContent = t.favoriteShortcuts;
  } else if (state.category !== "all") {
    const group = library[state.software].categories.find((entry) => entry.id === state.category);
    elements.resultSummary.textContent = group?.[state.language] || t.allShortcuts;
  } else {
    elements.resultSummary.textContent = t.allShortcuts;
  }

  if (!shown) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.innerHTML = '<div class="empty-icon"><svg viewBox="0 0 20 20"><circle cx="8.5" cy="8.5" r="5"/><path d="m12.2 12.2 3.6 3.6"/></svg></div>';
    const title = document.createElement("strong");
    title.textContent = t.emptyTitle;
    const copy = document.createElement("p");
    copy.textContent = state.filter === "favorites" && !state.query ? t.emptyFavorite : t.emptySearch;
    empty.append(title, copy);
    elements.shortcutList.appendChild(empty);
    return;
  }

  const fragment = document.createDocumentFragment();
  rows.forEach(({ group, items }) => {
    const section = document.createElement("section");
    section.className = "shortcut-section";
    const heading = document.createElement("div");
    heading.className = "section-heading";
    heading.textContent = group[state.language];
    section.appendChild(heading);

    items.forEach((item) => {
      const row = document.createElement("article");
      row.className = "shortcut-row";

      const copy = document.createElement("div");
      copy.className = "command-copy";
      const name = document.createElement("div");
      name.className = "command-name";
      name.textContent = item[state.language];
      const alias = document.createElement("div");
      alias.className = "command-alias";
      alias.textContent = item[state.language === "zh" ? "en" : "zh"];
      copy.append(name, alias);

      const key = favoriteKey(item);
      const favorite = document.createElement("button");
      const isFavorite = state.favorites.has(key);
      favorite.type = "button";
      favorite.className = `favorite-button${isFavorite ? " is-favorite" : ""}`;
      favorite.title = isFavorite ? t.addedFavorite : t.addFavorite;
      favorite.setAttribute("aria-label", favorite.title);
      favorite.appendChild(starIcon());
      favorite.addEventListener("click", () => {
        if (state.favorites.has(key)) state.favorites.delete(key);
        else state.favorites.add(key);
        persist();
        renderList();
      });

      row.append(copy, createKeyCombo(item.keys[state.platform]), favorite);
      section.appendChild(row);
    });
    fragment.appendChild(section);
  });
  elements.shortcutList.appendChild(fragment);
}

function renderSoftwareGrid() {
  elements.softwareGrid.replaceChildren();
  Object.values(library).forEach((software) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `software-option${state.software === software.id ? " is-selected" : ""}`;
    button.style.setProperty("--option-color", software.accent);
    button.style.setProperty("--option-rgb", software.accentRgb);

    const logo = document.createElement("span");
    applyLogo(logo, software);
    const copy = document.createElement("span");
    copy.className = "option-copy";
    const name = document.createElement("strong");
    name.textContent = software.name;
    const count = document.createElement("small");
    count.textContent = `${totalShortcuts(software)} ${UI[state.language].items}`;
    copy.append(name, count);
    button.append(logo, copy);
    button.addEventListener("click", () => selectSoftware(software.id));
    elements.softwareGrid.appendChild(button);
  });
}

function renderChrome() {
  const t = UI[state.language];
  const software = library[state.software];
  document.documentElement.lang = state.language === "zh" ? "zh-CN" : "en";
  document.title = `${software.name} · KeyFloat`;
  applyTheme(software);
  applyLogo(elements.collapsedLogo, software);
  applyLogo(elements.headerLogo, software);
  elements.collapsedName.textContent = software.name;
  elements.softwareName.textContent = software.name;
  elements.collapsedHint.textContent = t.helper;
  elements.libraryLabel.textContent = t.library;
  elements.collapsedCount.textContent = totalShortcuts(software);
  elements.collapsed.setAttribute("aria-label", t.expand);
  elements.search.placeholder = t.search;
  elements.searchKey.textContent = state.platform === "mac" ? "⌘ K" : "Ctrl K";
  elements.allFilter.textContent = t.all;
  elements.favoriteFilterLabel.textContent = t.favorites;
  elements.allFilter.classList.toggle("is-active", state.filter === "all");
  elements.favoriteFilter.classList.toggle("is-active", state.filter === "favorites");
  elements.macButton.classList.toggle("is-active", state.platform === "mac");
  elements.winButton.classList.toggle("is-active", state.platform === "win");
  elements.langButton.textContent = state.language === "zh" ? "中" : "EN";
  elements.langButton.setAttribute("aria-label", t.languageAction);
  elements.langButton.title = t.languageAction;
  elements.pinButton.classList.toggle("is-active", state.pinned);
  elements.pinButton.title = state.pinned ? t.unpin : t.pin;
  elements.pinButton.setAttribute("aria-label", elements.pinButton.title);
  elements.collapseButton.title = t.collapse;
  elements.collapseButton.setAttribute("aria-label", t.collapse);
  elements.closeButton.title = t.quit;
  elements.closeButton.setAttribute("aria-label", t.quit);
  elements.footerTip.innerHTML = state.platform === "mac" ? t.footerMac : t.footerWin;
  elements.pickerTitle.textContent = t.pickerTitle;
  elements.pickerSubtitle.textContent = t.pickerSubtitle;
  elements.pickerNote.textContent = t.pickerNote;
}

function render() {
  renderChrome();
  renderCategories();
  renderList();
  renderSoftwareGrid();
}

async function setExpanded(expanded) {
  state.expanded = expanded;
  if (expanded) {
    await window.keyfloat?.setExpanded(true);
    elements.collapsed.style.display = "none";
    elements.panel.classList.add("is-visible");
    elements.panel.setAttribute("aria-hidden", "false");
  } else {
    closePicker();
    elements.panel.classList.remove("is-visible");
    elements.panel.setAttribute("aria-hidden", "true");
    elements.collapsed.style.display = "flex";
    await window.keyfloat?.setExpanded(false);
  }
}

function openPicker() {
  elements.picker.classList.add("is-open");
  elements.picker.setAttribute("aria-hidden", "false");
  elements.softwareButton.setAttribute("aria-expanded", "true");
}

function closePicker() {
  elements.picker.classList.remove("is-open");
  elements.picker.setAttribute("aria-hidden", "true");
  elements.softwareButton.setAttribute("aria-expanded", "false");
}

function selectSoftware(id) {
  state.software = id;
  state.category = "all";
  state.query = "";
  state.filter = "all";
  elements.search.value = "";
  elements.shortcutList.scrollTop = 0;
  persist();
  closePicker();
  render();
}

function setPlatform(platform) {
  state.platform = platform;
  persist();
  renderChrome();
  renderList();
}

elements.collapsed.addEventListener("click", () => setExpanded(true));
elements.collapseButton.addEventListener("click", () => setExpanded(false));
elements.closeButton.addEventListener("click", () => window.keyfloat?.quit());
elements.softwareButton.addEventListener("click", () => {
  if (elements.picker.classList.contains("is-open")) closePicker();
  else openPicker();
});
elements.pickerBackdrop.addEventListener("click", closePicker);
elements.pickerClose.addEventListener("click", closePicker);
elements.langButton.addEventListener("click", () => {
  state.language = state.language === "zh" ? "en" : "zh";
  persist();
  render();
});
elements.pinButton.addEventListener("click", async () => {
  state.pinned = !state.pinned;
  const actual = await window.keyfloat?.setPinned(state.pinned);
  if (typeof actual === "boolean") state.pinned = actual;
  persist();
  renderChrome();
});
elements.search.addEventListener("input", (event) => {
  state.query = event.target.value;
  renderList();
});
elements.allFilter.addEventListener("click", () => {
  state.filter = "all";
  render();
});
elements.favoriteFilter.addEventListener("click", () => {
  state.filter = "favorites";
  render();
});
elements.macButton.addEventListener("click", () => setPlatform("mac"));
elements.winButton.addEventListener("click", () => setPlatform("win"));

document.addEventListener("keydown", (event) => {
  const searchCommand = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";
  if (searchCommand && state.expanded) {
    event.preventDefault();
    elements.search.focus();
    elements.search.select();
    return;
  }
  if (event.key !== "Escape" || !state.expanded) return;
  if (elements.picker.classList.contains("is-open")) closePicker();
  else if (document.activeElement === elements.search && elements.search.value) {
    elements.search.value = "";
    state.query = "";
    renderList();
  } else {
    setExpanded(false);
  }
});

render();
window.keyfloat?.setPinned(state.pinned);
