const { readAdminSession } = require("../_lib/auth");
const { allowMethods, setNoStore } = require("../_lib/http");
const { sendVoucherEmail } = require("../_lib/mailer");
const { issueActivationCredential } = require("../_lib/activation-codes");
const { approveClaim, deliverClaimVoucherEmail, listPaymentClaims } = require("../_lib/payment-claims");
const { listPaidAlipayOrders, redeliverAlipayVoucher } = require("../_lib/alipay");
const { issueVoucher, loadSigningKey, parseHTTPSURL } = require("../_lib/vouchers");

module.exports = async function paymentClaims(request, response) {
  setNoStore(response);
  if (!allowMethods(request, response, ["GET", "POST"])) return;
  const session = readAdminSession(request);
  if (!session) return response.status(401).json({ code: "AUTH_REQUIRED" });
  if (session.role !== "admin") return response.status(403).json({ code: "ADMIN_REQUIRED" });

  try {
    if (request.method === "GET") {
      let scope = "pending";
      try {
        scope = String(request.query?.scope || new URL(request.url || "", "http://localhost").searchParams.get("scope") || "pending");
      } catch { /* Keep the safe pending-only default. */ }
      const claims = await listPaymentClaims(scope === "all" ? {} : { status: "pending" });
      if (scope === "all") {
        const automaticOrders = await listPaidAlipayOrders();
        claims.push(...automaticOrders.map((order) => ({
          id: `alipay:${order.outTradeNo}`,
          product: order.product,
          amountCny: order.amountCny,
          reviewReference: order.outTradeNo,
          status: "approved",
          submittedAt: order.createdAt,
          updatedAt: order.paidAt,
          approvedAt: order.paidAt,
          voucherCode: order.voucherCode,
          email: order.email,
          language: order.language,
          emailDeliveryStatus: order.emailDeliveryStatus,
          emailSentAt: order.emailSentAt,
          emailLastAttemptAt: order.emailLastAttemptAt,
          paymentProvider: "alipay",
          tradeNo: order.tradeNo,
        })));
        claims.sort((first, second) => new Date(second.updatedAt || second.submittedAt || 0) - new Date(first.updatedAt || first.submittedAt || 0));
      }
      return response.status(200).json({ claims });
    }

    const { claimId, action } = request.body || {};
    if (!["approve", "resend-email"].includes(action) || typeof claimId !== "string") {
      return response.status(400).json({ code: "INVALID_REVIEW" });
    }
    if (claimId.startsWith("alipay:")) {
      if (action !== "resend-email") return response.status(400).json({ code: "INVALID_REVIEW" });
      const claim = await redeliverAlipayVoucher(claimId.slice("alipay:".length));
      return response.status(200).json({
        claim,
        emailDelivered: claim.emailDeliveryStatus === "sent",
      });
    }
    if (action === "approve") {
      const signingKey = loadSigningKey();
      if (!signingKey) return response.status(503).json({ code: "SIGNING_NOT_CONFIGURED" });
      const configuredDownload = process.env.KEYFLOAT_INSTALLER_DOWNLOAD_URL;
      const downloadURL = configuredDownload ? parseHTTPSURL(configuredDownload) : undefined;
      if (configuredDownload && !downloadURL) {
        return response.status(503).json({ code: "DOWNLOAD_NOT_CONFIGURED" });
      }
      await approveClaim(claimId, {
        createCredential: ({ email, paymentReference }) => {
          if (process.env.KEYFLOAT_SHORT_CODES_ENABLED === "true") {
            return issueActivationCredential({
              createVoucher: () => issueVoucher(signingKey),
              email,
              paymentReference,
            });
          }
          return {
            activationCode: issueVoucher(signingKey),
            issuedAt: new Date().toISOString(),
          };
        },
        ...(downloadURL ? { downloadURL: downloadURL.toString() } : {}),
      });
    }
    const delivery = await deliverClaimVoucherEmail(claimId, sendVoucherEmail);
    return response.status(200).json({
      claim: delivery.claim,
      emailDelivered: delivery.delivered,
      ...(delivery.alreadySent ? { emailAlreadySent: true } : {}),
      ...(delivery.emailCode ? { emailCode: delivery.emailCode } : {}),
    });
  } catch (error) {
    const status = ["CLAIM_NOT_FOUND", "ALIPAY_ORDER_NOT_FOUND"].includes(error.code) ? 404
      : ["INVALID_CLAIM_ID", "CLAIM_NOT_PENDING", "CLAIM_NOT_APPROVED"].includes(error.code) ? 400
        : ["CLAIM_BUSY", "CLAIM_EMAIL_BUSY"].includes(error.code) ? 409 : 503;
    return response.status(status).json({ code: error.code || "PAYMENT_REVIEW_FAILED" });
  }
};
