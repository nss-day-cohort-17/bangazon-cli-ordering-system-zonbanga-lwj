const colors = require('colors');
const prompt = require("prompt");
const Table = require('cli-table');
const { setSessionInfo } = require('./sessionInfoModule');
const start = require('./cli');

function chooseActiveCustomer(customers) {

			const table = new Table({
				head: ["#", "Customer Name", "#", "Customer Name"],
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
				start();
				return;
			})
}

module.exports = {chooseActiveCustomer};
