var express = require('express');

module.exports = function(app, view, auth) {

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
    res.redirect('/');
  });
  app.get('/about', function(req, res, next) {
    res.redirect('/');
  });

  app.get('/signup', function(req, res, next) {
    res.redirect('/');
  });

  app.get('/login', function(req, res, next) {
    res.redirect('/');
  });

  app.get('/logout', function(req, res, next) {
    res.redirect('/');
  });

  app.post('/signup', auth.signup);
  app.post('/login', auth.login);
  app.post('/logout', auth.logout);

  /*
  // AUTHENTICATED ROUTES
  app.get('/browse', auth.ensureAuthenticated, listing.browse);
  app.get('/create', auth.ensureAuthenticated, listing.create);

  app.all('/api/*', auth.ensureAuthenticated);
  app.get('/api/listing/getAll', listing.getAll);
  app.post('/api/listing/post', listing.saveListing);
  app.post('/api/listing/purchase', user.purchaseListing);
  app.delete('api/listing/:listing_id', listing.deleteListing);
  */

};
