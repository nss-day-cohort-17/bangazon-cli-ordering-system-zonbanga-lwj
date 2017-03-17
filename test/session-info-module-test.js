'use strict'

const {assert} = require('chai')
const {getSessionInfo, setSessionInfo, addProductToSession, clearSession} = require('../lib/sessionInfoModule.js')

describe(`getSessionInfo`, function() {
	it(`should return an object`, function() {
		assert.isObject(getSessionInfo())
	})
})
describe(`setSessionInfo`, function() {
	it(`should be a function that changes a property of the object`, function() {
		setSessionInfo()
	})
})
describe(`addProductToSession`, function() {
	it(`should be a function that changes a property of the object`, function() {
		clearSession();
		setSessionInfo("shoppingCart", [])
		addProductToSession({"James": "student"})
		assert.deepProperty(getSessionInfo().shoppingCart[0], "James")
	})
})
