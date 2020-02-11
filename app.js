var express = require("express");
var app = express();
var multer = require("multer");
var cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const db = require('./config/db').mongoURI;
const Image = require('./models/image');
app.use(cors());

const image = require('./router/v1/image');

mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// var storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, "./public/image");
//   },
//   filename: function(req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   }
// });

// var upload = multer({ storage: storage })

// app.post('/upload', upload.single('file'), (req, res) => {
//     const newImage = new Image({
//         imageNeme: req.body.imageNeme,
//         imageData: req.file.path 
//     })

//     newImage.save()
//         .then((data) => {
//             res.status(200).send(req.file);
//         })
//         .catch((err) => {
//             console.log(err);
//         })
// });

app.use('/api/image', image);

const portNumber = process.env.PORT || 5000

app.listen(portNumber, function() {
  console.log(`Server running on prot : ${portNumber}`);
});
