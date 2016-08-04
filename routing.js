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
};
