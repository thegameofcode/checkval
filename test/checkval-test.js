var assert = require('assert');

var checkval = require('../src/checkval');


describe('Simple validation', function() {

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

	});

});


describe('Multiple validations', function() {

	it('Throwing errors', function() {

		var value, isValid;

		value = null;
		isValid = true;
		try {
			checkval().add(value, 'field').notNull().email().throw(); // invalid
		} catch (err) {
			isValid = false;
		}
		assert(!isValid);

		value = 'example@email.com';
		isValid = true;
		try {
			checkval().add(value, 'field').notNull().email().throw(); // valid
		} catch (err) {
			isValid = false;
		}
		assert(isValid);

		value = '-568';
		isValid = true;
		try {
			checkval().add(value, 'field').numeric().len(1, 4).throw(); // valid
		} catch (err) {
			isValid = false;
		}
		assert(isValid);
	});

});


