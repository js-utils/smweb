// 获取ic
import sm from './sm/index'
// import NativeExt from './NativeExt'
// import libs from './libs'
;(function () {
  if(!window['$sm']){
    window['$sm'] = sm
  }
  // sm.NativeExt = NativeExt
  // sm.libs = libs
  window['$sm'] = sm
  if (!window['$']) {
    window['$'] = sm
  }
})()
