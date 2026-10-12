const { readSession } = require("./_lib/auth");
const { allowMethods, setNoStore } = require("./_lib/http");
const { getClaimForCustomer } = require("./_lib/payment-claims");

function requestedClaimId(request) {
  if (request.query?.claimId) return String(request.query.claimId);
  try {
    return new URL(request.url || "", "http://localhost").searchParams.get("claimId") || "";
  } catch {
    return "";
  }
}

module.exports = async function paymentStatus(request, response) {
  setNoStore(response);
  if (!allowMethods(request, response, ["GET"])) return;
  const session = readSession(request);
  if (!session || session.role !== "customer") {
    return response.status(401).json({ code: "AUTH_REQUIRED" });
  }
  try {
    const claim = await getClaimForCustomer(requestedClaimId(request), session.email);
    if (!claim) return response.status(404).json({ code: "CLAIM_NOT_FOUND" });
    return response.status(200).json({ claim });
  } catch (error) {
    return response.status(503).json({ code: error.code || "CLAIM_STATUS_UNAVAILABLE" });
  }
};
