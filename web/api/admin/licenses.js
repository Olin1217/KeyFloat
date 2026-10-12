const { listActivationCodes, normalizeActivationCode, registerActivationCode } = require("../_lib/activation-codes");
const { readAdminSession } = require("../_lib/auth");
const { allowMethods, setNoStore } = require("../_lib/http");
const { listPaymentClaims } = require("../_lib/payment-claims");

module.exports = async function licenses(request, response) {
  setNoStore(response);
  if (!allowMethods(request, response, ["GET"])) return;
  const session = readAdminSession(request);
  if (!session) return response.status(401).json({ code: "AUTH_REQUIRED" });
  if (session.role !== "admin") return response.status(403).json({ code: "ADMIN_REQUIRED" });

  try {
    // Approved purchases created before the inventory index existed are migrated
    // opportunistically. Manual batches use the dedicated registration script.
    const claims = await listPaymentClaims();
    const issuedCodes = claims
      .map((claim) => normalizeActivationCode(claim.voucherCode))
      .filter(Boolean);
    await Promise.all(issuedCodes.map((code) => registerActivationCode(code)));
    return response.status(200).json(await listActivationCodes());
  } catch (error) {
    return response.status(503).json({ code: error.code || "LICENSE_INVENTORY_UNAVAILABLE" });
  }
};
