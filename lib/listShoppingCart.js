'use strict'

const prompt = require("prompt");
const Table = require('cli-table');
const colors = require('colors');
const clear = require('clear');
const start = require('./cli');


function listShoppingCart(cartList) {
  // refresh console
  clear()

  const cartItems = cartList.shoppingCart
  let total = 0;

  // console.log(cartItems)

  const table = new Table({ head: ["Product Name", "Product Price"],
                            colWidths: [30, 30]
                          });

  for(let i = 0; i < cartItems.length; i++) {
    // calculate total
    total = total + cartItems[i].productPrice

    table.push(
      [`${cartItems[i].productName}`, `${cartItems[i].productPrice}`]
    );
  }

  table.push(
      [colors.red(`Total`), colors.green(`${total.toFixed(2)}`)]
    );

  console.log(' ') // fixes bug where table is not displayed correctly
  console.log(table.toString());

  // Create prompt to pause screen and take to menu when enter is pressed

  prompt.message = colors.rainbow("Press Enter to Return to Menu"); // woah a rainbow in the console
  prompt.delimiter = "";

  prompt.get({
              properties: {
                name: {
                  description: colors.red(">")
                }
              }
            },
            (err, result) => {
              start()
              if(err) {
                console.log(err);
                reject(err)
                return;
              }
            })
}

module.exports = { listShoppingCart }
