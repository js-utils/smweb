export default function fetchImageNetSize (url) {
  let rangeValue = /jpe?g$/i.test(url) && 'bytes=0-209' || /png$/i.test(url) && 'bytes=16-23' || /gif$/i.test(url) && 'bytes=6-9' // png
  if (!rangeValue) {
    throw new Error('不识别的图片类型')
  }
  return fetch(url, {
    method:'get',
    responseType: 'arraybuffer',
    headers: {
      'Range': rangeValue
    }
  }).then(res => {
    return res.arrayBuffer()
  }).then(arraybuffer => {
    if (/png$/i.test(url) && arraybuffer && arraybuffer.byteLength === 8) {
      let [w1, w2, w3, w4, h1, h2, h3, h4] = new Uint8Array(arraybuffer)
      return { width: (w1 << 24) + (w2 << 16) + (w3 << 8) + w4, height: (h1 << 24) + (h2 << 16) + (h3 << 8) + h4 }
    } else if (/jpe?g$/i.test(url) && arraybuffer && arraybuffer.byteLength > 0x58) {
      let uint8Array = new Uint8Array(arraybuffer)
      if (arraybuffer.byteLength < 210) { // 肯定只有一个DQT字段
        console.log(111)
        let w1 = uint8Array[0x60]
        let w2 = uint8Array[0x61]
        let h1 = uint8Array[0x5e]
        let h2 = uint8Array[0x5f]
        return { width: (w1 << 8) + w2, height: (h1 << 8) + h2 }
      } else { // 两个DQT字段 arraybuffer.byteLength === 210
        if (uint8Array[0x15] === 0xdb) {
          if (uint8Array[0x5a] === 0xdb) { // 两个DQT字段
            let w1 = uint8Array[0xa5]
            let w2 = uint8Array[0xa6]
            let h1 = uint8Array[0xa3]
            let h2 = uint8Array[0xa4]
            return { width: (w1 << 8) + w2, height: (h1 << 8) + h2 }
          } else { // 两个DQT字段
            let w1 = uint8Array[0x60]
            let w2 = uint8Array[0x61]
            let h1 = uint8Array[0x5e]
            let h2 = uint8Array[0x5f]
            return { width: (w1 << 8) + w2, height: (h1 << 8) + h2 }
          }
        }
      }
    } else if (/gif$/i.test(url) && arraybuffer && arraybuffer.byteLength === 4) {
      let [w2, w1, h2, h1] = new Uint8Array(arraybuffer)
      return { width: (w1 << 8) + w2, height: (h1 << 8) + h2 }
    }
    throw new Error('图片获取宽高错误')
  })
}
