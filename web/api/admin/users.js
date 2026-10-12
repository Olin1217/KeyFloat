const { readAdminSession } = require("../_lib/auth");
const { allowMethods, setNoStore } = require("../_lib/http");
const { listUsers, registerUser } = require("../_lib/analytics");
const { listPaymentClaims } = require("../_lib/payment-claims");

module.exports = async function users(request, response) {
  setNoStore(response);
  if (!allowMethods(request, response, ["GET"])) return;
  const session = readAdminSession(request);
  if (!session) return response.status(401).json({ code: "AUTH_REQUIRED" });
  if (session.role !== "admin") return response.status(403).json({ code: "ADMIN_REQUIRED" });

  try {
    // Payment claims were created by verified accounts before analytics existed.
    // Registering them here makes the first dashboard migration complete and idempotent.
    const claims = await listPaymentClaims();
    await Promise.all(claims.map((claim) => registerUser(claim.email, {
      firstSeenAt: claim.submittedAt,
      authenticatedAt: false,
    })));
    return response.status(200).json(await listUsers());
  } catch (error) {
    return response.status(503).json({ code: error.code || "USER_ANALYTICS_UNAVAILABLE" });
  }
};
