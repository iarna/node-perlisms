const spawnSync = require('child_process').spawnSync
module.exports = time => new Promise(resolve => setTimeout(resolve, time * 1000))
module.exports.sync = time => {
  spawnSync(
    process.execPath, 
    ['-e', `setTimeout(()=>{}, ${time * 1000})`],
    {
      timeout: time * 1000,
      killSignal: 15,
      maxBuffer: 1,
      windowsHide: true
    }
  )
}
