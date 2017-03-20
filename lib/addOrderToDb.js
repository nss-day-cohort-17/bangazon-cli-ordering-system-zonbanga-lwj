'use strict'

function addOrderToDb() {
	const {shoppingCart, paymentOptionId, customerId} = getSessionInfo()

	addOrder(paymentOptionId).then(order => {
		const [{orderId}] = order
		let productId

		// Add order line items one at a time
		for (let i = 0; i < shoppingCart.length; i++) {
			productId = shoppingCart[i].productId
			addOrderLineItem(orderId, productId)
				.catch(err => {})
		}

		console.log(`Your order is complete! Press any key to ${colors.red("return")} to main menu.`);
		// Redirect to main menu
	})
}

module.exports = {addOrderToDb}
