# FULSTONE public site V3
Static GitHub Pages at https://fulstone.tw/; main branch root publishing. No server, login, upload, database or runtime packages.

`npm test` checks browser engine, studio state, public policy and immutable runtime manifest. `node tools/preview.mjs` serves local preview on 127.0.0.1:8764.

`node tools/build-order.mjs <verified-business-os-root>` regenerates the browser engine from unchanged S20 engine and pure validation/CSV functions. TypeScript is loaded from that private repo development dependency; no private state or customer data is imported. `assets/order-provenance.json` records every source hash. `node tools/check-order-parity.mjs <verified-business-os-root>` compares every fixture/action, outputs and receipt hashes against original S20. Run `node tools/manifest.mjs` after asset changes.

Browser UAT: set PLAYWRIGHT_PACKAGE to an existing Playwright installation, then `node tools/browser-uat.mjs <base-url> <evidence-output-directory>`. Uses installed Edge, 1440/390px, full flows and zero external-write/request assertions. Evidence should remain outside this public repository.

Release: reviewed exact PR head -> merge main -> Pages build commit -> HTTP byte-hash match of every manifest entry -> Production browser UAT. Existing Pages legacy deployment has no deployment.contract.json; retain platform-native build record and receipt. No DNS/config changes.
Rollback: previous site commit 7a7b1f6b01943d70786d3604916b4996186ab0e1; publish a reviewed revert of this website merge only, then require Pages build + HTTP readback. Do not reset branches or touch Business OS/S18.

## V3 conversion and demonstration

The homepage leads with repetitive reconciliation, the deliverable and a direct inquiry. The original three service categories, studio demo, pricing and legal copy remain. Inquiry links only open the user's mail client with three prompts; the site submits nothing.

`assets/order-dashboard.mjs` projects the unchanged engine's actual run. Input rows and exception items are explicitly different units. Category bars, global counters and the review list use the same exceptions. Status/type filters only hide list items; all unfinished decisions still gate completion. Source previews collapse after execution and remain available on demand. Decisions and output receipts still belong to the original engine.

### Original film (40 seconds, silent, 1280×720)

The video is a six-scene composition of actual FULSTONE synthetic-demo screenshots with focus, captions and fade transitions; it is not a real customer case or a continuous live recording. Scene durations: 6 + 6 + 8 + 8 + 8 + 4 seconds. No audio or autoplay. `preload="none"`, a poster, optional WebVTT captions and an HTML transcript provide fallbacks. All screen content comes from this repository.

To regenerate, use an installed Playwright package with Edge and local Python packages Pillow and imageio-ffmpeg (0.6.0 includes FFmpeg 7.1). No rendering service is used. `FFMPEG_PATH` can select an existing compatible executable instead. Rendering output/evidence must stay outside the public repo.

```powershell
# Set PLAYWRIGHT_PACKAGE to the absolute installed Playwright package path.
node tools/preview.mjs
# In another shell, with the same environment:
node tools/render-video.mjs http://127.0.0.1:8764 <outside-repo-evidence-directory>
python tools/create-favicon.py
node tools/manifest.mjs
npm test
node tools/browser-uat.mjs http://127.0.0.1:8764 <outside-repo-original-UAT-directory>
node tools/v3-browser-uat.mjs http://127.0.0.1:8764 <outside-repo-V3-UAT-directory>
# Optional developer audit with local axe-core 4.11.0; never bundled into the website:
# Set AXE_SOURCE to the absolute axe-core/axe.min.js path.
node tools/a11y-uat.mjs http://127.0.0.1:8764 <outside-repo-a11y-directory>
# After Pages reports the exact merged SHA as built:
node tools/verify-production.mjs <exact-merged-commit> <outside-repo-production-directory>
```

V3 UAT covers 1440/390px, actual playback/duration/seek/captions, no video download before play, mailto prompts, dashboard/filter/decision consistency, keyboard, failure/reset/reload and no external requests/writes. Keep the original UAT for both demo regressions. Invariants pin original engine, studio runtime, pricing and legal copy to V2 normalized UTF-8 hashes; tests do not require Git history in CI.

V3 rollback baseline: `b95112dcf82e2ee1d7a38ced566b641722358ca5`. If this release fails, revert only its reviewed merge using a new reviewed candidate, then repeat Pages/HTTP/browser verification. The earlier rollback reference above belongs to V2 history.
