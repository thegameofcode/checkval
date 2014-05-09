var assert = require('assert');

var checkval = require('../src/checkval');


describe('Validate in array', function() {

	it('Throwing errors', function() {

		var value, allowedValues, isValid;

		value = 'test1';
		allowedValues = ['test0', 'test1', 'test2'];
		isValid = true;
		try {
			checkval().add(value, 'field').inArray(allowedValues).throw(); // valid
		} catch (err) {
			isValid = false;
		}
		assert(isValid);

		value = 'testX';
		allowedValues = ['test0', 'test1', 'test2'];
		isValid = true;
		try {
			checkval().add(value, 'field').inArray(allowedValues).throw(); // invalid
		} catch (err) {
			isValid = false;
		}
		assert(!isValid);

	});

});
