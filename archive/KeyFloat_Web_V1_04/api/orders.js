const { readSession } = require("./_lib/auth");
const { allowMethods, setNoStore } = require("./_lib/http");
const { listOrders } = require("./_lib/orders");

module.exports = async function orders(request, response) {
  setNoStore(response);
  if (!allowMethods(request, response, ["GET"])) return;
  try {
    const session = readSession(request);
    if (!session) return response.status(401).json({ code: "AUTH_REQUIRED" });
    return response.status(200).json({ orders: await listOrders(session.email) });
  } catch (error) {
    return response.status(503).json({ code: error.code || "ORDERS_UNAVAILABLE" });
  }
};
