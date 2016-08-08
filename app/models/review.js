var mongoose = require('mongoose')
  , shortid = require('shortid')
  , helpers = require('./modelHelpers')
  , User = require('./user')
  , Listing = require('./listing')
	, Schema = mongoose.Schema
  , ObjectId = mongoose.Schema.Types.ObjectId

var review = new Schema({
  owner: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  itemReviewed: {
    type: ObjectId,
    ref: 'Listing',
    required: true
  },
  text: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  }
}, { collection: 'reviews', timestamps: true });

module.exports = mongoose.model('Review', review);
