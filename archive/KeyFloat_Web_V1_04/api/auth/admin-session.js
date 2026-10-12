const { readAdminSession } = require("../_lib/auth");
const { allowMethods, setNoStore } = require("../_lib/http");

module.exports = async function adminSession(request, response) {
  setNoStore(response);
  if (!allowMethods(request, response, ["GET"])) return;
  const session = readAdminSession(request);
  if (!session) return response.status(200).json({ authenticated: false });
  return response.status(200).json({
    authenticated: true,
    user: { email: session.email, role: "admin" },
    expiresAt: session.expiresAt,
  });
};
