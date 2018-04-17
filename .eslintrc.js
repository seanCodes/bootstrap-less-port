/* eslint-env node */

module.exports = {
	parserOptions: { ecmaFeatures: { impliedStrict: true } },
	env: { es6: true }, // automatically sets `ecmaVersion` in `parserOptions` to 6
	globals: {
		tree      : false,
		functions : false,
	},
	extends: 'eslint:recommended',
	rules: {
		// > Note: All rule names are quoted for consitency.

		//
		// Possible Errors
		//

		'for-direction'                    :  'error',
		'no-empty'                         :  'warn',
		'no-template-curly-in-string'      :  'warn',
		'no-unsafe-negation'               :  'warn',
		'valid-jsdoc'                      : ['warn', {
			prefer: {
				arg      : 'param',
				argument : 'param',
				class    : 'constructor',
				prop     : 'property',
				return   : 'returns',
			},
			// See: http://stackoverflow.com/questions/15499235/whats-the-correct-casing-to-use-for-jsdoc-comments
			preferType: {
				// > Note: Quoting props here since the syntax highlighting doesn’t like it when a
				//   propety’s named “function”.
				'function'  : 'Function',
				'promise'   : 'Promise',
				'object'    : 'Object',
				'array'     : 'Array',
				'String'    : 'string',
				'Boolean'   : 'boolean',
				'Number'    : 'number',
				'Undefined' : 'undefined',
			},
			requireReturn: false,
			// - Begin with a quote mark, a markdown special character, a JSDoc tag (@) or a captial
			//   letter.
			// - End with either a) a markdown list item ending in a lowercase letter or b) a quote
			//   mark, markdown special char or sentence-end punctuation character.
			matchDescription: '^["\'“‘\\[*>_`@A-Z0-9][\\s\\S]+([-*] [^\\n]+[a-z]|["\'”’)\\]*_`\\.?!)])$',
		}],

		//
		// Best Practices
		//

		'eqeqeq'                           : ['error', 'always', { null: 'ignore' }],
		'no-else-return'                   :  'warn',
		'no-empty-function'                :  'warn',
		'no-extend-native'                 :  'error',
		'no-eval'                          :  'error',
		'no-fallthrough'                   :  'warn',
		'no-floating-decimal'              :  'warn',
		'no-lone-blocks'                   :  'error',
		'no-loop-func'                     :  'error',
		'no-return-assign'                 : ['error'],
		'no-script-url'                    :  'error',
		'no-self-assign'                   : ['error', { props: true }],
		'no-self-compare'                  :  'error',
		'no-sequences'                     :  'error',
		'no-throw-literal'                 :  'error',
		'no-unmodified-loop-condition'     :  'error',
		'no-unused-expressions'            : ['error', { allowShortCircuit: true }],
		'no-useless-call'                  :  'error',
		'no-useless-concat'                :  'error',
		'no-useless-escape'                :  'warn',
		'no-useless-return'                :  'error',
		'no-with'                          :  'error',
		'prefer-promise-reject-errors'     : ['error', { allowEmptyReject: true }],
		'radix'                            :  'error',
		'wrap-iife'                        : ['error', 'inside'],
		'yoda'                             : ['warn',  'never'],

		//
		// Variables
		//

		'init-declarations'                :  'warn',
		'no-delete-var'                    :  'error',
		'no-shadow-restricted-names'       :  'error',
		'no-undef'                         : ['error', { typeof: true }],
		'no-undef-init'                    :  'error',
		'no-unused-vars'                   :  'warn',
		'no-use-before-define'             :  'error',

		//
		// Stylistic Issues
		//

		'array-bracket-newline'            : ['warn',  { multiline: true, minItems: 5 }],
		'array-bracket-spacing'            :  'error',
		'array-element-newline'            : ['warn',  { multiline: true, minItems: 5 }],
		'block-spacing'                    :  'warn',
		'brace-style'                      : ['warn',  '1tbs', { allowSingleLine: true }],
		'camelcase'                        : ['error', { properties: 'always' }],
		'capitalized-comments'             : ['warn',  'always', {
			line  : { ignoreInlineComments: true, ignoreConsecutiveComments: true },
			block : { ignoreInlineComments: true },
		}],
		'comma-dangle'                     : ['error',  {
			arrays    : 'always-multiline',
			objects   : 'always-multiline',
			imports   : 'always-multiline',
			exports   : 'always-multiline',
			functions : 'never',
		}],
		'comma-spacing'                    : ['error', { before: false, after: true }],
		'comma-style'                      :  'error',
		'consistent-this'                  : ['error', 'that'],
		'eol-last'                         :  'error',
		'func-call-spacing'                :  'error',
		'function-paren-newline'           : ['warn',  'multiline'],
		'indent'                           : ['warn',  'tab', {
			SwitchCase: 1,
			ignoredNodes: ['SwitchCase > BreakStatement'],
		}],
		'key-spacing'                      : ['warn',  {
			singleLine: { beforeColon: false, 'afterColon': true, mode: 'minimum' },
			multiLine:  { beforeColon: false, 'afterColon': true, mode: 'minimum' },
			align:      { beforeColon: true,  'afterColon': true, mode: 'minimum', on: 'colon' },
		}],
		'keyword-spacing'                  : ['error', { before: true, after: true }],
		'linebreak-style'                  : ['error', 'unix'],
		'max-len'                          : ['warn',  {
			code     : 200,
			tabWidth : 3,
			comments : 100,
			ignoreUrls             : true,
			ignoreTemplateLiterals : true,
			ignoreRegExpLiterals   : true,
			// Ignore lines that have a charater other than a space immediately after the slashes
			// (since those are likely to be cases of commented code).
			ignorePattern          : '\/\/\\S.*'
		}],
		'max-params'                       : ['warn',  { max: 6 }],
		'max-statements-per-line'          : ['error', { max: 2 }],
		'new-cap'                          :  'error',
		'new-parens'                       :  'error',
		'newline-per-chained-call'         : ['warn',  { ignoreChainWithDepth: 4 }],
		'no-array-constructor'             :  'error',
		'no-lonely-if'                     :  'error',
		'no-mixed-spaces-and-tabs'         : ['error', 'smart-tabs'],
		'no-multiple-empty-lines'          : ['error', { max: 3, maxBOF: 0, maxEOF: 1 }],
		'no-negated-condition'             :  'error',
		'no-nested-ternary'                :  'error',
		'no-new-object'                    :  'error',
		'no-trailing-spaces'               :  'warn',
		'no-underscore-dangle'             : ['warn',  { allowAfterThis: true, allowAfterSuper: true }],
		'no-unneeded-ternary'              : ['warn',  { defaultAssignment: false }],
		'no-whitespace-before-property'    :  'warn',
		'nonblock-statement-body-position' : ['warn',  'below'],
		'object-curly-newline'             : ['warn',  {
			ObjectExpression : { multiline: true, minProperties: 5 },
			ObjectPattern    : { multiline: true, minProperties: 8 },
		}],
		'object-curly-spacing'             : ['error', 'always'],
		'one-var'                          : ['error', 'never'],
		'operator-assignment'              : ['warn',  'always'],
		'operator-linebreak'               : ['warn',  'before'],
		'padded-blocks'                    : ['warn',  { blocks: 'never', 'switches': 'never', 'classes': 'always' }],
		'padding-line-between-statements'  : ['warn',
			// Around directives.
			{ blankLine: 'always', prev: 'directive',             next: '*'                     },
			{ blankLine: 'any',    prev: 'directive',             next: 'directive'             },
			// Around `const`/`let`/`var`.
			{ blankLine: 'always', prev: ['const', 'let', 'var'], next: '*'                     },
			{ blankLine: 'any',    prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
			// Before `return`.
			{ blankLine: 'always', prev: '*',                     next: 'return'                },
		],
		'quote-props'                      : ['error', 'as-needed'],
		'quotes'                           : ['error', 'single', { avoidEscape: false, allowTemplateLiterals: true }],
		'semi'                             : ['error', 'never'],
		'sort-imports'                     : ['warn',  { ignoreCase: false, ignoreMemberSort: false, memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'] }],
		'space-before-blocks'              : ['error', 'always'],
		'space-before-function-paren'      : ['error', { anonymous: 'always', named: 'never', asyncArrow: 'always' }],
		'space-in-parens'                  : ['error', 'never'],
		'space-infix-ops'                  :  'error',
		'space-unary-ops'                  : ['error', { words: true, nonwords: false, overrides: { '!' :true, '!!': true } }],
		'spaced-comment'                   : ['error', 'always', {
			line  : { markers: ['/', '!'] },
			block : { exceptions: ['*'], balanced: true },
		}],
		'switch-colon-spacing'             :  'error',
		'template-tag-spacing'             :  'error',

		//
		// ECMAScript 6
		//

		'constructor-super'                :  'error',
		'no-class-assign'                  :  'error',
		'no-const-assign'                  :  'error',
		'no-dupe-class-members'            :  'error',
		'no-new-symbol'                    :  'error',
		'no-this-before-super'             :  'error',
		'no-useless-computed-key'          :  'warn',
	},
}
