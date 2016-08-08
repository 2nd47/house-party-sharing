var mongoose = require('mongoose')
  , bcrypt = require('bcryptjs')
  , shortid = require('shortid')
  , helpers = require('./modelHelpers')
  , Listing = require('./listing')
  , Schema = mongoose.Schema
  , ObjectId = mongoose.Schema.Types.ObjectId
  , SALT_ROUNDS = 10;

var user = new Schema({
  _shortid: {
    type: String,
    default: shortid.generate,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  name: {
    type: String,
  },
  bio: {
    type: String
  },
  listings: [{
    type: ObjectId,
    default: []
  }],
  isAdmin: {
    type: Boolean,
    default: false
  },
  avatar: {
    type: String,
    default: "/images/users/placeholder.png"
  }
}, { collection : 'users', timestamps: true });

// Hash passwords before storing them in the database
user.pre('save', function(next) {
  var newUser = this;
  if (!newUser.isModified('password')) return next();

  bcrypt.genSalt(SALT_ROUNDS, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(newUser.password, salt, function(err, hash) {
      if (err) return next(err);

      newUser.password = hash;
      next();
    });
  });
});

user.statics.findByUsername =
  helpers.finderForProperty("username", { findOne: true, caseInsensitive: true });

user.methods.validPassword =  function(cadidatePass) {
  // Change to async when possible
  return bcrypt.compareSync(cadidatePass, this.password);
}

module.exports = mongoose.model('User', user);
