'use strict'

const express = require('express')
const path = require('path')
const fs = require('fs')

const petsPath = '../pets.json'
const app = express.Router()

// C in CRUDL
app.post('/', (req, res) => {
  fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
    if (err) {
      console.error(err.stack)
      res.sendStatus(500)
    }

    let name = req.body.name
    let age = Number(req.body.age)
    let kind = req.body.kind

    let pets = JSON.parse(petsJSON)
    let pet = { name, age, kind }

    if (!pet || !name || !kind || isNaN(age)) {
      res.sendStatus(400)
    } else {
      pets.push(pet)

      let newPetsJSON = JSON.stringify(pets)

      fs.writeFile(petsPath, newPetsJSON, (writeErr) => {
        if (writeErr) {
          console.error(writeErr.stack)
          res.sendStatus(500)
        }

        res.set('Content-Type', 'text/plain')
        res.send(pet)
      })
    }
  })
})

// R in CRUDL
app.get('/:id', (req, res) => {
  fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
    if (err) throw err

    let idx = Number(req.params.id)
    let pets = JSON.parse(petsJSON)

    if (idx < 0 || idx > pets.length - 1 || Number.isNaN(idx)) {
      res.sendStatus(404)
    }

    res.send(pets[idx])
  })
})

// U in CRUDL
app.patch('/:id', (req, res) => {
  fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
    if (err) {
      console.error(err.stack)
      res.sendStatus(500)
    }

    let name = req.body.name
    let age = Number(req.body.age)
    let kind = req.body.kind

    let pets = JSON.parse(petsJSON)
    let pet = { name, age, kind }
    let idx = Number(req.params.id)

    if (!pet || !name || !kind || isNaN(age) || isNaN(idx) || !idx) {
      res.sendStatus(400)
    } else {
      pets.splice(idx, 1, pet)

      let newPetsJSON = JSON.stringify(pets)

      fs.writeFile(petsPath, newPetsJSON, (writeErr) => {
        if (writeErr) {
          console.error(writeErr.stack)
          res.sendStatus(500)
        }

        res.set('Content-Type', 'text/plain')
        res.send(pet)
      })
    }
  })
})

// D in CRUDL
app.delete('/:id', (req, res) => {
  fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
    if (err) throw err

    let idx = Number(req.params.id)
    console.log('index to delete is', idx)
    let pets = JSON.parse(petsJSON)

    if (idx < 0 || idx > pets.length - 1 || Number.isNaN(idx)) {
      res.sendStatus(400)
    }

    let pet = pets.splice(idx, 1)[0]
    let newPetsJSON = JSON.stringify(pets)

    fs.writeFile(petsPath, newPetsJSON, (writeErr) => {
      if (writeErr) {
        console.error(writeErr.stack)
        res.sendStatus(500)
      }

      res.send(pet)
    })
  })
})

// L in CRUDL
app.get('/', (req, res) => {
  fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
    if (err) throw err

    let pets = JSON.parse(petsJSON)
    res.send(pets)
  })
})

module.exports = app
