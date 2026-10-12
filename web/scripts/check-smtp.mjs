import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const nodemailer = require("nodemailer");
const originalCreateTransport = nodemailer.createTransport;
const originalEnvironment = Object.fromEntries(Object.entries(process.env));
const transports = [];
const deliveries = [];
let closedTransports = 0;

function restoreEnvironment() {
  for (const key of Object.keys(process.env)) {
    if (!(key in originalEnvironment)) delete process.env[key];
  }
  Object.assign(process.env, originalEnvironment);
}

try {
  process.env.NODE_ENV = "production";
  process.env.KEYFLOAT_AUTH_EMAIL_PROVIDER = "smtp";
  process.env.KEYFLOAT_AUTH_FROM_EMAIL = "KeyFloat <login@notice.keyfloat.cn>";
  process.env.KEYFLOAT_SMTP_HOST = "smtpdm.aliyun.com";
  process.env.KEYFLOAT_SMTP_PORT = "465";
  process.env.KEYFLOAT_SMTP_SECURE = "true";
  process.env.KEYFLOAT_SMTP_USER = "login@notice.keyfloat.cn";
  process.env.KEYFLOAT_SMTP_PASSWORD = "test-only-placeholder-password";

  nodemailer.createTransport = (options) => {
    transports.push(options);
    return {
      async sendMail(message) {
        deliveries.push(message);
        return { accepted: [message.to], rejected: [] };
      },
      close() { closedTransports += 1; },
    };
  };

  const mailer = require("../api/_lib/mailer.js");
  await mailer.sendVerificationCode({
    email: "buyer@example.com",
    code: "123456",
    language: "en",
  });
  await mailer.sendVoucherEmail({
    email: "buyer@example.com",
    voucherCode: "KF1.Test<Voucher>",
    reviewReference: "KF-TEST-001",
    amountCny: 6,
    language: "zh",
    downloadURL: "https://keyfloat.cn/downloads/KeyFloat-macOS-1.0.4-universal.dmg",
    idempotencyKey: "voucher-test-001",
  });

  if (transports.length !== 2 || deliveries.length !== 2 || closedTransports !== 2) {
    throw new Error("SMTP transport lifecycle was not completed for both email types.");
  }
  for (const transport of transports) {
    if (transport.host !== "smtpdm.aliyun.com" || transport.port !== 465 || transport.secure !== true) {
      throw new Error("SMTP host, port, or secure mode was not passed to Nodemailer.");
    }
    if (transport.auth?.user !== "login@notice.keyfloat.cn" || transport.auth?.pass !== "test-only-placeholder-password") {
      throw new Error("SMTP authentication was not passed privately to Nodemailer.");
    }
    if (transport.logger !== false || transport.debug !== false || !transport.disableFileAccess || !transport.disableUrlAccess) {
      throw new Error("SMTP transport safety settings are incomplete.");
    }
  }

  const verification = deliveries[0];
  if (verification.from !== "KeyFloat <login@notice.keyfloat.cn>" || verification.to !== "buyer@example.com" ||
      !verification.text.includes("123456") || !verification.html.includes("123456")) {
    throw new Error("SMTP verification email content is incomplete.");
  }
  const voucher = deliveries[1];
  if (!voucher.text.includes("KF1.Test<Voucher>") || voucher.html.includes("KF1.Test<Voucher>") ||
      !voucher.html.includes("KF1.Test&lt;Voucher&gt;") || voucher.headers?.["X-KeyFloat-Idempotency-Key"] !== "voucher-test-001") {
    throw new Error("SMTP voucher email escaping or idempotency metadata is incomplete.");
  }

  nodemailer.createTransport = () => ({
    async sendMail() { throw new Error("private-provider-detail-must-not-escape"); },
    close() {},
  });
  let deliveryError;
  try {
    await mailer.sendVerificationCode({ email: "buyer@example.com", code: "654321", language: "en" });
  } catch (error) {
    deliveryError = error;
  }
  if (deliveryError?.code !== "EMAIL_DELIVERY_FAILED" || deliveryError.message.includes("private-provider-detail")) {
    throw new Error("SMTP provider errors are not safely normalized.");
  }

  delete process.env.KEYFLOAT_SMTP_PASSWORD;
  let configurationError;
  try {
    await mailer.sendVerificationCode({ email: "buyer@example.com", code: "654321", language: "en" });
  } catch (error) {
    configurationError = error;
  }
  if (configurationError?.code !== "EMAIL_NOT_CONFIGURED") {
    throw new Error("Missing SMTP credentials did not fail closed.");
  }

  console.log("Validated Alibaba Cloud SMTP transport, both email types, safe failures, and secret-free configuration errors.");
} finally {
  nodemailer.createTransport = originalCreateTransport;
  restoreEnvironment();
}
