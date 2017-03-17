'use strict'

const prompt = require("prompt");
const Table = require('cli-table');
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
		if (err) {
			console.log(err);
			return
		}
	  return result;
	});
}

const chooseActiveCustomer = function() {
	getCustomerInfo()
		.then(customers => {

			const table = new Table({
				head: ["#", "Product Name", "#", "Product Name"],
				colWidths: [5, 30, 5, 30]});

			const customerTable = customers.map(customer => customer);

			customerTable.forEach( ({ name }, i) => {
				table.push([`${++i}`, `${name}` ])
			})

			console.log(`Which customer will be active?`)
			console.log(table.toString());

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
