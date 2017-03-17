'use strict'

const prompt = require("prompt");
const Table = require('cli-table');
const colors = require('colors');

let { getProductList } = require('./databaseModule');
const { getSessionInfo, setSessionInfo, addProductToSession } = require('./sessionInfoModule');

/*
var Table = require('cli-table');
var colors = require('colors');

var table = new Table({ head: ["#", "Product Name", "#", "Product Name", "#", "Product Name"],
                        colWidths: [5, 20, 5, 20, 5, 20]
                      });

table.push(
    { '1': ['Value Row 1 Col 1', colors.red('2'), 'Value Row 1 Col 2', '3', 'Value Row 1 Col 3']}
);

console.log(table.toString());

*/

const listProductPopularity = function() {

}

const listProducts = function() {


  // get the products - remember it returns a promise
  getProductList()
  .then( (list) => {
    // console.log(list)
    // console.log(list.length)

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

// STORE USER INPUT IN AND OBJECT
      const selectedProduct = { "productId": list[(result.product -1)].productId,
                                "productName": list[(result.product -1)].productName,
                                "productPrice": list[(result.product -1)].productPrice
                              }

// GET SESSION INFO TO CHECK IF shoppingCart PROPERTY EXISTS
      const currentSession = getSessionInfo();

// IF IT DOES, PUSH THE selectedProduct OBJECT INTO THE ARRAY, IF NOT CREATE THE ARRAY AND ADD selectedProduct
      if (currentSession.hasOwnProperty('shoppingCart')) {
        addProductToSession(selectedProduct)
      } else {
          setSessionInfo("shoppingCart", [selectedProduct]);
        }
    })
  })
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
      return result.menuChoice
  })

}

module.exports = {listProducts, listProductPopularity, listMenu}



// Testing

// listMenu()
// listProducts()

