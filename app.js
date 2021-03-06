var startServer = function(testServer) {
  // server modules
  var app = require('express')();

  // Environment variables
  var APP_PORT = process.env.APP_PORT || 3002;

  // require necessary modules and establish routing
  var auth = require('./app/controllers/auth')(app)
    , admin = require('./app/controllers/admin')(app)
    , user = require('./app/controllers/user')(app)
    , listing = require('./app/controllers/listing')(app)
    , search = require('./app/controllers/search')(app)
    , routing = require('./routing')(app, auth, admin, user, listing, search);

  /* admin.hardcodeUsers(function() {
    console.log('Created both test accounts!');
  }); */

  /*app.use(function(req, res, next){
    res.status(404);

    // respond with html page
    if (req.accepts('html')) {
      res.render('404');
      return;
    }

    // respond with json
    if (req.accepts('json')) {
      res.send({ error: 'Not found' });
      return;
    }

    // default to plain-text. send()
    res.type('txt').send('Not found');
  });*/

  var db = require('./db')();

  app.listen(APP_PORT);
  console.log('Server listening on port ' + APP_PORT);
}

if (require.main === module) {
  startServer();
} else {
  module.exports = startServer;
}
