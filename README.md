# Bootstrap Less

[![Bootstrap version](https://img.shields.io/badge/Bootstrap-v4.0.0--beta.2-563d7c.svg?colorA=563d7c&colorB=555555)](https://github.com/twbs/bootstrap/tree/v4.0.0-beta.2)

[![npm version](https://img.shields.io/npm/v/bootstrap-less-port.svg)]()

This is a Less port of the [Bootstrap v4 beta](http://getbootstrap.com), since Bootstrap will use Sass beginning with version 4. This is purely a Sass→Less port and doesn’t modify or enhance the default styles in any way.

The code is currently aligned with [Bootstrap v4.0.0-beta.2](https://github.com/twbs/bootstrap/tree/v4.0.0-beta.2).


### DISCLAIMER

Since Bootstrap v4 is still in beta, this port should be considered beta too. **It is not recommended that you use this code for production projects since it is likely to change at any time, without backwards compatibility!**

The goal here is just to get a Less version of Bootstrap v4 started so that the styles can be tested in new or existing Bootstrap+Less projects.



## Getting Started

Options for installing Bootstrap Less in your project:

- Install with [npm](https://www.npmjs.com/): `npm install bootstrap-less-port`
- Clone the repo: `git clone https://github.com/seanCodes/bootstrap-less-port.git`
- [Download the latest release](https://github.com/seanCodes/bootstrap-less-port/archive/master.zip)

Note that this code is only necessary if you want to use Less in your project and want to import and/or customize Bootstrap’s variables, mixins or styles. If you plan to use the CSS framework wholesale, you can get the compiled CSS files from the main Bootstrap repo, so there’s no need for this code.



## Documentation

See the [Bootstrap v4 docs](http://getbootstrap.com/docs/4.0/getting-started/introduction/) for documentation.



## Notes

This port attempts to mirror the source Sass files as closely as possible in order to make updating it straight-forward. This means that variable/mixin naming, custom functions and most code style match the original project with a few notable exceptions:

1. **Custom functions** Sass allows for custom functions to be written in the sass files themeselves, which isn’t possible in Less. All custom functions have been replaced with Less plugins that add the equivalent functions to the language. Less plugins are JavaScript files and are located in the `less/plugins/` folder. They’re included using the [`@plugin`](http://lesscss.org/3.x/features/#plugin-atrules-feature) at-rule in `_functions.less`.

   The only exception is the functions in `_breakpoints.sass`, which have been replaced with mixins (since they were testing the limits of my Less-plugin knowledge). However, I’d like to convert them to proper functions eventually.

   Plugins have also been added to duplicate some native Sass functions for simplicity.
2. **Sass maps** Less has no _native_ concept of maps, which are used extensively in the Bootstrap Sass files. They can be emulated, however, by using a comma-separated list of space-separated lists, which is the method emloyed in this port.
3. **Sass loops** Sass `@each` loops are replaced with Less’s method of looping, which requires a mixin every time. This is clunky and makes the code more verbose and harder to read, but it works.
4. **Code style** While the code style is mostly identical to that used by Bootstrap, a few personal liberties have been taken:
   - Leading zeroes have been added to decimal numbers for readability
   - Spaces have been added between the values of comma-separated lists, also for readability
   - Tabs are used instead of spaces



## Contributing

For bugs, feature-requests, or issues with the compiled CSS, please create an issue in the main Bootstrap repo.

For errors or bugs related to the ported code, please submit a pull request or create an issue.



## Credits and License

Bootstrap was created by [Mark Otto](https://github.com/mdo) and [Jacob Thornton](https://github.com/fat).

The original code copyright 2011-2017 the [Bootstrap Authors](https://github.com/twbs/bootstrap/graphs/contributors) and [Twitter, Inc](https://twitter.com).

This port and the original code are released under the [MIT License](https://github.com/twbs/bootstrap/blob/master/LICENSE).
