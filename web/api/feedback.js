const { readSession } = require("./_lib/auth");
const { allowMethods, requestIP, setNoStore } = require("./_lib/http");
const { submitFeedback } = require("./_lib/feedback");
const { consumeRateLimit, privateKey } = require("./_lib/store");

module.exports = async function feedback(request, response) {
  setNoStore(response);
  if (!allowMethods(request, response, ["POST"])) return;
  try {
    const rate = await consumeRateLimit(privateKey("feedback-rate", requestIP(request)), 12, 3_600);
    if (!rate.allowed) return response.status(429).json({ code: "RATE_LIMITED", retryAfter: 3_600 });
    const session = readSession(request);
    const source = request.body?.source === "macos" ? "macos" : "website";
    const result = await submitFeedback({
      source,
      kind: request.body?.kind,
      message: request.body?.message,
      contact: request.body?.contact,
      email: session?.role === "customer" ? session.email : undefined,
      softwareID: request.body?.softwareID,
      language: request.body?.language,
      appVersion: request.body?.appVersion,
      softwareName: request.body?.softwareName,
      softwareGroup: request.body?.softwareGroup,
      clientSubmissionId: request.body?.clientSubmissionId,
    });
    return response.status(result.duplicate ? 200 : 201).json({ submitted: true, feedback: result.feedback });
  } catch (error) {
    const status = error.code === "INVALID_FEEDBACK" ? 400
      : error.code === "FEEDBACK_BUSY" ? 409 : 503;
    return response.status(status).json({ code: error.code || "FEEDBACK_UNAVAILABLE" });
  }
};
