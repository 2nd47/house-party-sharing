var mongoose = require('mongoose');

module.exports = function() {
  var dbUri = process.env.MONGODB_URI || 'mongodb://localhost/appdb';
  mongoose.Promise = global.Promise;
  mongoose.connect(dbUri, {
      server: {
          auto_reconnect: true,
          socketOptions: {
              keepAlive: 1
          }
      }
  });
  var db = mongoose.connection;
  db.once("open", function() {
    console.log('MongoDB connection opened to ' + dbUri);
  });
  db.on("error", console.error.bind(console, 'DATABASE ERROR:'));
  db.collections['users'].drop(function(err){
    console.log('users collection dropped');
  });
}
