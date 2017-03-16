'use strict'

const {assert} = require('chai')
const {getSessionInfo, setSessionInfo} = require('../lib/sessionInfoModule.js')

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
