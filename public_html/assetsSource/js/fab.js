// Make sure FAB is defined
window.FAB = window.FAB || {};

(function(F) {
	'use strict';

	// Make sure required FAB arrays and objects have been initialized
	F.exec = F.exec || [];
	F.vars = F.vars || {};

	// Define FAB controller functions
	F.fn = {
		made: {},
		constructors: [],

		/**
		 * Make a controller
		 *
		 * @param {string} fnName - Name of the controller
		 * @param {object} methods - Properties and methods of controller
		 */
		make: function(fnName, methods) {
			// Push into the constructors array if a constructor exists
			if (methods._construct) {
				F.fn.constructors.push(fnName);
			}

			// Create a copy for cloning
			F.fn.made[fnName] = $.extend(true, {}, methods);

			// Create the controller
			F[fnName] = methods;
		},

		/**
		 * Clone method for creating unique controller instances
		 *
		 * @param {string} fnName - Name of controller to clone
		 * @param {bool} [construct] - Whether to run the cloned constructor
		 * @return {object} - Controller
		 */
		clone: function(fnName, construct) {
			// Create a copy of the controller
			var fn = $.extend(true, {}, F.fn.made[fnName]);

			// If construct is true, run the constructor
			if (construct) {
				fn._construct();
			}

			// Return the clone
			return fn;
		}
	};

	// Define FAB vars functions
	F.setVars = function() {
		// Set data-set variables
		$('[data-set]').each(function() {
			var $el = $(this),
				key = $el.data('set'),
				val = $el.data('value'),
				arrayObjTest = key.slice(-2),
				arrayObjKey = key.slice(0, -2);

			if (arrayObjTest === '[]') {
				if (! F.vars[arrayObjKey]) {
					F.vars[arrayObjKey] = [];
				}

				F.vars[arrayObjKey].push(val);
			} else if (arrayObjTest === '{}') {
				val = val.split(':');

				if (! F.vars[arrayObjKey]) {
					F.vars[arrayObjKey] = {};
				}

				F.vars[arrayObjKey][val[0]] = val[1];
			} else {
				F.vars[key] = val;
			}
		});

		// Set lang variables
		$('[data-lang]').each(function() {
			var $el = $(this);

			F.lang[$el.data('lang')] = $el.data('value');
		});

		/**
		 * Method for getting F vars
		 *
		 * @param {string} getVar - Name of variable to get
		 * @param {*} [defaultVal] - Default value to return if no var
		 * @return {*} - Variable value, default value, or null
		 */
		F.$get = function(getVar, defaultVal) {
			if (
				F.vars[getVar] !== null &&
				F.vars[getVar] !== undefined
			) {
				return F.vars[getVar];
			}

			return defaultVal || null;
		};

		// Set run variables from DOM
		$('[data-exec]').each(function() {
			var name = $(this).data('exec');

			if (name && F.exec.indexOf(name) === -1) {
				F.exec.push(name);
			}
		});

		// Set ready state
		F.ready = true;
	};

	// Run F functions
	F.run = function() {
		// Make sure everything is ready
		if (! F.ready) {
			setTimeout(function() {
				F.run();
			}, 100);

			return;
		}

		// Run constructors
		F.fn.constructors.forEach(function(fnName) {
			F.fn.clone(fnName)._construct();
		});

		// Run any init function requested by exec
		F.exec.forEach(function(i) {
			F[i].init();
		});

		// Run the controller
		if (F.controller) {
			// Check if an array for this pageType has been defined
			var pageTypeArray = F.controller[F.$get('pageType')];

			if (pageTypeArray) {
				pageTypeArray.forEach(function(fnName) {
					F.fn.clone(fnName).init();
				});
			}
		}
	};

	// Run initialization on DOM ready state
	$(function() {
		F.setVars();
		F.run();
	});
})(window.FAB);