'use strict'

const { assert: { isFunction, isObject, property } } = require('chai')
const choiceHandler = require('../lib/choiceHandlerModule')

describe('choiceHandlerModule.js', () => {

  describe(' choiceHandler function', () => {
    it('should be a function', () => {
      isFunction(choiceHandler)
    })

    it('should return an object', () => {
      isObject(choiceHandler('1'))
    })
    it("should have property 'first'", () => {
       property(choiceHandler(1), "first")
     });
  })
})
