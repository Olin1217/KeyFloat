import appUpdate from "../api/app/update.js";
import releases from "../api/_lib/releases.js";

if (releases.compareVersions("1.0.4", "1.0.4") !== 0 ||
    releases.compareVersions("1.0.3", "1.0.4") !== -1 ||
    releases.compareVersions("1.0.10", "1.0.4") !== 1 ||
    releases.compareVersions("invalid", "1.0.4") !== undefined) {
  throw new Error("Semantic release-version comparison is invalid.");
}

function responseDouble() {
  return {
    statusCode: 200,
    headers: {},
    payload: undefined,
    setHeader(name, value) { this.headers[name] = value; },
    status(code) { this.statusCode = code; return this; },
    json(payload) { this.payload = payload; return this; },
  };
}

async function call(url) {
  const response = responseDouble();
  await appUpdate({ method: "GET", url }, response);
  return response;
}

const macOSRelease = releases.releaseForPlatform("macos");
if (!macOSRelease) throw new Error("The macOS release manifest is invalid.");

let response = await call("/api/app/update?platform=macos&version=0.0.1");
if (response.statusCode !== 200 || response.payload?.latestVersion !== macOSRelease.latestVersion ||
    response.payload?.updateAvailable !== true || !response.payload?.downloadURL?.startsWith("https://keyfloat.cn/")) {
  throw new Error("The macOS update endpoint did not return a valid newer release.");
}
if (!String(response.headers["Cache-Control"] || "").includes("max-age=300")) {
  throw new Error("Valid update metadata must use a short public cache lifetime.");
}

response = await call(`/api/app/update?platform=macos&version=${encodeURIComponent(macOSRelease.latestVersion)}`);
if (response.statusCode !== 200 || response.payload?.updateAvailable !== false) {
  throw new Error("The current macOS release was incorrectly marked as outdated.");
}

response = await call("/api/app/update?platform=linux&version=1.0.4");
if (response.statusCode !== 400 || response.payload?.code !== "INVALID_UPDATE_REQUEST" ||
    response.headers["Cache-Control"] !== "no-store, max-age=0") {
  throw new Error("Invalid update requests must fail closed without caching.");
}

console.log("Validated version comparison, release metadata, update availability, and download URLs.");
