import SmArray from "./SmArray";
function sm (expr) {
  let smArray = new SmArray()
  if (typeof expr === 'function') {  // 函数
    function afterPageLoaded () {
      expr($sm)
    }
    // 页面加载完成执行函数
    if (window.addEventListener) {
      window.addEventListener('DOMContentLoaded', afterPageLoaded, false)
    } else if (window.attachEvent) {
      window.attachEvent('DOMContentLoaded', afterPageLoaded)
    } else {
      window.onload = afterPageLoaded
    }
  } else if (expr instanceof Element) { // dom对象
    smArray.push(expr)
  }
  else if (typeof expr == 'string') {
    smArray._query(expr)  // 字符串
  }
  return smArray
}

export default sm
