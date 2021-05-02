const express = require('express');
const router = express.Router();
const { upload } = require('../../utils/multer');
const fs = require('fs');

const Files = require('../../models/files');

router.post('/check-api', async (req, res, next) => {
    res.status(200).json({ status: true });
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

        try {
            let resFile = await Files.insertMany(files);
            console.log('Data inserted'); // Success

            res.json({
                success: true,
                data: 'upload file success'
            });
        } catch (error) {
            console.log(error); // Failure
            return res
                .status(500)
                .json({ status: false, message: 'internal server error' });
        }
    });

router.route('/').get(async (req, res, next) => {
    try {
        let files = await Files.find();

        res.status(200).json({
            status: true,
            data: files
        });
    } catch (error) {
        console.log(error); // Failure
        return res
            .status(500)
            .json({ status: false, message: 'internal server error' });
    }
});

router.route('/:id').patch(async (req, res, next) => {
    try {
        // get file path
        let file = await Files.findById(req.params.id);

        // remove file in storage
        fs.unlinkSync(file.path);

        // delete info in database
        let resFile = await Files.deleteOne({ _id: req.params.id });

        res.status(200).json({
            status: true,
            data: 'delete file message'
        });
    } catch (error) {
        console.log(error); // Failure
        return res
            .status(500)
            .json({ status: false, message: 'internal server error' });
    }
});

router.route('/:id').get(async (req, res, next) => {
    try {
        // get file path
        let file = await Files.findById(req.params.id);

        res.download(`./${file.path}`);
    } catch (error) {
        console.log(error); // Failure
        return res
            .status(500)
            .json({ status: false, message: 'internal server error' });
    }
});

module.exports = router;
