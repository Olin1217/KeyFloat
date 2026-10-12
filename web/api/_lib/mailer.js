const nodemailer = require("nodemailer");
const { isProduction } = require("./store");

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[character]);
}

async function sendJSON(url, headers, body) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`Email provider returned ${response.status}.`);
  } finally {
    clearTimeout(timeout);
  }
}

function emailContent(code, language) {
  if (language === "zh") {
    return {
      subject: "您的 KeyFloat 登录验证码",
      text: `您的 KeyFloat 登录验证码是 ${code}。验证码 10 分钟内有效，请勿转发给他人。`,
      heading: "验证您的邮箱",
      body: "使用以下验证码登录 KeyFloat 并查询您的订单与激活码。",
      note: "验证码 10 分钟内有效，请勿转发给他人。",
    };
  }
  return {
    subject: "Your KeyFloat sign-in code",
    text: `Your KeyFloat sign-in code is ${code}. It expires in 10 minutes. Do not share it with anyone.`,
    heading: "Verify your email",
    body: "Use this code to sign in to KeyFloat and view your orders and activation codes.",
    note: "This code expires in 10 minutes. Do not share it with anyone.",
  };
}

function verificationEmailHTML(code, content) {
  return `<!doctype html><html><body style="margin:0;background:#f3f3f3;color:#111;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif"><div style="max-width:560px;margin:0 auto;padding:40px 22px"><div style="background:#fff;border:1px solid #d8d8d8;border-radius:18px;padding:34px"><strong style="font-size:18px">KeyFloat</strong><h1 style="margin:34px 0 10px;font-size:30px">${escapeHTML(content.heading)}</h1><p style="color:#666;line-height:1.6">${escapeHTML(content.body)}</p><div style="margin:28px 0;padding:20px;background:#111;color:#fff;border-radius:12px;text-align:center;font:700 34px/1.2 ui-monospace,monospace;letter-spacing:8px">${escapeHTML(code)}</div><p style="color:#777;font-size:13px;line-height:1.6">${escapeHTML(content.note)}</p></div></div></body></html>`;
}

function smtpConfiguration() {
  const host = String(process.env.KEYFLOAT_SMTP_HOST || "").trim();
  const portValue = String(process.env.KEYFLOAT_SMTP_PORT || "").trim();
  const secureValue = String(process.env.KEYFLOAT_SMTP_SECURE || "").trim().toLowerCase();
  const user = String(process.env.KEYFLOAT_SMTP_USER || "").trim();
  const password = String(process.env.KEYFLOAT_SMTP_PASSWORD || "");
  const from = String(process.env.KEYFLOAT_AUTH_FROM_EMAIL || "").trim();
  const port = Number(portValue);

  if (!host || !from || !user || !password || !Number.isInteger(port) || port < 1 || port > 65_535 || !["true", "false"].includes(secureValue)) {
    throw Object.assign(new Error("SMTP is not configured."), { code: "EMAIL_NOT_CONFIGURED" });
  }

  return { host, port, secure: secureValue === "true", user, password, from };
}

async function sendSMTPMessage({ to, subject, text, html, idempotencyKey }) {
  const configuration = smtpConfiguration();
  const transport = nodemailer.createTransport({
    host: configuration.host,
    port: configuration.port,
    secure: configuration.secure,
    auth: { user: configuration.user, pass: configuration.password },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
    tls: { minVersion: "TLSv1.2", servername: configuration.host },
    logger: false,
    debug: false,
    disableFileAccess: true,
    disableUrlAccess: true,
  });

  try {
    await transport.sendMail({
      from: configuration.from,
      to,
      subject,
      text,
      html,
      ...(idempotencyKey ? { headers: { "X-KeyFloat-Idempotency-Key": idempotencyKey } } : {}),
    });
  } catch (error) {
    throw Object.assign(new Error("SMTP delivery failed."), { code: "EMAIL_DELIVERY_FAILED", cause: error });
  } finally {
    if (typeof transport.close === "function") transport.close();
  }
}

async function sendVerificationCode({ email, code, language }) {
  const provider = (process.env.KEYFLOAT_AUTH_EMAIL_PROVIDER || (isProduction() ? "" : "console")).toLowerCase();
  const content = emailContent(code, language);
  const html = verificationEmailHTML(code, content);

  if (provider === "console" && !isProduction()) {
    console.log(`[KeyFloat auth] ${email}: ${code}`);
    return;
  }

  if (provider === "resend") {
    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.KEYFLOAT_AUTH_FROM_EMAIL;
    if (!apiKey || !from) throw Object.assign(new Error("Resend is not configured."), { code: "EMAIL_NOT_CONFIGURED" });
    await sendJSON("https://api.resend.com/emails", { Authorization: `Bearer ${apiKey}` }, {
      from, to: [email], subject: content.subject, text: content.text, html,
    });
    return;
  }

  if (provider === "smtp") {
    await sendSMTPMessage({ to: email, subject: content.subject, text: content.text, html });
    return;
  }

  if (provider === "webhook") {
    const url = process.env.KEYFLOAT_AUTH_EMAIL_WEBHOOK_URL;
    const token = process.env.KEYFLOAT_AUTH_EMAIL_WEBHOOK_TOKEN;
    if (!url || !token || !/^https:\/\//i.test(url)) {
      throw Object.assign(new Error("Email webhook is not configured."), { code: "EMAIL_NOT_CONFIGURED" });
    }
    await sendJSON(url, { Authorization: `Bearer ${token}` }, {
      type: "keyfloat.login-code", to: email, code, language, expiresInSeconds: 600, content,
    });
    return;
  }

  throw Object.assign(new Error("Email provider is not configured."), { code: "EMAIL_NOT_CONFIGURED" });
}

