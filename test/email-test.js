var assert = require('assert');

var checkval = require('../src/checkval');


describe('Validate email', function() {

	it('Throwing errors', function() {

		var value, isValid;

		value = 'email123@example.com';
		isValid = true;
		try {
			checkval().add(value, 'field').email().throw(); // valid
		} catch (err) {
			isValid = false;
		}
		assert(isValid);

		value = undefined;
		isValid = true;
		try {
			checkval().add(value, 'field').email().throw(); // invalid
		} catch (err) {
			isValid = false;
		}
		assert(!isValid);

		value = '1234';
		isValid = true;
		try {
			checkval().add(value, 'field').email().throw(); // invalid
		} catch (err) {
			isValid = false;
		}
		assert(!isValid);

		value = 50;
		isValid = true;
		try {
			checkval().add(value, 'field').email().throw(); // invalid
		} catch (err) {
			isValid = false;
		}
		assert(!isValid);
	});

});

