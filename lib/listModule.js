'use strict'

var prompt = require("prompt");


const listProductPopularity = function() {

}

const listProducts = function() {

}

const listMenu = function() {
  var prompt = require("prompt");
  var colors = require("colors/safe");

  // Prompt Settings
  prompt.message = colors.white("")
  prompt.delimiter = colors.red(">")

  // const menuheader =`
  // *********************************************************
  // **  Welcome to Bangazon! Command Line Ordering System  **
  // *********************************************************
  // `

  const menu = colors.white(`*********************************************************
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
        description: menu
      }
    }
  }, (err, result) => {
      console.log(result.menuChoice)
  })

}

module.exports = {listProducts, listProductPopularity, listMenu}
