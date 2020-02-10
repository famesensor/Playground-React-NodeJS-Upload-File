const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    imageNeme: {
        type: String,
        default: 'None',
        required: true
    },
    imageData: {
        type: String,
        required: true
    }
});

module.exports = Image = mongoose.model('image', ImageSchema);