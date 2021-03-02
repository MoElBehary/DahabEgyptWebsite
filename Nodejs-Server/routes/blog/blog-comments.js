var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var blogComments = require('../../models/blog/blog-comments');

/* GET ALL Blog comments */
router.get('/', function (req, res, next) {
    blogComments.find(function (err, allComments) {
        if (err) return next(err);
        res.json(allComments);
    });
});

/* GET SINGLE comment BY ID */
router.get('/:topic_id', function (req, res, next) {
    blogComments.find({"topic_id": req.params.topic_id}, function (err, comment) {
        if (err) return next(err);
            res.json(comment);
    });
});

/* SAVE comment */
router.post('/', function (req, res, next) {
    console.log(req.body);
    blogComments.create(req.body, function (err, post) {
        if (err) {
            console.log(err);
            return next(err);
        }
        res.json(post);
    });
});

/* UPDATE comment */
router.put('/:id', function (req, res, next) {
    console.log(req.body);
    blogComments.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) {
            console.log(err);
            return next(err);
        }
        res.json(post);
    });
});

/* DELETE comment */
router.delete('/:id', function (req, res, next) {
    blogComments.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;
