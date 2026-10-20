import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {DemoStore, buildRunFromCsv} from '../assets/order-engine.mjs';
import {dashboard} from '../assets/order-dashboard.mjs';

test('dashboard, distribution and filtered details preserve every engine decision', () => {
  for (const id of ['weekly-matched', 'weekly-exceptions']) {
    const store = new DemoStore(); let run = store.execute(id);
    const verify = () => {
      const d = dashboard(run);
      assert.equal(d.inputRows, run.summary.records_in);
      assert.equal(d.matched, run.summary.records_matched);
      assert.equal(d.pending, run.summary.pending);
      assert.equal(d.total, run.exceptions.length);
      assert.equal(d.confirmed + d.pending, d.total);
      assert.equal(d.groups.reduce((n,g) => n+g.total, 0), d.total);
      for (const status of ['all', 'pending', 'confirmed']) for (const kind of ['all', ...d.groups.map(g=>g.id)]) {
        const f = dashboard(run, {status,kind});
        assert.equal(f.pending,d.pending); // Filtering cannot hide unfinished work from the gate.
        assert.deepEqual(f.visible,run.exceptions.filter(x=>(kind==='all'||x.kind===kind)&&(status==='all'||(status==='pending'?!x.decision:Boolean(x.decision)))));
      }
    };
    verify();
    for (const x of run.exceptions) for (const action of x.allowed_actions) {
      run = store.decide(run.run_id,x.id,action); verify();
    }
    run = store.complete(run.run_id); verify();
    assert.equal(dashboard(run).pending,0);
  }
});

test('failed and absent runs never become successful dashboard zeros', () => {
  assert.equal(dashboard(null),null);
  assert.equal(dashboard(new DemoStore().execute('broken-headers')),null);
});

test('fully matched inputs produce a genuine empty difference list', () => {
  const csv='訂單編號,品號,數量,金額,客戶,訂單日期\nSO-1,SKU-1,1,100,虛構,2026-10-01\n';
  const r=buildRunFromCsv({fixtureId:'synthetic-equal',sourceA:csv,sourceB:csv});
  assert.notEqual(r.status,'FAILED');const d=dashboard(r);
  assert.equal(d.total,0);assert.equal(d.pending,0);assert.equal(d.inputRows,2);
});

test('pricing, legal disclosure and studio runtime are byte-for-byte unchanged', () => {
  const baseline=JSON.parse(fs.readFileSync(new URL('./v2-invariants.json',import.meta.url),'utf8'));
  const hash=s=>createHash('sha256').update(s).digest('hex');
  const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8').replaceAll('\r\n','\n');
  const section=(s,start,end)=>s.slice(s.indexOf(start),s.indexOf(end,s.indexOf(start)));
  assert.equal(hash(section(read('index.html'),'<section class="section" id="price"','</section>')),baseline.price);
  assert.equal(hash(section(read('index.html'),'<div class="legal">','</main>')),baseline.legal);
  for(const [p,digest] of Object.entries(baseline.files)) assert.equal(hash(read(p)),digest,p);
});

test('film is opt-in with captions, poster, transcript and same-domain sources',()=>{
  const html=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
  assert.match(html,/<video[^>]*controls[^>]*preload="none"/);
  assert.doesNotMatch(html,/<video[^>]*(autoplay|loop)/);
  for(const term of ['workflow-zh.vtt','film-transcript','workflow-poster.jpg','og:image','inquiry-prompts','&amp;body='])assert.ok(html.includes(term));
});
