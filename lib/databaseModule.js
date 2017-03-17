'use strict'

const {Database} = require('sqlite3')
const db = new Database('./data/bangazon.sqlite')

////////////////////////////
// Getters
////////////////////////////

/**
 * Makes DB call to get Payment options for customer
 * returns promise which resolves on success
 * returns array of payment options [{paymentOption: 'visa', paymentOptionId: 3}]
 * @param {Number} customerId - customer id from customers table
 */
const getPaymentOptions = function(customerId) {
	return new Promise((resolve, reject) => {
		db.all(`
			select p.paymentName, p.paymentOptionId
			from customers as c, payment_options as p
			on c.customerId = p.customerId
			where c.customerId = ${customerId};`, (err, data) => {
				if(err) reject(err)
				resolve(data)
			})
	})
}

/**
 * Makes DB call to get Customer info to select active customer
 * returns promise which resolves on success
 * returns array of customer options [{customerId: 1, name: 'Joel'}]
 */
const getCustomerInfo = function() {
	return new Promise((resolve, reject) => {
		db.all(`
			select customerId, name
			from customers;`, (err, data) => {
				if(err) reject(err)
				resolve(data)
			})
	})
}


const getProductList = function () {
	return new Promise((resolve, reject) => {
		// can add product price later if necessary
		db.all(`
			SELECT products.productName, productId, productPrice FROM products`, (err, data) => {
				if(err) reject(err)
				resolve(data)
			})
	})
}

/**
 * gets most recent order for given payment option id
 * @return {promise} - resolves with data from db call
 * ex: [{ orderId: 16, paymentOptionId: 17, paidInFull: 1 }]
 */
const getOrder = function(paymentOptionId) {
	return new Promise((resolve, reject) => {
		db.all(`
			select * from orders
			where paymentOptionId = ${paymentOptionId}
			order by orderId desc limit 1;`, (err, data) => {
				if(err) reject(err)
				resolve(data)
			})
	})
}

////////////////////////////
// Setters
////////////////////////////

/**
 * Makes DB call to add customer
 * returns promise which resolves on success
 * @param {object} customer - object with info gained from prompt
 */
const addCustomer = function(customer) {
	const {name, address, city, state, postalCode, phoneNumber} = customer

	return new Promise((resolve, reject) => {
		db.run(`
			insert into customers
			values (null, '${name}', '${address}', '${city}',
			'${state}', '${postalCode}', '${phoneNumber}')`, err => {
				if(err) reject(err)
				resolve()
			})
	})
}

/**
 * Makes DB call to add payment option
 * returns promise which resolves on success
 * @param {object} paymentOption - object with info gained from prompt
 */
const addPaymentOption = function(paymentOption) {
	const {paymentName, accountNumber, customerId} = paymentOption

	return new Promise((resolve, reject) => {
		db.run(`
			insert into payment_options
			values (null, '${paymentName}', '${accountNumber}', '${customerId}')`, err => {
				if(err) reject(err)
				resolve()
			})
	})
}

/**
 * add order to database with given paymentId
 * @param {number} paymentOptionId
 * returns promise that resolves on completion of db call
 */
const addOrder = function(paymentOptionId) {
	return new Promise((resolve, reject) => {
		db.run(`
			insert into orders
			values (null,  ${paymentOptionId}, 1);`, err => {
				if(err) reject(err)
				resolve()
			})
	})
}

const addOrderLineItem = function(orderId, productId)

// create order line items from that order id and product ids in shopping cart






module.exports = {
	addCustomer,
	addPaymentOption,
	addOrder,
	getPaymentOptions,
	getProductList,
	getCustomerInfo,
	getOrder
}
