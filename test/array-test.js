var assert = require('assert');

var checkval = require('../src/checkval');



describe('Validate array', function() {

	it('Throwing errors', function() {

		var value, isValid;

		value = 0;
		isValid = true;
		try {
			checkval().add(value, 'field').array().throw(); // invalid
		} catch (err) {
			console.log(err)
			isValid = false;
		}
		assert(!isValid);

		value = undefined;
		isValid = true;
		try {
			checkval().add(value, 'field').array().throw(); // invalid
		} catch (err) {
			isValid = false;
		}
		assert(!isValid);

		value = [];
		isValid = true;
		try {
			checkval().add(value, 'field').array().throw(); // invalid
		} catch (err) {
			isValid = false;
		}
		assert(isValid);

		value = ['one', 'two'];
		isValid = true;
		try {
			checkval().add(value, 'field').array().throw(); // invalid
		} catch (err) {
			console.log(err)
			isValid = false;
		}
		assert(isValid);

	});

});
