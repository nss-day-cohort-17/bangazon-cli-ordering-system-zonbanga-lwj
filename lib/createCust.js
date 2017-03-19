'use strict'

const prompt = require("prompt");
const Table = require('cli-table');
const colors = require("colors/safe");
const { getCustomerInfo } = require('./databaseModule');
const { setSessionInfo } = require('./sessionInfoModule');

function createCustomerAccount() {
	return new Promise((res, rej) => {
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
			if (err) {
				console.log(err);
				return
			}
		   res(result);
		});
	})
}

module.exports = {createCustomerAccount};

// Testing

// createCustomerAccount()
