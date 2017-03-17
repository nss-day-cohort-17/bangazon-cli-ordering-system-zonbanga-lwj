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
function getSessionInfo() {
	return sessionInfo
}

function setSessionInfo(prop, val) {
	sessionInfo[prop] = val
}

function addProductToSession(productObj) {
	sessionInfo.shoppingCart.push(productObj);
}

function clearSession() {
	sessionInfo = { };
}

module.exports = {getSessionInfo, setSessionInfo, addProductToSession, clearSession}
