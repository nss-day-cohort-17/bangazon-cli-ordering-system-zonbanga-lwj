'use strict'

// Todo: display prompt for returning to main menu instead of instantly ending


const prompt = require("prompt");
const colors = require("colors/safe");
const { getPaymentOptions, addOrder, addOrderLineItem, getOrder } = require('./databaseModule');
const { setSessionInfo, getSessionInfo } = require('./sessionInfoModule');
const start = require('./cli.js')



function completeOrder() {
	const session = getSessionInfo().shoppingCart;
	const customerId = getSessionInfo().customerId

	const total = session.reduce((sum, { productPrice }) => sum += productPrice, 0);

	return new Promise((resolve, reject) => {
		if(!customerId) {
			console.log(colors.red('\nPlease select customer first\nReturning to menu\n'))
			reject()
			setTimeout(() => {start()}, 1000)
			return
		}

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
			if(result.name.toLowerCase() === "n") {
				reject()
				start()
			}
			else if (result.name.toLowerCase() === "y") {
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
								reject(err)
								return;
							}
							const selection = result.name
							const paymentOptionId = data[selection -1].paymentOptionId
							setSessionInfo('paymentOptionId', paymentOptionId)
							resolve()
						})
					})
			}
		}) // end prompt.get
	}) // end new promise
}


// Testing
// completeOrder();






module.exports = {completeOrder}
