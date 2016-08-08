var fs = require('fs');

module.exports = function() {

  // From https://blog.raananweber.com/2015/12/15/check-if-a-directory-exists-in-node-js/
  //function will check if a directory exists, and create it if it doesn't
  this.mkdirIfNotExist = function(directory, callback) {
    fs.stat(directory, function(err, stats) {
      //Check if error defined and the error code is "not exists"
      if (err && err.code == 'ENOENT') {
        //Create the directory, call the callback.
        fs.mkdir(directory, callback);
      } else {
        //just in case there was a different error:
        callback(err)
      }
    });
  }

  return this;
}
