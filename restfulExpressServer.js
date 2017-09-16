'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const petsPath = require('./routes/pets')

const app = express()
const port = process.env.PORT || 8000

app.disable('x-powered-by')
app.use(morgan('short'))
app.use(bodyParser.json())

app.use(petsPath)

app.listen(port, () => {
  console.log('Listening on port', port)
})

module.exports = app
