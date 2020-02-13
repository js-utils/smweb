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

> addClass(className) removeClass(className) toggleClass(className) replaceClass(removeClassName, addClassName)
```javascript
$ic('li').toggleClass('active')
$ic('li').removeClass('active')
$ic('li').toggleClass('active')
$ic('li').replaceClass('active', 'active2')
```
