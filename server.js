'use strict'

const express = require('express')
const rateLimit = require('express-rate-limit')
const extract = require('./lib/extract')
const firebase = require('firebase')

const port = process.env.PORT || 8080
const app = express()

firebase.initializeApp({
  serviceAccount: JSON.parse(process.env.SERVICE_ACCOUNT),
  databaseURL: "https://miyako-f17ec.firebaseio.com"
})

// Enable if behind reverse proxy (Heroku)
app.enable('trust proxy')

// Middleware: ratelimit for API without token
app.use('/api', new rateLimit({
  windowMs: 1 * 60 * 1000,  // 1 minute
  max: 30                   // 30 requests/minute
}))

// Middleware: ratelimit for API with token
app.use('/api', new rateLimit({
  keyGenerator: request => request.query.token,
  windowMs: 1 * 60 * 1000,  // 1 minute
  max: 10                   // 10 requests/minute
}))

// Serve endpoint
app.get('/api',
  // Must have url and type
  (request, response, next) => {
    if (!request.query.url || !request.query.type)
      response.sendStatus(400)
    else
      next()
  },
  // If request have token, verify token
  (request, response, next) => {
    let token = request.query.token
    if (!token) {
      next()
    } else {
      firebase.auth().verifyIdToken(token)
        .then(() => next())
        .catch(error => response.sendStatus(401))
    }
  },
  // Process the request
  (request, response) => {
    let url = request.query.url
    let type = request.query.type
    extract(url, type)
      .then(data => {
        let status = data.status
        let result = data.result
        response.json({ status, result })
      })
      .catch(error => {
        let status = 'ERROR'
        let result = error.message
        response.json({ status, result })
      })
  }
)

// Serve static files
app.use(express.static(__dirname + '/public'))

// Serve index.html
app.get('*', (request, response) => {
  response.sendFile(__dirname + '/public/index.html')
})

// Start listening
app.listen(port)
console.log(`Server started on port ${port}`)
