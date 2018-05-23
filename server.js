const express = require('express')
const bodyParser = require('body-parser')
const app = express()
var MongoClient = require('mongodb').MongoClient;

app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs');

var db

MongoClient.connect('mongodb://localhost:27017/', (err, client) => {
  if (err) return console.log(err)
  db = client.db('appdb')
  app.listen(3000, () => {
    console.log("MongoDB sucessfully connected and listening to localhost:27017")
    console.log("Express server started and listening on port 3000 for requests")
  })
})

app.get('/', (req, res) => {
  db.collection('sampleCollection').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', { sampleCollection: result })
  })
})

app.get('/charts', (req, res) => {

})