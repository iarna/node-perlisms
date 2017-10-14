# Perlisms for Node.js

This repository holds a handful of modules that reproduce a number of
extremely convenient features found in the Perl programming language.

Currently found here:

* [qx](qx#readme) — Capture the output from external commands.
* [system](system#readme) — Run external commands when you don't care about their output.
* [qr](qr#readme) — Better RegExp literals!
* [qw](https://github.com/iarna/node-qw#readme) — Quoted word literals, with variable substitution.

I would love to see more—I'm sure I'll write some myself and I would welcome
PRs from others.

As a general rule, commands should be inspired by Perl, and mostly
constrained by the scope of the Perl implementation.  Some changes will
always be necessary to work with the Node.js environment (for example,
providing asynchronous versions that return promises).
