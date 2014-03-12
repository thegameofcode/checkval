checkval
========

The most versatile validator for Node JS and web browsers.


## Usage

### Server-side

```js
var checkval = require('checkval');
```

### Client-side

```html
<script type="text/javascript" src="checkval.min.js"></script>
```

### Sintaxis


Returning boolean:

```js
if ( !checkval('email@example.com').email().check() ) {
	console.error('invalid data');
}
```


Returning boolean (multiple validations):

```js
if ( !checkval()
		.add('456457', 'id').number()
		.add('email@example.com').email().check() ) {

	console.error('invalid data');
}
```


Throwing an error:

```js
try {
	
	checkval().
	  add('456457', 'id').number().
	  add('email@example.com', 'email').email().len(5, 200).
	throw();

} catch (err) {
	console.error(err);
}
```


Getting all errors:

```js
var errors = checkval().
	add('456457', 'id').number().
	add('email@example.com').email().len(5, 200).
	errors();

while ( errors.length > 0 ) {
	console.error(errors.pop());
}

```


## Validators

- __alpha()__ : check if the value contains only letters (a-zA-Z).
- __alphanumeric()__ : check if the value contains only letters and numbers (a-zA-Z0-9).
- __email()__ : check if the value is an email.
- __len(min[, max])__ : check if the value's length falls in a range.
- __notNull()__ : check if the value is not null.
- __null()__ : check if the value is null.
- __numeric()__ : check if the string contains only numbers (0-9).
- __regex(regex[, msg])__ : returns true if the value matches the comparison. e.g.: `checkval().add("test").regex(/^test$/).check()`
- __uuid()__ : check if the value is a UUID (version 3, 4 or 5).


## Running tests

To run the test suite, first invoke the following command within the project folder, installing the development dependencies:

```bash
$ npm install
```

Then run the tests:

```bash
$ npm test
```


## License (MIT)
