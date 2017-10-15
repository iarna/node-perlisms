'use strict'
module.exports = qr

class QRegExp extends RegExp {
  with (flags) {
    return new QRegExp(this.source, this.flags + flags)
  }
}

function qr () {
  const args = Object.assign([], arguments[0].raw)
  const values = [].slice.call(arguments, 1)
  let result = ''
  let lastWordWasValue = false
  while (args.length) {
    const arg = args.shift()
    result += arg

    if (values.length) {
      const val = values.shift()
      if (val == null) val = ''
      if (val instanceof RegExp) {
        result += '(?:' + strifyRegexp(val) + ')'
      } else {
        result += quotemeta(String(val))
      }
    } 
  }
  return new QRegExp(result)
}

function quotemeta (str) {
  return str.replace(/([^A-Za-z_0-9])/g, '\\$1')
}

function strifyRegexp (re) {
  if (re.flags !== '') {
    console.error('Warning: Inlining flags on regular expressions is not supported')
  }
  return re.source
}
