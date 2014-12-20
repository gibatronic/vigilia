#!/usr/bin/env node

var debounce = require('debounce'),
    Gaze = require('gaze').Gaze,
    grab,
    os = require('os'),
    setup,
    spawn = require('child_process').spawn,
    start,
    stop,
    Vigilia,
    vigiliae = [ ];

setup = function() {
  process.on('SIGINT', stop);

  process.argv.slice(2).forEach(function(association, index, associations) {
    association = association.split(':');

    vigiliae.push(new Vigilia(association[0], association[1]));
  });
};

start = function() {
  vigiliae.forEach(function(vigilia, index, vigiliae) {
    vigilia.start();
  });
};

stop = function() {
  vigiliae.forEach(function(vigilia, index, vigiliae) {
    vigilia.stop();
  });

  process.stdout.write(' bye' + os.EOL);
  process.exit(0);
};

Vigilia = function(pattern, command) {
  this.command = command || null;
  this.pattern = pattern || null;
  this.watcher = null;

  if (!this.command) {
    throw new Error('no command was given to vigilia');
  }

  if (!this.pattern) {
    throw new Error('no pattern was given to vigilia');
  }
};

Vigilia.prototype = {
  run: function(event, filepath) {
    var action,
        options,
        pattern = /^([^ ]+)\s*(.*)$/;

    command = this.command.replace(pattern, '$1');
    options = this.command.replace(pattern, '$2');

    action = spawn(command, [options], {
      stdio: 'inherit'
    });
  },
 
  start: function() {
    if (this.watcher) {
      return;
    }

    this.watcher = new Gaze(this.pattern, { }, this.started.bind(this));
    this.watcher.on('all', debounce(this.run.bind(this), 200, true));
  },

  started: function() {
    process.stdout.write('vigilia is up and waiting...' + os.EOL);
  },

  stop: function() {
    if (!this.watcher) {
      return;
    }

    this.watcher.close();
    this.watcher = null;
  }
};

setup();
start();