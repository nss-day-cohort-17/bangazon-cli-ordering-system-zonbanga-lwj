'use strict'

const {assert} = require('chai')
const {
	addCustomer,
	addPaymentOption,
	getPaymentOptions
	} = require('../lib/databaseModule')

describe(`Database Module`, function() {
	describe(`addCustomer`, function() {
		it(`should be a function`, function() {
			assert.isFunction(addCustomer)
		})
	})
	describe(`addPaymentOption`, function() {
		it(`should be a function`, function() {
			assert.isFunction(addPaymentOption)
		})
	})
	describe(`getPaymentOptions`, function() {
		it(`should be a function`, function() {
			assert.isFunction(getPaymentOptions)
		})
		it(`should return an array`, function() {
			return getPaymentOptions(21).then(data => {
				assert.isArray(data)
			})
		})
	})
})
