'use strict'

const {Database} = require('sqlite3')
const db = new Database('./data/bangazon.sqlite')
const start = require('./cli');

////////////////////////////
// Getters
////////////////////////////

/**
 * Makes DB call to get Payment options for customer
 * returns promise which resolves on success
 * returns array of payment options [{paymentOption: 'visa', paymentOptionId: 3}]
 * @param {Number} customerId - customer id from customers table
 */
function getPaymentOptions(customerId) {
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
function getCustomerInfo() {
	return new Promise((resolve, reject) => {
		db.all(`
			select customerId, name
			from customers;`, (err, data) => {
				if(err) reject(err)
				resolve(data)
			})
	})
}


function getProductList() {
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
function getOrder(paymentOptionId) {
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

function getPopularity() {
	return new Promise((resolve, reject) => {
		// can add product price later if necessary
		db.all(`
			SELECT p.productName AS productName, COUNT(oli.productId) AS orders, COUNT(DISTINCT po.customerId) AS customers, SUM(p.productPrice) AS revenue
			FROM order_line_items oli, products p, orders o, payment_options po
			ON p.productId = oli.productId
			AND o.orderId = oli.orderId
			AND po.paymentOptionId = o.paymentOptionId
			GROUP BY p.productName
			ORDER BY revenue DESC;`, (err, data) => {
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
function addCustomer(customer) {
	const {name, address, city, state, postalCode, phoneNumber} = customer

	return new Promise((resolve, reject) => {
		db.run(`
			insert into customers
			values (null, '${name}', '${address}', '${city}',
			'${state}', '${postalCode}', '${phoneNumber}')`, err => {
				if(err) reject(err)
				resolve()
				start();
			})
	})
}

/**
 * Makes DB call to add payment option
 * returns promise which resolves on success
 * @param {object} paymentOption - object with info gained from prompt
 */
function addPaymentOption(paymentOption) {
	const {paymentName, accountNumber, customerId} = paymentOption

	return new Promise((resolve, reject) => {
		db.run(`
			insert into payment_options
			values (null, '${paymentName}', '${accountNumber}', '${customerId}')`, err => {
				if(err) reject(err)
				console.log('\nPayment option successfully added\n')
				resolve()
				start();
			})
	})
}

/**
 * add order to database with given paymentId
 * @param {number} paymentOptionId
 * returns array of length 1 with order object
 * ex: [ { orderId: 18, paymentOptionId: 22, paidInFull: 1 } ]
 */
function addOrder(paymentOptionId) {
	return new Promise((resolve, reject) => {
		db.run(`
			insert into orders
			values (null,  ${paymentOptionId}, 1);`, err => {
				if(err) reject(err)
				getOrder(paymentOptionId)
					.then(order => resolve(order))
					.catch(err => reject(err))
			})
	})
}

/**
 * adds a single order line item with given orderId and productId
 * @param {number} orderId
 * @param {number} productId
 * returns promise that resolves after call complete
 */
function addOrderLineItem(orderId, productId) {
	return new Promise((resolve, reject) => {
		db.run(`
			insert into order_line_items
			values (null, ${orderId}, ${productId});`, err => {
				if(err) reject(err)
				resolve()
			})
	})
}

// Testing



module.exports = {
	addCustomer,
	addPaymentOption,
	addOrder,
	addOrderLineItem,
	getPaymentOptions,
	getProductList,
	getCustomerInfo,
	getOrder,
	getPopularity
}
