'use strict'

const {assert} = require('chai')

describe(`Customer Module`, function() {
	const {createCustomerAccount, chooseActiveCustomer} = require('../lib/customerModule.js')
	describe(`createCustomerAccount`, function() {
		it(`should return an object`, function() {
			assert.isObject(createCustomerAccount())
		})
	})
	describe(`chooseActiveCustomer`, function() {
		it(`should return a number`, function() {
			assert.isNumber(chooseActiveCustomer())
		})
	})
})
