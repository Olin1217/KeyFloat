const crypto = require("node:crypto");
const { appendOrder } = require("./orders");
const {
  deleteKey,
  getJSON,
  getJSONList,
  privateKey,
  pushJSONList,
  setJSON,
  setJSONIfAbsent,
} = require("./store");

const CLAIM_TTL_SECONDS = 30 * 24 * 60 * 60;
const APPROVAL_LOCK_SECONDS = 30;
const CLAIM_ID_PATTERN = /^[a-f0-9]{24}$/;

function claimKey(claimId) {
  return privateKey("payment-claim", claimId);
}

function referenceKey(paymentReference) {
  return privateKey("payment-reference", String(paymentReference).toUpperCase());
}

function pendingEmailKey(email) {
  return privateKey("payment-pending-email", email);
}

function approvalLockKey(claimId) {
  return privateKey("payment-approval-lock", claimId);
}

function emailLockKey(claimId) {
  return privateKey("voucher-email-lock", claimId);
}

function recentClaimsKey() {
  return privateKey("payment-claims", "recent");
}

function createClaimId() {
  return crypto.randomBytes(12).toString("hex");
}

function createReviewReference() {
  const parts = Object.fromEntries(new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date()).filter((part) => part.type !== "literal").map((part) => [part.type, part.value]));
  const stamp = `${parts.year}${parts.month}${parts.day}${parts.hour}${parts.minute}`;
  return `KF-${stamp}-${crypto.randomBytes(2).toString("hex").toUpperCase()}`;
}

function customerClaim(claim) {
  return {
    id: claim.id,
    product: claim.product,
    amountCny: claim.amountCny,
    reviewReference: claim.reviewReference || claim.paymentReference,
    status: claim.status,
    submittedAt: claim.submittedAt,
    updatedAt: claim.updatedAt,
    ...(claim.status === "approved" ? {
      voucherCode: claim.voucherCode,
      approvedAt: claim.approvedAt,
      ...(claim.downloadURL ? { downloadURL: claim.downloadURL } : {}),
    } : {}),
  };
}

function adminClaim(claim) {
  return {
    ...customerClaim(claim),
    email: claim.email,
    language: claim.language,
    ...(claim.status === "approved" ? {
      emailDeliveryStatus: claim.emailDeliveryStatus || "pending",
      ...(claim.emailSentAt ? { emailSentAt: claim.emailSentAt } : {}),
      ...(claim.emailLastAttemptAt ? { emailLastAttemptAt: claim.emailLastAttemptAt } : {}),
    } : {}),
  };
}

async function submitClaim({ product, amountCny, email, language }) {
  const activeClaimId = await getJSON(pendingEmailKey(email));
  if (activeClaimId) {
    const activeClaim = await getJSON(claimKey(activeClaimId));
    if (activeClaim?.status === "pending") return customerClaim(activeClaim);
    await deleteKey(pendingEmailKey(email));
  }

  const claimId = createClaimId();
  const reviewReference = createReviewReference();
  const reserved = await setJSONIfAbsent(pendingEmailKey(email), claimId, CLAIM_TTL_SECONDS);
  if (!reserved) {
    const winnerId = await getJSON(pendingEmailKey(email));
    const winner = winnerId ? await getJSON(claimKey(winnerId)) : undefined;
    if (winner?.status === "pending") return customerClaim(winner);
    const error = new Error("A payment review is already being created for this account.");
    error.code = "CLAIM_BUSY";
    throw error;
  }

  const now = new Date().toISOString();
  const claim = {
    id: claimId,
    product,
    amountCny,
    reviewReference,
    // Retain this internal alias for compatibility with existing order records.
    paymentReference: reviewReference,
    email,
    language: language === "zh" ? "zh" : "en",
    status: "pending",
    submittedAt: now,
    updatedAt: now,
  };
  try {
    const created = await setJSONIfAbsent(claimKey(claimId), claim, CLAIM_TTL_SECONDS);
    if (!created) throw Object.assign(new Error("Claim identifier collision."), { code: "CLAIM_BUSY" });
    await setJSON(referenceKey(reviewReference), claimId, CLAIM_TTL_SECONDS);
    await pushJSONList(recentClaimsKey(), claimId, 200);
    return customerClaim(claim);
  } catch (error) {
    await deleteKey(pendingEmailKey(email));
    throw error;
  }
}

async function getClaimForCustomer(claimId, email) {
  if (!CLAIM_ID_PATTERN.test(String(claimId || ""))) return undefined;
  const claim = await getJSON(claimKey(claimId));
  if (!claim || claim.email !== email) return undefined;
  return customerClaim(claim);
}

async function listPaymentClaims({ status } = {}) {
  const recent = await getJSONList(recentClaimsKey(), 200);
  const uniqueIds = [...new Set(recent.filter((id) => CLAIM_ID_PATTERN.test(String(id))))];
  const claims = await Promise.all(uniqueIds.map((id) => getJSON(claimKey(id))));
  return claims
    .filter((claim) => claim && (!status || claim.status === status))
    .map(adminClaim)
    .sort((a, b) => {
      if (a.status === "pending" && b.status !== "pending") return -1;
      if (a.status !== "pending" && b.status === "pending") return 1;
      return new Date(b.updatedAt || b.submittedAt) - new Date(a.updatedAt || a.submittedAt);
    });
}

