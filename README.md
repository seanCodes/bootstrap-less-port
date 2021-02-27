# Bootstrap Less

[![Bootstrap version](https://img.shields.io/badge/Bootstrap-v4.6.0-563d7c.svg?colorA=563d7c&colorB=555555)](https://github.com/twbs/bootstrap/tree/v4.6.0)
[![npm version](https://img.shields.io/npm/v/bootstrap-less-port.svg)](https://www.npmjs.com/package/bootstrap-less-port)

This is a Less port of [Bootstrap v4](http://getbootstrap.com/), since Bootstrap now uses Sass for CSS preprocessing. This is purely a Sass→Less port: it doesn’t modify or build on the default Bootstrap styles in any way.

The code is currently aligned with [Bootstrap v4.6.0](https://github.com/twbs/bootstrap/tree/v4.6.0). It requires Less v3.9.0 or above to compile. **Note**: For Less versions below v3.9.0, you can use [v1.0.0](https://github.com/seanCodes/bootstrap-less-port/tree/v1.0.0) of the port, which is compatible with Less >=2.6.0.



## Getting Started

Options for installing Bootstrap Less in your project (note that Less v3.9.0 or above is required):

- Install with [npm](https://www.npmjs.com/): `npm install bootstrap-less-port`
- Install with [yarn](https://yarnpkg.com/): `yarn add bootstrap-less-port`
- Install with [bower](https://yarnpkg.com/) ([not recommended](https://github.com/seanCodes/bootstrap-less-port/issues/10#issuecomment-444886935)): `bower install bootstrap-less-port`
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

In this case, you could then import what you need into `custom.less` using module-relative paths:

```less
// custom.less


// Required Files
@import "bootstrap-less-port/less/_functions";
@import "bootstrap-less-port/less/_variables";
@import "bootstrap-less-port/less/_mixins";

// Optional Files
@import "bootstrap-less-port/less/_reboot";
@import "bootstrap-less-port/less/_utilities";
@import "bootstrap-less-port/less/_type";
@import "bootstrap-less-port/less/_grid";
...
```

This approach is recommended since it will result in a smaller CSS file by omitting the styles you don’t need. (Just be aware that some files are dependent on others.)

Alternatively, you can get the entire framework by simply importing the package as a whole. (Or, if not using a package manager, importing `bootstrap-less-port/less/bootstrap` instead.)

```less
// custom.less


@import "bootstrap-less-port";
```


### Theming

The recommended way of customizing Bootstrap is to override the default variables. To override a variable, copy and paste it from [`_variables.less`](https://github.com/seanCodes/bootstrap-less-port/blob/master/less/_variables.less) into your custom Less file and change its value.

```less
// custom.less


@import "bootstrap-less-port";

// Variable Overrides
@body-bg: @black;
@body-color: @white;
```

Variable overrides can be included in any file as long as they are imported _after_ the Bootstrap Less files; Less will use the last value assigned to a variable.

For a more in-depth guide to theming, see the [Bootstrap docs](http://getbootstrap.com/docs/4.0/getting-started/theming/).


### JavaScript

This repo does _not_ include the JavaScript component files from Bootstrap v4. If you’d like to use them the easiest way to do so is via [Bootstrap CDN](https://www.bootstrapcdn.com/#quickstartjsbundle4_0_0_form). Otherwise, you can get the files from the main Bootstrap repo by downloading it or installing it using a package manager.



## Documentation

See the [Bootstrap v4 docs](http://getbootstrap.com/docs/4.0/getting-started/introduction/) for documentation.



## Notes

This port attempts to mirror the source Sass files as closely as possible in order to make updating it straight-forward. This means that variable/mixin naming, custom functions and most code style match the original project with a few notable exceptions:

1. **Mixins** Mixins work the same as they did in previous Bootstrap versions with the exception that they now use ID selectors instead of class selectors (e.g. `.border-radius()` is now `#border-radius()`). This was done to avoid potential collisions with the user’s class names.

   Variables within mixins are named the same as their Sass counterparts whenever possible, in order to make comparison with the Sass version easier.

1. **Custom functions** Sass allows for custom functions to be written in the sass files themselves, which isn’t possible in Less. All custom functions have been replaced with Less plugins that add equivalent functions to the language. These plugins are located in `less/plugins/` as JavaScript files.

   Plugins have also been added to duplicate some native Sass functions for simplicity.

   Note: The plugins are included using the [`@plugin`](http://lesscss.org/features/#plugin-atrules-feature) at-rule instead of as arguments to the `lessc` CLI. This was intentionally done since most Less GUI compilers don’t allow you to customize the command-line arguments.

1. **Loops** Where possible, Sass `@each` loops have been replaced with the Less [`each()`](http://lesscss.org/functions/#list-functions-each) function. Sass `@for` directives have been replaced by `each()` together with the [`range()`](http://lesscss.org/functions/#list-functions-range) function.

   In order to make catching bugs easier, the Sass versions of most for/each loops have been kept in the code, commented, above the Less versions.

1. **Placeholder selectors** Since Less has no equivalent for Sass’ [placeholder selectors](https://sass-lang.com/documentation/style-rules/placeholder-selectors), regular selectors are used instead. In order to prevent name clashes with selectors in users’ code, element selectors prefixed with an escaped `%` are used instead (for example `\%grid-column`).

1. **Code style** While the code style is mostly identical to that used by Bootstrap, a few changes have been made:
   - Tabs are used instead of spaces
   - Leading zeros have been added to decimal numbers for readability
   - Spaces have been added between the values of comma-separated lists, also for readability



## Contributing

For bugs, feature-requests, or issues with the compiled CSS, please create an issue in the main Bootstrap repo.

For errors or bugs related to the ported code, please submit a pull request or create an issue.



## Credits and License

Bootstrap was created by [Mark Otto](https://github.com/mdo) and [Jacob Thornton](https://github.com/fat).

The original code copyright 2011-2019 the [Bootstrap Authors](https://github.com/twbs/bootstrap/graphs/contributors) and [Twitter, Inc](https://twitter.com).

This port and the original code are released under the [MIT License](https://github.com/twbs/bootstrap/blob/master/LICENSE).
