'use strict'

const http = require('http')

const sourceFile = require('./pets.json')

const port = process.env.PORT || 8000

let fs = require('fs')

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/pets') {
    res.setHeader('Content-Type', 'application/json')
    res.statusCode = 200
    res.end(JSON.stringify(sourceFile))
  } else if (req.method === 'GET' && req.url === '/pets/0') {
    res.setHeader('Content-Type', 'application/json')
    res.statusCode = 200
    res.end(JSON.stringify(sourceFile[0]))
  } else if (req.method === 'GET' && req.url === '/pets/1') {
    res.setHeader('Content-Type', 'application/json')
    res.statusCode = 200
    res.end(JSON.stringify(sourceFile[1]))
  } else if (req.method === 'GET' && (req.url === '/pets/2' || req.url === '/pets/-1')) {
    res.setHeader('Content-Type', 'text/plain')
    res.statusCode = 404
    res.end('Not Found')
  } else {
    res.setHeader('Content-Type', 'text/plain')
    res.statusCode = 404
    res.end('Not Found')
  }
})
server.listen(port, () => {
  console.log('Listening on port', port)
})

module.exports = server
