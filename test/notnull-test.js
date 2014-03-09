var assert = require('assert');

var checkval = require('../src/checkval');



describe('Validate not null', function() {

	it('Throwing errors', function() {

		var value, isValid;

		value = null;
		isValid = true;
		try {
			checkval().add(value, 'field').notNull().throw(); // invalid
		} catch (err) {
			isValid = false;
		}
		assert(!isValid);

		value = undefined;
		isValid = true;
		try {
			checkval().add(value, 'field').notNull().throw(); // invalid
		} catch (err) {
			isValid = false;
		}
		assert(!isValid);

		value = 'null';
		isValid = true;
		try {
			checkval().add(value, 'field').notNull().throw(); // valid
		} catch (err) {
			isValid = false;
		}
		assert(isValid);

		value = false;
		isValid = true;
		try {
			checkval().add(value, 'field').notNull().throw(); // valid
		} catch (err) {
			isValid = false;
		}
		assert(isValid);
	});

});

