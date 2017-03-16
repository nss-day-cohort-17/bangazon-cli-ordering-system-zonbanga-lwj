'use strict'

const {assert} = require('chai')

describe(`Payment Module`, function() {
	const {createPaymentOption} = require('../lib/paymentModule')
	it(`should return 'success'`, function() {
		assert.equal(createPaymentOption(), 'success')
	})
})
