var rewire = require('rewire'),
    Vigilia = rewire('../lib/vigilia');

describe("vigilia", function() {
  it("should thrown an error when the pattern option is missing", function() {
    var vigilia = function() {
      return new Vigilia(undefined, 'command option');
    };

    expect(vigilia).toThrow();
  });

  it("should thrown an error when the command option is missing", function() {
    var vigilia = function() {
      return new Vigilia('pattern', undefined);
    };

    expect(vigilia).toThrow();
  });

  it("should start watching with the given pattern", function(done) {
    var Gaze = function(pattern) {
      expect(pattern).toBe('pattern');
      done();
    };

    Vigilia.__set__('Gaze', Gaze);
    new Vigilia('pattern', 'command option').start();
  });

  it("should run the given command when something changes in the given pattern", function(done) {
    var Gaze,
        spawn,
        vigilia;

    Gaze = function(pattern) {
      this.on = function(event, callback) {
        callback();
      };
    };

    spawn = function(command, args, options) {
      expect(command).toBe('sh');
      expect(args).toEqual(['-c', 'command option']);

      done();
    };

    Vigilia.__set__('Gaze', Gaze);
    Vigilia.__set__('spawn', spawn);

    new Vigilia('pattern', 'command option').start();
  });
});
