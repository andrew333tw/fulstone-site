export function inquiry(context='工作流程改善') {
  const body=`Andrew 你好，\n\n我想討論：${context}\n1. 公司目前最麻煩的工作：\n2. 現在用什麼方式處理：\n3. 希望改善的結果與發生頻率：\n\n（先用文字或編造例子，不附真實客戶資料或帳密。）`;
  return `mailto:andrew@fulstone.tw?subject=${encodeURIComponent('FULSTONE｜'+context)}&body=${encodeURIComponent(body)}`;
}
