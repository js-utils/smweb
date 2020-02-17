let RealXMLHttpRequest = XMLHttpRequest
function IcXMLHttpRequestProxy () {
  let xhr = new RealXMLHttpRequest()

  // xhr._onreadystatechange = function () {
  //   console.log('native', xhr)
  // }

  xhr.onreadystatechange = function () {
    IcXMLHttpRequestProxy._Proxy && IcXMLHttpRequestProxy._Proxy['onreadystatechange_before'] && IcXMLHttpRequestProxy._Proxy['onreadystatechange_before'].bind(xhr)(xhr, ...arguments)
    xhr['_onreadystatechange'] && xhr['_onreadystatechange'](...arguments)
    IcXMLHttpRequestProxy._Proxy && IcXMLHttpRequestProxy._Proxy['onreadystatechange_after'] && IcXMLHttpRequestProxy._Proxy['onreadystatechange_after'].bind(xhr)(xhr, ...arguments)
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
IcXMLHttpRequestProxy._Proxy = null
IcXMLHttpRequestProxy.setProxy = function (config) {
  IcXMLHttpRequestProxy._Proxy = config
}

module.exports = IcXMLHttpRequestProxy
