const express = require('express');
const router = express.Router();
const multer = require('multer');

const Image = require('../../models/image');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpg' || file.mimetype === 'image/png'){
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

router.post('/uploadmulter', upload.single('imageData'), (req, res, next) => {
    console.log(req.body);
    console.log(req.file);
    // const newImage = new Image({
    //     imageName: req.body.imageName,
    //     imageData: req.file.path
    // })

    // newImage.save()
    //     .then((result) => {
    //         res.statusCode(200).json({
    //             success: true,
    //             document: result
    //         })
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     })
});

module.exports = router; 