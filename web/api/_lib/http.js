function setNoStore(response) {
  response.setHeader("Cache-Control", "no-store, max-age=0");
  response.setHeader("Pragma", "no-cache");
}

function allowMethods(request, response, methods) {
  if (methods.includes(request.method)) return true;
  response.setHeader("Allow", methods.join(", "));
  response.status(405).json({ code: "METHOD_NOT_ALLOWED" });
  return false;
}

function parseCookies(request) {
  return String(request.headers?.cookie || "")
    .split(";")
    .map((part) => part.trim())
    .filter(Boolean)
    .reduce((cookies, part) => {
      const separator = part.indexOf("=");
      if (separator < 0) return cookies;
      const name = part.slice(0, separator);
      const value = part.slice(separator + 1);
      try { cookies[name] = decodeURIComponent(value); } catch { cookies[name] = value; }
      return cookies;
    }, {});
}

function requestIP(request) {
  const forwarded = String(request.headers?.["x-forwarded-for"] || "").split(",")[0].trim();
  return forwarded || request.socket?.remoteAddress || "unknown";
}

module.exports = { allowMethods, parseCookies, requestIP, setNoStore };
