'use strict';

const { orders, orderLineItems } = require('./mockData.json');
const { products } = require('./products.json');
const { paymentOptions } = require('./payment_options.json');
const {Database} = require('sqlite3')
const db = new Database('./data/bangazon.sqlite')




orders.forEach(({customer_id, payment_option_id, paid_in_full}) => {
  db.run(`INSERT INTO orders VALUES (
    NULL, ${payment_option_id}, ${paid_in_full})`)
});

orderLineItems.forEach(({order_id, product_id}) => {
  db.run(`INSERT INTO order_line_items VALUES (
    NULL, ${order_id}, ${product_id})`)
});

products.forEach(({productName, productPrice}) => {
  db.run(`INSERT INTO products VALUES (
    NULL, "${productName}", ${productPrice})`)
});

paymentOptions.forEach(({paymentName, accountNumber}) => {
  db.run(`INSERT INTO payment_options VALUES (
    NULL, "${paymentName}", ${accountNumber})`)
});
