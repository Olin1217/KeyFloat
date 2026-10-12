# KeyFloat Web

Production-oriented bilingual homepage for the KeyFloat desktop product. It presents the available macOS edition and the Windows edition currently in development.

## Local preview

```bash
cd '/Volumes/loong/Product Developer/KeyFloat/KeyFloat-Web'
npm run check
npm run dev
```

Open `http://localhost:4173`. English is the default; the selected language is stored locally. The development server includes the authentication API. Verification codes are printed in the terminal and shown inside the local-only login UI so the full flow can be tested without a mail account.

## Email login and order recovery

KeyFloat uses passwordless email login. A six-digit code is valid for 10 minutes, can be resent after 60 seconds, and is invalidated after repeated failed attempts. Successful verification creates an HttpOnly, SameSite session cookie. The account view reads only orders belonging to that verified email.

The payment endpoint stores each customer submission as a pending manual-review claim. The server generates an internal review reference; the customer never enters an Alipay transaction number. After an administrator confirms receipt in the merchant ledger, the server signs a voucher and stores the completed purchase with its email, review reference, amount, purchase date, and optional download URL. This lets a buyer keep the checkout page open for automatic delivery or sign in later to recover the voucher.

Production authentication needs three services configured through environment variables:

1. `KEYFLOAT_SESSION_SECRET` and `KEYFLOAT_AUTH_CODE_SECRET`: independent random secrets of at least 32 characters.
2. Vercel KV or Upstash Redis REST via `KV_REST_API_URL` and `KV_REST_API_TOKEN` for verification-code and order persistence.
3. An email provider:
   - Resend: `KEYFLOAT_AUTH_EMAIL_PROVIDER=resend`, `RESEND_API_KEY`, and `KEYFLOAT_AUTH_FROM_EMAIL`.
   - Future/custom platform: `KEYFLOAT_AUTH_EMAIL_PROVIDER=webhook`, `KEYFLOAT_AUTH_EMAIL_WEBHOOK_URL`, and `KEYFLOAT_AUTH_EMAIL_WEBHOOK_TOKEN`.

Administrator direct login is handled only by the standalone server endpoint. Configure `KEYFLOAT_ADMIN_LOGIN_CODE` and `KEYFLOAT_ADMIN_EMAIL` in the deployment environment. The customer website never accepts an administrator code. Customer and administrator sessions use separate HttpOnly cookies, so signing into `/admin.html` cannot replace the customer login or account page. The real code must never be added to `app.js`, `site-config.js`, or committed environment files.

The standalone administrator website is available at `/admin.html`. It has a dedicated private-code login, pending and completed payment filters, five-second automatic refresh, review-reference copy, and a confirmation step before voucher issuance. Authentication and approval are still enforced by the server; hiding or renaming the page is not treated as a security boundary.

Production never returns a verification code to the browser. Console delivery and the visible test code are restricted to the local development server.

## Alipay checkout readiness

The manual-review checkout uses the verified Figma QR asset at `assets/payment/alipay-qr.png`. `site-config.js` points the live checkout to that local asset so it cannot expire or depend on Figma at runtime. The dialog recreates the Figma blue Alipay card with the QR, ¥6.00 amount, and Keyfloat activation-code label.

The server endpoint retains an independent private launch switch. Set `KEYFLOAT_CHECKOUT_ENABLED=true` in each deployment environment only after persistent Redis storage, administrator access, voucher signing, and email delivery are configured. If the QR fails to load or the server switch is disabled, the payment submission remains unavailable.

Before publishing:

1. Confirm `assets/payment/alipay-qr.png` is the intended collection account and ¥6 product QR.
2. Optionally set an official HTTPS `qr.alipay.com` mobile link in `payment.alipayPaymentUrl`.
3. Configure persistent Redis storage, administrator access, and the voucher signing key described below.
4. Set the server-only `KEYFLOAT_CHECKOUT_ENABLED=true`.
5. Test customer submission, duplicate-click protection, administrator approval, live status polling, voucher email, and voucher recovery.
6. Run `npm run check` and verify the dialog on desktop and mobile before publishing.

Do not paste payment credentials or private signing keys into `site-config.js`.

## Manual payment review and voucher signing

Deploy `api/payment-claim.js` on Vercel and configure these server-only variables:

- `KEYFLOAT_CHECKOUT_ENABLED`
- `KEYFLOAT_LICENSE_PRIVATE_KEY_BASE64`
- optional `KEYFLOAT_INSTALLER_DOWNLOAD_URL`
- `KEYFLOAT_SESSION_SECRET`
- `KEYFLOAT_AUTH_CODE_SECRET`
- `KV_REST_API_URL`
- `KV_REST_API_TOKEN`
- the selected email-provider variables described above

The customer must be signed in, scan the configured QR code, and click **I have completed payment**. `api/payment-claim.js` creates a durable pending claim and an internal review reference. Repeated clicks from the same verified email reuse its current pending claim rather than generating duplicate review work. The page then polls `api/payment-status.js` while showing the manual-review state.

The administrator signs in with the private administrator code and reviews pending claims in `/admin.html`. Before approving a claim, compare the verified email, submitted time, amount, and receiving account with the Alipay merchant ledger. Clicking **Payment received · issue voucher** calls `api/admin/payment-claims.js`. The server acquires an approval lock, stores one paid order for the review, and issues one signed `KF1` voucher. Repeated approval requests return the same stored voucher instead of issuing another one.

After the voucher is durably stored, the same voucher is delivered to the customer's verified login email through the configured Resend or email-webhook provider. Web delivery remains successful if the email provider is temporarily unavailable. The administrator history shows the email delivery state and exposes a retry action for failed or legacy deliveries. Resend requests use a per-claim idempotency key to reduce duplicate email delivery during retries.

The voucher contains a mixed-case random token, issue timestamp, and Ed25519 signature. Only the public verification key is embedded in the application. The private signing key is required only by the administrator approval endpoint.

The local signing key was generated with:

```bash
npm run generate-license-key
```

The private value is stored in `.env.local` with owner-only permissions and is excluded by `.gitignore`. Copy that value into the production server environment; never commit or share `.env.local`. The matching public key is stored in `license-public-key.json` and embedded in the native app.

## Before publishing

- Confirm the local Alipay QR asset belongs to the intended collection account.
- Keep the server checkout switch enabled only when Redis, administrator login, signing, and email delivery are ready.
- Test pending submission, duplicate clicks from one account, manual approval, repeated approval, customer polling, and order recovery.
- Test successful voucher email delivery, provider failure, and administrator email retry using the same voucher code.
- Configure persistent authentication storage and a verified email sender domain.
- Test sign-in, code expiry, resend throttling, session restoration, order retrieval, voucher copying, and logout in production.
- Keep installer URLs outside public source and return only short-lived links after payment verification.
- Sign and notarize the macOS installer.
- Add the Windows installer only after that edition is complete.
