#!/usr/bin/env node

var bind,
    grab,
    options = [ ],
    parse,
    start,
    stop,
    watch = require('watch');

bind = function() {
  process.on('SIGINT', stop);
};

grab = function() {
  process.argv.slice(2).forEach(parse);
};

parse = function(association, index, associations) {
  var option = { };

  association = association.split(':');

  console.log(association);
};

start = function() {

};

stop = function() {

};

grab();
bind();
start();
