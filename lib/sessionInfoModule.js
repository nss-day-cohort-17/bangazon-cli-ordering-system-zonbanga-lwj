'use strict'

let sessionInfo = {}

/**
 * @return {obj} - sessionInfo object
 */
const getSessionInfo = function() {
	return sessionInfo
}

const setSessionInfo = function(prop, val) {
	sessionInfo[prop] = val
}

module.exports = {getSessionInfo, setSessionInfo}
