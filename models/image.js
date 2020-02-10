const mongoose = require('mongoose');

cosnt ImageSchema = new Schema({
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

modules.export = Image = mongoose.model('image', ImageSchema);