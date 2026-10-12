#!/usr/bin/env node

const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const port = Number(process.env.PORT || 4173);

function loadEnvironment(file) {
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (!match || process.env[match[1]] !== undefined) continue;
    let value = match[2].trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    process.env[match[1]] = value;
  }
}

loadEnvironment(path.join(root, ".env.local"));
loadEnvironment(path.join(root, ".env.admin.local"));
process.env.NODE_ENV ||= "development";
process.env.KEYFLOAT_AUTH_EMAIL_PROVIDER ||= "console";
process.env.KEYFLOAT_AUTH_EXPOSE_DEV_CODE ||= "true";

const routes = new Map([
  ["/api/auth/request-code", require("../api/auth/request-code")],
  ["/api/auth/admin-login", require("../api/auth/admin-login")],
  ["/api/auth/admin-session", require("../api/auth/admin-session")],
  ["/api/auth/admin-logout", require("../api/auth/admin-logout")],
  ["/api/auth/verify-code", require("../api/auth/verify-code")],
  ["/api/auth/session", require("../api/auth/session")],
  ["/api/auth/logout", require("../api/auth/logout")],
  ["/api/analytics/visit", require("../api/analytics/visit")],
  ["/api/analytics/download", require("../api/analytics/download")],
  ["/api/feedback", require("../api/feedback")],
  ["/api/orders", require("../api/orders")],
  ["/api/payment-claim", require("../api/payment-claim")],
  ["/api/payment-status", require("../api/payment-status")],
  ["/api/alipay/config", require("../api/alipay/config")],
  ["/api/alipay/create-order", require("../api/alipay/create-order")],
  ["/api/alipay/order-status", require("../api/alipay/order-status")],
  ["/api/alipay/notify", require("../api/alipay/notify")],
  ["/api/alipay/query-order", require("../api/alipay/query-order")],
  ["/api/license/redeem", require("../api/license/redeem")],
  ["/api/app/update", require("../api/app/update")],
  ["/api/admin/payment-claims", require("../api/admin/payment-claims")],
  ["/api/admin/licenses", require("../api/admin/licenses")],
  ["/api/admin/users", require("../api/admin/users")],
  ["/api/admin/feedback", require("../api/admin/feedback")],
  ["/api/admin/downloads", require("../api/admin/downloads")],
]);

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

function responseAdapter(response) {
  return {
    setHeader(name, value) { response.setHeader(name, value); },
    status(code) { response.statusCode = code; return this; },
    end(payload = "") {
      response.end(payload);
      return this;
    },
    json(payload) {
      if (!response.hasHeader("Content-Type")) response.setHeader("Content-Type", "application/json; charset=utf-8");
      response.end(JSON.stringify(payload));
      return this;
    },
  };
}

async function readBody(request) {
  const chunks = [];
  let total = 0;
  for await (const chunk of request) {
    total += chunk.length;
    if (total > 32_768) throw Object.assign(new Error("Body too large"), { statusCode: 413 });
    chunks.push(chunk);
  }
  if (!chunks.length) return undefined;
  const raw = Buffer.concat(chunks).toString("utf8");
  const contentType = String(request.headers["content-type"] || "").split(";", 1)[0].trim().toLowerCase();
  if (contentType === "application/x-www-form-urlencoded") {
    return Object.fromEntries(new URLSearchParams(raw));
  }
  try { return JSON.parse(raw); }
  catch { throw Object.assign(new Error("Invalid JSON"), { statusCode: 400 }); }
}

async function handleAPI(request, response, handler) {
  try {
    request.body = await readBody(request);
    await handler(request, responseAdapter(response));
  } catch (error) {
    response.statusCode = error.statusCode || 500;
    response.setHeader("Content-Type", "application/json; charset=utf-8");
    response.end(JSON.stringify({ code: error.statusCode === 400 ? "INVALID_JSON" : error.statusCode === 413 ? "PAYLOAD_TOO_LARGE" : "SERVER_ERROR" }));
  }
}

function serveStatic(request, response, pathname) {
  const requested = pathname === "/" ? "/index.html" : pathname;
  let decoded;
  try { decoded = decodeURIComponent(requested); }
  catch { response.writeHead(400).end("Bad request"); return; }
  const file = path.resolve(root, `.${decoded}`);
  try {
    if (!file.startsWith(`${root}${path.sep}`) || !fs.statSync(file).isFile()) throw new Error("Not found");
    fs.accessSync(file, fs.constants.R_OK);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" }).end("Not found");
    return;
  }
  response.writeHead(200, {
    "Content-Type": contentTypes[path.extname(file).toLowerCase()] || "application/octet-stream",
    "Cache-Control": path.basename(file) === "index.html" ? "no-cache" : "public, max-age=300",
    "X-Content-Type-Options": "nosniff",
  });
  const stream = fs.createReadStream(file);
  stream.on("error", () => {
    if (!response.headersSent) {
      response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" }).end("Unable to read file");
    } else {
      response.destroy();
    }
  });
  stream.pipe(response);
}

const server = http.createServer((request, response) => {
  const url = new URL(request.url, `http://${request.headers.host || "localhost"}`);
  const handler = routes.get(url.pathname);
  if (handler) return void handleAPI(request, response, handler);
  serveStatic(request, response, url.pathname);
});

server.listen(port, "127.0.0.1", () => {
  console.log(`KeyFloat Web running at http://127.0.0.1:${port}`);
  console.log("Email verification codes are printed here and exposed only to the local development UI.");
});
