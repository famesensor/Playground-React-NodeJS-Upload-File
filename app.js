var express = require("express");
var app = express();
var multer = require("multer");
var cors = require("cors");
const mongoose = require("mongoose");
const db = require('./config/db').mongoURI;
const Image = require('./models/image');
app.use(cors());

mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./public/image");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

var upload = multer({ storage: storage })

app.post('/upload', upload.single('file'), (req, res) => {
    const newImage = new Image({
        imageNeme: req.body.imageNeme,
        imageData: req.file.path 
    })

    newImage.save()
        .then((data) => {
            res.status(200).send(req.file);
        })
        .catch((err) => {
            console.log(err);
        })
});
// app.post("/upload", function(req, res) {
//   upload(req, res, function(err) {
//     if (err instanceof multer.MulterError) {
//       return res.status(500).json(err);
//     } else if (err) {
//       return res.status(500).json(err);
//     }
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
//     // return res.status(200).send(req.file);
//   });
// });

app.listen(8000, function() {
  console.log("App running on port 8000");
});
