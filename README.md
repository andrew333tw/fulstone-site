# FULSTONE public website V4

Static-first original working portfolio, published by the existing GitHub Pages legacy flow from `main` root to https://fulstone.tw/. No backend, login, database, uploads, analytics, customer data or paid rendering service.

## Product surfaces

- `/`: full-size live operations hero; three interactive portfolio modes; original motion film; services, cooperation, preserved prices/legal and contextual mailto.
- `/demos/order-check/`: original reconciliation engine and fixtures with manual-review gates and source/receipt evidence. Embedded mode starts only the synthetic run and never steals initial parent focus.
- `/demos/operations/`: 56 explicitly synthetic work items, date/status/type filters, clickable daily trend and distribution, work detail and human confirmation. One projection powers every metric/chart/list. Source-row units are distinct from work-item units. Empty completion is unknown, not zero success.
- `/demos/workflow/`: rule-based Simulation, no LLM/API. Real input validation, deterministic keyword classification, manual accept/exclude gate, failed-step repair, output and local history. No timers pretend that remote processing is happening.
- `/demos/studio-flow/`: original working studio demo retained.
- `/showcase-links/`: S21 Website Link Kit, including downloadable Markdown, only published public-domain URLs. Preparation does not authorize or send outreach.

Typography, palette, motion and responsive decisions are in DESIGN.md. The WORK reference URL returned 404 during read-only comparison; no WORK source, assets, data, wording or proprietary layout was imported. The original personal-service legal identity and commercial terms are pinned by tests. No client logo, revenue, savings or successful-case claims were invented.

## Verify locally

`npm test` covers original engine/state/policy/manifest and new projection/workflow safety. `node tools/preview.mjs` serves 127.0.0.1:8764. Set PLAYWRIGHT_PACKAGE to an existing Playwright package path when not installed in this repo; Windows uses installed Edge, Linux uses installed Chromium. Keep all screenshots and receipts outside this public repository.

```
node tools/check-order-parity.mjs <verified-business-os-source-root>
node tools/manifest.mjs
npm test
node tools/browser-uat.mjs http://127.0.0.1:8764 <original-evidence>
node tools/v3-browser-uat.mjs http://127.0.0.1:8764 <v3-regression-evidence>
node tools/v4-browser-uat.mjs http://127.0.0.1:8764 <v4-evidence>
node tools/performance-check.mjs http://127.0.0.1:8764 <performance-evidence>
```

For the optional developer audit set AXE_SOURCE to local axe-core 4.11.0/axe.min.js and run `node tools/a11y-uat.mjs <base> <evidence>`. It checks 16 surface/viewport combinations at 1440/390; it is never bundled into the site. Tests preserve both original demos, failed/empty recovery, keyboard/focus, no overflow and zero external requests/writes.

`tools/build-order.mjs <verified-business-os-root>` and `tools/check-order-parity.mjs` retain the original S20 parity path and provenance contract. V4 does not regenerate or change the original engine. The full-source Business OS is read only for parity, never deployed with this public site.

## Continuous original motion film

`tools/render-video.mjs <local-base> <external-evidence-directory>` records actual browser interactions in a same-origin live frame, with original camera/caption choreography. This replaces V3 screenshot slides. The film shows reconciliation, linked dashboard filtering, validation failure/repair, manual review, actual simulated output and contact. Local Playwright plus imageio-ffmpeg 0.6.0/FFmpeg 7.1 render a 40-second silent 1280x720 H264 MP4; FFMPEG_PATH may select an existing compatible executable. Poster, six VTT cues, share image and HTML transcript accompany the opt-in `preload=none` video. Re-run manifest and tests after rendering.

## Exact-candidate release and public customer access

Reviewed exact PR head -> pass existing CI -> merge main -> native Pages build commit -> HTTP byte-hash match of **every** manifest entry and published manifest -> Production original/V3/V4 browser UAT and accessibility.

```
node tools/verify-production.mjs <exact-merged-SHA> <external-evidence>
node tools/public-access.mjs <external-evidence>
gh workflow run public-access.yml --ref main -f expected_commit=<exact-merged-SHA>
```

The manually dispatched `Independent public customer access` workflow uses a fresh GitHub-hosted Ubuntu runner and fresh unauthenticated Chromium contexts for desktop/mobile against the hardcoded public FULSTONE domain. It checks exact deployment/assets, public DNS/TLS/HTTP, all demos, media, contact links and no writes, and uploads screenshots/JSON evidence for 30 days. The job token is read-only GitHub metadata access and is never sent to fulstone.tw. The website does not depend on HOME or on this workflow remaining online.

The unchanged S18 URL `https://fulstone.tw/` remains the canonical public entry; it resolves to the latest site without resending any mail. Public URL access does not establish email delivery or email opens. S18 historical receipts and S21 business approval state stay unchanged.

V4 rollback baseline: `ee89ce1135c4fcb5ebfed95e2e1562f8ccc243f8`. Revert only this release merge through a reviewed candidate, then repeat Pages, manifest, HTTP and browser acceptance. Never reset main or touch Business OS/S18. No DNS or account changes are part of the release.
