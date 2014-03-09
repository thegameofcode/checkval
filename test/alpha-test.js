var assert = require('assert');

var checkval = require('../src/checkval');


describe('Validate alpha', function() {

	it('Throwing errors', function() {

		var value, isValid;

		value = 'TeSt';
		isValid = true;
		try {
			checkval().add(value, 'field').alpha().throw(); // valid
		} catch (err) {
			isValid = false;
		}
		assert(isValid);

		value = undefined;
		isValid = true;
		try {
			checkval().add(value, 'field').alpha().throw(); // invalid
		} catch (err) {
			isValid = false;
		}
		assert(!isValid);

		value = '000';
		isValid = true;
		try {
			checkval().add(value, 'field').alpha().throw(); // invalid
		} catch (err) {
			isValid = false;
		}
		assert(!isValid);

		value = 50;
		isValid = true;
		try {
			checkval().add(value, 'field').alpha().throw(); // invalid
		} catch (err) {
			isValid = false;
		}
		assert(!isValid);
	});

});
