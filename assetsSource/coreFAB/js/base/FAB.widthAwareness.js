(function(F, $W) {
	'use strict';

	// Create storage for elements to make width aware
	var elements = {};

	// Create a timer for watching the window resize
	var windowResizeTimer = null;

	/**
	 * Prep element for add/remove
	 *
	 * @param {object} el DOM or jQuery object
	 * @return {jQuery}
	 */
	var elPrep = function(el) {
		// Cast the element if necesary
		var $el = $(el);
		// Start a name variable
		var name;

		// If there is no name, set one
		if (! $el.data('widthAwareName')) {
			name = Math.floor((Math.random() * 99999999999) + 1);
			$el.data('widthAwareName', name);
		}

		// return the element
		return $el;
	};

	/**
	 * Update element by name
	 *
	 * @param {string} - name
	 */
	var updateElementByName = function(name) {
		// Get the element
		var element = elements[name];
		// Get the element width
		var width = element.$el.outerWidth();

		// Loop through the class settings
		element.breakPointClasses.forEach(function(obj) {
			// If the width has exceeded the size threshold, add the class
			if (width >= obj.size) {
				element.$el.addClass(obj.className);

			// Otherwise remove it
			} else {
				element.$el.removeClass(obj.className);
			}
		});
	};

	/**
	 * Update an element
	 *
	 * @param {jQuery} - $el
	 */
	var updateElement = function($el) {
		updateElementByName($el.data('widthAwareName'));
	};

	/**
	 * Update elements
	 */
	var updateElements = function() {
		// Loop through elements
		for (var i in elements) {
			// Send the element to the updateElement function
			updateElementByName(i);
		}
	};

	// Object for public API
	F.widthAwareness = {
		/**
		 * Add element to watch
		 *
		 * @param {object} el DOM or jQuery object
		 * @param {array} breakPointClasses
		 */
		add: function(el, breakPointClasses) {
			// Get the prepped element
			var $el;

			if (! el) {
				throw 'A DOM or jQuery element must be provided';
			}

			if (! breakPointClasses) {
				throw 'An array with one or more objects containing a size key and class value must be provided';
			}

			// Prep the element
			$el = elPrep(el);

			// In case there is more than one element, loop through each
			$el.each(function() {
				// Get this element
				var $this = $(this);
				var name = $this.data('widthAwareName');

				// Create a storage object if it does not already exist
				if (! elements[name]) {
					elements[name] = {};
					elements[name].$el = $this;
					elements[name].breakPointClasses = [];
				}

				// Loop through the breakpoint classes
				breakPointClasses.forEach(function(i) {
					// Make sure required properties are present
					if (! i.size) {
						throw 'classes object must contain breakpoint size property';
					}

					if (! i.className) {
						throw 'classes object must contain breakpoint className property';
					}

					// Push the item into the array
					elements[name].breakPointClasses.push(i);
				});

				// Set up triggering element
				$this.on('widthAwarenessCheck', function() {
					updateElement($this);
				});

				// Make sure window is ready
				$(function() {
					// Run the first update on this element
					updateElement($this);
				});
			});
		},

		/**
		 * Remove element from watch
		 *
		 * @param {object} el DOM or jQuery object
		 */
		remove: function(el) {
			// Get the prepped element
			var $el = elPrep(el);

			// In case there is more than one element, loop through each
			$el.each(function() {
				// Get this element
				var $this = $(this);
				var name = $this.data('widthAwareName');

				// Check if the element is in storage
				if (elements[name]) {
					// Remove elements widthawareness trigger
					elements[name].$el.off('widthAwarenessCheck');

					// Delete the element from storage if it's there
					delete elements[name];
				}
			});
		}
	};

	// Run checks on window resize
	$W.on('resize', function() {
		// Clear the timeout
		clearTimeout(windowResizeTimer);

		// Only run check if the window resize is a multiple of 10
		// otherwise set a timer to check when window is done resizing
		// this throttling should help with performance
		if ($W.width() % 10 === 0) {
			updateElements();
		} else {
			windowResizeTimer = setTimeout(function() {
				updateElements();
			}, 50);
		}
	});
})(window.FAB, $(window));
