var express = require('express')
  , morgan = require('morgan');

module.exports = function(app, auth, user, listing) {

  // Log all routes
  app.use(morgan('dev'));

  // Set static files and viewing
  app.use(express.static(__dirname + '/public'));
  app.set('view engine', 'jade');
  app.set('views', __dirname + '/views');

  // ROUTES BEGIN HERE
  // Set user local for Jade so we can render the 'Sign In/Out' button properly
  app.use(function(req, res, next) {
    if (req.user) {
      res.locals.user = req.user;
    }
    next();
  });

  // UNAUTHENTICATED ROUTES
  app.get('/', function(req, res, next) {
    res.render('landing');
  });

  app.get('/404', function(req, res, next) {
    res.status(404).render('404');
  });

  app.get('/admin', auth.isLoggedIn, auth.isAdmin, function(req, res, next) {
    res.render('admin');
  });

  app.post('/signup', auth.signup);
  app.post('/login', auth.login);
  app.post('/logout', auth.logout);

  // AUTHENTICATION RULES
  app.all('/:type(api|browse|profile|create)/*', auth.isLoggedIn);
  app.all('/api/admin/*', auth.isAdmin);

  // AUTHENTICATED ROUTES
  app.get('/browse', listing.browsePage);
  app.get('/browse/:listing_shortid', listing.viewOne);

  app.get('/create', auth.isLoggedIn, listing.createPage);

  app.get('/profile/:username', user.profile);

  app.get('/api/listing/getAll', listing.getAll);
  app.post('/api/listing/create', listing.create);
  app.post('/api/listing/:listing_id/purchase', listing.purchase);
  //app.post('/api/listing/:listing_id/edit', listing.editListing);
  app.delete('api/listing/:listing_id', listing.delete);
  //app.post('/api/admin/database/reset', admin.resetDatabase);

};
