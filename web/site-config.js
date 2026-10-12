window.KEYFLOAT_CONFIG = Object.freeze({
  product: {
    priceCny: 6,
    defaultLanguage: "en",
    languageDefaultVersion: 2,
    softwareCount: 209,
    shortcutCount: 10783,
    minimumMacOS: "13.0",
    windowsStatus: "available"
  },
  download: {
    macosInstallerUrl: "/downloads/KeyFloat-macOS-1.0.5-universal.dmg",
    macosVersion: "1.0.5",
    macosArchitectures: ["arm64", "x86_64"],
    macosSha256: "4dd478c5d7423716a5a2e8555029b77226f9b1f0d17d059873192371a88bdc09",
    windowsInstallerUrl: "/downloads/KeyFloat-Windows-1.0.5-x64-Setup.exe",
    windowsVersion: "1.0.5",
    windowsArchitectures: ["x86_64"],
    windowsSha256: "89e5976cb982111bd7a25c8846ee32787dd6f67ab12dd2b249d5d96c308e3e11"
  },
  payment: {
    // The real Alipay collection QR is stored locally and rendered by the existing checkout dialog.
    status: "live",
    alipayQrImageUrl: "/assets/payment/alipay-qr.png",
    // Optional mobile deep link, for example an official qr.alipay.com URL.
    alipayPaymentUrl: "",
    claimEndpoint: "/api/payment-claim",
    statusEndpoint: "/api/payment-status",
    alipayConfigEndpoint: "/api/alipay/config",
    alipayCreateEndpoint: "/api/alipay/create-order",
    alipayStatusEndpoint: "/api/alipay/order-status"
  },
  auth: {
    requestCode: "/api/auth/request-code",
    verifyCode: "/api/auth/verify-code",
    session: "/api/auth/session",
    logout: "/api/auth/logout",
    orders: "/api/orders"
  },
  support: {
    email: "SHL7450702@gmail.com"
  }
});
