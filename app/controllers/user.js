var Listing = require('../models/listing')
  , User = require('../models/user');

module.exports = function(app) {

  this.profile = function(req, res, next) {
    var username = req.params.username;
    // Find the user by username
    User.findOne({ username: username }).
    select('_shortid username name bio listings avatar').
    exec(function(err, user) {
      if (err) { throw err; }
      else {
        // Find all listings associated by this user
        Listing.find({ owner: req.user._id }).
        exec(function(err, listings) {
          if (err) { throw err; }
          else {
            console.log(listings);
            res.render('profile', { user: user, listings: listings });
          }
        });
      }
    });
  }

  this.addFriend = function(req, res, next) {
    res.redirect('/404');
  }

  return this;
}
