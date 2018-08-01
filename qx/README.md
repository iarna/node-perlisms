# @perl/qx

Run a command and capture its return status.

```js
const qx = require('@perl/qx')

// capture the output from `ls -l`
const output = await qx`ls -l`

// with promises
qx`ls -l`.then(output => console.log(output))

// also available in synchronous version
const output = qx.sync`ls -l`

```

## Origins

This is intended to provide the same functionality as the
[Perl qx](https://perldoc.perl.org/perlop.html#Quote-Like-Operators) syntax.
