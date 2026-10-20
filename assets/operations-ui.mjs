import {createOperations,projectOperations,confirmOperation,types,statuses} from './operations-model.mjs';
import {esc} from './ui.mjs';import {inquiry} from './inquiry.mjs';
const q=s=>document.querySelector(s);let rows=createOperations(),selected=null;
const filters={period:'all',status:'all',type:'all',day:'all'};
const embedded=new URLSearchParams(location.search).has('embed');if(embedded)document.body.classList.add('embedded');
q('#type').innerHTML='<option value="all">全部類型</option>'+types.map(x=>`<option>${x}</option>`).join('');
q('#ops-inquiry').href=inquiry('營運 Dashboard 與異常追蹤');
function render(){
 const d=projectOperations(rows,filters);q('#ops-root').dataset.total=d.total;
 q('#ops-metrics').innerHTML=[['目前工作項目',d.total],['待人工覆核',d.review],['異常待排',d.blocked],['完成比例',d.completion===null?'—':d.completion+'%']].map(([k,v],i)=>`<div><dt>${k}</dt><dd data-kpi="${i}">${v}</dd></div>`).join('');
 q('#trend').innerHTML=d.trend.length?`<div class="trend-bars" aria-label="每日工作項目趨勢，按日期可篩選">${d.trend.map(x=>`<button class="trend-day" data-day="${x.day}" aria-label="${x.day}：${x.total} 項，已完成 ${x.done} 項"><span class="trend-value">${x.total}</span><span class="trend-track"><i style="height:${x.total/4*100}%"><b style="height:${x.done/x.total*100}%"></b></i></span><span>${x.day.slice(5)}</span></button>`).join('')}</div>`:'<p class="empty">此條件沒有趨勢資料</p>';
 q('#distribution').innerHTML=d.distribution.map(x=>`<button data-type="${x.type}" class="type-row" aria-label="篩選${x.type}，${x.count} 項"><span>${x.type}</span><span class="type-track"><i style="width:${d.total?x.count/d.total*100:0}%"></i></span><strong>${x.count}</strong></button>`).join('');
 q('#row-count').textContent=`${d.total} 項工作 · 與上方 KPI、圖表相同篩選範圍`;
 q('#ops-rows').innerHTML=d.rows.length?d.rows.map(r=>`<tr><th scope="row"><button class="row-open" data-open="${r.id}" aria-label="查看 ${r.id} ${r.title}"><b>${r.id}</b><span>${r.title}</span></button></th><td>${r.day.slice(5)}</td><td>${r.type}</td><td><span class="status ${r.status}">${statuses[r.status]}</span></td><td>${r.units}</td></tr>`).join(''):'<tr><td colspan="5" class="empty">沒有符合條件的工作。可清除篩選重新探索。</td></tr>';
 q('#active-day').textContent=filters.day==='all'?'情境期間：2026/10/01–10/14':`已選日期：${filters.day}`;
 const r=d.rows.find(r=>r.id===selected);
 q('#ops-detail').innerHTML=r?`<div class="detail-head"><span class="eyebrow">工作明細 / ${r.id}</span><button id="close-detail" class="text-button">返回清單</button></div><h3>${esc(r.title)}</h3><span class="status ${r.status}">${statuses[r.status]}</span><dl class="detail-facts"><div><dt>工作日期</dt><dd>${r.day}</dd></div><div><dt>作業類型</dt><dd>${r.type}</dd></div><div><dt>示範負責角色</dt><dd>${r.owner}</dd></div><div><dt>本項資料列數</dt><dd>${r.units} 列（與工作項目數不同）</dd></div></dl><h4>目前需要處理什麼？</h4><p>${esc(r.note)}</p>${r.status==='review'?'<button id="confirm-operation">我已檢視，確認此項完成</button>':r.status==='blocked'?'<a href="/demos/workflow/">體驗流程錯誤與恢復 ↗</a>':'<p class="quiet">此項已完成，不需要重複確認。</p>'}<p class="micro">虛構情境，所有改動只在本頁記憶體，重新整理會重設。</p>`:'<p class="eyebrow">Detail / 工作依據</p><h3>選一項，追到下一步。</h3><p>點選左側工作，查看狀態、負責角色與處理依據。待覆核項目可人工確認，KPI 與趨勢會同步更新。</p>';
 if(selected&&!r){selected=null;q('#ops-message').textContent='篩選後原項目不在清單中，已返回總覽。';}
}
for(const id of ['period','status','type'])q('#'+id).addEventListener('change',e=>{filters[id]=e.target.value;filters.day='all';render();});
q('#ops-reset').addEventListener('click',()=>{rows=createOperations();selected=null;for(const k of Object.keys(filters))filters[k]='all';for(const k of ['period','status','type'])q('#'+k).value='all';q('#ops-message').textContent='情境與篩選已重設。';render();});
q('#clear-day').addEventListener('click',()=>{filters.day='all';render();});
q('#ops-root').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.day){filters.day=b.dataset.day;render();q('#clear-day').focus();}if(b.dataset.type){filters.type=b.dataset.type;q('#type').value=filters.type;render();q('#type').focus();}if(b.dataset.open){selected=b.dataset.open;render();q('#ops-detail').focus();if(innerWidth<800)q('#ops-detail').scrollIntoView({block:'start'});}if(b.id==='close-detail'){const id=selected;selected=null;render();document.querySelector(`[data-open="${id}"]`)?.focus();}if(b.id==='confirm-operation'){confirmOperation(rows,selected);q('#ops-message').textContent='人工確認已記錄，所有數據已按目前條件重算。';render();q('#ops-message').focus();}});
render();
