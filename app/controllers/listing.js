var Listing = require('../models/listing')
  , User = require('../models/user')
  , helpers = require('./helpers')()
  , fs = require('fs');

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

    listing.save(function(err, listing) {
      if (err) { throw err; }
      else {
        fs.readFile(req.file.path, function (err, data) {
          var localPath =
            __dirname +
            '../../public/images/listings/' +
            listing._shortid;
          var publicPath =
            '/images/listings/' +
            listing._shortid +
            '/' +
            req.file.originalname;
          helpers.mkdirIfNotExist(localPath, function() {
            localPath += '/' + req.file.originalName;
            fs.writeFile(localPath, data, function (err) {
              Listing.findById(listing._shortid, function(err, listingUpdate) {
                if (err) { throw err; }
                else {
                  listingUpdate.display = publicPath;
                  listingUpdate.save(function(err) {
                    res.redirect('/browse/' + listing._shortid);
                  });
                }
              });
            });
          });
        });
      }
    });
  }

  this.purchase = function(req, res) {
    Listing.findOne({ _shortid : req.params.listing_shortid },
    function(err, listing) {
      listing.purchasers.push(req.user._id);
      listing.save(function(err) {
        res.redirect('/browse/' + );
      });
    });
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
