var express = require('express');
var bodyParser = require('body-parser');

//Require the Routers
var validator = require('./validator');
var server = require('./server');

const eventEmitter = require('./emitter');

const subscriptionHandler = require('./subscribe');
const publishingHandler = require('./publish');
const registrationHandler = require('./register');

//Assign the event handler to an event:
eventEmitter.on('connected', subscriptionHandler);
eventEmitter.on('posted', publishingHandler);
eventEmitter.on('registered', registrationHandler);

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/registers', validator);
app.use('/registers', server);

app.listen(process.env.NODE_PORT);
