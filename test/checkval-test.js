var assert = require('assert');

var checkval = require('../src/checkval');


describe('Validate len', function() {

	it('Valid: Throwing errors', function() {

		var value = "example"; // len = 7

		var isValid = true;
		try {
			checkval(value).len(true, 3, 7); // valid
		} catch (err) {
			isValid = false;
		}

		assert(isValid);
	});

	it('Invalid value', function() {

		var value, isValid;

		value = null;
		isValid = checkval(value).len(false, 1);
		assert(!isValid);

		value = undefined;
		isValid = checkval(value).len(false, 1);
		assert(!isValid);
	});

	it('Invalid range', function() {

		var value = "";

		var err;
		try {
			checkval(value).len(true, 7, 3);
		} catch (e) {
			err = e;
		}
		assert.strictEqual("invalid range min[7] > max[3]", err.message);
	});

	it('Valid: Without throwing errors', function() {

		var value = "example"; // len = 7

		var isValid = checkval(value).len(false, 3, 7);
		assert(isValid);
	});

	it('Invalid: out of range', function() {

		var value = "example", isValid; // len = 7

		isValid = checkval(value).len(false, 8);
		assert(!isValid);

		isValid = checkval(value).len(false, 0, 6);
		assert(!isValid);

		isValid = checkval(value).len(false, 10, 18);
		assert(!isValid);
	});
});
