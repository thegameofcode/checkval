
module.exports = 

function (p_value) {

	'use strict';

	var validation = {
			email : {
				regex : /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/
			,	err : 'invalid email address'
			}
		,
			url : {
				regex : /^(?!mailto:)(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[0-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))|localhost)(?::\d{2,5})?(?:\/[^\s]*)?$/i
			,	err : 'invalid url address'
			}
		,
			creditcard : {
				regex : /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/
			,	err : 'invalid credit card number'
			}
		,
			isbn10 : {
				regex : /^(?:[0-9]{9}X|[0-9]{10})$/
			,	err : 'invalid ISBN10 number'
			}	
		,
			isbn13 : {
				regex : /^(?:[0-9]{13})$/
			,	err : 'invalid ISBN13 number'
			}
		,
			ipv4 : {
				regex : /^(\d?\d?\d)\.(\d?\d?\d)\.(\d?\d?\d)\.(\d?\d?\d)$/
			,	err : 'invalid IPv4 address'
			}
		,
			ipv6 : {
				regex : /^::|^::1|^([a-fA-F0-9]{1,4}::?){1,7}([a-fA-F0-9]{1,4})$/
			,	err : 'invalid IPv6 address'
			}
		,
			uuid3 : {
				regex : /^[0-9A-F]{8}-[0-9A-F]{4}-3[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i
			,	err : 'invalid UUID3 identifier'
			}
		,
			uuid4 : {
				regex : /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
			,	err : 'invalid UUID4 identifier'
			}
		,
			uuid5 : {
				regex : /^[0-9A-F]{8}-[0-9A-F]{4}-5[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
			,	err : 'invalid UUID5 identifier'
			}	
		,
			uuid : {
				regex : /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i
			,	err : 'invalid UUID identifier'
			}	
		,
			alpha : {
				regex : /^[a-z A-Z]+$/
			,	err : 'invalid characters, only "a" to "Z" and spaces'
			}
		,
			alphanumeric : {
				regex : /^[a-z A-Z0-9]+$/
			,	err : 'invalid characters, only "a" to "Z", numbers and spaces'
			}
		,
			numeric : {
				regex : /^-?[0-9]+$/
			,	err : 'invalid characters, only numbers'
			}
		,
			int : {
				regex : /^(?:-?(?:0|[1-9][0-9]*))$/
			,	err : 'invalid number, only integers'
			}
		,
			float : {
				regex : /^(?:-?(?:[0-9]+))?(?:\.[0-9]*)?(?:[eE][\+\-]?(?:[0-9]+))?$/
			,	err : 'invalid number, only floats'
			}
		,
			hexadecimal : {
				regex : /^[0-9a-fA-F]+$/
			,	err : 'invalid number, only hexadecimal'
			}
		,
			hexcolor : {
				regex : /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/
			,	err : 'invalid number, only color codes in hexadecimal'
			}
		,
			notnull : {
				regex : function (p_val) { console.log('_____isNotNull', p_val, !isNull(p_val)); return !isNull(p_val); }
			,	err : 'invalid null value'
			}
		,
			isnull : {
				regex : function (p_val) { return isNull(p_val); }
			,	err : 'invalid not null value'
			}
	}

	function isNull(p_val){
		return ( p_val === null ||  typeof p_val === 'undefined');
	}

	var value = p_value;
	function check(validation, throwError) {
		if ( !validation.isnull && isNull(p_value) ) {
			if ( throwError ) {
				throw new Error('value is null');
			}
			return false;
		}
		else if ( (typeof validation.regex) === 'function') {
		 	if ( !validation.regex(value) ) {
				if ( throwError ) {
					throw new Error( validation.err );	
				}
				return false;
			}
		}
		else if ( !validation.regex.test( value ) ) {
			if ( throwError ) {
				throw new Error( validation.err );	
			}
			return false;
		}
		return true;
	}

	return {
		isNotNull		: function (throwError) { check(validation.notnull, throwError); }
	,	isNull			: function (throwError) { check(validation.isnull, throwError); }
	,	isAlpha 		: function (throwError) { check(validation.alpha, throwError); }
	,	isAlphanumeric 	: function (throwError) { check(validation.alphanumeric, throwError); }
	,	isEmail 		: function (throwError) { check(validation.email, throwError); }
	}

}


