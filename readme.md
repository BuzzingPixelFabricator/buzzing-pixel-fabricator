# BuzzingPixel Fabricator Build Process

BuzzingPixel Fabricator is a very light weight front-end build process. It provides a light structure for organizing and building your frontend files.

## Using Fabricator

To use, copy the following files and directories from this repository to your project:

- `assetsSource`
- `fab`
- `gitignore` (may require merging with your existing gitignore)
- `.jscs.json` (can be edited to match your prefered code style)
- `.jshintrc` (can be edited to match your prefered code style)
- `Gruntfile.js`
- `package.json`
- `project.json`
- `projectOverrides.json.sample` (Anyone working on the project can remove `.sample` and overrided things locally in their environment)

Now:

1. Run `npm install` in your project directory
2. Edit the `project.json`
	1. Set the proxy to the local development site URL for your project (or set to false if you do not wish to use live reload)
	2. Update the watch array to watch files and directories applicable to your project (if any, or remove if none)
	3. If your public directory is named something other than `public` add an `assets` key and update accordingly. The default is `"public/assets"`. If your public directory is `public_html` for instance, you would set the `assets` key to `"public_html/assets"`
		- See `fab/grunt/baseProjectFile.json` for other key/values you can add and override
3. You can now run `grunt` on the command line to build your project and watch for changes to continuously build
	- Run `grunt compile` to build your project once and then quit without watching.

## General Use

All your front end project files live in the `assetsSource` directory.

### CSS

#### `style.less`

Generally speaking, `style.less` is the file the build process compiles into it's minified CSS files in the `public/assets` directory. This is your file to do what you want with, but the idea is that you don’t put any raw styling in here. This is where you include imports and references to various components in your LESS and CSS. You will see in this file a suggested structure is already provided. You don’t have to necesarily abide but it.

### `lib` directory

Any files placed in the `assetsSource/css/lib` directory are passed straight through to `public/assets/css/lib/myFile.css`

### Fonts

Any files or directory structure placed in `assetsSource/fonts` are passed through to `public/assets/fonts`

### Images

Any files or directory structure placed in `assetsSource/img` are passed through to `public/assets/img`

### JavaScript

Fabricator compiles JS files in a specific order.

1. Any files in the `jsBuildBefore` array in your project file
2. Any files or files in any nested subdirectories in `assetSource/js/components`
3. `assetsSource/js/setup.js`
4. Any files in the `jsBuild` array in your project file
5. `assetsSource/js/main.js`
6. Any files in the `jsBuildAfter` array in your project file

### `lib` directory

Any files placed in the `assetsSource/js/lib` directory are passed straight through to `public/assets/js/lib/myFile.js`

## Javascript Linting

The build process also lints your JavaScript for coding style errors and other potential problems. You will see a notification on compile if there are errors and you can see error specifics in the console on compile. Be sure to pay attention to these and correct them as you go or they can get overwhelming.

This promotes good code quality and styleguide enformcement.

## License

Copyright 2016 TJ Draper, BuzzingPixel, LLC

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

	http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.