const express = require('express')
const path = require('path')
const fs = require('fs')

const router = express.Router()
const petsPath = '../pets.json'

// C in CRUDL
router.post('/', (req, res) => {
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
router.get('/:id', (req, res) => {
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
router.patch('/:id', (req, res) => {
  fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
    if (err) throw err

    let name = req.body.name
    let age = Number(req.body.age)
    let kind = req.body.kind

    let pets = JSON.parse(petsJSON)
    let pet = { name, age, kind }
    let idx = Number(req.params.id)

    if (idx < 0 || idx > pets.length - 1 || Number.isNaN(idx)) {
      res.sendStatus(404)
    } else if (!pet || !name || !kind || !age) {
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
router.delete('/:id', (req, res) => {
  fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
    if (err) throw err

    let idx = Number(req.params.id)
    let pets = JSON.parse(petsJSON)

    if (idx < 0 || idx > pets.length - 1 || Number.isNaN(idx)) {
      res.sendStatus(404)
    }

    let pet = pets.splice(idx, 1)[0]
    let newPetsJSON = JSON.stringify(pets)

    fs.writeFile(petsPath, newPetsJSON, (writeErr) => {
      if (writeErr) throw writeErr

      res.send(pet)
    })
  })
})

// L in CRUDL
router.get('/', (req, res, next) => {
  fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
    if (err) throw err

    const pets = JSON.parse(petsJSON)
    res.set('Content-Type', 'application/json')
    res.send(pets)
  })
})


module.exports = router
