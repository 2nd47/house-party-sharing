var mongoose = require('mongoose')
  , bcrypt = require('bcryptjs')
  , shortid = require('shortid')
  , helpers = require('./modelHelpers')
  , Message = require('./message')
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
    ref: 'Listing',
    default: []
  }],
  isAdmin: {
    type: Boolean,
    default: false
  },
  avatar: {
    type: String,
    default: '/images/users/placeholder.png'
  },
  location: {
    type: String,
    default: '27 King\'s College Circle, Toronto'
  },
  purchased: [{
    type: ObjectId,
    ref: 'Listing',
    default: []
  }],
  reviewedListings: [{
    type: ObjectId,
    ref: 'Review',
    default: []
  }],
  friends: [{
    type: ObjectId,
    ref: 'User',
    default: []
  }],
  messages: [{
    type: Message,
    default: []
  }]
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

if (mongoose.models.User) {
  module.exports = mongoose.model('User');
} else {
  module.exports = mongoose.model('User', user);
}
