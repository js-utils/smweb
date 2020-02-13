class IcArray extends Array {
  /**
   * 查找元素节点 $ic(expr)
   * $ic('#myId')  $ic('.myClass') $ic('div')
   * @param expr :string
   * @param rootElement dom default document
   * @param isFindOne 是否只查询找到的第一个，默认查询所有
   */
  _query (expr, rootElement = null, isFindOne = false) {
    rootElement = rootElement || document
    if (typeof expr === 'string') {
      // expr是dom对象
      // if (/^(\.|\*|#|[a-z]).+/i.test(expr)) { // 首字母以 . * 或者 # 开头
      //
      // }
      let doms = null
      if (isFindOne) {
        doms = [ rootElement.querySelector(expr) ]
      } else {
        doms = rootElement.querySelectorAll(expr)
      }
      if (doms && doms.length) {
        Array.prototype.push.apply(this, doms)
      }
    }
    return this
  }
  _uniq () {
    // 调用Array原生filter方法
    return super.filter((value, index, self) => {
      return self.indexOf(value) === index
    })
  }
  /**
   * @param expr: string
   * @returns icArray
   */
  find (expr = '*') {
    /* #if icNote === 'exist' */
    this.find.icDesc || (this.find.icDesc = '根据expr查询所有子孙节点,默认查询所有')
    /* #endif */
    let icArray = new IcArray()
    this.forEach((element) => {
      icArray._query(expr, element)
    })
    return icArray._uniq()
  }
  findOne (expr) {
    /* #if icNote === 'exist' */
    this.findOne.icDesc || (this.findOne.icDesc = '根据expr查询所有子孙节点中的第一个')
    /* #endif */
    let icArray = new IcArray()
    this.forEach((element) => {
      icArray._query(expr, element, true)
    })
    return icArray._uniq()
  }
  children (expr = '*') {
    /* #if icNote === 'exist' */
    this.children && (this.children.icDesc = '查询所有儿子节点(不包括孙子)')
    /* #endif */
    let icArray = new IcArray()
    this.forEach((element) => {
      icArray._query(`:scope > ${expr}`, element)
    })
    return icArray._uniq()
  }
  parent (expr = undefined) {
    /* #if icNote === 'exist' */
    this.parent.icDesc || (this.parent.icDesc = '获取直接父亲节点(亲生父亲)，传递expr表示查找某种类型的直接父亲节点')
    /* #endif */
    let icArray = new IcArray()
    this.forEach((element) => {
      let parent = element.parentNode
      // nodeType: http://www.w3school.com.cn/jsref/prop_node_nodetype.asp
      if (parent && parent.nodeType === 1) {
        if (!expr) {
          icArray.push(parent)
        } else {
          let exprElements = new IcArray()._query(expr)
          if (exprElements.indexOf(parent) !== -1) {
            icArray.push(parent)
          }
        }
      }
    })
    return icArray._uniq()
  }
  parents (expr = undefined) {
    /* #if icNote === 'exist' */
    this.parents.icDesc || (this.parents.icDesc = '获取所有祖先(父亲，爷爷..)，传递expr表示查找某种类型的祖先节点')
    /* #endif */
    let nowParentsElements = this.parent()
    let totalParentElements = nowParentsElements
    while (nowParentsElements.length) {
      nowParentsElements = nowParentsElements.parent()
      Array.prototype.push.apply(totalParentElements, nowParentsElements)
    }
    if (expr) {
      let exprElements = new IcArray()._query(expr)
      let icArray = new IcArray()
      exprElements.forEach((item) => {
        if (totalParentElements.indexOf(item) !== -1) {
          icArray.push(item)
        }
      })
      totalParentElements = icArray
    }
    return totalParentElements._uniq()
  }
  // 获取兄弟节点
  siblings (expr = '*') {
    let icArray = new IcArray()
    this.forEach(element => {
      Array.prototype.push.apply(icArray, new IcArray(element).parent().children(expr))
    })
    return icArray._uniq()
  }
  // 获取向上的兄弟节点
  siblingsPrevAll (expr = '*') {
    let icArray = new IcArray()
    this.forEach(element => {
      let elementSiblings = new IcArray(element).siblings(expr)
      let prevElement = element['previousSibling']
      while (prevElement) {
        if (prevElement.nodeType === 1 && elementSiblings.indexOf(prevElement) !== -1) {
          icArray.push(prevElement)
        }
        prevElement = prevElement['previousSibling']
      }
    })
    return icArray._uniq()
  }
  // 获取向下的兄弟节点
  siblingsNextAll(expr = '*') {
    let icArray = new IcArray()
    this.forEach(element => {
      let elementSiblings = new IcArray(element).siblings(expr)
      let nextElement = element['nextSibling']
      while (nextElement) {
        if (nextElement.nodeType === 1 && elementSiblings.indexOf(nextElement) !== -1) {
          icArray.push(nextElement)
        }
        nextElement = nextElement['nextSibling']
      }
    })
    return icArray._uniq()
  }
  // 过滤已选元素
  filter (expr) {
    if (expr) {
      let icArray = new IcArray()
      this.forEach(element => {
        let exprElementSiblings = new IcArray(element).siblings(expr)
        if (exprElementSiblings.indexOf(element) !== -1) {
          icArray.push(element)
        }
      })
      return icArray
    }
    return this
  }
  first () {
    if (this.length) {
      return new IcArray(this[0])
    }
    return this
  }
  last () {
    if (this.length) {
      return new IcArray(this[this.length - 1])
    }
    return this
  }
  ////////////////////////////////////////////////////////////////////
  //    类操作相关
  ////////////////////////////////////////////////////////////////////
  _operateClass (op, className, cb) {
    let classNames = className instanceof(Array) ? className : className.split(' ')
    this.forEach((element) => {
      classNames.forEach((classItem) => {
        let value = element['classList'][op](classItem)
        cb && cb(value)
      })
    })
  }
  // 添加类
  addClass (className) {
    this._operateClass('add', className)
  }
  // 删除类
  removeClass (className) {
    this._operateClass('remove', className)
  }
  // 翻转类
  toggleClass (className) {
    this._operateClass('toggle', className)
  }
  // 替换类
  replaceClass (beforeClassName, afterClassName) {
    let icArray = this.filter(`.${beforeClassName}`)
    console.log(this, icArray, `.${beforeClassName}`)
    icArray._operateClass('remove', beforeClassName)
    icArray._operateClass('add', afterClassName)
    return icArray
  }
}
module.exports = IcArray
