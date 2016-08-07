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
		type: Number,
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
	picturePaths: [{
		type: String,
		default: []
	}],
  dateFrom: {
    type: Date,
    default: Date.now
  },
  dateTo: {
    type: Date
  }
}, { collection : 'listings', timestamps: true });

module.exports = mongoose.model('Listing', listing);
