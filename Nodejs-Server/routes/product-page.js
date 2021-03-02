var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var productPage = require('../models/product-page.js');

/* GET ALL Product PageSections */
router.get('/', function (req, res, next) {
    productPage.find(function (err, productPageSections) {
        if (err) return next(err);
        res.json(productPageSections);
    });
});

/* GET SINGLE Product Page SECTION BY ID */
router.get('/:id', function (req, res, next) {
    productPage.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* SAVE Product Page SECTION */
router.post('/', function (req, res, next) {
    console.log(req.body);
    productPage.create(req.body, function (err, post) {
        if (err) {
            console.log(err);
            return next(err);
        }
        res.json(post);
    });
});

/* UPDATE Product Page SECTION */
router.put('/:id', function (req, res, next) {
    console.log(req.body);
    productPage.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) {
            console.log(err);
            return next(err);
        }
        res.json(post);
    });
});

/* DELETE Product Page SECTION */
router.delete('/:id', function (req, res, next) {
    productPage.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;
