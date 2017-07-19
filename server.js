// server.js
// where your node app starts

// init project
const express = require('express'),
  useragent = require('express-useragent'),
  isUrl = require('is-url'),
  mongodb = require('mongodb')
const app = express()
const MongoClient = mongodb.MongoClient
const shortUrlStart = 'https://complete-hair.glitch.me/'

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
})

app.get('/new/*', (req, res) => {
  const url = req.params[0]
  if (!isUrl(url)) return res.json({ error: 'Not a valid URL' })
  MongoClient.connect(process.env.DB_URL)
    .then(db => {
      const shortUrls = db.collection('shortUrls')
      const report = result => {
        db.close()
        res.json({
          original_url: result.original_url,
          short_url: shortUrlStart + result._id
        })
      }
      let search = { original_url: url }
      shortUrls
        .findOne(search)
        .then(result => {
          if (result) report(result)
          else {
            shortUrls
              .insertOne(search)
              .then(result => report(search))
              .catch(err => {
                throw err
              })
          }
        })
        .catch(err => {
          throw err
        })
    })
    .catch(error => res.json({ error }))
})

app.get('/:param', (req, res) => {
  const param = req.params.param
  MongoClient.connect(process.env.DB_URL)
    .then(db => {
      const shortUrls = db.collection('shortUrls')
      shortUrls
        .findOne({ _id: mongodb.ObjectID(param) })
        .then(result => {
          db.close()
          if (!result) return res.json({ error: 'This short url not found' })
          res.redirect(result.original_url)
        })
        .catch(err => {
          throw err
        })
    })
    .catch(error => res.json({ error }))
})

// listen for requests :)
var listener = app.listen(process.env.PORT, () =>
  console.log('Your app is listening on port ' + listener.address().port)
)
