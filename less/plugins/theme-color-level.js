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

function listToMap({ value: list } = { value: [] }) {
	const map = {}

	// Handle maps that only have one key/value pair (since they will look like a plain list of
	// length 2).
	if (list.length === 2 && ! Array.isArray(list[0].value)) {
		const [{ value: key }, value] = list || [{}]

		map[key] = value
	} else
		list.forEach(({ value: item } = {}) => {
			if (Array.isArray(item)) {
				const [{ value: key }, value] = item || [{}]

				map[`${key}`] = value
			}
		})

	return map
}

//
// Less Functions
//

functions.add('theme-color-level', function ({ value: colorName }, { value: level } = { value: 0 }) {
	const context = this.context
	const themeColorInterval = lookupVariable(context, '@theme-color-interval').value
	const black              = lookupVariable(context, '@black').toCSS().substr(1)
	const white              = lookupVariable(context, '@white').toCSS().substr(1)
	const mix                = context.pluginManager.less.functions.functionRegistry.get('mix')

	// If `themeColors` hasn’t been defined yet, set it to the value of `@theme-colors`.
	if (Object.keys(themeColors).length === 0)
		themeColors = listToMap(lookupVariable(context, '@theme-colors'))

	const color      = themeColors[colorName]
	const colorBase  = new tree.Color(level > 0 ? black : white)
	const mixPercent = new tree.Dimension(Math.abs(level * themeColorInterval) + '%')

	if (! color)
		throw new ReferenceError(`\n\n\tColor “${colorName}” is not present in the \`@theme-colors\` map.\n\n`)

	// In order to match the output of the Sass version, we have to convert the color into a hex
	// string and then use that value to create a new Less `Color`.
	//
	// NOTE: This doesn’t work every time but it does most of the time. There are still some color
	// output discrepancies between the Less and Sass versions, but the differences are so small
	// they’re imperceptible.
	const colorResult = mix(colorBase, color, mixPercent)

	return new tree.Color(colorResult.toCSS().substr(1))
})
