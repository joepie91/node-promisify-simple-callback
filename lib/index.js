'use strict';

var Promise = require("bluebird");

module.exports = function (method) {
	var defaults = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

	return function () {
		var _arguments = arguments,
		    _this = this;

		return new Promise(function (resolve, reject) {
			var args = new Array(Math.max(_arguments.length, defaults.length) + 1);

			for (var i = 0; i < args.length; ++i) {
				args[i] = _arguments[i];
			}

			if (_arguments.length - 1 < defaults.length) {
				for (var i = _arguments.length - 1; i < defaults.length; i++) {
					if (defaults[i] != null) {
						args[i] = defaults[i];
					}
				}
			}

			args[args.length - 1] = function (result) {
				resolve(result);
			};

			// Synchronous errors are caught and propagated by Bluebird's `new Promise` already.
			method.apply(_this, args);
		});
	};
};