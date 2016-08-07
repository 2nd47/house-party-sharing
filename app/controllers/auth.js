var express = require('express')
  , util = require('util')
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

  app.use(expressValidator());

  app.use(session({
    secret: 'supersecretpasswordstring',
    resave: false,
    saveUninitialized: false
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  // Configure app for flash messages
  app.use(flash());

  // Use a local strategy for login
  passport.use('local-login', new LocalStrategy({
    passReqToCallback: true
  },
  function(req, username, password, done) {
      User.findByUsername(username, function(err, user) {
        if (err) { return done(err) }
        // Return warning if no user found or incorrect password
        // This is obfuscated to the user for security
        if (!user || !user.validPassword(password)) {
          return done(null, false,
            req.flash('loginMessage', 'Incorrect login.'));
        } else {
          // Login was successful
          return done(null, user);
        }
      });
    }
  ));

  // Use a local strategy for signup
  passport.use('local-signup', new LocalStrategy({
    passReqToCallback: true
  },
  function(req, username, password, done) {

    // Verify fields
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

    // Send back any errors
    var errors = req.validationErrors();

    if (errors) {
      console.log('errors are: ' + util.inspect(errors));
      req.flash('signup_fail', 'Incorrect signup information');
      return done(errors);
    }

    // Verify available username and save
    User.findByUsername(username, function(err, found) {
      if (err) { return done(err); }
      if (found) {
        return done(null, false, req.flash('signupMessage', 'Username taken'));
      } else {
        var newUser = new User();
        newUser.username = username;
        newUser.password = password;
        newUser.email = req.body.email;

        newUser.save(function(err) {
          if (err) { throw err; }
          else {
            return done(null, newUser);
          }
        });
      }
    });
  }));

  // Serialize and deserialize user based on login session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  this.signup = passport.authenticate('local-signup', {
    successRedirect: '/browse',
    failureRedirect: '/404',
    failureFlash: true
  });

  // Send user to their profile on successful login
  this.login = passport.authenticate('local-login', {
    successRedirect: '/browse',
    failureRedirect: '/404'
  });

  this.logout = function(req, res, next) {
    req.logout();
    res.redirect('/');
  }

  // Ensure any API calls have the user logged in
  this.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect('/');
    }
  }

  return this;
}
