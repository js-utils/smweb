### dom查询
> $ic() // 获取节点，库所有dom方法都是根据$ic获取到dom节点后进行的
```javascript
// 页面load后执行该方法
$ic(function() {
})
// 直接复制dom
$ic(document)
// 查询所有div
$ic('div')
```

> find (expr = '*') // 根据查询子孙节点 内部使用querySelectorAll
```javascript
$ic('ul').find('li')
```

> findOne (expr) // 查询子孙中的第一个节点 内部使用querySelector
```javascript
$ic('ul').findOne('li')
```

>  children (expr = undefined) // 查询所有孩子节点(不包括孙子)，传递expr表示查找某种类型孩子
```javascript
$ic('body').children()
``` 

> parent (expr = undefined) // 获取直接父亲节点(亲生父亲)，传递expr表示查找某种类型的直接父亲节点
```javascript
$ic('li').parent('ul')
```

> parents (expr = undefined) // 获取所有祖先(父亲，爷爷..)，传递expr表示查找某种类型的祖先节点
```javascript
$ic('li').parents()
```

> siblings (expr = '*') // 获取兄弟节点
```javascript
$ic('li').siblings('.active')
```

> siblingsPrevAll (expr = '*') // 获取向上的兄弟节点
```javascript
$ic('li:last-child').siblingsPrevAll()
```

> siblingsNextAll (expr = '*') // 获取向下的兄弟节点
```javascript
$ic('li:last-child').siblingsNextAll()
```

> filter (expr) // 过滤已经查询到的元素
```javascript
$ic('li').filter('.active')
```

> first() // 第一个元素
> last() // 最后一个元素


### 事件

> on (event, listener, useCapture = false) // 绑定事件
> off (event, listener, useCapture = false) // 解绑事件
> one (event, listener, useCapture= false) // 绑定的事件只执行一次

### 类

> addClass(className) removeClass(className) toggleClass(className) replaceClass(removeClassName, addClassName)
```javascript
$ic('li').toggleClass('active')
$ic('li').removeClass('active')
$ic('li').toggleClass('active')
$ic('li').replaceClass('active', 'active2')
```

> inViewport (overlapOffset = 0) // 查询视口中的dom（视口内的元素）
```javascript
$ic('li').inViewport(10) // 所有li元素中和视口重合超过10px的元素
```

> inViewportAddClass (visibleClassName, overlapOffset = 0) // 检测元素在视口是否可见，可见是添加类visibleClassName
```javascript
// 当li元素在视图可见后，添加类 had-visible
$ic('li').inViewportAddClass('had-visible') // li元素滚动到视口内时候 添加had-visible类
```

> css (name, value) //获取或设置dom样式
```javascript
$ic('li').css() // 获取查询到的节点内的第一个元素的所有样式
$ic('li').css('width') // 获取查询到的节点内的第一个元素的宽度
$ic('li').css('width', '100px') // 设置所有查询到的节点的width为100px
```

> attr (attribute, value) //获取或设置dom属性
```javascript
$ic('li').attr('width') // 获取查询到的节点内的第一个元素的宽度属性
$ic('li').attr('width', '100px') // 设置查询到的所有li，添加属性width为100px
```

> dataset (name, value) //获取或设置data-*类型的数据
```javascript
$ic('li').dataset() // 获取查询到的节点内的第一个元素的dataset
$ic('li').css('width') // 获取查询到的节点内的第一个元素的dataset中width的值
$ic('li').css('width', '100px') // 设置所有查询到的节点的dataset中的width为100px（data-width="100px"）
```
