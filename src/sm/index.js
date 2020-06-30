import SmArray from "./SmArray";
function sm (expr) {
  let smArray = new SmArray()
  function afterPageLoaded () {
    expr($sm)
  }
  if (typeof expr === 'function') {  // 函数
    // 页面加载完成执行函数
    if (window.addEventListener) {
      window.addEventListener('DOMContentLoaded', afterPageLoaded, false)
    } else if (window['attachEvent']) {
      window['attachEvent']('DOMContentLoaded', afterPageLoaded)
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
// 动态加载CSS
sm.dynamicLoadCss = function (url) {
  let head = document.getElementsByTagName('head')[0]
  let link = document.createElement('link')
  link.type = 'text/css'
  link.rel = 'stylesheet'
  link.href = url
  head.appendChild(link)
}
// 动态加载JS
sm.dynamicLoadJs = function (url, callback) {
  let head = document.getElementsByTagName('head')[0];
  let script = document.createElement('script')
  script.type = 'text/javascript'
  script.src = url
  if (typeof(callback)=='function') {
    script.onload = script.onreadystatechange = function () {
      if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete"){
        callback()
        script.onload = script.onreadystatechange = null
      }
    }
  }
  head.appendChild(script);
}

export default sm
