var mongoose = require('mongoose'),
    shortid = require('shortid'),
    helpers = require('./modelHelpers'),
    Listing = require('./listing'),
    Schema = mongoose.Schema;

var user = new Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  username: {
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

user.statics.findByUsername =
  helpers.finderForProperty("username", { findOne: true, caseInsensitive: true });

module.exports = mongoose.model('User', user);
