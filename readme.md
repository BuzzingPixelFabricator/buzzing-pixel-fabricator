# Fabricator 0.3.0

You probably won't find this useful but you are welcome to use it. This is my build process and helper functions for building websites. Below you will find some documentation about how it works.

## Node and Grunt

This build process uses node and grunt and the grunt CLI so make sure you have those installed in your environment.

## Getting started

Copy the relevant files from this repo to your project, then CD to your project to your directory and run:

```
npm install
```

Because of a bug that can happen with Node on OS X, it might be necessary to run `sudo npm install` and enter your password.

## Tasks

Once installed, from the command line run `grunt` to compile your project and watch for changes, or `grunt compile` to compile everything once then quite.

## project.json

This is your file to configure. Generally, all keys are required to be present.

### `root`

Type: `string`

This is the public directory for your website.

### `assets`

Type: `string`

The assets directory inside the root (public) directory where you would like your compiled files to go.

### `source`

Type: `string`

The directory inside the root (public) directory where your source files will live.

### `proxy`

Type: `string|bool`

The url for browserSync to proxy (for reloading) or false. If set to false, you can copy and paste a javascript snippet into your page for reloading if you like.

### `watch`

Type: `array`

Add any custom paths you wish for BrowserSync to watch.

### `lessCompress`

Type: `bool`

True to compress and minify CSS, false for un-minified CSS output.

### `lessBuild`

Type: `array`
Note: Items are relative to the `source` directory

All files listed in this array will be compiled into the primary css output file.

### `lessFiles`

Type: `object`
Note: Keys are relative to the `assets ` directory and values are relative to the `source` directory

The key of items in this object is the output file name and location, the value can either be a string of a file to compile, or an array of files to compile.

### `jsBuild`

Type: `array`
Note: Items are relative to the `source` directory

All files listed in this array will be compiled into the primary JS min file.

### `jsFiles`

Type: `object`
Note: Keys are relative to the `assets ` directory and values are relative to the `source` directory

## Mixins

Fabricator contains a complete mixin library. They were taken from the open source Wee 3. See the Wee 3 docs for details (currently not available since Wee 3 is in beta) or peruse the mixin file for more.

You can also define your own custom mixins and variables in config/mixins and config/variables.

## Less auto build

Any Less files placed in the build directory in the `assets` directory will automatically be built into the primary CSS output.

## Javascript

Fabricator includes many helper functions.

## `controller.js`

Note: this is intended to work with FAB setVars.

The controller is intended to call certain FAB function sets for specific page types. Think of it like a routing file.

The idea is you would set a variable using the setVars method or from the DOM `<someElement data-set="pageType" data-value="myPageType">`.

Then in your controller define a FAB function you would like to run.

```
(function(F) {
	'use strict';

	F.controller = {
		myPageType: [
			'myFabFunction'
		]
	};
})(window.FAB);
```

This will call the init function of your specified controller when the pageType FAB var is `myPageType`

```
(function(F) {
	'use strict';

	F.fn.make('myFabFunction', {
		init: function() {
			console.log('myFabFunction');
		}
	});
})(window.FAB);
```

## Setting and getting FAB vars

FAB uses a global storage object and there are methods for getting and settings them:

### `FAB.$set('myVar', 'myVal')`

Arguments:

1. `string` Variable name: The name of the variable to set. If this name exists in the global storage, the value will be overridden.
2. `any` Variable value: This can be anything, object, array, string, function, whatever. You can store anything here.

### `FAB.$get('myVar')`

Arguments:

1. `string` Variable name: The name of the variable to get. If the variable does not exist in global storage, `null` will be returned unless you set a fallback value.
2. `any` Fallback value. The value to fall back to if the variable does not exist in global storage.

## FAB function sets (`FAB.fn.make()`)

This is how you define function sets in FAB. Example:

```
(function(F) {
    'use strict';

    F.fn.make('myFabFunction', {
        _construct: {
            // constructor stuff happens here when FAB loads
        },
        init: function() {
            console.log('myFabFunction');
        },
        thing: function(arg) {
            console.log(arg)
        }
    });
})(window.FAB);
```

In addition to being run from a controller, this function can be accessed directly like so:

```
FAB.myFabFunction.init();
FAB.myFabFunction.thing(true);
```

You can also clone a function if you need a completely new instance of it.

```
var myClone = FAB.fn.clone('myFabFunction');
```

If you would like to run the `_construct` method on this clone, set the second argument to true.

## Asset loading (`FAB.assets.load()`)

Asset loading allows you to dynamically load CSS or JS files on the fly.

```
F.assets.load({
	root: 'https://cdn.site.com/',
	js: 'assets/js/lib/myCSS.min.js',
	css: 'assets/css/lib/myJS.min.js',
	failure: function() {
		console.log('fail');
	},
	success: function() {
		console.log('success');
	}
});
```

### Asset loading arguments

The load function takes an object of options:

#### `options.root`

Type: `string`

Define a file root. Can be relative or absolute, even a full URL.

#### `options.js`

Type: `string|array`

Javascript files to load.

#### `options.css`

Type: `string|array`

CSS files to load.

#### `options.async`

Type: `bool`
Default: `false`

Whether to load the JS asynchronously.

#### `options.failure`

Type: `funcition`

A callback function if loading fails.

#### `options.success`

Type: `function`

A callback function when loading is finished.

## FAB screen size

Fabricator has 5 screen sizes. 1 corresponds to the smallest size (mobile portrait) and 5 corresponds to the largest size (desktop large).

### `FAB.screen.size()`

Call `FAB.screen.size()` any time to get the current screen size.

### `FAB.screen.map()`

This is where the real power comes in at. `map()` takes an array of objects as it's argument. You can pass in as many or as few as you want, and you can call it any time to map things up.

Example:

```
FAB.screen.map([
	{
		min: 2,
		max: 4,
		callback: function() {
			// Do stuff here when breakpoint reaches two, or drops
			// back down to 4
		}
	},
	{
		max: 2,
		callback: function() {
			// Do stuff here when breakpoint drops to 2 or below
		}
	},
	{
		size: 3,
		callback: function() {
			// Do stuff here when the breakpoint size is exactly 3
			// This will only run if there's no min and max
		}
	}
]);
```
