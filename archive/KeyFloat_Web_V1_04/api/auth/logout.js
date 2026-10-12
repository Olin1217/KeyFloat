const { clearSessionCookie } = require("../_lib/auth");
const { allowMethods, setNoStore } = require("../_lib/http");

module.exports = async function logout(request, response) {
  setNoStore(response);
  if (!allowMethods(request, response, ["POST"])) return;
  response.setHeader("Set-Cookie", clearSessionCookie());
  return response.status(200).json({ authenticated: false });
};
