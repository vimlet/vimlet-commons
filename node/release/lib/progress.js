
exports.showProgress() = function (value, total) {

    if(value && total) {
      value = Math.ceil((value * 100) / total);
    }

   console.log(value + "%");    

}
