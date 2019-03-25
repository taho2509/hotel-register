'use-strict';

const { MongoClient } = require('mongodb');
var url = process.env.MONGO_CONNECTION_STRING;

var registrationHandler = function(data) {

  var client = { _id: data.id, name: data.name, lastname: data.lastname };

  MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db('register');
    dbo.collection('client').insertOne(client, function(err, ans) {
      if (err) throw err;
      console.log(ans.insertedCount + ' Client inserted.');
      console.log('location: ', '/registers/' + ans.insertedId);
    });
  });
};

module.exports = registrationHandler;
