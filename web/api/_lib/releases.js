const manifest = require("../../release-manifest.json");

const VERSION_PATTERN = /^\d+(?:\.\d+){1,3}$/;

function versionParts(value) {
  const normalized = String(value || "").trim();
  if (!VERSION_PATTERN.test(normalized)) return undefined;
  return normalized.split(".").map(Number);
}

function compareVersions(first, second) {
  const a = versionParts(first);
  const b = versionParts(second);
  if (!a || !b) return undefined;
  const length = Math.max(a.length, b.length);
  for (let index = 0; index < length; index += 1) {
    const difference = (a[index] || 0) - (b[index] || 0);
    if (difference) return difference < 0 ? -1 : 1;
  }
  return 0;
}

function httpsURL(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password ? url.toString() : undefined;
  } catch {
    return undefined;
  }
}

function releaseForPlatform(platform) {
  const normalizedPlatform = String(platform || "").toLowerCase();
  if (!["macos", "windows"].includes(normalizedPlatform)) return undefined;
  const configured = manifest[normalizedPlatform];
  const prefix = normalizedPlatform === "macos" ? "KEYFLOAT_MACOS" : "KEYFLOAT_WINDOWS";
  const latestVersion = String(process.env[`${prefix}_LATEST_VERSION`] || configured?.latestVersion || "").trim();
  const downloadURL = httpsURL(process.env[`${prefix}_DOWNLOAD_URL`] || configured?.downloadURL);
  if (!versionParts(latestVersion) || !downloadURL) return undefined;
  return {
    platform: normalizedPlatform,
    latestVersion,
    build: String(configured?.build || ""),
    downloadURL,
    publishedAt: configured?.publishedAt,
    minimumSystemVersion: configured?.minimumSystemVersion,
    releaseNotes: {
      zh: String(configured?.releaseNotes?.zh || ""),
      en: String(configured?.releaseNotes?.en || ""),
    },
  };
}

module.exports = { compareVersions, releaseForPlatform, versionParts };
