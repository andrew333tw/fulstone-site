import test from 'node:test';import assert from 'node:assert/strict';
import {createOperations,projectOperations,confirmOperation,types} from '../assets/operations-model.mjs';
import {createWorkflow,advanceWorkflow,reviewWorkflow,repairWorkflow} from '../assets/workflow-model.mjs';
import {inquiry} from '../assets/inquiry.mjs';
test('every operations filter projects the same rows into counts, trend and categories',()=>{
 const rows=createOperations();assert.equal(rows.length,56);
 for(const period of ['all','7'])for(const status of ['all','done','review','blocked'])for(const type of ['all',...types])for(const day of ['all','2026-10-03','2026-10-12']){
  const f={period,status,type,day},p=projectOperations(rows,f);
  const expected=rows.filter(r=>(period!=='7'||r.day>='2026-10-08')&&(status==='all'||r.status===status)&&(type==='all'||r.type===type)&&(day==='all'||r.day===day));
  assert.deepEqual(p.rows,expected);assert.equal(p.total,p.done+p.review+p.blocked);assert.equal(p.total,p.trend.reduce((n,x)=>n+x.total,0));assert.equal(p.total,p.distribution.reduce((n,x)=>n+x.count,0));assert.equal(p.completion,p.total?Math.round(p.done/p.total*100):null);
 }
 const review=rows.find(r=>r.status==='review');const before=projectOperations(rows);confirmOperation(rows,review.id);const after=projectOperations(rows);assert.equal(after.done,before.done+1);assert.equal(after.review,before.review-1);assert.equal(after.total,before.total);assert.throws(()=>confirmOperation(rows,review.id));assert.throws(()=>confirmOperation(rows,'missing'));
});
test('workflow requires actual manual review; accept and exclude remain distinct',()=>{
 for(const decision of ['accept','exclude']){const s=createWorkflow();for(let i=0;i<3;i++)advanceWorkflow(s);assert.equal(s.status,'WAITING_REVIEW');assert.throws(()=>advanceWorkflow(s));assert.equal(s.output,null);reviewWorkflow(s,decision);advanceWorkflow(s);advanceWorkflow(s);assert.equal(s.status,'COMPLETED');assert.equal(s.output.decision,decision);assert.equal(s.output.externalWrites,0);assert.equal(s.output.simulation,true);assert.throws(()=>advanceWorkflow(s));assert.throws(()=>reviewWorkflow(s,'accept'));}
});
test('missing input fails closed, repair retries the real failed step, reset is isolated',()=>{
 const s=createWorkflow('invalid');advanceWorkflow(s);advanceWorkflow(s);assert.equal(s.status,'FAILED');assert.equal(s.step,1);assert.equal(s.output,null);assert.throws(()=>advanceWorkflow(s));repairWorkflow(s);advanceWorkflow(s);assert.equal(s.step,2);assert.equal(s.status,'READY');assert.throws(()=>repairWorkflow(s));assert.equal(createWorkflow('invalid').input.amount,null);
});
test('contextual inquiry is mailto only and contains the customer questions',()=>{
 for(const context of ['營運 Dashboard','AI／流程整合','訂單核對']){const u=new URL(inquiry(context));assert.equal(u.protocol,'mailto:');assert.equal(u.pathname,'andrew@fulstone.tw');const body=u.searchParams.get('body');for(const t of [context,'現在用什麼方式','希望改善','不附真實客戶資料'])assert.ok(body.includes(t));}
});

test('classification uses the synthetic input rather than a decorative label',()=>{const s=createWorkflow();s.input.content='一般交接通知';for(let i=0;i<3;i++)advanceWorkflow(s);assert.equal(s.category,'一般通知');reviewWorkflow(s,'accept');advanceWorkflow(s);advanceWorkflow(s);assert.equal(s.output.category,'一般通知');});
