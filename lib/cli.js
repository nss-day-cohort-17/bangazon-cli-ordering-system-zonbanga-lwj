'use strict'

const listMenu = require('./listMenu')
const choiceHandler = require('./choiceHandlerModule')

// console.log('y hallo ther')


listMenu()
  .then(result => choiceHandler(result))
  .then(result => {
    result.first()
      .then(data => result.second(data))
  })
