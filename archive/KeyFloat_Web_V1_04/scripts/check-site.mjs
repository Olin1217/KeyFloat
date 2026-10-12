import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const required = [
  "index.html",
  "admin.html",
  "admin.css",
  "admin.js",
  "styles.css",
  "app.js",
  "site-config.js",
  "api/payment-claim.js",
  "api/payment-status.js",
  "api/admin/payment-claims.js",
  "api/_lib/payment-claims.js",
  "api/_lib/mailer.js",
  "api/_lib/vouchers.js",
  "api/auth/request-code.js",
  "api/auth/admin-login.js",
  "api/auth/admin-session.js",
  "api/auth/admin-logout.js",
  "api/auth/verify-code.js",
  "api/auth/session.js",
  "api/auth/logout.js",
  "api/orders.js",
  "license-public-key.json",
  "assets/keyfloat-logo.svg",
  "assets/keyfloat-logo-white.svg",
  "assets/payment/alipay-qr.png"
];
for (const file of required) {
  if (!fs.existsSync(path.join(root, file))) throw new Error(`Missing ${file}`);
}

const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
const styles = fs.readFileSync(path.join(root, "styles.css"), "utf8");
const siteConfig = fs.readFileSync(path.join(root, "site-config.js"), "utf8");
const adminHTML = fs.readFileSync(path.join(root, "admin.html"), "utf8");
const adminJS = fs.readFileSync(path.join(root, "admin.js"), "utf8");
const mailer = fs.readFileSync(path.join(root, "api", "_lib", "mailer.js"), "utf8");
const keys = [...html.matchAll(/data-i18n(?:-placeholder|-aria|-alt)?="([^"]+)"/g)].map((match) => match[1]);
for (const key of new Set(keys)) {
  const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const matches = app.match(new RegExp(`"${escaped}"\\s*:`, "g")) || [];
  if (matches.length < 2) throw new Error(`Missing bilingual translation for ${key}`);
}

