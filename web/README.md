# KeyFloat Web

Production-oriented bilingual homepage for the KeyFloat desktop product. It provides the universal macOS 1.0.5 installer from `downloads/KeyFloat-macOS-1.0.5-universal.dmg` and the 64-bit Windows 1.0.5 installer from `downloads/KeyFloat-Windows-1.0.5-x64-Setup.exe`.

## Local preview

```bash
cd '/Volumes/loong/Product Developer/KeyFloat/KeyFloat-Web'
npm run check
npm run dev
```

Open `http://localhost:4173`. English is the default; the selected language is stored locally. The development server includes the authentication API. Verification codes are printed in the terminal and shown inside the local-only login UI so the full flow can be tested without a mail account.

## Email login and order recovery

KeyFloat uses passwordless email login. A six-digit code is valid for 10 minutes, can be resent after 60 seconds, and is invalidated after repeated failed attempts. Successful verification creates an HttpOnly, SameSite session cookie. The account view reads only orders belonging to that verified email.

The payment endpoint stores each customer submission as a pending manual-review claim. The server generates an internal review reference; the customer never enters an Alipay transaction number. After an administrator confirms receipt in the merchant ledger, the server issues a short uppercase activation code and stores the completed purchase with its email, review reference, amount, purchase date, and optional download URL. This lets a buyer keep the checkout page open for automatic delivery or sign in later to recover the activation code.

Production authentication needs three services configured through environment variables:

1. `KEYFLOAT_SESSION_SECRET` and `KEYFLOAT_AUTH_CODE_SECRET`: independent random secrets of at least 32 characters.
2. Persistent storage using either Vercel KV / Upstash Redis REST (`KV_REST_API_URL` and `KV_REST_API_TOKEN`) or a private local data file (`KEYFLOAT_DATA_FILE`) for a single self-hosted Node process.
3. An email provider:
   - SMTP: `KEYFLOAT_AUTH_EMAIL_PROVIDER=smtp`, `KEYFLOAT_AUTH_FROM_EMAIL`, `KEYFLOAT_SMTP_HOST`, `KEYFLOAT_SMTP_PORT`, `KEYFLOAT_SMTP_SECURE`, `KEYFLOAT_SMTP_USER`, and `KEYFLOAT_SMTP_PASSWORD`.
   - Resend: `KEYFLOAT_AUTH_EMAIL_PROVIDER=resend`, `RESEND_API_KEY`, and `KEYFLOAT_AUTH_FROM_EMAIL`.
   - Future/custom platform: `KEYFLOAT_AUTH_EMAIL_PROVIDER=webhook`, `KEYFLOAT_AUTH_EMAIL_WEBHOOK_URL`, and `KEYFLOAT_AUTH_EMAIL_WEBHOOK_TOKEN`.

Administrator direct login is handled only by the standalone server endpoint. Configure `KEYFLOAT_ADMIN_LOGIN_CODE` and `KEYFLOAT_ADMIN_EMAIL` in the deployment environment. The customer website never accepts an administrator code. Customer and administrator sessions use separate HttpOnly cookies, so signing into `/admin.html` cannot replace the customer login or account page. The real code must never be added to `app.js`, `site-config.js`, or committed environment files.

The standalone administrator website is available at `/admin.html`. It has a dedicated private-code login, user and visit reporting, unified feedback, pending and completed payment filters, ten-second automatic refresh, review-reference copy, and a confirmation step before activation-code issuance. Authentication and approval are still enforced by the server; hiding or renaming the page is not treated as a security boundary.

Production never returns a verification code to the browser. Console delivery and the visible test code are restricted to the local development server.

## User analytics and feedback

The website records one visit after a verified customer session reaches the homepage. Anonymous login-page views are not assigned to an email, and repeated API calls inside one loaded page are not counted as extra visits. The administrator-only `/api/admin/users` endpoint returns the verified email list, total user count, aggregate visits, and each user's visit count. Existing verified payment-claim emails are migrated into the user list without inventing historical visits.

Website feedback is submitted through the feedback dialog. The macOS client sends its existing locally queued feedback to the same `/api/feedback` endpoint and retries undelivered reports on a later launch or submission. Each client submission ID is idempotent, request frequency is limited by a private IP hash, and the stored feedback does not include an IP address. `/api/admin/feedback` combines website and KeyFloat client reports and is available only to an authenticated administrator.

## Alipay checkout readiness

The checkout now supports two server-selected modes. Until Alipay Open Platform credentials are complete, it retains the verified manual-review QR at `assets/payment/alipay-qr.png`. When the server has complete RSA2 credentials, activation signing, persistent storage, short codes, and `KEYFLOAT_ALIPAY_ENABLED=true`, `/api/alipay/config` automatically switches the same dialog to a unique `alipay.trade.precreate` QR order.

