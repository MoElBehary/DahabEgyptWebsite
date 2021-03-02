var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var blogTopics = require('../../models/blog/blog-topics');
// [#] IMGS
var multer = require('multer');
const fs = require('fs')
const imgPath = "assets/img/blog"

/* GET ALL Blog Topics */
router.get('/', function (req, res, next) {
    blogTopics.find(function (err, allTopics) {
        if (err) return next(err);
        res.json(allTopics);
    });
});

/* GET SINGLE Topic BY ID */
router.get('/:id', function (req, res, next) {
    blogTopics.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* SAVE Topic */
router.post('/', function (req, res, next) {
    console.log(req.body);
    blogTopics.create(req.body, function (err, post) {
        if (err) {
            console.log(err);
            return next(err);
        }
        res.json(post);
    });
});

/* UPDATE Topic */
router.put('/:id', function (req, res, next) {
    console.log(req.body);
    blogTopics.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) {
            console.log(err);
            return next(err);
        }
        res.json(post);
    });
});

/* DELETE Topic */
router.delete('/:id', function (req, res, next) {
    blogTopics.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});
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
