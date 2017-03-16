'use strict'

const prompt = require("prompt");
const colors = require("colors/safe");
const { getCustomerInfo } = require('./databaseModule');

const createCustomerAccount = function() {

	prompt.message = "";
	prompt.delimiter = colors.red(">");

	prompt.start();

	prompt.get({
	  properties: {
	    name: {
	      description: ("Enter customer name\n")
	    },
	    address: {
	      description: ("\nEnter street address\n")
	    },
	    city: {
	      description: ("\nEnter city\n")
	    },
	    state: {
	      description: ("\nEnter state\n")
	    },
	    postalCode: {
	      description: ("\nEnter postal code\n")
	    },
	    phoneNumber: {
	      description: ("\nEnter phone number\n")
	    }
	  }
	},
	(err, result) => {
		if (err) console.log(err);
	  return result;
	});
}

const chooseActiveCustomer = function() {
	const customers = getCustomerInfo()
		.then(result => {
			console.log(`Which customer will be active?`)

		})
	return 5
}



chooseActiveCustomer();











module.exports = {createCustomerAccount, chooseActiveCustomer}
