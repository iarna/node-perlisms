# @perl/system

Run a command and capture it's return status.

```js
const system = require('@perl/system')

// run ls -l, dumping output to stdout, returning status code
const status = await system('ls -l')

// also available in synchronous version
const status = system.sync('ls -l')

// and with callbacks
system('ls -l', (err, status) => console.log(`Code: ${status}`))

// or don't pass the command to a shell
const status = await system('ls', ['-l'])

// avoiding the shell without arguments
const status = await system('ls', [])
```

## `system(cmd[, args][, cb]) → Promise(status)`

Without `args`, passes `cmd` to a shell to execute.  We use `cross-spawn` to
do this in a platform compatible manner.  As this is a shell command it's up
to you to quote spaces and escape special characters.

With `args`, `cmd` is called directly and `args` is passed in via OS
facilities (so you don't need to provide quoting or escaping).

## `system.sync(cmd[, args]) → status

As with `system`, synchronous and just returns the status.

## Origins

This is intended to provide the same functionality as the
[Perl system](https://perldoc.perl.org/functions/system.html) function.

In contrast with Perl's system call, this does not currently encode the
signal that killed the process in the return value.