if (/href="#"[^>]*data-i18n="dl\./.test(html)) throw new Error("Placeholder download links must not be exposed.");
if (!/data-platform="macos"/.test(html) || !/>Windows</.test(html)) throw new Error("Both desktop platform cards must be present.");
if (!/platform-icon windows-icon[^>]*>\s*<svg[^>]*viewBox="0 0 24 24"/.test(html) || /windows-icon[^>]*>[\s\S]*?<i>/.test(html)) {
  throw new Error("The Windows platform card must use the official four-pane SVG in the shared icon geometry.");
}
if (/macOS only|Buy for macOS|Get KeyFloat for macOS|仅支持 macOS|购买 macOS 版/.test(html + app)) {
  throw new Error("Legacy macOS-only marketing copy remains in the website.");
}
if (!/priceCny:\s*6/.test(siteConfig) || /priceCny:\s*10/.test(siteConfig)) throw new Error("Website price must be ¥6.");
if (!/defaultLanguage:\s*["']en["']/.test(siteConfig)) throw new Error("Website default language must be English.");
if (!/languageDefaultVersion:\s*2/.test(siteConfig)) throw new Error("Website English-default migration version is missing.");
if (!/status:\s*["']live["']/.test(siteConfig) ||
    !/alipayQrImageUrl:\s*["']\/assets\/payment\/alipay-qr\.png["']/.test(siteConfig)) {
  throw new Error("The verified Alipay QR asset must remain connected to the live checkout.");
}
if (/status:\s*["']live["']/.test(siteConfig) && !/alipayQrImageUrl:\s*["'][^"']+["']/.test(siteConfig)) {
  throw new Error("A live checkout must configure a real Alipay QR image URL.");
}
if (!/id="delivery-email"[^>]*disabled/.test(html) ||
    !/<button[^>]*type="submit"[^>]*disabled[^>]*data-i18n="purchase\.submit"/.test(html)) {
  throw new Error("Checkout controls must fail closed before JavaScript validates the live configuration.");
}
if (/payment-reference|purchase-consent|purchase\.reference|purchase\.consent|purchase\.note/.test(html + app) ||
    /我确认已经完成本次付款|开发者人工核对到账后才会签发券码/.test(html + app)) {
  throw new Error("Removed transaction input, confirmation checkbox, or manual-signing note remains in checkout.");
}
if (!/class="alipay-card"/.test(html) || !/class="alipay-brand"/.test(html) ||
    !/class="alipay-card-inner"/.test(html) || !/\.alipay-card\s*\{[^}]*#1677ff/s.test(styles)) {
  throw new Error("The Figma-style blue Alipay payment card is incomplete.");
}
if (!/\.alipay-product\s*\{[^}]*white-space:\s*normal/s.test(styles) ||
    !/\.alipay-product strong\s*\{[^}]*max-width:\s*calc\(100% - 62px\)[^}]*overflow-wrap:\s*anywhere/s.test(styles)) {
  throw new Error("The payment-card product label must remain inside the white card at narrow widths.");
}
if (!app.includes("扫描二维码支付 ¥6获取激活码") ||
    !app.includes("正在核验，大约需要3-5分钟，请您不要关闭页面，如遇遗失券码的情况请在订单页面查询或联系开发团队。")) {
  throw new Error("Required Chinese checkout and review copy is missing.");
}
if (!app.includes("桌面级快捷键工具，为您的创意增效") ||
    !app.includes("针对工程师、设计师、文字工作者、学生开发的一款增效工具")) {
  throw new Error("Required Chinese hero copy is missing.");
}
if (!app.includes("该券码仅展示一次，请您复制后妥善保管，若遗失请联系产品开发者")) {
  throw new Error("The one-time voucher warning is missing.");
}
if (!/id="payment-review-panel"[^>]*hidden/.test(html) ||
    !app.includes("showPaymentReview") || !app.includes("pollClaimStatus")) {
  throw new Error("The customer manual-review wait state and live voucher polling are incomplete.");
}
if (!/id="admin-login-form"/.test(adminHTML) || !/id="dashboard"[^>]*hidden/.test(adminHTML) ||
    !adminJS.includes("/api/admin/payment-claims?scope=all") || !adminJS.includes("confirm-approve") ||
    !adminJS.includes("resend-email") || !adminJS.includes("/api/auth/admin-session") ||
    !adminJS.includes("/api/auth/admin-logout")) {
  throw new Error("The standalone administrator website is incomplete.");
}
if ((adminHTML.match(/data-metric-filter=/g) || []).length !== 3 || !adminJS.includes("setFilter")) {
  throw new Error("Every administrator metric must be an interactive payment-record filter.");
}
if (!mailer.includes("sendVoucherEmail") || !mailer.includes("keyfloat.voucher-issued") ||
    !mailer.includes("Idempotency-Key")) {
  throw new Error("Voucher email delivery and idempotent retry support are incomplete.");
}
if (/KEYFLOAT_ADMIN_LOGIN_CODE|KEYFLOAT_LICENSE_PRIVATE_KEY_BASE64/.test(adminHTML + adminJS)) {
  throw new Error("The administrator website must never expose deployment secret names or values.");
}
if (!/statusEndpoint:\s*["']\/api\/payment-status["']/.test(siteConfig) ||
    !app.includes("pollClaimStatus") || !app.includes("keyfloat-pending-claim")) {
  throw new Error("Manual payment status and pending-claim recovery are not connected.");
}
if (!siteConfig.toLowerCase().includes("shl7450702@gmail.com")) {
  throw new Error("Developer contact details are incomplete.");
}
if (/WeChat|wechat|微信/.test(html + app + siteConfig)) {
  throw new Error("The website contact surface must expose email only.");
}
if (!app.includes("within 1 business day") || !app.includes("1 个工作日内回复")) {
  throw new Error("The developer response-time promise is missing.");
}
const contactSection = html.match(/<section[^>]+id="contact"[\s\S]*?<\/section>/)?.[0] || "";
if (!/data-contact-dialog/.test(contactSection) || /@gmail\.com|SHL7450702/.test(contactSection)) {
  throw new Error("Developer contact details must remain inside the contact dialog, not exposed in the page section.");
}
if ((html.match(/data-contact-dialog(?:\s|>)/g) || []).length < 3 || !/id="contact-dialog"/.test(html)) {
  throw new Error("Navigation, page, and footer contact triggers must share the contact dialog.");
}
if (!app.includes("resolveCollisions") || !app.includes("velocityY += 0.2") ||
    !app.includes("ResizeObserver") || !app.includes("resetLogoField();")) {
  throw new Error("The hero software field must retain gravity and collision behavior.");
}
if (!/\.logo-field-wrap\s*\{[^}]*margin-top:\s*clamp\(72px,\s*8vh,\s*104px\)/s.test(styles) ||
    /data-i18n="hero\.buy"/.test(html) ||
    !/data-hero-nav-purchase[^>]*data-i18n="nav\.buy"[^>]*hidden/.test(html) ||
    !app.includes("setupHeroPurchaseVisibility") || !app.includes("purchase.hidden = hero.getBoundingClientRect().bottom")) {
  throw new Error("Hero icons must sit lower and purchase buttons must stay out of the opening screen.");
}
if (!app.includes("setupProofCounters") || !app.includes("IntersectionObserver") || !/data-counter-target="10783"/.test(html)) {
  throw new Error("The second-screen statistics must animate from zero when entering the viewport.");
}
if (/data-i18n="(?:hero|features|coverage)\.eyebrow"/.test(html)) {
  throw new Error("Removed hero, feature, or coverage eyebrow copy was reintroduced.");
}
if ((html.match(/class="coverage-icons"/g) || []).length !== 6) {
  throw new Error("Every coverage card must include a matching software icon reveal group.");
}
const coverageToolGroups = [...html.matchAll(/<p class="coverage-tools">([\s\S]*?)<\/p>/g)]
  .map((match) => match[1]);
if (coverageToolGroups.length !== 6 || coverageToolGroups.some((group) => (group.match(/<span>/g) || []).length !== 3)) {
  throw new Error("Every coverage card must present exactly three compact software-title lines.");
}
if (coverageToolGroups.some((group) => !/<span>[^<]*\.\.\.<\/span>\s*$/.test(group))) {
  throw new Error("The final software-title line in every coverage card must end with an ellipsis placeholder.");
}
if (/<article tabindex="0"><span>0[1-6]<\/span><h3 data-i18n="coverage\./.test(html)) {
  throw new Error("Legacy coverage-card index labels must not be reintroduced.");
}
if (!/\.feature-number\s*\{[^}]*font:[^;]*clamp\(/s.test(styles)) {
  throw new Error("Feature cards must retain the large background-number treatment.");
}
const coverageIconRule = styles.match(/\.coverage-icons img\s*\{([^}]*)\}/)?.[1] || "";
if (!/border:\s*0\b/.test(coverageIconRule) || /background\s*:/.test(coverageIconRule) || !/padding:\s*0\b/.test(coverageIconRule)) {
  throw new Error("Revealed software logos must remain free of added white tiles, borders, and padding.");
}
if (/linear-gradient|radial-gradient|rgba\(|hsla\(/i.test(styles)) {
  throw new Error("Website surfaces must use solid colors without gradients or alpha color syntax.");
}
const softwareIconRoot = path.join(root, "assets", "software-icons");
const softwareIcons = fs.readdirSync(softwareIconRoot).filter((name) => name.endsWith(".svg"));
if (softwareIcons.length !== 52) throw new Error(`Expected 52 website software SVGs, found ${softwareIcons.length}.`);
if (/https?:\/\/[^"'\s]+\.(dmg|exe|zip)\b/i.test(html + app + siteConfig)) {
  throw new Error("Public installer URLs must not be embedded in website source.");
}
if (!/id="auth-open"[^>]*data-auth-open/.test(html) || !/<section[^>]*id="auth-page"/.test(html)) {
  throw new Error("The top navigation must expose the standalone email-login and account page.");
}
if (/<dialog[^>]*(?:auth-page|auth-dialog)/.test(html)) {
  throw new Error("Authentication must be a standalone page, never a dialog.");
}
if (!/id="auth-email"[^>]*type="email"/.test(html) || !/id="auth-code"[^>]*autocomplete="one-time-code"/.test(html)) {
  throw new Error("The complete email and verification-code login steps are missing.");
}
if (!app.includes("refreshAuthSession") || !app.includes("loadOrders") || !app.includes("authRequest")) {
  throw new Error("Authentication session restoration and order lookup are incomplete.");
}
if (!/id="auth-email-form"[^>]*novalidate/.test(html) || /signInWithAdminCode|data-auth-step="admin"/.test(html + app) ||
    /adminLogin|adminClaims/.test(siteConfig)) {
  throw new Error("The customer login must remain separate from the administrator website.");
}
if (/KEYFLOAT_ADMIN_LOGIN_CODE/.test(html + app + siteConfig)) {
  throw new Error("Administrator credentials or environment keys must never appear in public website source.");
}
if ((html.match(/data-site-shell hidden/g) || []).length !== 4 ||
    !app.includes("initializeAuthLanding") || !app.includes("showAuthSurface") || !app.includes("showWebsite")) {
  throw new Error("The public website must remain hidden until the standalone login page authenticates the visitor.");
}
if (!app.includes('previewTarget === "payment"') ||
    !app.includes('["127.0.0.1", "localhost"].includes(window.location.hostname)')) {
  throw new Error("The payment preview must remain restricted to local development hosts.");
}
const navActions = html.match(/<div class="nav-actions">([\s\S]*?)<\/div>/)?.[1] || "";
if (navActions.lastIndexOf('id="language-toggle"') < navActions.lastIndexOf('data-i18n="nav.buy"')) {
  throw new Error("Language must be the rightmost top-navigation action.");
}
if (!/\.auth-field input:focus-visible\s*\{[^}]*outline:\s*0/s.test(styles)) {
  throw new Error("Authentication inputs must use one focus border without a second outline.");
}
const authPageMarkup = html.slice(html.indexOf('id="auth-page"'));
if (/assets\/software-icons\//.test(authPageMarkup) || !/class="auth-command-window"/.test(authPageMarkup) ||
    (authPageMarkup.match(/class="auth-keycap/g) || []).length !== 10) {
  throw new Error("The authentication page must use abstract shortcut motion elements instead of software logos.");
}
for (const symbol of ["command", "space", "option", "alt", "control", "shift", "escape", "return", "delete.backward", "arrow.left.and.right"]) {
  if (!authPageMarkup.includes(`data-symbol="${symbol}"`)) {
    throw new Error(`The authentication motion is missing the native '${symbol}' keyboard symbol.`);
  }
}
if (/auth-visual-brand/.test(authPageMarkup) ||
    (authPageMarkup.match(/assets\/keyfloat-logo-white\.svg/g) || []).length !== 1) {
  throw new Error("The authentication page must show the KeyFloat brand only once in the left panel.");
}
if (!/class="text-button auth-language-button auth-page-language"/.test(authPageMarkup) ||
    !/\.auth-page-language\s*\{[^}]*position:\s*absolute[^}]*right:\s*24px/s.test(styles)) {
  throw new Error("Authentication language controls must sit at the top-right edge of the complete page.");
}
if (!/class="auth-motion-stage"/.test(authPageMarkup) ||
    !/\.auth-step\[data-auth-step="email"\]\s*\{[^}]*translateY\(clamp\(-56px,\s*-5vh,\s*-38px\)\)/s.test(styles) ||
    !/\.auth-motion-stage\s*\{[^}]*translateY\(clamp\(44px,\s*5vh,\s*64px\)\)/s.test(styles)) {
  throw new Error("The email form and right-side motion must retain their balanced vertical alignment.");
}
console.log(`Validated ${new Set(keys).size} bilingual UI keys, ${softwareIcons.length} software logos, and ${required.length} required website files.`);
