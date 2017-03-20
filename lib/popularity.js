
const prompt = require("prompt");
const colors = require('colors');
const clear = require('clear');
const start = require('./cli');
const Table = require('cli-table');


 const listProductPopularity = function(data) {
   return new Promise((res, rej) => {
      const table = new Table({
        head: ["Product", "Orders", "Customers", "Revenue"],
        colWidths: [18, 11, 11, 15]});

      const totals = {"productName": "Totals"};

      totals.orders = data.reduce((sum, { orders }) => sum + orders, 0);
      totals.customers = data.reduce((sum, { customers }) => sum + customers, 0);
      totals.revenue = data.reduce((sum, { revenue }) => sum + revenue, 0).toFixed(2);

      data.push(totals);

      data.forEach( ({ productName, orders, customers, revenue }, i) => {
        table.push([`${productName}`, `${orders}`, `${customers}`, `$${revenue}` ])
      })
      console.log(table.toString());

      prompt.message = "";
      prompt.delimiter = colors.red("");

      prompt.start();

      prompt.get({
        properties: {
          name: {
            description: (`${colors.red("-->")} Press any key to ${colors.red("return")} to main menu`)
          }
        }
      },
      (err, result) => {
        if (err) {
          console.log(err);
          return
        }
         res();
         start()
      });
    })
 }

module.exports = { listProductPopularity };
