# Install

![](https://img.shields.io/npm/v/smweb.svg?style=flat-square)

```bash
npm install smweb -S
```


# Usage

### $sm绑定的方法
> dynamicLoadCss(url) 动态加载css
> dynamicLoadJs(url) 动态加载js

### dom查询
> $sm() // 获取节点，库所有dom方法都是根据$ic获取到dom节点后进行的
```javascript
// 页面load后执行该方法
$sm(function() {
})
// 直接复制dom
$sm(document)
// 查询所有div
$sm('div')
```

> find (expr = '*') // 根据查询子孙节点 内部使用querySelectorAll
```javascript
$sm('ul').find('li')
```

> findOne (expr) // 查询子孙中的第一个节点 内部使用querySelector
```javascript
$sm('ul').findOne('li')
```

>  children (expr = undefined) // 查询所有孩子节点(不包括孙子)，传递expr表示查找某种类型孩子
```javascript
$sm('body').children()
``` 

> parent (expr = undefined) // 获取直接父亲节点(亲生父亲)，传递expr表示查找某种类型的直接父亲节点
```javascript
$sm('li').parent('ul')
```

> parents (expr = undefined) // 获取所有祖先(父亲，爷爷..)，传递expr表示查找某种类型的祖先节点
```javascript
$sm('li').parents()
```

> siblings (expr = '*') // 获取兄弟节点
```javascript
$sm('li').siblings('.active')
```

> siblingsPrevAll (expr = '*') // 获取向上的兄弟节点
```javascript
$sm('li:last-child').siblingsPrevAll()
```

> siblingsNextAll (expr = '*') // 获取向下的兄弟节点
```javascript
$sm('li:last-child').siblingsNextAll()
```

> filter (expr) // 过滤已经查询到的元素
```javascript
$sm('li').filter('.active')
```

> first() // 取第一个元素SmArray
> firstElement // 第一个dom元素，不存在返回null
> last() // 最后一个元素的SmArray
> lastElement() // 最后一个dom元素，不存在返回null


### 事件

> on (event, listener, useCapture = false) // 绑定事件
> off (event, listener, useCapture = false) // 解绑事件
> one (event, listener, useCapture= false) // 绑定的事件只执行一次
> trigger (event) // 触发事件

### 类

> addClass(className) removeClass(className) toggleClass(className) replaceClass(removeClassName, addClassName)
```javascript
$sm('li').toggleClass('active')
$sm('li').removeClass('active')
$sm('li').toggleClass('active')
$sm('li').replaceClass('active', 'active2')
```

> inViewport (overlapOffset = 0) -> bool // 查询视口中的dom（视口内的元素）
```javascript
$sm('li').inViewport(10) // 所有li元素中和视口重合超过10px的元素
```

> inViewportAddClass (visibleClassName, overlapOffset = 0) // 检测元素在视口是否可见，可见是添加类visibleClassName
```javascript
// 当li元素在视图可见后，添加类 had-visible
$sm('li').inViewportAddClass('had-visible') // li元素滚动到视口内时候 添加had-visible类
```

> css (name, value) //获取或设置dom样式
```javascript
$sm('li').css() // 获取查询到的节点内的第一个元素的所有样式
$sm('li').css('width') // 获取查询到的节点内的第一个元素的宽度
$sm('li').css('width', '100px') // 设置所有查询到的节点的width为100px
```

> attr (attribute, value) //获取或设置dom属性
```javascript
$sm('li').attr('width') // 获取查询到的节点内的第一个元素的宽度属性
$sm('li').attr('width', '100px') // 设置查询到的所有li，添加属性width为100px
```

> dataset (name, value) //获取或设置data-*类型的数据
```javascript
$sm('li').dataset() // 获取查询到的节点内的第一个元素的dataset
$sm('li').css('width') // 获取查询到的节点内的第一个元素的dataset中width的值
$sm('li').css('width', '100px') // 设置所有查询到的节点的dataset中的width为100px（data-width="100px"）
```

### libs
 > 获取网络图片尺寸 `fetchImageNetSize`[内部网络请求库使用`fetch`，请自己polyfill]
```javascript
async function test () {
  let size = await $sm.libs.fetchImageNetSize("http://wise-job.oss-cn-zhangjiakou.aliyuncs.com/webjs/images/chunyun/dongcidaci.gif")
  console.log(size) // {width: 658, height: 494}  或 无法获取到抛异常
}
```
