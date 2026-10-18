# FULSTONE public site V2
Static GitHub Pages at https://fulstone.tw/; main branch root publishing. No server, login, upload, database or runtime packages.

`npm test` checks browser engine, studio state, public policy and immutable runtime manifest. `node tools/preview.mjs` serves local preview on 127.0.0.1:8764.

`node tools/build-order.mjs <verified-business-os-root>` regenerates the browser engine from unchanged S20 engine and pure validation/CSV functions. TypeScript is loaded from that private repo development dependency; no private state or customer data is imported. `assets/order-provenance.json` records every source hash. `node tools/check-order-parity.mjs <verified-business-os-root>` compares every fixture/action, outputs and receipt hashes against original S20. Run `node tools/manifest.mjs` after asset changes.

Browser UAT: set PLAYWRIGHT_PACKAGE to an existing Playwright installation, then `node tools/browser-uat.mjs <base-url> <evidence-output-directory>`. Uses installed Edge, 1440/390px, full flows and zero external-write/request assertions. Evidence should remain outside this public repository.

Release: reviewed exact PR head -> merge main -> Pages build commit -> HTTP byte-hash match of every manifest entry -> Production browser UAT. Existing Pages legacy deployment has no deployment.contract.json; retain platform-native build record and receipt. No DNS/config changes.
Rollback: previous site commit 7a7b1f6b01943d70786d3604916b4996186ab0e1; publish a reviewed revert of this website merge only, then require Pages build + HTTP readback. Do not reset branches or touch Business OS/S18.
