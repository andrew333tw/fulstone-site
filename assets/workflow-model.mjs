export const steps=['資料輸入','規則檢查','規則分類','人工審核','結果輸出'];
export function createWorkflow(scenario='standard') {
 return {scenario,step:0,status:'READY',reviewed:false,decision:null,category:null,history:[],input:{id:'DEMO-014',type:'訂單異常通知',content:'示範訂單金額與來源清單不一致。',amount:scenario==='invalid'?null:2800},output:null};
}
export function advanceWorkflow(s) {
 if(s.status==='FAILED'||s.status==='COMPLETED')throw Error('請先修復或重設情境');
 if(s.step===3&&!s.reviewed)throw Error('必須先由人完成審核');
 if(s.step===1&&s.input.amount===null){s.status='FAILED';s.history.push('規則檢查失敗：缺少金額欄位。沒有產生完成結果。');return s;}
 if(s.step===2)s.category=s.input.content.includes('金額')?'金額差異':'一般通知';
 s.history.push(`${steps[s.step]}完成`);s.step++;
 if(s.step===3)s.status='WAITING_REVIEW';else if(s.step===5){s.status='COMPLETED';s.output={id:s.input.id,category:s.category,decision:s.decision,externalWrites:0,simulation:true};}else s.status='READY';return s;
}
export function reviewWorkflow(s,decision){if(s.step!==3||s.status!=='WAITING_REVIEW'||!['accept','exclude'].includes(decision))throw Error('目前不能記錄此審核');s.reviewed=true;s.decision=decision;s.status='REVIEWED';s.history.push(decision==='accept'?'人工確認採用':'人工決定排除');return s;}
export function repairWorkflow(s){if(s.status!=='FAILED')throw Error('目前不需要修復');s.input.amount=2800;s.status='READY';s.history.push('使用者補入虛構金額 2800，等待重新檢查。');return s;}
