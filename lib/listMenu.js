'use strict';

const colors = require('colors');
const clear = require('clear');
const prompt = require("prompt");

module.exports = () => {
  return new Promise((res, rej) => {
  // clear screen to show menu
    clear() // not sure why this is pushing it to the bottom of the screen

    var prompt = require("prompt");
    var colors = require("colors/safe");

    // Prompt Settings
    prompt.message = colors.white("")
    prompt.delimiter = colors.red(">")

    const menu = colors.white(`
  *********************************************************
  **  Welcome to Bangazon! Command Line Ordering System  **
  *********************************************************
  1. Create a customer account
  2. Choose active customer
  3. Create a payment option
  4. Add product to shopping cart
  5. Complete an order
  6. See product popularity
  7. Leave Bangazon!
  `)

    prompt.start()

    prompt.get({
      properties: {
        menuChoice: {
          description: menu,
          pattern: /([1234567])/,
          message: "Please enter 1-7"
        }
      }
    }, (err, result) => {
        if(err) {

        }
        res(result.menuChoice);
    })
  })
}
