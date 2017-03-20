'use strict'

// const listMenu = require('./listMenu')
// const choiceHandler = require('./choiceHandlerModule')

// console.log('y hallo ther');


module.exports = function start() {
const listMenu = require('./listMenu')
const choiceHandler = require('./choiceHandlerModule')
let fns = {};
listMenu()
  .then(input => choiceHandler(input))
  .then(result => {
    fns = result;
    return result.first()
  })
  .then(data => fns.second(data))
  .catch((err) => console.log(err));


}
