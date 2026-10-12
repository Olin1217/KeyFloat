# KeyFloat product audit — 2026-07-22

Scope: product behavior, content integrity, delivery, and operations. The current visual language and layout were treated as fixed.

## Decision summary

KeyFloat's core interaction is already coherent: a compact always-available window, explicit expand/collapse, categorized software selection, search, favorites, language modes, pinning, and background reopening. This iteration therefore avoids adding visible controls or changing layout. It closes data, discovery, asset, website, and purchase-flow gaps instead.

## Product checks and decisions

| # | Area | Finding | Decision / status |
|---|---|---|---|
| 1 | Platform promise | The website must represent both intended desktop platforms without implying that unfinished software is downloadable. | Fixed: macOS is marked available and Windows is clearly marked in development. |
| 2 | First-run language | Product requirement is English by default. | Existing behavior retained and website aligned. |
| 3 | Language isolation | Mixed-language interface content creates uncertainty. | Website now has complete English/Chinese dictionaries; app data validator requires bilingual fields. |
| 4 | Software discovery | 209 products are too many for an unstructured picker. | Existing 21 task-oriented categories retained. |
| 5 | Active-software context | Bundle identifiers existed but were unused. | Fixed: collapsed KeyFloat follows a recognized foreground app; expanded reading is never interrupted. |
| 6 | Search speed | Large libraries make repeated normalization expensive. | Existing prebuilt search documents and result cache retained. |
| 7 | Search quality | Exact key and title matches should outrank tag matches. | Existing weighted ranking retained and covered by the store smoke test. |
| 8 | Favorites | Users need a small personal subset without editing source data. | Existing local favorites retained; stale IDs are cleaned after a valid load. |
| 9 | Pin semantics | A pinned window must not drag. | Existing AppKit drag-zone gating retained. |
| 10 | Close semantics | Closing the window should not quit the utility. | Existing status-item and Dock reopen behavior retained. |
| 11 | Escape reliability | Escape must collapse repeatedly, not only once. | Existing local event monitor and incrementing request ID retained. |
| 12 | Search dismissal | Clicking outside search should return to browsing. | Existing native mouse monitor retained. |
| 13 | Multi-display placement | Saved coordinates can become invalid when displays change. | Existing display ID, visible-frame constraint, and screen-change correction retained. |
| 14 | Data availability | Most catalog entries previously had zero displayable shortcuts. | Fixed: all final software packs receive non-empty macOS data through a final curated overlay. |
| 15 | Data provenance | Official imports and model-curated defaults must not be represented as the same thing. | Fixed: `curated` is a separate internal status with explicit provenance coverage. It is displayable, not a pending state. |
| 16 | Version variability | Several products expose configurable keymaps or context-dependent commands. | Documented per batch; only default macOS bindings are included and configurable unassigned actions are not invented. |
| 17 | Windows contamination | Cross-platform tables can silently introduce Ctrl/Alt/Win labels. | Validator rejects Windows/Win/⊞ and generated batches also reject Ctrl/Alt spellings. |
| 18 | Duplicate shortcuts | Repeated IDs or identical actions degrade search and favorite identity. | Validators reject duplicate IDs and batch audits reject duplicate key/action pairs. |
| 19 | Icon authenticity | Letter marks reduce recognition; third-party logo sites add brand risk. | Fixed for 52 reviewed first-party SVGs; all other products keep the installed-app or letter fallback. |
| 20 | Asset ownership | Product logos and KeyFloat brand files were mixed in one asset catalog. | Fixed: software SVGs use a separate `SoftwareIcons` bundle directory and external source library. |
| 21 | Icon geometry | Source marks have different aspect ratios and clear-space rules. | Fixed: every icon uses one outer geometry, one corner ratio, and reviewed per-icon inset/background values. |
| 22 | Website conversion | The demo explained features but did not provide a secure purchase path. | Fixed: dual-platform presentation, ¥6 Alipay dialog, payment claim, signed voucher, contact path, FAQ, and responsive flow. |
| 23 | Download security | A public DMG link can be copied without payment. | Fixed in architecture: installer URLs are excluded from public code; verification must issue a short-lived link. |
| 24 | Static Alipay QR | A QR image alone cannot verify a payment or amount. | Supported for collection, with a required private verification webhook before delivery. |
| 25 | Payment configuration | No production QR or verification endpoint was supplied. | Launch configuration required; safe placeholders deliberately fail closed while the supplied developer contact details remain available. |
| 26 | App feedback delivery | Current in-app request and feedback forms persist locally but do not reach an operator. | Launch blocker recorded. Connect a real privacy-reviewed service before claiming remote delivery. |
| 27 | Signing and notarization | Unsigned builds create Gatekeeper friction. | Launch blocker: requires the owner's Apple Developer identity and notarization credentials. |
| 28 | Accessibility | Small utility controls must remain keyboard and assistive-technology reachable. | Existing accessibility labels and keyboard shortcuts retained; website adds landmarks, focus styles, dialog semantics, and reduced-motion support. |
| 29 | Privacy | Core lookup should not require an account or upload usage. | Existing local-first app behavior retained; website payment copy distinguishes purchase data from app usage. |
| 30 | Incomplete payment setup | A missing QR image could leave a functional-looking claim form and encourage invalid submissions. | Fixed: public `setup/live` gate, disabled pre-launch form, safe QR load fallback, and a separate server-only checkout kill switch. |
| 31 | License key drift | A website signing key rotation could silently make newly issued vouchers invalid in the macOS client. | Fixed: automated Ed25519 public-key consistency check across website metadata and native client source. |
| 32 | Regression control | Manual checks are too fragile for 209 products and multiple assets. | Fixed: one iteration script assembles data, validates shortcuts/icons/site, forces AppKit SVG rasterization, builds the native app, and runs packaged-store smoke tests. |
| 33 | Administrator persistence | A plain local administrator marker could be forged by editing application preferences. | Fixed: new administrator activations carry an HMAC integrity proof; unsigned legacy administrator records fail closed while signed vouchers remain compatible. |
| 34 | Contact disclosure | Permanently exposed contact details add visual noise and unnecessary disclosure. | Fixed: product and website reveal email on demand, omit WeChat, and set a one-business-day response expectation. |
| 35 | Language default migration | Existing local Chinese preferences could hide the intended English-first default after an upgrade. | Fixed: a one-time V2 migration resets both product and website to English, while later user language choices continue to persist. |

## Completion snapshot

- 209 macOS software packs; every final pack is non-empty and none is exposed as catalog-only.
- 8,432 bilingual shortcut rows after deterministic merge.
- 52 first-party SVG product marks in a software-only source library and an identical app bundle directory.
- 110 complete website localization keys, English-first with isolated Chinese mode.
- Debug and Release builds pass; the unsigned Release app is approximately 7.3 MB.

## Launch blockers requiring owner configuration

1. Add the real Alipay QR asset, then switch the public and server checkout launch controls from setup to live.
2. Connect `PAYMENT_CLAIM_WEBHOOK_URL` to a private service that validates transaction number, amount, duplication, and refund state.
3. Sign and notarize the macOS build, then store it outside the public website.
4. Connect the in-app feedback and software-request queues to a real endpoint, or change the UI copy to say that submissions are stored locally.

No additional visible feature is recommended before these operational gaps are resolved. Adding more controls now would increase complexity without improving the main shortcut-reference job.
