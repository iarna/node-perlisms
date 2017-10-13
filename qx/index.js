'use strict'
module.exports = qx

const Bluebird = require('bluebird')
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

function qx (str) {
  const cmd = String.raw(str)
  let outDone = defer()
  let imDone = defer()
  let output = []
  let status
console.log(outDone, imDone)
  const child = spawn(cmd, [], {shell: true, stdio: [0, 'pipe', 2]})
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
  return Bluebird.join(outDone.promise, imDone.promise, () => {
    return Buffer.concat(output).toString()
  })
}

qx.sync = function (str) {
  const cmd = String.raw(str)
  const opts = {shell: true, stdio: [0, 'pipe', 2]}
  const result = spawnSync(cmd, [], opts)
  if (result.error) throw result.error
  return result.stdout.toString()
}
