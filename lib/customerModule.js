'use strict'

const prompt = require("prompt");
const colors = require("colors/safe");

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
	  return result
	});
}

const chooseActiveCustomer = function() {
	return 5
}

createCustomerAccount();













module.exports = {createCustomerAccount, chooseActiveCustomer}
