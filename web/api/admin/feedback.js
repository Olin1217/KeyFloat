const { readAdminSession } = require("../_lib/auth");
const { allowMethods, setNoStore } = require("../_lib/http");
const { listFeedback } = require("../_lib/feedback");

module.exports = async function feedback(request, response) {
  setNoStore(response);
  if (!allowMethods(request, response, ["GET"])) return;
  const session = readAdminSession(request);
  if (!session) return response.status(401).json({ code: "AUTH_REQUIRED" });
  if (session.role !== "admin") return response.status(403).json({ code: "ADMIN_REQUIRED" });
  try {
    const feedback = await listFeedback(500);
    return response.status(200).json({
      feedback,
      metrics: {
        totalFeedback: feedback.length,
        websiteFeedback: feedback.filter((item) => item.source === "website").length,
        macOSFeedback: feedback.filter((item) => item.source === "macos").length,
        softwareRequests: feedback.filter((item) => item.kind === "software_request").length,
      },
    });
  } catch (error) {
    return response.status(503).json({ code: error.code || "FEEDBACK_UNAVAILABLE" });
  }
};
