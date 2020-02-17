// 获取ic
let sm = require('./sm/index')
const NativeExt = require('./NativeExt')
;(function () {
  if(!window['$sm']){
    window['$sm'] = sm
  }
  sm.NativeExt = NativeExt
  window['$sm'] = sm
  if (!window['$']) {
    window['$'] = sm
  }
})()
