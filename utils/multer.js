const multer = require('multer');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/image');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

exports.upload = multer({ storage: storage });
exports.uploadFile = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 1024 * 1024
    }
});
