'use strict'

const fs = require('fs')
const path = require('path')
const petsPath = path.join(__dirname, 'pets.json')

const node = path.basename(process.argv[0])
const file = path.basename(process.argv[1])
const cmd = process.argv[2]

// read
if (cmd === 'read') {
  fs.readFile(petsPath, 'utf8', (err, data) => {
    if (err) throw err

    let idx = process.argv[3]

    if (idx) {
      let pets = JSON.parse(data)
      console.log(pets[idx])
    } else {
      let pets = JSON.parse(data)
      console.log(pets)
    }
  })
  // create
} else if (cmd === 'create') {
  fs.readFile(petsPath, 'utf8', (readErr, data) => {
    if (readErr) throw readErr

    let pets = JSON.parse(data)
    let pet = process.argv[3]

    if (!pet) {
      console.error(`Usage: ${node} ${file} ${cmd} GUEST`)
      process.exit(1)
    }
    pets.push(pet)

    let petsJSON = JSON.stringify(pets)

    fs.writeFile(petsPath, petsJSON, (writeErr) => {
      if (writeErr) throw writeErr

      console.log(pet)
    })
  })

  // update
  // } else if (cmd === 'update') {
  //   fs.readFile(petsPath, 'utf8', (err, data) => {
  //     if (err) throw err
  //
  //
  //   })
} else {
  console.error(`Usage: ${node} ${file} [read | create]`)
  process.exit(1)
}
