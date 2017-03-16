'use strict'

var prompt = require("prompt");


const listProductPopularity = function() {

}

const listProducts = function() {

}

const listMenu = function() {
  var prompt = require("prompt");
  var colors = require("colors/safe");


  const menuheader =`
  *********************************************************
  **  Welcome to Bangazon! Command Line Ordering System  **
  *********************************************************
  `

  const menu = `1. Create a customer account
  2. Choose active customer
  3. Create a payment option
  4. Add product to shopping cart
  5. Complete an order
  6. See product popularity
  7. Leave Bangazon!
  >`

  prompt.start()

  process.stdout.write(menuheader)
  process.stdout.write(menu)

  prompt.get(['menuChoice'], (err, result) => {
    console.log('Command-line input received:');
      console.log('  menuChoice: ' + result.menuChoice);
})

}

module.exports = {listProducts, listProductPopularity}
