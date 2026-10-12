const crypto = require("node:crypto");
const { normalizeEmail } = require("./auth");
const { getJSON, getJSONList, privateKey, pushJSONList, setJSON, setJSONIfAbsent } = require("./store");

const FEEDBACK_ID_PATTERN = /^[a-f0-9]{24}$/;
const CLIENT_ID_PATTERN = /^[A-Za-z0-9_-]{8,80}$/;

function feedbackKey(id) {
  return privateKey("feedback", id);
}

function feedbackIndexKey() {
  return privateKey("feedback", "recent");
}

function clientSubmissionKey(id) {
  return privateKey("feedback-client-submission", id);
}

function cleanText(value, maximum) {
  return String(value || "").trim().slice(0, maximum);
}

function publicFeedback(record) {
  return {
    id: record.id,
    source: record.source,
    kind: record.kind === "software_request" ? "software_request" : "feedback",
    message: record.message,
    contact: record.contact,
    submittedAt: record.submittedAt,
    ...(record.email ? { email: record.email } : {}),
    ...(record.softwareID ? { softwareID: record.softwareID } : {}),
    ...(record.language ? { language: record.language } : {}),
    ...(record.appVersion ? { appVersion: record.appVersion } : {}),
    ...(record.softwareName ? { softwareName: record.softwareName } : {}),
    ...(record.softwareGroup ? { softwareGroup: record.softwareGroup } : {}),
  };
}

async function submitFeedback({
  source,
  kind,
  message,
  contact,
  email,
  softwareID,
  softwareName,
  softwareGroup,
  language,
  appVersion,
  clientSubmissionId,
}) {
  const normalizedKind = kind === undefined || kind === "feedback"
    ? "feedback"
    : kind === "software_request" ? "software_request" : undefined;
  if (!normalizedKind) throw Object.assign(new Error("Feedback kind is invalid."), { code: "INVALID_FEEDBACK" });
  const normalizedSoftwareName = cleanText(softwareName, 160);
  if (normalizedKind === "software_request" && !normalizedSoftwareName) {
    throw Object.assign(new Error("Software name is required."), { code: "INVALID_FEEDBACK" });
  }
  const normalizedMessage = cleanText(message, 4_000) || normalizedSoftwareName;
  if (!normalizedMessage) throw Object.assign(new Error("Feedback message is required."), { code: "INVALID_FEEDBACK" });
  const normalizedSource = source === "macos" ? "macos" : source === "website" ? "website" : undefined;
  if (!normalizedSource) throw Object.assign(new Error("Feedback source is invalid."), { code: "INVALID_FEEDBACK" });
  const clientID = CLIENT_ID_PATTERN.test(String(clientSubmissionId || ""))
    ? String(clientSubmissionId)
    : crypto.randomBytes(16).toString("hex");
  const dedupeKey = clientSubmissionKey(clientID);
  const existingID = await getJSON(dedupeKey);
  if (FEEDBACK_ID_PATTERN.test(String(existingID || ""))) {
    const existing = await getJSON(feedbackKey(existingID));
    if (existing) {
      await pushJSONList(feedbackIndexKey(), existing.id, 1_000);
      return { feedback: publicFeedback(existing), duplicate: true };
    }
  }

  const id = crypto.randomBytes(12).toString("hex");
  const reserved = await setJSONIfAbsent(dedupeKey, id);
  if (!reserved) {
    const winnerID = await getJSON(dedupeKey);
    const winner = winnerID ? await getJSON(feedbackKey(winnerID)) : undefined;
    if (winner) return { feedback: publicFeedback(winner), duplicate: true };
    throw Object.assign(new Error("Feedback submission is busy."), { code: "FEEDBACK_BUSY" });
  }

  const record = {
    id,
    source: normalizedSource,
    kind: normalizedKind,
    message: normalizedMessage,
    contact: cleanText(contact, 320),
    submittedAt: new Date().toISOString(),
    ...(normalizeEmail(email) ? { email: normalizeEmail(email) } : {}),
    ...(cleanText(softwareID, 100) ? { softwareID: cleanText(softwareID, 100) } : {}),
    ...(language === "zh" || language === "en" ? { language } : {}),
    ...(cleanText(appVersion, 40) ? { appVersion: cleanText(appVersion, 40) } : {}),
    ...(normalizedSoftwareName ? { softwareName: normalizedSoftwareName } : {}),
    ...(cleanText(softwareGroup, 100) ? { softwareGroup: cleanText(softwareGroup, 100) } : {}),
  };
  await setJSON(feedbackKey(id), record);
  await pushJSONList(feedbackIndexKey(), id, 1_000);
  return { feedback: publicFeedback(record), duplicate: false };
}

async function listFeedback(limit = 500) {
  const ids = await getJSONList(feedbackIndexKey(), Math.min(1_000, Math.max(1, limit)));
  const uniqueIDs = [...new Set(ids.filter((id) => FEEDBACK_ID_PATTERN.test(String(id))))];
  const records = await Promise.all(uniqueIDs.map((id) => getJSON(feedbackKey(id))));
  return records
    .filter(Boolean)
    .map(publicFeedback)
    .sort((first, second) => new Date(second.submittedAt) - new Date(first.submittedAt));
}

module.exports = { listFeedback, submitFeedback };
