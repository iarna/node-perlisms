# @perl/qr

Better regexp literals!

## DESCRIPTION

RegExp literals (`/like this/`) are great.  Except you can't embed other
vars in them.  And if you want to match forward slashses (`/`), you have to
exape them and that's annoying.

RegExp objects (`new RegExp('like this')`) are flexible but
you have to escape your backslashes and that's annoying.

This module aims to give you the best of both worlds.

RegExp literal style syntax but with var embeding and escaping of your vars
when you want them to be while still allowing you to easily compose multiple
regexps together.


```js
const qr = require('@perl/qr')

// returns RegExp objects
qr`abc` // /abc/
qr`abc` instanceof RegExp // true

// qr based regexp literals use the same escaping as ordinary regexp
// literals. No double backslashes
qr`abc\s` // /abc\s/

// You can add flags at the start
qr.i`abc` // /abc/i

// or after the fact:
qr`abc`.with('i') // /abc/i

// all the regexp flags are supported
qr.i.g`abc` // /abc/gi
qr`abc`.with('ig') // /abc/gi

// and in any order
qr.g.i`abc` // /abc/gi
qr`abc`.with('gi') // /abc/gi

// you can embed variables and their value will be matched literally
example = '[foo]'
qr`${example}bar` // /\[foo\]bar/
qr`exam${'.*'}ple` // /exam\.\*ple/

// you can disable escaping by wraping your var in an array
qr`${[example]}bar` // /[foo]bar/

// you can compose regexps and they just work
const example = /foo|baz/
qr`${example}bar` // /(?:foo|baz)bar/

// you can concat regexps together
qr`[foo]`.concat(qr`.*bar`) // /(?:[foo])(?:.*bar)
qr`1`.concat(/2/, /3/) // /(?:1)(?:2)(?:3)
// or concat an array or regexps
qr`1`.concat([/2/, /3/]) // /(?:1)(?:2)(?:3)

// concating non-regexp values gets escaping like embeding:
qr`abc`.concat('.*') // /(?:abc)\.\*/

// You can join a list of regexps, mostly to compose alternations
qr.join('|', [
  qr`[foo]`, 
  qr`/bar`, 
  qr`/baz`
])  // /(?:[foo])|(?:\/bar)|(?:\/baz)/

```

## EXPORT

### qr\`regular expression\` → QRegExp

The qr template string function returns a QRegExp object, as described
below.

### qr._flag_ → Function

Any regular expression flag can be called as a method of `qr`: i, g, m, u, y

### qr.join(joinWith, arrayOfRegExps) → QRegExp

Joins the array of values with the string in `joinWith`.  This is similar to
`Array.prototype.join` except that it applies the usual value interpolation
rules.  Flags are not maintained (and a warning will be issued if any are
set.  Set your flags after joining, eg `qr.join('|', regexpArray).with('gi')`.

### QRegExp

Regular expressions created by `qr` are of the `QRegExp` class, which
inherits from `RegExp`.  It provide the following two additional methods:

#### .with(flags) → QRegExp

Constructs a new RegExp object with `flags` added to the current regexp's
list of flags. Valid values are: i, g, m, u, y

#### .concat(item1, item2, itemn) → QRegExp
#### .concat(arr) → QRegExp

Contatenate the items or array values to the current regexp and return the
new resulting regexp.

## Origins

This is intended to provide the largely same functionality as the
[Perl regexp literals](https://perldoc.perl.org/perlop.html#Regexp-Quote-Like-Operators).

The primary difference from Perl is that embedded vars are escaped unless they're
RegExp objects.
