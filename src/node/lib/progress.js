var util = require("./util.js");

exports.paintSimple = false;

exports.paintProgress = function (value, outputHandler) {

  if (exports.paintSimple) {
    util.output(value + "%", outputHandler);
  } else {
    var bar = "";
    var max = 50;
    var progress = Math.floor(value * max / 100);

    for (var index = 0; index < progress; index++) {
      bar += "=";
    }

    for (var index = 0; index < max - progress; index++) {
      bar += "-";
    }

    util.output("[" + bar + "] " + value + "%\r", outputHandler);

    if (value == 100) {
      util.output("\n", outputHandler);
    }
  }
};

exports.showProgress = function (value, total, paintProgress, outputHandler) {
  if (value && total) {
    value = calcPercent(value, total);
  }

  if (value > 0 && value <= 100) {
    if (paintProgress) {
      paintProgress(value, outputHandler);
    } else {
      exports.paintProgress(value, outputHandler);
    }

    return value;
  }

  return -1;
};

exports.progressHandler = function (total, max, paintProgress, outputHandler) {
  var handlerObject = {
    total: total,
    max: max,
    progress: -1,
    paintProgress: paintProgress,
    showProgressChange: function (value, total, paintProgress, outputHandler) {
      if (!total) {
        total = this.total;
      }

      if (!this.max) {
        this.max = 100;
      }

      if (!this.paintProgress) {
        this.paintProgress = paintProgress ? paintProgress : exports.paintProgress;
      }

      var percent = calcPercent(value, total);

      if (this.progress != percent && percent <= max) {
        this.progress = percent;
        return exports.showProgress(this.progress, null, this.paintProgress, outputHandler);
      }
    },
    showProgress: function (value, total, paintProgress, outputHandler) {
      if (!this.paintProgress) { 
        this.paintProgress = paintProgress ? paintProgress : exports.paintProgress;
      }

      return exports.showProgress(value, total, this.paintProgress, outputHandler);
    }
  };

  return handlerObject;
};

function calcPercent(value, total) {
  return Math.ceil(value * 100 / total);
}