// GENERATED from unchanged S20; regenerate with tools/build-order.mjs.
const fixtureFiles = { "/sales-demo/fixtures/broken-headers/manifest.json": "{\n  \"id\": \"broken-headers\",\n  \"title\": \"來源缺少必要欄位\",\n  \"story\": \"來源 A 這次匯出沒有金額欄。整理應停止，不能把缺欄位的表當成已完成。\",\n  \"sourceA\": { \"filename\": \"source-a.csv\", \"label\": \"來源 A・內部訂單表\" },\n  \"sourceB\": { \"filename\": \"source-b.csv\", \"label\": \"來源 B・官網訂單表\" }\n}\n", "/sales-demo/fixtures/broken-headers/source-a.csv": "訂單編號,品號,數量,客戶,訂單日期\nSO-2601,SKU-TEA-01,1,示範門市甲,2026-10-01\n", "/sales-demo/fixtures/broken-headers/source-b.csv": "Order No,Product Code,Quantity,Total,Buyer,Order Date\nSO-2601,SKU-TEA-01,1,300,示範門市甲,2026-10-01\n", "/sales-demo/fixtures/weekly-exceptions/manifest.json": "{\n  \"id\": \"weekly-exceptions\",\n  \"title\": \"有缺漏、衝突與無法整理的列\",\n  \"story\": \"同一週的另一份虛構匯出。金額對不上、有一邊缺單、同一來源出現兩種數量，也有寫錯的欄位。\",\n  \"sourceA\": { \"filename\": \"source-a.csv\", \"label\": \"來源 A・內部訂單表\" },\n  \"sourceB\": { \"filename\": \"source-b.csv\", \"label\": \"來源 B・官網訂單表\" }\n}\n", "/sales-demo/fixtures/weekly-exceptions/source-a.csv": "訂單編號,品號,數量,金額,客戶,訂單日期\nSO-2501,SKU-TEA-01,10,3000,示範門市甲,2026-10-13\nSO-2502,SKU-CUP-02,2,440,示範門市乙,2026-10-13\nSO-2503,SKU-BOX-03,8,2000,示範門市丙,2026-10-13\nSO-2504,SKU-TEA-01,很多,900,示範門市甲,2026-10-14\nSO-2505,SKU-CUP-02,1,220,示範門市乙,2026-10-14\n,SKU-BOX-03,3,750,示範門市丙,2026-10-14\n", "/sales-demo/fixtures/weekly-exceptions/source-b.csv": "Order No,Product Code,Quantity,Total,Buyer,Order Date\nSO-2501,SKU-TEA-01,10,2800,示範門市甲,2026-10-13\nSO-2503,SKU-BOX-03,8,2000,示範門市丙,2026-10-13\nSO-2505,SKU-CUP-02,1,220,示範門市乙,2026-10-14\nSO-2505,SKU-CUP-02,3,660,示範門市乙,2026-10-14\nSO-2506,SKU-TEA-01,5,1500,示範門市丁,2026-10-14\n", "/sales-demo/fixtures/weekly-matched/manifest.json": "{\n  \"id\": \"weekly-matched\",\n  \"title\": \"每週訂單大致相符\",\n  \"story\": \"虛構的澄禾生活選物要把內部訂單表和官網訂單表合成一份。編號寫法不同，來源 A 還把同一筆匯出了兩次。\",\n  \"sourceA\": { \"filename\": \"source-a.csv\", \"label\": \"來源 A・內部訂單表\" },\n  \"sourceB\": { \"filename\": \"source-b.csv\", \"label\": \"來源 B・官網訂單表\" }\n}\n", "/sales-demo/fixtures/weekly-matched/source-a.csv": "訂單編號,品號,數量,金額,客戶,訂單日期\nSO-2401,SKU-TEA-01,12,3600,示範門市甲,2026-10-06\nSO-2402,SKU-CUP-02,4,880,示範門市乙,2026-10-06\nSO-2403,SKU-BOX-03,20,5000,示範門市丙,2026-10-07\nSO-2403,SKU-BOX-03,20,5000,示範門市丙,2026-10-07\nSO-2404,SKU-TEA-01,6,1800,示範門市甲,2026-10-08\n", "/sales-demo/fixtures/weekly-matched/source-b.csv": "Order No,Product Code,Quantity,Total,Buyer,Order Date\nso 2401,sku-tea-01,12,3600,示範門市甲,2026-10-06\nSO-2402,SKU-CUP-02,4,880,示範門市乙,2026-10-06\nSO-2403,SKU-BOX-03,20,5000,示範門市丙,2026-10-07\nSO-2404,SKU-TEA-01,6,1800,示範門市甲,2026-10-08\n" };
const path = { dirname: () => '/sales-demo', join: (...x) => x.join('/') };
const fileURLToPath = () => '/sales-demo/engine.ts';
const readFileSync = (p) => { if (!(p in fixtureFiles))
    throw new DemoError('NOT_FOUND', '找不到這組示範資料'); return fixtureFiles[p]; };
