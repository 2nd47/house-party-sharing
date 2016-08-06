var express = require('express')
  , passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , session = require('express-session')
  , expressValidator = require('express-validator')
  , flash = require('connect-flash')
  , cookieParser = require('cookie-parser')
  , bodyParser = require("body-parser")
  , User = require('../models/user');

module.exports = function(app) {

  // Configure app for passport
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(session({
    cookie: { maxAge: 60000 },
    secret: 'supersecretpasswordstring',
    resave: false,
    saveUninitialized: false
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  // Configure app for flash messages
  app.use(flash());

  // Use a local strategy
  passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findByUsername(username, function(err, user) {
        if (err) { return done(err) }
        // Return warning if no user found or incorrect password
        // This is obfuscated to the user for security
        if (!user || !user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect login.'});
        }
        // Login was successful
        return done(null, user);
      });
    }
  ));

  // Serialize and deserialize user based on login session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  this.signup = function(req, res, next) {
    var username = req.body.username
      , password = req.body.password
      , password2 = req.body.password2
      , email = req.body.email
      , email2 = req.body.email2;

      req.assert('username', 'Username required').notEmpty();
      req.assert('password', 'Password required').notEmpty();
      req.assert('password2', 'Passwords do not match').equals(password);
      req.assert('email', 'Valid email required').isEmail();
      req.assert('email2', 'Emails do not match').equals(email);

      var errors = req.validationErrors();

      if (errors) {
        req.flash('signup_fail', 'Incorrect signup information');
      } else {
        var newUser = new User({
          username: username,
          password: password,
          email: email
        });
        newUser.save(function(err, user) {
          if (err) throw err;
          else {
            req.flash('signup_success',
              'Please verify your account to finish registration');
            next();
          }
        });
      }
  }

  // Send user to their profile on successful login
  this.login = function(req, res, next) {
    passport.authenticate('local', {
      successRedirect: '/users/' + req.user.username,
      failureRedirect: '/login'
    });
  }

  this.logout = function(req, res, next) {
    req.logout();
    res.redirect('/');
  }

  // Ensure any API calls have the user logged in
  this.ensureAuthenticated = function(req, res, next) {
    passport.authenticate('basic', {session: false}, function(req, res, next) {
      next();
    });
  }

  return this;
}
