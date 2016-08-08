var mongoose = require('mongoose')
  , shortid = require('shortid')
  , helpers = require('./modelHelpers')
	, Schema = mongoose.Schema
  , ObjectId = mongoose.Schema.Types.ObjectId

var review = new Schema({
  user: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  itemReviewed: {
    type: ObjectId,
    ref: 'Listing',
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  }
}, { collection: 'reviews', timestamps: true });

if (mongoose.models.Review) {
  module.exports = mongoose.model('Review');
} else {
  module.exports = mongoose.model('Review', review);
}
