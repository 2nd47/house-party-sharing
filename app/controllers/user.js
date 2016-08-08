var Listing = require('../models/listing')
  , User = require('../models/user')
  , _ = require('underscore');

module.exports = function(app) {

  this.profile = function(req, res) {
    var username = req.params.username;
    // Find the user by username
    User.findOne({ username: username }).
    select('_id _shortid username name bio listings avatar').
    exec(function(err, user) {
      if (err) { throw err; }
      else {
        // Find all listings associated by this user
        Listing.find({ owner: req.user._id }).
        exec(function(err, listings) {
          console.log('req user friends = ' + req.user.friends);
          var isFriends = _.contains(req.user.friends, user._id);
          if (err) { throw err; }
          else {
            res.render('profile', {
              user: user,
              listings: listings,
              isFriends: isFriends
            });
          }
        });
      }
    });
  }

  this.addFriend = function(req, res) {
    User.findById(req.user._id, function(err, user) {
      if (err) { throw err; }
      else {
        User.findByUsername(req.params.username, function(err, userToAdd) {
          if (err) { throw err; }
          else {
            if (!(_.contains(user.friends, userToAdd._id))) {
              user.friends.push(userToAdd._id);
              user.save(function(err, saved) {
                if (err) { throw err; }
                else {
                  res.redirect('/profile/' + req.params.username);
                }
              });
            }
          }
        });
      }
    });
  }

  this.removeFriend = function(req, res) {
    res.redirect('/404');
  }

  return this;
}
