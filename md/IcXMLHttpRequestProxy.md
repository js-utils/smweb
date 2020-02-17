### Default Mount Place
`$ic.NativeExt.XMLHttpRequest`
```javascript
window.XMLHttpRequest = $ic.NativeExt.XMLHttpRequest
```

### Single Install
```javascript
let IcXMLHttpRequestProxy = require('icquery2/src/NativeExt/IcXMLHttpRequestProxy')
 window.XMLHttpRequest = IcXMLHttpRequestProxy
```

### Usage

// 设置代理
* IcXMLHttpRequestProxy.setProxy(config) // 设置代理类型
```javascript
$ic.NativeExt.XMLHttpRequest.setProxy({
  // onreadystatechange 之前执行
  onreadystatechange_before: (xhr) => {
    console.log(111, xhr.readyState)
  },
// onreadystatechange 之后执行
  onreadystatechange_after: (xhr) => {
    console.log(222, xhr.readyState)
  }
})
window.XMLHttpRequest = $ic.NativeExt.XMLHttpRequest
```

