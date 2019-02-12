var express = require('express');
var bodyParser = require('body-parser');

//Require the Routers
var validator = require('./validator');
var publisher = require('./publish');
var register = require('./register');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/registers', validator);
app.use('/registers', publisher);
app.use('/registers', register);

app.listen(process.env.NODE_PORT);