const readdirSync = () => [...new Set(Object.keys(fixtureFiles).map(p => p.split('/')[3]))].map(name => ({ name, isDirectory: () => true }));
const newId = prefix => prefix + '_' + crypto.randomUUID();
// Synchronous SHA-256 for unchanged S20 receipt contract. Covered by Node hash parity tests.
function sha256(input) {
    const bytes = new TextEncoder().encode(input);
    const len = bytes.length;
    const data = new Uint8Array(Math.ceil((len + 9) / 64) * 64);
    data.set(bytes);
    data[len] = 128;
    const v = new DataView(data.buffer);
    v.setUint32(data.length - 4, len * 8);
    v.setUint32(data.length - 8, Math.floor(len / 536870912));
    const k = [0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070, 0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2];
    const h = [0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19];
    const r = (x, n) => (x >>> n) | (x << (32 - n));
    for (let off = 0; off < data.length; off += 64) {
        const w = new Uint32Array(64);
        for (let i = 0; i < 16; i++)
            w[i] = v.getUint32(off + i * 4);
        for (let i = 16; i < 64; i++) {
            const a = w[i - 15], b = w[i - 2];
            w[i] = (w[i - 16] + (r(a, 7) ^ r(a, 18) ^ (a >>> 3)) + w[i - 7] + (r(b, 17) ^ r(b, 19) ^ (b >>> 10))) >>> 0;
        }
        let [a, b, c, d, e, f, g, z] = h;
        for (let i = 0; i < 64; i++) {
            const t = (z + (r(e, 6) ^ r(e, 11) ^ r(e, 25)) + ((e & f) ^ (~e & g)) + k[i] + w[i]) >>> 0;
            const u = ((r(a, 2) ^ r(a, 13) ^ r(a, 22)) + ((a & b) ^ (a & c) ^ (b & c))) >>> 0;
            z = g;
            g = f;
            f = e;
            e = (d + t) >>> 0;
            d = c;
            c = b;
            b = a;
            a = (t + u) >>> 0;
        }
        for (const [i, x] of [a, b, c, d, e, f, g, z].entries())
            h[i] = (h[i] + x) >>> 0;
    }
    return h.map(x => x.toString(16).padStart(8, '0')).join('');
}
export { sha256 };
const RETRYABLE = new Set(["RATE_LIMITED", "SERVER", "UNAVAILABLE", "TIMEOUT", "MALFORMED_RESPONSE"]);
export class DeliveryError extends Error {
    kind;
    retryable;
    retryAfterMs;
    status;
    detail;
    constructor(kind, message, opts = {}) {
        super(`${kind}: ${message}`);
        this.name = "DeliveryError";
        this.kind = kind;
        this.status = opts.status;
        this.retryAfterMs = opts.retryAfterMs;
        this.detail = opts.detail;
        this.retryable = opts.retryable ?? RETRYABLE.has(kind);
    }
}
export function kindForStatus(status) {
    if (status === 401)
        return "AUTH_EXPIRED";
    if (status === 403)
        return "FORBIDDEN";
    if (status === 404)
        return "NOT_FOUND";
    if (status === 409 || status === 412)
        return "CONFLICT";
    if (status === 429)
        return "RATE_LIMITED";
    if (status === 503)
        return "UNAVAILABLE";
    if (status >= 500)
        return "SERVER";
    return "VALIDATION";
}
export function asDeliveryError(e) {
    if (e instanceof DeliveryError)
        return e;
    const err = e;
    if (err?.name === "AbortError" || err?.name === "TimeoutError")
        return new DeliveryError("TIMEOUT", err.message ?? "timeout");
    if (err?.code === "ECONNREFUSED" || err?.code === "ECONNRESET" || /fetch failed/i.test(err?.message ?? ""))
        return new DeliveryError("UNAVAILABLE", err.message ?? "connection failed");
    return new DeliveryError("SERVER", err?.message ?? String(e), { retryable: false });
}
/** RFC 4180 CSV parser (quotes, escaped quotes, CRLF, BOM). */
export function parseCsv(input) {
    const text = input.replace(/^﻿/, "");
    const out = [];
    let row = [];
    let cell = "";
    let q = false;
    for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        if (q) {
            if (ch === '"' && text[i + 1] === '"') {
                cell += '"';
                i++;
            }
            else if (ch === '"')
                q = false;
            else
                cell += ch;
            continue;
        }
        if (ch === '"')
            q = true;
        else if (ch === ",") {
            row.push(cell);
            cell = "";
        }
        else if (ch === "\n" || ch === "\r") {
            if (ch === "\r" && text[i + 1] === "\n")
                i++;
            row.push(cell);
            cell = "";
            if (row.some((c) => c !== ""))
                out.push(row);
            row = [];
        }
        else
            cell += ch;
    }
    if (q)
        throw new DeliveryError("MALFORMED_RESPONSE", "CSV has an unterminated quoted field", { retryable: false });
    row.push(cell);
    if (row.some((c) => c !== ""))
        out.push(row);
    if (!out.length)
        return { headers: [], rows: [] };
    return { headers: out[0].map((h) => h.trim()), rows: out.slice(1) };
}
export function toCsv(t) {
    const esc = (s) => (/[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s);
    return [t.headers, ...t.rows].map((r) => r.map((c) => esc(String(c ?? ""))).join(",")).join("\n") + "\n";
}
/**
 * Map incoming headers to the expected schema. A missing required column (rename, deletion) is
 * SCHEMA_DRIFT and stops the run before anything is written: wrong data is worse than no data.
 */
export function mapHeaders(headers, spec) {
    const norm = (s) => s.trim().toLowerCase().replace(/[\s_-]+/g, "");
    const idx = {};
    const missing = [];
    for (const f of spec) {
        const names = [f.name, ...(f.aliases ?? [])].map(norm);
        const i = headers.findIndex((h) => names.includes(norm(h)));
        if (i >= 0)
            idx[f.name] = i;
        else if (f.required)
            missing.push(f.name);
    }
    if (missing.length) {
        throw new DeliveryError("SCHEMA_DRIFT", `required column(s) missing: ${missing.join(", ")}; got [${headers.join(", ")}]`, { retryable: false, detail: { missing, headers } });
    }
    return idx;
}
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export function validateRecord(rec, spec, row) {
    const issues = [];
    for (const f of spec) {
        const v = rec[f.name];
        const empty = v === undefined || v === null || String(v).trim() === "";
        if (empty) {
            if (f.required)
                issues.push({ row, field: f.name, problem: "missing" });
            continue;
        }
        if (f.type === "number" && !Number.isFinite(Number(String(v).replace(/,/g, ""))))
            issues.push({ row, field: f.name, problem: `not a number: ${v}` });
        if (f.type === "email" && !EMAIL.test(String(v).trim()))
            issues.push({ row, field: f.name, problem: "invalid email" });
        if (f.type === "date" && Number.isNaN(Date.parse(String(v))))
            issues.push({ row, field: f.name, problem: `invalid date: ${v}` });
    }
    return issues;
}
/** Deterministic JSON (sorted keys) so receipts hash identically across runs/engines. */
export function canonicalJson(value) {
    return JSON.stringify(sortKeys(value));
}
function sortKeys(value) {
    if (Array.isArray(value))
        return value.map(sortKeys);
    if (value && typeof value === "object" && !(value instanceof Date)) {
        const out = {};
        for (const k of Object.keys(value).sort()) {
            out[k] = sortKeys(value[k]);
        }
        return out;
    }
    return value;
}
/**
 * Sales-demo adapter. Parsing, header mapping and field checks are the existing
 * delivery-kit / tabular path. Natural keys follow the reconciliation lab:
 * trim, uppercase, drop spaces and dashes, then match. Nothing here is a
 * precomputed result file.
 */
export const DEMO_FIELDS = [
    { name: "order_id", required: true, aliases: ["訂單編號", "order no", "order number"] },
    { name: "order_time", required: true, type: "date", aliases: ["日期", "訂單時間", "訂單日期", "date", "order date"] },
    { name: "sku", required: true, aliases: ["品號", "item", "product code"] },
    { name: "qty", required: true, type: "number", aliases: ["數量", "quantity"] },
    { name: "amount", required: true, type: "number", aliases: ["金額", "total"] },
    { name: "customer", required: false, aliases: ["客戶", "buyer", "customer name"] },
];
export class DemoError extends Error {
    code;
    constructor(code, message) {
        super(message);
        this.name = "DemoError";
        this.code = code;
    }
}
function audienceError(kind) {
    if (kind === "SCHEMA_DRIFT")
        return { kind, message: "這份檔案缺少必要欄位，所以不能開始整理。" };
    if (kind === "MALFORMED_RESPONSE")
        return { kind, message: "這份檔案格式不完整，所以不能開始整理。" };
    return { kind, message: "這份檔案現在不能整理。" };
}
const root = path.dirname(fileURLToPath(import.meta.url));
const fixtureRoot = path.join(root, "fixtures");
const FIXTURE_ID = /^[a-z0-9-]+$/;
const normKeyPart = (s) => s.trim().toUpperCase().replace(/[\s-]+/g, "");
export function naturalKey(orderId, sku) {
    return `${normKeyPart(orderId)}|${normKeyPart(sku)}`;
}
const num = (v) => Number(String(v).replace(/,/g, ""));
const sameValues = (a, b) => num(a.qty) === num(b.qty) && num(a.amount) === num(b.amount) && a.customer.trim() === b.customer.trim() && a.order_time.trim() === b.order_time.trim();
function diffFields(a, b) {
    const fields = [];
    if (num(a.qty) !== num(b.qty))
        fields.push("qty");
    if (num(a.amount) !== num(b.amount))
        fields.push("amount");
    if (a.customer.trim() !== b.customer.trim())
        fields.push("customer");
    if (a.order_time.trim() !== b.order_time.trim())
        fields.push("order_time");
    return fields;
}
function view(row) {
    return { source: row.source, line: row.line, order_id: row.order_id, sku: row.sku, qty: row.qty, amount: row.amount, customer: row.customer, order_time: row.order_time, issues: row.issues.map((x) => `${x.field}: ${x.problem}`) };
}
function asResult(row, outcome, adopted) {
    return { order_id: row.order_id, sku: row.sku, qty: String(num(row.qty)), amount: String(num(row.amount)), customer: row.customer, order_time: row.order_time, outcome, adopted_source: adopted };
}
export function listFixtures() {
    return readdirSync(fixtureRoot, { withFileTypes: true })
        .filter((d) => d.isDirectory() && FIXTURE_ID.test(d.name))
        .map((d) => readManifest(d.name))
        .sort((a, b) => a.id.localeCompare(b.id))
        .map(({ id, title, story }) => ({ id, title, story }));
}
function readManifest(id) {
    if (!FIXTURE_ID.test(id))
        throw new DemoError("NOT_FOUND", "找不到這組示範資料");
    const file = path.join(fixtureRoot, id, "manifest.json");
    const manifest = JSON.parse(readFileSync(file, "utf8"));
    if (manifest.id !== id)
        throw new DemoError("NOT_FOUND", "示範資料編號不一致");
    return manifest;
}
function readFixtureCsv(id, filename) {
    if (!/^source-[ab]\.csv$/.test(filename))
        throw new DemoError("NOT_FOUND", "示範檔名不正確");
    return readFileSync(path.join(fixtureRoot, id, filename), "utf8");
}
export function loadFixture(id) {
    const manifest = readManifest(id);
    return { manifest, sourceA: readFixtureCsv(id, manifest.sourceA.filename), sourceB: readFixtureCsv(id, manifest.sourceB.filename) };
}
function previewSource(id, label, filename, csv) {
    const base = { id, label, filename, headers: [], rowCount: 0, mapping: [], sampleRows: [], schemaError: null, parseError: null };
    let table;
    try {
        table = parseCsv(csv);
    }
    catch (e) {
        const err = e instanceof DeliveryError ? e : new DeliveryError("MALFORMED_RESPONSE", e.message);
        base.parseError = audienceError(err.kind);
        return { preview: base, rows: [] };
    }
    base.headers = table.headers;
    base.rowCount = table.rows.length;
    base.sampleRows = table.rows.slice(0, 6);
    let idx;
    try {
        idx = mapHeaders(table.headers, DEMO_FIELDS);
    }
    catch (e) {
        const err = e instanceof DeliveryError ? e : new DeliveryError("SCHEMA_DRIFT", e.message);
        base.schemaError = audienceError(err.kind);
        return { preview: base, rows: [] };
    }
    base.mapping = DEMO_FIELDS.map((f) => ({ field: f.name, header: table.headers[idx[f.name]] ?? null }));
    const rows = table.rows.map((raw, i) => {
        const rec = Object.fromEntries(DEMO_FIELDS.map((f) => [f.name, (raw[idx[f.name]] ?? "").trim()]));
        const issues = validateRecord(rec, DEMO_FIELDS, i + 2);
        const key = rec.order_id && rec.sku && !issues.some((x) => x.field === "order_id" || x.field === "sku") ? naturalKey(rec.order_id, rec.sku) : null;
        return { source: id, line: i + 2, order_id: rec.order_id, sku: rec.sku, qty: rec.qty, amount: rec.amount, customer: rec.customer, order_time: rec.order_time, issues, key };
    });
    return { preview: base, rows };
}
function groupRows(rows) {
    const map = new Map();
    for (const row of rows) {
        if (row.issues.length || !row.key)
            continue;
        const g = map.get(row.key);
        if (!g)
            map.set(row.key, { first: row, extras: [], conflict: false });
        else if (!g.conflict && sameValues(g.first, row))
            g.extras.push(row);
        else {
            g.conflict = true;
            g.extras.push(row);
        }
    }
    return map;
}
function analyze(rowsA, rowsB) {
    const groupsA = groupRows(rowsA);
    const groupsB = groupRows(rowsB);
    const exceptions = [];
    const matches = [];
    for (const row of [...rowsA, ...rowsB]) {
        if (!row.issues.length)
            continue;
        exceptions.push({
            id: `field-${row.source}-${row.line}`,
            kind: "FIELD_ERROR",
            key: row.key,
            suggestion: "這列欄位不完整或格式不對，不能放進總表。",
            suggested_action: "EXCLUDE",
            allowed_actions: ["ACCEPT_SUGGESTION", "EXCLUDE"],
            fields: row.issues.map((x) => x.field),
            sources: [view(row)],
            decision: null,
        });
    }
    for (const [key, g] of groupsA) {
        if (g.conflict)
            continue;
        for (const extra of g.extras) {
            exceptions.push({
                id: `duplicate-${extra.source}-${extra.line}`,
                kind: "DUPLICATE",
                key,
                suggestion: "與同一來源的第一筆內容相同。建議留下第一筆，略過這筆重複匯出。",
                suggested_action: "ACCEPT_SUGGESTION",
                allowed_actions: ["ACCEPT_SUGGESTION", "EXCLUDE"],
                fields: [],
                sources: [view(g.first), view(extra)],
                decision: null,
            });
        }
    }
    for (const [key, g] of groupsB) {
        if (g.conflict)
            continue;
        for (const extra of g.extras) {
            exceptions.push({
                id: `duplicate-${extra.source}-${extra.line}`,
                kind: "DUPLICATE",
                key,
                suggestion: "與同一來源的第一筆內容相同。建議留下第一筆，略過這筆重複匯出。",
                suggested_action: "ACCEPT_SUGGESTION",
                allowed_actions: ["ACCEPT_SUGGESTION", "EXCLUDE"],
                fields: [],
                sources: [view(g.first), view(extra)],
                decision: null,
            });
        }
    }
    const keys = [...new Set([...groupsA.keys(), ...groupsB.keys()])].sort();
    for (const key of keys) {
        const ga = groupsA.get(key);
        const gb = groupsB.get(key);
        if (ga?.conflict || gb?.conflict) {
            const aOk = !!ga && !ga.conflict;
            const bOk = !!gb && !gb.conflict;
            const suggested = aOk ? "KEEP_A" : bOk ? "KEEP_B" : "EXCLUDE";
            const allowed = ["ACCEPT_SUGGESTION", "EXCLUDE"];
            if (aOk)
                allowed.splice(1, 0, "KEEP_A");
            if (bOk)
                allowed.splice(1, 0, "KEEP_B");
            const sources = [...(ga ? [ga.first, ...ga.extras] : []), ...(gb ? [gb.first, ...gb.extras] : [])].map(view);
            exceptions.push({
                id: `source-conflict-${key}`,
                kind: "SOURCE_CONFLICT",
                key,
                suggestion: aOk ? "來源 B 同一筆有兩種內容。建議採用來源 A。" : bOk ? "來源 A 同一筆有兩種內容。建議採用來源 B。" : "兩邊都有互相矛盾的內容。建議先排除，不要猜。",
                suggested_action: suggested,
                allowed_actions: allowed,
                fields: [],
                sources,
                decision: null,
            });
            continue;
        }
        if (ga && gb) {
            const fields = diffFields(ga.first, gb.first);
            if (!fields.length)
                matches.push({ key, a: ga.first, b: gb.first });
            else
                exceptions.push({
                    id: `value-conflict-${key}`,
                    kind: "VALUE_CONFLICT",
                    key,
                    suggestion: "兩邊都有這一筆，但數量、金額、客戶或日期不一致。示範建議先採用來源 A。",
                    suggested_action: "KEEP_A",
                    allowed_actions: ["ACCEPT_SUGGESTION", "KEEP_A", "KEEP_B", "EXCLUDE"],
                    fields,
                    sources: [view(ga.first), view(gb.first)],
                    decision: null,
                });
            continue;
        }
        const present = ga ? "A" : "B";
        const row = (ga ?? gb).first;
        exceptions.push({
            id: `missing-${key}-${present}`,
            kind: "MISSING",
            key,
            suggestion: present === "A" ? "只有來源 A 有這一筆。建議保留，並標成單邊資料。" : "只有來源 B 有這一筆。建議保留，並標成單邊資料。",
            suggested_action: present === "A" ? "KEEP_A" : "KEEP_B",
            allowed_actions: present === "A" ? ["ACCEPT_SUGGESTION", "KEEP_A", "EXCLUDE"] : ["ACCEPT_SUGGESTION", "KEEP_B", "EXCLUDE"],
            fields: [],
            sources: [view(row)],
            decision: null,
        });
    }
    exceptions.sort((a, b) => a.id.localeCompare(b.id));
    return { exceptions, matches, groupsA, groupsB };
}
function materialize(run) {
    const working = run.working;
    const exceptions = run.exceptions;
    const rows = [];
    if (working && run.status !== "FAILED") {
        for (const match of working.matches)
            rows.push(asResult(match.a, "已相符", "來源 A＋B"));
        for (const ex of exceptions) {
            if (!ex.decision)
                continue;
            const action = ex.decision === "ACCEPT_SUGGESTION" ? ex.suggested_action : ex.decision;
            if (action === "EXCLUDE" || action === "ACCEPT_SUGGESTION")
                continue;
            const group = action === "KEEP_A" ? working.groupsA.get(ex.key ?? "") : working.groupsB.get(ex.key ?? "");
            if (!group || group.conflict)
                continue;
            const label = action === "KEEP_A" ? "來源 A" : "來源 B";
            rows.push(asResult(group.first, ex.kind === "MISSING" ? "單邊保留" : "人工採用", label));
        }
    }
    rows.sort((a, b) => `${a.order_id}|${a.sku}|${a.adopted_source}`.localeCompare(`${b.order_id}|${b.sku}|${b.adopted_source}`));
    const counts = {
        duplicates: exceptions.filter((e) => e.kind === "DUPLICATE").length,
        conflicts: exceptions.filter((e) => e.kind === "VALUE_CONFLICT" || e.kind === "SOURCE_CONFLICT").length,
        missing: exceptions.filter((e) => e.kind === "MISSING").length,
        field_errors: exceptions.filter((e) => e.kind === "FIELD_ERROR").length,
    };
    const failed = run.status === "FAILED" || !working;
    const summary = {
        records_in: failed ? null : working.rowsA.length + working.rowsB.length,
        records_matched: failed ? null : working.matches.length,
        duplicates: failed ? null : counts.duplicates,
        conflicts: failed ? null : counts.conflicts,
        missing: failed ? null : counts.missing,
        field_errors: failed ? null : counts.field_errors,
        needs_review: failed ? null : exceptions.length,
        pending: failed ? null : exceptions.filter((e) => !e.decision).length,
        manual_decisions: exceptions.filter((e) => e.decision).length,
    };
    const result_csv = toCsv({
        headers: ["訂單編號", "品號", "數量", "金額", "客戶", "訂單日期", "結果", "採用來源"],
        rows: rows.map((r) => [r.order_id, r.sku, r.qty, r.amount, r.customer, r.order_time, r.outcome, r.adopted_source]),
    });
    const exceptions_json = canonicalJson(exceptions.map(({ decision, ...rest }) => ({ ...rest, decision })));
    const summary_json = canonicalJson({ fixture_id: run.fixture_id, status: run.status, ...summary });
    const business_fingerprint = sha256(canonicalJson({
        fixture_id: run.fixture_id,
        status: run.status === "FAILED" ? "FAILED" : "PROCESSED",
        decisions: exceptions.map((e) => [e.id, e.decision]),
        result_csv,
        summary,
    }));
    return {
        result_rows: rows,
        summary,
        artifacts: { result_csv, exceptions_json, summary_json },
        business_fingerprint,
    };
}
function withArtifacts(run) {
    const built = materialize(run);
    const receipt = {
        ...run.receipt,
        records_in: built.summary.records_in,
        records_matched: built.summary.records_matched,
        duplicates: built.summary.duplicates,
        conflicts: built.summary.conflicts,
        manual_decisions: built.summary.manual_decisions,
        output_hashes: {
            result_csv: sha256(built.artifacts.result_csv),
            exceptions_json: sha256(built.artifacts.exceptions_json),
            summary_json: sha256(built.artifacts.summary_json),
        },
        final_status: run.status,
        synthetic: true,
        external_writes: 0,
    };
    return { ...run, ...built, receipt };
}
export function buildRunFromCsv(input) {
    const a = previewSource("A", input.labelA ?? "來源 A", input.filenameA ?? "source-a.csv", input.sourceA);
    const b = previewSource("B", input.labelB ?? "來源 B", input.filenameB ?? "source-b.csv", input.sourceB);
    const failure = a.preview.parseError ?? b.preview.parseError ?? a.preview.schemaError ?? b.preview.schemaError;
    const base = {
        run_id: input.runId ?? newId("run"),
        fixture_id: input.fixtureId,
        fixture_title: input.title ?? input.fixtureId,
        status: failure ? "FAILED" : "AWAITING_REVIEW",
        error: failure,
        sources: [a.preview, b.preview],
        summary: { records_in: null, records_matched: null, duplicates: null, conflicts: null, missing: null, field_errors: null, needs_review: null, pending: null, manual_decisions: 0 },
        exceptions: [],
        result_rows: [],
        artifacts: { result_csv: "", exceptions_json: "", summary_json: "" },
        receipt: {
            run_id: input.runId ?? "",
            fixture_id: input.fixtureId,
            input_hashes: { source_a: sha256(input.sourceA), source_b: sha256(input.sourceB) },
            execution_timestamp: input.now ?? new Date().toISOString(),
            records_in: null,
            records_matched: null,
            duplicates: null,
            conflicts: null,
            manual_decisions: 0,
            output_hashes: { result_csv: "", exceptions_json: "", summary_json: "" },
            final_status: failure ? "FAILED" : "AWAITING_REVIEW",
            synthetic: true,
            external_writes: 0,
        },
        business_fingerprint: "",
        working: null,
    };
    base.receipt.run_id = base.run_id;
    if (!failure) {
        const found = analyze(a.rows, b.rows);
        base.exceptions = found.exceptions;
        base.working = { rowsA: a.rows, rowsB: b.rows, groupsA: found.groupsA, groupsB: found.groupsB, matches: found.matches };
    }
    return withArtifacts(base);
}
export function previewFixture(id) {
    const loaded = loadFixture(id);
    const a = previewSource("A", loaded.manifest.sourceA.label, loaded.manifest.sourceA.filename, loaded.sourceA);
    const b = previewSource("B", loaded.manifest.sourceB.label, loaded.manifest.sourceB.filename, loaded.sourceB);
    return { id: loaded.manifest.id, title: loaded.manifest.title, story: loaded.manifest.story, sources: [a.preview, b.preview] };
}
export function publicRun(run) {
    const copy = { ...run };
    delete copy.working;
    return copy;
}
export class DemoStore {
    runs = new Map();
    execute(fixtureId, opts = {}) {
        const loaded = loadFixture(fixtureId);
        const run = buildRunFromCsv({
            fixtureId,
            title: loaded.manifest.title,
            sourceA: loaded.sourceA,
            sourceB: loaded.sourceB,
            labelA: loaded.manifest.sourceA.label,
            labelB: loaded.manifest.sourceB.label,
            filenameA: loaded.manifest.sourceA.filename,
            filenameB: loaded.manifest.sourceB.filename,
        });
        if (opts.failBeforeCommit)
            throw new DemoError("INJECTED_FAILURE", "示範用的中途失敗：結果尚未寫入");
        this.runs.set(run.run_id, run);
        return run;
    }
    get(runId) {
        const run = this.runs.get(runId);
        if (!run)
            throw new DemoError("NOT_FOUND", "找不到這次整理");
        return run;
    }
    decide(runId, exceptionId, action) {
        const current = this.get(runId);
        if (current.status === "FAILED")
            throw new DemoError("FAILED_RUN", "這次整理沒有完成，不能做人工確認");
        if (current.status === "COMPLETED")
            throw new DemoError("ILLEGAL_DECISION", "這次整理已經完成");
        const next = structuredClone(current);
        const target = next.exceptions.find((e) => e.id === exceptionId);
        if (!target)
            throw new DemoError("NOT_FOUND", "找不到這筆例外");
        if (!target.allowed_actions.includes(action))
            throw new DemoError("ILLEGAL_DECISION", "這個確認方式不適用這筆例外");
        target.decision = action;
        const saved = withArtifacts(next);
        this.runs.set(runId, saved);
        return saved;
    }
    complete(runId) {
        const current = this.get(runId);
        if (current.status === "FAILED")
            throw new DemoError("FAILED_RUN", "這次整理沒有完成，不能產出最終報告");
        if (current.status === "COMPLETED")
            return current;
        if (current.exceptions.some((e) => !e.decision))
            throw new DemoError("UNCONFIRMED", "還有尚未確認的例外，不能完成");
        const next = structuredClone(current);
        next.status = "COMPLETED";
        const saved = withArtifacts(next);
        this.runs.set(runId, saved);
        return saved;
    }
    size() { return this.runs.size; }
}
