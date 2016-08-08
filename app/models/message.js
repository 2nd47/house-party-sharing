var mongoose = require('mongoose')
  , shortid = require('shortid')
  , Schema = mongoose.Schema
  , ObjectId = mongoose.Schema.Types.ObjectId;

var message = new Schema({
  _shortid: {
    type: String,
    default: shortid.generate,
    unique: true
  },
  sender: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  receiver: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
}, { collection : 'messages', timestamps: true });

if (mongoose.models.Message) {
  module.exports = mongoose.model('Message');
} else {
  module.exports = mongoose.model('Message', message);
}
