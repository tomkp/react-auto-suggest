#!/usr/bin/env node

var mochify = require('mochify');
var istanbul = require('mochify-istanbul');

mochify('./test/*.js', {
  reporter: 'spec',
  transform: ['babelify']
}).plugin(istanbul, {
  report: ['lcovonly']
}).bundle();