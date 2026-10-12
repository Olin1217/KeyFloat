const { readAdminSession } = require("../_lib/auth");
const { allowMethods, setNoStore } = require("../_lib/http");
const { checkAndFinalizeAlipayOrder } = require("../_lib/alipay");

module.exports = async function queryAlipayOrder(request, response) {
  setNoStore(response);
  if (!allowMethods(request, response, ["POST"])) return;
  const session = readAdminSession(request);
  if (!session || session.role !== "admin") return response.status(401).json({ code: "AUTH_REQUIRED" });
  const outTradeNo = String(request.body?.outTradeNo || "").trim();
  try {
    const order = await checkAndFinalizeAlipayOrder(outTradeNo);
    return response.status(200).json({ order });
  } catch (error) {
    const status = error.code === "ALIPAY_ORDER_NOT_FOUND" ? 404 : ["INVALID_ALIPAY_ORDER", "ALIPAY_AMOUNT_MISMATCH"].includes(error.code) ? 400 : 503;
    return response.status(status).json({ code: error.code || "ALIPAY_QUERY_FAILED" });
  }
};
