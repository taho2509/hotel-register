var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
  if (
    !req.body.id ||
    !req.body.name ||
    !req.body.lastname ||
    !req.body.room.toString().match(/^[0-9]{3}$/g) ||
    !req.body.entry_date.toString().match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/g) ||
    !req.body.due_date.toString().match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/g)
  ) {
    res.status(400);
    res.json({ message: 'Bad Request' });
  } else {
    next();
  }
});

//Routes will go here
module.exports = router;
