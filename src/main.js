// 获取ic
import sm from './sm/index'
import NativeExt from './NativeExt'

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
