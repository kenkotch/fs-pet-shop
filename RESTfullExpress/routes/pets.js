const express = require('express')

const router = express.Router()

router.post('/', (req, res) => {
  console.log('POST=', req.body)

  let name = req.body.name
  let age = Number(req.body.age)
  let kind = req.body.kind

  let pet = { name, age, kind }

  console.log('req.body from pet', pet)

  res.send('C in CRUDL')
})

router.get('/:id', (req, res) => {
  console.log('the req id is', req.params.id)
  res.send('R in CRUDL')
})

router.put('/:id', (req, res) => {
  console.log('the req id is', req.params.id)
  res.send('U in CRUDL')
})

router.delete('/:id', (req, res) => {
  console.log('delete id', req.params.id)
  res.send('D in CRUDL')
})

router.get('/', (req, res) => {
  console.log('this is the whole list')
  res.send('L in CRUDL')
})


module.exports = router
