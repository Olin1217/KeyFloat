const { allowMethods, setNoStore } = require("../_lib/http");
const { automaticAlipayReady } = require("../_lib/alipay");

module.exports = async function alipayConfig(request, response) {
  setNoStore(response);
  if (!allowMethods(request, response, ["GET"])) return;
  const configured = automaticAlipayReady();
  return response.status(200).json({
    enabled: process.env.KEYFLOAT_ALIPAY_ENABLED === "true" && configured,
    provider: "alipay-open-platform",
  });
};
