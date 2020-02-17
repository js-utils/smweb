### Default Mount Place
`$sm.NativeExt.XMLHttpRequest`
```javascript
window.XMLHttpRequest = $sm.NativeExt.XMLHttpRequest
```

### Single Install
```javascript
let SmXMLHttpRequestProxy = require('smweb/src/NativeExt/SmXMLHttpRequestProxy')
 window.XMLHttpRequest = SmXMLHttpRequestProxy
```

### Usage

// 设置代理
* SmXMLHttpRequestProxy.setProxy(config) // 设置代理类型
```javascript
$sm.NativeExt.XMLHttpRequest.setProxy({
  // onreadystatechange 之前执行
  onreadystatechange_before: (xhr) => {
    console.log(111, xhr.readyState)
  },
// onreadystatechange 之后执行
  onreadystatechange_after: (xhr) => {
    console.log(222, xhr.readyState)
  }
})
window.XMLHttpRequest = $sm.NativeExt.XMLHttpRequest
```