function voucherEmailContent({ voucherCode, reviewReference, amountCny, language }) {
  if (language === "zh") {
    return {
      subject: "您的 KeyFloat 激活码",
      text: `您的 KeyFloat 付款已核验。激活码：${voucherCode}\n订单核验编号：${reviewReference}\n支付金额：¥${amountCny}\n请妥善保存此邮件和激活码。`,
      heading: "付款已核验",
      body: "以下是您的 KeyFloat 激活码。它与付款完成页面展示的激活码完全相同。",
      referenceLabel: "订单核验编号",
      amountLabel: "支付金额",
      note: "请妥善保存此邮件。首次打开 KeyFloat 时联网输入该激活码即可完成激活。",
    };
  }
  return {
    subject: "Your KeyFloat activation code",
    text: `Your KeyFloat payment has been verified. Activation code: ${voucherCode}\nReview reference: ${reviewReference}\nAmount paid: ¥${amountCny}\nKeep this email and activation code in a safe place.`,
    heading: "Payment verified",
    body: "Here is your KeyFloat activation code. It is identical to the code shown on the completed payment page.",
    referenceLabel: "Review reference",
    amountLabel: "Amount paid",
    note: "Keep this email safe. Enter the activation code once while online to activate the application.",
  };
}

function voucherEmailHTML({ voucherCode, reviewReference, amountCny, language, downloadURL, content }) {
  const safeVoucher = escapeHTML(voucherCode);
  const download = downloadURL
    ? `<p style="margin:24px 0 0"><a href="${escapeHTML(downloadURL)}" style="display:inline-block;padding:12px 18px;background:#111;color:#fff;border-radius:9px;text-decoration:none;font-weight:700">${language === "zh" ? "下载 KeyFloat" : "Download KeyFloat"}</a></p>`
    : "";
  return `<!doctype html><html><body style="margin:0;background:#f3f3f3;color:#111;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif"><div style="max-width:640px;margin:0 auto;padding:40px 22px"><div style="background:#fff;border:1px solid #d8d8d8;border-radius:18px;padding:34px"><strong style="font-size:18px">KeyFloat</strong><h1 style="margin:34px 0 10px;font-size:30px">${escapeHTML(content.heading)}</h1><p style="color:#666;line-height:1.6">${escapeHTML(content.body)}</p><div style="margin:28px 0;padding:18px;background:#111;color:#fff;border-radius:12px;font:600 12px/1.7 ui-monospace,monospace;overflow-wrap:anywhere;word-break:break-all">${safeVoucher}</div><div style="padding:16px;background:#f6f6f6;border:1px solid #e2e2e2;border-radius:10px"><p style="margin:0 0 7px;color:#666;font-size:12px">${escapeHTML(content.referenceLabel)}：<strong style="color:#111">${escapeHTML(reviewReference)}</strong></p><p style="margin:0;color:#666;font-size:12px">${escapeHTML(content.amountLabel)}：<strong style="color:#111">¥${escapeHTML(amountCny)}</strong></p></div>${download}<p style="margin:24px 0 0;color:#777;font-size:13px;line-height:1.6">${escapeHTML(content.note)}</p></div></div></body></html>`;
}

async function sendVoucherEmail({ email, voucherCode, reviewReference, amountCny, language, downloadURL, idempotencyKey }) {
  const provider = (process.env.KEYFLOAT_AUTH_EMAIL_PROVIDER || (isProduction() ? "" : "console")).toLowerCase();
  const content = voucherEmailContent({ voucherCode, reviewReference, amountCny, language });
  const html = voucherEmailHTML({ voucherCode, reviewReference, amountCny, language, downloadURL, content });

  if (provider === "console" && !isProduction()) {
    console.log(`[KeyFloat voucher] simulated delivery to ${email} for review ${reviewReference}`);
    return;
  }

  if (provider === "resend") {
    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.KEYFLOAT_AUTH_FROM_EMAIL;
    if (!apiKey || !from) throw Object.assign(new Error("Resend is not configured."), { code: "EMAIL_NOT_CONFIGURED" });
    await sendJSON("https://api.resend.com/emails", {
      Authorization: `Bearer ${apiKey}`,
      ...(idempotencyKey ? { "Idempotency-Key": idempotencyKey } : {}),
    }, {
      from, to: [email], subject: content.subject, text: content.text, html,
    });
    return;
  }

  if (provider === "smtp") {
    await sendSMTPMessage({
      to: email,
      subject: content.subject,
      text: content.text,
      html,
      idempotencyKey,
    });
    return;
  }

  if (provider === "webhook") {
    const url = process.env.KEYFLOAT_AUTH_EMAIL_WEBHOOK_URL;
    const token = process.env.KEYFLOAT_AUTH_EMAIL_WEBHOOK_TOKEN;
    if (!url || !token || !/^https:\/\//i.test(url)) {
      throw Object.assign(new Error("Email webhook is not configured."), { code: "EMAIL_NOT_CONFIGURED" });
    }
    await sendJSON(url, { Authorization: `Bearer ${token}` }, {
      type: "keyfloat.voucher-issued",
      to: email,
      voucherCode,
      reviewReference,
      amountCny,
      language,
      ...(downloadURL ? { downloadURL } : {}),
      ...(idempotencyKey ? { idempotencyKey } : {}),
      content,
    });
    return;
  }

  throw Object.assign(new Error("Email provider is not configured."), { code: "EMAIL_NOT_CONFIGURED" });
}

module.exports = { sendVerificationCode, sendVoucherEmail, voucherEmailContent };
