const express = require('express');
const morgan = require('morgan');
const app = express();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 55555;
const mongoose = require('mongoose');
const path = require('path');

require('./helpers/mongoHelper')(mongoose);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.options('*', cors());
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get("/",function(req,res) {
    // console.log('Hello world');
    // res.render('page/welcome');
    res.redirect('/coins');
});

app.use('/coins', require('./routes/CoinRouter'));

 var server = http.listen(port, function() {
    console.log('Server is running on port '+port+' at '+new Date());
    console.log('Hello world ^_^');
});


