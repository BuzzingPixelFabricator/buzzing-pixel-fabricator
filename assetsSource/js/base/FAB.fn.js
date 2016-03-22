/*============================================================================*\
	DO NOT EDIT THIS FILE. THIS IS A CORE FILE.
/*============================================================================*/

(function(F) {
	'use strict';

	// Define FAB function sets
	F.fn = {
		made: {},
		autoInit: [],

		/**
		 * Make a function set
		 *
		 * @param {string} fnName - Name of the function set
		 * @param {object} obj - Properties and methods of function set
		 */
		make: function(fnName, obj) {
			// Push into the autoInit array if autoInit property is true
			if (obj.autoInit === true) {
				F.fn.autoInit.push(fnName);
			}

			// Create a copy for cloning
			F.fn.made[fnName] = $.extend(true, {}, obj);

			// Create the functionSet
			F[fnName] = obj;
		},

		/**
		 * Clone method for creating unique instances of function sets
		 *
		 * @param {string} fnName - Name of function set to clone
		 * @param {bool} init - Whether to run the cloned init method
		 * @return {object} - Function set
		 */
		clone: function(fnName, init) {
			// Create a copy of the function set
			var fn = $.extend(true, {}, F.fn.made[fnName]);

			// Run init with arguments if requested
			if (init === true) {
				// Remove first two items from arguments
				Array.prototype.shift.apply(arguments);
				Array.prototype.shift.apply(arguments);

				// Apply remaining arguments and run init
				fn.init.apply(fn, arguments);
			}

			// Return the clone
			return fn;
		}
	};
})(window.FAB);
