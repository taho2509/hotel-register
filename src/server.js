'use-strict';

var express = require('express');
var router = express.Router();
const { MongoClient, ObjectId} = require('mongodb');
var url = process.env.MONGO_CONNECTION_STRING;

const eventEmitter = require('./emitter');

router.get('/', function(req, res) {
  MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db('register');
    dbo
      .collection('client')
      .find()
      .toArray(function(err, result) {
        if (err) throw err;
        db.close();
        res.json(result);
      });
  });
});

router.get('/:id([0-9a-z]{24,})', function(req, res) {
  MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db('register');
    dbo
      .collection('client')
      .findOne(ObjectId(req.params.id), function(
        err,
        result
      ) {
        if (err) {
          console.log(err);
          res.status(404); //Set status to 404 as register was not found
          res.json({ message: 'Not Found' });
        }
        db.close();
        res.json(result);
      });
  });
});

router.post('/', function(req, res) {
  eventEmitter.emit("posted", req.body);
  res.json({
    message: 'Petition received.',
    location: '/registers/'
  });
});

router.delete('/:id([0-9a-z]{24,})', function(req, res) {
  MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db('register');
    dbo.collection('client').deleteOne({ _id: ObjectId(req.params.id) }, function(
      err,
      result
     ) {
        if(err) {
          console.log(err);
          res.status(404); //Set status to 404 as register was not found
          res.json({ message: 'Not Found' });
       }
       db.close();
       res.json(result);
     });
  });
});

router.delete('/', function(req, res) {
  MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db('register');
    dbo.collection('client').deleteMany(function(
      err,
      result
     ) {
        if(err) {
          console.log(err);
          res.status(404); //Set status to 404 as register was not found
          res.json({ message: 'Not Found' });
       }
       db.close();
       res.json(result);
     });
  });
});

//Routes will go here
module.exports = router;
