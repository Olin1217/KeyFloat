# Alipay QR asset slot

No payment QR image is stored here yet.

Before launch, add the real collection QR image to this directory (for example `alipay-qr.png`), set `alipayQrImageUrl` in `site-config.js` to `/assets/payment/alipay-qr.png`, deploy the verifier with `KEYFLOAT_CHECKOUT_ENABLED=true`, and then change the public payment status from `setup` to `live`.

Never use a generated or placeholder QR image for real collection.
