import fs from "node:fs";
import crypto from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const required = [
  "index.html",
  "admin.html",
  "admin.css",
  "admin.js",
  "styles.css",
  "app.js",
  "motion.js",
  "site-config.js",
  "api/payment-claim.js",
  "api/payment-status.js",
  "api/alipay/config.js",
  "api/alipay/create-order.js",
  "api/alipay/order-status.js",
  "api/alipay/notify.js",
  "api/alipay/query-order.js",
  "api/feedback.js",
  "api/analytics/visit.js",
  "api/analytics/download.js",
  "api/admin/payment-claims.js",
  "api/admin/users.js",
  "api/admin/feedback.js",
  "api/admin/downloads.js",
  "api/admin/licenses.js",
  "api/app/update.js",
  "api/_lib/analytics.js",
  "api/_lib/feedback.js",
  "api/_lib/payment-claims.js",
  "api/_lib/alipay.js",
  "api/_lib/activation-codes.js",
  "api/_lib/releases.js",
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
  "api/license/redeem.js",
  "license-public-key.json",
  "release-manifest.json",
  "assets/keyfloat-logo.svg",
  "assets/keyfloat-logo-white.svg",
  "assets/vendor/gsap.min.js",
  "assets/vendor/ScrollTrigger.min.js",
  "assets/payment/alipay-qr.png",
  "downloads/KeyFloat-macOS-1.0.4-universal.dmg",
  "downloads/KeyFloat-macOS-1.0.4-universal.dmg.sha256",
  "downloads/KeyFloat-Windows-1.0.5-x64-Setup.exe",
  "downloads/KeyFloat-Windows-1.0.5-x64-Setup.exe.sha256"
];
for (const file of required) {
  if (!fs.existsSync(path.join(root, file))) throw new Error(`Missing ${file}`);
}

const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
const motion = fs.readFileSync(path.join(root, "motion.js"), "utf8");
const styles = fs.readFileSync(path.join(root, "styles.css"), "utf8");
const siteConfig = fs.readFileSync(path.join(root, "site-config.js"), "utf8");
const adminHTML = fs.readFileSync(path.join(root, "admin.html"), "utf8");
const adminJS = fs.readFileSync(path.join(root, "admin.js"), "utf8");
const mailer = fs.readFileSync(path.join(root, "api", "_lib", "mailer.js"), "utf8");
const alipay = fs.readFileSync(path.join(root, "api", "_lib", "alipay.js"), "utf8");
const keys = [...html.matchAll(/data-i18n(?:-placeholder|-aria|-alt)?="([^"]+)"/g)].map((match) => match[1]);
for (const key of new Set(keys)) {
  const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const matches = app.match(new RegExp(`"${escaped}"\\s*:`, "g")) || [];
  if (matches.length < 2) throw new Error(`Missing bilingual translation for ${key}`);
}

