'use strict'

const {assert} = require('chai')
const {getSessionInfo, setSessionInfo, addProductToSession, clearSession} = require('../lib/sessionInfoModule.js')

describe(`getSessionInfo`, function() {
	it(`should be a function`, function() {
		assert.isFunction(getSessionInfo)
	})
	it(`should return an object with a property shoppingCart, value of an empty array`, function() {
		assert.deepEqual(getSessionInfo(), { shoppingCart: []})
	})
})
describe(`setSessionInfo`, function() {
	it(`should be a function`, function() {
		assert.isFunction(setSessionInfo);
	})
	it("Should add the key/value pair to the sessionInfo Object", () => {
		clearSession()
		setSessionInfo('Joel', 'Giggles')
	 	assert.deepEqual(getSessionInfo(), { Joel: "Giggles" })
	 });
})
describe(`addProductToSession`, function() {
	it("Should be a function", () => {
	 	assert.isFunction(addProductToSession)
	 });
	it(`should be a function that changes a property of the object`, function() {
		clearSession();
		setSessionInfo("shoppingCart", [])
		addProductToSession({"James": "student"})
		assert.deepProperty(getSessionInfo().shoppingCart[0], "James")
	})
})

describe("clearSession()", () => {
 	it("Should be a function", () => {
 	 	assert.isFunction(clearSession)
 	 });
	 it("Should clear the sessionInfo Object", () => {
		 	clearSession();
			assert.deepEqual(getSessionInfo(), {})
	  });
 });
