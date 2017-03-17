'use strict'

const {assert} = require('chai')
const {
	addCustomer,
	addPaymentOption,
	getPaymentOptions,
	getProductList,
	getCustomerInfo
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
	describe(`getCustomerInfo`, function() {
		it(`should return an array`, function() {
			return getCustomerInfo().then(data => {
				assert.isArray(data)
		});
		})
	})
})
