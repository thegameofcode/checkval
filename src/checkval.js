
var CheckVal = (function() {
	'use strict';


	//
	// Private
	//
	var CHECK_MODE = {
		RETURN_BOOL : 'boolean',
		THROW_ERROR : 'throw',
		GET_ERRORS : 'errors'
	};

	var self;

	function CheckVal (value, name) {
		var hasArgs = arguments.length > 0;

		// enforces new
		if (!(this instanceof CheckVal)) {
			if ( hasArgs ) {
				return new CheckVal(value, name);
			} else {
				return new CheckVal();
			}
		}
		
		self = this;
		this.fields = [];
		
		if ( hasArgs ) {
			// add the parameters as the first field to validate
			this.add(value, name);
		}
	}

	function addValidation (validation) {
		var lastField = self.fields[self.fields.length - 1];

		if ( !lastField ) {
			throw {
				name: 'Checkval Error',
				message: 'use .add(value, name) or constructor to specify a field for the validation'
			};
		}

		lastField.validations.push(validation);
	}

	function checkAllFields (checkMode) {
		var allErrors = [], errors;

		for ( var i = 0, len = self.fields.length; i < len; i++ ) {
			errors = getFieldErrors(self.fields[i]);
			if ( errors.length > 0 ) {
				allErrors.push(errors);
			}
		}

		var hasErrors = allErrors.length > 0;

		switch ( checkMode ) {
			case CHECK_MODE.THROW_ERROR:

				if ( hasErrors ) {
					// Custom Exceptions in JavaScript. Ref: The Good Parts"
					// http://books.google.es/books?id=PXa2bby0oQ0C&pg=PA32&lpg=PA32&redir_esc=y#v=onepage&q&f=false
					throw {
						name : 'Validation Error',
						message : allErrors.toString()
					};
				}

			break;
			case CHECK_MODE.RETURN_BOOL:
				return !hasErrors;
				
			case CHECK_MODE.GET_ERRORS:
				return allErrors;
		}
	}

	function getFieldErrors (field) {
		var validations = field.validations, validation, msg, errors = [];

		var prefix = field.name ? '(' + field.name + ') ' : '';

		for ( var i = 0, len = validations.length; i < len; i++ ) {
			validation = validations[i];

			msg = prefix + validation.err;

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

		var length = (val === undefined || val === null) ? 0 : val.toString().length;

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

	function inArray (val, values) {
		return values.indexOf(val) !== -1;
	}



	//
	// Public
	//


	// Throw error if some validation fails
	CheckVal.prototype.throw = function() {
		checkAllFields(CHECK_MODE.THROW_ERROR);
	};

	// Returns a boolean value indicating the validation results
	CheckVal.prototype.check = function() {
		return checkAllFields(CHECK_MODE.RETURN_BOOL);
	};

	// Check fields and returns an array with the validation errors
	CheckVal.prototype.errors = function() {
		return checkAllFields(CHECK_MODE.GET_ERRORS);
	};

	// Add field to check
	CheckVal.prototype.add = function(val, name) {
		this.fields.push({ name: name, val: val, validations: [] });
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

	CheckVal.prototype.inArray = function(values) {
		addValidation({
			fn : inArray,
			params: [values],
			err : 'invalid value, not in array of allowed values'
		});
		return this;
	};
	
	CheckVal.prototype.englishChars = function() {
		this.notNull();
		addValidation({
			regex : /^[a-zA-Z0-9 _+\-.,?!@#$%^&*()\[\]{};<>"'|\/\\]+$/,
			err : 'invalid characters, only common chars "a" to "Z" and punctuation marks'
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
			fn : function (val){
				return !isNaN( val );
			},
			err : 'invalid number, only integer and decimal numbers'
		});
		return this;
	};
	
	CheckVal.prototype.integer = function() {
		this.notNull();
		addValidation({
			regex : /^-?[0-9]+$/,
			err : 'invalid characters, only integer'
		});
		return this;
	};
	
	CheckVal.prototype.positiveInt = function() {
		this.notNull();
		addValidation({
			regex : /^\+?[0-9]+$/, // include 0 for index validation
			err : 'invalid characters, only positive integer'
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

	CheckVal.prototype.regex = function(regex, msg) {
		this.notNull();
		addValidation({
			regex : regex,
			err : msg ? msg : 'value doesn\'t match with "' + regex.toString() + '"'
		});
		return this;
	};

	return CheckVal;

}());

module.exports = CheckVal;
