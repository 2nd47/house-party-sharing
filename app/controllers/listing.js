var Listing = require('../models/listing')
  , User = require('../models/user')
  , Review = require('../models/review')
  , helpers = require('./helpers')()
  , async = require('async')
  , fs = require('fs');

// cb = function(err, reviews) {...}
var getAllReviews = function(listing, cb) {
  var reviews = [];
  async.each(listing.reviews, function(review, callback) {
    Review.findById(review, function(err, review) {
      if (err) { callback(err) }
      else {
        reviews.push(review);
        callback();
      }
    });
  }, function(err) {
    if (err) { throw err; }
    reviews = reviews.reverse();
    async.each(reviews, function(review, callback) {
      User.findById(review.user, function(err, user) {
        if (err) { callback(err); }
        else {
          review.username = user.username;
          review.avatar = user.avatar;
          callback();
        }
      });
    }, function(err) {
      if (err) { throw err; }
      cb(null, reviews.reverse());
    });
  });
}

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
              if (err) { throw err; }
              Listing.findById(listing._id, function(err, listingUpdate) {
                if (err) { throw err; }
                else {
                  listingUpdate.display = publicPath;
                  listingUpdate.save(function(err) {
                    if (err) { throw err; }
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
      if (err) { throw err; }
      else {
        listing.purchasers.push(req.user._id);
        listing.save(function(err) {
          User.findById(req.user._id, function(err, user) {
            if (err) { throw err; }
            else {
              user.purchased.push(listing._id);
              user.save(function(err) {
                if (err) { throw err; }
                res.redirect('/browse/' + req.params.listing_shortid);
              });
            }
          });
        });
      }
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
      else {
        getAllReviews(listing, function(err, reviews) {
          if (err) { throw err; }
          else {
            helpers.userHasPurchased(req.user._id, listing._id, function(err, hasPurchased) {
              if (err) { throw err; }
              else {
                res.render('listing', {
                  listing: listing,
                  reviews: reviews,
                  hasPurchased: hasPurchased
                });
              }
            });
          }
        });
      }
    });
  }

  this.review = function(req, res) {
    Listing.findOne({ _shortid: req.params.listing_shortid },
    function(err, listing) {
      if (err) { throw err; }
      else if (!listing) {
        res.redirect('/404');
      }
      else {
        var review = new Review();
        review.user = req.user._id;
        review.itemReviewed = listing._id;
        review.rating = req.body.rating;
        review.comment = req.body.comment;

        review.save(function(err, review) {
          if (err) { throw err; }
          else {
            listing.reviews.push(review._id);
            listing.save(function(err, listing) {
              if (err) { throw err; }
              else {
                User.findById(req.user._id, function(err, user) {
                  user.reviewedListings.push(review._id);
                  user.save(function(err, user) {
                    if (err) { throw err; }
                    else {
                      res.redirect('/browse/' + listing._shortid);
                    }
                  });
                });
              }
            })
          }
        });
      }
    });
  }

  return this;
}
