const { readSession } = require("../_lib/auth");
const { allowMethods, setNoStore } = require("../_lib/http");
const { normalizeDownloadPlatform, recordDownloadClick } = require("../_lib/analytics");

module.exports = async function download(request, response) {
  setNoStore(response);
  if (!allowMethods(request, response, ["POST"])) return;
  const session = readSession(request);
  if (!session || session.role !== "customer") {
    return response.status(401).json({ code: "AUTH_REQUIRED" });
  }
  const platform = normalizeDownloadPlatform(request.body?.platform);
  if (!platform) return response.status(400).json({ code: "INVALID_PLATFORM" });
  try {
    const result = await recordDownloadClick(platform);
    return response.status(200).json({ recorded: true, platform, clickCount: result.clickCount });
  } catch (error) {
    return response.status(503).json({ code: error.code || "ANALYTICS_UNAVAILABLE" });
  }
};
