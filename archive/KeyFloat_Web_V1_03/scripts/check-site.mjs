import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const required = [
  "index.html",
  "styles.css",
  "app.js",
  "site-config.js",
  "api/payment-claim.js",
  "license-public-key.json",
  "assets/keyfloat-logo.svg",
  "assets/keyfloat-logo-white.svg"
];
for (const file of required) {
  if (!fs.existsSync(path.join(root, file))) throw new Error(`Missing ${file}`);
}

const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
const styles = fs.readFileSync(path.join(root, "styles.css"), "utf8");
const siteConfig = fs.readFileSync(path.join(root, "site-config.js"), "utf8");
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
if (!/status:\s*["'](?:setup|live)["']/.test(siteConfig)) throw new Error("Payment status must be setup or live.");
if (/status:\s*["']live["']/.test(siteConfig) && !/alipayQrImageUrl:\s*["'][^"']+["']/.test(siteConfig)) {
  throw new Error("A live checkout must configure a real Alipay QR image URL.");
}
if (!/id="payment-reference"[^>]*disabled/.test(html) ||
    !/id="delivery-email"[^>]*disabled/.test(html) ||
    !/id="purchase-consent"[^>]*disabled/.test(html)) {
  throw new Error("Checkout controls must fail closed before JavaScript validates the live configuration.");
}
if (!app.includes("桌面级快捷键工具，为您的创意增效") ||
    !app.includes("针对工程师、设计师、文字工作者、学生开发的一款增效工具")) {
  throw new Error("Required Chinese hero copy is missing.");
}
if (!app.includes("该券码仅展示一次，请您复制后妥善保管，若遗失请联系产品开发者")) {
  throw new Error("The one-time voucher warning is missing.");
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
if (!app.includes("resolveCollisions") || !app.includes("velocityY += 0.2")) {
  throw new Error("The hero software field must retain gravity and collision behavior.");
}
if (!app.includes("setupProofCounters") || !app.includes("IntersectionObserver") || !/data-counter-target="8432"/.test(html)) {
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
console.log(`Validated ${new Set(keys).size} bilingual UI keys, ${softwareIcons.length} software logos, and ${required.length} required website files.`);
