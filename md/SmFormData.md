### Default Mount Place
`$sm.NativeExt.FomData`

### Single Install
```javascript
let SmFomData = require('smweb/src/NativeExt/SmFormData') 
```

### Usage

// 支持深入嵌套
* SmFormData.fromJsonObject(jsonObject) // 通过json对象生成FormData
```javascript
// 支持深入嵌套 eg: FormData.fromJsonObject({a: 1, b: '2', c: [{c1: 1}, 2, 3], d: {d1: 1, d2: [1, 2, 3], d3: [1, {d33: [1, 2]}]}, e: [{e1: 1}, {e2: 2}]})
let smFormData = SmFormData.fromJsonObject({a: 1, b: 2})
```

* smFormData.toJsonObject() // 通过FormData实例对象转jsonObject
```javascript
// 支持深入嵌套生成的formData的解析，注意：只能保证生成的json和原始json生成的formData相同，和原始json结构不一定完全相同
// eg: {e: [{e1: '1'}, {e2: '2'}]}生成的formData解析后变为： { e: { e1: '1', e2: '2' }}, 因为他们这两种类型生成formData的结构是一样的，所以没法保证生成的json和原始json一样
let jsonObject = smFormData.toJsonObject()
```

