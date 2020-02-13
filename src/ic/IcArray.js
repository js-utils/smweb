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
  /**
   * @param expr: string
   * @returns icArray
   */
  find (expr) {
    /* #if icNote === 'exist' */
    this.find.icDesc = '查询所有子孙节点,默认查询所有'
    /* #endif */
    expr = expr || '*'
    this.forEach((element) => {
      this._query(expr, element)
    })
    return this
  }
  findOne (expr) {
    /* #if icNote === 'exist' */
    this.findOne.icDesc = '查询所有子孙节点中的第一个'
    /* #endif */
    this.forEach(function (element) {
      this._query(expr, element, true)
    })
    return this
  }
}
module.exports = IcArray
