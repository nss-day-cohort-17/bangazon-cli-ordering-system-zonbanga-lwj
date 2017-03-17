'use strict'

const {assert} = require('chai')

describe(`Payment Module`, function() {
	const {createPaymentOption} = require('../lib/paymentModule')
	it(`should return 'on object with user account into'`, function() {
		assert.isObject(createPaymentOption())
	})
})
