const { allowMethods } = require("../_lib/http");
const { compareVersions, releaseForPlatform, versionParts } = require("../_lib/releases");

function queryValue(request, name) {
  if (request.query && request.query[name] !== undefined) return request.query[name];
  try { return new URL(request.url || "", "http://localhost").searchParams.get(name); }
  catch { return undefined; }
}

module.exports = async function appUpdate(request, response) {
  if (!allowMethods(request, response, ["GET"])) return;
  const platform = String(queryValue(request, "platform") || "").toLowerCase();
  const currentVersion = String(queryValue(request, "version") || "").trim();
  const release = releaseForPlatform(platform);
  if (!release || !versionParts(currentVersion)) {
    response.setHeader("Cache-Control", "no-store, max-age=0");
    return response.status(400).json({ code: "INVALID_UPDATE_REQUEST" });
  }
  response.setHeader("Cache-Control", "public, max-age=300, stale-while-revalidate=600");
  return response.status(200).json({
    product: "keyfloat-desktop",
    currentVersion,
    ...release,
    updateAvailable: compareVersions(currentVersion, release.latestVersion) < 0,
  });
};
