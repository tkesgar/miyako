const express = require('express')
const bodyParser = require('body-parser')
const rateLimit = require('express-rate-limit')
const extract = require('./lib/extract')

const port = process.env.PORT || 8080
const app = express()

// Enable if behind reverse proxy (Heroku)
app.enable('trust proxy')

// Middleware: ratelimit for API
app.use('/api', new rateLimit({
  windowMs: 1 * 60 * 1000,  // 1 minute
  max: 10                   // 10 requests/minute
}))

// Middleware: parse JSON body
app.use('/api', bodyParser.json())

// Serve endpoint
app.get('/api', (request, response) => {
  let url = request.query.url
  if (!url) {
    response.sendStatus(400)
  } else {
    extract(url, (status, data) => {
      if (status) {
        response.json({ result: data })
      } else {
        response.json({ error: data })
      }
    })
  }
})

// Serve static files
app.use(express.static(__dirname + '/public'))

// Serve index.html
app.get('*', (request, response) => {
  response.sendFile(__dirname + '/public/index.html')
})

// Start listening
app.listen(port)
console.log(`Server started on port ${port}`)
