const express = require('express');
const router = express.Router();
const { upload } = require('../../utils/multer');

const Files = require('../../models/files');

router.post('/uploadbase', async (req, res, next) => {
    const newImage = new Image({
        imageName: req.body.imageName,
        imageData: req.body.imageData
    });

    try {
        let res_ = await newImage.save();

        res.status(200).json({
            success: true,
            data: res_
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Internal server error.`
        });
    }
});

router
    .route('/upload-local-storage')
    .post(upload.array('files', 5), async (req, res, next) => {
        // console.log(req.files);
        const files = [];
        if (req.files) {
            req.files.forEach((item) => {
                files.push({
                    imageName: item.filename,
                    path: item.path
                });
            });
        }
        console.log(files);

        Files.insertMany(files)
            .then(function () {
                console.log('Data inserted'); // Success
            })
            .catch(function (error) {
                console.log(error); // Failure
                return res
                    .status(500)
                    .json({ status: false, message: 'internal server error' });
            });

        res.json({
            success: true,
            data: 'upload file success'
        });
    });

module.exports = router;
