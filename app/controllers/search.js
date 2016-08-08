var Listing = require('../models/listing')
  , User = require('../models/user')
  , Review = require('../models/review')
  , validator = require('validator');

module.exports = function(app) {

  this.searchPage = function(req, res) {
    res.render('search');
  }

  this.search = function(req, res) {
    var searchExp = new RegExp(
      '^/.*/' + validator.escape(req.search) + '/.*/$',
      'i'
    );
    Listing.find({
      $or : [
        { name: searchExp },
        { designer: searchExp },
        { price: searchExp },
        { sizing: searchExp },
        { description: searchExp }
      ]
    }, function(err, listings) {
      if (err) { throw err; }
      else {
        res.status(200).json(listings);
      }
    });
  }

  return this;
}
