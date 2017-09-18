const express = require('express')
let fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')

const petsPath = 'pets.json'
let app = express()
let port = process.env.port || 8000

app.use(bodyParser.json())

// C in CRUDL
app.post('/pets', (req, res) => {
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
        res.send(pet)
      })
    }
  })
})

// R in CRUDL
app.get('/pets/:id', (req, res) => {
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
app.patch('/pets/:id', (req, res) => {
  fs.readFile(petsPath, 'utf8', (err, content) => {
    if (err) {
      console.err(err)
      res.send(500)
    }
    let id = Number(req.params.id)
    let pets = JSON.parse(content)

    let petName = req.body.name
    let petKind = req.body.kind
    let petAge = req.body.age
    if (id < 0 || id >= pets.length || Number.isNaN(id)) {
      res.sendStatus(404)
    }
    let pet = pets[id]
    if (petName) {
      pet.name = petName
    }
    if (petKind) {
      pet.kind = petKind
    }
    if (petAge) {
      pet.age = petAge
    }

    let newPetJSON = JSON.stringify(pets)
    fs.writeFile(petsPath, newPetJSON, (writeErr) => {
      if (writeErr) {
        console.error(err.stack)
        res.sendStatuscode(500)
      }
      res.send(pet)
    })
  })
})

// D in CRUDL
app.delete('/pets/:id', (req, res) => {
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
app.get('/pets', (req, res) => {
  fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
    if (err) throw err

    let pets = JSON.parse(petsJSON)
    res.send(pets)
  })
})

app.listen(port, () => {
  console.log("Listening on:", port)
})

module.exports = app
