//
// Helper Functions
//

function lookupVariable(context, variableName) {
	const { frames, importantScope } = context

	return tree.Variable.prototype.find(frames, frame => {
		const { value, important } = frame.variable(variableName) || {}

		if (value === undefined)
			return

		if (important && importantScope[importantScope.length - 1])
			importantScope[importantScope.length - 1].important = important

		return value.eval(context)
	})
}

// @TODO: [@calvinjuarez] unify this function between files, maybe even canonize it as a
// `Ruleset`/`DetachedRuleset` method at some point.
function rulesetToMap(context, { ruleset: { rules } } = { ruleset: { rules: [] } }) {
	const map = {}

	rules.forEach(rule => {
		// Not exactly sure how to handle other types (or if they should be handled at all).
		if (! (rule instanceof tree.Declaration))
			return

		const { name: key, value } = rule.eval(context)

		map[key] = value
	})

	return map
}

//
// Less Functions
//

functions.add('escape-svg', function (value = {}) {
	let escapedStr = value.toCSS ? value.toCSS() : ''

	if (! escapedStr.includes('data:image/svg+xml'))
		return value

	const escapeCharsVar = lookupVariable(this.context, '@escaped-characters')
	let escapeCharsMap = {}

	// Currently Less treats the `@escaped-characters` variable as a string instead of a ruleset, due
	// to its unconventional use of special characters like `<` as property names. In case this is
	// fixed in the future, we’ll handle both possible values here (string and ruleset).
	if (escapeCharsVar instanceof tree.Quoted) {
		// Remove leading `{` and trailing `}` as well as the last instance of a `;`, then split by
		// `;`.
		const escapeCharsKeyValueArr = escapeCharsVar.value.replace(/[{}\s]+|;(?=\n})/g, '').split(';')

		escapeCharsKeyValueArr.forEach(escapeCharKeyValueStr => {
			const [key, value] = escapeCharKeyValueStr.split(':')

			escapeCharsMap[key] = value
		})
	} else
		escapeCharsMap = rulesetToMap(this.context, lookupVariable(this.context, '@escaped-characters'))

	let escapeCharsMapKeys = []

	try {
		escapeCharsMapKeys = Object.keys(escapeCharsMap)
	} catch (err) {
		// Do nothing.
	}

	escapeCharsMapKeys.forEach(key => {
		const value = escapeCharsMap[key]

		escapedStr = escapedStr.replace(new RegExp(key, 'g'), value)
	})

	return new tree.Quoted('', escapedStr)
})
