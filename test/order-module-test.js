'use strict'

const {assert} = require('chai')

describe(`Order Module`, function() {
	const {addProductsToOrder, completeOrder} = require('../lib/orderModule.js')
	describe(`addProductsToOrder`, function() {
		it(`return true if product was successfully added`, function() {
			assert.isTrue(addProductsToOrder())
		})
	})
	describe(`completeOrder`, function() {
		it(`return true if order was completed without error`, function() {
			assert.isTrue(completeOrder())
		})
	})
})
