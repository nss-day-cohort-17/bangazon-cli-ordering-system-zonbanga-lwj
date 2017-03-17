'use strict';

const { orders, orderLineItems } = require('./mockData.json');
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
