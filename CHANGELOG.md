# Bootstrap Less Port Changelog

All notable changes will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).


## [2.2.2] – 2020-03-09

This version fixes an issue that caused an error when compiling the project using the default Less options. Previously, Less had to be configured with the [`math` option](http://lesscss.org/usage/#less-options-math) set to `parens`, but this requirement wasn’t documented anywhere, which obviously lead to some confusion.

Instead of adding the additional step, the code has been modified to be compatible with the default `math: 'always'` option. This should make for a smoother experience installing and using the project overall (especially when it’s being compiled using a wrapper around Less, such as `less-loader`, `angular-cli` or `ember-cli-less`).

Note that this change is backwards compatible and everything will continue to work with the stricter `math: 'parens'` or `math: 'parens-division'` options.

### Changed
- __Dev__: Updated dependencies and fixed npm audit security issues
  * `less` 3.9.0 → 3.11.1
  * `autoprefixer` 9.6.1 → 9.7.4
  * `postcss-cli` 6.1.3 → 7.1.0
  * `eslint` 6.1.0 → 6.8.0
  * `node-stream-zip` 1.8.2 → 1.9.1

### Fixed
- [#22](https://github.com/seanCodes/bootstrap-less-port/issues/22) – Build fails when using webpack with less-loader


## [2.2.1] – 2019-07-25

Aligned code with Bootstrap v4.3.1. See the [Bootstrap release notes](https://github.com/twbs/bootstrap/releases/tag/v4.3.1) for details.

> **Note**: The only substantial change in this version is the version number. This is a separate release only so that there can be a matching Bootstrap-Less-Port version for each version of Bootstrap 4.

### Changed
- __Dev__: Updated dependencies and fixed npm audit security issues
  * `eslint` 6.0.1 → 6.1.0
  * `postcss-cli` 6.1.2 → 6.1.3


## [2.2.0] – 2019-07-25

Aligned code with Bootstrap v4.3.0. See the [Bootstrap release notes](https://github.com/twbs/bootstrap/releases/tag/v4.3.0) for details.

### Added
- Added new `warn()` and `error()` functions to emulate Sass’ `@warn` and `@error` at-rules. These functions are primarily meant to be used by Bootstrap but can be used freely in your code if you find them useful.
- Added a Bower config, for wider package management support. (Note that the Bower team does _not_ recommend using Bower in new projects, so using npm or yarn is preferred.)

### Changed
- Updated styles/plugins to match Bootstrap v4.3.0 (see the [release notes](https://github.com/twbs/bootstrap/releases/tag/v4.3.0) for details)

### Fixed
- [#10](https://github.com/seanCodes/bootstrap-less-port/issues/10) – Add bower support
- [#16](https://github.com/seanCodes/bootstrap-less-port/issues/16) – Omitting file extensions for `@plugin` at-rules causes errors when bundling with Parcel


## [2.1.1] – 2019-07-20

Aligned code with Bootstrap v4.2.1. See the [Bootstrap release notes](https://github.com/twbs/bootstrap/releases/tag/v4.2.1) for details.

> **Note**: The only substantial change in this version is the version number. This is a separate release only so that there can be a matching Bootstrap-Less-Port version for each version of Bootstrap 4.


## [2.1.0] – 2019-07-20

Aligned code with Bootstrap v4.2.0. See the [Bootstrap release notes](https://github.com/twbs/bootstrap/releases/tag/v4.2.0) for details.

### Added
- __Dev__: Added testing scripts for comparing the compiled Less CSS to the Sass CSS to ensure they match. Can be used by running `npm test <bootstrap_version>` on the command line.

### Changed
- Updated styles/plugins to match Bootstrap v4.2.0 (see the [release notes](https://github.com/twbs/bootstrap/releases/tag/v4.2.0) for details)


## [2.0.0] – 2019-07-08

**Less 3!** Bootstrap Less Port now uses Less v3.9.0 and its syntax has been updated to leverage v3 features. _Be aware that this should **not** have a major impact on compiled CSS---only the Less syntax used has been updated._

> **Note**: This is possibly a **BREAKING CHANGE**. With this version, _you will only be able to compile the Less source files with Less v3.9.0 or greater_. For most users no code changes will actually be needed, but if you’re using a GUI to compile your Less then you’ll need to make sure your GUI supports Less v3.9.0.

With the update to Less 3, improvements have been made in two key areas:

1. __Maps__ – The map variables used previously (which were actually not maps at all, but nested lists) have been converted to rulesets (which are much more map-like). This means that their properties can now be accessed directly using Less’ [property accessor](http://lesscss.org/features/#detached-rulesets-feature-property-variable-accessors) syntax instead of the custom `map-get()` function. (e.g. `@breakpoints[xs]` vs `map-get(breakpoints, xs)`)

   Property accessors can also be used to get color values from the color rulesets. However, for feature parity (and to avoid any confusion with the Bootstrap docs), Bootstrap’s custom [color functions](https://getbootstrap.com/docs/4.3/getting-started/theming/#functions) are still supported and can be used as well.
2. __Loops__ – Previously, recursive mixin loops were used to mimic Sass’ `each` and `for` loops. While this worked, it was not ideal and resulted in some verbose code. Now, instead of mixins, Less’ new [`each()` function](http://lesscss.org/functions/#list-functions-each) is used for iteration (in combination with the [`range()` function](http://lesscss.org/functions/#list-functions-range) for lists), whenever possible.

Thanks to these improvements some clunky workarounds used previously were removed, resulting in code that is now much easier to both read and reason about. Special thanks to @calvinjuarez and @matthew-dean for implementing and leading the transition to Less 3!

### Added
- Added a new `map-keys()` function for getting the properties from a ruleset as a list, which can be very helpful when iterating using `each()` (thanks @calvinjuarez!)

### Changed
- Updated Less peer-dependency version from `^2.6.0` to `^3.9.0.`
- Updated Less syntax to leverage the latest Less features
   * Converted “map” variables (nested lists) to rulesets
   * Switched to using property accessors instead of the custom `map-get()` function for getting values from map-like variables
   * Switched to `each()` for iterating instead of mixins (in combination with `range()` when iterating over lists), where possible
- __Dev__: Updated the command used in the `css-compile` npm script to use the `--math` flag instead of the deprecated `--strict-math`
- __Dev__: Updated dependencies and fixed npm audit security issues
  * `eslint` 4.19.1 → 6.0.1
  * `autoprefixer` 8.6.5 → 9.6.1
  * `postcss-cli` 5.0.1 → 6.1.2
  * `clean-css-cli` 4.1.11 → 4.3.0

### Removed
- Removed the custom `map-get()` plugin function. (The property accessor syntax can now be used instead, as noted above.)


## [1.0.0] – 2018-01-06

First major release (since everything seems stable at this point).

### Added
- __Dev__: Added a changelog
- __Dev__: Added Less as a peer dependency in `package.json` (currently `>=2.6.0`)

### Changed
- __Dev__: Updated ESLint config to allow syntax up to ES8


## [0.5.0] – 2018-12-06

Aligned with Bootstrap v4.1.3.

### Changed
- Updated styles to match Bootstrap v4.1.3 (see the [Bootstrap release notes](https://github.com/twbs/bootstrap/releases/tag/v4.1.3) for details on the CSS changes in this version)

### Fixed
- Updated link to Less plugin at-rules in the README


## [0.4.0] – 2018-12-06

Aligned with Bootstrap v4.1.2.

### Changed
- Updated styles to match Bootstrap v4.1.2 (see the [Bootstrap release notes](https://github.com/twbs/bootstrap/releases/tag/v4.1.2) for details on the CSS changes in this version)
- __Dev__: Updated `browserslist` config to match Bootstrap
- __Dev__: Updated dependencies and fixed npm audit security issues
  * `less` 3.0.4 → 3.9.0
  * `autoprefixer` 8.4.1 → 8.6.5
  * `postcss-cli` 5.0.0 → 5.0.1

### Fixed
- Updated link to Less plugin at-rules in the README


## [0.3.0] – 2018-05-12

Aligned with Bootstrap v4.1.1.

> **Note**: This version bumps the Less version used for development to v3. It also includes revisions to the code to make it compatible with v3. However, the syntax used is _backwards compatible with Less v2_, and can be still be compiled with >= v2.7.3.

### Changed
- Updated styles to match Bootstrap v4.1.1 (see the [Bootstrap release notes](https://github.com/twbs/bootstrap/releases/tag/v4.1.1) for details on the CSS changes in this version)
- Updated usages of `calc()` to be compatible with Less v3
- __Dev__: Updated dependencies and fixed npm audit security issues
  * `less` 2.7.3 → 3.0.4
  * `autoprefixer` 8.1.0 → 8.4.1

### Fixed
- [#3](https://github.com/seanCodes/bootstrap-less-port/issues/3) – Broken `#media-breakpoint-only` mixin


## [0.2.0] – 2018-04-17

Aligned with Bootstrap v4.1.0.

### Added
- __Dev__: ESLint is now used for enforcing JavaScript style in the Less plugins
- __Dev__: Added npm script for linting/compiling

### Changed
- Updated styles to match Bootstrap v4.1.0 (see the [Bootstrap release notes](https://github.com/twbs/bootstrap/releases/tag/v4.1.0) for details on the CSS changes in this version)
- __Dev__: Updated `browserslist` config to match Bootstrap

### Fixed
- [#1](https://github.com/seanCodes/bootstrap-less-port/issues/1) – Clarify theming usage in README


## [0.1.3] – 2018-01-26

### Changed
- Ensured line breaks are preserved when minifying (for smaller diffs of minified files)


## [0.1.2] – 2018-01-26

Created a new version for npm. (Nothing changed in this version.)


## [0.1.1] – 2018-01-26

> **Note**: This version is deprecated in npm! Use version 0.1.2 instead.

### Fixed
- All expressions using math are now compatible with Less’ `strict-math` compiler option.


## [0.1.0] – 2018-01-20

Aligned with Bootstrap v4.0.0.

### Changed
- Updated styles to match Bootstrap v4.0.0 (see the [Bootstrap release notes](https://github.com/twbs/bootstrap/releases/tag/v4.0.0) for details on the CSS changes in this version)
- Fixed typos in the README and removed disclaimer about Bootstrap being in beta


## [0.0.6] – 2018-01-15

Aligned with Bootstrap v4.0.0-beta.3.

### Changed
- Updated styles to match Bootstrap v4.0.0-beta.3 (see the [Bootstrap release notes](https://github.com/twbs/bootstrap/releases/tag/v4.0.0-beta.3) for details on the CSS changes in this version


## [0.0.5] – 2017-11-29

### Added
- Included usage instructions in the README

### Fixed
- `gray()` color function now works correctly. (Issue was caused by a bug in the `listToMap` helper function.)


## [0.0.4] – 2017-11-17

### Changed
- Converted breakpoint mixins to functions (using a Less plugin) so that they can be used in the same way the Sass version uses them

## [0.0.3] – 2017-11-16

Initial release. (Code aligned with Bootstrap v4.0.0-beta.2.)


---

[Unreleased]: https://github.com/seanCodes/bootstrap-less-port/compare/v2.2.2...HEAD
[2.2.2]: https://github.com/seanCodes/bootstrap-less-port/compare/v2.2.1...v2.2.2
[2.2.1]: https://github.com/seanCodes/bootstrap-less-port/compare/v2.2.0...v2.2.1
[2.2.0]: https://github.com/seanCodes/bootstrap-less-port/compare/v2.1.1...v2.2.0
[2.1.1]: https://github.com/seanCodes/bootstrap-less-port/compare/v2.1.0...v2.1.1
[2.1.0]: https://github.com/seanCodes/bootstrap-less-port/compare/v2.0.0...v2.1.0
[2.0.0]: https://github.com/seanCodes/bootstrap-less-port/compare/v1.0.0...v2.0.0
[1.0.0]: https://github.com/seanCodes/bootstrap-less-port/compare/v0.5.0...v1.0.0
[0.5.0]: https://github.com/seanCodes/bootstrap-less-port/compare/v0.4.0...v0.5.0
[0.4.0]: https://github.com/seanCodes/bootstrap-less-port/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/seanCodes/bootstrap-less-port/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/seanCodes/bootstrap-less-port/compare/v0.1.3...v0.2.0
[0.1.3]: https://github.com/seanCodes/bootstrap-less-port/compare/v0.1.2...v0.1.3
[0.1.2]: https://github.com/seanCodes/bootstrap-less-port/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/seanCodes/bootstrap-less-port/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/seanCodes/bootstrap-less-port/compare/v0.0.6...v0.1.0
[0.0.6]: https:f//github.com/seanCodes/bootstrap-less-port/compare/v0.0.5...v0.0.6
[0.0.5]: https://github.com/seanCodes/bootstrap-less-port/compare/v0.0.4...v0.0.5
[0.0.4]: https://github.com/seanCodes/bootstrap-less-port/compare/v0.0.3...v0.0.4
[0.0.3]: https://github.com/seanCodes/bootstrap-less-port/compare/7a65c77...v0.0.3
