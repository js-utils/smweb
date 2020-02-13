// 获取ic
let ic = require('./ic/index')
(function () {
  if(!window['$ic']){
    window['$ic'] = ic
  }
  window['$ic'] = ic
})()