if (/href="#"[^>]*data-i18n="dl\./.test(html)) throw new Error("Placeholder download links must not be exposed.");
if (!/data-platform="macos"/.test(html) || !/data-platform="windows"/.test(html)) throw new Error("Both desktop installers must be available.");
if (/platform-card upcoming|platform\.windows\.cta">Coming soon|platform\.windows\.cta">即将推出/.test(html)) {
  throw new Error("The released Windows installer must not retain a coming-soon state.");
}
if (!/platform-icon windows-icon[^>]*>\s*<svg[^>]*viewBox="0 0 24 24"/.test(html) || /windows-icon[^>]*>[\s\S]*?<i>/.test(html)) {
  throw new Error("The Windows platform card must use the official four-pane SVG in the shared icon geometry.");
}
if (/macOS only|Buy for macOS|Get KeyFloat for macOS|仅支持 macOS|购买 macOS 版/.test(html + app)) {
  throw new Error("Legacy macOS-only marketing copy remains in the website.");
}
if (!/priceCny:\s*6/.test(siteConfig) || /priceCny:\s*10/.test(siteConfig)) throw new Error("Website price must be ¥6.");
if (!/defaultLanguage:\s*["']en["']/.test(siteConfig)) throw new Error("Website default language must be English.");
if (!/languageDefaultVersion:\s*2/.test(siteConfig)) throw new Error("Website English-default migration version is missing.");
if (!/windowsStatus:\s*["']available["']/.test(siteConfig) ||
    !/windowsInstallerUrl:\s*["']\/downloads\/KeyFloat-Windows-1\.0\.5-x64-Setup\.exe["']/.test(siteConfig) ||
    !/windowsVersion:\s*["']1\.0\.5["']/.test(siteConfig)) {
  throw new Error("Windows release metadata is incomplete.");
}

for (const platform of ["macos", "windows"]) {
  const url = siteConfig.match(new RegExp(`${platform}InstallerUrl:\\s*["']([^"']+)["']`))?.[1];
  const expected = siteConfig.match(new RegExp(`${platform}Sha256:\\s*["']([a-f0-9]{64})["']`, "i"))?.[1]?.toLowerCase();
  if (!url?.startsWith("/downloads/") || !expected) throw new Error(`Missing ${platform} installer integrity metadata.`);
  const installer = path.join(root, url.slice(1));
  const actual = crypto.createHash("sha256").update(fs.readFileSync(installer)).digest("hex");
  if (actual !== expected) throw new Error(`${platform} installer checksum does not match site-config.js.`);
}
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
    !app.includes("正在核验，大约需要 3–5 分钟。您可以保持页面打开，也可以稍后在订单中查询激活码。")) {
  throw new Error("Required Chinese checkout and review copy is missing.");
}
if (!app.includes("桌面级快捷键工具，为您的创意增效") ||
    !app.includes("针对工程师、设计师、文字工作者、学生开发的一款增效工具")) {
  throw new Error("Required Chinese hero copy is missing.");
}
if (!app.includes("请勿向他人分享该激活码。激活码已保存至订单，并会发送到您的购买邮箱。")) {
  throw new Error("The activation-code privacy and recovery message is missing.");
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
if (!/id="user-count"/.test(adminHTML) || !/id="visit-count"/.test(adminHTML) ||
    !/id="feedback-count"/.test(adminHTML) || !/id="user-list"/.test(adminHTML) ||
    !/id="feedback-list"/.test(adminHTML) || !adminJS.includes("/api/admin/users") ||
    !adminJS.includes("/api/admin/feedback") || !adminJS.includes("visitCount")) {
  throw new Error("Administrator user, visit, and unified feedback reporting is incomplete.");
}
if (!/id="macos-download-count"/.test(adminHTML) || !/id="windows-download-count"/.test(adminHTML) ||
    !adminJS.includes("/api/admin/downloads") || !app.includes('fetch("/api/analytics/download"') ||
    !app.includes("setupDownloadAnalytics")) {
  throw new Error("Per-platform download click reporting is incomplete.");
}
if (!/id="license-list"/.test(adminHTML) || !/id="license-search"/.test(adminHTML) ||
    (adminHTML.match(/data-license-filter=/g) || []).length !== 3 ||
    !adminJS.includes("/api/admin/licenses") || !adminJS.includes("setLicenseFilter") ||
    !adminJS.includes("activationCodeCopyButton")) {
  throw new Error("Administrator activation-code inventory and redeemed-code views are incomplete.");
}
if (!/id="website-feedback-form"/.test(html) || !/data-feedback-dialog/.test(html) ||
    !app.includes('fetch("/api/feedback"') || !app.includes('fetch("/api/analytics/visit"')) {
  throw new Error("Website feedback submission or authenticated visit tracking is incomplete.");
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
if (!/alipayCreateEndpoint:\s*["']\/api\/alipay\/create-order["']/.test(siteConfig) ||
    !/alipayStatusEndpoint:\s*["']\/api\/alipay\/order-status["']/.test(siteConfig) ||
    !app.includes("detectAutomaticAlipay") || !app.includes("preparePaymentCheckout")) {
  throw new Error("Automatic Alipay QR checkout is not connected to the customer payment dialog.");
}
if (!alipay.includes('"alipay.trade.precreate"') || !alipay.includes('"alipay.trade.query"') ||
    !alipay.includes("verifyParams(notification") || !alipay.includes("ALIPAY_AMOUNT_MISMATCH") ||
    !alipay.includes("finalizeAlipayOrder")) {
  throw new Error("Alipay order creation, signed callback validation, active querying, or idempotent finalization is incomplete.");
}
if (/KEYFLOAT_ALIPAY_(?:PRIVATE_KEY|PUBLIC_KEY)/.test(app + siteConfig + html)) {
  throw new Error("Alipay server keys must never appear in public website files.");
}
if (!fs.readFileSync(path.join(root, "api", "license", "redeem.js"), "utf8").includes("redeemActivationCode") ||
    !fs.readFileSync(path.join(root, "api", "_lib", "activation-codes.js"), "utf8").includes("issueActivationCredential")) {
  throw new Error("Short-code redemption is not connected to the persistent activation-code store.");
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
if (!/assets\/vendor\/gsap\.min\.js\?v=3\.15\.0/.test(html) ||
    !/assets\/vendor\/ScrollTrigger\.min\.js\?v=3\.15\.0/.test(html) ||
    !/motion\.js\?v=1\.4\.0/.test(html) || !motion.includes("gsap.registerPlugin(ScrollTrigger)")) {
  throw new Error("The local GSAP motion layer is incomplete.");
}
if (!motion.includes('matchMedia("(prefers-reduced-motion: reduce)")') ||
    !motion.includes("setupPageReveals") || !motion.includes("setupMagneticFeedback") ||
    !motion.includes("keyfloat:site-visible")) {
  throw new Error("The motion layer must retain reduced-motion, reveal, interaction, and site-visibility handling.");
}
if (/addEventListener\(["']scroll["']/.test(app + motion)) {
  throw new Error("Visual behavior must use IntersectionObserver or ScrollTrigger instead of scroll listeners.");
}
if (!app.includes("new IntersectionObserver(([entry])") ||
    !app.includes("purchase.hidden = entry.isIntersecting")) {
  throw new Error("The post-hero purchase action must use observer-driven visibility.");
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
const unreadableSoftwareIcons = softwareIcons.filter((name) => {
  const mode = fs.statSync(path.join(softwareIconRoot, name)).mode;
  return (mode & 0o004) === 0;
});
if (unreadableSoftwareIcons.length) {
  throw new Error(`Website software SVGs must be world-readable for production: ${unreadableSoftwareIcons.join(", ")}`);
}
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
