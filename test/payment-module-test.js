'use strict'

const {assert} = require('chai')
const {createPaymentOption} = require('../lib/paymentModule')

describe(`Payment Module`, function() {
	it(`should be a function'`, function() {
		assert.isFunction(createPaymentOption)
	})
})
