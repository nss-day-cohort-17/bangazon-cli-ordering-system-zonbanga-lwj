'use strict'

const prompt = require("prompt");
const start = require('./cli.js')
const {addOrder, addOrderLineItem} = require('./databaseModule.js')
const colors = require("colors/safe");
const { getSessionInfo, setSessionInfo } = require('./sessionInfoModule');

function addOrderToDb() {
	const {shoppingCart, paymentOptionId, customerId} = getSessionInfo()

	addOrder(paymentOptionId).then(order => {
		const [{orderId}] = order
		let productId

		// Add order line items one at a time
		for (let i = 0; i < shoppingCart.length; i++) {
			productId = shoppingCart[i].productId
			setTimeout(() => {
				addOrderLineItem(orderId, productId)}, i * 500)
		}

		setSessionInfo('shoppingCart', [])

		prompt.message = ""
		prompt.delimiter = ">"

		prompt.get({
			properties: {
				name: {
					description: (`Your order is complete! Press any key to ${colors.red("return")} to main menu.\n`)
				}
			}
		}, (err, result) => {
			if(err) console.error(err)
			start()
		})
	})
}

module.exports = {addOrderToDb}
