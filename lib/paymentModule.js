'use strict'

const prompt = require("prompt")
const colors = require("colors/safe")
const {addPaymentOption} = require('./databaseModule.js')

//TODO: add callback for main menu

/**
 * runs the prompts for adding a payment option for a customer
 * calls db function in callback after prompt
 * @param  {number} customerId - customer id from previous prompt
 * @return {undefined}
 */
const createPaymentOption = function(customerId) {
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
		addPaymentOption(result)
		// Call next prompt
	})
}

createPaymentOption(25)

module.exports = {createPaymentOption}
