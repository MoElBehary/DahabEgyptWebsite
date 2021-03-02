var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var blogTags = require('../../models/blog/blog-tags');

/* GET ALL Blog Tags */
router.get('/', function (req, res, next) {
    blogTags.find(function (err, allTags) {
        if (err) return next(err);
        res.json(allTags);
    });
});

/* GET SINGLE Tag BY ID */
router.get('/:id', function (req, res, next) {
    blogTags.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* SAVE Tag */
router.post('/', function (req, res, next) {
    console.log(req.body);
    blogTags.create(req.body, function (err, post) {
        if (err) {
            console.log(err);
            return next(err);
        }
        res.json(post);
    });
});

/* UPDATE Tag */
router.put('/:id', function (req, res, next) {
    console.log(req.body);
    blogTags.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) {
            console.log(err);
            return next(err);
        }
        res.json(post);
    });
});

/* DELETE Tag */
router.delete('/:id', function (req, res, next) {
    blogTags.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;
