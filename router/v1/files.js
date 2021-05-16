const express = require('express');
const router = express.Router();
const { upload, uploadFile } = require('../../utils/multer');
const {
    uploadFiletoStorage,
    deleteImage,
    downloadFile
} = require('../../utils/upload/storage');
const fs = require('fs');

const Files = require('../../models/files');

router.post('/check-api', async (req, res, next) => {
    res.status(200).json({ status: true });
});

// upload file to local storage...
router
    .route('/upload-local-storage')
    .post(upload.array('files', 5), async (req, res, next) => {
        // console.log(req.files);
        const files = [];
        if (req.files) {
            req.files.forEach((item) => {
                files.push({
                    imageName: item.filename,
                    path: item.path,
                    type: 'local'
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
        let files = await Files.find({ type: 'local' });

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

// upload file to cloud storage(fire storage)...
router
    .route('/upload-cloud-storage')
    .post(uploadFile.array('files', 5), async (req, res, next) => {
        if (!req.files) {
            return res
                .status(400)
                .json({ status: false, message: 'files empty' });
        }

        try {
            const files = [];
            for (file of req.files) {
                const url = await uploadFiletoStorage(file, 'files');
                console.log(file);
                files.push({
                    imageName: file.originalname,
                    path: url,
                    type: 'cloud'
                });
            }
            let resFile = await Files.insertMany(files);

            res.json({
                success: true,
                data: 'upload file success'
            });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ status: false, message: 'internal server error' });
        }
    });

router.route('/cloud').get(async (req, res, next) => {
    try {
        let files = await Files.find({ type: 'cloud' });

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

router.route('/cloud/:id').patch(async (req, res, next) => {
    try {
        // get file path
        let file = await Files.findById(req.params.id);

        // remove file in storage
        await deleteImage(file.path);
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

// delete file in  storage...
router.route('/:id').patch(async (req, res, next) => {
    try {
        // get file path
        let file = await Files.findById(req.params.id);

        // remove file in storage
        if (file.type === 'local') {
            fs.unlinkSync(file.path);
        } else {
            await deleteImage(file.path);
        }

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

// download file from local storage...
router.route('/:id').get(async (req, res, next) => {
    try {
        // get file path
        let file = await Files.findById(req.params.id);

        if (file.type === 'local') {
            res.download(`./${file.path}`);
        } else {
            let path = await downloadFile(file.path);
            res.download(`./${path}`);
        }
    } catch (error) {
        console.log(error); // Failure
        return res
            .status(500)
            .json({ status: false, message: 'internal server error' });
    }
});
module.exports = router;
