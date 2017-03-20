'use strict'

const prompt = require("prompt")
const start = require('./cli.js')
const colors = require("colors/safe")
const {addPaymentOption} = require('./databaseModule.js')

const {getSessionInfo, setSessionInfo} = require('./sessionInfoModule')

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
			resolve(result)
		})
	})
}

// Testing
// createPaymentOption()
module.exports = {createPaymentOption}

// Testing

// createPaymentOption()
