'use strict';

const Promise = require("bluebird");

module.exports = function(method, defaults = []) {
	return function() {
		return new Promise((resolve, reject) => {
			var args = new Array(Math.max(arguments.length, defaults.length) + 1);
			
			for(var i = 0; i < args.length; ++i) {
				args[i] = arguments[i];
			}
			
			if (arguments.length - 1 < defaults.length) {
				for(var i = arguments.length - 1; i < defaults.length; i++) {
					if (defaults[i] != null) {
						args[i] = defaults[i];
					}
				}
			}
			
			args[args.length - 1] = function(result) {
				resolve(result);
			}
			
			// Synchronous errors are caught and propagated by Bluebird's `new Promise` already.
			method.apply(this, args);
		})
	}
	
}