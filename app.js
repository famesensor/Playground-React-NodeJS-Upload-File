const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const db = require('./config/db').mongoURI;

const image = require('./router/v1/image');

// connect to database...
// mongoose
//     .connect(db)
//     .then(() => console.log('MongoDB Connected'))
//     .catch((err) => console.log(err));

// middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/image', image);

const portNumber = process.env.PORT || 5000;

app.listen(portNumber, function () {
    console.log(`Server running on prot : ${portNumber}`);
});
