(function(F, D) {
	'use strict';

	/**
	 * Load specified assets
	 *
	 * @param {object} options
	 *     @param {string} [options.root]
	 *     @param {string|Array} [options.js]
	 *     @param {string|Array} [options.css]
	 *     @param {bool} [options.async]
	 *     @param {function} [options.failure]
	 *     @param {function} [options.success]
	 */
	var load = function(options) {
		// Set variables
		var head = D.getElementsByTagName('head')[0],
			root = options.root || '/',
			js = typeof options.js === 'string' ? [options.js] : options.js,
			css = typeof options.css === 'string' ? [options.css] : options.css,
			async = options.async === true,
			i,
			counter = 0,
			error = false,
			check = function() {
				if (counter !== 0) {
					return;
				}

				if (error && typeof options.failure === 'function') {
					options.failure();
				} else if (! error && typeof options.success === 'function') {
					options.success();
				}
			};

		// Add all JS items to the counter
		for (i in js) {
			if (js.hasOwnProperty(i)) {
				counter++;
			}
		}

		// Add all CSS items to the counter
		for (i in css) {
			if (css.hasOwnProperty(i)) {
				counter++;
			}
		}

		// Load JS scripts
		for (i in js) {
			if (js.hasOwnProperty(i)) {
				var scriptTag = D.createElement('script');

				scriptTag.async = async === true;

				scriptTag.onload = function() {
					counter--;
					check();
				};

				scriptTag.onerror = function() {
					counter--;
					error = true;
					check();
				};

				scriptTag.src = root + js[i];
			}

			head.appendChild(scriptTag);
		}

		// Load CSS links
		for (i in css) {
			if (css.hasOwnProperty(i)) {
				var link = D.createElement('link');

				link.addEventListener('load', function() {
					counter--;
					check();
				}, false);

				link.addEventListener('error', function() {
					counter--;
					error = true;
					check();
				}, false);

				link.rel = 'stylesheet';
				link.href = root + css[i];

				head.appendChild(link);
			}
		}
	};

	F.assets = {
		/**
		 * Load specified assets
		 *
		 * @param {object} options
		 *     @param {string} [options.root]
		 *     @param {string|Array} [options.js]
		 *     @param {string|Array} [options.css]
		 *     @param {bool} [options.async]
		 *     @param {function} [options.failure]
		 *     @param {function} [options.success]
		 */
		load: function(options) {
			new load(options);
		}
	}
})(window.FAB, document);