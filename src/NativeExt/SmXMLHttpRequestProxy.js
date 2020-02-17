let RealXMLHttpRequest = XMLHttpRequest
function SmXMLHttpRequestProxy () {
  let xhr = new RealXMLHttpRequest()

  // xhr._onreadystatechange = function () {
  //   console.log('native', xhr)
  // }

  xhr.onreadystatechange = function () {
    SmXMLHttpRequestProxy._Proxy && SmXMLHttpRequestProxy._Proxy['onreadystatechange_before'] && SmXMLHttpRequestProxy._Proxy['onreadystatechange_before'].bind(xhr)(xhr, ...arguments)
    xhr['_onreadystatechange'] && xhr['_onreadystatechange'](...arguments)
    SmXMLHttpRequestProxy._Proxy && SmXMLHttpRequestProxy._Proxy['onreadystatechange_after'] && SmXMLHttpRequestProxy._Proxy['onreadystatechange_after'].bind(xhr)(xhr, ...arguments)
  }
  return new Proxy(xhr, {
    get (target, prop) {
      if (typeof target[prop] === 'function') {
        return target[prop].bind(target)
      }
      return target[prop]
    },
    set (target, key, value) {
      if (['onreadystatechange'].indexOf(key) !== -1) {
        return target[`_${key}`] = value
      }
      return target[key] = value
    }
  })
}
SmXMLHttpRequestProxy._Proxy = null
SmXMLHttpRequestProxy.setProxy = function (config) {
  SmXMLHttpRequestProxy._Proxy = config
}

module.exports = SmXMLHttpRequestProxy
