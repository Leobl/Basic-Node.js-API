const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const app            = express();

// Error when db is assigned to const, in mongo_client 255!
var db             = require('./config/db');

const port = 8000;

// Express can’t process URL encoded forms on its own. But you did install that body-parser package
app.use(bodyParser.urlencoded({ extended: true }));


MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err)

  db = database.db("note-api")
  require('./app/routes')(app, database);

  app.listen(port, () => {
    console.log('We are live on ' + port);
  }); 
})