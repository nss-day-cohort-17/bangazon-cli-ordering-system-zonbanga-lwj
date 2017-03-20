'use strict'

const prompt = require("prompt");
const Table = require('cli-table');
const colors = require('colors');
const clear = require('clear');

// the choice handler module may be removed if solution works
// const { choiceHandler } = require('./choiceHandlerModule') // uncommented to test for circular dependency
const { getProductList } = require('./databaseModule');
const { getSessionInfo, setSessionInfo, addProductToSession } = require('./sessionInfoModule');

function listProducts() {

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

// CHECK IF INPUT IS RETURN TO MAIN MENU
      if(Number(result.product) === list.length + 1) {
        // return console.log("back to menu")
        return listMenu()
      }

// STORE USER INPUT IN AN OBJECT
      const selectedProduct = { "productId": list[(result.product -1)].productId,
                                "productName": list[(result.product -1)].productName,
                                "productPrice": list[(result.product -1)].productPrice
                              }

// GET SESSION INFO TO CHECK IF shoppingCart PROPERTY EXISTS
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


module.exports = { listProducts }


// Testing

// listMenu()
// listProducts()
// listProductPopularity()
