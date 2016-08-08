var User = require('../models/user')
  , Listing = require('../models/Listing');

module.exports = function(app) {

  this.resetDatabase = function(req, res) {
    User.find().remove(function(err) {
      if (err) { throw err; }
      Listing.find().remove(function(err) {
        if (err) { throw err; }
        console.log('All databases dropped!');
        hardcodeUsers(function() {
          console.log('Created both test accounts!');
        });
      })
    })
  }

  this.hardcodeUsers = function(cb) {
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
        console.log('Created admin account!');
        user.save(function(err, user) {
          if (err) { throw err; }
          else {
            console.log('Created user account!');
            cb();
          }
        });
      }
    });
  }

  return this;
}
