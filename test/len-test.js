var assert = require('assert');

var checkval = require('../src/checkval');


describe('Validate len', function() {

	it('Valid: Throwing errors', function() {

		var value = "example"; // len = 7

		var isValid = true;
		try {
			checkval().add(value, 'field').len(3, 7).throw(); // valid
		} catch (err) {
			isValid = false;
		}

		assert(isValid);
	});

	it('Invalid value', function() {

		var value = "";

		var err;
		try {
			checkval().add(value, 'myFieldName').len(1).throw();
		} catch (e) {
			err = e;
		}
		assert.strictEqual("(myFieldName) invalid length", err.message);
	});

	it('Invalid range', function() {

		var value = "";

		var err;
		try {
			checkval().add(value, 'field').len(7, 3).throw();
		} catch (e) {
			err = e;
		}
		assert.strictEqual("invalid range min[7] > max[3], use .len(min, max)", err.message);
	});

/*
	it('Invalid value', function() {

		var value, isValid;

		value = null;
		isValid = checkval().add(value, 'field').len(1).err();
		assert(!isValid);

		value = undefined;
		isValid = checkval(value).len(false, 1);
		assert(!isValid);
	});

	it('Valid: Without throwing errors', function() {

		var value = "example"; // len = 7

		var isValid = checkval().add(value, 'field').len(3, 7).err();
		assert(isValid);
	});

	it('Invalid: out of range', function() {

		var value = "example", isValid; // len = 7

		isValid = checkval().add(value, 'field').len(8).err();
		assert(!isValid);

		isValid = checkval().add(value, 'field').len(0, 6).err();
		assert(!isValid);

		isValid = checkval().add(value, 'field').len(10, 18).err();
		assert(!isValid);
	});
*/

});