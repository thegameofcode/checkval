checkval
========

The most versatile and complete validator for Node JS and web browsers.


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

```js

// Throwing errors
try {
	
	checkval().
	  add(id, 'id').number().
	  add(user.email, 'email').email().len(5, 200)
	throw();

} catch (err) {
	console.error(err);
}

// Returning booleans
if ( checkval().add(address).email().check() ) {
	console.error('invalid data');
}

// Getting all errors
var errors = checkval().add(address).email().errors();
while ( errors.length > 0 ) {
	console.error(errors.pop());
}

```


## Validators

- __alpha()__ : check if the value contains only letters (a-zA-Z).
- __alphanumeric()__ : check if the value contains only letters and numbers (a-zA-Z0-9).
- __email()__ : check if the value is an email.
- __isUUID()__ : check if the value is a UUID (version 3, 4 or 5).
- __len(min[, max])__ : check if the value's length falls in a range.
- __notNull()__ : check if the value is not null.
- __null()__ : check if the value is null.
- __numeric()__ : check if the string contains only numbers (0-9).
- __regex(regex[, msg])__ : returns true if the value matches the comparison. e.g.: `checkval().add("test").regex(/^test$/).check()`
