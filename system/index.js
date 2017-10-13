'use strict'
module.exports = system

const Bluebird = require('bluebird')
const spawn = require('cross-spawn')
const spawnSync = require('cross-spawn').sync

function system (cmd, args, userOpts, cb) {
  if (args instanceof Function) {
    cb = args
    args = userOpts = null
  } else if (userOpts instanceof Function) {
    cb = userOpts
    userOpts = null
  }
  const opts = Object.assign({stdio: [0, 1, 2]}, userOpts || {})
  let child
  if (Array.isArray(args)) {
    child = spawn(cmd, args, opts)
  } else {
    opts.shell = true
    child = spawn(cmd, [], opts)
  }
  return (new Bluebird((resolve, reject) => {
    let amDone = false
    child.on('error', err => setImmediate(() => reject(err)))
    child.on('exit', code => {
      if (code !== null) {
        resolve(code)
      } else {
        setImmediate(() => resolve())
      }
    })
  })).asCallback(cb)
}

system.sync = (cmd, args, userOpts) => {
  const opts = Object.assign({stdio: [0, 1, 2]}, userOpts || {})
  let result
  if (Array.isArray(args)) {
    result = spawnSync(cmd, args, opts)
  } else {
    opts.shell = true
    result = spawnSync(cmd, [], opts)
  }
  if (result.error) throw result.error
  return result.status
}
