const { readAdminSession } = require("../_lib/auth");
const { allowMethods, setNoStore } = require("../_lib/http");
const { listDownloadClicks } = require("../_lib/analytics");

module.exports = async function downloads(request, response) {
  setNoStore(response);
  if (!allowMethods(request, response, ["GET"])) return;
  const session = readAdminSession(request);
  if (!session) return response.status(401).json({ code: "AUTH_REQUIRED" });
  if (session.role !== "admin") return response.status(403).json({ code: "ADMIN_REQUIRED" });
  try {
    return response.status(200).json(await listDownloadClicks());
  } catch (error) {
    return response.status(503).json({ code: error.code || "DOWNLOAD_ANALYTICS_UNAVAILABLE" });
  }
};
