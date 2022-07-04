const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/book')
.then(()=>{
    console.log("Database connected");
}).catch((err) =>{
    console.log("couldnt connected");
});

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const router = require('./router/book');
app.use('/book',router);

app.use('/uploads',express.static('./uploads/'));

app.listen(3000,() =>{
   console.log("listening to the port 3000")
});