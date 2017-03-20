'use strict'

const prompt = require("prompt")
const start = require('./cli.js')
const colors = require("colors/safe")
const {addPaymentOption} = require('./databaseModule.js')

const {getSessionInfo, setSessionInfo} = require('./sessionInfoModule')

//TODO: add callback for main menu

/**
 * runs the prompts for adding a payment option for a customer
 * calls db function in callback after prompt
 * @param  {number} customerId - customer id from previous prompt
 * @return {undefined}
 */
function createPaymentOption() {
	const {customerId} = getSessionInfo()

	return new Promise((resolve, reject) => {
		if(!customerId) {
			console.log(colors.red('\nPlease select customer first\nReturning to menu\n'))
			reject()
			setTimeout(() => {start()}, 2000)
			return
		}
		prompt.message = ""
		prompt.delimiter = colors.red(">")

		prompt.start()

		prompt.get({
		  properties: {
		    paymentName: {
		      description: (`Enter payment ${colors.blue("type")} (e.g. AmEx, Visa, Checking)\n`)
		    },
		    accountNumber: {
		      description: ("\nEnter account number\n")
		    }
		  }
		}, (err, result) => {
			if (err) console.log(err);
			result.customerId = customerId
			res(result)
		})
	})
}

// Testing
// createPaymentOption()
module.exports = {createPaymentOption}

// Testing

// createPaymentOption()
