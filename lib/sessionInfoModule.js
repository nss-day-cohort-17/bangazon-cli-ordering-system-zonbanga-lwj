'use strict'

let sessionInfo = {
	shoppingCart: []
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
	sessionInfo = {};
}

module.exports = {getSessionInfo, setSessionInfo, addProductToSession, clearSession}
