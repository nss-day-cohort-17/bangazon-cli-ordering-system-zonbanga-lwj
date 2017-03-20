'use strict';

// Nice find Mr. West - replace switch statement with object
// https://toddmotto.com/deprecating-the-switch-statement-for-object-literals/

const { listProducts } = require('./listProducts')
const { listMenu } = require('./listMenu')
const { createCustomerAccount } = require('./createCust')
const { createPaymentOption } = require('./paymentModule')
const { chooseActiveCustomer } = require('./chooseActiveCust')
const { listProductPopularity } = require('./popularity');
const { getCustomerInfo, getProductList, addCustomer, addPaymentOption, getPopularity } = require('./databaseModule');
const { completeOrder } = require('./completeOrder.js')
const { addOrderToDb } = require('./addOrderToDb')
const { resetList } = require('./invalidInput.js')
const start = require('./cli');
const colors = require("colors/safe")

module.exports = (num) => {

  const choiceList = {
    '1': { "first": createCustomerAccount, "second": addCustomer },
    '2': { "first": getCustomerInfo, "second": chooseActiveCustomer },
    '3': { "first": createPaymentOption, "second":addPaymentOption },
    '4': { "first": getProductList, "second": listProducts },
    '5': { "first": completeOrder, "second": addOrderToDb},
    '6': { "first": getPopularity, "second": listProductPopularity },
    '7': () => {
      return process.exit()
    }
  }

  return choiceList[num] || { "first": resetList };
}
