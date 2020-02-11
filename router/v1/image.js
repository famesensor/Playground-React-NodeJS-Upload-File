const express = require('express');
const router = express.Router();
const multer = require('multer');

const Image = require('../../models/image');

router.post('/uploadbase', (req, res) => {
    // console.log(req.body)
    const newImage = new Image({
        imageName: req.body.imageName,
        imageData: req.body.imageData
    });

    newImage.save()
        .then((res) => {
            // console.log(res)
            res.status(200).json({
                success: true,
                data: res
            })
        })
        .catch((err) => {
            console.log(err);
        })
});

module.exports = router; 