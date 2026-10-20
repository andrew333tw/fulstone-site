// Projection only: all decisions and completion gates remain in the original engine.
export const exceptionLabels = {
  DUPLICATE: '重複資料', SOURCE_CONFLICT: '來源內部衝突',
  VALUE_CONFLICT: '數量或欄位不一致', MISSING: '單邊缺漏', FIELD_ERROR: '欄位無法使用'
};

export function dashboard(run, {status = 'all', kind = 'all'} = {}) {
  if (!run || run.status === 'FAILED') return null;
  const exceptions = run.exceptions;
  const groups = Object.entries(exceptionLabels).map(([id, label]) => {
    const items = exceptions.filter(x => x.kind === id);
    const confirmed = items.filter(x => Boolean(x.decision)).length;
    return {id, label, total: items.length, confirmed, pending: items.length - confirmed};
  });
  const confirmed = exceptions.filter(x => Boolean(x.decision)).length;
  const visible = exceptions.filter(x => (kind === 'all' || x.kind === kind) &&
    (status === 'all' || (status === 'confirmed' ? Boolean(x.decision) : !x.decision)));
  return {inputRows: run.summary.records_in, matched: run.summary.records_matched,
    total: exceptions.length, pending: exceptions.length - confirmed, confirmed,
    groups, visible, status, kind};
}
