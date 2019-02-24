let themeColors = {}

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
function rulesetToMap({ ruleset: { rules } } = { ruleset: { rules: [] } }) {
	const map = {}

	rules.forEach(({ name: key, value: { value } }) => {
		// If the key is actually an array, then extract the keyname from the first item the array.
		//
		// This logic is adapted from https://github.com/less/less.js/blob/master/lib/less/tree/declaration.js#L46-L49.
		if (typeof key !== 'string' && key.length === 1 && (key[0] instanceof tree.Keyword))
			key = key[0].value

		map[`${key}`] = value
	})

	return map
}

//
// Less Functions
//

functions.add('theme-color', function ({ value: colorName } = { value: 'primary' }) {
	// If `themeColors` hasn’t been defined yet, set it to the value of `@theme-colors`.
	if (Object.keys(themeColors).length === 0)
		themeColors = rulesetToMap(lookupVariable(this.context, '@theme-colors'))

	return themeColors[colorName]
})
