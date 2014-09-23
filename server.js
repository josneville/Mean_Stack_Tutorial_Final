var express = require('express'); //Main framework for all routing
var morgan = require('morgan'); //Morgan helps log everything with our server
var bodyParser = require('body-parser'); //Body parse helps parse bodies sent in
var mongoose = require('mongoose'); //Mongoose is the middleware to connect to mongodb
var config = require('./config'); //load up config file

var app = express(); //Running this framework and storing it into app

//Running our middleware on all routes
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.connect(config.dburl);

app.use(express.static(__dirname + "/public")); // Automatic routing for all static files

require('./app/routes/todo')(app);

app.listen(process.env.PORT || 5000); //Run the server on port 5000
console.log("Server now running on port 5000");
