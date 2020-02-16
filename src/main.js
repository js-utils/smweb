// 获取ic
let ic = require('./ic/index')
const NativeExt = require('./NativeExt')
;(function () {
  if(!window['$ic']){
    window['$ic'] = ic
  }
  ic.NativeExt = NativeExt
  window['$ic'] = ic
  if (!window['$']) {
    window['$'] = ic
  }
})()
