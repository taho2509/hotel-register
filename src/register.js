'use-strict';

const { MongoClient } = require('mongodb');
var url = process.env.MONGO_CONNECTION_STRING;

let clientExist = (data) => new Promise((resolve, reject) => {
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
      if (err) throw err;
      var dbo = db.db('register');
  
      dbo.collection('client')
        .findOne({ name: data.name, lastname: data.lastname }, function(
          err,
          result
        ) {
          db.close();
          if (err) {
            reject(err);
          } else {
            resolve(result !== null);
          }
        });
      
    });
  });

var registrationHandler = async function(data) {

  var client = { _id: data.id, name: data.name, lastname: data.lastname };

  let exist = await clientExist(data);

  if(!exist) {
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
      if (err) throw err;
      var dbo = db.db('register');
      
      dbo.collection('client').insertOne(client, function(err, ans) {
        if (err) throw err;
        console.log(ans.insertedCount + ' Client inserted.');
        console.log('location: ', '/registers/' + ans.insertedId);
        db.close();
      });
    });
  } else {
    console.log('the client already exist');
  }
};

module.exports = registrationHandler;
