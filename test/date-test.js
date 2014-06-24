var assert = require('assert');

var checkval = require('../src/checkval');



describe('Validate date', function() {

	it('Throwing errors', function() {

		var value, isValid;

		value = "2012-01-31T09:45:00.000+02:00";
		isValid = true;
		try {
			checkval().add(value, 'field').date().throw(); // valid
		} catch (err) {
			isValid = false;
		}
		assert(isValid);

		value = undefined;
		isValid = true;
		try {
			checkval().add(value, 'field').date().throw(); // invalid
		} catch (err) {
			isValid = false;
		}
		assert(!isValid);

		value = 'abc5';
		isValid = true;
		try {
			checkval().add(value, 'field').date().throw(); // invalid
		} catch (err) {
			isValid = false;
		}
		assert(!isValid);

		/*
		FIXME

		value = "2012-02-31T09:45:00.000+02:00"; // 31 feb
		isValid = true;
		try {
			checkval().add(value, 'field').date().throw(); // invalid
		} catch (err) {
			isValid = false;
		}
		assert(!isValid);
		*/

	});

});
