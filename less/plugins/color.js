let colors = {}

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

functions.add('color', function ({ value: colorName } = { value: 'blue' }) {
	// If `colors` hasn’t been defined yet, set it to the value of `@colors`.
	if (Object.keys(colors).length === 0)
		colors = rulesetToMap(this.context, lookupVariable(this.context, '@colors'))

	return colors[colorName]
})
