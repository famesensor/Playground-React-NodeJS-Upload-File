const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const db = require('./config/db').mongoURI;

const files = require('./router/v1/files');

// connect to database...
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log(err));

// middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/files', files);

const portNumber = process.env.PORT || 5000;

app.listen(portNumber, function () {
    console.log(`Server running on prot : ${portNumber}`);
});
