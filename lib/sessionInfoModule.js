'use strict'

let sessionInfo = {"shoppingCart": [ {"productPrice": 10},
																		 {"productPrice": 10},
																		 {"productPrice": 10},
																		 {"productPrice": 10},] }

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
