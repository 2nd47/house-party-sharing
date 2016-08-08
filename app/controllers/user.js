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
    var username = req.params.username;
    // Find the user by username
    User.findOne({ username: username }).
    select({
      username: 1,
      name: 1,
      bio: 1,
      listings: 1,
      avatar: 1
    }).
    exec(function(err, user) {
      if (err) { throw err; }
      else {
        // Find all listings associated by this user
        Listing.find({ owner: user._id }).
        select('-owner').
        exec(function(err, listings) {
          if (err) { throw err; }
          else {
            res.render('profile', { user: user, listings: listings });
          }
        });
      }
    });
  }

  return this;
}
