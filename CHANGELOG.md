# Bootstrap Less Port Changelog

All notable changes will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).


## [Unreleased]

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

[Unreleased]: https://github.com/seanCodes/bootstrap-less-port/compare/v0.5.0...HEAD
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
