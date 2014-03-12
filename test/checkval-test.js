var assert = require('assert');

var checkval = require('../src/checkval');


describe('# Simple validation', function() {

	it('Single validation returning boolean', function() {

		var value, isValid;

		value = 'test';
		isValid = checkval(value).alpha().check();
		assert(isValid);

		value = '1234';
		isValid = checkval(value).alpha().check();
		assert(!isValid);

		value = undefined;
		isValid = checkval(value).null().check();
		assert(isValid);


	});
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


describe('# Multiple validations', function() {

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

		value = -568;
		isValid = true;
		try {
			checkval().add(value, 'field').numeric().len(1, 4).throw(); // valid
		} catch (err) {
			isValid = false;
		}
		assert(isValid);

		value = '1234567';
		var invalid_email = 'invalid_email';
		try {
			checkval().
				add(value, 'field').numeric().len(6).
				add(invalid_email, 'email').email().
			throw();
		} catch (err) {
			isValid = false;
		}
		assert(!isValid);
	});


	it('Returning boolean', function() {
		var value = '1234567';
		var invalid_email = 'email@example.com';
		
		var isValid = checkval().
			add(value, 'field').numeric().len(6).
			add(invalid_email, 'email').email().
			check();

		assert.strictEqual(isValid, true);

		value = '1234567';
		invalid_email = 'invalid_email';
		
		isValid = checkval().
			add(value, 'field').numeric().len(6).
			add(invalid_email, 'email').email().
			check();

		assert.strictEqual(isValid, false);
	});


	it('Getting errors array', function() {
		var value = '1234567';
		var invalid_email = 'email@example.com';
		
		var errors = checkval().
			add(value, 'field').numeric().len(6).
			add(invalid_email, 'email').email().
			errors();

		assert.strictEqual(errors.length, 0);

		value = '1234567';
		invalid_email = 'invalid_email';
		
		errors = checkval().
			add(value, 'field').numeric().len(6).
			add(invalid_email, 'email').email().
			errors();

		assert.strictEqual(errors.length, 1);
	});
});
