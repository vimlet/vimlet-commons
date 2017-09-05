exports.paintProgress = function (value) {
  console.log(value + "%");
};

exports.showProgress = function (value, total) {

  if (value && total) {
    value = calcPercent(value, total);
  }

  if (value > 0 && value <= 100) {

    exports.paintProgress(value);
    return value;

  }

  return -1;

};


exports.progressHandler = function (total, max) {

  var handlerObject = {
    total: total,
    max: max,
    progress: -1,
    showProgressChange: function (value, total) {

      if (!total) {
        total = this.total;
      }
      
      if(!this.max) {
        this.max = 100;
      }

      var percent = calcPercent(value, total);

      if (this.progress != percent && percent <= max) {

        this.progress = percent;
        return exports.showProgress(this.progress);

      }

    },
    showProgress: exports.showProgress
  };

  return handlerObject;

};

function calcPercent(value, total) {
  return Math.ceil((value * 100) / total);
}

