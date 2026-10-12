const { readSession } = require("../_lib/auth");
const { allowMethods, setNoStore } = require("../_lib/http");
const { getAlipayOrderForCustomer } = require("../_lib/alipay");

function requestedOrderNo(request) {
  if (request.query?.outTradeNo) return String(request.query.outTradeNo);
  try { return new URL(request.url || "", "http://localhost").searchParams.get("outTradeNo") || ""; }
  catch { return ""; }
}

module.exports = async function alipayOrderStatus(request, response) {
  setNoStore(response);
  if (!allowMethods(request, response, ["GET"])) return;
  const session = readSession(request);
  if (!session || session.role !== "customer") return response.status(401).json({ code: "AUTH_REQUIRED" });
  if (process.env.KEYFLOAT_ALIPAY_ENABLED !== "true") return response.status(503).json({ code: "ALIPAY_DISABLED" });
  try {
    const order = await getAlipayOrderForCustomer(requestedOrderNo(request), session.email, { refresh: true });
    if (!order) return response.status(404).json({ code: "ALIPAY_ORDER_NOT_FOUND" });
    return response.status(200).json({ order });
  } catch (error) {
    const status = error.code === "ALIPAY_ORDER_NOT_FOUND" ? 404 : 503;
    return response.status(status).json({ code: error.code || "ALIPAY_STATUS_FAILED" });
  }
};
