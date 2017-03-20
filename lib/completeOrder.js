'use strict'

// Todo: display prompt for returning to main menu instead of instantly ending


const prompt = require("prompt");
const colors = require("colors/safe");
const { getPaymentOptions, addOrder, addOrderLineItem, getOrder } = require('./databaseModule');
const { setSessionInfo, getSessionInfo } = require('./sessionInfoModule');
// const { addOrderToDb } = require('./addOrderToDb');



function completeOrder() {
	const session = getSessionInfo().shoppingCart;
	const total = session.reduce((sum, { productPrice }) => sum += productPrice, 0);

	prompt.message = "";
	prompt.delimiter = colors.red("(Y/N) >");

	prompt.get({
		properties: {
			name: {
				description: (`Your order total is $${total}.  Ready to purchase\n`)
			}
		}
	},
	(err, result) => {
		if (err) console.log(err);
		if (result.name.toLowerCase() === "y") {
			getPaymentOptions(getSessionInfo().customerId)
				.then(data => {
					data.forEach(({ paymentName }, i) => {
						console.log(`${++i}. ${paymentName}`);
					})

					prompt.message = "";
					prompt.delimiter = "";

					prompt.get({
						properties: {
							name: {
								description: colors.red(">")
							}
						}
					},
					(err, result) => {
						if(err) {
							console.log(err);
							return;
						}
						const selection = result.name
						const paymentOptionId = data[selection -1].paymentOptionId
						setSessionInfo('paymentOptionId', paymentOptionId)
						addOrderToDb()
					})
				})
		}
	});
}

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

// When done, dislay message and redirect to main menu
// gets called after user has selected y in previous prompt


// Testing
completeOrder();






module.exports = {completeOrder}
