var mongoose = require('mongoose'),
    helpers = require('./modelHelpers'),
    shortid = require('shortid'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

var user = new Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  username: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
}, { collection : 'users', timestamps: true });

user.statics.findByUsername =
  helpers.finderForProperty("username", { findOne: true, caseInsensitive: true });

module.exports = mongoose.model('User', user);
