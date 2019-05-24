# @perl/sleep

Async (promise) and sync(!) sleep for Node.js

## SUMMARY

```javascript
const sleep = require('@perl/sleep')

await sleep(1.5) // sleep for 1.5 seconds
```
```javascript
const sleep = require('@perl/sleep').sync

sleep(1.5) // sleep for 1.5 seconds, BLOCKING
```

## DETAILS

The async/promise based sleep is a simple wrapper around `setTimeout` and will work as you expect and is exactly as (in)accurate.

The sync based sleep is built on `spawnSync` and may be less accurate for
very small values as it _is_ spawning a subshell.  This is slightly less
accurate than the async sleep, on my system it runs long by 15-20ms on the
first call, 5ms on later calls.
