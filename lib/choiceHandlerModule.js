'use strict';

// Nice find Mr. West - replace switch statement with object
// https://toddmotto.com/deprecating-the-switch-statement-for-object-literals/

const { listProducts, listMenu } = require('./listModule')
const { createCustomerAccount, chooseActiveCustomer } = require('./customerModule')
const { createPaymentOption } = require('./paymentModule')


// old way - wrapped functions - new way in listModule looks better, thanks Lucas
const choiceHandler = (num) => {

  let choice = num.toString()

  const choiceList = {
    '1': () => {
      return createCustomerAccount
    },
    '2': () => {
      return chooseActiveCustomer()
    },
    '3': () => {
      return createPaymentOption()
    },
    '4': () => {
      return listProducts
    },
    '5': () => {
      return console.log("Complete an Order")
    },
    '6': () => {
      return console.log("See Product Popularity")
    },
    '7': () => {
      // close program
      return process.exit()
    }
  }

  return choiceList[num]
  // return choiceList[num]()
}

module.exports = { choiceHandler }

// Test

// choiceHandler(4)
