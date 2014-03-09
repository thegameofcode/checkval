var assert = require('assert');

var checkval = require('../src/checkval');


describe('Validate alphaNumeric', function() {

	it('Throwing errors', function() {

		var value, isValid;

		value = '1234TeSt';
		isValid = true;
		try {
			checkval().add(value, 'field').alphaNumeric().throw(); // valid
		} catch (err) {
			isValid = false;
		}
		assert(isValid);

		value = undefined;
		isValid = true;
		try {
			checkval().add(value, 'field').alphaNumeric().throw(); // invalid
		} catch (err) {
			isValid = false;
		}
		assert(!isValid);

		value = '1234';
		isValid = true;
		try {
			checkval().add(value, 'field').alphaNumeric().throw(); // valid
		} catch (err) {
			isValid = false;
		}
		assert(isValid);

		value = 'Test';
		isValid = true;
		try {
			checkval().add(value, 'field').alphaNumeric().throw(); // valid
		} catch (err) {
			isValid = false;
		}
		assert(isValid);

		value = 50;
		isValid = true;
		try {
			checkval().add(value, 'field').alphaNumeric().throw(); // invalid
		} catch (err) {
			isValid = false;
		}
		assert(!isValid);
	});
});