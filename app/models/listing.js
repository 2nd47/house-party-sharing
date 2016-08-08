var mongoose = require('mongoose')
  , shortid = require('shortid')
  , helpers = require('./modelHelpers')
	, Schema = mongoose.Schema
  , ObjectId = mongoose.Schema.Types.ObjectId

var listing = new Schema({
  _shortid: {
    type: String,
    default: shortid.generate,
    unique: true
  },
	name: {
		type: String,
		required: true
	},
  owner: {
    type: ObjectId,
    required: true
  },
	designer: {
		type: String,
		required: true
	},
	price: {
		type: String,
		required: true
	},
	sizing: {
		type: String,
		required: true
	},
	description: {
		type: String,
		default: ""
	},
  display: {
    type: String,
    default: "images/listings/placeholder.png"
  },
	images: [{
		type: String,
		default: []
	}],
  dateFrom: {
    type: String,
    default: Date.now
  },
  dateTo: {
    type: String
  },
  // [latitude, longitude]
  location: [{
    type: Number,
    default: []
  }]
}, { collection : 'listings', timestamps: true });

module.exports = mongoose.model('Listing', listing);
