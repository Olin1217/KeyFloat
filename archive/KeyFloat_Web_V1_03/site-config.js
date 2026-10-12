window.KEYFLOAT_CONFIG = Object.freeze({
  product: {
    priceCny: 6,
    defaultLanguage: "en",
    languageDefaultVersion: 2,
    softwareCount: 209,
    shortcutCount: 8432,
    minimumMacOS: "13.0",
    windowsStatus: "development"
  },
  payment: {
    // Keep this as "setup" until the real QR image and server verifier are ready.
    // Change it to "live" only after KEYFLOAT_CHECKOUT_ENABLED=true is deployed.
    status: "setup",
    // Paste an HTTPS URL or a same-site path such as /assets/payment/alipay-qr.png.
    alipayQrImageUrl: "",
    // Optional mobile deep link, for example an official qr.alipay.com URL.
    alipayPaymentUrl: "",
    claimEndpoint: "/api/payment-claim"
  },
  support: {
    email: "SHL7450702@gmail.com"
  }
});
