var Listing = require('../models/listing')
  , User = require('../models/user');

module.exports = function(app) {

  this.hardcodeUsers = function() {
    var admin = new User({});
    admin.username = 'admin';
    admin.password = 'admin';
    admin.email = 'admin@admin.com';
    admin.isAdmin = true;

    var user = new User({});
    user.username = 'waffles';
    user.password = 'waffles';
    user.email = 'waffles@gmail.com';

    admin.save(function(err, user) {
      if (err) { throw err; }
      else {
        console.log('Created admin account');
      }
    });

    user.save(function(err, user) {
      if (err) { throw err; }
      else {
        console.log('Created user account')
      }
    });
  }

  this.profile = function(req, res, next) {
    res.render('/')
  }

  return this;
}