Alipay sends an asynchronous form callback to `/api/alipay/notify` after payment. The server verifies the RSA2 signature, App ID, optional seller ID, merchant order number, and exact amount, then confirms the transaction through `alipay.trade.query` before issuing anything. Finalization is locked and idempotent: retries, duplicate callbacks, and repeated status checks return the one stored activation code. The same code is saved under the verified buyer account and sent to that verified email.

Completed automatic Alipay purchases are merged into the existing administrator **Issued** and **Recent records** views. They never appear in the manual pending queue. A failed activation email remains visible to the administrator and uses the existing resend action without issuing a replacement code.

Full application, RSA2-key, callback, and rollout instructions are in `ALIPAY_OPEN_PLATFORM_SETUP.md`.

The server endpoint retains an independent private launch switch. Set `KEYFLOAT_CHECKOUT_ENABLED=true` in each deployment environment only after persistent Redis storage, administrator access, voucher signing, and email delivery are configured. If the QR fails to load or the server switch is disabled, the payment submission remains unavailable.

Before publishing:

1. Confirm `assets/payment/alipay-qr.png` is the intended collection account and ¥6 product QR.
2. Optionally set an official HTTPS `qr.alipay.com` mobile link in `payment.alipayPaymentUrl`.
3. Configure persistent Redis storage, administrator access, and the voucher signing key described below.
4. For manual review, set `KEYFLOAT_CHECKOUT_ENABLED=true`. For automatic Alipay, configure the variables in `ALIPAY_OPEN_PLATFORM_SETUP.md` and set `KEYFLOAT_ALIPAY_ENABLED=true` only after sandbox verification.
5. Test customer submission, duplicate-click protection, administrator approval, live status polling, voucher email, and voucher recovery.
6. Run `npm run check` and verify the dialog on desktop and mobile before publishing.

Do not paste payment credentials or private signing keys into `site-config.js`.

## Manual payment review and activation-code signing

Deploy `api/payment-claim.js` on Vercel and configure these server-only variables:

- `KEYFLOAT_CHECKOUT_ENABLED`
- `KEYFLOAT_LICENSE_PRIVATE_KEY_BASE64`
- `KEYFLOAT_SHORT_CODES_ENABLED`
- optional `KEYFLOAT_LICENSE_DEVICE_LIMIT` (defaults to `3`)
- optional `KEYFLOAT_INSTALLER_DOWNLOAD_URL`
- `KEYFLOAT_SESSION_SECRET`
- `KEYFLOAT_AUTH_CODE_SECRET`
- `KV_REST_API_URL`
- `KV_REST_API_TOKEN`
- the selected email-provider variables described above

The customer must be signed in, scan the configured QR code, and click **I have completed payment**. `api/payment-claim.js` creates a durable pending claim and an internal review reference. Repeated clicks from the same verified email reuse its current pending claim rather than generating duplicate review work. The page then polls `api/payment-status.js` while showing the manual-review state.

The administrator signs in with the private administrator code and reviews pending claims in `/admin.html`. Before approving a claim, compare the verified email, submitted time, amount, and receiving account with the Alipay merchant ledger. Clicking **Payment received · issue activation code** calls `api/admin/payment-claims.js`. The server acquires an approval lock, stores one paid order for the review, and issues one short code in the form `KF1-XXXXX-XXXXX-XXXXX-XXXXX`. Repeated approval requests return the same stored code instead of issuing another one.

After the activation code is durably stored, the same code is delivered to the customer's verified login email through the configured email provider. Web delivery remains successful if the email provider is temporarily unavailable. The administrator history shows the email delivery state and exposes a retry action for failed or legacy deliveries.

The short code is a high-entropy, uppercase bearer credential. During first activation, the desktop client sends the code plus a randomly generated installation UUID to `/api/license/redeem`. The server looks up the code through a SHA-256-derived private key, applies the configured installation limit, and returns the full Ed25519-signed voucher. Only that long voucher is stored locally; the application verifies it offline on later launches. No hardware serial number is collected. Existing long `KF1.` vouchers remain valid.

Roll out this change in two phases: deploy the redeem endpoint while `KEYFLOAT_SHORT_CODES_ENABLED=false`, publish short-code-capable macOS and Windows installers, and only then set `KEYFLOAT_SHORT_CODES_ENABLED=true`. This prevents older installers from receiving codes they cannot redeem.

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
- The public macOS installer remains activation-gated by the signed voucher inside KeyFloat.
- Replace the ad-hoc signed installer with a Developer ID signed and notarized build before wider public distribution.
- Verify both installer checksums and public download links before every release.
