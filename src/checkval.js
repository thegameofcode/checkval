
var CheckVal = (function() {
	'use strict';


	//
	// Private
	//

	var self;

	function CheckVal(args) {
		// enforces new
		if (!(this instanceof CheckVal)) {
			return new CheckVal(args);
		}
		
		self = this;
		this.fields = [];
	}

	function addValidation (validation) {
		var lastField = self.fields[self.fields.length - 1];

		if ( !lastField ) {
			throw {
				name: 'Checkval Error',
				message: 'use .add(value, name) to specify a field for the validation'
			};
		}

		lastField.validations.push(validation);
	}

	function checkAllFields () {
		var allErrors = [], errors;

		for ( var i = 0, len = self.fields.length; i < len; i++ ) {
			errors = getFieldErrors(self.fields[i]);
			if ( errors.length > 0 ) {
				allErrors.push(errors);
			}
		}

		if ( allErrors.length > 0 ) {

			// Custom Exceptions in JavaScript. Ref: The Good Parts" (great book IMO)
			// http://books.google.es/books?id=PXa2bby0oQ0C&pg=PA32&lpg=PA32&redir_esc=y#v=onepage&q&f=false
			throw {
				name : 'Validation Error',
				message : allErrors.toString()
			};
		}
	}

	function getFieldErrors (field) {
		var validations = field.validations, validation, msg, errors = [];

		for ( var i = 0, len = validations.length; i < len; i++ ) {
			validation = validations[i];

			
			msg = '(' + field.name + ') ' + validation.err;

			if ( validation.hasOwnProperty('fn') ) {

				var params = [field.val];
				if ( validation.hasOwnProperty('params') ) {
					params = params.concat(validation.params);
				}
				
				if ( !validation.fn.apply(self, params) ) {
					errors.push( msg );
				}
			}

			if ( validation.hasOwnProperty('regex') ) {
				if ( !validation.regex.test( field.val ) ) {
					errors.push( msg );
				}
			}
		}

		return errors;
	}

	// Validations
	function isNotNull (val) {
		return !isNull(val);
	}

	function isNull (val) {
		return ( val === null ||  typeof val === 'undefined');
	}

	function checkLen (val, min, max) {
		
		if ( max && min > max ) {
			throw {
				name: 'Checkval Error',
				message: 'invalid range min[' + min + '] > max[' + max + '], use .len(min, max)'
			};
		}

		var length = val.length;

		if ( length < min ) {
			return false;
		}

		if ( max ) {
			if ( length > max ) {
				return false;
			}
		}

		return true;
	}



	//
	// Public
	//

	// Add field to check
	CheckVal.prototype.add = function(val, name) {
		this.fields.push({ name: name, val: val, validations: [] });
		return this;
	};

	// Check fields
	CheckVal.prototype.throw = function() {
		checkAllFields();
		return this;
	};

	// Validations
	CheckVal.prototype.null = function() {
		addValidation({
			fn : isNull,
			err : 'invalid null value'
		});
		return this;
	};

	CheckVal.prototype.notNull = function() {
		addValidation({
			fn : isNotNull,
			err : 'invalid not null value'
		});
		return this;
	};

	CheckVal.prototype.len = function(min, max) {
		addValidation({
			fn : checkLen,
			params: [min, max],
			err : 'invalid length'
		});
		return this;
	};
	
	CheckVal.prototype.alpha = function() {
		this.notNull();
		addValidation({
			regex : /^[a-zA-Z]+$/,
			err : 'invalid characters, only "a" to "Z"'
		});
		return this;
	};
	
	CheckVal.prototype.alphaNumeric = function() {
		this.notNull();
		addValidation({
			regex : /^[a-zA-Z0-9]+$/,
			err : 'invalid characters, only "a" to "Z" and numbers'
		});
		return this;
	};

	CheckVal.prototype.numeric = function() {
		this.notNull();
		addValidation({
			regex : /^-?[0-9]+$/,
			err : 'invalid characters, only numbers'
		});
		return this;
	};
	
	CheckVal.prototype.email = function() {
		this.notNull();
		addValidation({
			regex : /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/,
			err : 'invalid email address'
		});
		return this;
	};

	CheckVal.prototype.uuid = function() {
		this.notNull();
		addValidation({
			regex : /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
			err : 'invalid UUID identifier'
		});
		return this;
	};

	return CheckVal;

}());

module.exports = CheckVal;
