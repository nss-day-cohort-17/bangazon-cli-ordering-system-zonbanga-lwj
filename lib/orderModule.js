'use strict'

const prompt = require("prompt");
const colors = require("colors/safe");
const { getPaymentOptions } = require('./databaseModule');
const { setSessionInfo, getSessionInfo } = require('./sessionInfoModule');

const addProductsToOrder = function() {
	return true
}

const completeOrder = function() {
	const session = getSessionInfo().shoppingCart;
	console.log(session);
const total = session.reduce((sum, productPrice) => sum + parseInt(productPrice));
console.log(total);
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
			getPaymentOptions(22)
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
						console.log(result);
						// setSessionInfo("customerId", customers[(result.customerId -1)].customerId);
					})
				})

		}
	});
}

completeOrder();

module.exports = {addProductsToOrder, completeOrder}
