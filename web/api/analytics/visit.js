const { readSession } = require("../_lib/auth");
const { allowMethods, setNoStore } = require("../_lib/http");
const { recordWebsiteVisit } = require("../_lib/analytics");

module.exports = async function visit(request, response) {
  setNoStore(response);
  if (!allowMethods(request, response, ["POST"])) return;
  const session = readSession(request);
  if (!session || session.role !== "customer") {
    return response.status(401).json({ code: "AUTH_REQUIRED" });
  }
  try {
    const user = await recordWebsiteVisit(session.email);
    return response.status(200).json({ recorded: true, visitCount: user.visitCount });
  } catch (error) {
    return response.status(503).json({ code: error.code || "ANALYTICS_UNAVAILABLE" });
  }
};
