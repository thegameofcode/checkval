checkval
========

Basic validator for NodeJS.

## Usage

```js
var checkval = require('checkval');

// Throwing errors
try {
	checkval(user).isNotNull(true);
	checkval(user.email).isEmail(true);
} catch (err) {
	return callback(err, null);
}

// Returning booleans
if ( checkval(user).isNotNull() &&
	checkval(user.email).isEmail() ) {

	return callback('invalid data', null);
}

```


## Validators

- __isNotNull(throwError)__ : check if the value is not null.
- __isNull(throwError)__ : check if the value is null.
- __isAlpha(throwError)__ : check if the string contains only letters and whitespaces (a-zA-Z ).
- __isAlphanumeric(throwError)__ : check if the string contains only letters, numbers and whitespaces (a-zA-Z0-9 ).
- __isEmail(throwError)__ : check if the string is an email.
- __isUUID(throwError)__ : check if the string is a UUID (version 3, 4 or 5).
