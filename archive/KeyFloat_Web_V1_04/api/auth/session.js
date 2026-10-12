const { readSession } = require("../_lib/auth");
const { allowMethods, setNoStore } = require("../_lib/http");

module.exports = async function session(request, response) {
  setNoStore(response);
  if (!allowMethods(request, response, ["GET"])) return;
  try {
    const active = readSession(request);
    if (!active) return response.status(200).json({ authenticated: false });
    return response.status(200).json({ authenticated: true, user: { email: active.email, role: active.role }, expiresAt: active.expiresAt });
  } catch (error) {
    return response.status(503).json({ code: error.code || "AUTH_UNAVAILABLE" });
  }
};
