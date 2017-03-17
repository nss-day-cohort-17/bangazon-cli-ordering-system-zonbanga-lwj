'use strict'

let sessionInfo = {  }

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

module.exports = {getSessionInfo, setSessionInfo, addProductToSession}
