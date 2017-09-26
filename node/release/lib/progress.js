exports.paintSimple = false;

exports.paintProgress = function (value) {

  if (exports.paintSimple) {
    console.log(value + "%");
  } else {

    var bar = "";
    var max = 50;
    var progress = Math.floor(value * max / 100);

    for (var index = 0; index < progress; index++) {
      bar += "=";
    }

    for (var index = 0; index < (max - progress); index++) {
      bar += "-";
    }

    process.stdout.write("[" + bar + "] " + value + "%\r");

    if (value == 100) {
      process.stdout.write("\n");
    }

  }

};

exports.showProgress = function (value, total, paintProgress) {

  if (value && total) {
    value = calcPercent(value, total);
  }

  if (value > 0 && value <= 100) {

    if (paintProgress) {
      paintProgress(value);
    } else {
      exports.paintProgress(value);
    }

    return value;

  }

  return -1;

};


exports.progressHandler = function (total, max, paintProgress) {

  var handlerObject = {
    total: total,
    max: max,
    progress: -1,
    paintProgress: paintProgress,
    showProgressChange: function (value, total, paintProgress) {

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
        return exports.showProgress(this.progress, null, this.paintProgress);

      }

    },
    showProgress: function (value, total, paintProgress) {

      if (!this.paintProgress) {
        this.paintProgress = paintProgress ? paintProgress : exports.paintProgress;
      }

      return exports.showProgress(value, total, this.paintProgress);

    }
  };

  return handlerObject;

};

function calcPercent(value, total) {
  return Math.ceil((value * 100) / total);
}

