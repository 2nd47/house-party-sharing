var mongoose = require('mongoose')
  , findOrCreate = require('mongoose-findorcreate')
  , bcrypt = require('bcryptjs')
  , shortid = require('shortid')
  , helpers = require('./modelHelpers')
  , Listing = require('./listing')
  , Schema = mongoose.Schema
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
  passwordHash: {
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
    required: true
  },
  listings: [{
    type: Listing,
    default: []
  }]
}, { collection : 'users', timestamps: true });

// Hash passwords before storing them in the database
user.pre('save', function(next) {
  if (!this.isModified('password')) return next();

  bcrypt.genSalt(SALT_ROUNDS, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(this.password, salt, function(err, hash) {
      if (err) return next(err);

      this.password = hash;
      next();
    });
  });

});

user.statics.findByUsername =
  helpers.finderForProperty("username", { findOne: true, caseInsensitive: true });

user.methods.validPassword =  function(password) {
  // Change to async when possible
  return bcrypt.compareSync(password, this.passwordHash);
}

user.plugin(findOrCreate);

module.exports = mongoose.model('User', user);
