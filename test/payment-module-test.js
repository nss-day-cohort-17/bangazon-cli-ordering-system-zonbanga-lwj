'use strict'

const {assert} = require('chai')

describe(`paymentModule`, function() {
	const {createPaymentOption} = require('../lib/paymentModule')
	it(`should return 'success'`, function() {
		assert.equal(createPaymentOption(), 'success')
	})
})
