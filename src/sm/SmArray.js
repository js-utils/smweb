class SmArray extends Array {
  // constructor() {
  //   super(...arguments)
  // }
  /**
   * 查找元素节点 $sm(expr)
   * $sm('#myId')  $sm('.myClass') $sm('div')
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
   * @returns smArray
   */
  find (expr = '*') {
    /* #if smNote === 'exist' */
    // this.find.smDesc || (this.find.smDesc = '根据expr查询所有子孙节点,默认查询所有')
    /* #endif */
    let smArray = new SmArray()
    this.forEach((element) => {
      smArray._query(expr, element)
    })
    return smArray._uniq()
  }
  findOne (expr) {
    /* #if smNote === 'exist' */
    // this.findOne.smDesc || (this.findOne.smDesc = '根据expr查询所有子孙节点中的第一个')
    /* #endif */
    let smArray = new SmArray()
    this.forEach((element) => {
      smArray._query(expr, element, true)
    })
    return smArray._uniq()
  }
  children (expr = '*') {
    /* #if smNote === 'exist' */
    // this.children && (this.children.smDesc = '查询所有儿子节点(不包括孙子)')
    /* #endif */
    let smArray = new SmArray()
    this.forEach((element) => {
      smArray._query(`:scope > ${expr}`, element)
    })
    return smArray._uniq()
  }
  parent (expr = undefined) {
    /* #if smNote === 'exist' */
    // this.parent.smDesc || (this.parent.smDesc = '获取直接父亲节点(亲生父亲)，传递expr表示查找某种类型的直接父亲节点')
    /* #endif */
    let smArray = new SmArray()
    this.forEach((element) => {
      let parent = element.parentNode
      // nodeType: http://www.w3school.com.cn/jsref/prop_node_nodetype.asp
      if (parent && parent.nodeType === 1) {
        if (!expr) {
          smArray.push(parent)
        } else {
          let exprElements = new SmArray()._query(expr)
          if (exprElements.indexOf(parent) !== -1) {
            smArray.push(parent)
          }
        }
      }
    })
    return smArray._uniq()
  }
  parents (expr = undefined) {
    /* #if smNote === 'exist' */
    // this.parents.smDesc || (this.parents.smDesc = '获取所有祖先(父亲，爷爷..)，传递expr表示查找某种类型的祖先节点')
    /* #endif */
    let nowParentsElements = this.parent()
    let totalParentElements = nowParentsElements
    while (nowParentsElements.length) {
      nowParentsElements = nowParentsElements.parent()
      Array.prototype.push.apply(totalParentElements, nowParentsElements)
    }
    if (expr) {
      let exprElements = new SmArray()._query(expr)
      let smArray = new SmArray()
      exprElements.forEach((item) => {
        if (totalParentElements.indexOf(item) !== -1) {
          smArray.push(item)
        }
      })
      totalParentElements = smArray
    }
    return totalParentElements._uniq()
  }
  // 获取兄弟节点
  siblings (expr = '*') {
    let smArray = new SmArray()
    this.forEach(element => {
      Array.prototype.push.apply(smArray, new SmArray(element).parent().children(expr))
    })
    return smArray._uniq()
  }
  // 获取向上的兄弟节点
  siblingsPrevAll (expr = '*') {
    let smArray = new SmArray()
    this.forEach(element => {
      let elementSiblings = new SmArray(element).siblings(expr)
      let prevElement = element['previousSibling']
      while (prevElement) {
        if (prevElement.nodeType === 1 && elementSiblings.indexOf(prevElement) !== -1) {
          smArray.push(prevElement)
        }
        prevElement = prevElement['previousSibling']
      }
    })
    return smArray._uniq()
  }
  // 获取向下的兄弟节点
  siblingsNextAll(expr = '*') {
    let smArray = new SmArray()
    this.forEach(element => {
      let elementSiblings = new SmArray(element).siblings(expr)
      let nextElement = element['nextSibling']
      while (nextElement) {
        if (nextElement.nodeType === 1 && elementSiblings.indexOf(nextElement) !== -1) {
          smArray.push(nextElement)
        }
        nextElement = nextElement['nextSibling']
      }
    })
    return smArray._uniq()
  }
  // 过滤已选元素
  filter (expr) {
    if (expr) {
      // 如果传的是function则认为是调用Array的原生过滤方法
      if (typeof expr === 'function') {
        return super.filter(...arguments)
      }
      let smArray = new SmArray()
      this.forEach(element => {
        let exprElementSiblings = new SmArray(element).siblings(expr)
        if (exprElementSiblings.indexOf(element) !== -1) {
          smArray.push(element)
        }
      })
      return smArray
    }
    return this
  }
  first () {
    if (this.length) {
      return new SmArray(this[0])
    }
    return this
  }
  firstElement () {
    return this.length ? this[0] : null
  }
  last () {
    if (this.length) {
      return new SmArray(this[this.length - 1])
    }
    return this
  }
  lastElement () {
    return this.length ? this[this.length - 1] : null
  }
  // 删除元素
  ////////////////////////////////////////////////////////////////////
  //    事件操作相关
  ////////////////////////////////////////////////////////////////////
  on (event, listener, useCapture = false) {
    this.forEach(element => {
      if(element.addEventListener) {
        element.addEventListener(event, listener, useCapture)
      } else if (element['attachEvent']) {
        element['attachEvent'](`on${event}`, listener)
      }else{
        element[`on${event}`] = listener
      }
    })
    return this
  }
  off (event, listener, useCapture = false) {
    this.forEach(element => {
      if( element.removeEventListener ){
        element.removeEventListener(event, listener, useCapture)
      } else if (element['detachEvent']) {
        element['detachEvent'](`on${event}`, listener)
      }else {
        element[`on${event}`] = null
      }
    })
    return this
  }
  one (event, listener, useCapture= false) {
    this.on(event, function oneFunc (e) {
      listener(...arguments)
      new SmArray(e.target).off(event, oneFunc, useCapture)
    }, useCapture)
    return this
  }
  trigger (event) {
    let myEvent = event instanceof Event ? event : new Event(event)
    this.forEach(element => {
      element.dispatchEvent(myEvent)
    })
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
    let smArray = this.filter(`.${beforeClassName}`)
    smArray._operateClass('remove', beforeClassName)
    smArray._operateClass('add', afterClassName)
    return smArray
  }
  static getViewportSize () {
    let pageWidth = window.innerWidth
    let pageHeight = window.innerHeight
    if (typeof pageWidth !== 'number') {
      if (document.compatMode === 'CSS1Compat') {  //标准模式下
        pageWidth = document.documentElement.clientWidth
        pageHeight = document.documentElement.clientHeight
      } else {  //混杂模式下
        pageWidth = document.body.clientWidth
        pageHeight = document.body.clientHeight
      }
    }
    return { width: pageWidth, height: pageHeight }
  }
  // 在视口可见 overlapOffset 重合度： 10 -> 重合10px认为可见
  inViewport (overlapOffset = 0) {
    return super.filter(element => {
      // getBoundingClientRect用于获取某个元素相对于视窗的位置集合。集合中有top, right, bottom, left等属性。
      let elementRectObject = element.getBoundingClientRect()
      let viewportSize = SmArray.getViewportSize()
      // 元素右边到视口左边的距离 >= overlapOffset 并且 元素左边到视口右边的距离 <= overlapOffset
      let horizontalVisible = (elementRectObject.right >= overlapOffset) && (elementRectObject.left - viewportSize.width <= -1 * overlapOffset)
      // 元素底边到视口上边的距离 >= overlapOffset 并且 元素上边到视口底边的距离 <= overlapOffset
      let vertsmalVisible = (elementRectObject.bottom >= overlapOffset) && (elementRectObject.top - viewportSize.height <= -1 * overlapOffset)
      // 同时满足见及认为元素可见
      // console.log(element, elementRectObject, viewportSize, horizontalVisible, vertsmalVisible)
      return horizontalVisible && vertsmalVisible
    })
  }
  // watchVisible: className, overlapOffset: 重合度： 10 -> 重合10px认为可见
  inViewportAddClass (visibleClassName, overlapOffset = 0) {
    // let parentsOverflowAutoSmArray = this.parents().filter(element => {
    //   return /auto/.test(new SmArray(element).css('overflow'))
    // })
    let onScroll = () => {
      let inViewportSmArray = this.inViewport(overlapOffset)
      inViewportSmArray.addClass(visibleClassName)
      // 全部可见后，移除滚动监听
      if (this.filter(item => item.classList.contains(visibleClassName)).length === this.length) {
        // parentsOverflowAutoSmArray.forEach(element => {
        //   element.removeEventListener('scroll', onScroll)
        // })
        document.removeEventListener('scroll', onscroll, true)
      }
    }
    // parentsOverflowAutoSmArray.forEach(element => {
    //   element.addEventListener('scroll', onScroll)
    // })
    // capture: true 必须，可以监听到内部所有元素的滚动
    document.addEventListener('scroll', onScroll, true)
    // 默认立即检测一次在视图的dom
    onScroll()
    return this
  }
  // 获取或设置样式
  css (name, value) {
    if (value) { // 样式设置
      this.forEach(element => {
        setStyle(element, name, value)
      })
      return this
    } else { // 样式读取
      if (this.length) {
        let computedStyle = getStyle(this[0])
        if (name === 'float') {
          return computedStyle['cssFloat'] || computedStyle['styleFloat']
        } else if (name) {
          return computedStyle[name]
        } else {
          return computedStyle
        }
      }
    }
    return null
    // 获得样式
    function getStyle(elem) {
      return elem['currentStyle'] || document.defaultView && document.defaultView.getComputedStyle && document.defaultView.getComputedStyle(elem, false) || elem.style
    }
    // 设置样式
    //element:需要设置样式的目标元素;name:样式属性;value:设置值
    function setStyle(element, name, value) {
      if (name != "float") {
        element.style[name] = value;
      } else {
        element.style["cssFloat"] = value;
        element.style["styleFloat"] = value;
      }
    }
  }
  // 获取或设置dom属性
  attr (attribute, value){
    if (value) {
      this.forEach(function (el) {
        el.setAttribute(attribute, value)
      })
      return this
    } else if (this.length) {
      return this[0].getAttribute(attribute)
    }
    return null
  }
  // 获取或设置dom中data-*的值
  dataset (key, value){
    if (value) {
      this.forEach(function (el) {
        el.dataset[key] = value
      })
      return this
    } else if (this.length) {
      let dataset = this[0].dataset
      return key ? dataset[key] : dataset
    }
    return null
  }
}
export default SmArray
