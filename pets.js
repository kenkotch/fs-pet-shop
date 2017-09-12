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
    let pets = JSON.parse(data)

    if (typeof idx !==  'number' || idx < 0 || idx > pets.length-1) {
      console.log(`Usage: ${node} ${file} ${cmd} INDEX`);
    } else if (idx) {
      // let pets = JSON.parse(data)
      console.log(pets[idx])
    } else {

      console.log(pets)
    }
  })
  // create
} else if (cmd === 'create') {
  fs.readFile(petsPath, 'utf8', (readErr, data) => {
    if (readErr) throw readErr

    let pets = JSON.parse(data)
    let age = process.argv[3]
    let kind = process.argv[4]
    let name = process.argv[5]

    if (!pets) {
      console.error(`Usage: ${node} ${file} ${cmd} AGE KIND NAME`)
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
