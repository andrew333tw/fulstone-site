import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import {createHash} from 'node:crypto';
const root=new URL('../',import.meta.url);const read=p=>fs.readFileSync(new URL(p,root),'utf8');
test('release bytes match manifest; every runtime file is safe static content',()=>{
const manifest=JSON.parse(read('release-manifest.json'));
for(const [file,hash]of Object.entries(manifest.files)){const bytes=fs.readFileSync(new URL(file,root));assert.equal(createHash('sha256').update(bytes).digest('hex'),hash,file);const text=bytes.toString();assert.doesNotMatch(text,/AKIA[0-9A-Z]{16}|gh[pousr]_[A-Za-z0-9]{20,}|-----BEGIN .*PRIVATE KEY|<input[^>]+type=["']file|\bfetch\s*\(|XMLHttpRequest|sendBeacon|localStorage|sessionStorage/,file)}
});
test('public commercial copy and data boundary remain explicit',()=>{
const text=read('index.html');for(const term of ['NT$8,000','NT$40,000–55,000','NT$44,000','50%','14 個日曆天','依實際範圍估價','資料使用權與保密安排','正式交易前仍須確認交易主體、稅務、合約與收款條件'])assert.ok(text.includes(term),term);
assert.equal(read('CNAME').trim(),'fulstone.tw');for(const p of ['index.html','demos/order-check/index.html','demos/studio-flow/index.html']){const html=read(p);assert.match(html,/lang="zh-Hant"/);assert.match(html,/connect-src 'none'/);assert.match(html,/跳到/)}
});
