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
      // 如果传的是function则认为是调用Array的原生过滤方法
      if (typeof expr === 'function') {
        return super.filter(...arguments)
      }
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
      new IcArray(e.target).off(event, oneFunc, useCapture)
    }, useCapture)
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
    icArray._operateClass('remove', beforeClassName)
    icArray._operateClass('add', afterClassName)
    return icArray
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
      let viewportSize = IcArray.getViewportSize()
      // 元素右边到视口左边的距离 >= overlapOffset 并且 元素左边到视口右边的距离 <= overlapOffset
      let horizontalVisible = (elementRectObject.right >= overlapOffset) && (elementRectObject.left - viewportSize.width <= -1 * overlapOffset)
      // 元素底边到视口上边的距离 >= overlapOffset 并且 元素上边到视口底边的距离 <= overlapOffset
      let verticalVisible = (elementRectObject.bottom >= overlapOffset) && (elementRectObject.top - viewportSize.height <= -1 * overlapOffset)
      // 同时满足见及认为元素可见
      // console.log(element, elementRectObject, viewportSize, horizontalVisible, verticalVisible)
      return horizontalVisible && verticalVisible
    })
  }
  // watchVisible: className, overlapOffset: 重合度： 10 -> 重合10px认为可见
  inViewportAddClass (visibleClassName, overlapOffset = 0) {
    let parentsOverflowAutoIcArray = this.parents().filter(element => {
      return /auto/.test(new IcArray(element).css('overflow'))
    })
    let onScroll = () => {
      let inViewportIcArray = this.inViewport(overlapOffset)
      inViewportIcArray.addClass(visibleClassName)
      // 全部可见后，移除滚动监听
      if (this.filter(item => item.classList.contains(visibleClassName)).length === this.length) {
        parentsOverflowAutoIcArray.forEach(element => {
          element.removeEventListener('scroll', onScroll)
        })
      }
    }
    parentsOverflowAutoIcArray.forEach(element => {
      element.addEventListener('scroll', onScroll)
    })
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
module.exports = IcArray
