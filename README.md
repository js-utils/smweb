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

> find(expr) // 根据查询子孙节点 内部使用querySelectorAll
```javascript

```

> findOne(expr) // 查询子孙中的第一个节点 内部使用querySelector
