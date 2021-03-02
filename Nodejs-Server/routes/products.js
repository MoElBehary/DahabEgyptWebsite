var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Product = require('../models/Product.js');
// [#] IMGS
var multer = require('multer');
const fs = require('fs')
const imgPath = "assets/img/products"

/* GET ALL PRODUCTS */
router.get('/', function(req, res, next) {
  Product.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE PRODUCT BY ID */
router.get('/:id', function(req, res, next) {
  Product.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE PRODUCT */
router.post('/', function(req, res, next) {
  console.log(req.body);
  Product.create(req.body, function (err, post) {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.json(post);
  });
});

/* UPDATE PRODUCT */
router.put('/:id', function(req, res, next) {
  console.log(req.body);
  Product.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.json(post);
  });
});

/* DELETE PRODUCT */
router.delete('/:id', function(req, res, next) {
  Product.findByIdAndRemove(req.params.id, req.body, function (err, post) {
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