async function approveClaim(claimId, { createCredential, downloadURL }) {
  if (!CLAIM_ID_PATTERN.test(String(claimId || ""))) {
    const error = new Error("Invalid claim identifier.");
    error.code = "INVALID_CLAIM_ID";
    throw error;
  }
  const lockKey = approvalLockKey(claimId);
  const locked = await setJSONIfAbsent(lockKey, { acquiredAt: Date.now() }, APPROVAL_LOCK_SECONDS);
  if (!locked) {
    const error = new Error("This claim is already being approved.");
    error.code = "CLAIM_BUSY";
    throw error;
  }

  try {
    const claim = await getJSON(claimKey(claimId));
    if (!claim) {
      const error = new Error("Claim not found.");
      error.code = "CLAIM_NOT_FOUND";
      throw error;
    }
    if (claim.status === "approved") return adminClaim(claim);
    if (claim.status !== "pending") {
      const error = new Error("Claim is not pending.");
      error.code = "CLAIM_NOT_PENDING";
      throw error;
    }

    if (typeof createCredential !== "function") {
      const error = new Error("Activation credential issuance is not configured.");
      error.code = "SIGNING_NOT_CONFIGURED";
      throw error;
    }
    const credential = await createCredential({
      email: claim.email,
      paymentReference: claim.paymentReference,
    });
    const issuedAt = credential.issuedAt || new Date().toISOString();
    const storedOrder = await appendOrder({
      email: claim.email,
      product: claim.product,
      platform: "macos",
      amountCny: claim.amountCny,
      paymentReference: claim.paymentReference,
      voucherCode: credential.activationCode,
      purchasedAt: issuedAt,
      ...(downloadURL ? { downloadURL } : {}),
    });
    const approved = {
      ...claim,
      status: "approved",
      voucherCode: storedOrder.voucherCode,
      approvedAt: storedOrder.purchasedAt || issuedAt,
      updatedAt: issuedAt,
      ...(storedOrder.downloadURL ? { downloadURL: storedOrder.downloadURL } : {}),
    };
    // Approved transactions and their reference reservations must remain durable so
    // an old Alipay transaction number can never be submitted for a second voucher.
    await setJSON(referenceKey(claim.paymentReference), claimId);
    await setJSON(claimKey(claimId), approved);
    await deleteKey(pendingEmailKey(claim.email));
    return adminClaim(approved);
  } finally {
    await deleteKey(lockKey);
  }
}

async function deliverClaimVoucherEmail(claimId, sendEmail) {
  if (!CLAIM_ID_PATTERN.test(String(claimId || ""))) {
    const error = new Error("Invalid claim identifier.");
    error.code = "INVALID_CLAIM_ID";
    throw error;
  }
  const lockKey = emailLockKey(claimId);
  const locked = await setJSONIfAbsent(lockKey, { acquiredAt: Date.now() }, APPROVAL_LOCK_SECONDS);
  if (!locked) {
    const error = new Error("This voucher email is already being delivered.");
    error.code = "CLAIM_EMAIL_BUSY";
    throw error;
  }

  try {
    const claim = await getJSON(claimKey(claimId));
    if (!claim) {
      const error = new Error("Claim not found.");
      error.code = "CLAIM_NOT_FOUND";
      throw error;
    }
    if (claim.status !== "approved" || !claim.voucherCode) {
      const error = new Error("The voucher has not been issued.");
      error.code = "CLAIM_NOT_APPROVED";
      throw error;
    }
    if (claim.emailDeliveryStatus === "sent" && claim.emailSentAt) {
      return { claim: adminClaim(claim), delivered: true, alreadySent: true };
    }

    const attemptedAt = new Date().toISOString();
    try {
      await sendEmail({
        email: claim.email,
        language: claim.language,
        voucherCode: claim.voucherCode,
        reviewReference: claim.reviewReference || claim.paymentReference,
        amountCny: claim.amountCny,
        ...(claim.downloadURL ? { downloadURL: claim.downloadURL } : {}),
        idempotencyKey: `keyfloat-voucher-${claim.id}`,
      });
      const delivered = {
        ...claim,
        emailDeliveryStatus: "sent",
        emailSentAt: attemptedAt,
        emailLastAttemptAt: attemptedAt,
        updatedAt: attemptedAt,
      };
      await setJSON(claimKey(claimId), delivered);
      return { claim: adminClaim(delivered), delivered: true };
    } catch (error) {
      const failed = {
        ...claim,
        emailDeliveryStatus: "failed",
        emailLastAttemptAt: attemptedAt,
        updatedAt: attemptedAt,
      };
      await setJSON(claimKey(claimId), failed);
      return { claim: adminClaim(failed), delivered: false, emailCode: error.code || "EMAIL_DELIVERY_FAILED" };
    }
  } finally {
    await deleteKey(lockKey);
  }
}

module.exports = {
  approveClaim,
  deliverClaimVoucherEmail,
  getClaimForCustomer,
  listPaymentClaims,
  submitClaim,
};
