var assert = require('assert');

var checkval = require('../src/checkval');


describe('Validate integer', function() {

	it('Throwing errors', function() {

		var value, isValid;

		value = 1986342;
		isValid = true;
		try {
			checkval().add(value, 'field').integer().throw(); // valid
		} catch (err) {
			isValid = false;
		}
		assert(isValid);

		value = -1;
		isValid = true;
		try {
			checkval().add(value, 'field').integer().throw(); // valid
		} catch (err) {
			isValid = false;
		}
		assert(isValid);

		value = '-8378373';
		isValid = true;
		try {
			checkval().add(value, 'field').integer().throw(); // valid
		} catch (err) {
			isValid = false;
		}
		assert(isValid);

		value = 'null';
		isValid = true;
		try {
			checkval().add(value, 'field').integer().throw(); // invalid
		} catch (err) {
			isValid = false;
		}
		assert(!isValid);

		value = null;
		isValid = true;
		try {
			checkval().add(value, 'field').integer().throw(); // invalid
		} catch (err) {
			isValid = false;
		}
		assert(!isValid);

		value = 887766.789;
		isValid = true;
		try {
			checkval().add(value, 'field').integer().throw(); // invalid
		} catch (err) {
			isValid = false;
		}
		assert(!isValid);

		value = '-887766.789';
		isValid = true;
		try {
			checkval().add(value, 'field').integer().throw(); // invalid
		} catch (err) {
			isValid = false;
		}
		assert(!isValid);

		
		//
		// Positive integer
		//

		value = '-8877';
		isValid = true;
		try {
			checkval().add(value, 'field').positiveInt().throw(); // invalid
		} catch (err) {
			isValid = false;
		}
		assert(!isValid);

		value = -45;
		isValid = true;
		try {
			checkval().add(value, 'field').positiveInt().throw(); // invalid
		} catch (err) {
			isValid = false;
		}
		assert(!isValid);

		value = -45324.66;
		isValid = true;
		try {
			checkval().add(value, 'field').positiveInt().throw(); // invalid
		} catch (err) {
			isValid = false;
		}
		assert(!isValid);
	});

});


