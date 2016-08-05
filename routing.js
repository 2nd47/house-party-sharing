var express = require('express');

module.exports = function(app) {

  // Set static files and viewing
  app.use(express.static(__dirname + '/public'));
  app.set('view engine', 'jade');
  app.set('views', __dirname + '/views');

  // ROUTES BEGIN HERE
  app.use(function(req, res, next){
    res.status(404);
    res.render('404');
  });

  // UNAUTHENTICATED ROUTES
  app.get('/', function(req, res, next) {

  });
  app.get('/about', function(req, res, next) {

  });
  app.get('/login', auth.login);
  app.get('/logout', auth.logout);
  app.get('/signup', auth.signup);

  // AUTHENTICATED ROUTES
  app.get('/browse', auth.ensureAuthenticated, listing.browse);
  app.get('/create', auth.ensureAuthenticated, listing.create);

  app.use('/api/*', auth.ensureAuthenticated);
  app.get('/api/listing/getAll', listing.getAll);
  app.post('/api/listing/post', listing.createListing);
  app.post('/api/listing/purchase', user.purchaseListing);
  app.delete('api/listing/:listing_id', listing.deleteListing);
};
