var assert = require('assert');

var checkval = require('../src/checkval');



describe('Validate bool', function() {

	it('Throwing errors', function() {

		var value, isValid;

		value = true;
		isValid = true;
		try {
			checkval().add(value, 'field').bool().throw(); // valid
		} catch (err) {
			isValid = false;
		}
		assert(isValid);

		value = false;
		isValid = true;
		try {
			checkval().add(value, 'field').bool().throw(); // valid
		} catch (err) {
			isValid = false;
		}
		assert(isValid);

		value = undefined;
		isValid = true;
		try {
			checkval().add(value, 'field').bool().throw(); // invalid
		} catch (err) {
			isValid = false;
		}
		assert(!isValid);

		value = "true";
		isValid = true;
		try {
			checkval().add(value, 'field').bool().throw(); // invalid
		} catch (err) {
			isValid = false;
		}
		assert(!isValid);

		value = "false";
		isValid = true;
		try {
			checkval().add(value, 'field').bool().throw(); // invalid
		} catch (err) {
			isValid = false;
		}
		assert(!isValid);

		value = 1;
		isValid = true;
		try {
			checkval().add(value, 'field').bool().throw(); // invalid
		} catch (err) {
			isValid = false;
		}
		assert(!isValid);

		value = 0;
		isValid = true;
		try {
			checkval().add(value, 'field').bool().throw(); // invalid
		} catch (err) {
			isValid = false;
		}
		assert(!isValid);

	});

});
