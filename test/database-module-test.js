'use strict'

const {assert} = require('chai')
const {
	addCustomer,
	addPaymentOption,
	addOrder,
	getPaymentOptions,
	getProductList,
	getCustomerInfo,
	getOrder
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
	describe(`addOrder`, function() {
		it(`should be a function`, function() {
			assert.isFunction(addOrder)
		})
		it(`should return an array`, function() {
			return addOrder(22).then(order => assert.isArray(order))
		})
		it(`should return an array of length 1`, function() {
			return addOrder(22).then(order => assert.equal(order.length, 1))
		})
	})
	describe(`getOrder`, function() {
		it(`should be a function`, function() {
			assert.isFunction(getOrder)
		})
		it(`should return an array`, function() {
			return getOrder(18).then(data => assert.isArray(data))
		})
	})
	describe(`getPaymentOptions`, function() {
		it(`should be a function`, function() {
			assert.isFunction(getPaymentOptions)
		})
		it(`should return an array`, function() {
			return getPaymentOptions(21)
			.then(data => {
				assert.isArray(data)
			})
		})
	})
	describe('getProductList', function() {
		it(`should return an array`, function(){
			return getProductList(10)
			.then( productsList => {
				assert.isArray(productsList)
			})
		})
	})
	describe(`getCustomerInfo`, function() {
		it(`should return an array`, function() {
			return getCustomerInfo().then(data => {
				assert.isArray(data)
		});
		})
	})
})
