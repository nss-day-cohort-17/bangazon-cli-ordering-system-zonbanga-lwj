'use strict'

const prompt = require("prompt");
const colors = require("colors/safe");
const { getPaymentOptions, addOrder, addOrderLineItem, getOrder } = require('./databaseModule');
const { setSessionInfo, getSessionInfo } = require('./sessionInfoModule');
const start = require('./cli.js')



function completeOrder() {
	const session = getSessionInfo().shoppingCart;
	const customerId = getSessionInfo().customerId

	let total = session.reduce((sum, { productPrice }) => sum += productPrice, 0);
	total = total.toFixed(2)

	return new Promise((resolve, reject) => {
		if(!customerId) {
			console.log(colors.red('\nPlease select customer first\nReturning to menu\n'))
			reject()
			setTimeout(() => {start()}, 2000)
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
						if(data.length === 0) {
							console.log(colors.red('\nNo payment options found for user\nReturning to menu\n'))
							reject('No payment options for user')
							setTimeout(() => {start()}, 2000)
							return
						}
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
