var assert = require('assert');

var checkval = require('../src/checkval');



describe('Validate numeric', function() {

	it('Throwing errors', function() {

		var value, isValid;

		value = '-1234';
		isValid = true;
		try {
			checkval().add(value, 'field').numeric().throw(); // valid
		} catch (err) {
			isValid = false;
		}
		assert(isValid);

		value = undefined;
		isValid = true;
		try {
			checkval().add(value, 'field').numeric().throw(); // invalid
		} catch (err) {
			isValid = false;
		}
		assert(!isValid);

		value = 'abc5';
		isValid = true;
		try {
			checkval().add(value, 'field').numeric().throw(); // invalid
		} catch (err) {
			isValid = false;
		}
		assert(!isValid);

		value = 50;
		isValid = true;
		try {
			checkval().add(value, 'field').numeric().throw(); // invalid
		} catch (err) {
			isValid = false;
		}
		assert(!isValid);
	});

});
