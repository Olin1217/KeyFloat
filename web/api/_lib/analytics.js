const { normalizeEmail } = require("./auth");
const { getJSON, privateKey, updateJSONMapEntry } = require("./store");

function usersKey() {
  return privateKey("analytics", "verified-users");
}

function downloadsKey() {
  return privateKey("analytics", "download-clicks");
}

function normalizeDownloadPlatform(platform) {
  const normalized = String(platform || "").trim().toLowerCase();
  return normalized === "macos" || normalized === "windows" ? normalized : undefined;
}

function validTimestamp(value, fallback) {
  const date = new Date(value || "");
  return Number.isNaN(date.getTime()) ? fallback : date.toISOString();
}

async function registerUser(email, { firstSeenAt, authenticatedAt } = {}) {
  const normalized = normalizeEmail(email);
  if (!normalized) return undefined;
  const now = new Date().toISOString();
  const firstSeen = validTimestamp(firstSeenAt, now);
  return updateJSONMapEntry(usersKey(), normalized, {
    setIfAbsent: {
      email: normalized,
      visitCount: 0,
      firstSeenAt: firstSeen,
    },
    set: {
      email: normalized,
      ...(authenticatedAt !== false ? { lastAuthenticatedAt: validTimestamp(authenticatedAt, now) } : {}),
    },
  });
}

async function recordWebsiteVisit(email) {
  const normalized = normalizeEmail(email);
  if (!normalized) return undefined;
  const now = new Date().toISOString();
  return updateJSONMapEntry(usersKey(), normalized, {
    setIfAbsent: {
      email: normalized,
      visitCount: 0,
      firstSeenAt: now,
      firstVisitAt: now,
    },
    set: {
      email: normalized,
      lastVisitAt: now,
      lastAuthenticatedAt: now,
    },
    increment: { visitCount: 1 },
  });
}

async function recordDownloadClick(platform) {
  const normalized = normalizeDownloadPlatform(platform);
  if (!normalized) return undefined;
  const now = new Date().toISOString();
  return updateJSONMapEntry(downloadsKey(), normalized, {
    setIfAbsent: {
      platform: normalized,
      clickCount: 0,
      firstClickedAt: now,
    },
    set: {
      platform: normalized,
      lastClickedAt: now,
    },
    increment: { clickCount: 1 },
  });
}

async function listDownloadClicks() {
  const stored = await getJSON(downloadsKey());
  const platforms = Object.fromEntries(["macos", "windows"].map((platform) => {
    const record = stored && typeof stored === "object" && !Array.isArray(stored) ? stored[platform] : undefined;
    return [platform, {
      platform,
      clickCount: Math.max(0, Number(record?.clickCount) || 0),
      ...(record?.firstClickedAt ? { firstClickedAt: record.firstClickedAt } : {}),
      ...(record?.lastClickedAt ? { lastClickedAt: record.lastClickedAt } : {}),
    }];
  }));
  return {
    platforms,
    metrics: {
      totalDownloads: platforms.macos.clickCount + platforms.windows.clickCount,
      macOSDownloads: platforms.macos.clickCount,
      windowsDownloads: platforms.windows.clickCount,
    },
  };
}

async function listUsers() {
  const stored = await getJSON(usersKey());
  const users = Object.values(stored && typeof stored === "object" && !Array.isArray(stored) ? stored : {})
    .filter((user) => normalizeEmail(user?.email))
    .map((user) => ({
      email: normalizeEmail(user.email),
      visitCount: Math.max(0, Number(user.visitCount) || 0),
      firstSeenAt: user.firstSeenAt,
      ...(user.firstVisitAt ? { firstVisitAt: user.firstVisitAt } : {}),
      ...(user.lastVisitAt ? { lastVisitAt: user.lastVisitAt } : {}),
      ...(user.lastAuthenticatedAt ? { lastAuthenticatedAt: user.lastAuthenticatedAt } : {}),
    }))
    .sort((first, second) => {
      const firstTime = new Date(first.lastVisitAt || first.lastAuthenticatedAt || first.firstSeenAt).getTime() || 0;
      const secondTime = new Date(second.lastVisitAt || second.lastAuthenticatedAt || second.firstSeenAt).getTime() || 0;
      return secondTime - firstTime || first.email.localeCompare(second.email);
    });
  return {
    users,
    metrics: {
      totalUsers: users.length,
      totalVisits: users.reduce((total, user) => total + user.visitCount, 0),
      usersWithVisits: users.filter((user) => user.visitCount > 0).length,
    },
  };
}

module.exports = {
  listDownloadClicks,
  listUsers,
  normalizeDownloadPlatform,
  recordDownloadClick,
  recordWebsiteVisit,
  registerUser,
};
