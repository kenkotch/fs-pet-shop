'use strict'

let fs = require('fs')
const path = require('path')
const express = require('express')

const petsPath = path.join(__dirname, '../pets.json')
const router = express.Router()

router.get('/pets', (req, res) => {
  fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
    if (err) {
      console.error(err.stack)
      res.sendStatus(500)
    }

    let pets = JSON.parse(petsJSON)
    res.send(pets)
  })
})

router.get('/pets/:id', (req, res) => {
  fs.readFile(petsPath, 'utf8', (err, newPetsJSON) => {
    if (err) {
      console.error(err.stack)
      res.sendStatus(500)
    }

    let id = Number(req.params.id)
    let pets = JSON.parse(newPetsJSON)

    if (id < 0 || id > pets.length - 1 || Number.isNaN(id)) {
      res.sendStatus(404)
      process.exit(1)
    }

    res.set('Content-Type', 'text/plain')
    res.send(pets[id])
  })
})

router.post('/pets', (req, res) => {
  fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
    if (err) {
      console.error(err.stack)
      res.sendStatus(500)
    }

    let pets = JSON.parse(petsJSON)
    // let { name, age, kind } = req.body
    // let pet = { name, age, kind }

    let name = req.body.name
    let age = Number(req.body.age)
    let kind = req.body.kind

    let pet = { name, age, kind }

    if (!pet) {
      res.sendStatus(400)
    }
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
  })
})

router.put('/guests/:id', (req, res) => {
  fs.readFile(petsPath, 'utf8', (readErr, petsJSON) => {
    if (readErr) {
      console.error(readErr.stack)
      res.sendStatus(500)
    }

    let id = Number(req.params.id)
    let pets = JSON.parse(petsJSON)

    if (id < 0 || id > pets.length - 1 || Number.isNaN(id)) {
      res.sendStatus(404)
    }

    let pet = req.body.name

    if (!pet) {
      res.sendStatus(400)
    }

    pets[id] = pet

    let newPetsJSON = JSON.stringify(pets)

    fs.writeFile(petsPath, newPetsJSON, (writeErr) => {
      if (writeErr) {
        console.error(writeErr.stack)
        res.sendStatus(500)
      }

      res.set('Content-Type', 'text/plain')
      res.send(pet)
    })
  })
})

router.delete('/pets/:id', (req, res) => {
  fs.readFile(petsPath, 'utf8', (readErr, petsJSON) => {
    if (readErr) {
      console.error(readErr.stack)
      res.sendStatus(500)
    }

    let id = Number(req.params.id)
    let pets = JSON.parse(petsJSON)

    if (id < 0 || id > pets.length - 1 || Number.isNaN(id)) {
      res.sendStatus(404)
    }

    let pet = pets.splice(id, 1)[0]
    let newPetsJSON = JSON.stringify(pets)

    fs.writeFile(petsPath, newPetsJSON, (writeErr) => {
      if (writeErr) {
        console.error(writeErr.stack)
        res.sendStatus(500)
      }

      res.set('Content-Type', 'text/plain')
      res.send(pet)
    })
  })
})

module.exports = router
