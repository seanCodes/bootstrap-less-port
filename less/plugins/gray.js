let grays = {}

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

functions.add('gray', function ({ value: colorName } = { value: '100' }) {
	// If `grays` hasn’t been defined yet, set it to the value of `@grays`.
	if (Object.keys(grays).length === 0)
		grays = listToMap(lookupVariable(this.context, '@grays'))

	return grays[colorName]
})
