'use strict'

// Note: run these functions from the root of this project, not from within the data file

/**
 * This script contains functions for the following tasks:
 * 	- Creating the bangazon database
 * 	- Creating the tables
 * 	- Populating the tables
 * 	- Deleting the tables' data
 */

const {Database} = require('sqlite3')
const db = new Database('./data/bangazon.sqlite')


///////////////////
// Create Tables //
///////////////////

function createCustomers() {
	db.run(`CREATE TABLE IF NOT EXISTS 'customers' (
		'customerId' INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
		'name' TEXT,
		'address' TEXT,
		'city' TEXT,
		'state' TEXT,
		'postalCode' TEXT,
		'phoneNumber' TEXT
		);`)
}

function createPaymentOptions() {
		db.run(`CREATE TABLE IF NOT EXISTS 'payment_options' (
		'paymentOptionId' INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
		'paymentName' TEXT,
		'accountNumber' TEXT,
		'customerId' INTEGER,
		FOREIGN KEY('customerId') REFERENCES 'customers'('customerId')
		);`)
}

function createProducts() {
	db.run(`CREATE TABLE IF NOT EXISTS 'products' (
		'productId' INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
		'productName' INTEGER,
		'productPrice' INTEGER
		);`)
}

function createOrders() {
	db.run(`CREATE TABLE IF NOT EXISTS 'orders' (
		'orderId' INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
		'paymentOptionId' INTEGER NOT NULL,
		'paidInFull' INTEGER CHECK(paidInFull = 1 or paidInFull = -1),
		FOREIGN KEY ('paymentOptionId') REFERENCES payment_options(paymentOptionId)
		);`)
}

function createOrderLineItems() {
	db.run(`CREATE TABLE IF NOT EXISTS 'order_line_items' (
		'lineItemId' INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
		'orderId' INTEGER NOT NULL,
		'productId' INTEGER NOT NULL,
		FOREIGN KEY ('orderId') REFERENCES orders(orderId),
		FOREIGN KEY ('productId') REFERENCES products(productId)
		);`)
}

function createAll() {
	createCustomers()
	createProducts()
	createPaymentOptions()
	createOrders()
	createOrderLineItems()
}

/////////////
// Delete  //
/////////////

function wipeData() {
	db.run(`DELETE FROM customers`)
	db.run(`DELETE FROM products`)
	db.run(`DELETE FROM payment_options`)
	db.run(`DELETE FROM orders`)
	db.run(`DELETE FROM order_line_items`)
}

function dropTables() {
	db.run(`DROP TABLE customers`)
	db.run(`DROP TABLE products`)
	db.run(`DROP TABLE payment_options`)
	db.run(`DROP TABLE orders`)
	db.run(`DROP TABLE order_line_items`)
}

// reseed
// db.run(`DELETE FROM products`)
// db.run(`DROP TABLE products`)
createProducts()

// Export functions
module.exports = {createCustomers, createPaymentOptions, createProducts, createOrders, createOrderLineItems, createAll, wipeData, dropTables}
