# KeyFloat Web

Production-oriented bilingual homepage for the KeyFloat desktop product. It presents the available macOS edition and the Windows edition currently in development.

## Local preview

```bash
cd '/Volumes/loong/Product Developer/KeyFloat/KeyFloat-Web'
npm run check
npm run dev
```

Open `http://localhost:4173`. English is the default; the selected language is stored locally.

## Alipay checkout readiness

The complete checkout integration is present, but it is deliberately locked while no real QR image exists. The public page and the server endpoint each have an independent launch switch, so a partial deployment cannot accidentally collect payments or issue vouchers.

Keep the current settings while payment is not ready:

- `payment.status: "setup"` in `site-config.js`
- `KEYFLOAT_CHECKOUT_ENABLED=false` in the server environment

To open checkout later:

1. Upload the real Alipay collection QR image to an HTTPS domain, or add it as `assets/payment/alipay-qr.png`.
2. Set `payment.alipayQrImageUrl` in `site-config.js` to the HTTPS URL or `/assets/payment/alipay-qr.png`.
3. Optionally set an official HTTPS `qr.alipay.com` mobile link in `payment.alipayPaymentUrl`.
4. Deploy and test the private payment verifier described below.
5. Set the server-only `KEYFLOAT_CHECKOUT_ENABLED=true`.
6. Change `payment.status` from `setup` to `live`.
7. Run `npm run check` and verify the dialog on desktop and mobile before publishing.

When checkout is in `setup`, when the image is missing, or when the QR fails to load, the form stays disabled. The server also returns `CHECKOUT_DISABLED` unless its private launch switch is exactly `true`.

Do not paste payment credentials or private signing keys into `site-config.js`.

## Payment verification and voucher signing

Deploy `api/payment-claim.js` on Vercel and configure these server-only variables:

- `KEYFLOAT_CHECKOUT_ENABLED`
- `PAYMENT_CLAIM_WEBHOOK_URL`
- `PAYMENT_CLAIM_WEBHOOK_TOKEN`
- `KEYFLOAT_LICENSE_PRIVATE_KEY_BASE64`

The endpoint sends the verifier a JSON object containing `product`, `amountCny`, `paymentReference`, normalized `email`, `language`, `submittedAt`, and `source`. The private webhook must synchronously return `{ "verified": true }` only after it validates the ¥6 settlement, transaction ownership, duplicate claims, and refund state. Verification and claim marking should be one atomic operation. It may also return a short-lived HTTPS `downloadURL`.

Expected verifier responses:

- `200 { "verified": true, "downloadURL": "https://..." }` — payment accepted and atomically marked claimed
- `200 { "verified": false }` — payment not found or not settled yet
- `409 { "code": "ALREADY_CLAIMED" }` — a voucher has already been issued for this transaction
- any other failure — no voucher is issued

The public endpoint then issues a signed `KF1` voucher. The voucher contains a mixed-case random token, issue timestamp, and Ed25519 signature. Only the public verification key is embedded in the application.

The local signing key was generated with:

```bash
npm run generate-license-key
```

The private value is stored in `.env.local` with owner-only permissions and is excluded by `.gitignore`. Copy that value into the production server environment; never commit or share `.env.local`. The matching public key is stored in `license-public-key.json` and embedded in the native app.

## Before publishing

- Add the real Alipay QR image URL.
- Switch both checkout launch controls only after the QR and verifier are ready.
- Deploy the private payment verification webhook and test successful, pending, duplicate, wrong-amount, and rejected claims.
- Keep installer URLs outside public source and return only short-lived links after payment verification.
- Sign and notarize the macOS installer.
- Add the Windows installer only after that edition is complete.
