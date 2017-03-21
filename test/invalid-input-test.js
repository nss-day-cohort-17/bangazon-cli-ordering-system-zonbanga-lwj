
const { resetList, genericErrorMessage } = require('../lib/invalidInput');
const { assert } = require('chai');

describe("invalidInput Module", () => {
  describe("resetList", () => {
    it("Should be a function", () => {
      assert.isFunction(resetList)
    });
  });
  describe("genericErrorMessage", () => {
     it("Should be a function", () => {
        assert.isFunction(genericErrorMessage)
      });
   });
});
