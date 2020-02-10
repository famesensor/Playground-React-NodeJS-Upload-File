const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const db = require('./config/db').mongoURI;
const app = express();

const image = require('./router/v1/image');

mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine','ejs');

// app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname,'public')));

app.use('/test/image',image);

const portnumber = process.env.PORT || 5000

app.listen(portnumber, () => {
    console.log('Server started port 5000');
})