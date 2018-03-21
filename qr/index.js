'use strict'
module.exports = qr

class QRegExp extends RegExp {
  with (flags) {
    let newFlags = this.flags
    flags.split('').forEach(flag => {
      if (newFlags.indexOf(flag) === -1) newFlags += flag
    })
    return new QRegExp(this.source, newFlags)
  }
  concat (arg1) {
    const args = arguments.length === 1 && Array.isArray(arg1) ? arg1 : Array.prototype.slice.call(arguments)
    const all = [this].concat(args)
    const src = all.map(v => strify(v)).join('')
    return new QRegExp(src)
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
      result += strify(val)
    } 
  }
  return new QRegExp(result)
}

qr.join = (joinWith, list) => {
  return new QRegExp(list.map(v => strify(v)).join(joinWith))
}

const flags = ['i', 'g', 'm', 'u', 'y']
const props = {}
const subprops = {}
let activeFlags = ''
flags.forEach(flag => {
  let fn
  eval(`fn = function qr$` + flag + ` () {
      const re = qr.apply(this, arguments)
      return re.with(activeFlags)
    }`)
  props[flag] = {
    get: function () {
      activeFlags = flag
      return fn
    }
  }
  subprops[flag] = {
    get: function () {
      activeFlags += flag
      return this
    }
  }
})

Object.defineProperties(qr, props)
flags.forEach(flag => {
  const theseProps = Object.assign({}, subprops)
  delete theseProps[flag]
  Object.defineProperties(qr[flag], theseProps)
})

function strify (val) {
  if (val == null) val = ''
  if (val instanceof RegExp) {
    return '(?:' + strifyRegexp(val) + ')'
  } else if (Array.isArray(val)) {
    return String(val)
  } else {
    return quotemeta(String(val))
  }
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
