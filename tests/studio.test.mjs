import test from 'node:test';
import assert from 'node:assert/strict';
import {createStudio, updateDelivery, resolveFeedback, confirmProject, studioSummary} from '../assets/studio-model.mjs';
test('feedback and all deliveries gate confirmation; summary reflects actual work',()=>{
const state=createStudio();const p=state[0];
assert.throws(()=>confirmProject(state,p.id));
for(const d of p.deliveries) updateDelivery(state,p.id,d.id,true);
assert.throws(()=>confirmProject(state,p.id));
for(const f of p.feedback) resolveFeedback(state,p.id,f.id,true);
confirmProject(state,p.id);assert.equal(p.status,'已交付');
assert.equal(studioSummary(state).completed,1);
assert.throws(()=>updateDelivery(state,p.id,p.deliveries[0].id,false));
});
test('empty, unknown identity and reset are explicit',()=>{
assert.equal(studioSummary([]).total,0);
assert.throws(()=>confirmProject(createStudio(),'unknown'));
const a=createStudio();updateDelivery(a,a[0].id,a[0].deliveries[0].id,true);
assert.equal(createStudio()[0].deliveries[0].done,false);
assert.throws(()=>resolveFeedback(a,a[0].id,'unknown',true));
});
