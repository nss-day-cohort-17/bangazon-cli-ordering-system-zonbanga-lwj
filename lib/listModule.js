'use strict'

const prompt = require("prompt");
const Table = require('cli-table');
const colors = require('colors');
const clear = require('clear');

// the choice handler module may be removed if solution works
// const { choiceHandler } = require('./choiceHandlerModule') // uncommented to test for circular dependency
const { getProductList } = require('./databaseModule');
const { getSessionInfo, setSessionInfo, addProductToSession } = require('./sessionInfoModule');

// These 2 modules below are required for the choiceHandler function
const { createCustomerAccount, chooseActiveCustomer } = require('./customerModule')
const { createPaymentOption } = require('./paymentModule')


const choiceHandler = (num) => {

  let choice = num.toString()

  const choiceList = {
    '1': createCustomerAccount,
    '2': chooseActiveCustomer,
    '3': createPaymentOption,
    '4': listProducts,
    '5': "Complete an order function goes here",
    '6': "See product popularity function goes here",
    '7': () => {
      return process.exit()
    }
  }

  return choiceList[num]()
}


const listProductPopularity = function() {

}


const listProducts = function() {

  // get the products - remember it returns a promise
  getProductList()
  .then( (list) => {
    // set up new table - hard coded for 6 cols now.  Maybe implement custom number of columns later
    const table = new Table({ head: ["#", "Product Name", "#", "Product Name", "#", "Product Name"],
                              colWidths: [5, 20, 5, 20, 5, 20]
                            });

    // will prob need refactoring to deal with a list not a multiple of 3
    for(let i = 0; i < list.length; i+=3) {
      table.push(
        [colors.red(`${i + 1}`), `${list[i].productName}`, colors.red(`${i + 2}`), `${list[i+1].productName}`, colors.red(`${i + 3}`), `${list[i+2].productName}`]
      );
    }

    // Add back to menu at the end of the product list table, so user can exit the view
    table.push(
      [colors.red(`${list.length + 1}`), 'Back to Main Menu']
    );

    console.log(table.toString());

// ADD PROMPT TO GET USER INPUT
    prompt.message = "";
    prompt.delimiter = "";

    prompt.get({
      properties: {
        product: {
          description: colors.red(">")
        }
      }
    },
    (err, result) => {
      if(err) {
        console.log(err);
        return;
      }

// CHECK IF INPUt IS RETURN TO MAIN MENU
      if(Number(result.product) === list.length + 1) {
        // return console.log("back to menu")
        return listMenu()
      }

// STORE USER INPUT IN AN OBJECt
      const selectedProduct = { "productId": list[(result.product -1)].productId,
                                "productName": list[(result.product -1)].productName,
                                "productPrice": list[(result.product -1)].productPrice
                              }

// GET SESSION INFO TO CHECK IF shoppingCart PROPERTY EXIStS
      const currentSession = getSessionInfo();

// IF IT DOES, PUSH THE selectedProduct OBJECT INTO THE ARRAY, IF NOT CREATE THE ARRAY AND ADD selectedProduct
      if (currentSession.hasOwnProperty('shoppingCart')) {
        addProductToSession(selectedProduct)

// RUN PRODUCT MENU AGAIN UNTIL USER DECIDES TO EXIT
        clear()
        console.log('') // this fixes the bug on top of the screen
        listProducts()
      } else {
        setSessionInfo("shoppingCart", [selectedProduct]);
      }
    })
  })
}


const listMenu = function() {
  // clear screen to show menu
  clear() // not sure why this is pushing it to the bottom of the screen

  var prompt = require("prompt");
  var colors = require("colors/safe");

  // Prompt Settings
  prompt.message = colors.white("")
  prompt.delimiter = colors.red(">")

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
      // return result.menuChoice
      // console.log(choiceHandler)
      return choiceHandler(result.menuChoice)
  })

}

module.exports = { listProducts, listProductPopularity, listMenu }



// Testing

// listMenu()
// listProducts()
