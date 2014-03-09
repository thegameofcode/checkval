var assert = require('assert');

var checkval = require('../src/checkval');



describe('Validate uuid', function() {

	it('Throwing errors', function() {

		var value, isValid;

		value = '2CA263F1-5C94-11E0-84CC-002170FBAC5B';
		isValid = true;
		try {
			checkval().add(value, 'field').uuid().throw(); // valid
		} catch (err) {
			isValid = false;
		}
		assert(isValid);

		value = undefined;
		isValid = true;
		try {
			checkval().add(value, 'field').uuid().throw(); // invalid
		} catch (err) {
			isValid = false;
		}
		assert(!isValid);

		value = '1234';
		isValid = true;
		try {
			checkval().add(value, 'field').uuid().throw(); // invalid
		} catch (err) {
			isValid = false;
		}
		assert(!isValid);

		value = 50;
		isValid = true;
		try {
			checkval().add(value, 'field').uuid().throw(); // invalid
		} catch (err) {
			isValid = false;
		}
		assert(!isValid);
	});

});
