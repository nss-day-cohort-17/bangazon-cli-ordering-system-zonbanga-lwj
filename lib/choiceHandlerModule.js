'use strict';

// Nice find Mr. West - replace switch statement with object
// https://toddmotto.com/deprecating-the-switch-statement-for-object-literals/

const { listProducts } = require('./listProducts')
const { createCustomerAccount } = require('./createCust')
const { createPaymentOption } = require('./paymentModule')
const { chooseActiveCustomer } = require('./chooseActiveCust')
const { getCustomerInfo, getProductList, addCustomer, addPaymentOption } = require('./databaseModule');
const start = require('./cli');



module.exports = (num) => {
console.log(start);
  let choice = num.toString()

  const choiceList = {
    '1': { "first": createCustomerAccount, "second": addCustomer },
    '2': { "first": getCustomerInfo, "second": chooseActiveCustomer },
    '3': { "first": createPaymentOption, "second":addPaymentOption },
    '4': { "first": getProductList, "second": listProducts },
    '5': "Complete an order function goes here",
    '6': "See product popularity function goes here",
    '7': () => {
      return process.exit()
    }
  }

  return choiceList[num];
}


// old way - wrapped functions - new way in listModule looks better, thanks Lucas
// const choiceHandler = (num) => {
//
//   let choice = num.toString()
//
//   const choiceList = {
//     '1': () => {
//       return createCustomerAccount
//     },
//     '2': () => {
//       return chooseActiveCustomer()
//     },
//     '3': () => {
//       return createPaymentOption()
//     },
//     '4': () => {
//       return listProducts
//     },
//     '5': () => {
//       return console.log("Complete an Order")
//     },
//     '6': () => {
//       return console.log("See Product Popularity")
//     },
//     '7': () => {
//       // close program
//       return process.exit()
//     }
//   }
//
//   return choiceList[num]
//   // return choiceList[num]()
// }

// module.exports = { choiceHandler }

// Test

// choiceHandler(4)
