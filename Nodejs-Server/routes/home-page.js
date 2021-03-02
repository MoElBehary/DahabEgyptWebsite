var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var homePage = require('../models/home-page.js');

/* GET ALL homeSections */
router.get('/', function (req, res, next) {
    homePage.find(function (err, homeSections) {
        if (err) return next(err);
        res.json(homeSections);
    });
});

/* GET SINGLE HOME SECTION BY ID */
router.get('/:id', function (req, res, next) {
    homePage.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* SAVE HOME SECTION */
router.post('/', function (req, res, next) {
    console.log(req.body);
    homePage.create(req.body, function (err, post) {
        if (err) {
            console.log(err);
            return next(err);
        }
        res.json(post);
    });
});

/* UPDATE HOME SECTION */
router.put('/:id', function (req, res, next) {
    console.log(req.body);
    homePage.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) {
            console.log(err);
            return next(err);
        }
        res.json(post);
    });
});

/* DELETE HOME SECTION */
router.delete('/:id', function (req, res, next) {
    homePage.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;
