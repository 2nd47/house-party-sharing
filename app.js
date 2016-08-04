var startServer = function(testServer) {
  // server modules
  var app = require('express')();

  // Environment variables
  var APP_PORT = process.env.APP_PORT || 3002;

  // require necessary modules and establish routing
  var User = require('./app/models/user'),
      routing = require('./routing')(app);

  app.listen(APP_PORT);
  console.log('Server listening on port ' + APP_PORT);
}

if (require.main === module) {
  startServer();
} else {
  module.exports = startServer;
}