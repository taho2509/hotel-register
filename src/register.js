'use-strict';

var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/';

router.get('/', function(req, res) {
  MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db('register');
    dbo
      .collection('client')
      .find({}, { projection: { _id: 0 } })
      .toArray(function(err, result) {
        if (err) throw err;
        db.close();
        res.json(result);
      });
  });
});

router.get('/:id([0-9]{3,})', function(req, res) {
  MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db('register');
    dbo
      .collection('client')
      .findOne({ id: req.params.id }, { projection: { _id: 0 } }, function(
        err,
        result
      ) {
        if (err) {
          console.log(err);
          res.status(404); //Set status to 404 as register was not found
          res.json({ message: 'Not Found' });
        }
        console.log(result);
        db.close();
        res.json(result);
      });
  });
});

router.post('/', function(req, res) {
  const { id, name, lastname, room, entry_date, due_date } = req.body;

  var client = { id: id, name: name, lastname: lastname };

  MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db('register');
    dbo.collection('client').insertOne(client, function(err, res) {
      if (err) throw err;
      console.log(res.insertedCount + ' Client inserted.');
    });

    res.json({
      message: 'New register created.',
      location: '/registers/' + id
    });
  });
});

//Routes will go here
module.exports = router;
