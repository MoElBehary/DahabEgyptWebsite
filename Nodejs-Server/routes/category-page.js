var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var categoryPage = require('../models/category-page.js');

/* GET ALL Category PageSections */
router.get('/', function (req, res, next) {
    categoryPage.find(function (err, categoryPageSections) {
        if (err) return next(err);
        res.json(categoryPageSections);
    });
});

/* GET SINGLE Category Page SECTION BY ID */
router.get('/:id', function (req, res, next) {
    categoryPage.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* SAVE Category Page SECTION */
router.post('/', function (req, res, next) {
    console.log(req.body);
    categoryPage.create(req.body, function (err, post) {
        if (err) {
            console.log(err);
            return next(err);
        }
        res.json(post);
    });
});

/* UPDATE Category Page SECTION */
router.put('/:id', function (req, res, next) {
    console.log(req.body);
    categoryPage.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) {
            console.log(err);
            return next(err);
        }
        res.json(post);
    });
});

/* DELETE Category Page SECTION */
router.delete('/:id', function (req, res, next) {
    categoryPage.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;
