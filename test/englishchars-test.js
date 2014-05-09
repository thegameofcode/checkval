var assert = require('assert');

var checkval = require('../src/checkval');


describe('Validate english chars', function() {

	it('Throwing errors', function() {

		var value, isValid;

		value = 'abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789 +-.,!@#$%^&*()[]{};\/|<>"\'';
		isValid = true;
		try {
			checkval().add(value, 'field').englishChars().throw(); // valid
		} catch (err) {
			isValid = false;
		}
		assert(isValid);

		value = undefined;
		isValid = true;
		try {
			checkval().add(value, 'field').englishChars().throw(); // invalid
		} catch (err) {
			isValid = false;
		}
		assert(!isValid);

		value = 'This is a invalid text: Ñ';
		isValid = true;
		try {
			checkval().add(value, 'field').englishChars().throw(); // invalid
		} catch (err) {
			isValid = false;
		}
		assert(!isValid);

		value = '1234';
		isValid = true;
		try {
			checkval().add(value, 'field').englishChars().throw(); // valid
		} catch (err) {
			isValid = false;
		}
		assert(isValid);

		value = 'Test';
		isValid = true;
		try {
			checkval().add(value, 'field').englishChars().throw(); // valid
		} catch (err) {
			isValid = false;
		}
		assert(isValid);

		value = 50;
		isValid = true;
		try {
			checkval().add(value, 'field').englishChars().throw(); // valid
		} catch (err) {
			isValid = false;
		}
		assert(isValid);
	});
});