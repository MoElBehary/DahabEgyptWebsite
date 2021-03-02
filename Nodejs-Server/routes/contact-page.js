var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var contactPage = require('../models/contact-page.js');

/* GET ALL contact Sections */
router.get('/', function (req, res, next) {
    contactPage.find(function (err, contactSections) {
        if (err) return next(err);
        res.json(contactSections);
    });
});

/* GET SINGLE CONTACT SECTION BY ID */
router.get('/:id', function (req, res, next) {
    contactPage.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* SAVE CONTACT SECTION */
router.post('/', function (req, res, next) {
    console.log(req.body);
    contactPage.create(req.body, function (err, post) {
        if (err) {
            console.log(err);
            return next(err);
        }
        res.json(post);
    });
});

/* UPDATE CONTACT SECTION */
router.put('/:id', function (req, res, next) {
    console.log(req.body);
    contactPage.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) {
            console.log(err);
            return next(err);
        }
        res.json(post);
    });
});

/* DELETE CONTACT SECTION */
router.delete('/:id', function (req, res, next) {
    contactPage.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;
