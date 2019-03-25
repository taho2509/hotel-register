'use-strict';

const stan = require('./stan');

var publishingHandler = function(data) {
  const { id, name, lastname, room, entry_date, due_date } = data;

  stan.publish(
    process.env.QUEUE_EVENT_TO_PUBLISH,
    JSON.stringify({ id, name, lastname, room, entry_date, due_date }),
    function(err, guid) {
      if (err) {
        console.log('publish failed: ' + err);
      } else {
        console.log('published message with guid: ' + guid);
      }
    }
  );
};

module.exports = publishingHandler;
