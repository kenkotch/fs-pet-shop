'use strict'

const fs = require('fs')
const path = require('path')
const petsPath = path.join(__dirname, 'pets.json')

const node = path.basename(process.argv[0])
const file = path.basename(process.argv[1])
const cmd = process.argv[2]

if (cmd === 'read') {
  fs.readFile(petsPath, 'utf8', (err, data) => {
    if (err) throw err

    let idx = process.argv[3]
    let pets = JSON.parse(data)

    if (isNaN(idx)) {
      console.log(pets)
      process.exit()
    }

    if (idx < 0 || idx > pets.length - 1) {
      console.error(`Usage: ${node} ${file} ${cmd} INDEX`)
    } else if (idx) {
      console.log(pets[idx])
    } else {
      console.log(pets)
    }
  })
} else if (cmd === 'create') {
  fs.readFile(petsPath, 'utf8', (readErr, data) => {
    if (readErr) throw readErr

    let pets = JSON.parse(data)
    let age = Number(process.argv[3])
    let kind = process.argv[4]
    let name = process.argv[5]

    if (isNaN(age)) {
      console.error(`Usage: ${node} ${file} ${cmd} AGE KIND NAME`)
      process.exit(1)
    }

    if (!name) {
      console.error(`Usage: ${node} ${file} ${cmd} AGE KIND NAME`)
      process.exit(1)
    } else {
      pets.push({ age, kind, name })

      let petsJSON = JSON.stringify(pets)

      fs.writeFile(petsPath, petsJSON, (writeErr) => {
        if (writeErr) throw writeErr
        console.log(age, kind, name)
      })
    }
  })
// }

// update
// } else if (cmd === 'update') {
//   fs.readFile(petsPath, 'utf8', (err, data) => {
//     if (err) throw err
//
//
//   })
} else {
  console.error(`Usage: ${node} ${file} [ read | create | update | destroy ]`)
  process.exit(1)
}
