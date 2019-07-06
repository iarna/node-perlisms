'use strict'
module.exports = qx

const spawn = require('cross-spawn')
const spawnSync = require('cross-spawn').sync

function defer () {
  let resolve, reject
  const promise = new Promise(function () {
    resolve = arguments[0]
    reject = arguments[1]
  })
  return {
    resolve: resolve,
    reject: reject,
    promise: promise
  }
}

function qx () {
  let cmd
  let args
  let shell
  if (arguments[0].raw) {
    cmd = String.raw.apply(this, arguments)
    args = []
    shell = true
  } else {
    args = Array.prototype.slice.apply(arguments)
    cmd = args.shift()
    shell = false
  }
  let outDone = defer()
  let imDone = defer()
  let output = []
  let status
  const child = spawn(cmd, args, {shell, stdio: [0, 'pipe', 2]})
  child.on('error', err => setImmediate(() => imDone.reject(err)))
  child.stdout.on('data', chunk => output.push(chunk))
  child.stdout.on('end', () => outDone.resolve())
  child.stdout.on('error', () => outDone.resolve())
  child.on('exit', code => {
    if (code !== null) {
      imDone.resolve()
    } else {
      setImmediate(() => imDone.resolve())
    }
  })
  return Promise.all([outDone.promise, imDone.promise]).then(() => {
    return Buffer.concat(output).toString().trim()
  })
}

qx.sync = function () {
  let cmd
  let args
  let shell
  if (arguments[0].raw) {
    cmd = String.raw.apply(this, arguments)
    args = []
    shell = true
  } else {
    args = Array.prototype.slice.apply(arguments)
    cmd = args.shift()
    shell = false
  }
  const opts = {shell, stdio: [0, 'pipe', 2]}
  const result = spawnSync(cmd, args, opts)
  if (result.error) throw result.error
  return result.stdout.toString().trim()
}
