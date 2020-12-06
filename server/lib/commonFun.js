function keyWord(val) {
  let code = val
  var Regx = /^[A-Za-z0-9]*$/
  var Stx = /^[A-Za-z]*$/
  let str = ''
  let isOk = true
  let arr = []
  for (let key of code) {
    if (Regx.test(key)) {
      if (Stx.test(key) && isOk) {
        str += key
        isOk = false
      } else if (Stx.test(key) && !isOk) {
        arr.push(str)
        str = key
      } else {
        str += key
      }
    }
  }
  if (str !== '') {
    arr.push(str)
  }
  return arr
}

module.exports = keyWord