const express = require('express')
const path = require('path')
const fs = require('fs')

const router = express.Router()
const petsPath = '../pets.json'

router.post('/', (req, res) => {
  fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
    if (err) {
      console.error(err.stack)
      res.sendStatus(500)
    }

    let name = req.body.name
    console.log('this is name', name)
    // let age = Number(req.body.age)
    // let kind = req.body.kind

    let pets = JSON.parse(petsJSON)
    console.log('this is pets', pets)
    // let pet = { name, age, kind }
    let pet = req.body.name

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

router.get('/:id', (req, res) => {
  fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
    if (err) throw err

    let idx = Number(req.params.id)
    console.log('index is', idx)
    let pets = JSON.parse(petsJSON)
    res.set('Content-Type', 'application/json')
    res.send(pets[idx])
  })
})

router.put('/:id', (req, res) => {
  console.log('the req id is', req.params.id)
  res.send('U in CRUDL')
})

router.delete('/:id', (req, res) => {
  console.log('delete id', req.params.id)
  res.send('D in CRUDL')
})

// L
router.get('/', (req, res, next) => {
  fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
    if (err) throw err

    const pets = JSON.parse(petsJSON)
    res.set('Content-Type', 'application/json')
    res.send(pets)
  })
})


module.exports = router
