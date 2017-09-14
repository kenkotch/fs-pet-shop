'use strict'

const fs = require('fs')

const path = require('path')

const petsPath = path.join(__dirname, 'pets.json')

const http = require('http')

const port = process.env.PORT || 8000

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/pets') {
    fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
      if (err) {
        console.error(err.stack)
        res.statusCode = 500
        res.setHeader('Content-Type', 'text/plain')
        res.end('Interna Server Error')
      }
      res.setHeader('Content-Type', 'application/json')
      res.end(petsJSON)
    })
  } else if (req.method === 'GET' && req.url === '/pets/0') {
    fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
      if (err) {
        console.error(err.stack)
        res.statusCode = 500
        res.setHeader('Content-Type', 'text/plain')
        res.end('Interna Server Error')
      }
      res.setHeader('Content-Type', 'application/json')
      res.end(petsJSON[0]) // this should return pets.json idx 0
    })
  } else if (req.method === 'GET' && req.url === '/pets/1') {
    fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
      if (err) {
        console.error(err.stack)
        res.statusCode = 500
        res.setHeader('Content-Type', 'text/plain')
        res.end('Interna Server Error')
      }
      res.setHeader('Content-Type', 'application/json')
      res.end('hello1') // this should return pets.json idx 1
    })
  } else if (req.method === 'GET' && (req.url === '/pets/2' || req.url === '/pets/-1')) {
    fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
      if (err) {
        console.error(err.stack)
        res.statusCode = 500
        res.setHeader('Content-Type', 'text/plain')
        res.end('Interna Server Error')
      }
      res.setHeader('Content-Type', 'text/plain')
      res.end('Not Found')
    })
  } else {
    res.statusCode = 404
    res.setHeader('Content-Type', 'text/plain')
    res.end('Not found')
  }
})

server.listen(port, () => {
  console.log('Listening on port', port)
})

module.exports = server
