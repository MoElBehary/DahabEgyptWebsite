var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var aboutPage = require('../models/about-page.js');

/* GET ALL aboutSections */
router.get('/', function (req, res, next) {
    aboutPage.find(function (err, aboutSections) {
        if (err) return next(err);
        res.json(aboutSections);
    });
});

/* GET SINGLE ABOUT SECTION BY ID */
router.get('/:id', function (req, res, next) {
    aboutPage.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* SAVE ABOUT SECTION */
router.post('/', function (req, res, next) {
    console.log(req.body);
    aboutPage.create(req.body, function (err, post) {
        if (err) {
            console.log(err);
            return next(err);
        }
        res.json(post);
    });
});

/* UPDATE ABOUT SECTION */
router.put('/:id', function (req, res, next) {
    console.log(req.body);
    aboutPage.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) {
            console.log(err);
            return next(err);
        }
        res.json(post);
    });
});

/* DELETE ABOUT SECTION */
router.delete('/:id', function (req, res, next) {
    aboutPage.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;
