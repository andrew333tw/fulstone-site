export const types = ['訂單作業','出貨作業','資料整理'];
export const statuses = {done:'已完成',review:'待覆核',blocked:'異常待排'};
export function createOperations() {
  return Array.from({length:56},(_,i)=>({id:`OP-${String(i+1).padStart(3,'0')}`,day:`2026-10-${String(1+Math.floor(i/4)).padStart(2,'0')}`,type:types[i%3],title:['通路訂單彙整','出貨清單覆核','每週資料整理','交接項目確認'][i%4],owner:['營運窗口','資料窗口','出貨窗口'][i%3],status:i%9===0?'blocked':i%4===0?'review':'done',units:4+i%11,note:i%9===0?'來源欄位缺漏，需補齊後再處理。':i%4===0?'兩個來源有差異，需要負責人確認。':'已完成本次示範工作。'}));
}
export function projectOperations(rows,{period='all',status='all',type='all',day='all'}={}) {
  const visible=rows.filter(r=>(period!=='7'||r.day>='2026-10-08')&&(status==='all'||r.status===status)&&(type==='all'||r.type===type)&&(day==='all'||r.day===day));
  const count=s=>visible.filter(r=>r.status===s).length;
  return {rows:visible,total:visible.length,done:count('done'),review:count('review'),blocked:count('blocked'),completion:visible.length?Math.round(count('done')/visible.length*100):null,
    trend:[...new Set(visible.map(r=>r.day))].sort().map(day=>({day,total:visible.filter(r=>r.day===day).length,done:visible.filter(r=>r.day===day&&r.status==='done').length})),
    distribution:types.map(type=>({type,count:visible.filter(r=>r.type===type).length}))};
}
export function confirmOperation(rows,id) {
  const row=rows.find(r=>r.id===id);if(!row||row.status!=='review')throw Error('只有待覆核項目能由此處確認');
  row.status='done';row.note='已由使用者在本次虛構情境確認；沒有更新外部資料。';return row;
}
