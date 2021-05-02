const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FilesSchema = new Schema({
    imageName: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    }
});

module.exports = Files = mongoose.model('files', FilesSchema);
