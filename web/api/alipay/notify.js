const { allowMethods, setNoStore } = require("../_lib/http");
const { handleAlipayNotification } = require("../_lib/alipay");

module.exports = async function alipayNotify(request, response) {
  setNoStore(response);
  if (!allowMethods(request, response, ["POST"])) return;
  try {
    const result = await handleAlipayNotification(request.body || {});
    response.setHeader("Content-Type", "text/plain; charset=utf-8");
    if (typeof response.end === "function") {
      response.status(200).end("success");
      return;
    }
    return response.status(200).json({ status: "success", ...result });
  } catch (error) {
    const status = ["ALIPAY_INVALID_SIGNATURE", "ALIPAY_INVALID_MERCHANT", "ALIPAY_AMOUNT_MISMATCH", "ALIPAY_PAYMENT_NOT_CONFIRMED", "ALIPAY_ORDER_NOT_FOUND"].includes(error.code) ? 400 : 503;
    return response.status(status).json({ code: error.code || "ALIPAY_NOTIFY_FAILED" });
  }
};
