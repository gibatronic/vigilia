var debounce = require('debounce'),
    Gaze = require('gaze').Gaze,
    spawn = require('child_process').spawn,
    Vigilia;

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

    this.watcher = new Gaze(this.pattern);
    this.watcher.on('all', debounce(this.run.bind(this), 200, true));
  },

  stop: function() {
    if (!this.watcher) {
      return;
    }

    this.watcher.close();
    this.watcher = null;
  }
};

module.exports = Vigilia;
