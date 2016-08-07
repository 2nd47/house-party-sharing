var Listing = require('../models/listing')
  , User = require('../models/user');

module.exports = function(app) {

  this.browse = function(req, res) {
    res.render('browse');
  }

  this.create = function(req, res) {
    res.render('create');
  }

  return this;
}
