var escapeStringRegexp = require("escape-string-regexp");

class Matcher {
  constructor(patterns) {
    this.patterns = patterns || [];
  }

  isPattern(s) {

  }

  isMatch(paths, patterns) {
    var self = this;

    var matches = [];

    if (!patterns || patterns.length === 0) {
      return matches;
    }

    // Allow string and array input
    paths = typeof paths === "string" ? [paths] : paths;
  
    paths.forEach(function (p) {
      if (self.tryPatterns(p, patterns)) {
        matches.push(p);
      }
    });

    return matches;
  }

  tryPatterns(s, patterns) {
    var pattern;
    for (var i = 0; i < patterns.length; i++) {
      pattern = escapeStringRegexp(patterns[i]).replace(/\\\*/g, ".*");
      if (s.match(new RegExp("^" + pattern + "$"))) {
        return true;        
      }
    }
    return false;
  }

}

module.exports = new Matcher();