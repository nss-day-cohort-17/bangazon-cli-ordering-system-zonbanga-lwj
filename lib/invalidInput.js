'use strict'

const start = require('./cli');
const colors = require("colors/safe")

function resetList() {
  console.log(colors.red('\nPlease select a number 1-8'))
  setTimeout(() => {start()}, 2000)
  return Promise.reject()
}

function genericErrorMessage() {
  console.log(colors.red('\nError: invalid input'))
  setTimeout(() => {start()}, 2000)
  return Promise.reject()
}

module.exports = {resetList, genericErrorMessage}
