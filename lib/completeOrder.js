'use strict'

// Todo: display prompt for returning to main menu instead of instantly ending


const prompt = require("prompt");
const colors = require("colors/safe");
const { getPaymentOptions, addOrder, addOrderLineItem, getOrder } = require('./databaseModule');
const { setSessionInfo, getSessionInfo } = require('./sessionInfoModule');



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

// When done, dislay message and redirect to main menu
// gets called after user has selected y in previous prompt


// Testing
completeOrder();






module.exports = {completeOrder}
