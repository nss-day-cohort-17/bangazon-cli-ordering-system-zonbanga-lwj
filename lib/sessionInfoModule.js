'use strict'

let sessionInfo = {
	shoppingCart: [
		{productId: 40, productPrice: 10},
		{productId: 41, productPrice: 2},
		{productId: 42, productPrice: 5}
	],
	customerId: 25,
	paymentOptionId: 37
}

/**
 * @return {obj} - sessionInfo object
 */
const getSessionInfo = function() {
	return sessionInfo
}

const setSessionInfo = function(prop, val) {
	sessionInfo[prop] = val
}

const addProductToSession = function(productObj) {
	sessionInfo.shoppingCart.push(productObj);
}

const clearSession = function() {
	sessionInfo = { };
}

module.exports = {getSessionInfo, setSessionInfo, addProductToSession, clearSession}
