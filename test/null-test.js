var assert = require('assert');

var checkval = require('../src/checkval');


describe('Validate null', function() {

	it('Throwing errors', function() {

		var value, isValid;

		value = null;
		isValid = true;
		try {
			checkval().add(value, 'field').null().throw(); // valid
		} catch (err) {
			isValid = false;
		}
		assert(isValid);

		value = undefined;
		isValid = true;
		try {
			checkval().add(value, 'field').null().throw(); // valid
		} catch (err) {
			isValid = false;
		}
		assert(isValid);

		value = 'null';
		isValid = true;
		try {
			checkval().add(value, 'field').null().throw(); // invalid
		} catch (err) {
			isValid = false;
		}
		assert(!isValid);

		value = false;
		isValid = true;
		try {
			checkval().add(value, 'field').null().throw(); // invalid
		} catch (err) {
			isValid = false;
		}
		assert(!isValid);
	});

});


