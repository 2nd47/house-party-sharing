var Listing = require('../models/listing')
  , Message = require('../models/message')
  , User = require('../models/user')
  , async = require('async')
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
        Listing.find({ owner: user._id }).
        exec(function(err, listings) {
          // Check if this user is your friend
          var isFriends = !(req.user.friends.indexOf(user._id) === -1);
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
    User.findById(req.user._id, function(err, user) {
      if (err) { throw err; }
      else {
        User.findByUsername(req.params.username, function(err, userToRemove) {
          if (err) { throw err; }
          else {
            user.friends = _.reject(user.friends, function(friend) {
              return friend.equals(user._id);
            });
            user.save(function(err, saved) {
              if (err) { throw err; }
              else {
                res.redirect('/profile/' + req.params.username);
              }
            });
          }
        });
      }
    });
  }

  this.getInbox = function(req, res) {
    User.findById(req.user._id, function(err, user) {
      if (err) { throw err; }
      else {
        friends = [];
        async.each(user.friends, function(friendId, callback) {
          User.findById(friendId, function(err, friend) {
            if (err) { callback(err); }
            else {
              friends.push(friend);
              callback();
            }
          });
        }, function(err) {
          if (err) { throw err; }
          res.render('inbox', { friends: friends });
        });
      }
    });
  }

  this.getMessagesFor = function(req, res) {
    // Get the logged in user
    User.findById(req.user._id, function(err, user) {
      if (err) { throw err; }
      else {
        User.findByUsername(req.params.username, function(err, otherUser) {
          if (err) { throw err; }
          else {
            // Filter for just the other user's messages
              Message.find({
                $or : [
                  {
                    sender: user._id,
                    receiver: otherUser._id
                  },
                  {
                    sender: otherUser._id,
                    receiver: user._id
                  }
                ]
              }, function(err, messages) {
                if (err) { throw err; }
                else {
                  res.status(200).json(messages);
                }
              });
          };
        });
      }
    });
  }

  this.sendMessage = function(req, res) {
    // Get the logged in user
    User.findById(req.user._id, function(err, sender) {
      if (err) { throw err; }
      else {
        // Get the user to receive the message
        User.findByUsername(req.params.username, function(err, receiver) {
          if (err) { throw err; }
          else {
            // Create a new message to hold the information
            var newMessage = new Message();
            newMessage.sender = sender._id;
            newMessage.avatar = sender.avatar;
            newMessage.receiver = receiver._id;
            newMessage.text = req.body.message;

            newMessage.save(function(err, message) {
              if (err) { throw err; }
              else {
                // Push the message to the sender and receiver
                async.parallel([
                  function(callback) {
                    sender.messages.push(message._id);
                    sender.save(function(err, user) {
                      if (err) { callback(err, null); }
                      else {
                        callback(null, user);
                      }
                    });
                  },
                  function(callback) {
                    receiver.messages.push(message._id);
                    receiver.save(function(err, user) {
                      if (err) { callback(err, null); }
                      else {
                        callback(null, user);
                      }
                    });
                  }
                ], function(err, results) {
                  if (err) { throw err; }
                  else {
                    res.status(200).json(message);
                  }
                });
              }
            });
          }
        });
      }
    });
  }

  return this;
}
