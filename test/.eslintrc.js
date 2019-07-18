/* eslint-env node */

module.exports = {
	parserOptions: {
		sourceType: 'module',
	},
	extends: ['../.eslintrc.js'],
	env: {
		node: true,
	},
	rules: {
		'capitalized-comments': 'off',
	},
}
