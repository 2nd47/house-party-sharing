var Listing = require('../models/listing')
  , User = require('../models/user');

module.exports = function(app) {

  this.browsePage = function(req, res) {
    var pageNum = 1;
    var resultsPerPage = 10;
    Listing.find().
    select('_shortid name designer price sizing display').
    sort('-createdAt').
    skip((pageNum - 1) * resultsPerPage).
    limit(resultsPerPage).
    exec(function(err, listings) {
      if (err) { throw err; }
      else {
        console.log(listings);
        res.render('browse', { listings: listings })
      }
    });
  }

  this.createPage = function(req, res) {
    res.render('create');
  }

  this.create = function(req, res) {
    var listing = new Listing();
    listing.owner = req.user._id;
    listing.name = req.body.name;
    listing.designer = req.body.designer;
    listing.price = req.body.price;
    listing.sizing = req.body.sizing;
    listing.description = req.body.description;
    listing.dateFrom = req.body.dateFrom;
    listing.dateTo = req.body.dateTo;

    listing.save(function(err, saved) {
      if (err) { throw err; }
      else {
        console.log('Listing created with name: ' + listing.name);
        res.redirect('/browse/' + listing._shortid);
      }
    });
  }

  this.purchase = function(req, res) {
    res.redirect('/404');
  }

  this.edit = function(req, res) {
    res.redirect('/404');
  }

  this.delete = function(req, res) {
    res.redirect('/404');
  }

  this.getAll = function(req, res) {
    res.redirect('/404');
  }

  this.viewOne = function(req, res) {
    Listing.findOne({ _shortid : req.params.listing_shortid },
    function (err, listing ) {
      if (err) { throw err; }
      res.render('listing', { listing: listing });
    });
  }

  return this;
}
