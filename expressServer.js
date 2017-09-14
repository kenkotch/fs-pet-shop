'use stric'

const express = require('express')
const path = require('path')
let fs = require('fs')
const bodyParser = require('body-parser')

const app = express()
const petsPath = path.join(__dirname, 'pets.json')
const port = process.env.PORT || 8000

app.use(bodyParser.json())

app.get('/pets', (req, res, next) => {
  fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
    if (err) throw err

    const pets = JSON.parse(petsJSON)
    console.log(pets)
    res.send(pets)
  })
})






app.listen(port, () => {
  console.log('Listening on port', port)
})

module.exports = app
