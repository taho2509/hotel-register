'use-strict';

var express = require('express');
var router = express.Router();

const clientId = `client_${new Date().getTime()}`;
const clusterName = process.env.QUEUE_CLUSTER_NAME;

var stan = require('node-nats-streaming').connect(clusterName, clientId);

stan.on('connect', function() {
  console.log('stan connected');
});

router.post('/', function(req, res, next) {
  const { id, name, lastname, room, entry_date, due_date } = req.body;

  stan.publish(
    process.env.QUEUE_EVENT_TO_PUBLISH,
    JSON.stringify({ id, name, lastname, room, entry_date, due_date }),
    function(err, guid) {
      if (err) {
        console.log('publish failed: ' + err);
      } else {
        next();
        console.log('published message with guid: ' + guid);
      }
    }
  );
});

//Routes will go here
module.exports = router;
