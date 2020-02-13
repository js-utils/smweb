const IcArray = require('./IcArray')
function ic (expr) {
  let icArray = new IcArray()
  if (typeof expr === 'function') {  // 函数
    function afterPageLoaded () {
      expr($ic)
    }
    // 页面加载完成执行函数
    if (window.addEventListener) {
      window.addEventListener('load', afterPageLoaded, false)
    } else if (window.attachEvent) {
      window.attachEvent('onload', afterPageLoaded)
    } else {
      window.onload = afterPageLoaded
    }
  } else if (expr instanceof Element) { // dom对象
    icArray.push(expr)
  }
  else if (typeof expr == 'string') {
    icArray._query(expr)  // 字符串
  }
  return icArray
}

module.exports = ic
