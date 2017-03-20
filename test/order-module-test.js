'use strict'

const { assert } = require('chai')
const { completeOrder } = require('../lib/completeOrder');
// const { addProductsToOrder } = require('../lib/orderModule.js')

// describe(`Order Module`, function() {
// 	describe(`addProductsToOrder`, function() {
// 		it(`return true if product was successfully added`, function() {
// 			assert.isTrue(addProductsToOrder())
// 		})
// 	})
	describe(`completeOrder`, function() {
		it(`return true if order was completed without error`, function() {
			return completeOrder()
			.then(data => {
			assert.isObject(data)
		})
	})
})
