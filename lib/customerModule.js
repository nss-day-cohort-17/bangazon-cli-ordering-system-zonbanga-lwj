'use strict'

const prompt = require("prompt");
const colors = require("colors/safe");
const { getCustomerInfo } = require('./databaseModule');
const { setSessionInfo } = require('./sessionInfoModule');

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
	getCustomerInfo()
		.then(customers => {
			console.log(`Which customer will be active?`)
			customers.forEach( ({ name }, i) => {
				console.log(`${++i}. ${name}`)
			})

			prompt.message = "";
			prompt.delimiter = "";

			prompt.get({
				properties: {
					customerId: {
						description: colors.red(">")
					}
				}
			},
			(err, result) => {
				if(err) {
					console.log(err);
					return;
				}
				setSessionInfo("customerId", customers[(result.customerId -1)].customerId);
			})
		})
}


module.exports = {createCustomerAccount, chooseActiveCustomer}
