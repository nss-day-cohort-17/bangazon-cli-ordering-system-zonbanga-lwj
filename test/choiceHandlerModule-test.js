'use strict'

const { assert: { isFunction, isNumber } } = require('chai')
const { choiceHandler } = require('../lib/choiceHandlerModule')

describe('choiceHandlerModule.js', () => {

  describe(' choiceHandler function', () => {
    it('should be a function', () => {
      isFunction(choiceHandler)
    })

    it('should return a function', () => {
      isNumber(choiceHandler('1'))
    })
  })
})
