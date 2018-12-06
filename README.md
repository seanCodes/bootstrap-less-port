# Bootstrap Less

[![Bootstrap version](https://img.shields.io/badge/Bootstrap-v4.1.3-563d7c.svg?colorA=563d7c&colorB=555555)](https://github.com/twbs/bootstrap/tree/v4.1.3)
[![npm version](https://img.shields.io/npm/v/bootstrap-less-port.svg)](https://www.npmjs.com/package/bootstrap-less-port)

This is a Less port of [Bootstrap v4](http://getbootstrap.com/), since Bootstrap now uses Sass for CSS preprocessing. This is purely a Sass→Less port: it doesn’t modify or build on the default Bootstrap styles in any way.

The code is currently aligned with [Bootstrap v4.1.3](https://github.com/twbs/bootstrap/tree/v4.1.3).



## Getting Started

Options for installing Bootstrap Less in your project:

- Install with [npm](https://www.npmjs.com/): `npm install bootstrap-less-port`
- Install with [yarn](https://yarnpkg.com/): `yarn add bootstrap-less-port`
- Clone the repo: `git clone https://github.com/seanCodes/bootstrap-less-port.git`
- [Download the latest release](https://github.com/seanCodes/bootstrap-less-port/archive/master.zip)

Note that this code is only necessary if you want to use Less in your project and want to import and/or customize Bootstrap’s variables, mixins or styles. If you plan to use the CSS framework wholesale, you can get the compiled CSS files from the main Bootstrap repo, so there’s no need for this code.



## Usage

To use these files in your project, simply import them into your main Less file. For example, if you’ve installed Bootstrap Less using npm or Yarn, you might have a file structure that looks like this:

```
your-project/
 ├─ less/
 │   └─ custom.less
 └─ node_modules/
     └─ bootstrap-less-port/
         └─ less/
             └─ ...
```

In this case, you could then import what you need into `custom.less` using relative paths to the files in the `node_modules` folder:

```less
// custom.less


// Required Files
@import "../../node_modules/bootstrap-less-port/less/_functions";
@import "../../node_modules/bootstrap-less-port/less/_variables";
@import "../../node_modules/bootstrap-less-port/less/_mixins";

// Optional Files
@import "../../node_modules/bootstrap-less-port/less/_reboot";
@import "../../node_modules/bootstrap-less-port/less/_utilities";
@import "../../node_modules/bootstrap-less-port/less/_type";
@import "../../node_modules/bootstrap-less-port/less/_grid";
...
```

This approach is recommended since it will result in a smaller CSS file by omitting the styles you don’t need. (Just be aware that some files are dependent on others.)

Alternatively, you can get the entire framework by importing the main `bootstrap.less` file:

```less
// custom.less


@import "../../node_modules/bootstrap-less-port/less/bootstrap";
```

#### Usage with `less-plugin-npm-import`

If you’re using `lessc` on the command line, you can use [`less-plugin-npm-import`](https://github.com/less/less-plugin-npm-import) to import the files in a much cooler and more maintainable way. Just install the plugin via npm and then reference the Bootstrap Less files using the plugin’s default `npm://` prefix:

```less
@import "npm://bootstrap-less-port/less/bootstrap";
```

Then simply include the `--npm-import` flag when compiling:

```bash
$ lessc --npm-import file.less file.css
```


### Theming

The recommended way of customizing Bootstrap is to modify the provided variables. To customize a default variables, copy and paste it from `_variables.less` into your custom Less file and change its value. Overrides can be included anywhere _after_ the defaults have been included; Less will respect the last value assigned.

```less
// custom.less


@import "../../node_modules/bootstrap-less-port/less/bootstrap";

// Variable Overrides
@body-bg: @black;
@body-color: @white;
```

For a more in-depth guide to theming, see the [Bootstrap docs](http://getbootstrap.com/docs/4.0/getting-started/theming/).


### JavaScript

This repo does _not_ include the JavaScript component files from Bootstrap v4. If you’d like to use them the easiest way to do so is via [Bootstrap CDN](https://www.bootstrapcdn.com/#quickstartjsbundle4_0_0_form). Otherwise, you can get the files from the main Bootstrap repo by downloading it or installing it using a package manager.


## Documentation

See the [Bootstrap v4 docs](http://getbootstrap.com/docs/4.0/getting-started/introduction/) for documentation.



## Notes

This port attempts to mirror the source Sass files as closely as possible in order to make updating it straight-forward. This means that variable/mixin naming, custom functions and most code style match the original project with a few notable exceptions:

0. **Mixins** Mixins work the same as they did in previous Bootstrap versions with the exception that they now use ID selectors instead of class selectors (e.g. `.border-radius()` is now `#border-radius()`). This was done to avoid potential collisions with the user’s class names.

   Variables within mixins are named the same as their Sass counterparts whenever possible, in order to make comparison with the Sass version easier.

0. **Custom functions** Sass allows for custom functions to be written in the sass files themselves, which isn’t possible in Less. All custom functions have been replaced with Less plugins that add equivalent functions to the language. These plugins are located in `less/plugins/` as JavaScript files.

   Plugins have also been added to duplicate some native Sass functions for simplicity.

   Note: The plugins are included using the [`@plugin`](http://lesscss.org/features/#plugin-atrules-feature) at-rule instead of as arguments to the `lessc` CLI. This was intentionally done since most Less GUI compilers don’t allow you to customize the command-line arguments.

0. **Maps** Less has no _native_ concept of maps, which are used extensively in the Bootstrap Sass files. They can be emulated, however, by using a comma-separated list of space-separated lists, which is what is done in this port.

0. **Loops** Sass `@for` and `@each` loops have been replaced with Less’s method of looping which requires unique, named mixins for every loop. This is a bit clunky and means that the loops used in this port are verbose and difficult to read, but it’s the best we’ve got until I can figure out how to overcome this with a plugin.

   In order to make catching bugs easier, the Sass versions of most for/each loops have been kept in the code, commented, above the Less versions.

0. **Code style** While the code style is mostly identical to that used by Bootstrap, a few changes have been made:
   - Tabs are used instead of spaces
   - Leading zeros have been added to decimal numbers for readability
   - Spaces have been added between the values of comma-separated lists, also for readability



## Contributing

For bugs, feature-requests, or issues with the compiled CSS, please create an issue in the main Bootstrap repo.

For errors or bugs related to the ported code, please submit a pull request or create an issue.



## Credits and License

Bootstrap was created by [Mark Otto](https://github.com/mdo) and [Jacob Thornton](https://github.com/fat).

The original code copyright 2011-2017 the [Bootstrap Authors](https://github.com/twbs/bootstrap/graphs/contributors) and [Twitter, Inc](https://twitter.com).

This port and the original code are released under the [MIT License](https://github.com/twbs/bootstrap/blob/master/LICENSE).
