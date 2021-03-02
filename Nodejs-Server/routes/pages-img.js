var express = require('express');
var router = express.Router();
var multer = require('multer');
const fs = require('fs')
const imgPath = "assets/img/pages"
// IMGS
const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, imgPath) // ! uploads file
    },
    filename: (req, file, callBack) => {
        callBack(null, file.originalname)
    }
})
var upload = multer({ storage: storage })
// [?] post 
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
// [?] delete
router.delete('/img/:imgName', function (req, res, next) {
    try {
        fs.unlinkSync(`${imgPath}/${req.params.imgName}`)
        //file removed
    } catch (err) {
        console.error(err)
    }
})
module.exports = router;