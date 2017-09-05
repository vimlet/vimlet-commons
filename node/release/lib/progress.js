exports.paintProgress = function (value) {
  console.log(value + "%");
};

exports.showProgress = function (value, total, paintProgress) {

  if (value && total) {
    value = calcPercent(value, total);
  }

  if (value > 0 && value <= 100) {

    if(paintProgress){
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
      
      if(!this.max) {
        this.max = 100;
      }

      if(!this.paintProgress) {
        this.paintProgress = paintProgress ? paintProgress : exports.paintProgress;
      }

      var percent = calcPercent(value, total);

      if (this.progress != percent && percent <= max) {

        this.progress = percent;
        return exports.showProgress(this.progress, null, this.paintProgress);

      }

    },
    showProgress: function (value, total, paintProgress) {

      if(!this.paintProgress) {
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

