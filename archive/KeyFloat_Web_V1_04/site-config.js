window.KEYFLOAT_CONFIG = Object.freeze({
  product: {
    priceCny: 6,
    defaultLanguage: "en",
    languageDefaultVersion: 2,
    softwareCount: 209,
    shortcutCount: 10783,
    minimumMacOS: "13.0",
    windowsStatus: "development"
  },
  payment: {
    // The real Alipay collection QR is stored locally and rendered by the existing checkout dialog.
    status: "live",
    alipayQrImageUrl: "/assets/payment/alipay-qr.png",
    // Optional mobile deep link, for example an official qr.alipay.com URL.
    alipayPaymentUrl: "",
    claimEndpoint: "/api/payment-claim",
    statusEndpoint: "/api/payment-status"
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
