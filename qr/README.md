# @perl/qr

Better regexp literals!

```js
const qr = require('@perl/qr')

// returns RegExp objects
qr`abc`.test('123abcdef') // true
const matches = 'this is a test'.match(qr`is\s*`) // matches[1] === 'is '

// regexp literals don't need backslash escaping
qr`abc\s` // /abc\s/

// add flags:
qr.i`abc`.test('123ABCDEF') // true

// or after the fact:
qr`abc`.with('i').test('123ABCDEF') // true

// with more than one
qr.i.g`abc` // /abc/gi
qr`abc`.with('ig') // /abc/gi

// in any order
qr.g.i`abc` // /abc/gi
qr`abc`.with('gi') // /abc/gi

// embeded variables get escaped
const foo = '[foo]'
console.log(qr`${foo}bar`) // /\[foo]bar/

qr`exam${'\s\s'}ple` // equivalent of Perl qr/exam\Q\s\s\Eple/

// embeded regexps are not escaped
const foo = /[foo]/
console.log(qr`${foo}bar`) // /[foo]bar/

```

## DESCRIPTION

RegExp literals (`/like this/`) are great.  Except you can't embed other
vars in them.  RegExp objects (`new RegExp('like this')`) are flexible but
you have to escape your backslashes and that's annoying.

This gives you the best of both worlds.  RegExp literal style syntax but
with var embeding and escaping of your vars when you want them to be while
still allowing you to easily compose multiple regexps together.

## Origins

This is intended to provide the largely same functionality as the
[Perl regexp literals](https://perldoc.perl.org/perlop.html#Regexp-Quote-Like-Operators).

The primary difference from Perl is that embedded vars are escaped unless they're
RegExp objects.
