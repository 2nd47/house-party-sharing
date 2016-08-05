var mongoose = require('mongoose'),
    shortid = require('shortid'),
    helpers = require('./modelHelpers'),
		Schema = mongoose.Schema;

var listing = new Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
	name: {
		type: String,
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
	}]
}, { collection : 'listings', timestamps: true });

module.exports = mongoose.model('Listing', listing);
