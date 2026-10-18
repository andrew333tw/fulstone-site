import {pathToFileURL} from 'node:url';import assert from 'node:assert/strict';
import {DemoStore as BrowserStore} from '../assets/order-engine.mjs';
const source=process.argv[2];if(!source)throw Error('Pass original Business OS root');
const {DemoStore}=await import(pathToFileURL(source+'/sales-demo/engine.ts'));
for(const id of ['weekly-matched','weekly-exceptions','broken-headers']){
 const a=new DemoStore(),b=new BrowserStore();let x=a.execute(id),y=b.execute(id);
 const equal=()=>{assert.deepEqual(y.summary,x.summary);assert.deepEqual(y.exceptions,x.exceptions);assert.deepEqual(y.result_rows,x.result_rows);assert.deepEqual(y.artifacts,x.artifacts);assert.equal(y.business_fingerprint,x.business_fingerprint);assert.deepEqual(y.receipt.input_hashes,x.receipt.input_hashes);assert.deepEqual(y.receipt.output_hashes,x.receipt.output_hashes)};equal();
 if(x.status!=='FAILED'){for(const ex of x.exceptions){for(const action of ex.allowed_actions){x=a.decide(x.run_id,ex.id,action);y=b.decide(y.run_id,ex.id,action);equal()}x=a.decide(x.run_id,ex.id,'ACCEPT_SUGGESTION');y=b.decide(y.run_id,ex.id,'ACCEPT_SUGGESTION');equal()}x=a.complete(x.run_id);y=b.complete(y.run_id);equal()}
 console.log('PARITY PASS',id,'every allowed decision, results, receipts, fingerprint');
}
