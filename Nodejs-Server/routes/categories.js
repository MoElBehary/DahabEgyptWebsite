var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Category = require('../models/category.js');
// [#] IMGS
var multer = require('multer');
const fs = require('fs')
const imgPath = "assets/img/categories"

/* GET ALL CATEGORIES */
router.get('/', function (req, res, next) {
    Category.find(function (err, categories) {
        if (err) return next(err);
        res.json(categories);
    });
});

/* GET SINGLE CATEGORY BY ID */
router.get('/:id', function (req, res, next) {
    Category.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* SAVE CATEGORY */
router.post('/', function (req, res, next) {
    console.log(req.body);
    Category.create(req.body, function (err, post) {
        if (err) {
            console.log(err);
            return next(err);
        }
        res.json(post);
    });
});

/* UPDATE CATEGORY */
router.put('/:id', function (req, res, next) {
    console.log(req.body);
    Category.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) {
            console.log(err);
            return next(err);
        }
        res.json(post);
    });
});

/* DELETE CATEGORY */
router.delete('/:id', function (req, res, next) {
    Category.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

// [#] IMGS
const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, imgPath) // ! uploads file
    },
    filename: (req, file, callBack) => {
        callBack(null, file.originalname)
    }
})
var upload = multer({ storage: storage })
// [?] post img
router.post('/img', upload.single('file'), (req, res, next) => {
    const file = req.file;
    console.log(file.filename);
    if (!file) {
        const err = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
    res.send(file)
})
// [?] delete img
router.delete('/img/:imgName', function (req, res, next) {
    try {
        fs.unlinkSync(`${imgPath}/${req.params.imgName}`)
        //file removed
    } catch (err) {
        console.error(err)
    }
})
module.exports = router;
