export function createStudio(){return [
{id:'ST-026',name:'山嶼生活｜品牌網站',client:'虛構客戶・山嶼生活',owner:'小晴',due:'10/23',status:'待確認',brief:'頁面已備妥，等最後兩項交付與客戶回饋確認。',deliveries:[{id:'d1',name:'首頁與服務頁設計稿',done:false},{id:'d2',name:'手機版版面與交付說明',done:false}],feedback:[{id:'f1',text:'首頁請補上預約諮詢入口。',resolved:false},{id:'f2',text:'手機版聯絡資訊需要更容易找到。',resolved:false}],history:[]},
{id:'ST-027',name:'留白咖啡｜秋季企劃',client:'虛構客戶・留白咖啡',owner:'阿哲',due:'10/26',status:'進行中',brief:'活動主視覺完成，文案與排程仍在整理。',deliveries:[{id:'d1',name:'活動主視覺',done:true},{id:'d2',name:'社群文案與發佈排程',done:false}],feedback:[{id:'f1',text:'活動日期請統一標示。',resolved:false}],history:[]},
{id:'ST-028',name:'禾序顧問｜服務簡介',client:'虛構客戶・禾序顧問',owner:'小晴',due:'10/28',status:'待開始',brief:'已確認需求，準備整理第一版服務簡介。',deliveries:[{id:'d1',name:'簡介結構與初稿',done:false},{id:'d2',name:'完稿與交接檔案',done:false}],feedback:[],history:[]}
]}
function project(state,id){const p=state.find(p=>p.id===id);if(!p)throw Error('找不到案件，請重新選取。');return p}
function editable(p){if(p.status==='已交付')throw Error('案件已完成確認；如要重新體驗，請重設示範。')}
export function updateDelivery(state,id,itemId,done){const p=project(state,id);editable(p);const d=p.deliveries.find(d=>d.id===itemId);if(!d)throw Error('找不到交付項目');if(typeof done!=='boolean')throw Error('交付狀態不正確');d.done=done;p.status='進行中';p.history.push(`${d.name}：${done?'完成':'重新待辦'}`)}
export function resolveFeedback(state,id,itemId,resolved){const p=project(state,id);editable(p);const f=p.feedback.find(f=>f.id===itemId);if(!f)throw Error('找不到回饋');if(typeof resolved!=='boolean')throw Error('回饋狀態不正確');f.resolved=resolved;p.history.push(`${f.text}：${resolved?'已處理':'待處理'}`)}
export function confirmProject(state,id){const p=project(state,id);editable(p);if(!p.deliveries.every(d=>d.done)||!p.feedback.every(f=>f.resolved))throw Error('請先完成交付項目並確認所有客戶回饋。');p.status='已交付';p.history.push('已由你確認交付；示範結案。')}
export function studioSummary(state){return {total:state.length,completed:state.filter(p=>p.status==='已交付').length,deliveries:state.reduce((n,p)=>n+p.deliveries.filter(d=>d.done).length,0),pendingFeedback:state.reduce((n,p)=>n+p.feedback.filter(f=>!f.resolved).length,0)}}
