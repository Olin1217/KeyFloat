import auth from "../api/_lib/auth.js";
import store from "../api/_lib/store.js";
import session from "../api/auth/session.js";
import visit from "../api/analytics/visit.js";
import download from "../api/analytics/download.js";
import feedback from "../api/feedback.js";
import adminUsers from "../api/admin/users.js";
import adminFeedback from "../api/admin/feedback.js";
import adminDownloads from "../api/admin/downloads.js";

process.env.NODE_ENV = "development";
delete process.env.VERCEL_ENV;
delete process.env.KV_REST_API_URL;
delete process.env.KV_REST_API_TOKEN;
delete process.env.UPSTASH_REDIS_REST_URL;
delete process.env.UPSTASH_REDIS_REST_TOKEN;
delete process.env.KEYFLOAT_DATA_FILE;
process.env.KEYFLOAT_SESSION_SECRET = "analytics-test-session-secret-at-least-32-characters";
store.resetMemoryStore();

function responseDouble() {
  return {
    statusCode: 200,
    headers: {},
    payload: undefined,
    setHeader(name, value) { this.headers[name] = value; },
    status(code) { this.statusCode = code; return this; },
    json(payload) { this.payload = payload; return this; },
  };
}

async function call(handler, request) {
  const response = responseDouble();
  await handler({ headers: {}, socket: { remoteAddress: "127.0.0.1" }, ...request }, response);
  if (response.headers["Cache-Control"] !== "no-store, max-age=0") {
    throw new Error("Analytics and feedback responses must disable caching.");
  }
  return response;
}

function cookie(email, role = "customer") {
  const created = auth.createSession(email, true, role);
  return `${role === "admin" ? "kf_admin_session" : "kf_session"}=${encodeURIComponent(created.token)}`;
}

const customerCookie = cookie("buyer@example.com");
const adminCookie = cookie("administrator@example.com", "admin");

let result = await call(session, { method: "GET", headers: { cookie: customerCookie } });
if (!result.payload?.authenticated) throw new Error("An authenticated website session could not register a user.");

result = await call(visit, { method: "POST" });
if (result.statusCode !== 401) throw new Error("Anonymous visits were attributed to a user.");
await call(visit, { method: "POST", headers: { cookie: customerCookie } });
await call(visit, { method: "POST", headers: { cookie: customerCookie } });

result = await call(adminUsers, { method: "GET", headers: { cookie: customerCookie } });
if (result.statusCode !== 401) throw new Error("A customer session accessed administrator user analytics.");
result = await call(adminUsers, { method: "GET", headers: { cookie: adminCookie } });
if (result.statusCode !== 200 || result.payload?.metrics?.totalUsers !== 1 ||
    result.payload?.metrics?.totalVisits !== 2 || result.payload?.users?.[0]?.email !== "buyer@example.com") {
  throw new Error("User emails, user totals, or website visit counts were not aggregated correctly.");
}

result = await call(download, { method: "POST", body: { platform: "macos" } });
if (result.statusCode !== 401) throw new Error("Anonymous installer clicks were counted.");
result = await call(download, { method: "POST", headers: { cookie: customerCookie }, body: { platform: "linux" } });
if (result.statusCode !== 400) throw new Error("An unsupported download platform was accepted.");
await call(download, { method: "POST", headers: { cookie: customerCookie }, body: { platform: "macos" } });
await call(download, { method: "POST", headers: { cookie: customerCookie }, body: { platform: "macos" } });
await call(download, { method: "POST", headers: { cookie: customerCookie }, body: { platform: "windows" } });
result = await call(adminDownloads, { method: "GET", headers: { cookie: customerCookie } });
if (result.statusCode !== 401) throw new Error("A customer session accessed administrator download analytics.");
result = await call(adminDownloads, { method: "GET", headers: { cookie: adminCookie } });
if (result.statusCode !== 200 || result.payload?.metrics?.macOSDownloads !== 2 ||
    result.payload?.metrics?.windowsDownloads !== 1 || result.payload?.metrics?.totalDownloads !== 3) {
  throw new Error("macOS and Windows download clicks were not aggregated separately.");
}

const websiteFeedback = {
  source: "website",
  message: "Please add a clearer order status.",
  contact: "buyer@example.com",
  language: "en",
  clientSubmissionId: "website-feedback-test-001",
};
result = await call(feedback, {
  method: "POST",
  headers: { cookie: customerCookie },
  body: websiteFeedback,
});
if (result.statusCode !== 201 || result.payload?.feedback?.email !== "buyer@example.com") {
  throw new Error("Authenticated website feedback was not persisted with its verified email.");
}
result = await call(feedback, {
  method: "POST",
  headers: { cookie: customerCookie },
  body: websiteFeedback,
});
if (result.statusCode !== 200) throw new Error("Duplicate feedback was not handled idempotently.");

result = await call(feedback, {
  method: "POST",
  body: {
    source: "macos",
    message: "Search did not find a shortcut.",
    contact: "tester@example.com",
    softwareID: "figma",
    language: "zh",
    appVersion: "1.0.2",
    clientSubmissionId: "macos-feedback-test-001",
  },
});
if (result.statusCode !== 201 || result.payload?.feedback?.source !== "macos") {
  throw new Error("KeyFloat client feedback was not accepted.");
}

const softwareRequest = {
  source: "macos",
  kind: "software_request",
  message: "Affinity Publisher 3",
  contact: "tester@example.com",
  softwareName: "Affinity Publisher 3",
  softwareGroup: "design",
  language: "en",
  appVersion: "1.0.2",
  clientSubmissionId: "macos-software-request-test-001",
};
result = await call(feedback, { method: "POST", body: softwareRequest });
if (result.statusCode !== 201 || result.payload?.feedback?.kind !== "software_request" ||
    result.payload?.feedback?.softwareName !== "Affinity Publisher 3" ||
    result.payload?.feedback?.softwareGroup !== "design") {
  throw new Error("KeyFloat software request was not persisted with its structured fields.");
}
result = await call(feedback, { method: "POST", body: softwareRequest });
if (result.statusCode !== 200) throw new Error("Duplicate software request was not handled idempotently.");

result = await call(feedback, { method: "POST", body: { source: "website", message: "   " } });
if (result.statusCode !== 400) throw new Error("Blank feedback was accepted.");
result = await call(feedback, {
  method: "POST",
  body: { source: "macos", kind: "software_request", message: "Missing structured name" },
});
if (result.statusCode !== 400) throw new Error("A software request without a software name was accepted.");
result = await call(adminFeedback, { method: "GET", headers: { cookie: customerCookie } });
if (result.statusCode !== 401) throw new Error("A customer session accessed administrator feedback.");
result = await call(adminFeedback, { method: "GET", headers: { cookie: adminCookie } });
if (result.statusCode !== 200 || result.payload?.metrics?.totalFeedback !== 3 ||
    result.payload?.metrics?.websiteFeedback !== 1 || result.payload?.metrics?.macOSFeedback !== 2 ||
    result.payload?.metrics?.softwareRequests !== 1 ||
    !result.payload?.feedback?.some((item) => item.kind === "software_request" &&
      item.softwareName === "Affinity Publisher 3" && item.softwareGroup === "design")) {
  throw new Error("Unified website and KeyFloat feedback totals are incorrect.");
}

console.log("Validated verified user totals, per-user website visits, structured software requests, unified feedback, idempotency, and administrator isolation.");
